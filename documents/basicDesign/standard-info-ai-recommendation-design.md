# THIẾT KẾ CƠ BẢN: CẬP NHẬT STANDARD INFO VÀ GỢI Ý NHÂN SỰ TỪ AI RECOMMENDATION (BASIC DESIGN)

Tài liệu này mô tả thiết kế cơ bản cho tính năng cập nhật bảng thông tin Standard Info và hiển thị panel AI Recommendation để gợi ý nhân sự thay thế tối ưu trên giao diện Graphics Timeline.

---

## 1. TỔNG QUAN

Khi chuyến bay có sự thay đổi đột xuất (Đổi bãi, Đổi giờ, Đổi tàu), người điều phối cần có thông tin so sánh trực quan về sự thay đổi đó và một danh sách nhân viên tối ưu nhất để thay thế thực hiện nhiệm vụ dựa trên phân tích thông minh của AI.

Tính năng này triển khai:
- Bảng thông tin thay đổi (Standard Information/Time Information/Aircraft Information) hiển thị hai thẻ Current (hiện tại) và New (mới) cùng lý do, ghi chú của sự thay đổi.
- Panel AI Recommendation hiển thị kỹ thuật viên gợi ý chính kèm lý do lựa chọn (Workload, vị trí, chứng chỉ) và danh sách ứng viên phụ (Other Candidates).
- Cơ chế tự động gửi thông báo cập nhật công việc trực tiếp đến thiết bị App của Kỹ thuật viên khi thực hiện gán việc thành công.

Mục tiêu:
- Tự động hóa quá trình lựa chọn kỹ thuật viên có kỹ năng, vị trí và quỹ thời gian phù hợp nhất cho các nhiệm vụ biến động.
- Đảm bảo hiển thị dữ liệu thay đổi nhất quán 100% giữa Modal thông báo Lịch bay và Sidebar Timeline.
- Hỗ trợ giao diện Responsive chuẩn hóa, hiển thị dọc trên điện thoại và tối ưu trên máy tính bảng (iPad).

## 2. GIAO DIỆN NGƯỜI DÙNG (UI)

### 2.1. Bảng Thông Tin Biến Động (Standard Info)
- **Tiêu đề**: Thay đổi theo loại biến động:
  - `Stand Information` (nếu đổi bãi).
  - `Time Information` (nếu đổi giờ).
  - `Aircraft Information` (nếu đổi tàu).
- **Thành phần**:
  - Hai thẻ con: **Current Card** (giá trị hiện tại) và **New Card (Update)** (giá trị mới) đặt song song, ngăn cách bằng mũi tên `→`.
  - Icon phân biệt: Đổi giờ hiển thị icon Đồng hồ (`Clock`), Đổi bãi/tàu hiển thị icon Máy bay (`Plane`).
  - **Update Details**: Hiển thị Lý do (Reason - dropdown) và Ghi chú (Note - textarea) tương ứng loại thay đổi.
  - **Nút hành động**: Cặp nút `Cancel` và `Publish Update`.

### 2.2. Panel Gợi Ý AI (AI Recommendation)
- **Banner xanh lá**: Thông báo cơ chế phân tích của AI.
- **Thẻ Work Order**: Hiển thị thông tin mã công việc (WO), dòng tàu bay và thời gian đến hạn.
- **Current Situation**: So sánh giữa trạng thái chưa gán việc (Unassigned) và mức tải công việc hiện tại (High).
- **AI Recommended Technician**:
  - Avatar, tên và các nhãn chứng chỉ (Certificates) phù hợp.
  - Vị trí hiện tại và biểu đồ tròn/thanh tải công việc của kỹ thuật viên gợi ý chính.
  - Các lý do lựa chọn chi tiết và lợi ích ước tính (Expected Benefit) khi lựa chọn nhân sự này.
- **Other Candidates**: Danh sách ứng viên phụ (avatar, tên, mức độ tải công việc).
- **Nút hành động**: Cặp nút `Cancel` và `Accept Recommendation`.

### 2.3. Responsive Design
- Trên màn hình điện thoại (Mobile):
  - Hai thẻ so sánh Current/New xếp dọc, mũi tên hướng xuống dưới `↓`.
  - Các cặp nút hành động (`Cancel` / `Publish Update`, `Cancel` / `Accept Recommendation`) tự động xếp dọc thành 2 hàng để dễ bấm trên màn hình cảm ứng.
- Trên màn hình máy tính bảng (iPad):
  - Layout bảng biểu đồ Timeline và Sidebar thông tin xếp dọc thành 2 hàng khác nhau (Timeline ở trên, các Panel thông tin ở dưới).

## 3. LUỒNG XỬ LÝ & MOCK LOGIC (WORKFLOW)

1. Người dùng điều hướng từ modal sang Timeline kèm thông tin loại biến động.
2. Màn hình Timeline trích xuất thông tin biến động từ URL và chuyển dữ liệu xuống hai Panel tương ứng.
3. **Phân tích dữ liệu & Gợi ý nhân sự (Mock Logic)**:
   - **Đổi tàu (Aircraft Change)** $\rightarrow$ Gợi ý kỹ thuật viên có chứng chỉ (Certificate) phù hợp với dòng tàu bay mới.
   - **Đổi bãi đỗ (Stand Change)** $\rightarrow$ Gợi ý kỹ thuật viên đang ở vị trí hoặc phân khu (Zone) gần bãi đỗ mới nhất để giảm thiểu thời gian di chuyển.
   - **Đổi giờ bay (Time Change)** $\rightarrow$ Gợi ý kỹ thuật viên có ca trực và thời gian biểu phù hợp nhất với khung giờ thay đổi mới của chuyến bay.
   - **Trường hợp mặc định** $\rightarrow$ Gợi ý kỹ thuật viên mặc định theo phân công ban đầu hoặc người có độ khả dụng cao nhất.
4. Khi người điều hành nhấn **Accept Recommendation** hoặc **Publish Update**:
   - Hệ thống tiến hành cập nhật bảng phân công nhiệm vụ.
   - Đồng thời, kích hoạt luồng gửi thông báo cập nhật công việc trực tiếp đến thiết bị App của Kỹ thuật viên được gán việc.

## 4. KẾT NỐI VỚI HỆ THỐNG

### 4.1. Xử lý Client (Props & State)
- Panel thông tin biến động nhận các props về loại thay đổi và thông tin chuyến bay để hiển thị so sánh dữ liệu động một cách đồng nhất.
- Panel gợi ý AI nhận tham số loại thay đổi để truy xuất danh sách kỹ thuật viên gợi ý tương ứng.

### 4.2. Xử lý Notification đến App KTV
- Tích hợp gọi API hoặc hàm xử lý gửi thông báo đẩy (Push Notification) đến thiết bị di động của kỹ thuật viên được chọn để phân công công việc.

## 5. THIẾT KẾ COMPONENT

### 5.1. `GraphicsTimeLineStandardInfo`
- Nhận thông tin loại thay đổi và chuyến bay qua props, chịu trách nhiệm render bảng so sánh giá trị cũ/mới và lý do thay đổi.

### 5.2. `GraphicsTimeLineAiRecommendation`
- Nhận thông tin loại thay đổi, chịu trách nhiệm render giao diện kỹ thuật viên gợi ý chính, các lợi ích đi kèm và danh sách ứng viên phụ.

## 6. GHI CHÚ THỰC THI

- Đảm bảo dữ liệu và hình ảnh hiển thị trên AI recommendation sắc nét, sử dụng ảnh minh họa avatar chất lượng cao từ nguồn CDN ổn định.
- Nút bấm và input có độ rộng vừa vặn, không bị tràn hay đè chữ khi co giãn khung nhìn.
