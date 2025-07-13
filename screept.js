// ==================== ANIMASI SCROLL SECTION ====================
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // hanya sekali
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => observer.observe(section));
});


// ==================== FILTER PRODUK BERDASARKAN KATEGORI ====================
function filterProduk(kategori) {
  const semuaProduk = document.querySelectorAll(".produk-grid .card");

  semuaProduk.forEach(card => {
    const tampilkan = kategori === "all" || card.classList.contains(kategori);
    card.style.display = tampilkan ? "block" : "none";
  });
}


// ==================== TAMBAH KE KERANJANG ====================
function addToCart(nama) {
  const harga = {
    "Bakso Aci": 20000,
    "Seblak Kering": 15000,
    "Seblak": 25000,
    "Cireng Kuah Pedas": 20000,
    "Es Buah": 10000,
    "Teh Tarik": 13000,
    "Macha Latte": 16000,
    "Milkshake": 18000
  }[nama] || 0; // default 0 jika tidak ditemukan

  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push({ nama, harga });
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCart();
  alert(`${nama} ditambahkan ke keranjang!`);
}

function updateCart() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = cart.length;
}


// ==================== TAMPILKAN ITEM DI HALAMAN CHECKOUT ====================
document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const list = document.getElementById("checkout-items");
  const totalSpan = document.getElementById("total-harga");

  if (list && totalSpan) {
    let total = 0;
    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.nama} - Rp${item.harga.toLocaleString()}`;
      list.appendChild(li);
      total += item.harga;
    });

    totalSpan.textContent = `Rp${total.toLocaleString()}`;
  }

  updateCart(); // update tampilan jumlah keranjang
});


// ==================== KIRIM PESANAN (Checkout) ====================
function submitOrder(e) {
  e.preventDefault();

  const loader = document.getElementById("loader");
  if (loader) loader.classList.remove("hidden");

  const tombol = document.querySelector("#checkout-form button");
  if (tombol) {
    tombol.disabled = true;
    tombol.textContent = "Memproses...";
  }

  setTimeout(() => {
    alert("✅ Pesanan kamu berhasil dikirim! Terima kasih.");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  }, 2500);
}
