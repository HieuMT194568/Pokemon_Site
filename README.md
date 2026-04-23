# 🎮 Pokemon Detail Website

Website Pokedex hiện đại được xây dựng bằng **Next.js + Ant Design**, hiển thị danh sách toàn bộ Pokemon và trang chi tiết với thông tin từ **PokeAPI**. Dự án đã được nâng cấp với kiến trúc SSR và Client-side caching.

> **Trạng thái**: ✅ Active và sẵn sàng sử dụng

## 🚀 Những Tính Năng Mới Nổi Bật (Mới Cập Nhật)

- ⚡ **Chuyển đổi sang Next.js**: Chuyển từ React SPA (Vite) sang Next.js App Router, cải thiện hiệu suất render và quản lý route.
- 🎨 **Giao diện Ant Design**: Thay thế giao diện cũ bằng bộ UI Components mạnh mẽ và nhất quán từ Ant Design.
- 🔄 **Tối ưu hóa Fetching Data (TanStack Query)**: Tích hợp `@tanstack/react-query` để tự động caching, giảm thiểu request trùng lặp và tăng tốc độ tải trang.
- 📜 **Virtualized Infinite Scrolling (TanStack Virtual)**: Cài đặt kỹ thuật render ảo hóa với `@tanstack/react-virtual`, cho phép cuộn mượt mà qua danh sách toàn bộ Pokémon mà không giảm hiệu năng trình duyệt.
- 🗂️ **Hỗ trợ Đa Thế Hệ (Generations) & Items**: Bổ sung phân trang theo thế hệ qua route `/gen/[genId]` và danh sách vật phẩm qua route `/items`.

## 📋 Mục tiêu dự án

- ✨ Cung cấp trải nghiệm tra cứu Pokemon cực nhanh với hiệu năng ở mức production-grade
- 🎯 Giao diện mượt mà xử lý được số lượng dữ liệu cực lớn không lag
- 🔄 Tận dụng sức mạnh của Next.js Server Components và TanStack Query
- 🎯 Tách rõ các luồng chính:
  - **Trang danh sách** (`/`): Tìm kiếm theo thời gian thực + Virtualized Infinite Scrolling
  - **Trang chi tiết** (`/pokemon/:id`): Hiển thị toàn bộ thông tin Pokemon
- 🔄 Lấy dữ liệu từ API public (PokeAPI), không cần backend riêng

## ✨ Tính năng chính

### Trang Danh Sách
- 📱 Hiển thị danh sách khổng lồ tất cả các Pokemon mượt mà
- 🔍 **Tìm kiếm theo thời gian thực** - Lọc Pokemon theo tên
- 📊 **Virtualized Infinite Scrolling** - Tự động tải và render Pokemon khi cuộn nhờ TanStack Virtual
- 🎨 **Thẻ Pokemon đẹp mắt** - Hiển thị tên, ID, ảnh và type với Ant Design Cards
- 📍 **Điều hướng dễ dàng** - Click card để xem chi tiết

### Trang Chi Tiết Pokemon
- 🆔 **Thông tin cơ bản**: ID, tên, genus (loại Pokemon), mô tả flavor text (tiếng Anh)
- 🖼️ **Ảnh official artwork** từ PokeAPI
- 🏷️ **Type badges** với màu sắc phân biệt
- 📈 **Bảng chỉ số chi tiết**:
  - Base stats
  - Min stats (0 IV, 0 EV)
  - Max stats (31 IV, 252 EV) tại **Level 100**
  - Tính toán tự động dựa trên công thức Pokemon
- 📊 **Biểu đồ phân bố Stats** (progress bar cho từng stat)
- 📏 **Kích thước & Cân nặng** (hiển thị cả đơn vị metric và imperial: m/ft, kg/lbs)
- ⚡ **Tab Abilities**:
  - Khả năng thường (Normal Abilities)
  - Khả năng ẩn (Hidden Ability)
  - Chi tiết effect và flavor text cho mỗi ability

### UX Features
- ⏳ **Loading states** - Spinner animation / Skeletons khi tải dữ liệu
- ⚠️ **Error handling** - Xử lý và hiển thị lỗi thân thiện với người dùng
- 📱 **Responsive design** - Tối ưu cho mobile, tablet, desktop

## 🛠️ Công nghệ & Dependencies

### Core
- **Next.js 16+** - React Framework (App Router)
- **React 19** - UI library
- **Ant Design (antd)** - UI Component Library mạnh mẽ

### Hiệu Năng & Data Management
- **TanStack Query** (`@tanstack/react-query`) - Data fetching, caching, API state management
- **TanStack Virtual** (`@tanstack/react-virtual`) - Kỹ thuật ảo hóa danh sách lớn (Virtualization)

### API & Data
- **PokeAPI** - Public Pokemon API (free, no auth needed)

## 📁 Cấu trúc Thư mục

```text
Pokemon Detail Website/
├── src/
│   ├── app/
│   │   ├── layout.jsx              # Root layout Next.js
│   │   ├── page.jsx                # Trang chủ (Danh sách Pokemon)
│   │   ├── error.jsx               # Error boundary
│   │   ├── gen/
│   │   │   └── [genId]/page.jsx    # Danh sách Pokemon theo thế hệ
│   │   ├── items/
│   │   │   └── page.jsx            # Danh sách Items
│   │   ├── constants/
│   │   │   └── pokemon.js          # Helper và cấu hình
│   │   └── ...
│   └── ...
├── package.json                    # Dependencies & scripts
├── next.config.mjs                 # Next.js configuration
├── README.md                       # This file
└── ...
```

## 🔄 Luồng Dữ Luệ & API Calls

### Trang Home (`/`)

Sử dụng TanStack Query để lấy danh sách Pokemon và TanStack Virtual để hiển thị.

**Data Flow:**
```text
PokeAPI (Pokemon List)
  → React Query Cache
  → Render mượt mà qua TanStack Virtual
  → PokemonCard Components với Next.js Routing
```

### Trang Pokemon Detail (`/pokemon/:id`)

```text
1. Next.js Routing → Extract id
2. Tận dụng React Query để lấy thông tin Pokemon + Species song song
3. Tính toán và hiển thị thông số chi tiết
```

### Stat Calculation at Level 100

```javascript
// Formula: ((2 × base + IV + EV÷4) × level ÷ 100) + level + 5
// HP formula khác: ((2 × base + IV + EV÷4) × level ÷ 100) + level + 10
```

## 🚀 Cách Chạy Dự Án Local

### Yêu Cầu Hệ Thống

- **Node.js** >= 18
- **npm** >= 9 hoặc **pnpm** (khuyến nghị)
- **Git** (để clone repo)

### Cài Đặt & Chạy

```bash
# 1. Clone repository
git clone <repository-url>
cd "Pokemon Detail Website"

# 2. Cài đặt dependencies
pnpm install

# 3. Chạy dev server
pnpm run dev
# Truy cập: http://localhost:3000

# 4. Build production
pnpm run build

# 5. Start production build
pnpm run start
```

### Available Scripts

| Command | Mục đích |
|---------|---------|
| `pnpm run dev` | Chạy Next.js dev server |
| `pnpm run build` | Build production |
| `pnpm run start` | Chạy server production |

## 🎨 Routing Map

| Route | Mục đích |
|-------|---------|
| `/` | Danh sách Pokemon + tìm kiếm + virtualized scroll |
| `/pokemon/:id` | Trang chi tiết Pokemon |
| `/gen/[genId]` | Danh sách Pokemon theo Generation |
| `/items` | Trang danh sách vật phẩm |

## 📝 Environment Variables

Hiện tại project không cần `.env` file vì sử dụng public API.

## 🐛 Troubleshooting

### Lỗi Cache Next.js
Nếu có lỗi parse hoặc build, hãy thử xóa thư mục cache và cài lại:
```bash
rm -rf .next node_modules
pnpm install
pnpm run dev
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Ant Design](https://ant.design/docs/react/introduce)
- [TanStack Query](https://tanstack.com/query/latest)
- [TanStack Virtual](https://tanstack.com/virtual/latest)
- [PokeAPI Documentation](https://pokeapi.co/)

## 11) Hạn chế hiện tại

- Chưa có test tự động (unit/integration/e2e).
- Chưa có script lint/format chính thức trong `package.json`.

## 12) Những Nâng Cấp Đã Hoàn Thành Gần Đây 🎉

- ✅ **Chuyển đổi Next.js**: Nâng cấp từ React SPA sang Next.js App Router.
- ✅ **React Query**: Tự động caching API, giảm số lần gọi mạng.
- ✅ **Virtualization**: Cài đặt `@tanstack/react-virtual` thay thế Load More.
- ✅ **Ant Design**: Thay thế UI component với framework hoàn chỉnh.

## 13) Triển khai (deploy) gợi ý

Có thể deploy dễ dàng lên:
- Vercel (Khuyến nghị cho Next.js)
- Netlify
- Cloudflare Pages

Với Vercel, ứng dụng Next.js của bạn sẽ tự động được nhận diện và cấu hình Build Command / Output Directory.
