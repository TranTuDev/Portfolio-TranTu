# KẾ HOẠCH DEMO TÍNH NĂNG GỌI XE HỖ TRỢ (GROUND SUPPORT REQUEST)

Tài liệu này mô tả kịch bản demo tính năng gọi xe hỗ trợ mặt đất dành cho Kỹ thuật viên (KTV) trên giao diện Mobile, tích hợp với dữ liệu lịch bay hiện có của dự án.

---

## 1. Dòng quy trình (User Flow)

### Bước 1: Màn hình Danh sách nhiệm vụ (`Flight Service Tasks`)
- **Mô tả**: Đây là màn hình bắt đầu của KTV sau khi đăng nhập.
- **Dữ liệu**: Hiển thị danh sách chuyến bay ngày **18/06/2026** mà KTV `VAE03042` được phân công.
- **Hành động**: KTV nhấn vào nút **"Request Vehicle"** tại một chuyến bay cụ thể để bắt đầu gọi xe hỗ trợ cho chuyến bay đó.

### Bước 2: Màn hình Form yêu cầu (`Service Request Form`)
- **Tiêu đề**: New Flight Service Task
- **Thông tin chuyến bay (Flight Information)**:
    - **Parking**: Hiển thị Gate/Stand (ví dụ: `GATE 08`).
    - **Needed Time**: Thời gian cần xe (ví dụ: `06:00`).
- **Các trường nhập liệu**:
    - **Pick-up Location***: Dropdown chọn điểm đón (ví dụ: `VAECO Hangar`).
    - **Vehicle Type***: Dropdown chọn loại xe (ví dụ: `Shuttle Bus (Staff)` - thay cho các loại xe tải/xe kéo cũ).
    - **Priority***: Chọn 1 trong 4 mức: `Low`, `Normal`, `High`, `Urgent`.
    - **Notes for Driver**: Ô văn bản nhập ghi chú thêm.
- **Hành động**: Nhấn nút **"SEND REQUEST"**.
- **Điều hướng**: Có nút **"Back to tasks"** để quay lại.

### Bước 3: Màn hình Chờ xử lý (`Request Processing Simulation`)
- **Mô tả**: Màn hình giả lập quá trình hệ thống tìm kiếm xe.
- **Hiển thị**: 
    - Bản đồ khu vực sân bay với các vị trí xe giả lập.
    - Một vùng thông báo trạng thái phía dưới chạy hiệu ứng log sau mỗi vài giây:
        - *0s - 10s*: "Đang gửi yêu cầu đến trung tâm điều hành..."
        - *10s - 20s*: "Hệ thống đang tìm kiếm phương tiện khả dụng gần nhất..."
        - *20s - 30s*: "Đã tìm thấy tài xế Nguyễn Văn A (Tug #12). Đang chờ xác nhận..."
- **Hành động**: Sau 30 giây, hệ thống tự động chuyển sang màn hình **Live Tracking**.

### Bước 4: Màn hình Theo dõi trực tiếp (`Live Tracking & Assignment`)
- **Mô tả**: Hiển thị thông tin chi tiết sau khi xe đã được gán thành công.
- **Thông tin hiển thị**:
    - **Tài xế**: Nguyễn Văn A - 4.8 ⭐
    - **Phương tiện**: Tug #12 (Biển số: TT-12)
    - **ETA**: 4 phút.
- **Bản đồ**: 
    - Hiển thị vị trí hiện tại của xe và vị trí điểm đón.
    - Vẽ **đường đi màu xanh (Blue Path)** nối từ xe đến điểm đón để mô phỏng hành trình.
- **Hành động**: Nút "View Request Details" hoặc "Call Driver".

---

## 2. Danh sách các Route mới (Đề xuất)

1. `/mobile/flight-tasks`: Danh sách nhiệm vụ phục vụ bay.
2. `/mobile/vehicle-request/new`: Form tạo yêu cầu gọi xe.
3. `/mobile/vehicle-request/processing`: Màn hình chờ giả lập 30s.
4. `/mobile/vehicle-request/tracking/:id`: Màn hình theo dõi xe đã gán.

---

## 3. Dữ liệu giả lập (Mock Data)

### Chuyến bay (từ hệ thống hiện tại):
- **Flight**: VN156
- **Stand**: B2
- **Time**: 18/06/2026 10:30

### Xe và Tài xế:
- **Vehicle**: `Tug #12`, `Tug #15`, `Tug #18`.
- **Driver**: `Nguyễn Văn A`, `Trần Minh B`, `Phạm Quốc D`.

---

## 4. Các bước triển khai tiếp theo

1. **Cấu hình Route**: Thêm các đường dẫn mới vào `app/routes.ts`.
2. **Tạo Component**:
    - `FlightTaskCard`: Card hiển thị nhiệm vụ bay.
    - `VehicleRequestForm`: Form với logic auto-fill.
    - `SimulationMap`: Component bản đồ hỗ trợ vẽ đường đi (Polyline) và hiệu ứng log.
3. **Logic Simulation**: Sử dụng `setTimeout` hoặc `setInterval` để thay đổi trạng thái thông báo trong 30 giây.
