# Backend Sistem Perpustakaan

> **Remedial UTS**  
> **Mata Kuliah:** Pengembangan Aplikasi Web  
> **Nama:** Syihwa Moza Alika YP Kastella  
> **NIM:** 20230140111

---

## 📖 Deskripsi Proyek

Backend sistem manajemen perpustakaan menggunakan **Node.js**, **Express.js**, dan **Sequelize ORM** dengan database **MySQL**. Sistem ini menyediakan REST API untuk mengelola data buku dan transaksi peminjaman dengan fitur role-based access control.

## 📁 Struktur Proyek


## 🚀 Cara Menjalankan Aplikasi

### 1. Setup Database

Buka **MySQL Workbench**, lalu jalankan:

```sql
CREATE DATABASE library_db;
```

> **Catatan:** Tabel akan dibuat otomatis oleh Sequelize saat server dijalankan.

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Konfigurasi Environment

Edit file `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=library_db
DB_USER=root
DB_PASSWORD=(password sendiri)
PORT=3000

### 4. Jalankan Server

```bash
npm run dev
```

Server berjalan di: **http://localhost:3000**

---

## 📸 Screenshot Hasil Aplikasi

### 1. Test Endpoint API

#### Screenshot 1: GET /api/books (Lihat Semua Buku)
*[Paste screenshot Postman di sini]*

#### Screenshot 2: POST /api/books (Tambah Buku - Admin)
*[Paste screenshot Postman di sini]*

#### Screenshot 3: PUT /api/books/:id (Update Buku - Admin)
*[Paste screenshot Postman di sini]*

#### Screenshot 4: DELETE /api/books/:id (Hapus Buku - Admin)
*[Paste screenshot Postman di sini]*

#### Screenshot 5: POST /api/borrow (Pinjam Buku - User)
*[Paste screenshot Postman di sini]*

#### Screenshot 6: Error 403 (Tanpa Header)
*[Paste screenshot Postman di sini]*

---

### 2. Tampilan Web (Browser)

#### Screenshot 7: GET /api/books di Browser
*[Paste screenshot browser di sini]*

---

### 3. Struktur Database

#### Screenshot 8: Database Schema (List Tables)
*[Paste screenshot MySQL Workbench - list tables di sini]*

#### Screenshot 9: Struktur Tabel books
*[Paste screenshot MySQL Workbench - struktur tabel books di sini]*

#### Screenshot 10: Struktur Tabel borrow_logs
*[Paste screenshot MySQL Workbench - struktur tabel borrow_logs di sini]*

#### Screenshot 11: Data di Tabel books
*[Paste screenshot MySQL Workbench - SELECT * FROM books di sini]*

#### Screenshot 12: Data di Tabel borrow_logs
*[Paste screenshot MySQL Workbench - SELECT * FROM borrow_logs di sini]*

