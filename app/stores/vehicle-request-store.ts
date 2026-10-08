import { create } from "zustand";

export interface VehicleRequest {
  id: string;
  flightId: string;
  flightNo: string;
  parking: string;
  neededTime: string;
  pickup: string;
  serviceType: string;
  priority: string;
  note: string;
  requesterName?: string;
  status: "pending" | "searching" | "connecting" | "assigned" | "completed" | "cancelled";
  driverName: string | null;
  driverRating: number | null;
  vehicleName: string | null;
  vehiclePlate: string | null;
  eta: number | null; // in minutes
  createdAt: string;
}

export interface FlightTask {
  id: string;
  acReg: string;
  departureNo: string;
  route: string;
  eta: string;
  etd: string;
  parking: string;
  acType: string;
}

interface VehicleRequestState {
  tasks: FlightTask[];
  requests: Record<string, VehicleRequest>;
  currentRequestId: string | null;
  createRequest: (params: Omit<VehicleRequest, "id" | "status" | "driverName" | "driverRating" | "vehicleName" | "vehiclePlate" | "eta" | "createdAt">) => string;
  updateRequestStatus: (id: string, status: VehicleRequest["status"]) => void;
  assignDriver: (id: string, driver: { name: string; rating: number; vehicle: string; plate: string; eta: number }) => void;
  setCurrentRequestId: (id: string | null) => void;
  reset: () => void;
}

// Mock Tasks assigned to VAE03042 on 18/06/2026
const mockTasks: FlightTask[] = [
  {
    id: "VN156",
    acReg: "VNA624",
    departureNo: "VN156",
    route: "UIH-HAN-DLI",
    eta: "06:00",
    etd: "06:30",
    parking: "GATE 08",
    acType: "A350",
  },
  {
    id: "VN158",
    acReg: "VNA356",
    departureNo: "VN158",
    route: "HAN-UIH",
    eta: "",
    etd: "07:45",
    parking: "GATE 12",
    acType: "A350",
  },
  {
    id: "VN159",
    acReg: "VNA395",
    departureNo: "VN159",
    route: "VCA-HAN",
    eta: "07:07",
    etd: "",
    parking: "GATE 05",
    acType: "A350",
  },
];

export const useVehicleRequestStore = create<VehicleRequestState>((set, get) => ({
  tasks: mockTasks,
  requests: {
    "req-794wcvoco": {
      id: "req-794wcvoco",
      flightId: "VN156",
      flightNo: "VN156",
      parking: "GATE 08",
      neededTime: "06:00",
      pickup: "VAECO Hangar",
      serviceType: "Tug",
      priority: "Normal",
      note: "Yêu cầu xe kéo hỗ trợ di chuyển máy bay",
      status: "assigned",
      driverName: "Nguyễn Minh Đức",
      driverRating: 4.8,
      vehicleName: "Tug #12",
      vehiclePlate: "TT-12",
      eta: 4,
      createdAt: new Date().toISOString(),
    }
  },
  currentRequestId: null,

  createRequest: (params) => {
    const id = `req-${Math.random().toString(36).substr(2, 9)}`;
    const newRequest: VehicleRequest = {
      ...params,
      id,
      status: "pending",
      driverName: null,
      driverRating: null,
      vehicleName: null,
      vehiclePlate: null,
      eta: null,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      requests: {
        ...state.requests,
        [id]: newRequest,
      },
      currentRequestId: id,
    }));

    return id;
  },

  updateRequestStatus: (id, status) => {
    set((state) => {
      const request = state.requests[id];
      if (!request) return state;

      return {
        requests: {
          ...state.requests,
          [id]: {
            ...request,
            status,
          },
        },
      };
    });
  },

  assignDriver: (id, driver) => {
    set((state) => {
      const request = state.requests[id];
      if (!request) return state;

      return {
        requests: {
          ...state.requests,
          [id]: {
            ...request,
            status: "assigned",
            driverName: driver.name,
            driverRating: driver.rating,
            vehicleName: driver.vehicle,
            vehiclePlate: driver.plate,
            eta: driver.eta,
          },
        },
      };
    });
  },

  setCurrentRequestId: (id) => {
    set({ currentRequestId: id });
  },
  reset: () => {
    set({ requests: {}, currentRequestId: null });
  },
}));
