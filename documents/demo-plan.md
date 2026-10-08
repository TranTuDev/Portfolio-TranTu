# TÀI LIỆU KẾ HOẠCH DEMO (18/06/2026)

Tài liệu này phục vụ cho việc demo luồng quản lý nhân lực ngoại trường với dữ liệu thực tế từ hệ thống.

---

## I. DEMO LUỒNG AUTO ASSIGNMENT

- **Ngày Demo**: `2026-06-18` (Cấu hình tại `app/config/app-config.ts`)
- **Loại máy bay**: `A-350` (Group A/C: `G350`)
- **Đơn vị**: `VNA - CRSA/B`
- **Danh sách 5 nhân viên chủ chốt**:

| STT | Mã nhân viên (Staff ID) | Họ và Tên | Trạng thái |
|:---:|:---|:---|:---|
| 1 | `VAE03042` | **Bùi Mạnh Hà** | ĐANG LÀM VIỆC |
| 2 | `VAE02958` | **Đỗ Quốc Huy** | ĐANG LÀM VIỆC |
| 3 | `VAE01992` | **Dương Trọng Cường** | ĐANG LÀM VIỆC |
| 4 | `VAE02422` | **Hà Đình Trung** | ĐANG LÀM VIỆC |
| 5 | `VAE01094` | **Hà Hùng Tới** | ĐANG LÀM VIỆC |

---

## 1. Màn hình: `/personnel` (Quản lý nhân sự)
- **Mục tiêu**: Chứng minh 5 nhân viên đang ở trạng thái làm việc.
- 5 nhân viên trên đã được sắp xếp lên đầu

## 2. Màn hình: `/certificates` (Quản lý chứng chỉ)
- **Mục tiêu**: Chứng minh nhân viên đủ năng định cho máy bay A-350. Bùi Mạnh Hà có thêm 1 chứng chỉ cho work order
- **Dữ liệu cụ thể**:
    - **Bùi Mạnh Hà**:
        - Cert No `VAE-350-01AC`, Hạn dùng: `2028-12-31`.
        - Cert No `VAE-321-01AC`, Hạn dùng: `2028-12-31`.
    - **Đỗ Quốc Huy**: Cert No `VAE-350-02AC`, Hạn dùng: `2028-12-31`.
    - **Dương Trọng Cường**: Cert No `VAE-350-03AC`, Hạn dùng: `2027-10-15`.
    - **Hà Đình Trung**: Cert No `VAE-350-04AC`, Hạn dùng: `2029-12-20`.
    - **Hà Hùng Tới**: Cert No `VAE-350-05AC`, Hạn dùng: `2028-12-31`.

## 3. Màn hình: `/rostering` (Phân ca)
- **Mục tiêu**: Kiểm tra lịch làm việc của 5 nhân viên vào ngày demo.
- **Dữ liệu cụ thể**:
    - Chọn tháng **06/2026**.
    - Tại cột ngày **18**, cả 5 nhân viên đều hiển thị mã ca **"CS"** (Ca Sáng).

## 4. Màn hình: `/master-plan` (Kế hoạch tổng thể)
- **Mục tiêu**: Truy cập vào kế hoạch nhân lực của ngày demo.
- **Dữ liệu cụ thể**:
    - Chọn ngày `18/06/2026`.
    - Thấy bản ghi: `KẾ HOẠCH PHỤC VỤ MÁY BAY NGÀY 18/06/2026 [CS]`.
    - Station: `HAN - Ha Noi`.

## 5. Màn hình: `/master-plan/manpower/1` (Chi tiết phân công nhân lực)
- **Thao tác Demo**:
    1. Hệ thống hiển thị danh sách **Candidates** (Những người đi làm ca CS ngày 18).
    2. Đã chọn sẵn (tích xanh) 5 nhân viên: *Bùi Mạnh Hà, Đỗ Quốc Huy, Dương Trọng Cường, Hà Đình Trung, Hà Hùng Tới*.
    3. Ấn nút **"Add to plan"**.
- **Kết quả thay đổi**:
    - Tab **VNA - CRSA/B** sáng lên.
    - Con số tổng hợp tại tab này nhảy lên: **5**.
    - Nhóm Group A/C hiển thị: **G350** (Tương ứng với loại máy bay A-350).

## 6. Màn hình: `/flight-schedule` (Lịch bay & Điều hành)
- **Mục tiêu**: Kiểm tra sự đồng bộ dữ liệu.
- **Dữ liệu cụ thể**:
    - Hiển thị danh sách chuyến bay ngày `18/06/2026` (Ví dụ: VN156, VN157... AcType: `A350`).
    - hiển thị 5 lịch bay của lại máy bay AcType: `A350` lên đầu tiên
    - Tại bảng **Man-powers Plan Summary**:
        - Danh sách 5 nhân viên đã được add từ Master Plan hiển thị đầy đủ.
        - Hiển thị kỹ năng (Skills) tương ứng (B1/B2/CS) của từng người.

## 7. Chức năng: Auto Assignment (Tại màn hình Lịch bay)
> **Tham chiếu mã nguồn**: `app/components/flight-schedule/auto-assignment-wizard-time-configuration.tsx` (bắt đầu từ dòng 41)

- **Thao tác Demo**:
    1. Tại màn hình `/flight-schedule`, nhấn nút **"Auto Assignment"**.
    2. Hệ thống hiển thị một cửa sổ (modal/popup) với 2 bước cấu hình.
    3. Sau khi hoàn tất cấu hình, nhấn nút **"Run Assignment"**.

- **Giải thích các bước**:

    - **Step 1: Assignment Time Configuration (Cấu hình Tham số Thời gian)**
        - **Mục đích**: Cho phép người dùng cấu hình các tham số chi tiết để hệ thống tính toán tổng thời gian "bận" (Blocked Time) của một nhân viên khi được gán cho một công việc. Thời gian này bao gồm cả các hoạt động phụ trợ, đảm bảo việc điều phối nhân lực có tính thực tế cao.
        - **Bảng cấu hình tham số (Kịch bản: Kiểm tra A350 khi đến)**:

| Hạng mục thời gian | Tham số cấu hình (Label trong hệ thống) | Giá trị ví dụ (phút) | Ghi chú |
|:---|:---|:---:|:---|
| Thời gian chờ máy bay vào bến | `2. Taxi-in time after landing:` | 5 | Nhân viên phải chờ máy bay vào vị trí. |
| Thời gian di chuyển của nhân viên | `1. Travel time between positions:` | 20 | Thời gian nhân viên đi từ khu vực chuẩn bị ra máy bay. |
| Thời gian chuẩn bị tại máy bay | `3. Arrival preparation time:` | 10 | Thời gian chuẩn bị dụng cụ, thiết bị ngay tại máy bay. |
| **Thời gian thực hiện công việc** | **`6. Aircraft check time after stop (per aircraft type):`** | **60** | Thời gian kỹ thuật chính để kiểm tra máy bay A350. |
| **Tổng cộng** | | **95** | **(khoảng 1.6 giờ)** |

        - **Kết quả tính toán**: Dựa trên các tham số trong bảng, tổng thời gian "bận" của một nhân viên cho công việc này là **95 phút**. Hệ thống sẽ "khóa" nhân viên này trong khoảng thời gian đó để không gán họ vào công việc khác.

    - **Step 2: Assignment Options (Tùy chọn phân công)**
        - **Mục đích**: Cung cấp các tùy chọn để người dùng tinh chỉnh các quy tắc và điều kiện mà thuật toán sẽ tuân theo khi phân công.
        - **Ví dụ**:
            - **Ưu tiên kinh nghiệm**: Hệ thống sẽ ưu tiên gán các nhân viên có kinh nghiệm hoặc chứng chỉ cao hơn vào các công việc phức tạp.
            - **Cân bằng khối lượng công việc**: Đảm bảo công việc được phân bổ đều, tránh tình trạng một người làm quá nhiều việc trong khi người khác lại không có.
            - **Tuân thủ quy định**: Tự động kiểm tra và tuân thủ các quy định về thời gian nghỉ ngơi tối thiểu giữa các ca làm việc.

## 8. Màn hình: `/flight-schedule/auto-assignment` (Kết quả phân công)
- **Mục tiêu**: Hiển thị kết quả sau khi chạy phân công tự động.
- **Thao tác Demo**:
    1. Sau khi nhấn "Run Assignment", hệ thống thực hiện quá trình xử lý tại URL này.
    2. Quá trình này sẽ tự động gán 5 nhân viên vào các chuyến bay `A350` phù hợp, dựa trên các cấu hình đã thiết lập (sử dụng khoảng thời gian bận là `95 phút` cho mỗi lần gán).
    3. Sau khi hoàn tất, hệ thống tự động quay trở lại màn hình `/flight-schedule`.
- **Kết quả mong đợi trên màn hình `/flight-schedule`**:
    - Kết quả phân công sẽ hiển thị trực tiếp trên lịch bay.
    - Tên của nhân viên (ví dụ: **Bùi Mạnh Hà**) sẽ xuất hiện bên cạnh chuyến bay tương ứng mà họ được gán.
    - Các nhân viên được phân công một cách hợp lý, không bị trùng lặp hay quá tải công việc trong cùng một khoảng thời gian.

## 9. Màn hình: `/graphics-time-line` (Biểu đồ Timeline công việc)
- **Mục tiêu**: Trực quan hóa và xác nhận thời gian "bận" (Blocked Time) của nhân viên sau khi được phân công tự động.
- **Dữ liệu hiển thị**:
    - Một biểu đồ timeline (dạng Gantt chart) với trục hoành là các mốc thời gian trong ngày, và trục tung là danh sách **5 nhân viên chủ chốt** đã được phân công.
    - Với mỗi nhân viên (ví dụ: **Bùi Mạnh Hà**), sẽ có một thanh (bar) màu hiển thị trên biểu đồ, thể hiện khoảng thời gian họ bận rộn với công việc được gán.
- **Kiểm chứng**:
    - Di chuột (hover) vào thanh công việc của một nhân viên.
    - Một tooltip sẽ hiện ra, hiển thị chi tiết thời gian bắt đầu và kết thúc.
    - **Quan trọng**: Độ dài của thanh này phải tương ứng chính xác với tổng thời gian đã được cấu hình ở **Mục 7**, tức là **95 phút** (khoảng 1.6 giờ), để chứng minh rằng hệ thống đã tính toán và áp dụng đúng tham số.

---

## II. DEMO LUỒNG WORK ORDER

**Ngày thực hiện**: Đồng bộ với Mục I (`2026-06-18`).

### 1. Màn hình: `/work-order-control` (Quản lý Work Order)
- **Mục tiêu**: Lấy dữ liệu Work Order thực tế vào hệ thống demo.
- **Thao tác**:
    1. Nhấn nút **"Download Data"** trên header.
    2. Một cửa sổ hiện lên, nhấn nút để xác nhận tải dữ liệu.
- **Kết quả**: Danh sách Work Order hiển thị trên Grid (dữ liệu lấy từ `mockWorkOrderRecords`).

### 2. Màn hình: `/assign-work-order-to-flight` (Gán Work Order cho Chuyến bay)
- **Mục tiêu**: Thực hiện gán thủ công Work Order vào chuyến bay và nhân sự cụ thể.
- **Thao tác Demo**:
    **a. Gán Work Order vào chuyến bay**
    1. **Tại bảng Work-Order List**: Chọn 2 Work Order đầu tiên trong danh sách. Hệ thống sẽ tự động lọc danh sách chuyến bay bên cạnh dựa trên số đăng ký máy bay **A/C Reg**.
    2. **Tại bảng Flights List**: Chọn một chuyến bay tương ứng đã được lọc ra (dữ liệu từ `/flight-schedule`).
    3. **Tại bảng m.p plan list**: 
        - Chọn nhân viên **Bùi Mạnh Hà** (dòng đầu tiên).
        - Khi click chọn, biểu đồ **Employee Timeline** phía dưới sẽ hiển thị khung thời gian làm việc của nhân viên này (tương ứng với Mục I.9).
    4. **Thực hiện Gán**: Nhấn nút **"Assign"**.

    **b. Chuyển Work Order thành Issue**
    - **Tại bảng Work-Order List**: Với Work Order thứ 3 và 4, click vào nút "Issue" trong cột Action.
- **Kết quả**: 
    - Hệ thống chuyển sang tab **"Assigned"** trong bảng nhân sự.
    - Biểu đồ **Employee Timeline** xuất hiện thêm một khối công việc màu cam, thời gian được tính bằng `Giờ bắt đầu + 30 phút` (Thời gian tạm tính).
    - Trạng thái của 2 Work Order đầu tiên chuyển sang **"In Progress"**.

### 3. Màn hình: `/technician-dashboard` (Dashboard Kỹ thuật viên)
- **Mục tiêu**: Kiểm tra công việc dưới góc độ nhân viên được phân công.
- **Dữ liệu hiển thị**:
    - Đăng nhập với tư cách **Bùi Mạnh Hà**.
    - Mục **IN PROGRESS** hiển thị giá trị **02** (tương ứng với 2 Work Order vừa được gán).
    - Ngày hiển thị là ngày demo (`18/06/2026`).
- **Thao tác**: Nhấn nút **"View All Workorders"** ở cuối màn hình.

### 4. Màn hình: `/technician-task-control` (Danh sách nhiệm vụ)
- **Mục tiêu**: Kỹ thuật viên kiểm tra và cập nhật trạng thái các công việc đã được phân công.
- **Dữ liệu hiển thị**:
    a. **Tab "My Task"**:
        - Hiển thị chi tiết 2 Work Order được gán cho **Bùi Mạnh Hà**.
        - Kỹ thuật viên sẽ cập nhật một Work Order sang trạng thái **"Handover"**.
        - Work Order còn lại sẽ được cập nhật sang trạng thái **"Final Test"**.
    b. **Tab "My Issue"**: Hiển thị danh sách 2 Work Order đã được chuyển thành trạng thái "Issue" (tương ứng với thao tác tại mục II.2.b).

### 5. Màn hình: /work-order-in-out
- **Mục tiêu**: Hiển thị danh sách các Work Order đang được xử lý, bao gồm cả các công việc đã được bàn giao hoặc đang ở bước kiểm tra cuối cùng.
- **Dữ liệu hiển thị**:
    - Hiển thị danh sách các Work Order.
    - Bao gồm 2 Work Order từ màn hình `/technician-task-control` với trạng thái đã được cập nhật: một là **"Handover"** và một là **"Final Test"**.
