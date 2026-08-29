# 🎓 StudyHub — Onlayn kurslar platformasi

React (Vite) frontend + json-server backend asosida qurilgan onlayn
kurslarga yozilish platformasi.

## Ishga tushirish

```bash
npm install
npm start
```

`npm start` ikkita jarayonni **bir vaqtda** ishga tushiradi (concurrently orqali):

- `npm run dev` — Vite frontend, `http://localhost:5173`
- `npm run server` — json-server backend (REST API), `http://localhost:4001`

Brauzerda `http://localhost:5173` manzilini oching. Frontend kurslar va
kategoriyalarni `/api/courses` va `/api/categories` orqali backend'dan
so'raydi (Vite proxy orqali `4001`-portga yo'naltiriladi).

> Agar faqat frontend'ni ishga tushirsangiz (`npm run dev`, backend'siz),
> sayt baribir ishlaydi — u holda `src/data/*.json`dagi zaxira (fallback)
> ma'lumotlardan foydalanadi.

Production uchun build qilish:

```bash
npm run build
npm run preview
```

## Loyiha tuzilishi

```
db.json                  — json-server uchun "baza" (courses + categories)
src/
  data/
    courses.json          — zaxira ma'lumotlar (backend ishlamasa ishlatiladi)
    categories.json        — zaxira kategoriyalar
  context/
    DataContext.jsx        — API'dan (yoki zaxiradan) kurs/kategoriya olib keladi
    CartContext.jsx         — savat (yozilish) holati, localStorage'da saqlanadi
  components/
    Header.jsx, Footer.jsx, CourseCard.jsx
  pages/
    Home.jsx               — bosh sahifa, kategoriya filtri, kurslar ro'yxati
    CourseDetail.jsx        — kurs sahifasi, reja tanlash (Oddiy / Premium)
    Cart.jsx                 — savat sahifasi
    Checkout.jsx              — to'lovni rasmiylashtirish (mock)
    Success.jsx               — muvaffaqiyatli yozilish sahifasi
```

## Mantiq

- "Mahsulot" o'rnida — **kurslar** (nomi, o'qituvchi, narxi, davomiyligi, daraja).
- "Savatcha" o'rnida — **kursga yozilish**: har bir kurs uchun "reja" tanlanadi
  (Oddiy — asosiy materiallar, yoki Premium — qo'shimcha materiallar, 1:1
  mentorlik va sertifikat bilan).
- Ma'lumotlarni tahrirlash uchun **`db.json`** faylini o'zgartiring — backend
  shu faylni real vaqtda kuzatib turadi (`--watch`). Yangi kurs yoki
  kategoriya qo'shish, narxni o'zgartirish — shu yerda.
- `src/data/*.json` — faqat backend ishlamay qolgan holatlar uchun zaxira
  nusxa; asosiy manba `db.json`.

## API endpoints (backend ishga tushganda)

- `GET http://localhost:4001/courses`
- `GET http://localhost:4001/courses/:id`
- `GET http://localhost:4001/categories`

json-server standart REST metodlarini (`POST`, `PATCH`, `DELETE`) ham
qo'llab-quvvatlaydi — masalan, admin panel yoki Postman orqali kurs
qo'shish/o'zgartirish mumkin.
