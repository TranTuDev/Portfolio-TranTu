# Ghi chú: Nghiệp vụ Thay đổi Sân bay & Bãi đỗ (Hệ thống MMS-LINE)

> **Nguồn tham chiếu**: Tài liệu hướng dẫn sử dụng **MMS – Line: Quản lý và Điều hành Lịch Bay** (VAECO, 2020).
> **Mục tiêu**: Làm cơ sở dữ liệu để chuẩn hóa logic hiển thị và xử lý trên bảng điều hành lịch bay.

---

## 1. Cơ chế Cảnh báo Thay đổi (Cột <Change>)

Hệ thống tự động so sánh lịch bay thực tế từ server với lịch kế hoạch. Khi có sai lệch, ký hiệu sẽ xuất hiện tại cột **`<Change>`**:

| Ký hiệu | Loại thay đổi | Logic Hiển thị & Cảnh báo |
|:---:|:---|:---|
| **A** | **Aircraft** (Đổi tàu) | Ô **A/C Reg** đổi màu cảnh báo. Cần kiểm tra chứng chỉ nhân viên đã gán. |
| **T** | **Time** (Đổi giờ) | Ô **ETA/ETD** đổi màu cảnh báo. Hệ thống tự cập nhật trạng thái **DELAY** nếu giờ mới muộn hơn giờ cũ. |
| **P** | **Park** (Đổi bãi đỗ) | Cập nhật số bãi đỗ mới vào cột Park. Không gây nguy cơ xung đột nhân sự. |

- **Kết hợp**: Nếu đổi cả giờ và bãi đỗ, cột Change hiển thị `TP`.
- **Dòng màu xanh**: Dành cho chuyến bay mới được thêm vào lịch (chưa có trong kế hoạch gốc).

---

## 2. Logic Hiển thị Giờ bay (ETA/ETD)

Thông tin giờ bay là yếu tố quan trọng nhất trong điều hành, có các quy tắc hiển thị đặc thù:

- **Quy tắc tô màu**: Chỉ khi có thay đổi giờ (ký hiệu **T** xuất hiện) thì các ô giờ tương ứng mới được tô màu nổi bật. Nếu không có thay đổi, giờ hiển thị ở định dạng bình thường.
- **Ký hiệu giờ qua đêm (`+`)**: Các chuyến bay có giờ đến/đi trong khoảng từ **00:00 – 06:00** sáng ngày hôm sau sẽ có dấu `+` đi kèm (ví dụ: `01:30+`).
- **Trạng thái Delay**: Hệ thống tự so sánh thời gian. Nếu thời gian cập nhật > thời gian kế hoạch ban đầu → Trạng thái chuyến bay chuyển thành **DELAY**.

---

## 3. Logic Hiển thị Bãi đỗ (Parking)

Thông tin bãi đỗ được lấy từ nguồn **VIAGS** (Internet) và có cách hiển thị thay đổi theo trạng thái xử lý:

| Trạng thái chuyến bay | Cách hiển thị cột Bãi đỗ |
|:---|:---|
| **Chưa lưu phân công** | Hiển thị 1 cột duy nhất: **`Parking`** (chứa thông tin bãi đỗ chung). |
| **Đã lưu phân công** | Tự động tách thành 2 cột: **`Park(Arr)`** (Bãi đỗ đến) và **`Park(Dep)`** (Bãi đỗ đi). |

- **Đặc điểm**: Thay đổi bãi đỗ (P) thường xuyên xảy ra nhưng tài liệu quy định đây là thay đổi ít nguy cơ, không yêu cầu hệ thống phải gán lại người (Auto Assignment lại).

---

## 4. Cấu trúc các cột trên Bảng điều hành (Flight Table)

Dựa trên tài liệu, bảng điều hành chuẩn bao gồm các nhóm thông tin:

1.  **Thông tin định danh**: `Station` (Sân bay hiện tại), `Airlines`, `A/C Reg`, `A/C Type`.
2.  **Thông tin chuyến bay**: `Arrival No` (Số hiệu đến), `Departure No` (Số hiệu đi), `Route` (Hành trình).
3.  **Thông tin thời gian**: `ETA` (Giờ đến dự kiến), `ETD` (Giờ đi dự kiến) — *Có logic đổi màu và dấu `+`*.
4.  **Thông tin hỗ trợ**: 
    *   `<Change>`: Cột ký hiệu thay đổi (A, T, P).
    *   `Status`: Trạng thái (được gán tự động hoặc theo ghi chú).
    *   `Work Order`: Ký hiệu `X` (đã gán WO), `M` (WO có hạng mục bắt buộc - Mandatory).
    *   Biểu tượng kéo tàu (nếu có kế hoạch kéo tàu).

---

## 5. Logic Station & Blocked Time (Cấu hình hệ thống)

"Station" xác định các tham số tính toán cho việc phân công tự động. Mỗi Station (HAN, SGN, DAD...) có cấu hình riêng cho từng loại tàu bay:

- **Travel time**: Thời gian di chuyển.
- **Taxi-in time**: Thời gian máy bay lăn vào bến.
- **Preparation time**: Thời gian chuẩn bị.
- **Aircraft check time**: Thời gian thực hiện kiểm tra kỹ thuật.
- **Tổng Blocked Time**: `= (Taxi-in + Travel + Prep + Check)`. Đây là khoảng thời gian nhân viên bị "khóa" trên sơ đồ Timeline, không thể nhận việc khác.

---

## 6. Lưu ý cho việc sửa Code (FlightTable)

- **Không fix cứng màu đỏ** cho ETA/ETD. Phải check điều kiện: `if (hasChangeT) { applyColor(); }`.
- **Logic tách cột Parking**: Cần kiểm tra trạng thái `hasSavedAssignments` của chuyến bay để render 1 cột hay 2 cột bãi đỗ.
- **Ký hiệu `+`**: Cần hàm xử lý string/date để thêm dấu `+` nếu giờ nằm trong khoảng 0h-6h.
