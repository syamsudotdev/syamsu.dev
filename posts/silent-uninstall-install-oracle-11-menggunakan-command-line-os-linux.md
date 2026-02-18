+++
categories = ["administrator", "database", "sysadmin"]
date = 2018-02-12T05:00:52
description = ""
draft = false
slug = "silent-uninstall-install-oracle-11-menggunakan-command-line-os-linux"
tags = ["administrator", "database", "sysadmin"]
title = "Silent Uninstall-Install Oracle 11g R2 Menggunakan Command Line Interface di OS Berbasis Linux"
layout = "layouts/blog.tsx"
+++

![Oracle Database](/images/oracle-database.jpg)
Jadi, kemarin baru saja saya diminta memperbaiki Oracle Database Software. Setelah berkutat dengan database-nya sampai seharian. Ternyata ruang sisa penyimpanannya habis. Oleh klien diminta hapus saja data fisik dari database **mainan** yang memakan 60% dari kapasitas penyimpanan.<!--more--> Dengan polosnya saya asal hapus saja data fisiknya dari penyimpanan. Kemudian saya baru sadar itu menyebabkan sistem database-nya error. Oh, sometimes people can be stupid to not do mistakes they had done. Recover apa yang sudah dihapus itu terlalu merepotkan. Toh ini database memang mau dipakai dari dalam keadaan kosong. Maka diputuskan untuk melakukan install ulang RDBMS nya.

Untuk yang hanya mau melakukan instalasi. Bisa download dulu di [sini](http://www.oracle.com/technetwork/database/enterprise-edition/downloads/index.html) dan langsung ke langkah instalasi.

## Uninstall/Deinstall Oracle Software

Pertama, kita perlu melakukan uninstall dulu. Oleh oracle sendiri mereka menyebutnya deinstall, tool-nya pun diberi nama deinstall.

Masuk ke direktori tempat berkas deinstall berada dan jalankan berkas bernama "deinstall".

```bash
$ORACLE_HOME/deinstall/deinstall
```

Perlu diperhatikan, jika kamu dulunya memasang oracle dengan tidak mengikuti pengaturan lokasi direktori bawaan. Maka kamu perlu memberi parameter tambahan. Lebih lengkapnya ada di dokumentasi [ini](https://docs.oracle.com/cd/E11882_01/install.112/e24322/remove_oracle_sw.htm#LACLI1350).

## Installation

Jika ini instalasi pertamamu, jangan lupa diekstrak dulu installer-nya ya. Kemudian buat user bernama oracle dan user group oinstall. Jangan lupa masukkan user oracle ke dalam group oinstall.

Kemudian jalankan file "runInstaller" di dalam direktori "database" dari hasil ekstrak tadi sebagai user oracle.

```bash
[root@localhost ~]# su - oracle
[oracle@localhost ~]$ cd /path/ke/hasil/ekstrak/installer/database
[oracle@localhost database]$ ./runInstaller -silent -force \
FROM_LOCATION=/path/ke/hasil/ekstrak/installer/database/stage/products.xml \
oracle.install.option=INSTALL_DB_SWONLY \
UNIX_GROUP_NAME=oinstall \
INVENTORY_LOCATION=/u01/app/oracle/oraInventory
ORACLE_HOME=/u01/app/oracle/product/11.2/dbs \
ORACLE_HOME_NAME="OraDb11g" \
ORACLE_BASE=/u01/app/oracle \
oracle.install.db.InstallEdition=XE \
oracle.install.db.isCustomInstall=false \
oracle.install.db.DBA_GROUP=dba \
oracle.install.db.OPER_GROUP=dba \
DECLINE_SECURITY_UPDATES=true
```

Sesuaikan masing-masing parameter instalasi di atas dengan kemauan kalian. Akan muncul informasi perkembangan instalasi.

Ketika sudah selesai, perhatikan bahwa kita harus menjalankan dua script sebagai root, yaitu orainstRoot.sh dan root.sh.

Jika kamu menggunakan parameter di atas. Kurang lebih perintahnya sama seperti berikut.

```bash
[oracle@localhost database]$ exit
[root@localhost ~]# /u01/app/oracle/oraInventory/orainstRoot.sh
[root@localhost ~]# /u01/app/oracle/product/11.2/dbs/root.sh
```

Sampai di sini instalasi sudah selesai. Oracle database software sudah siap untuk digunakan :D tahapan selanjutnya adalah membuat database baru dan pengaturan schema database.

Kita bisa membuatnya manual ataupun melakukannya menggunakan dbca tool. Lengkapnya di [sini](https://docs.oracle.com/cd/E11882_01/server.112/e25494/create.htm#ADMIN12479).

Untuk membuat database menggunakan dbca tool, berikut perintahnya

```bash
dbca -silent -createDatabase \
-templateName General_Purpose.dbc -gdbname <NAMA DB> \
-sid <NAMA SID> -responseFile NO_VALUE \
-characterSet AL32UTF8 -memoryPercentage 30 \
-emConfiguration LOCAL
```

Jangan lupa bagian yang dikurung lancip &lt;&gt; disesuaikan :D

[Sumber gambar](https://www.baculasystems.com)
