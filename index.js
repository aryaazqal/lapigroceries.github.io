// ================ CAROUSEL BANNER SETUP ================
// Inisialisasi variabel untuk carousel
let currentSlide = 0;
let autoMoveSlide = true;
const slidesContainer = document.querySelector('.carousel-container');
let slides = document.querySelectorAll('.carousel-item');
let totalSlides = slides.length;

// Menambahkan Event Listener untuk tombol navigasi
document.getElementById('nextBtn').addEventListener('click', moveToNextSlide);
document.getElementById('prevBtn').addEventListener('click', moveToPrevSlide);

// Event listener untuk menghentikan/melanjutkan auto slide saat mouse hover
slidesContainer.addEventListener('mouseenter', () => { autoMoveSlide = false; });
slidesContainer.addEventListener('mouseleave', () => { autoMoveSlide = true; });

// Fungsi untuk memperbarui posisi carousel
function updateCarousel() {
    slides = document.querySelectorAll('.carousel-item'); // Update slide list
    totalSlides = slides.length; // Update total slides count
    for (let slide of slides) {
        slide.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}

// Fungsi untuk berpindah ke slide berikutnya
function moveToNextSlide() {
    if (currentSlide >= totalSlides - 1) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    updateCarousel();
}

// Fungsi untuk berpindah ke slide sebelumnya
function moveToPrevSlide() {
    if (currentSlide <= 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide--;
    }
    updateCarousel();
}

// Auto slide dengan interval waktu
setInterval(() => {
    if (autoMoveSlide) {
        moveToNextSlide();
    }
}, 3000);
// ============ END OF CAROUSEL BANNER SETUP ============


// ================ MANAGING CAROUSEL SLIDES ================
// Fungsi untuk menambahkan slide baru
function addSlide(imageUrl) {
    const slide = document.createElement('div');
    slide.classList.add('carousel-item');
    slide.innerHTML = `<img src="${imageUrl}" alt="New Slide">`;
    slidesContainer.appendChild(slide);
    updateCarousel();
}

// Fungsi untuk menghapus slide
function removeSlide(index) {
    if (index < slides.length) {
        slides[index].remove();
        updateCarousel();
    }
}
// ========== END OF MANAGING CAROUSEL SLIDES ==========


// ================ EXAMPLE USAGE ================
// Contoh penggunaan fungsi addSlide dan removeSlide
  addSlide('imgs/banner.png');
  addSlide('imgs/banner.png'); 
  addSlide('imgs/banner.png');
  addSlide('imgs/banner.png'); 
// removeSlide(0); // Menghapus slide pertama
// ============== END OF EXAMPLE USAGE ==============

// ================ FEATURED PRODUCTS SETUP ================

// Contoh Array Produk
const featuredProducts = [
    { name: "Product Name 1", price: "Rp1234", imageUrl: "imgs/produk.png" },
    { name: "Product Name 1", price: "Rp1234", imageUrl: "imgs/produk.png" },
    { name: "Product Name 1", price: "Rp1234", imageUrl: "imgs/produk.png" },
    // Tambahkan produk lain sesuai kebutuhan
];

// Fungsi untuk Menambahkan Produk ke DOM
function addProductToDOM(product) {
    const productContainer = document.querySelector('.product-container');
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    
    productCard.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
        <div class="product-details">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${product.price}</p>
        </div>
        <div class="product-quantity-controls">
            <button class="quantity-minus">-</button>
            <span class="quantity-count">0</span>
            <button class="quantity-plus">+</button>
        </div>
    `;
    productContainer.appendChild(productCard);

    // Setup event listeners for quantity control buttons
    const minusButton = productCard.querySelector('.quantity-minus');
    const plusButton = productCard.querySelector('.quantity-plus');
    const quantityCount = productCard.querySelector('.quantity-count');

    minusButton.addEventListener('click', () => {
        decreaseItemQuantity(product.name, quantityCount);
    });

    plusButton.addEventListener('click', () => {
        increaseItemQuantity(product.name, product.price, quantityCount);
    });
}

// Fungsi untuk menambah jumlah item produk
function increaseItemQuantity(productName, productPrice, quantityElement) {
    addToCart(productName, productPrice);
    updateProductQuantityDisplay(productName, quantityElement);
}

// Fungsi untuk mengurangi jumlah item produk
function decreaseItemQuantity(productName, quantityElement) {
    removeFromCart(productName);
    updateProductQuantityDisplay(productName, quantityElement);
}

// Fungsi untuk memperbarui tampilan jumlah produk di UI
function updateProductQuantityDisplay(productName, quantityElement) {
    const quantity = keranjangData[productName] ? keranjangData[productName].jumlah : 0;
    quantityElement.textContent = quantity;
}

// Inisialisasi Produk Unggulan
document.addEventListener('DOMContentLoaded', function () {
    featuredProducts.forEach(product => {
        addProductToDOM(product);
    });
});

// ================ END OF FEATURED PRODUCTS ================

// ================ ITEM PRODUK ================
// Data untuk setiap kategori
const vegetables = [
    { name: "Tomat", price: "Rp5000/kg", imageUrl: "imgs/produk.png" },
    { name: "Tomat", price: "Rp5000/kg", imageUrl: "imgs/produk.png" },
    { name: "Tomat", price: "Rp5000/kg", imageUrl: "imgs/produk.png" },
    { name: "Tomat", price: "Rp5000/kg", imageUrl: "imgs/produk.png" },
    { name: "Tomat", price: "Rp5000/kg", imageUrl: "imgs/produk.png" },
    { name: "Tomat", price: "Rp5000/kg", imageUrl: "imgs/produk.png" },
    { name: "Tomat", price: "Rp5000/kg", imageUrl: "imgs/produk.png" },
    { name: "Tomat", price: "Rp5000/kg", imageUrl: "imgs/produk.png" },
    // Tambahkan item sayuran lainnya
];

const meatFish = [
    { name: "Ikan Salmon", price: "Rp20000/kg", imageUrl: "images/salmon.png" },
    { name: "Daging Sapi", price: "Rp15000/kg", imageUrl: "images/beef.png" }
    // Tambahkan item daging & ikan lainnya
];

const groceries = [
    { name: "Beras", price: "Rp8000/kg", imageUrl: "images/beras.png" },
    { name: "Gula", price: "Rp5000/kg", imageUrl: "images/gula.png" }
    // Tambahkan item sembako lainnya
];

const paket = [
    { name: "Beras", price: "Rp8000/kg", imageUrl: "images/beras.png" },
    { name: "Gula", price: "Rp5000/kg", imageUrl: "images/gula.png" }
    // Tambahkan item paket siap masak lainnya di sini
];

const gasWater = [
    { name: "Tabung Gas", price: "Rp50000", imageUrl: "images/gas.png" },
    { name: "Botol Air Mineral", price: "Rp5000", imageUrl: "images/air.png" }
    // Tambahkan item gas & air lainnya di sini
];

const fruits = [
    { name: "Tomat", price: "Rp5000/kg", imageUrl: "imgs/produk.png" },
    { name: "Tomat", price: "Rp5000/kg", imageUrl: "imgs/produk.png" },
    { name: "Tomat", price: "Rp5000/kg", imageUrl: "imgs/produk.png" },
    { name: "Tomat", price: "Rp5000/kg", imageUrl: "imgs/produk.png" },
    // Tambahkan item buah lainnya di sini
];

// Fungsi untuk menambahkan item ke DOM
function addItemToDOM(item, containerId) {
    const container = document.getElementById(containerId);
    const itemCard = document.createElement('div');
    itemCard.classList.add('item-card');
    
    itemCard.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.name}" class="item-image">
        <h3 class="item-name">${item.name}</h3>
        <p class="item-price">${item.price}</p>
        <div class="product-quantity-controls">
            <button class="quantity-minus">-</button>
            <span class="quantity-count">0</span>
            <button class="quantity-plus">+</button>
        </div>
    `;
    container.appendChild(itemCard);

    // Setup event listeners for quantity control buttons
    const minusButton = itemCard.querySelector('.quantity-minus');
    const plusButton = itemCard.querySelector('.quantity-plus');
    const quantityCount = itemCard.querySelector('.quantity-count');

    minusButton.addEventListener('click', () => {
        decreaseItemQuantity(item.name, quantityCount);
    });

    plusButton.addEventListener('click', () => {
        increaseItemQuantity(item.name, item.price, quantityCount);
    });
}

// Fungsi untuk menambah jumlah item produk
function increaseItemQuantity(productName, productPrice, quantityElement) {
    addToCart(productName, productPrice);
    updateProductQuantityDisplay(productName, quantityElement);
}

// Fungsi untuk mengurangi jumlah item produk
function decreaseItemQuantity(productName, quantityElement) {
    removeFromCart(productName);
    updateProductQuantityDisplay(productName, quantityElement);
}

// Fungsi untuk memperbarui tampilan jumlah produk di UI
function updateProductQuantityDisplay(productName, quantityElement) {
    const quantity = keranjangData[productName] ? keranjangData[productName].jumlah : 0;
    quantityElement.textContent = quantity;
}

document.addEventListener('DOMContentLoaded', function () {
    // Pemanggilan fungsi untuk setiap kategori
    vegetables.forEach(veg => addItemToDOM(veg, 'vegetable-items'));
    meatFish.forEach(meat => addItemToDOM(meat, 'meat-fish-items'));
    groceries.forEach(grocery => addItemToDOM(grocery, 'grocery-items'));
    paket.forEach(p => addItemToDOM(p, 'ready-to-cook-items'));
    gasWater.forEach(gw => addItemToDOM(gw, 'gas-water-items'));
    fruits.forEach(fruit => addItemToDOM(fruit, 'fruit-items'));
});
// ================ END OF ITEM PRODUK ================

// ... (Kode sebelumnya)

// Objek untuk menyimpan data keranjang
let keranjangData = {};

// Fungsi untuk menambahkan item ke keranjang
function addToCart(itemName, itemPrice) {
    itemPrice = parseFloat(itemPrice.replace('Rp', '').replace('/kg', '').replace('.', '').trim());

    if (keranjangData[itemName]) {
        keranjangData[itemName].jumlah += 1;
    } else {
        keranjangData[itemName] = { harga: itemPrice, jumlah: 1 };
    }
    updateKeranjangIcon(); // Memperbarui ikon keranjang
}

// Fungsi untuk mengurangi item dari keranjang
function removeFromCart(itemName) {
    if (keranjangData[itemName]) {
        keranjangData[itemName].jumlah -= 1;
        if (keranjangData[itemName].jumlah <= 0) {
            delete keranjangData[itemName];
        }
    }
    updateKeranjangIcon(); // Memperbarui ikon keranjang
}

// Fungsi untuk memperbarui ikon keranjang dengan jumlah total item
function updateKeranjangIcon() {
    let totalItems = 0;
    for (let item in keranjangData) {
        totalItems += keranjangData[item].jumlah;
    }
    // Logika untuk memperbarui ikon keranjang dengan totalItems di sini
    // Misalnya, Anda bisa menampilkan jumlah di samping ikon keranjang
    console.log(`Total items in cart: ${totalItems}`);
}

// Fungsi untuk menampilkan isi keranjang
function tampilkanKeranjang() {
    let totalHarga = 0;
    let keranjangStr = "Keranjang Belanja:\n";
    for (let item in keranjangData) {
        let itemTotal = keranjangData[item].harga * keranjangData[item].jumlah;
        totalHarga += itemTotal;
        keranjangStr += `${item}: ${keranjangData[item].jumlah} item x Rp${keranjangData[item].harga} = Rp${itemTotal}\n`;
    }
    keranjangStr += `\nTotal Harga: Rp${totalHarga}`;
    alert(keranjangStr);
}

// Event listener untuk keranjang utama
const keranjangUtama = document.querySelector('.shop-now-button');
keranjangUtama.addEventListener('click', tampilkanKeranjang);

// Fungsi tampilkanKeranjang yang sama dari kode sebelumnya
// ...

document.addEventListener('DOMContentLoaded', function () {
    // Event listener untuk keranjang utama di header
    const headerShopNowButton = document.querySelector('.shop-now-button');
    headerShopNowButton.addEventListener('click', tampilkanKeranjang);

    // Event listener untuk keranjang utama di footer
    const footerShopNowButton = document.querySelector('.footer-shop-now-button');
    footerShopNowButton.addEventListener('click', tampilkanKeranjang);

    // Inisialisasi item kategori dan fitur lainnya
    // ...
});

// ... (Kode setelahnya)

// alret custom
function showCustomAlert(message, whatsappMessage) {
    // Set the alert message
    document.getElementById('alertMessage').innerText = message;

    // Create WhatsApp link
    const whatsappLink = `https://wa.me/6285161907892?text=${encodeURIComponent(whatsappMessage)}`; // Ganti dengan nomor WhatsApp Anda

    // Check if WhatsApp button already exists
    let whatsappButton = document.getElementById('whatsappLink');
    if (!whatsappButton) {
        // Create a new WhatsApp button if it doesn't exist
        whatsappButton = document.createElement('a');
        whatsappButton.id = 'whatsappLink';
        whatsappButton.className = 'whatsapp-order-button';
        whatsappButton.textContent = 'Pesan Sekarang';
        whatsappButton.href = whatsappLink;
        whatsappButton.target = '_blank'; // Opens link in a new tab/window

        // Append the button to the alert content
        document.querySelector('.custom-alert-content').appendChild(whatsappButton);
    } else {
        // Update the link of the existing button
        whatsappButton.href = whatsappLink;
    }

    // Display the alert
    document.getElementById('customAlert').style.display = 'flex';
}


function closeCustomAlert() {
    document.getElementById('customAlert').style.display = 'none';
}

// Menggantikan fungsi tampilkanKeranjang dengan yang baru
function tampilkanKeranjang() {
    let totalHarga = 0;
    let keranjangStr = "Keranjang Belanja:\n";
    let whatsappMessage = "Halo Lapi Groceries,\n\nSaya ingin memesan:\n";
    for (let item in keranjangData) {
        let itemTotal = keranjangData[item].harga * keranjangData[item].jumlah;
        totalHarga += itemTotal;
        keranjangStr += `${item}: ${keranjangData[item].jumlah} item x Rp${keranjangData[item].harga} = Rp${itemTotal}\n`;
        whatsappMessage += `${item}: ${keranjangData[item].jumlah} item - Total: Rp${itemTotal}\n`;
    }
    keranjangStr += `\nTotal Harga: Rp${totalHarga}`;
    whatsappMessage += `\nTotal Pembayaran: Rp${totalHarga}`;

    showCustomAlert(keranjangStr, whatsappMessage);
}


// end of alret custom

// alret selamat datang
function showAnnouncementAlert() {
    if (!localStorage.getItem('announcementShown')) {
        const announcementAlert = document.getElementById('announcementAlert');
        announcementAlert.style.display = 'flex';

        const startShoppingButton = document.querySelector('.start-shopping-button');
        startShoppingButton.addEventListener('click', function() {
            announcementAlert.style.display = 'none';
        });

        localStorage.setItem('announcementShown', 'true');
    }
}

function closeAnnouncementAlert() {
    document.getElementById('announcementAlert').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', showAnnouncementAlert);

// end of alret selamat datang





