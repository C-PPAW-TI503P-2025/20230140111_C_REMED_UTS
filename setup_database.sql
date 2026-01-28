-- ============================================
-- Database Setup Script untuk Sistem Perpustakaan
-- ============================================
-- 
-- Cara menggunakan:
-- 1. Buka MySQL Workbench
-- 2. Buat koneksi ke MySQL Server (localhost:3306)
-- 3. Copy-paste script ini ke Query Editor
-- 4. Execute script dengan klik tombol lightning (⚡) atau tekan Ctrl+Shift+Enter
-- 5. Refresh schema list untuk melihat database baru
--
-- ============================================

-- Buat database baru
CREATE DATABASE IF NOT EXISTS library_db;

-- Gunakan database
USE library_db;

-- Tampilkan pesan sukses
SELECT 'Database library_db berhasil dibuat!' AS Status;

-- Tampilkan daftar tabel (akan kosong karena tabel dibuat otomatis oleh Sequelize)
SHOW TABLES;

-- ============================================
-- CATATAN PENTING:
-- ============================================
-- Tabel 'books' dan 'borrow_logs' akan dibuat secara otomatis
-- oleh Sequelize saat server dijalankan pertama kali.
-- Anda tidak perlu membuat tabel secara manual.
-- ============================================
