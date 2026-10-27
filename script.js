const products = [
    { id: 1, name: "GALAXY", category: "magic", rarity: "★★★★★ EPIC", price: 8000, stock: 10, icon: "🌌", desc: "Perpaduan rasa ajaib dengan warna memukau bagaikan luar angkasa." },
    { id: 2, name: "BLACKCURRANT BREEZE", category: "magic", rarity: "★★★★ RARE", price: 8000, stock: 10, icon: "🍇", desc: "Kesegaran buah blackcurrant yang dingin dan membakar dahaga." },
    { id: 3, name: "ROSY MELT", category: "magic", rarity: "★★★★ RARE", price: 8000, stock: 10, icon: "🌹", desc: "Sensasi sirup mawar lembut yang manis dan menyegarkan." },
    { id: 4, name: "MANGOLUSH", category: "magic", rarity: "★★★ COMMON", price: 8000, stock: 10, icon: "🥭", desc: "Rasa mangga tropis manis yang kaya akan kesegaran alami." },
    { id: 5, name: "ES ANTI GALAU", category: "magic", rarity: "★★★★★ EPIC", price: 8000, stock: 10, icon: "😊", desc: "Ramuan khusus pemulih suasana hati gembira seketika!" },

    { id: 6, name: "LEMON TEA", category: "fresh", rarity: "★★★ COMMON", price: 8000, stock: 10, icon: "🍋", desc: "Teh segar dipadu perasan lemon murni penghilang dahaga." },
    { id: 7, name: "ORANGE TEA", category: "fresh", rarity: "★★★ COMMON", price: 8000, stock: 10, icon: "🍊", desc: "Sentuhan jeruk manis alami dalam seduhan teh pilihan." },
    { id: 8, name: "PURPLE ECLIPSE", category: "fresh", rarity: "★★★★ RARE", price: 8000, stock: 10, icon: "🌙", desc: "Teh bunga telang ungu eksotis dengan sensasi unik." },
    { id: 9, name: "STRAWBERRY POP", category: "fresh", rarity: "★★★ COMMON", price: 8000, stock: 10, icon: "🍓", desc: "Manisnya buah strawberry segar yang menggugah selera." },
    { id: 10, name: "GOLDEN RUSH", category: "fresh", rarity: "★★★★ RARE", price: 8000, stock: 10, icon: "⚡", desc: "Energi emas kesegaran teh spesial pembakar semangat." },
    { id: 11, name: "APPLE SPARK", category: "fresh", rarity: "★★★ COMMON", price: 8000, stock: 10, icon: "🍎", desc: "Sensasi apel renyah berpadu teh dingin yang nikmat." },

    { id: 12, name: "COOKIES AND CREAM", category: "sweet", rarity: "★★★★ RARE", price: 8000, stock: "0 / PO", icon: "🍪", desc: "Kombinasi krim biskuit cokelat gurih dan lezat." },
    { id: 13, name: "VANILLA", category: "sweet", rarity: "★★★ COMMON", price: 8000, stock: "0 / PO", icon: "🍦", desc: "Aroma vanilla klasik yang lembut dan menenangkan." },

    { id: 14, name: "COFFEE CHOCO", category: "energy", rarity: "★★★★ RARE", price: 8000, stock: "0 / PO", icon: "🍫", desc: "Perpaduan kopi dan cokelat pemulih stamina petualang." },
    { id: 15, name: "AMERICANO", category: "energy", rarity: "★★★ COMMON", price: 8000, stock: "0 / PO", icon: "☕", desc: "Kopi hitam murni penambah fokus perjalanan." }
];

let cart = [];

function renderProducts() {
    const gridMagic = document.getElementById('grid-magic');
    const gridFresh = document.getElementById('grid-fresh');
    const gridSweet = document.getElementById('grid-sweet');
    const gridEnergy = document.getElementById('grid-energy');

    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="rarity">${p.rarity}</div>
            <div class="potion-wrapper">
                <div class="pixel-art">${p.icon}</div>
            </div>
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <div class="stock-badge">Stok: ${p.stock}</div>
            <div class="price">Rp ${p.price.toLocaleString('id-ID')}</div>
            <button class="btn-pixel btn-buy" onclick="addToCart(${p.id})">+ AMBIL POTION</button>
        `;

        if (p.category === 'magic') gridMagic.appendChild(card);
        else if (p.category === 'fresh') gridFresh.appendChild(card);
        else if (p.category === 'sweet') gridSweet.appendChild(card);
        else if (p.category === 'energy') gridEnergy.appendChild(card);
    });
}

function addToCart(id) {
    const p = products.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...p, qty: 1 });
    }

    updateCartUI();
    showToast(`Added ${p.name} to Bag!`);
}

function updateCartUI() {
    const countEl = document.getElementById('cartItemCount');
    const listEl = document.getElementById('cartItemsList');
    const totalEl = document.getElementById('cartTotalPrice');
    const widget = document.getElementById('cartWidget');

    const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
    countEl.innerText = totalQty;

    listEl.innerHTML = '';
    let grandTotal = 0;

    if (cart.length === 0) {
        listEl.innerHTML = '<li style="text-align:center; padding:15px; color:var(--brown);">Bag masih kosong</li>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.qty;
            grandTotal += itemTotal;

            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <div>
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">Rp ${item.price.toLocaleString('id-ID')} x ${item.qty}</div>
                </div>
                <div style="display:flex; align-items:center; gap:6px;">
                    <button class="btn-qty" onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="btn-qty" onclick="changeQty(${item.id}, 1)">+</button>
                    <button class="btn-remove" onclick="removeItem(${item.id})">🗑️</button>
                </div>
            `;
            listEl.appendChild(li);
        });
    }

    totalEl.innerText = `Rp ${grandTotal.toLocaleString('id-ID')}`;

    widget.classList.add('bump');
    setTimeout(() => widget.classList.remove('bump'), 400);
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    updateCartUI();
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
}

function toggleAccordion() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('show');
}

function switchCategory(cat, btn) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const sections = document.querySelectorAll('.category-section');
    sections.forEach(sec => {
        if (cat === 'all') {
            sec.classList.add('active-category');
        } else {
            if (sec.id === `cat-${cat}`) {
                sec.classList.add('active-category');
            } else {
                sec.classList.remove('active-category');
            }
        }
    });
}

function openCartModal() {
    document.getElementById('cartModal').classList.add('active');
}

function closeCartModal() {
    document.getElementById('cartModal').classList.remove('active');
}

function toggleQRIS(show) {
    document.getElementById('qrisContainer').style.display = show ? 'block' : 'none';
}

function runGacha() {
    const btn = document.getElementById('gachaBtn');
    const res = document.getElementById('gachaResult');

    btn.disabled = true;
    res.classList.add('spinning');

    let count = 0;
    const interval = setInterval(() => {
        const rand = products[Math.floor(Math.random() * products.length)];
        res.innerHTML = `${rand.icon} ${rand.name}`;
        count++;

        if (count > 18) {
            clearInterval(interval);
            res.classList.remove('spinning');
            
            const finalP = products[Math.floor(Math.random() * products.length)];
            res.innerHTML = `✨ ${finalP.icon} ${finalP.name} ✨<br><small style="font-size:16px;">${finalP.rarity}</small>`;
            
            addToCart(finalP.id);
            btn.disabled = false;
        }
    }, 100);
}

function showToast(msg) {
    const toast = document.getElementById('toastMsg');
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

function handleCheckout(e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert("Bag Anda masih kosong!");
        return;
    }

    const name = document.getElementById('custName').value;
    const room = document.getElementById('custRoom').value;
    const phone = document.getElementById('custPhone').value;
    const payMethod = document.querySelector('input[name="payMethod"]:checked').value;

    let total = 0;
    let itemsTxt = "";

    cart.forEach(i => {
        const sub = i.price * i.qty;
        total += sub;
        itemsTxt += `- ${i.name} (${i.rarity}) x${i.qty} = Rp ${sub.toLocaleString('id-ID')}\n`;
    });

    const message = `Halo Tavernkeeper Pixel Drink, saya ingin memesan potion:\n\n` +
        `*ADVENTURER DATA:*\n` +
        `Nama: ${name}\n` +
        `Kelas/Ruangan: ${room}\n` +
        `No WA: ${phone}\n` +
        `Metode Pembayaran: ${payMethod}\n\n` +
        `*DAFTAR PESANAN:*\n` +
        itemsTxt + `\n` +
        `*TOTAL BAYAR:* Rp ${total.toLocaleString('id-ID')}`;

    const waUrl = `https://wa.me/6288223313651?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
}

renderProducts();
