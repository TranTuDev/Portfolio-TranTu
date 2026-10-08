# THIẾT KẾ CƠ BẢN: CLICK NOTIFICATION ĐIỀU HƯỚNG SANG GRAPHICS TIME LINE (BASIC DESIGN)

Tài liệu này mô tả thiết kế cơ bản cho luồng khi người dùng click vào notification sau khi kích hoạt hành động đổi thông tin chuyến bay trên trang flight schedule.

---

## 1. TỔNG QUAN

Tính năng cho phép người dùng sau khi bấm một trong các nút hành động trên trang `/flight-schedule`:
- `Đổi Stand (P)`
- `Đổi giờ (T)`
- `Đổi tàu (A)`

thì nhận được một notification tại góc trên bên phải. Khi click vào notification, hệ thống tự động điều hướng sang trang `/graphics-time-line` và truyền thông tin chuyến bay đang biến động.

## 2. GIAO DIỆN NGƯỜI DÙNG (UI)

### 2.1. Notification sau khi kích hoạt hành động
- Vị trí: góc trên bên phải màn hình.
- Nội dung ngắn gọn:
  - `Đã gửi yêu cầu đổi Stand.`
  - `Đã gửi yêu cầu đổi giờ.`
  - `Đã gửi yêu cầu đổi tàu.`
- Khi click vào notification, hiển thị hành vi điều hướng sang trang Graphics Time Line.

### 2.2. Trang đích Graphics Time Line
- Trang `/graphics-time-line` hiển thị tên chuyến bay với các nhãn (P), (T) hoặc (A) tuỳ theo hành động được thực hiện ở flight schedule.

## 3. CẤU TRÚC DỮ LIỆU (DATA MODEL)
```typescript
interface INotificationNavigationContext {
  flightId: string;
  changeType: "stand" | "time" | "aircraft";
  message: string;
}
```

## 4. LUỒNG XỬ LÝ (WORKFLOW)

1. Người dùng chọn một chuyến bay trên trang `/flight-schedule`.
2. Người dùng bấm một trong 3 nút hành động.
3. Hệ thống lưu thông tin hành động vào store và tạo notification.
4. Người dùng click vào notification.
5. Hệ thống điều hướng tới `/graphics-time-line` với query params:
   - `flightId`
   - `changeType`
6. Trang `/graphics-time-line` đọc dữ liệu và hiển thị context cho người dùng.

## 5. CÁCH THỰC HIỆN

### 5.1. Client-side
- Sử dụng store để lưu trạng thái chuyến bay đang được chọn.
- Sử dụng query string trong URL để truyền dữ liệu giữa hai trang.
- Notification có thể là component dạng toast/snackbar ở góc trên bên phải.

### 5.2. Navigation
- Khi click notification, gọi hàm điều hướng tới route:
```typescript
/graphics-time-line?flightId=<id>&changeType=<stand|time|aircraft>
```

## 6. GHI CHÚ THỰC THI

- Duy trì tính nhất quán với flow hiện có của ứng dụng.
- Nếu có store dùng cho flight schedule, nên dùng store để lưu trạng thái chuyến bay đang biến động.
- Khi thêm hành động mới, nên mở rộng enum `changeType` thay vì hardcode.
- Giữ logic điều hướng và hiển thị notification tách biệt để dễ mở rộng.
