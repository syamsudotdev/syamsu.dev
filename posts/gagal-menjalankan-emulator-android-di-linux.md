+++
categories = ["android", "pemrograman"]
date = 2017-12-20T14:11:17Z
description = ""
draft = false
slug = "gagal-menjalankan-emulator-android-di-linux"
tags = ["android", "android emulator", "pemrograman"]
title = "Gagal Menjalankan Emulator Android di Linux"
image = "/images/emulator.png"
layout = "layouts/blog.tsx"
+++

# Gagal Menjalankan Emulator Android di Linux

![Android Emulator](/images/emulator.png)
Malam ini, saya melakukan **update development tools** Android. Dan sebuah keanehan terjadi. Selesai melakukan **update, emulator** Android saya gagal jalan. Hmm, ini mengingatkan saya pada **error** yang pernah saya alami. Saya pernah menemukan penyebabnya dengan cara menjalankan emulator dari **command-line.<!--more--> **Sebagai programmer, pastinya hal ini menjadikan kita gelisah dan mengganggu pikiran untuk melanjutkan kegiatan pemrograman.

Tenang, sebenarnya solusinya sederhana, kok. Langkah pertama, kita perlu tahu terlebih dulu apa nama AVD **(Android Virtual Device)** yang akan kita jalankan.

Masuk ke direktori di mana Android SDK-mu berada.

```bash
cd /path/to/android/sdk/emulator/
./emulator -list-avds
```

Akan muncul daftar nama AVD yang kita miliki. Contohnya seperti ini

```bash
Nexus_4_API_26
Nexus_7_2012_API_21_2
Samsung_J7_API_25
```

Nah, setelah itu kita coba jalankan **emulator** memakai salah satu nama AVD di atas.

```bash
./emulator @Samsung_J7_API_25
```

Jangan lupa ada karakter **@** keongnya ya :D

Muncul pesan **error** kurang lebih seperti berikut

```bash
libGL error: unable to load driver: i965_dri.so
libGL error: driver pointer missing
libGL error: failed to load driver: i965
libGL error: unable to load driver: i965_dri.so
libGL error: driver pointer missing
libGL error: failed to load driver: i965
libGL error: unable to load driver: swrast_dri.so
libGL error: failed to load driver: swrast
X Error of failed request:  BadValue (integer parameter out of range for operation)
Major opcode of failed request:  155 (GLX)
Minor opcode of failed request:  24 (X_GLXCreateNewContext)
Value in failed request:  0x0
Serial number of failed request:  68
Current serial number in output stream:  69
```

Kalau kita perhatikan, **error** ini bermula dari tidak ditemukannya **driver i965_dri.so**. Ini disebabkan oleh gagalnya **emulator** mengakses perangkat keras GPU **(Graphical Processing Unit)** kita karena menggunakan **driver** bawaan dari Android SDK.

Untuk mengakses GPU, kita perlu membuat supaya emulator menggunakan **driver native** dari sistem operasi. Hanya dengan mengubah nama berkas **driver** bawaan Android SDK akan membuat **emulator** mencari **driver** dari sistem.

Pada sistem berarsitektur 64bit

```bash
cd /path/to/android/sdk/emulator/lib64/libstdc++/
```

Pada sistem berarsitektur 32bit

```bash
cd /path/to/android/sdk/emulator/lib/libstdc++/
```

Kemudian ubah nama **library**-nya

```bash
mv libstdc++.so.6 libstdc++.so.6.bak
```

Jika ragu mana arsitektur sistemmu, ubah saja nama berkas di kedua direktori tersebut `¯\_(ツ)\_/¯`

Dengan begini, **emulator** akan mencoba mencari **driver native** GPU yang terpasang di sistemmu :D . Seharusnya sampai sini sudah berhasil. Jika masih tidak bisa jalan. Coba periksa apakah **library** mesa sudah terpasang atau belum.

Selamat melanjutkan pengembangan aplikasi :D
