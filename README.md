# 🧠 Personal Data Operating System (PDOS)

> A modern, AI-ready personal productivity platform built with Next.js.

PDOS (Personal Data Operating System), günlük işlerinizi, notlarınızı, belgelerinizi, hedeflerinizi ve kişisel bilgilerinizi tek bir platformda yönetebilmeniz için geliştirilen modern bir web uygulamasıdır.

Bu proje yalnızca bir "Todo App" değildir. Ölçeklenebilir frontend mimarisi, performans optimizasyonları, erişilebilirlik (Accessibility), modern rendering stratejileri ve gelecekte AI entegrasyonuna uygun olacak şekilde tasarlanmıştır.

---

# ✨ Features

* 📊 Dashboard
* ✅ Task Management
* 📝 Knowledge Base (Notes)
* 📁 Document Management
* 📅 Calendar
* 🎯 Goals Tracking
* 📈 Analytics
* ⚙️ Settings

---

# 🚀 Tech Stack

### Framework

* Next.js (App Router)
* React

### Styling

* Tailwind CSS

### State Management

* Zustand
* TanStack Query (Backend eklendiğinde)

### Forms

* React Hook Form

### Charts

* Recharts

### Icons

* Lucide React

---

# 🏗️ Project Architecture

Bu proje Feature-Based Architecture yaklaşımıyla geliştirilmektedir.

```text
src/
│
├── app/
├── features/
├── shared/
├── pages/
├── mocks/
└── components/
```

Her feature kendi içerisinde;

* components
* hooks
* services
* streaming
* Optimistic UI


katmanlarına ayrılmıştır.

---

# 📄 Pages

## Dashboard

Kullanıcının günlük üretkenlik durumunu gösteren ana ekran.

İçerik:

* Today's Focus
* Calendar Widget
* Recent Notes
* AI Suggestions
* Weekly Progress
* Activity Timeline

---

## Tasks

Görev yönetim ekranı.

Desteklenen görünümler

* List
* Kanban
* Calendar
* Table

---

## Knowledge Base

Markdown destekli kişisel bilgi merkezi.

* Categories
* Tags
* Search
* Rich Text
* Code Blocks

---

## Documents

Belgelerin yönetildiği alan.

* PDF
* Images
* JSON
* Office Documents

---

## Calendar

Takvim tabanlı görev planlama.

* Month
* Week
* Day
* Agenda

---

## Goals

Kişisel hedeflerin takip edildiği ekran.

Örnek

2026 Goal

↓

Frontend

↓

React

↓

Next.js

↓

System Design

---

## Analytics

Üretkenlik analizleri.

* Completed Tasks
* Weekly Progress
* Focus Time
* Goal Progress
* Charts

---

## Settings

Kullanıcı ayarları.

* Notifications
* Accessibility
* Profile

---

# ⚡ Rendering Strategy

| Page           | Rendering |
| -------------- | --------- |
| Dashboard      | SSR       |
| Tasks          | CSR       |
| Knowledge Base | ISR       |
| Documents      | CSR       |
| Calendar       | CSR       |
| Goals          | CSR       |
| Analytics      | SSR       |
| Settings       | CSR       |

---

# 🎯 Performance

Bu projede aşağıdaki modern frontend tekniklerinin uygulanması hedeflenmektedir.

* Dynamic Imports
* Suspense
* Streaming
* Lazy Loading
* Memoization
* Virtualization
* Debounce
* Optimistic UI
* Route Groups
* Even-Driven
---

# ♿ Accessibility

WCAG standartlarına uygun geliştirme hedeflenmektedir.

* Semantic HTML
* Keyboard Navigation
* Focus Management
* Screen Reader Support
* Color Contrast
* Skip Links

---

# 🧠 Future Roadmap

## Phase 1

* JSON Data
* Responsive UI
* Dashboard
* Feature Architecture

## Phase 2

* Backend Integration
* Authentication

## Phase 3

* AI Integration
* Semantic Search
* AI Assistant
* Smart Recommendations

## Phase 4

* Offline Mode
* IndexedDB
* PWA
* Push Notifications
* Real-time Sync

---

# 📌 Project Goal

Bu proje, modern frontend geliştirme yaklaşımlarını, ölçeklenebilir mimariyi ve AI destekli kullanıcı deneyimini bir araya getiren gerçek dünya seviyesinde bir ürün geliştirme deneyimi sunmayı amaçlamaktadır.
