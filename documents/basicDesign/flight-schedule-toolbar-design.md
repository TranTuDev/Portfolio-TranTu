# THIẾT KẾ CƠ BẢN: TOOLBAR ĐỔI THÔNG TIN CHUYẾN BAY TRÊN FLIGHT SCHEDULE (BASIC DESIGN)

Tài liệu này mô tả thiết kế cơ bản cho tính năng thêm toolbar chứa các nút thao tác trên trang `/flight-schedule`, cùng cơ chế hiển thị notification khi người dùng bấm nút.

---

## 1. TỔNG QUAN

Tính năng bổ sung một toolbar bên trái của bảng dữ liệu trên trang `flight-schedule` với 3 nút hành động:
- `Đổi Stand (P)`
- `Đổi giờ (T)`
- `Đổi tàu (A)`

Mục tiêu:
- Dễ dàng truy cập các hành động thay đổi thông tin chuyến bay ngay khi xem lịch bay.
- Hiển thị notification ngắn gọn ở góc trên bên phải khi người dùng kích hoạt hành động.

## 2. GIAO DIỆN NGƯỜI DÙNG (UI)

### 2.1. Vị trí toolbar
- Nằm ở bên trái của phần `table action` trên trang `/flight-schedule`.
- Thiết kế dạng một thanh nút thẳng hàng hoặc dọc tuỳ vào không gian hiển thị.
- Có thể đặt phía trên cùng của bảng hoặc ngay bên trái khung điều khiển lọc.

### 2.2. Các nút hành động
- `Đổi Stand (P)`
  - Mã phím tắt: `P`
  - Mục đích: Khởi động quy trình đổi stand cho chuyến bay được chọn.
- `Đổi giờ (T)`
  - Mã phím tắt: `T`
  - Mục đích: Khởi động quy trình điều chỉnh giờ cất/hạ cánh hoặc hiển thị dialog đổi giờ.
- `Đổi tàu (A)`
  - Mã phím tắt: `A`
  - Mục đích: Khởi động quy trình đổi tàu/hạng tàu cho chuyến bay được chọn.

### 2.3. Trạng thái nút
- Các nút hiển thị bật/tắt dựa trên quyền hạn và trạng thái chọn dòng:
  - Nếu không có chuyến bay nào được chọn: tất cả nút ở trạng thái disabled.
  - Nếu chuyến bay được chọn và người dùng có quyền thao tác: nút enabled.
- Hỗ trợ tooltip ngắn gọn khi hover: `Chọn 1 chuyến bay để thực hiện`.

### 2.4. Notification
- Hiển thị tại góc trên bên phải màn hình.
- Tham khảo giao diện snackbar top-right từ Able Pro Admin.
- Nội dung notification ngắn gọn:
  - `Đã gửi yêu cầu đổi Stand.`
  - `Đã gửi yêu cầu đổi giờ.`
  - `Đã gửi yêu cầu đổi tàu.`
- Kiểu hiển thị:
  - `success` khi hành động được khởi tạo thành công.
  - `error` khi có vấn đề xảy ra.
- Thời gian tự ẩn: 4–5 giây.
- Có thể thêm icon nhỏ để phân biệt: `check` cho success, `warning`/`error` cho lỗi.

## 3. LUỒNG XỬ LÝ (WORKFLOW)

1. Người dùng truy cập trang `/flight-schedule`.
2. Người dùng chọn một hoặc nhiều chuyến bay trong bảng.
3. Người dùng nhấn một trong 3 nút toolbar:
   - `Đổi Stand (P)`
   - `Đổi giờ (T)`
   - `Đổi tàu (A)`
4. Hệ thống kiểm tra điều kiện:
   - Có chuyến bay được chọn không.
   - Người dùng có quyền thao tác không.
5. Nếu hợp lệ, hành động được kích hoạt.
6. Hiển thị notification snackbar ở góc trên bên phải.
7. Nếu cần, mở dialog chi tiết hoặc chuyển tiếp tới bước xử lý tiếp theo.

## 4. KẾT NỐI VỚI HỆ THỐNG

### 4.1. Xử lý client
- Nút click sẽ gọi một hàm xử lý nội bộ.
- Hàm xử lý sẽ:
  - xác thực dữ liệu đầu vào;
  - khởi động luồng thay đổi tương ứng;
  - hiển thị notification.

### 4.2. Xử lý server / API
- Tùy theo bản chất tính năng, có thể:
  - gọi API cập nhật thông tin chuyến bay;
  - mở modal/step tiếp theo để xác nhận thay đổi.
- Notification nên hiển thị ngay khi hành động được gửi thành công, hoặc hiển thị lỗi khi API trả về.

## 5. THIẾT KẾ COMPONENT

### 5.1. `FlightScheduleToolbar`
- Props:
  - `selectedRows`: danh sách chuyến bay được chọn.
  - `onChangeStand`: callback khi bấm `Đổi Stand`.
  - `onChangeTime`: callback khi bấm `Đổi giờ`.
  - `onChangeAircraft`: callback khi bấm `Đổi tàu`.
- Nội dung:
  - 3 nút `Button`/`IconButton` với label và shortcut.
  - trạng thái disabled khi không có lựa chọn.

### 5.2. `SnackbarNotification`
- Props:
  - `open`: boolean.
  - `message`: string.
  - `severity`: `success | error | info | warning`.
  - `onClose`: callback đóng.
- Vị trí: `anchorOrigin={{ vertical: 'top', horizontal: 'right' }}`.
- Tự ẩn sau 4000–5000ms.

## 6. GHI CHÚ THỰC THI

- Duy trì sự nhất quán với hệ thống notification hiện có của ứng dụng nếu đã có.
- Nếu chưa có notification riêng, dùng component snackbar top-right tương tự Able Pro Admin.
- Toolbar nên dễ mở rộng nếu thêm nút hành động mới trong tương lai.
- Giữ phần logic xử lý và hiển thị notification tách biệt.
