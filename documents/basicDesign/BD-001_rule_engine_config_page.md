# BD-001: RULE ENGINE CONFIGURATION PAGE (BASIC DESIGN)

Tài liệu này mô tả thiết kế cơ bản cho chức năng **Rule Engine Configuration**, cho phép người quản trị tạo, cấu hình và quản lý các Rule nhằm tự động lựa chọn kỹ thuật viên phù hợp trong quá trình **Auto Assignment**.

---

# 1. TỔNG QUAN

## 1.1. Mục đích

Rule Engine Configuration cho phép người dùng tạo và quản lý các Rule dùng để xác định điều kiện lựa chọn kỹ thuật viên phù hợp cho từng Work Order (WO), Line Maintenance Work Request (LMWR) hoặc các nghiệp vụ phân công nhân sự khác.

Mỗi Rule được cấu hình dựa trên nhiều điều kiện khác nhau như:

- Aircraft Type
- License
- Type Rating
- Shift Availability
- Work Status
- Day Off
- Certificate Expiry
- English Level
- Distance to Station

Sau khi Rule được kích hoạt, hệ thống sẽ tự động đánh giá toàn bộ kỹ thuật viên dựa trên các điều kiện đã cấu hình và đề xuất danh sách phù hợp nhất phục vụ quá trình Auto Assignment.

---

## 1.2. Phạm vi

Chức năng này hỗ trợ các nghiệp vụ sau:

- Tạo Rule mới.
- Chỉnh sửa Rule.
- Xóa Rule.
- Kích hoạt hoặc vô hiệu hóa Rule.
- Cấu hình điều kiện lựa chọn kỹ thuật viên.
- Thiết lập thời gian hiệu lực của Rule.
- Xem trước kết quả đánh giá theo thời gian thực.
- Quản lý mức độ ưu tiên của Rule.

---

# 2. GIAO DIỆN NGƯỜI DÙNG (UI)
## 2.1. Rule Engine Configuration

**URL dự kiến**

```text
/rule-engine
```

### Mục tiêu

Màn hình Rule Engine Configuration cho phép người dùng:

- Quản lý danh sách Rule.
- Tạo Rule mới.
- Chỉnh sửa Rule hiện có.
- Cấu hình các điều kiện đánh giá kỹ thuật viên.
- Xem trước danh sách kỹ thuật viên đáp ứng Rule.
- Kích hoạt Rule để sử dụng trong Auto Assignment.

---

## 2.2. Page Header & Action Toolbar

Khu vực nằm ở phía trên cùng của màn hình (Header), dùng để hiển thị thông tin điều hướng và các thao tác chính đối với Rule.

### Thành phần

| STT | Thành phần | Kiểu | Mô tả / Logic xử lý | Ghi chú |
|-----|------------|------|---------------------|---------|
| 1 | Breadcrumb | Navigation | Hiển thị đường dẫn điều hướng của màn hình. Ví dụ: Master Plan / Rule Engine / Create Rule. | Read Only |
| 2 | New Rule | Button | Tạo mới một Rule và xóa toàn bộ dữ liệu đang nhập trên màn hình. | Create Mode |
| 3 | Cancel | Button | Hủy các thay đổi chưa lưu và quay về màn hình trước. | |
| 4 | Save Draft | Button | Lưu Rule ở trạng thái Draft. Rule chưa được sử dụng trong Auto Assignment. | |
| 5 | Activate | Button | Kích hoạt Rule sau khi cấu hình hoàn tất. | |

### Business Logic

#### New Rule

- Khởi tạo một Rule mới.
- Reset toàn bộ dữ liệu trên màn hình.
- Chuyển giao diện sang chế độ Create.

#### Cancel

- Hủy các thay đổi chưa được lưu.
- Quay về màn hình trước hoặc Rules Library.

#### Save Draft

- Lưu Rule với trạng thái Draft.
- Rule chưa được sử dụng trong Auto Assignment.
- Có thể tiếp tục chỉnh sửa sau.

#### Activate

- Kiểm tra tất cả dữ liệu bắt buộc.
- Nếu hợp lệ:
  - Chuyển Status = Active.
  - Rule được phép sử dụng trong Auto Assignment.
- Nếu không hợp lệ:
  - Hiển thị Validation Message.
  - Không cho phép Activate.

---

## 2.3. Rule Information

Khu vực dùng để cấu hình thông tin chung của Rule.

### Thành phần

| STT | Thành phần | Kiểu | Mô tả / Logic xử lý | Ghi chú |
|-----|------------|------|---------------------|---------|
| 1 | Rule Name | Text Input | Nhập tên Rule. Đây là tên hiển thị trong Rules Library. | Required |
| 2 | Applies To | Dropdown | Chọn đối tượng áp dụng của Rule. | Ví dụ: Manpower Assignment |
| 3 | Status | Toggle Switch | Bật hoặc tắt Rule. Active: Rule được sử dụng. Inactive: Rule không được sử dụng. | Default = Active |
| 4 | Priority | Number Input | Độ ưu tiên của Rule. Giá trị càng nhỏ thì ưu tiên càng cao. | Required |
| 5 | Description | Text Area | Nhập mô tả của Rule. | Optional |
| 6 | Effective At | Date Picker | Ngày bắt đầu có hiệu lực. | Required |
| 7 | Expire At | Date Picker | Ngày kết thúc hiệu lực. | Optional |

### Ví dụ

| Thuộc tính | Giá trị |
|------------|----------|
| Rule Name | Select technician for WO/LMWR - A321 at HAN |
| Applies To | Manpower Assignment |
| Status | Active |
| Priority | 1 |
| Description | Auto select suitable technician to perform WO/LMWR for A321 at HAN station |
| Effective At | 18/06/2026 |
| Expire At | Optional |

### Business Logic

- Rule Name là bắt buộc.
- Rule Name không được trùng với Rule đã tồn tại (nếu hệ thống không cho phép trùng).
- Applies To là bắt buộc.
- Status mặc định là Active.
- Priority chỉ cho phép nhập số nguyên dương.
- Effective At phải nhỏ hơn hoặc bằng Expire At.
- Nếu Expire At để trống thì Rule có hiệu lực vô thời hạn.
- Chỉ Rule có Status = Active và còn hiệu lực mới được hệ thống sử dụng.

---

## 2.4. Rules Library

Rules Library nằm ở panel bên trái màn hình và hiển thị toàn bộ Rule đã được tạo trong hệ thống.

Người dùng có thể lựa chọn một Rule để chỉnh sửa hoặc tạo Rule mới bằng nút **New Rule** trên Header.

### Thành phần

| STT | Thành phần | Kiểu | Mô tả / Logic xử lý |
|-----|------------|------|---------------------|
| 1 | Search Rule | Search Box | Tìm kiếm Rule theo tên hoặc từ khóa. |
| 2 | Rule List | List | Hiển thị toàn bộ Rule trong hệ thống. |
| 3 | Status | Badge | Hiển thị trạng thái Rule (Draft, Active hoặc Inactive). |
| 4 | Priority | Label | Hiển thị mức độ ưu tiên của Rule. |
| 5 | Pagination | Pagination | Chuyển trang khi danh sách Rule lớn. |

### Ví dụ Rule

- Select technician for WO/LMWR - A321 at HAN
- Select technician for A350 - SGN
- Select technician for B787 - DAD
- LMWR - Preventive Maintenance
- Night Shift Allocation

### Business Logic

Khi người dùng chọn một Rule trong Rules Library, hệ thống sẽ tự động tải:

- Rule Information.
- Build Criteria.
- Weight & Priority.
- Advanced Settings.
- Preview Result.

---

## 2.5. Rule Configuration Tabs

Khu vực cấu hình Rule được chia thành nhiều tab nhằm giúp người dùng dễ dàng quản lý từng nhóm chức năng.

### Thành phần

| STT | Tab | Mô tả |
|-----|-----|-------|
| 1 | Build Criteria | Cấu hình các điều kiện lựa chọn kỹ thuật viên. |
| 2 | Weight & Priority | Thiết lập trọng số và mức độ ưu tiên của từng điều kiện. |
| 3 | Advanced Settings | Thiết lập các tùy chọn nâng cao của Rule. |

### Business Logic

- Mặc định mở tab **Build Criteria**.
- Khi chuyển tab, dữ liệu đang nhập sẽ được giữ nguyên.
- Người dùng có thể chuyển đổi giữa các tab mà không làm mất dữ liệu.

---

## 2.6. Build Criteria

Build Criteria là khu vực chính của màn hình, cho phép người dùng định nghĩa các điều kiện mà kỹ thuật viên cần đáp ứng.

Mỗi hàng trong bảng đại diện cho một điều kiện (Condition).

### Thành phần

| STT | Cột | Mô tả |
|-----|------|------|
| 1 | No. | Số thứ tự |
| 2 | Field | Thuộc tính cần kiểm tra |
| 3 | Operator | Toán tử so sánh |
| 4 | Value | Giá trị điều kiện |
| 5 | Logic | Toán tử kết hợp điều kiện |
| 6 | Action | Chỉnh sửa hoặc xóa điều kiện |

### Field

Dropdown hỗ trợ:

- Aircraft Type
- License
- Type Rating
- Shift Availability
- Work Status
- Day Off
- Certificate Expiry
- English Level
- Distance to Station

### Operator

Dropdown gồm:

- Equals
- Greater Than
- Greater Than or Equal
- Less Than or Equal

### Value

Giá trị được nhập hoặc chọn tùy theo từng Field.

Ví dụ:

| Field | Giá trị |
|---------|---------|
| Aircraft Type | A321 |
| License | B1 |
| Type Rating | A321 |
| Shift Availability | Available |
| Work Status | On Duty |
| Day Off | Not in next 3 days |
| Certificate Expiry | 30 Days |
| English Level | Level 3 |
| Distance to Station | 15 Km |

Một số Field sẽ hiển thị thêm đơn vị:

- Days
- Km

### Logic

Hiện tại hệ thống hỗ trợ:

- AND

Trong các phiên bản tiếp theo có thể mở rộng:

- OR
- NOT

### Action

Cho phép:

- Edit Condition
- Delete Condition

Ngoài ra người dùng có thể:

- Add Condition
- Add Condition Group

---

## 2.7. Weight & Priority

Weight & Priority cho phép người dùng thiết lập mức độ ảnh hưởng của từng điều kiện trong quá trình tính điểm và xếp hạng kỹ thuật viên.

### Mục tiêu

Trong trường hợp nhiều kỹ thuật viên cùng thỏa mãn tất cả điều kiện của Rule, hệ thống sẽ sử dụng Weight để tính Match Score và Priority để xác định thứ tự ưu tiên.

### Thành phần

| STT | Thành phần | Kiểu | Mô tả |
|-----|------------|------|-------|
| 1 | Condition | Label | Hiển thị tên điều kiện |
| 2 | Weight | Number Input | Trọng số của điều kiện (%) |
| 3 | Priority | Number Input | Độ ưu tiên khi nhiều điều kiện có cùng Weight |
| 4 | Total Weight | Label | Tổng trọng số của Rule |

### Ví dụ

| Condition | Weight |
|------------|---------|
| License | 40% |
| Type Rating | 30% |
| Work Status | 15% |
| Distance | 15% |

### Business Logic

- Weight chỉ cho phép nhập số nguyên.
- Giá trị từ 0 đến 100.
- Tổng Weight nên bằng 100%.
- Điều kiện có Weight càng lớn sẽ ảnh hưởng nhiều hơn tới Match Score.
- Nếu nhiều kỹ thuật viên có cùng Match Score thì Priority sẽ được sử dụng để phân loại.

---

## 2.8. Advanced Settings

Cho phép cấu hình các tùy chọn nâng cao cho Rule.

### Thành phần

| STT | Thành phần | Kiểu | Mô tả |
|-----|------------|------|-------|
| 1 | Allow Partial Match | Checkbox | Cho phép kỹ thuật viên không thỏa mãn 100% điều kiện vẫn được đề xuất |
| 2 | Minimum Match Score | Number Input | Điểm Match tối thiểu để được hiển thị |
| 3 | Maximum Candidate | Number Input | Giới hạn số lượng kỹ thuật viên được đề xuất |
| 4 | Auto Apply | Toggle | Tự động áp dụng Rule trong Auto Assignment |

### Business Logic

- Nếu Allow Partial Match = OFF thì kỹ thuật viên phải thỏa mãn toàn bộ điều kiện.
- Nếu Allow Partial Match = ON thì hệ thống sẽ tính Match Score.
- Minimum Match Score mặc định là 80%.
- Maximum Candidate mặc định là 20.
- Auto Apply mặc định là ON.

---

## 2.9. Preview Result

Preview Result nằm ở panel bên phải màn hình.

Sau mỗi lần người dùng thay đổi Rule hoặc Build Criteria, hệ thống sẽ tự động đánh giá toàn bộ kỹ thuật viên và cập nhật kết quả theo thời gian thực.

### Thành phần

| STT | Thành phần | Mô tả |
|-----|------------|------|
| 1 | Avatar | Ảnh đại diện |
| 2 | Technician Name | Họ tên kỹ thuật viên |
| 3 | License | License hiện có |
| 4 | Aircraft Type | Type Rating phù hợp |
| 5 | Engineer Level | Cấp độ kỹ thuật viên |
| 6 | Station | Trạm làm việc |
| 7 | Distance | Khoảng cách tới Station |
| 8 | Match Percentage | Điểm phù hợp |
| 9 | Work Status | On Duty / Off Duty |

### Ví dụ

```

Nguyễn Văn A

License : B1

Aircraft : A321

Engineer Level : Level 4

Station : HAN

Distance : 2.1 Km

Match : 98%

Status : On Duty

```

### Business Logic

- Preview Result được cập nhật tự động.
- Danh sách được sắp xếp theo Match Percentage giảm dần.
- Chỉ hiển thị kỹ thuật viên đáp ứng Minimum Match Score.
- Khi Build Criteria thay đổi, Preview Result sẽ refresh mà không cần tải lại trang.

---

# 3. CẤU TRÚC DỮ LIỆU (DATA MODEL)

```typescript
interface IRuleCondition {
  id: string;

  field:
    | "Aircraft Type"
    | "License"
    | "Type Rating"
    | "Shift Availability"
    | "Work Status"
    | "Day Off"
    | "Certificate Expiry"
    | "English Level"
    | "Distance to Station";

  operator:
    | "Equals"
    | "Greater Than"
    | "Greater Than or Equal"
    | "Less Than or Equal";

  value: string | number;

  unit?: "Days" | "Km";

  logic: "AND";

  weight?: number;

  priority?: number;
}

interface IAssignmentRule {
  id: string;

  ruleName: string;

  description: string;

  appliesTo: string;

  status: "Draft" | "Active" | "Inactive";

  priority: number;

  effectiveAt: Date;

  expireAt?: Date;

  allowPartialMatch: boolean;

  minimumMatchScore: number;

  maximumCandidate: number;

  autoApply: boolean;

  conditions: IRuleCondition[];

  createdBy: string;

  createdAt: Date;

  updatedBy?: string;

  updatedAt?: Date;
}
```

---

# 4. LUỒNG XỬ LÝ (WORKFLOW)

### Bước 1

Người dùng truy cập màn hình Rule Engine Configuration.

↓

### Bước 2

Người dùng có thể:

- Chọn một Rule từ Rules Library.

hoặc

- Nhấn **New Rule** để tạo Rule mới.

↓

### Bước 3

Người dùng nhập thông tin tại Rule Information.

- Rule Name
- Applies To
- Status
- Priority
- Description
- Effective At
- Expire At

↓

### Bước 4

Người dùng chuyển sang Build Criteria.

↓

### Bước 5

Thêm các Condition.

Ví dụ

Aircraft Type = A321

AND

License = B1

AND

Work Status = On Duty

↓

### Bước 6

Hệ thống tự động tính toán Match Score.

↓

### Bước 7

Preview Result hiển thị danh sách kỹ thuật viên phù hợp.

↓

### Bước 8

Người dùng có thể:

- Save Draft

hoặc

- Activate Rule

↓

### Bước 9

Sau khi Activate thành công,

Rule sẽ được sử dụng trong Auto Assignment.

---

# 5. BUSINESS RULES

| ID | Business Rule |
|----|---------------|
| BR-01 | Rule Name là bắt buộc. |
| BR-02 | Applies To là bắt buộc. |
| BR-03 | Priority phải lớn hơn 0. |
| BR-04 | Effective At phải nhỏ hơn hoặc bằng Expire At. |
| BR-05 | Chỉ Rule có Status = Active mới được Auto Assignment sử dụng. |
| BR-06 | Build Criteria phải có ít nhất một Condition. |
| BR-07 | Match Score được tính dựa trên Weight của từng Condition. |
| BR-08 | Preview Result luôn hiển thị theo Match Score giảm dần. |
| BR-09 | Rule ở trạng thái Draft sẽ không được sử dụng. |
| BR-10 | Rule hết hạn sẽ tự động bị bỏ qua khi Auto Assignment chạy. |

---

# 6. VALIDATION RULES

| Trường | Validation |
|---------|------------|
| Rule Name | Required |
| Applies To | Required |
| Priority | Integer > 0 |
| Effective At | Required |
| Expire At | >= Effective At |
| Weight | 0 - 100 |
| Minimum Match Score | 0 - 100 |
| Maximum Candidate | > 0 |

---

# 7. CÁC CHỨC NĂNG HỖ TRỢ

- Tạo Rule mới.
- Chỉnh sửa Rule.
- Xóa Rule.
- Kích hoạt Rule.
- Vô hiệu hóa Rule.
- Lưu Rule ở trạng thái Draft.
- Tìm kiếm Rule.
- Phân trang Rules Library.
- Thêm Condition.
- Xóa Condition.
- Chỉnh sửa Condition.
- Thêm Condition Group.
- Thiết lập Weight.
- Thiết lập Priority.
- Thiết lập thời gian hiệu lực.
- Preview Result theo thời gian thực.
- Quản lý Match Score.
- Tự động áp dụng Rule trong Auto Assignment.

---

# 8. PHẠM VI ÁP DỤNG

Rule Engine Configuration được sử dụng bởi các chức năng:

- Auto Assignment
- Manpower Assignment
- Work Order Assignment
- Line Maintenance Assignment
- Rule Management