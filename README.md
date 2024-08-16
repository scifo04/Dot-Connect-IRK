# Implementasi Path-Finding untuk permainan Dot-Connect
> Seleksi Lab Ilmu Rekayasa dan Komputasi (IRK)

## **Daftar Isi**

- [Author](#author)
- [Deskripsi Program](#deskripsi-program)
- [Requirement Program](#requirements-program)
- [Set Up dan Build Program](#set-up-dan-build-program)
- [Cara Menggunakan Program](#cara-menggunakan-program)
- [Home Page](#home-page)
- [Test](#test)

## **Author**

|   NIM    |           Nama           |
| :------: | :----------------------: |
| 13522110 | Marvin Scifo Y. Hutahaean  |

## **Deskripsi Program**

<p align="justify">
Aplikasi ini adalah aplikasi permainan Dot-Connect yang dimulai dengan menekan tombol yang bersebelahan dengan tombol yang sudah ditekan sebelumnya atau tombol awal. Hal ini dilakukan terus-menerus sampai tombol yang belum ditekan sudah ditekan semua. Terdapat 4 tingkat kesulitan yaitu Beginner, Easy, Medium, dan Hard. Terdapat 2 teknik permainan yaitu Manual dan Automatic. Manual dilakukan dengan menekan tombol oleh input dari pemain dan Automatic dilakukan dengan program yang menekan tombol secara otomatis.

</p>

## **Tech Stack**
1. Frontend: React
2. Backend: Go
3. Database: SQLite3

## **Algoritma dan Penjelasannya**
Algoritma yang digunakan dalam aplikasi ini adalah Branch and Bound. Branch and Bound adalah algoritma Pathfinding yang melakukan backtrack jika telah menemukan Boundary function sehingga banyak kemungkinan-kemungkinan yang terpangkas ketika melakukan path-finding. Pada program ini boundary function ada 2 yaitu:
1. Jika ada 2 buntut (1 tempat masuk), maka permainan tidak bisa diselesaikan
2. Jika terdapat 2 area yang terpisah karena tombol yang ditekan, maka permainan tidak bisa diselesaikan

Kompleksitas dari program ini adalah sekitar T(4^(nxm)) dan O(4^(nxm)). Hal ini disebabkan karena program melakukan rekursi maksimal ke 4 arah yang berbeda. Meskipun banyak pruning yang dilakukan. Worst-case scenario tetaplah jika 2 boundary function tidak pernah terjadi.

## **Cara Menggunakan Program** ##
1. Pastikan pada react anda, react-router-dom dan Swal sudah dipasang karena kedua komponen tersebut digunakan
2. Buka dengan npm run start
3. Nyalakan aplikasi backend dengan go run .
4. Jangan lupa untuk klik new game atau load game serta memasukan kredensial yang dibutuhkan untuk bermain
5. Pilihlah tingkat kesulitan dan tipe permainan
6. Enjoy!!!

## **Home Page**
Bonus yang diimplementasikan ada 2:
1. Animasi
2. Kecepatan algoritma: Kurang diyakinkan karena ada test case Hard yang lebih dari 10 detik

<!-- Optional -->
<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->

<!-- You don't have to include all sections - just the one's relevant to your project -->
