# LUỒNG 1: AUTO ASSIGNMENT (PHÂN CÔNG TỰ ĐỘNG)

## Màn 1: Quản lý nhân sự (/personnel)
- **Chú ý:** 5 nhân viên chủ chốt (Bùi Mạnh Hà, Đỗ Quốc Huy...) đang ở trạng thái ĐANG LÀM VIỆC.
![Personnel](./imgs/personnel.png)

## Màn 2: Quản lý chứng chỉ (/certificates)
- **Chú ý:** Cả 5 người đều có chứng chỉ phù hợp cho máy bay A-350. Riêng Bùi Mạnh Hà có thêm 1 chứng chỉ đặc thù cho Work Order.
![Certificates](./imgs/certificates.png)

## Màn 3: Phân ca (/rostering)
- **Chú ý:** Ngày 18/06/2026, cả 5 người đều đi Ca Sáng (CS).
![Rostering](./imgs/rostering.png)

## Màn 4: Kế hoạch tổng thể (/master-plan)
- **Chú ý:** Thấy bản ghi kế hoạch Ca Sáng (CS) ngày 18/06/2026.
![Master Plan](./imgs/master-plan.png)

## Màn 5: Chi tiết phân công (/master-plan/manpower/1)
- **Bước làm:** Nhấn nút Add to plan (Hệ thống đã tự động chọn sẵn các nhân viên phù hợp).
- **Chú ý:** Tab VNA - CRSA/B sáng lên và hiển thị số lượng là 5.
![Manpower 1](./imgs/manpower1.png)
![Manpower 2](./imgs/manpower2.png)
![Manpower 3](./imgs/manpower3.png)

## Màn 6: Lịch bay & Điều hành (/flight-schedule)
- **Bước làm:** Nhấn nút Get flight schedule trên thanh công cụ để tải dữ liệu.
- **Chú ý:** Các chuyến bay A350 được ưu tiên hiển thị ở trên cùng, bảng Man-power Plan Summary hiển thị đủ 5 người.
![Flight Schedule 1](./imgs/flight-schedule1.png)
![Flight Schedule 2](./imgs/flight-schedule2.png)
![Flight Schedule 3](./imgs/flight-schedule3.png)

## Màn 7: Chạy Auto Assignment (Nút trên màn Lịch bay)
- **Bước làm:**
    - Nhấn nút Auto Assignment.
    - Step 1 (Time Config): Giữ nguyên các tham số thời gian -> Nhấn Next.
    - Step 2 (Assignment Options): Giữ nguyên các tùy chọn mặc định -> Nhấn Run Assignment.
![Auto Assignment 1](./imgs/Auto%20Assignment1.png)
![Auto Assignment 2](./imgs/Auto%20Assignment2.png)

## Màn 8: Lưu kết quả (/flight-schedule/auto-assignment)
- **Bước làm:** Nhấn nút Save Assignments.
- **Chú ý:** Hệ thống quay về màn Lịch bay, tên của 5 nhân viên đã được gán vào các chuyến bay tương ứng.
![Auto Assignment Result 1](./imgs/auto-assignment%20result.png)
![Auto Assignment Result 2](./imgs/auto-assignment%20result2.png)

## Màn 9: Biểu đồ Timeline (/graphics-time-line)
- **Chú ý:** Kiểm tra trực quan các thanh công việc của nhân viên trên biểu đồ.
![Graphics Timeline](./imgs/graphics-time-line.png)

# LUỒNG 2: WORK ORDER (LỆNH SỬA CHỮA)

## Màn 10: Quản lý Work Order (/work-order-control)
- **Bước làm:** Nhấn Download Data -> Xác nhận tải dữ liệu.
![Work Order Control 1](./imgs/work-order-control1.png)
![Work Order Control 2](./imgs/work-order-control2.png)
![Work Order Control 3](./imgs/work-order-control3.png)

## Màn 11: Gán Work Order (/assign-work-order-to-flight)
![Assign WO 1](./imgs/assign-work-order-to-flight1.png)
**A. Gán Work Order**
- **Bước làm:**
    - Gán WO 1: Chọn WO đầu tiên -> Chọn chuyến bay -> Chọn Bùi Mạnh Hà -> Nhấn Assign.
![Assign WO 2](./imgs/assign-work-order-to-flight2.png)
![Assign WO 3](./imgs/assign-work-order-to-flight3.png)
    - Gán WO 2: Tương tự, chọn WO thứ hai -> Chọn chuyến bay -> Chọn Bùi Mạnh Hà -> Nhấn Assign.
**B. Chuyển Work Order sang Issue**
    - Thực hiện chuyển Work Order 3 và 4 sang trạng thái "Issue".
**C. Kết quả cuối cùng**
    - 2 WO đầu tiên được chuyển sang trạng thái "In Progress" và gán cho Bùi Mạnh Hà.
    - 2 WO tiếp theo được chuyển sang trạng thái "Issue".
![Assign WO 4](./imgs/assign-work-order-to-flight4.png)

## Màn 12: Dashboard Kỹ thuật viên (/technician-dashboard)
- **Chú ý:** Đăng nhập với tài khoản của Bùi Mạnh Hà, mục IN PROGRESS hiển thị số 02.
- **Bước làm:** Nhấn View All Workorders.
![Technician Dashboard](./imgs/technician-dashboard.png)

## Màn 13: Danh sách nhiệm vụ (/technician-task-control)
- **Bước làm:**
    - Tại tab **My Task**: Hiển thị 2 WO đã được gán ở Màn 11. Tiến hành cập nhật 1 WO sang trạng thái **"Handover"** và 1 WO sang **"Final Test"**.
![Technician Task Control 1](./imgs/technician-task-control1.png)
![Technician Task Control 2](./imgs/technician-task-control2.png)
![Technician Task Control 3](./imgs/technician-task-control3.png)
   - Tại tab **Get Task**: Hiển thị các công việc từ Màn 11. Kỹ thuật viên có thể nhấn nút **Accept Task** để nhận các công việc đã được gán.
![Technician Task Control 4](./imgs/technician-task-control4.png)

## Màn 14: Theo dõi Work Order (/work-order-in-out)
- **Chú ý:** Danh sách hiển thị 2 Work Order từ Màn 13 với trạng thái là **"Handover"** và **"Final Test"**.
- ![work-order-in-out](./imgs/work-order-in-out.png)