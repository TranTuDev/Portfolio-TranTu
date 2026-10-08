# Shared Components — Usage Guide

Tài liệu hướng dẫn sử dụng các reusable components trong dự án VAECO.

---

## 1. `Header`

**File:** `app/components/shared/header.tsx`

Component header toàn trang: logo, navbar ngang, avatar/tên user, nút Logout.

### Props

| Prop | Type | Default | Mô tả |
|---|---|---|---|
| `activeNav` | `string` | — | ID của nav item đang active. Xem danh sách IDs bên dưới |
| `userName` | `string` | `"Administrator"` | Tên hiển thị bên cạnh avatar |
| `onLogout` | `() => void` | Navigate về `/` | Callback khi bấm Logout |

**Nav IDs hợp lệ:** `personnel`, `certificates`, `rostering`, `master-plan`, `flight-schedule`, `manpower-timeline`, `customers-plan`, `work-orders`

### Ví dụ

```tsx
import { Header } from "../components/shared/header";

<Header activeNav="personnel" />
<Header activeNav="certificates" userName="John Doe" onLogout={() => logout()} />
```

---

## 2. `Sidebar`

**File:** `app/components/shared/sidebar.tsx`

Sidebar dùng chung: luôn render phần "Department - Level" (3 dropdown cascade). Các filter riêng của từng trang được truyền vào qua `children`.

### Props

| Prop | Type | Mô tả |
|---|---|---|
| `total` | `number` | Số records hiển thị ở footer sidebar |
| `onSearch` | `(dept: DeptFilterValue) => void` | Callback khi bấm Search, nhận giá trị dept đã chọn |
| `children` | `ReactNode` | Filter fields riêng của từng trang |

### Ví dụ

```tsx
import { Sidebar } from "../components/shared/sidebar";
import { PersonnelFilters } from "../personnel/personnelFilters";

<Sidebar total={filteredData.length} onSearch={handleSearch}>
  <PersonnelFilters filters={filters} onChange={setFilters} />
</Sidebar>
```

> **Tạo filter mới:** Tạo file `app/<page>/<page>Filters.tsx`, nhận `filters` + `onChange`, render các input/select cần thiết.

---

## 3. `DataTable<T>`

**File:** `app/components/shared/dataTable.tsx`

Generic table tái sử dụng với built-in client-side pagination.

### Props

| Prop | Type | Default | Mô tả |
|---|---|---|---|
| `columns` | `TableColumn<T>[]` | — | Định nghĩa các cột |
| `data` | `T[]` | — | Toàn bộ dữ liệu (table tự phân trang) |
| `pageSize` | `number` | `10` | Số dòng mỗi trang |
| `keyExtractor` | `(row: T) => string \| number` | — | Trả về unique key của mỗi row |

### Interface `TableColumn<T>`

```ts
interface TableColumn<T> {
  key: string;           // tên field, dùng khi không có render
  header: string;        // tiêu đề cột
  render?: (row: T) => ReactNode;  // custom cell render
  headerClassName?: string;
  cellClassName?: string;
}
```

### Ví dụ

```tsx
import { DataTable } from "../components/shared/dataTable";
import type { TableColumn } from "../components/shared/dataTable";

interface Certificate { id: string; name: string; expireDate: string; }

const columns: TableColumn<Certificate>[] = [
  { key: "id", header: "ID" },
  { key: "name", header: "Certificate Name" },
  {
    key: "expireDate",
    header: "Expire Date",
    render: (row) => (
      <span className={isExpired(row.expireDate) ? "text-red-600" : "text-gray-700"}>
        {row.expireDate}
      </span>
    ),
  },
];

<DataTable<Certificate>
  columns={columns}
  data={certificateData}
  pageSize={15}
  keyExtractor={(row) => row.id}
/>
```

---

## 4. `TableActions`

**File:** `app/components/shared/tableActions.tsx`

Thanh nút hành động phía trên table (New, Edit, Remove, Import Excel…).

### Props

| Prop | Type | Mô tả |
|---|---|---|
| `buttons` | `ActionButton[]` | Danh sách nút hiển thị |

### Interface `ActionButton`

```ts
interface ActionButton {
  id: string;                           // unique key
  label: string;                        // text hiển thị
  icon: ReactNode;                      // icon SVG
  onClick?: () => void;                 // handler
  variant: "primary" | "success" | "warning" | "danger" | "secondary" | "info";
}
```

### Màu sắc theo `variant`

| Variant | Màu |
|---|---|
| `primary` | Xanh dương |
| `success` | Xanh lá |
| `warning` | Vàng |
| `danger` | Đỏ |
| `secondary` | Xám |
| `info` | Cyan |

### Ví dụ

```tsx
import { TableActions } from "../components/shared/tableActions";
import type { ActionButton } from "../components/shared/tableActions";

const actions: ActionButton[] = [
  {
    id: "new",
    label: "New",
    variant: "success",
    icon: <svg>...</svg>,
    onClick: () => openCreateModal(),
  },
  {
    id: "import",
    label: "Import Excel",
    variant: "success",
    icon: <svg>...</svg>,
  },
];

<TableActions buttons={actions} />
```

---

## 5. `DepartmentFilter`

**File:** `app/components/shared/departmentFilter.tsx`

3 dropdown cascade (Level 1 → 2 → 3). Thường dùng bên trong `Sidebar` (đã tích hợp sẵn), nhưng có thể dùng độc lập.

### Props

| Prop | Type | Mô tả |
|---|---|---|
| `value` | `DeptFilterValue` | `{ level1, level2, level3 }` |
| `onChange` | `(v: DeptFilterValue) => void` | Callback khi thay đổi |

---

## 6. Tạo trang mới dùng các shared components

### Checklist

```
1. Tạo app/mock/mock<Page>.ts          — mock data + interface
2. Tạo app/<page>/<page>Filters.tsx    — filter fields riêng
3. Tạo app/<page>/<page>.tsx           — page component
4. Tạo app/routes/<page>.tsx           — route wrapper
5. Cập nhật app/routes.ts              — thêm route
```

### Template trang mới

```tsx
// app/<page>/<page>.tsx
import { useState, useMemo } from "react";
import { Header } from "../components/shared/header";
import { Sidebar } from "../components/shared/sidebar";
import { DataTable } from "../components/shared/dataTable";
import { TableActions } from "../components/shared/tableActions";
import { PageFilters } from "./<page>Filters";
import { mockPageData } from "../mock/mock<Page>";

export function PageComponent() {
  const [filters, setFilters] = useState(defaultFilters);
  const [activeFilters, setActiveFilters] = useState(defaultFilters);

  const filteredData = useMemo(() => applyFilters(mockPageData, activeFilters), [activeFilters]);

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center"
         style={{ backgroundImage: "url('/images/background.png')" }}>
      <div className="min-h-screen flex flex-col bg-[#0A1F44]/65">
        <Header activeNav="<page-id>" />
        <main className="flex flex-col lg:flex-row gap-3 p-3 flex-1 items-start">
          <div className="w-full lg:w-48 shrink-0">
            <Sidebar total={filteredData.length} onSearch={() => setActiveFilters(filters)}>
              <PageFilters filters={filters} onChange={setFilters} />
            </Sidebar>
          </div>
          <div className="flex-1 min-w-0">
            <div className="bg-white/95 rounded-lg shadow overflow-hidden">
              <TableActions buttons={pageActions} />
              <DataTable columns={pageColumns} data={filteredData} pageSize={15} keyExtractor={(r) => r.id} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
```
