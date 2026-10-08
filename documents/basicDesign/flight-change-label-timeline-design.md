# THIẾT KẾ CƠ BẢN: CẬP NHẬT NHÃN BIẾN ĐỘNG CHUYẾN BAY TRÊN GRAPHICS TIMELINE (BASIC DESIGN)

Tài liệu này mô tả thiết kế cơ bản cho tính năng thêm ký hiệu (A), (T), (P) cạnh tên chuyến bay trên màn hình Graphics Timeline dựa trên trạng thái biến động từ Flight Schedule.

---

## 1. TỔNG QUAN

Khi một chuyến bay gặp biến động và được cập nhật từ màn hình Lịch bay (Flight Schedule), người điều hành có nhu cầu xem sự thay đổi đó trực quan trên biểu đồ thời gian (Graphics Timeline).
Tính năng này tự động bổ sung các nhãn ký hiệu chỉ loại hình biến động ngay bên cạnh mã đăng ký tàu bay của nhiệm vụ trên timeline:
- `(P)`: Biến động đổi bãi đỗ (Stand Change).
- `(T)`: Biến động đổi giờ bay (Time Change).
- `(A)`: Biến động đổi tàu bay (Aircraft Change).

Mục tiêu:
- Giúp người điều hành nhận biết ngay lập tức loại biến động của từng chuyến bay trực tiếp trên giao diện biểu đồ Gantt.
- Tự động đồng bộ hóa thông tin biến động được chuyển tiếp từ màn hình thông báo.

## 2. GIAO DIỆN NGƯỜI DÙNG (UI)

### 2.1. Vị trí hiển thị nhãn
- Ký hiệu chữ cái viết hoa đặt trong dấu ngoặc đơn `(P)`, `(T)`, `(A)` hiển thị ngay sau chuỗi đăng ký tàu bay của chuyến bay có biến động tương ứng.
- Nhãn này nằm bên trong thanh biểu thị công việc của kỹ thuật viên tương ứng trên hàng ngang của bảng Timeline Gantt.

### 2.2. Trạng thái và điều kiện hiển thị
- Nhãn biến động chỉ xuất hiện khi chuyến bay đó được kích hoạt quy trình điều chỉnh từ Lịch bay, và nhấn nút xem chi tiết trên timeline để chuyển tiếp dữ liệu qua tham số URL.
- Chuyến bay bình thường không có biến động hoặc không được chuyển tiếp qua link điều hướng sẽ hiển thị mã tàu bay nguyên bản.

## 3. LUỒNG XỬ LÝ (WORKFLOW)

1. Từ Modal thông báo thay đổi lịch bay, người dùng bấm nút xem chi tiết trên timeline.
2. Hệ thống chuyển hướng sang trang timeline kèm theo các tham số truy vấn về chuyến bay và loại biến động.
3. Màn hình Graphics Timeline nhận các tham số trên qua tham số URL.
4. Hệ thống tiến hành so khớp dữ liệu danh sách nhiệm vụ của kỹ thuật viên:
   - Nếu loại biến động là đổi bãi đỗ (Stand Change) $\rightarrow$ Cập nhật tên hiển thị của nhiệm vụ thêm hậu tố `(P)`.
   - Nếu loại biến động là đổi giờ bay (Time Change) $\rightarrow$ Cập nhật tên hiển thị của nhiệm vụ thêm hậu tố `(T)`.
   - Nếu loại biến động là đổi tàu bay (Aircraft Change) $\rightarrow$ Cập nhật tên hiển thị của nhiệm vụ thêm hậu tố `(A)`.
5. Cập nhật lại giao diện bảng Timeline Gantt với các nhãn mới.

## 4. KẾT NỐI VỚI HỆ THỐNG

### 4.1. Xử lý Client (Điều hướng)
- Truyền dữ liệu chuyến bay và loại biến động qua tham số URL khi chuyển trang.

### 4.2. Xử lý logic hiển thị
- Lắng nghe sự thay đổi của tham số URL để tính toán danh sách nhiệm vụ hiển thị động và thêm hậu tố tương ứng vào tên chuyến bay hiển thị trên timeline.

## 5. THIẾT KẾ COMPONENT

### 5.1. `GraphicsTimeLinePage`
- Nhận diện các tham số truy vấn và cập nhật danh sách nhiệm vụ phục vụ bay để truyền xuống component hiển thị bảng.

### 5.2. `GraphicsTimeLineTable`
- Nhận danh sách nhiệm vụ đã được xử lý nhãn động qua props và thực hiện render lên thanh Gantt chart.

## 6. GHI CHÚ THỰC THI

- Ký hiệu nhãn `(P)`, `(T)`, `(A)` cần được hiển thị rõ ràng, không bị che khuất hay cắt ngắn khi thanh công việc co lại trên các thiết bị màn hình nhỏ.
- Đảm bảo logic xử lý nhãn tự động khôi phục về mặc định khi người dùng tải lại trang không kèm tham số URL.
