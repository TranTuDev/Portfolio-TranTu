import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import type { AutoAssignmentResultDto, AssignmentStaffDto } from "~/models/auto-assignment-dto";
import type { FlightScheduleDto } from "~/models/flight-schedule-dto";
import { mockFlightSchedules } from "~/mock/mock-flight-schedule";

export type FlightChangeActionType = "stand" | "time" | "aircraft" | "vehicle";

export interface NotificationItem {
    id: string;
    flightId: string;
    changeType: FlightChangeActionType;
    title: string;
    message: string;
    timestamp: string;
    isRead: boolean;
}

export interface ToastItem {
    id: string;
    flightId: string;
    changeType: FlightChangeActionType;
    title: string;
    message: string;
}

interface FlightScheduleState {
    flights: FlightScheduleDto[];
    selectedFlightId: string | null;
    pendingFlightChange: {
        flightId: string;
        action: FlightChangeActionType | null;
        message: string | null;
    } | null;
    notifications: NotificationItem[];
    toasts: ToastItem[];
    autoAssignmentTimeoutId: any | null;
    saveAssignments: (assignments: AutoAssignmentResultDto[]) => void;
    setSelectedFlight: (flight: FlightScheduleDto | null) => void;
    setPendingFlightChange: (flight: FlightScheduleDto | null, action: FlightChangeActionType | null, message?: string | null) => void;
    clearPendingFlightChange: () => void;
    addNotification: (flightId: string, changeType: FlightChangeActionType) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    triggerAutoAssignmentNotifications: () => void;
    resetNotifications: () => void;
    updateFlightManpower: (flightId: string, manpower: string) => void;
    updateFlightManpowerSeparate: (flightId: string, manpowerArr: string, manpowerDep: string) => void;
    removeToast: (id: string) => void;
}

function normalizeFlightValue(value: string) {
    return value.trim() || "-";
}

function hasFlightValue(value: string) {
    const trimmedValue = value.trim();
    return trimmedValue !== "" && trimmedValue !== "-";
}

function formatStaffAssignment(staff: AssignmentStaffDto | null) {
    if (!staff) return "";
    return `(${staff.badge}) ${staff.employeeCode} - ${staff.employeeName}`;
}

function getAssignmentFlightNumber(assignment: AutoAssignmentResultDto) {
    if (hasFlightValue(assignment.departureNo)) return assignment.departureNo;
    if (hasFlightValue(assignment.arrivalNo)) return assignment.arrivalNo;
    return assignment.id;
}

function getScheduleFlightNumber(flight: FlightScheduleDto) {
    if (hasFlightValue(flight.departureNo)) return flight.departureNo;
    if (hasFlightValue(flight.arrivalNo)) return flight.arrivalNo;
    return flight.id;
}

function getFlightKey(station: string, airlines: string, flightNumber: string) {
    return `${station}|${airlines}|${flightNumber}`;
}

function mapAssignmentToFlight(assignment: AutoAssignmentResultDto): Partial<FlightScheduleDto> {
    return {
        manpowerArr: formatStaffAssignment(assignment.manPowerArrival),
        manpowerDep: formatStaffAssignment(assignment.manPowerDeparture),
    };
}

function mergeFlights(
    existingFlights: FlightScheduleDto[],
    assignments: AutoAssignmentResultDto[]
) {
    const assignmentMap = new Map(
        assignments.map((assignment) => [
            getFlightKey(assignment.station, assignment.airlines, getAssignmentFlightNumber(assignment)),
            assignment,
        ])
    );

    return existingFlights.map((flight) => {
        const assignment = assignmentMap.get(
            getFlightKey(flight.station, flight.airlines, getScheduleFlightNumber(flight))
        );
        return assignment ? { ...flight, ...mapAssignmentToFlight(assignment) } : flight;
    });
}

const createFlightScheduleStore: StateCreator<FlightScheduleState> = (set, get) => ({
    flights: mockFlightSchedules,
    selectedFlightId: null,
    pendingFlightChange: null,
    notifications: [],
    toasts: [],
    autoAssignmentTimeoutId: null,

    saveAssignments: (assignments: AutoAssignmentResultDto[]) => {
        set((state) => ({
            flights: mergeFlights(state.flights, assignments),
        }));
    },

    setSelectedFlight: (flight) => {
        set({ selectedFlightId: flight?.id ?? null });
    },

    setPendingFlightChange: (flight, action, message) => {
        set({
            selectedFlightId: flight?.id ?? null,
            pendingFlightChange: flight
                ? {
                    flightId: flight.id,
                    action,
                    message: message ?? null,
                }
                : null,
        });
    },

    clearPendingFlightChange: () => {
        set({ pendingFlightChange: null });
    },

    addNotification: (flightId, changeType) => {
        const flights = get().flights;
        const flight = flights.find(f => f.id === flightId);
        const flightNo = flight?.departureNo || flight?.arrivalNo || flightId;

        let title = "";
        let message = "";

        if (changeType === "stand") {
            title = `${flightNo} Stand Changed`;
            const currentStand = flightId === "VN156" ? "BAY 11" : (flight?.parking || "GATE 08");
            const newStand = flightId === "VN156" ? "GATE 08" : "BAY 11";
            message = `Stand changed from ${currentStand} to ${newStand}.`;
        } else if (changeType === "time") {
            title = `${flightNo} Time Changed`;
            const currentTime = flight?.etd || flight?.eta || "07:00";
            message = `Schedule Time changed from ${currentTime} to 07:15.`;
        } else if (changeType === "aircraft") {
            title = `${flightNo} Aircraft Changed`;
            const currentReg = flight?.acReg || "VNA356";
            message = `Aircraft/Reg changed from ${currentReg} to VNA388.`;
        } else if (changeType === "vehicle") {
            title = `Vehicle Assigned for ${flightNo}`;
            message = `Ground support vehicle Tug #12 (TT-12) has been assigned for flight ${flightNo}.`;
        }

        const newNotif: NotificationItem = {
            id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            flightId,
            changeType,
            title,
            message,
            timestamp: "now",
            isRead: false,
        };

        set((state) => ({
            notifications: [newNotif, ...state.notifications],
            toasts: [
                ...state.toasts,
                {
                    id: newNotif.id,
                    flightId,
                    changeType,
                    title,
                    message,
                },
            ],
        }));
    },

    markAsRead: (id) => {
        set((state) => ({
            notifications: state.notifications.map(n => n.id === id ? { ...n, isRead: true } : n)
        }));
    },

    markAllAsRead: () => {
        set((state) => ({
            notifications: state.notifications.map(n => ({ ...n, isRead: true }))
        }));
    },

    triggerAutoAssignmentNotifications: () => {
        // Clear any existing timeout before setting a new one
        const currentTimeoutId = get().autoAssignmentTimeoutId;
        if (currentTimeoutId) {
            clearTimeout(currentTimeoutId);
        }

        // Reset notifications list (no accumulation)
        set({ notifications: [] });

        const timeoutId = setTimeout(() => {
            const { addNotification } = get();
            addNotification("VN156", "stand");
            addNotification("VN157", "time");
            addNotification("VN158", "aircraft");
            set({ autoAssignmentTimeoutId: null });
        }, 30000);

        set({ autoAssignmentTimeoutId: timeoutId });
    },

    resetNotifications: () => {
        const timeoutId = get().autoAssignmentTimeoutId;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        set({
            notifications: [],
            toasts: [],
            autoAssignmentTimeoutId: null,
        });
    },

    updateFlightManpower: (flightId, manpower) => {
        set((state) => ({
            flights: state.flights.map((f) =>
                f.id === flightId ? { ...f, manpowerArr: manpower, manpowerDep: manpower } : f
            ),
        }));
    },

    updateFlightManpowerSeparate: (flightId, manpowerArr, manpowerDep) => {
        set((state) => ({
            flights: state.flights.map((f) =>
                f.id === flightId ? { ...f, manpowerArr, manpowerDep } : f
            ),
        }));
    },

    removeToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        }));
    },
});

export const useFlightScheduleStore = create<FlightScheduleState>()(
    persist(
        (set, get, store) => createFlightScheduleStore(set, get, store),
        {
            name: "flight-schedule-storage",
            partialize: (state) => ({
                notifications: state.notifications,
                toasts: state.toasts,
                selectedFlightId: state.selectedFlightId,
                pendingFlightChange: state.pendingFlightChange,
            }),
        }
    )
);
