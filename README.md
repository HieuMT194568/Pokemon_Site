# 🎮 Pokemon Detail Website

Website Pokedex được xây dựng bằng **React + Vite**, hiển thị danh sách 151 Pokemon (Thế hệ 1 - Kanto) và trang chi tiết chi tiết cho từng Pokemon bao gồm chỉ số, mô tả loài, khả năng và thông tin chi tiết từ **PokeAPI**.

> **Trạng thái**: ✅ Active và sẵn sàng sử dụng

## 📋 Mục tiêu dự án

- ✨ Cung cấp trải nghiệm tra cứu Pokemon nhanh chóng, dễ sử dụng với giao diện hiện đại
- 🎯 Tách rõ 2 luồng chính:
  - **Trang danh sách** (`/`): Tìm kiếm theo thời gian thực + phân trang kiểu "Load More"
  - **Trang chi tiết** (`/pokemon/:id`): Hiển thị toàn bộ thông tin Pokemon
- 🔄 Lấy dữ liệu từ API public (PokeAPI), không cần backend riêng

## ✨ Tính năng chính

### Trang Danh Sách
- 📱 Hiển thị 151 Pokemon đầu tiên (Kanto Generation)
- 🔍 **Tìm kiếm theo thời gian thực** - Lọc Pokemon theo tên khi gõ
- 📊 **Progressive Loading** - Nút "Load More" để tăng số lượng card hiển thị (20 Pokemon mỗi lần)
- 🎨 **Thẻ Pokemon đẹp mắt** - Hiển thị tên, ID, ảnh và type
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
- ⏳ **Loading states** - Spinner animation khi tải dữ liệu
- ⚠️ **Error handling** - Xử lý và hiển thị lỗi khi Pokemon không tìm thấy
- 🎨 **Gradient backgrounds** - Giao diện hiện đại với gradient từ xanh dương đến tím
- 📱 **Responsive design** - Tối ưu cho mobile, tablet, desktop

## 🛠️ Công nghệ & Dependencies

### Core
- **React 18+** - UI library
- **Vite 5+** - Build tool & dev server (cực nhanh)
- **React Router v6** - Client-side routing
- **TailwindCSS v4** - Utility-first CSS
- **Radix UI** - Accessible UI component library (primitives)
- **Lucide React** - SVG icon library

### Styling & Animation
- **TW Animate CSS** - Animation utilities
- **Emotion** - CSS-in-JS (MUI dependency)

### API & Data
- **PokeAPI** - Public Pokemon API (free, no auth needed)

### Additional
- **shadcn/ui patterns** - Pre-built component patterns
- **Canvas Confetti** - Optional confetti effects
- **date-fns** - Date utilities
- **Embla Carousel** - Carousel component

## 📁 Cấu trúc Thư mục

```
Pokemon Detail Website/
├── src/
│   ├── main.jsx                    # Entry point React
│   ├── app/
│   │   ├── App.jsx                 # Root component - RouterProvider
│   │   ├── routes.jsx              # Định nghĩa routes (/, /pokemon/:id)
│   │   └── components/
│   │       ├── Home.jsx            # Trang danh sách + search + load more
│   │       ├── PokemonCard.jsx     # Card component cho mỗi Pokemon
│   │       ├── PokemonDetail.jsx   # Trang chi tiết Pokemon
│   │       ├── MainLayout.jsx      # Layout wrapper (nếu có)
│   │       ├── figma/
│   │       │   └── ImageWithFallback.jsx  # Image component với fallback
│   │       └── ui/                 # Radix UI + shadcn/ui components
│   │           ├── button.jsx
│   │           ├── card.jsx
│   │           ├── badge.jsx
│   │           ├── tabs.jsx
│   │           ├── input.jsx
│   │           ├── progress.jsx
│   │           └── ... (30+ UI components)
│   └── styles/
│       ├── index.css               # Global styles
│       ├── tailwind.css            # Tailwind directives
│       ├── theme.css               # Theme variables
│       └── fonts.css               # Font definitions
├── index.html                      # HTML entry point
├── vite.config.ts                  # Vite configuration
├── postcss.config.mjs              # PostCSS config (Tailwind)
├── package.json                    # Dependencies & scripts
├── README.md                       # This file
├── ATTRIBUTIONS.md                 # Credits & attributions
└── guidelines/
    └── Guidelines.md               # Coding guidelines
```

## 🔄 Luồng Dữ Liệu & API Calls

### Trang Home (`/`)

```
1. Component mount → useEffect kích hoạt
2. Fetch: GET https://pokeapi.co/api/v2/pokemon?limit=151
3. Dữ liệu trả về → Lưu vào state `pokemon`
4. User tìm kiếm → Filter theo `name.toLowerCase().includes(searchTerm)`
5. displayCount state quyết định số card render (20, 40, 60...)
6. Mỗi card extract ID từ pokemon.url: `/pokemon/{id}/` → link tới detail page
```

**Data Flow:**
```
PokeAPI (Pokemon List) → Home.jsx 
  → State: [pokemon, displayCount, searchTerm]
  → Filtered & Sliced Array
  → PokemonCard Components with routing
```

### Trang Pokemon Detail (`/pokemon/:id`)

```
1. URL params → Extract id
2. Fetch song song:
   - GET https://pokeapi.co/api/v2/pokemon/{id}           → pokemonData
   - GET https://pokeapi.co/api/v2/pokemon-species/{id}   → speciesData
3. Từ pokemonData.abilities → Loop & fetch chi tiết từng ability:
   - GET https://pokeapi.co/api/v2/ability/{abilityName}
   - Lưu vào Map: { abilityName → abilityDetail }
4. Render 3 tabs: Stats | About | Abilities
5. Tính toán stats tại Level 100 bằng Pokemon formula
```

**Data Flow:**
```
URL (/pokemon/1)
  → Extract ID (1)
  → Fetch Pokemon + Species in parallel
  → Extract abilities array
  → Fetch each ability detail
  → Render tabs with complete data
```

### Stat Calculation at Level 100

```javascript
// Formula: ((2 × base + IV + EV÷4) × level ÷ 100) + level + 5
// HP formula khác: ((2 × base + IV + EV÷4) × level ÷ 100) + level + 5 + 5

// Min: IV=0, EV=0 (worst case)
// Max: IV=31, EV=252 (best case competitive)
```

## 🚀 Cách Chạy Dự Án Local

### Yêu Cầu Hệ Thống

- **Node.js** >= 18 (khuyến nghị LTS mới nhất)
- **npm** >= 9 hoặc **yarn** >= 1.22
- **Git** (để clone repo)

### Cài Đặt & Chạy

```bash
# 1. Clone repository
git clone <repository-url>
cd "Pokemon Detail Website"

# 2. Cài đặt dependencies
npm install
# hoặc: yarn install

# 3. Chạy dev server (hot reload enabled)
npm run dev
# Truy cập: http://localhost:5173

# 4. Build production
npm run build

# 5. Preview production build local
npm run preview
```

### Available Scripts

| Command | Mục đích |
|---------|---------|
| `npm run dev` | Chạy dev server (Vite) với hot reload |
| `npm run build` | Build production (output: `dist/`) |
| `npm run preview` | Preview build production local |

## 🎨 Routing Map

Định nghĩa trong `src/app/routes.jsx`:

| Route | Component | Mục đích |
|-------|-----------|---------|
| `/` | `Home.jsx` | Danh sách Pokemon + tìm kiếm + load more |
| `/pokemon/:id` | `PokemonDetail.jsx` | Trang chi tiết Pokemon (Stats, About, Abilities) |

## 🎨 Type Color Map

Mỗi type Pokemon có màu sắc riêng (applied bằng Tailwind classes):

```javascript
{
  normal: "bg-gray-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-300",
  fighting: "bg-red-600",
  poison: "bg-purple-500",
  // ... và nhiều type khác
}
```

## 📝 Environment Variables

Hiện tại project không cần `.env` file vì sử dụng public API.

**Nếu muốn sử dụng cached data**, tạo `.env.local`:
```
VITE_API_BASE=https://pokeapi.co/api/v2
```

## 🐛 Troubleshooting

### Dev server không khởi động
```bash
# Xóa node_modules & lock file
rm -r node_modules package-lock.json
npm install
npm run dev
```

### CORS errors khi fetch
- PokeAPI support CORS, nên không có vấn đề
- Kiểm tra Console tab trong DevTools

### Pokemon image không load
- Official artwork có thể không có cho Pokemon cụ thể
- Fallback sang sprite mặc định

## 📚 Resources

- [PokeAPI Documentation](https://pokeapi.co/)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [Radix UI Documentation](https://www.radix-ui.com)
- [React Router Documentation](https://reactrouter.com)

### Cài đặt và chạy

```bash
npm install
npm run dev
```

Mặc định Vite sẽ chạy local dev server tại cổng 5173 (hoặc cổng trống kế tiếp).

### Build production

```bash
npm run build
```

Output build ở thư mục `dist/`.

## 8) Các script hiện có

Trong `package.json`:

- `npm run dev`: chạy môi trường phát triển.
- `npm run build`: tạo bản build production.

## 9) UI/Theming

- Style tổng được import từ `src/styles/index.css`.
- `tailwind.css` cấu hình nguồn class utility cho Tailwind v4.
- `theme.css` chứa CSS variables (màu, radius, dark variant...).
- Bộ `src/app/components/ui/*` là các component tái sử dụng cho Button, Input, Card, Tabs, Badge, Progress...

## 10) Các điểm cần lưu ý thực tế

- Dự án hiện dùng JSX cho phần lớn component, nhưng vẫn còn 2 file `.ts`:
  - `src/app/components/ui/utils.ts`
  - `src/app/components/ui/use-mobile.ts`
- Vite vẫn build bình thường với cấu hình hiện tại.
- `package.json` có rất nhiều dependency UI, nhưng app hiện chỉ dùng một phần nhỏ.
- Dữ liệu phụ thuộc hoàn toàn vào PokeAPI, nên:
  - Mạng chậm có thể làm trang chi tiết load lâu hơn (do fetch ability từng cái).
  - Nếu API lỗi/throttle thì sẽ ảnh hưởng dữ liệu hiển thị.

## 11) Hạn chế hiện tại

- Chưa có caching cho API responses.
- Chưa có trạng thái error UI rõ ràng cho mọi request (mới chủ yếu `console.error`).
- Chưa có test tự động (unit/integration/e2e).
- Chưa có script lint/format chính thức trong `package.json`.
- Trang detail fetch ability theo vòng lặp nối tiếp (có thể tối ưu song song có kiểm soát).

## 12) Định hướng nâng cấp đề xuất

- Bổ sung cache (ví dụ memory cache hoặc React Query) để giảm số lần gọi API.
- Chuẩn hóa xử lý lỗi UI (toast/error panel/retry button).
- Thêm phân trang server-side hoặc infinite scroll cho danh sách lớn hơn 151.
- Tối ưu performance ảnh (placeholder, prefetch route, skeleton chi tiết hơn).
- Bổ sung test:
  - Unit cho helper tính chỉ số.
  - Integration cho Home và Detail.
  - E2E cho flow tìm kiếm -> vào chi tiết -> quay lại.
- Rà soát và loại dependency không dùng để giảm bundle size.

## 13) Triển khai (deploy) gợi ý

Có thể deploy dễ dàng lên:

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages (kèm cấu hình SPA fallback)

Với Vercel/Netlify, chỉ cần:

- Build command: `npm run build`
- Output directory: `dist`

## 14) Ghi chú cho người maintain

- Nếu đổi tên route, nhớ cập nhật `Link` trong `PokemonCard.jsx` và nút Back trong `PokemonDetail.jsx`.
- Nếu đổi cấu trúc response PokeAPI (hoặc API thay đổi), cần kiểm tra lại:
  - `species.flavor_text_entries`
  - `species.genera`
  - `pokemon.abilities`
  - `pokemon.sprites.other["official-artwork"]`
- Khi thêm component mới, ưu tiên tái sử dụng từ `src/app/components/ui`.

---

Nếu bạn muốn, mình có thể tạo luôn bản README thứ hai theo hướng "cho recruiter/client" (ngắn gọn, marketing hơn) và giữ bản này làm tài liệu kỹ thuật nội bộ.
