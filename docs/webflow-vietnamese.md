# Mô Tả Flow Trang Web QuanWatt — Tiếng Việt

## 1. Phạm Vi Tài Liệu

Tài liệu này mô tả chi tiết luồng người dùng (user flow) và cấu trúc trang web của ứng dụng QuanWatt. Được xây dựng bằng Next.js, ứng dụng bao gồm 3 trang chính:

- **Trang chủ** (`/`) - Giới thiệu sản phẩm
- **Trang giải pháp** (`/solution`) - Công việc và demo thực tế
- **Trang lộ trình** (`/roadmap`) - Kế hoạch phát triển

---

## 2. Cấu Trúc Thông Tin (Information Architecture)

### 2.1 Các tuyến chính

| Tuyến | Đường dẫn | Mục đích |
|-------|----------|---------|
| Trang chủ | `/` | Định vị sản phẩm và hướng dẫn người dùng |
| Giải pháp | `/solution` | Giải thích quy trình và demo |
| Demo | `/solution#solver` | Truy cập trực tiếp workspace demo |
| Lộ trình | `/roadmap` | Xem kế hoạch phát triển |

### 2.2 Quy ước điều hướng

- **Header** luôn hiển thị trên tất cả các trang
- **Nút gọi hành động (CTA) chính** luôn dẫn đến workspace QPF
- **Anchor nội bộ** được sử dụng để điều hướng dựa trên phần

### 2.3 Luồng nội dung chính

```
Trang chủ → Trang giải pháp → Workspace solver → Kết quả/Báo cáo → Lộ trình
```

---

## 3. Chi Tiết Các Trang

### 3.1 Trang Chủ (`/`)

#### 3.1.1 Header (Thanh điều hướng)

**Mục đích:** Cung cấp điều hướng toàn cầu và điểm chuyển đổi chính

**Thành phần:**
- Logo QuanWatt (trái)
- Liên kết điều hướng ngang: Tổng quan | Giải pháp | Demo | Lộ trình
- Nút gọi hành động (CTA): "Mở workspace"

#### 3.1.2 Phần Hero (Giới thiệu)

**Mục đích:** Thiết lập vị trí sản phẩm và dẫn người dùng vào luồng chính

**Thành phần chính:**
- Hình ảnh hero toàn chiều rộng với overlay tối
- **Kicker (Tiêu đề phụ):** "Giải pháp vận hành lưới điện thế hệ mới"
- **Tiêu đề chính (H1):** QuanWatt — Nền tảng vận hành lưới điện hỗ trợ lượng tử
- **Mô tả chi tiết:**
  - Lớp 1: Định vị sản phẩm
  - Lớp 2: So sánh cổ điển vs HHL/VQLS
- **Nút hành động:**
  - "Khám phá giải pháp" → `/solution`
  - "Chạy demo QPF" → `/solution#solver`
- **Hàng thống kê Hero:**
  - 4 nhóm vấn đề
  - 3 phương pháp giải quyết
  - 8 bước vận hành được ánh xạ
  - 1 workspace demo tích hợp

#### 3.1.3 Bản đồ Tổng Quan (Overview Map)

**Mục đích:** Hiển thị cấu trúc trang và giảm sự nhập nhằng trong điều hướng

**Cấu trúc:**
- Tiêu đề phần: Mục lục tương tác
- 4 thẻ chương:
  1. 📊 Tổng quan nền tảng
  2. 🔍 Bản đồ vấn đề
  3. ⚙️ Khả năng cốt lõi
  4. 🧪 Demo QPF

**Mỗi thẻ bao gồm:**
- Số thứ tự
- Biểu tượng
- Mô tả ngắn
- Liên kết anchor

#### 3.1.4 Phát biểu Nền tảng (Platform Statement)

**Mục đích:** Cung cấp mô tả mức độ hệ thống ngắn gọn

**Nội dung:**
- Một tiêu đề kỹ thuật chi tiết một bối cảnh hoạt động duy nhất
- Một đoạn văn giải thích cách dữ liệu lưới, mô hình hệ thống và thí nghiệm solver tích hợp vào một quy trình duy nhất

#### 3.1.5 Câu Chuyện Vấn Đề (Problem Story)

**Mục đích:** Giải thích bốn loại vấn đề hệ thống điện năng chính thông qua một tường thuật hướng theo cuộn

**4 Vấn đề chính:**
1. **QSE** - Ước tính trạng thái
2. **QPF** - Luồng công suất
3. **QOPF** - Luồng công suất tối ưu
4. **QEMTP** - Mô phỏng dữ liệu điện từ

**Các trường thông tin mỗi bước:**
- Mã vấn đề
- Tên vấn đề
- Câu hỏi kỹ thuật
- Nội dung mô tả
- Đầu vào (Input)
- Đầu ra (Output)
- Phương pháp giải quyết

**Quy tắc tương tác:**
- Bảng điều khiển trực quan bên phải cập nhật dựa trên bước đang hoạt động
- Chỉ báo tiến trình phản ánh bước câu chuyện hiện tại

#### 3.1.6 Phần Khả Năng (Capabilities Section)

**Mục đích:** Tóm tắt chuỗi giá trị của nền tảng

**Bố cục:**
- 1 thẻ khả năng lớn: Khả năng nhìn thấy vận hành lưới điện end-to-end
- 2 thẻ phụ:
  - 🔗 Ánh xạ ứng dụng lượng tử
  - 💻 Workspace giải quyết vấn đề

**Mỗi thẻ chứa:**
- Hình ảnh
- Tiêu đề
- Văn bản hỗ trợ
- CTA anchor tới trang Giải pháp

#### 3.1.7 Nút Gọi Hành Động Cuối (Final CTA)

**Mục đích:** Chuyển đổi sự quan tâm thành tương tác demo hoặc khám phá lộ trình

**Hành động:**
- "Chạy demo QPF"
- "Xem lộ trình phát triển"

#### 3.1.8 Footer (Chân trang)

**Thành phần:**
- Logo thương hiệu
- Slogan sản phẩm
- Liên kết tuyến
- Tuyên bố MVP / mô-đun tương lai

---

### 3.2 Trang Giải Pháp (`/solution`)

#### 3.2.1 Phần Hero

**Mục đích:** Xác định trang như một workspace chức năng để giải thích và thực thi

**Thành phần:**
- Nền hero toàn chiều rộng
- **H1:** Workspace vận hành lưới điện hỗ trợ lượng tử
- **Mô tả:** Kết nối giữa vận hành lưới điện và thí nghiệm lượng tử
- **Nhóm hành động:**
  - Xem Luồng Giải pháp → `#pipeline`
  - Chạy Demo QPF → `#solver`
  - Ánh xạ Vấn đề Lượng tử → `#quantum-map`

#### 3.2.2 Dải Tóm Tắt Vấn Đề

**Mục đích:** Cung cấp tổng quan chủ đề được hỗ trợ

**Thẻ:**
- QSE - Ước tính trạng thái
- QPF - Luồng công suất
- QOPF - Luồng công suất tối ưu
- QEMTP - Mô phỏng điện từ

**Quy tắc trạng thái:**
- QPF được nhấn mạnh trực quan (MVP hiện tại)

#### 3.2.3 Dải Tổng Quan Trực quan

**Mục đích:** Truyền đạt kiến trúc giải pháp trong một cái nhìn

**Thẻ:**
- 🔄 Đường ống hoạt động
- 🗺️ Bản đồ vấn đề lượng tử
- 🧪 Workspace giải quyết vấn đề

**Nội dung mỗi thẻ:**
- Minh họa/hình ảnh
- Tiêu đề kỹ thuật ngắn
- Giải thích một dòng

#### 3.2.4 Đường Ống Hoạt Động (Operation Pipeline)

**Mục đích:** Mô hình hóa luồng dữ liệu từ cảm biến đến hỗ trợ quyết định

**Các mô-đun bắt buộc:**
1. **Đo lường** - Thu thập dữ liệu từ lưới
2. **Dự báo** - Ước lượng nhu cầu trong tương lai
3. **Ước tính trạng thái** - Xác định trạng thái lưới
4. **Luồng công suất** - Tính toán luồng điện
5. **Phân tích liên tiếp** - Phân tích các tình huống khẩn cấp
6. **OPF / Điều phối** - Tối ưu hóa sản xuất
7. **EMT / Ổn định** - Kiểm tra ổn định tức thời
8. **Quyết định** - Hỗ trợ ra quyết định

**Trường chi tiết panel:**
- Mục đích
- Đầu vào
- Đầu ra
- Hỗ trợ lượng tử

**Quy tắc tương tác:**
- Nhấp vào một mô-đun cập nhật chi tiết panel
- Các điều khiển vị trí vấn đề lượng tử cho phép điều hướng nhảy tới QSE, QPF, QOPF, QEMTP

#### 3.2.5 Bản Đồ Lượng Tử (Quantum Map)

**Mục đích:** Đặt các linear solver lượng tử vào bối cảnh hoạt động đúng

**Bảng ánh xạ bắt buộc:**

| Vấn đề Lượng tử | Ứng dụng Hệ thống Điện | Loại Vấn Đề |
|---|---|---|
| **QSE** | Ước tính trạng thái | Hệ thống tuyến tính WLS |
| **QPF** | Luồng công suất | DC PF / Newton linear solve |
| **QOPF** | Luồng công suất tối ưu | KKT / linearized OPF |
| **QEMTP** | Mô phỏng EMT | Hệ thống tuyến tính mỗi bước thời gian |

#### 3.2.6 Vấn Đề Lưới Điện Lượng Tử

**Mục đích:** Cung cấp một danh mục vấn đề có thể kiểm tra

**Mô hình dữ liệu mỗi thẻ:**
- Trạng thái (Status)
- Tóm tắt (Summary)
- Nội dung (Body)
- Đầu vào (Input)
- Đầu ra (Output)
- Giải thích Solver

**Quy tắc tương tác:**
- Chọn một vấn đề cập nhật chi tiết panel bên cạnh

#### 3.2.7 Workspace Solver (Giải Quyết Vấn Đề)

**Mục đích:** Hỗ trợ luồng demo đầy đủ từ cấu hình đến xem trước thực thi

**Khối wireframe:**

1. **Chọn Trường Hợp**
   - Chọn trường hợp lưới điện

2. **Chọn Vấn Đề**
   - Chọn QSE / QPF / QOPF / QEMTP

3. **Cấu Hình Solver**
   - Loại Solver: Classical | HHL | VQLS
   - Chọn Backend
   - Điều khiển Shots (số lần chạy)
   - Điều khiển Tolerance (sai số chấp nhận)

4. **Điều Khiển Chạy**
   - Nút "Chạy Solver"
   - Nhật ký thực thi

5. **Xem Trước Yêu Cầu**
   - Hiển thị payload yêu cầu backend

6. **Trực Quan Nhỏ**
   - Xem trước Ma trận / Vector / Kết quả điện

#### 3.2.8 Bảng Điều Khiển Kết Quả (Results Dashboard)

**Mục đích:** So sánh đầu ra solver và kết quả mức độ lưới điện

**Thành phần bảng điều khiển:**

- **Thẻ KPI:**
  - ⏱️ Thời gian chạy (Runtime)
  - 📊 Sai số tương đối (Relative Error)
  - ⚠️ Số vi phạm (Violations Count)

- **Biểu đồ so sánh:**
  - Biểu đồ so sánh thời gian chạy
  - Biểu đồ so sánh sai số tương đối

- **Bảng kết quả:**
  - Bảng kết quả Bus
  - Bảng kết quả Branch

- **Bảng cảnh báo:**
  - Panel vi phạm / cảnh báo

- **Bảng so sánh Solver:**
  - Bảng so sánh chi tiết

- **Khuyến nghị:**
  - Tóm tắt khuyến nghị chọn demo

#### 3.2.9 Xuất Báo Cáo (Report Export)

**Mục đích:** Cung cấp một báo cáo kỹ thuật di động để sử dụng sau

**Nội dung báo cáo:**
- Kết quả solver được chọn
- Thông số kỹ thuật
- Biểu đồ so sánh
- Bảng kết quả
- Khuyến nghị

---

### 3.3 Trang Lộ Trình (`/roadmap`)

**Mục đích:** Hiển thị kế hoạch phát triển và mô-đun tương lai

**Thành phần:**
- Tiêu đề trang
- Dòng thời gian / lộ trình phát triển
- Giai đoạn hiện tại: MVP
- Giai đoạn tương lai: Mô-đun bổ sung

---

## 4. Luồng Người Dùng (User Flow)

### Luồng Chính

```
┌─────────────────────────────────────────────────────────────┐
│                      TRANG CHỦ (/)                          │
│  - Hero Intro                                               │
│  - Tổng quan 4 vấn đề (QSE, QPF, QOPF, QEMTP)              │
│  - Bản đồ tổng quan                                         │
│  - Câu chuyện vấn đề (scroll-driven)                        │
│  - Khả năng nền tảng                                        │
│  - CTA: Khám phá giải pháp                                  │
└──────────────┬──────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────┐
│                   TRANG GIẢI PHÁP (/solution)               │
│  - Hero: Workspace vận hành lưới                            │
│  - Tóm tắt 4 vấn đề                                         │
│  - Tổng quan kiến trúc                                      │
│  - Đường ống hoạt động (8 bước)                             │
│  - Bản đồ lượng tử                                          │
│  - Danh mục vấn đề lưới điện                                │
│  - CTA: Chạy demo hoặc chọn vấn đề                          │
└──────────────┬──────────────────────────────────────────────┘
               │
        ┌──────┴──────┐
        │             │
        ▼             ▼
    DEMO SOLVER   ROADMAP
  (chi tiết      (lộ trình)
   ở phía trên)
```

### Luồng Tương Tác trong Workspace Solver

```
┌──────────────────────────────────────────────┐
│  1. CHỌN TRƯỜNG HỢP LƯỚI                    │
│     (Khởi tạo dữ liệu)                       │
└────────────┬─────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────┐
│  2. CHỌN VẤN ĐỀ LƯỢNG TỬ                     │
│     (QSE | QPF | QOPF | QEMTP)               │
└────────────┬─────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────┐
│  3. CẤU HÌNH SOLVER                          │
│     - Loại: Classical | HHL | VQLS           │
│     - Backend                                │
│     - Shots, Tolerance                       │
└────────────┬─────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────┐
│  4. XEM TRƯỚC YÊU CẦU                        │
│     (Backend payload)                        │
└────────────┬─────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────┐
│  5. CHẠY SOLVER                              │
│     (Thực thi, xem nhật ký)                  │
└────────────┬─────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────┐
│  6. KẾT QUẢ & SO SÁNH                        │
│     - Runtime, Error, Violations             │
│     - Bảng kết quả Bus/Branch                │
│     - Khuyến nghị                            │
└────────────┬─────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────┐
│  7. XUẤT BÁO CÁO                             │
│     (Tải xuống PDF/JSON)                     │
└──────────────────────────────────────────────┘
```

---

## 5. Các Thành Phần Chính (Key Components)

| Thành Phần | Mục Đích | Vị Trí |
|---|---|---|
| **SiteChrome** | Header, Footer, điều hướng toàn cầu | Tất cả trang |
| **ScrollMotion** | Hiệu ứng scroll, parallax | Trang chủ |
| **HomeStoryNavigator** | Điều hướng mục lục | Trang chủ |
| **HomeOverviewMap** | Bản đồ 4 chương | Trang chủ |
| **HomeProblemStory** | Câu chuyện 4 vấn đề | Trang chủ |
| **HomeGridJourney** | Hành trình lưới điện | Trang chủ |
| **HomeScrollytelling** | Kể chuyện hướng theo cuộn | Trang chủ |
| **SolutionPageClient** | Workspace solver + kết quả | Trang giải pháp |

---

## 6. Quy Ước Điều Hướng (Navigation Conventions)

### Header Navigation

```
QuanWatt Logo | Tổng quan | Giải pháp | Demo | Lộ trình | [Mở workspace]
```

### Internal Anchors

- `#home` - Hero section
- `#overview` - Bản đồ tổng quan
- `#problem-story` - Câu chuyện vấn đề
- `#capabilities` - Khả năng
- `#pipeline` - Đường ống hoạt động
- `#quantum-map` - Bản đồ lượng tử
- `#solver` - Workspace solver
- `#results` - Bảng điều khiển kết quả

---

## 7. Hành Động & CTA Chính

| Trang | Hành Động | Đích |
|---|---|---|
| Trang chủ | Khám phá giải pháp | `/solution` |
| Trang chủ | Chạy demo QPF | `/solution#solver` |
| Trang chủ | Xem lộ trình | `/roadmap` |
| Giải pháp | Chạy Demo | `/solution#solver` |
| Giải pháp | Xem Luồng | `/solution#pipeline` |
| Giải pháp | Ánh xạ Lượng tử | `/solution#quantum-map` |
| Giải pháp | Xuất Báo cáo | Download PDF/JSON |

---

## 8. Trạng Thái Tương Tác Chính

### Trang Chủ

- **Trạng thái cuộn:** Cập nhật progress indicator khi người dùng cuộn qua các phần
- **Trạng thái hover:** Highlight liên kết, thẻ
- **Trạng thái focus:** Keyboard navigation support

### Trang Giải Pháp

- **Chọn vấn đề:** Cập nhật chi tiết panel
- **Chạy solver:** Xử lý pending, success, error states
- **So sánh kết quả:** Toggle giữa các solver methods
- **Cuộn phần:** Giữ sidebar menu sticky

---

## 9. Mục Tiêu Chuyển Đổi Chính

1. **Từ Trang Chủ → Giải Pháp:** CTA "Khám phá giải pháp" trong hero
2. **Từ Giải Pháp → Solver:** CTA "Chạy demo QPF" hoặc click trực tiếp vào section
3. **Từ Solver → Báo Cáo:** Tự động khi solver hoàn thành
4. **Từ Bất kỳ → Roadmap:** Footer hoặc header navigation

---

## 10. Cấu Trúc Dữ Liệu (Data Model)

### Vấn Đề Lượng Tử

```json
{
  "id": "qse|qpf|qopf|qemtp",
  "name": "Tên vấn đề",
  "technicalQuestion": "Câu hỏi kỹ thuật",
  "description": "Mô tả chi tiết",
  "input": "Dữ liệu đầu vào",
  "output": "Dữ liệu đầu ra",
  "solverMethod": "Classical|HHL|VQLS",
  "status": "MVP|Future"
}
```

### Kết Quả Solver

```json
{
  "problemId": "qpf",
  "caseName": "ieee14",
  "solverType": "HHL|Classical|VQLS",
  "runtime": 0.234,
  "relativeError": 0.001,
  "violations": 0,
  "busResults": [],
  "branchResults": [],
  "recommendations": ""
}
```

---

## 11. Ghi Chú Kỹ Thuật

- **Framework:** Next.js 14+ (React 18+)
- **Styling:** CSS Module + Tailwind (nếu sử dụng)
- **State Management:** React Context / Hooks
- **Animation:** Scroll-driven (ScrollMotion component)
- **Icons:** Lucide React
- **TypeScript:** Strict mode

---

**Cập nhật lần cuối:** Tháng 6 năm 2026
**Phiên bản:** 1.0 — Tiếng Việt
