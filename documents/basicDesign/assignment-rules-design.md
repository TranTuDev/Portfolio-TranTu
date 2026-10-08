# THIẾT KẾ CƠ BẢN: BỘ LỌC QUY TẮC NHÂN VIÊN (BASIC DESIGN)

Tài liệu này mô tả thiết kế cơ bản cho tính năng bộ lọc quy tắc phân công nhân sự trong luồng Auto Assignment.

---

## 1. TỔNG QUAN
Tính năng cho phép người điều hành lựa chọn và quản lý các quy tắc (rules) để tối ưu hóa việc phân công nhân sự tự động vào các chuyến bay.

## 2. GIAO DIỆN NGƯỜI DÙNG (UI)

### 2.1. Modal Auto Assignment - Step 3: Assignment Rules
- **Vị trí**: Xuất hiện sau khi người dùng hoàn thành "Step 2: Assignment Options".
- **Mô tả**: Một danh sách các quy tắc có thể áp dụng cho đợt phân công hiện tại.
- **Các thành phần chính**:
    | STT | Thành phần | Mô tả / Logic xử lý | Ghi chú |
    |-----|------------|---------------------|---------|
    | 1   | `[Tên Component]` | `[Mô tả chức năng chi tiết]` | |
    | 2   | `[Tên Component]` | `[Mô tả chức năng chi tiết]` | |

### 2.2. Trang Quản lý Quy tắc (Rules Management)
- **URL dự kiến**: `/assignment-rules`
- **Mục tiêu**: Quản lý tập trung các quy tắc hệ thống.
- **Các thành phần chính**:
    | STT | Thành phần | Mô tả / Logic xử lý | Ghi chú |
    |-----|------------|---------------------|---------|
    | 1   | `[Tên Component]` | `[Mô tả chức năng chi tiết]` | |
    | 2   | `[Tên Component]` | `[Mô tả chức năng chi tiết]` | |

## 3. CẤU TRÚC DỮ LIỆU (DATA MODEL)
```typescript
/**
 * Interface định nghĩa dữ liệu cho [Tên Đối Tượng]
 */
interface IAssignmentRule {
  // id: string; // Ví dụ: Định danh duy nhất
  // [Tên trường]: [Kiểu dữ liệu]; // [Mô tả chi tiết]
}
```

## 4. LUỒNG XỬ LÝ (WORKFLOW)

1. **Quản lý**: Người dùng vào trang `/assignment-rules` để bật các quy tắc quan trọng (VD: Chứng chỉ phù hợp là bắt buộc).
2. **Cấu hình**: Khi chạy Auto Assign, tại Step 3, người dùng chọn thêm các quy tắc bổ trợ (VD: Ưu tiên người ít giờ làm việc nhất).
3. **Thực thi**: Hệ thống tổng hợp các tham số từ Step 1, 2 và danh sách Rules từ Step 3 để chạy thuật toán phân công.

## 5. CÁC QUY TẮC BỔ SUNG & NÂNG CAO (optional)