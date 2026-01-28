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
![lihat semua buku](https://github.com/user-attachments/assets/ceb34c74-5707-49db-978d-bacf6a602942)

#### Screenshot 2: POST /api/books (Tambah Buku - Admin)
![tambah buku](https://github.com/user-attachments/assets/96807d89-76e7-4ac3-976f-dd027f654605)

#### Screenshot 3: PUT /api/books/:id (Update Buku - Admin)
![update buku](https://github.com/user-attachments/assets/6c9348bc-5c66-423f-8b78-6ded1f0d1db7)

#### Screenshot 4: DELETE /api/books/:id (Hapus Buku - Admin)
![hapus buku](https://github.com/user-attachments/assets/bdd4be89-57f5-4737-b673-574d24e282ca)

#### Screenshot 5: POST /api/borrow (Pinjam Buku - User)
![pinjam buku](https://github.com/user-attachments/assets/34eeefa0-6277-421f-ab0e-1f521851ea53)


### 2. Tampilan Web (Browser)

#### Screenshot 6: GET /api/books di Browser
![tampilan web 1](https://github.com/user-attachments/assets/fba3752b-712a-4ee1-a480-ca5d295a7d3f)
![tampilan web 2](https://github.com/user-attachments/assets/f9614fcf-210b-4696-9535-7e8762504a83)

---

### 3. Struktur Database

#### Screenshot 7: Database Schema (List Tables)
![struktur database](https://github.com/user-attachments/assets/37203452-d7f2-4bb2-8bfb-24f00df91c93)

#### Screenshot 8: Struktur Tabel books
![db 5](https://github.com/user-attachments/assets/7061f3a1-9249-4062-a5d1-da98e71d268e)

#### Screenshot 9: Struktur Tabel borrow_logs
![db 3](https://github.com/user-attachments/assets/37284213-c7ac-4404-bc73-4a8e40cb2864)

#### Screenshot 10: Data di Tabel books
![db 1](https://github.com/user-attachments/assets/bd32b3f9-fce8-4897-ad5c-784edbbe1c21)

#### Screenshot 11: Data di Tabel borrow_logs
![db 2](https://github.com/user-attachments/assets/bfde1422-8c7d-40a4-8160-19fea1e29fa2)

