+++
categories = ["android", "pemrograman"]
date = 2018-03-16T08:55:03Z
description = ""
draft = false
slug = "implementasi-swipe-gesture-pada-android-recyclerview"
tags = ["android", "itemtouchhelper", "pemrograman", "recyclerview", "swipe"]
title = "Implementasi Swipe Gesture pada Android RecyclerView"
image = "/images/touch-gesture.jpeg"
layout = "layouts/blog.tsx"
+++

# Implementasi Swipe Gesture pada Android RecyclerView

![Touch Gesture](/images/touch-gesture.jpeg)
Pada umumnya sebuah aplikasi android yang punya tampilan list menerapkan swipe gesture untuk menghilangkannya dari list. Ada banyak cara di internet bagaimana implementasi gesture ini pada RecyclerView. Salah satunya menggunakan [ItemTouchHelper](https://developer.android.com/reference/android/support/v7/widget/helper/ItemTouchHelper.html) untuk translasi sebuah item RecyclerView.<!--more--> Translasi di sini maksudnya adalah memindahkan semua titik dari sebuah objek di view ke arah tertentu dengan jarak yang sama. Contohnya pada swipe gesture yang akan kita implementasikan kali ini. Supaya user dapat melakukan swipe pada sebuah item, maka item yang bersangkutan membutuhkan kemampuan untuk melakukan translasi.

Untuk membuat sebuah view dapat melakukannya, pertama kita buat implementasi dari [ItemTouchHelper.SimpleCallback](https://developer.android.com/reference/android/support/v7/widget/helper/ItemTouchHelper.SimpleCallback.html).

```kotlin
class RecyclerItemTouchHelper(
    private val context: Context,
    private val listener: SwipeListener
) : ItemTouchHelper.SimpleCallback(0, ItemTouchHelper.RIGHT) { //only allow swipe to right

interface SwipeListener {
    fun delete(position: Int)
}

...

override fun onMove(
        recyclerView: RecyclerView?,
        viewHolder: RecyclerView.ViewHolder?,
        target: RecyclerView.ViewHolder?
): Boolean {
    return false
}

override fun onSwiped(viewHolder: RecyclerView.ViewHolder?, direction: Int) {
    this.listener.delete(viewHolder!!.adapterPosition)
}
```

Pada contoh di atas, saya membuatnya hanya memperbolehkan swipe gesture ke kanan. Jika ingin implementasi kanan dan kiri, pada baris kedua kita bisa menggantinya seperti berikut

```bash
: ItemTouchHelper.SimpleCallback(0, ItemTouchHelper.RIGHT | ItemTouchHelper.RIGHT)
```

Pada parameter constructor pertama diberikan angka nol untuk membuatnya tidak bisa di-drag secara vertikal. Kita tidak memerlukan drag gesture, jadi pada method `onMove()` di-[return false](<https://developer.android.com/reference/android/support/v7/widget/helper/ItemTouchHelper.Callback.html#onMove(android.support.v7.widget.RecyclerView,%20android.support.v7.widget.RecyclerView.ViewHolder,%20android.support.v7.widget.RecyclerView.ViewHolder)>). Method `onSwiped()` akan dipanggil ketika sebuah gesture swipe berada pada kondisi sudah di-swipe (swiped). Di sini kita melakukan aksi delete dengan memanggil method dari interface.

Kemudian, untuk menggambar background warna abu-abu dan icon archive dari item yang di swipe. Lakukan override pada method [onChildDraw](<https://developer.android.com/reference/android/support/v7/widget/helper/ItemTouchHelper.Callback.html#onChildDraw(android.graphics.Canvas,%20android.support.v7.widget.RecyclerView,%20android.support.v7.widget.RecyclerView.ViewHolder,%20float,%20float,%20int,%20boolean)>) seperti berikut

```kotlin
override fun onChildDraw(
        c: Canvas,
        recyclerView: RecyclerView,
        viewHolder: RecyclerView.ViewHolder,
        dX: Float,
        dY: Float,
        actionState: Int,
        isCurrentlyActive: Boolean
) {
    val itemView = viewHolder.itemView
    val itemHeight = itemView.height
    val background = ColorDrawable()

    background.color = Color.DKGRAY
    background.setBounds(itemView.left, itemView.top, itemView.right, itemView.bottom)
    background.draw(c)

    val archiveIcon = ContextCompat.getDrawable(context, R.drawable.ic_archive_white_24dp)
    val intrinsicWidth = archiveIcon.intrinsicWidth
    val intrinsicHeight = archiveIcon.intrinsicHeight
    val archiveIconTop = itemView.top + (itemHeight - intrinsicHeight) / 2
    val archiveIconMargin = (itemHeight - intrinsicHeight) / 2
    val archiveIconLeft = itemView.left + archiveIconMargin
    val archiveIconRight = itemView.left + archiveIconMargin - intrinsicWidth
    val archiveIconBottom = archiveIconTop + intrinsicHeight

    archiveIcon.setBounds(archiveIconLeft, archiveIconTop, archiveIconRight, archiveIconBottom)
    archiveIcon.draw(c)

    super.onChildDraw(c, recyclerView, viewHolder, dX, dY, actionState, isCurrentlyActive)
}
```

Method di atas menggambar warna background dan icon ke canvas milik view yang di-swipe oleh user.

Secara keseluruhan, class RecyclerItemTouchHelper tersebut menjadi seperti ini

```kotlin
package net.mnsam.antnote.feature.list.recycler

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.support.v4.content.ContextCompat
import android.support.v7.widget.RecyclerView
import android.support.v7.widget.helper.ItemTouchHelper
import net.mnsam.antnote.R

/**
 * Created by Mochamad Noor Syamsu on 3/9/18.
 */
class RecyclerItemTouchHelper(private val context: Context, private val listener: SwipeListener)
    : ItemTouchHelper.SimpleCallback(0, ItemTouchHelper.RIGHT) {

    interface SwipeListener {
        fun delete(position: Int)
    }

    override fun onChildDraw(
            c: Canvas,
            recyclerView: RecyclerView,
            viewHolder: RecyclerView.ViewHolder,
            dX: Float,
            dY: Float,
            actionState: Int,
            isCurrentlyActive: Boolean
    ) {
        val itemView = viewHolder.itemView
        val itemHeight = itemView.height
        val background = ColorDrawable()

        background.color = Color.DKGRAY
        background.setBounds(itemView.left, itemView.top, itemView.right, itemView.bottom)
        background.draw(c)

        val archiveIcon = ContextCompat.getDrawable(context, R.drawable.ic_archive_white_24dp)
        val intrinsicWidth = archiveIcon.intrinsicWidth
        val intrinsicHeight = archiveIcon.intrinsicHeight
        val archiveIconTop = itemView.top + (itemHeight - intrinsicHeight) / 2
        val archiveIconMargin = (itemHeight - intrinsicHeight) / 2
        val archiveIconLeft = itemView.left + archiveIconMargin
        val archiveIconRight = itemView.left + archiveIconMargin - intrinsicWidth
        val archiveIconBottom = archiveIconTop + intrinsicHeight

        archiveIcon.setBounds(archiveIconLeft, archiveIconTop, archiveIconRight, archiveIconBottom)
        archiveIcon.draw(c)

        super.onChildDraw(c, recyclerView, viewHolder, dX, dY, actionState, isCurrentlyActive)
    }

    override fun onMove(
            recyclerView: RecyclerView?,
            viewHolder: RecyclerView.ViewHolder?,
            target: RecyclerView.ViewHolder?
    ): Boolean {
        return false
    }

    override fun onSwiped(viewHolder: RecyclerView.ViewHolder?, direction: Int) {
        this.listener.delete(viewHolder!!.adapterPosition)
    }
}
```

Dari callback ItemTouchHelper yang telah dibuat. Kita implementasikan ke activity yang bersangkutan.

```kotlin
val swipeListener = object : RecyclerItemTouchHelper.SwipeListener {
    override fun delete(position: Int) {
        presenter.onArchiveNote(position)
    }
}

val itemTouchHelper = ItemTouchHelper(RecyclerItemTouchHelper(this, swipeListener))
itemTouchHelper.attachToRecyclerView(listItem) //attach to RecyclerView whose id is listItem
```

Di activity kita buat implementasi dari interface listener yang ada untuk dimasukkan ke constructor callback tadi. `listItem` di sini adalah id RecyclerView-nya.

Sampai di sini, kita sudah menjangkau dasar - dasar implementasi swipe gesture ini. Untuk implementasi dari penjelasan di atas secara keseluruhan, kamu bisa mengeksplorasi sumber kodenya di github project [Ant Note](https://github.com/syamsudotdev/ant-note/tree/b295be8f7321ad8c879880b2d215b931913b8a1a/app/src/main/java/net/mnsam/antnote/feature/list).

Terima kasih sudah membaca.

[Sumber gambar](https://www.youtube.com/user/TheCsics)
