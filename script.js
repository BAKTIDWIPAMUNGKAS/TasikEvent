const eventData = [
    {
        id: 1,
        title: "Tasik Jazz Festival",
        category: "Musik",
        date: "15 Mei 2025",
        time: "19:00 - 22:00 WIB",
        location: "Taman Kota Tasikmalaya",
        description: "Nikmati pertunjukan jazz dari musisi terbaik lokal dan nasional dalam suasana yang indah di Taman Kota.",
        image: "image/event1.jpg",
        tickets: {
            regular: { price: 150000, benefits: ["Akses ke semua pertunjukan", "Area standing", "Merchandise dasar"] },
            vip: { price: 300000, benefits: ["Akses ke semua pertunjukan", "Area khusus dengan kursi", "Merchandise eksklusif", "Minuman gratis"] },
            vvip: { price: 500000, benefits: ["Akses ke semua pertunjukan", "Tempat duduk prioritas", "Merchandise premium", "Makan & minum gratis", "Meet & Greet dengan artis"] }
        }
    },
    {
        id: 2,
        title: "Pameran Seni Rupa",
        category: "Seni",
        date: "20 Mei 2025",
        time: "10:00 - 20:00 WIB",
        location: "Galeri Seni Tasikmalaya",
        description: "Menghadirkan karya-karya terbaik dari seniman lokal Tasikmalaya dengan tema 'Harmoni Alam'. Pameran ini menampilkan berbagai karya seni lukis, patung, dan instalasi dari seniman berbakat kota Tasikmalaya.",
        image: "image/event2.jpg",
        tickets: {
            regular: { price: 50000, benefits: ["Akses ke semua area pameran", "Katalog pameran digital"] },
            vip: { price: 150000, benefits: ["Akses ke semua area pameran", "Katalog pameran eksklusif", "Workshop singkat dengan seniman"] },
            vvip: { price: 300000, benefits: ["Akses ke semua area pameran", "Katalog pameran eksklusif", "Workshop dengan seniman", "Karya seni mini eksklusif"] }
        }
    },
    {
        id: 3,
        title: "Tasik Food Festival",
        category: "Kuliner",
        date: "25 Mei 2025",
        time: "11:00 - 21:00 WIB",
        location: "Alun-alun Tasikmalaya",
        description: "Festival kuliner yang menampilkan beragam kuliner khas Tasikmalaya dan sekitarnya. Jelajahi aneka ragam kuliner tradisional dan kontemporer dari lebih dari 50 vendor makanan terpilih.",
        image: "image/event3.jpg",
        tickets: {
            regular: { price: 35000, benefits: ["Akses masuk festival", "Kupon makanan 1x"] },
            vip: { price: 100000, benefits: ["Akses masuk festival", "Kupon makanan 3x", "Akses area VIP"] },
            vvip: { price: 200000, benefits: ["Akses masuk festival", "Kupon makanan all you can eat", "Akses area VVIP", "Parkir khusus"] }
        }
    },
    {
        id: 4,
        title: "For Revenge",
        category: "Musik",
        date: "30 Mei 2025",
        time: "18:00 - 23:00 WIB",
        location: "Alun-alun Tasikmalaya",
        description: "For Revenge akan menghantam panggung Alun-alun Tasikmalaya dengan energi hardcore mereka yang brutal. Festival ini juga akan menampilkan berbagai band rock underground lokal dan nasional.",
        image: "image/For-Revenge.jpg",
        tickets: {
            regular: { price: 175000, benefits: ["Akses ke arena festival", "Merchandise dasar"] },
            vip: { price: 350000, benefits: ["Akses ke arena festival", "Merchandise eksklusif", "Akses area VIP", "1x minuman gratis"] },
            vvip: { price: 550000, benefits: ["Akses ke arena festival", "Merchandise premium", "Akses area VVIP", "Minuman gratis", "Meet & Greet dengan band"] }
        }
    },
    {
        id: 5,
        title: "Dewa 19",
        category: "Musik",
        date: "5 Juni 2025",
        time: "19:30 - 22:30 WIB",
        location: "Alun-alun Tasikmalaya",
        description: "Saksikan penampilan spektakuler dari band legenda musik Indonesia, Dewa 19, dalam konser yang akan menghibur penggemar musik di Tasikmalaya dengan lagu-lagu hits mereka sepanjang masa.",
        image: "image/event9.jpg",
        tickets: {
            regular: { price: 250000, benefits: ["Akses ke arena konser", "Standing area"] },
            vip: { price: 500000, benefits: ["Akses ke arena konser", "Tempat duduk area VIP", "Merchandise eksklusif"] },
            vvip: { price: 750000, benefits: ["Akses ke arena konser", "Tempat duduk premium", "Merchandise lengkap", "Meet & Greet dengan Dewa 19"] }
        }
    },
    {
        id: 6,
        title: "Kotak Band",
        category: "Musik",
        date: "10 Juni 2025",
        time: "19:00 - 22:00 WIB",
        location: "Alun-alun Tasikmalaya",
        description: "Rasakan energi musik yang mengguncang dari Kotak Band dalam konser spesial mereka di Tasikmalaya. Konser ini akan menampilkan berbagai hits terbaik dari Kotak Band yang akan membuat malam Anda berkesan.",
        image: "image/event10.jpeg",
        tickets: {
            regular: { price: 200000, benefits: ["Akses ke arena konser", "Standing area"] },
            vip: { price: 400000, benefits: ["Akses ke arena konser", "Tempat duduk area VIP", "Poster eksklusif"] },
            vvip: { price: 600000, benefits: ["Akses ke arena konser", "Tempat duduk premium", "Merchandise lengkap", "Meet & Greet dengan Kotak Band"] }
        }
    },
    {
        id: 7,
        title: "Workshop Fotografi",
        category: "Pendidikan",
        date: "2 Juni 2025",
        time: "09:00 - 17:00 WIB",
        location: "Studio Kreatif Tasikmalaya",
        description: "Belajar teknik fotografi langsung dari fotografer profesional dengan pengalaman 15 tahun. Workshop ini akan membahas dasar-dasar fotografi hingga teknik lanjutan bagi para fotografer pemula maupun menengah.",
        image: "image/event4.jpg",
        tickets: {
            regular: { price: 250000, benefits: ["Materi workshop", "Sertifikat", "Snack"] },
            vip: { price: 500000, benefits: ["Materi workshop", "Sertifikat", "Makan siang", "1-on-1 konsultasi singkat"] },
            vvip: { price: 750000, benefits: ["Materi workshop", "Sertifikat premium", "Makan siang", "1-on-1 mentoring", "Akses eksklusif grup alumni"] }
        }
    },
    {
        id: 8,
        title: "Tasik Run 2025",
        category: "Olahraga",
        date: "10 Juni 2025",
        time: "06:00 - 10:00 WIB",
        location: "Stadion Wiradadaha",
        description: "Lari 10K menyusuri kota Tasikmalaya untuk mendukung pendidikan anak-anak kurang mampu. Acara ini terbuka untuk semua kalangan dengan berbagai kategori lari yang dapat dipilih.",
        image: "image/event5.jpg",
        tickets: {
            regular: { price: 175000, benefits: ["Nomor peserta", "Kaos event", "Medali finisher", "Air mineral"] },
            vip: { price: 300000, benefits: ["Nomor peserta", "Kaos event premium", "Medali finisher", "Merchandise", "Air mineral dan snack"] },
            vvip: { price: 450000, benefits: ["Nomor peserta", "Kaos event premium", "Medali finisher eksklusif", "Merchandise lengkap", "Breakfast dan lunch", "Akses VIP tent"] }
        }
    },
    {
        id: 9,
        title: "Konser Musik Tradisional",
        category: "Musik",
        date: "15 Juni 2025",
        time: "19:00 - 21:30 WIB",
        location: "Gedung Kesenian Tasikmalaya",
        description: "Pertunjukan musik tradisional Sunda dengan konsep modern yang mengagumkan. Konser ini akan menampilkan beberapa komposisi musik tradisional yang dipadukan dengan sentuhan modern.",
        image: "image/event6.jpg",
        tickets: {
            regular: { price: 100000, benefits: ["Akses ke pertunjukan", "Tempat duduk reguler"] },
            vip: { price: 200000, benefits: ["Akses ke pertunjukan", "Tempat duduk premium", "Booklet pertunjukan"] },
            vvip: { price: 350000, benefits: ["Akses ke pertunjukan", "Tempat duduk VVIP", "Booklet pertunjukan", "Meet & Greet dengan seniman", "Souvenir khas Sunda"] }
        }
    },
    {
        id: 10,
        title: "Kahitna",
        category: "Musik",
        date: "20 Juni 2025",
        time: "19:30 - 22:00 WIB",
        location: "Alun-alun Tasikmalaya",
        description: "Hadirkan malam penuh kenangan bersama Kahitna yang akan membawakan lagu-lagu hits abadi dalam konser spesial. Nikmati penampilan langsung dari grup musik legendaris Indonesia ini.",
        image: "image/event11.jpeg",
        tickets: {
            regular: { price: 250000, benefits: ["Akses ke arena konser", "Standing area"] },
            vip: { price: 450000, benefits: ["Akses ke arena konser", "Tempat duduk area VIP", "Poster eksklusif"] },
            vvip: { price: 650000, benefits: ["Akses ke arena konser", "Tempat duduk premium", "Merchandise lengkap", "Meet & Greet dengan Kahitna"] }
        }
    },
    {
        id: 11,
        title: "Fiersa Besari",
        category: "Musik",
        date: "25 Juni 2025",
        time: "19:00 - 21:30 WIB",
        location: "Alun-alun Tasikmalaya",
        description: "Hadiri malam penuh makna bersama Fiersa Besari dalam konser akustik spesial bertajuk 'Cerita dan Melodi'. Nikmati penampilan langsung lagu-lagu terbaik dari penulis dan musisi multi-talenta ini.",
        image: "image/event12.jpg",
        tickets: {
            regular: { price: 200000, benefits: ["Akses ke arena konser", "Standing area"] },
            vip: { price: 350000, benefits: ["Akses ke arena konser", "Tempat duduk area VIP", "Buku puisi eksklusif"] },
            vvip: { price: 500000, benefits: ["Akses ke arena konser", "Tempat duduk premium", "Merchandise lengkap", "Meet & Greet dengan Fiersa Besari", "Buku bertanda tangan"] }
        }
    },
    {
        id: 12,
        title: "Festival Batik Tasikmalaya",
        category: "Festival",
        date: "10 Juli 2025",
        time: "19:00 - 21:30 WIB",
        location: "Pendopo Kota Tasikmalaya",
        description: "Pameran dan workshop batik khas Tasikmalaya yang menampilkan keindahan budaya lokal.",
        image: "image/past-event1.jpg",
        tickets: {
            regular: { price: 30000, benefits: ["Akses ke area pameran batik", "Katalog motif batik", "Diskon 10% pembelian batik"] },
            vip: { price: 50000, benefits: ["Akses ke area pameran batik", "Workshop membatik 2 jam", "Perlengkapan membatik", "Kain batik kecil hasil karya sendiri"] },
            vvip: { price: 100000, benefits: ["Akses VIP ke semua area", "Workshop membatik premium 3 jam", "Kain batik ukuran besar", "Makan siang gratis", "Sertifikat peserta"] }
        }
    },
    {
        id: 13,
        title: "Seminar Digital Marketing",
        category: "Workshop",
        date: "17 Juli 2025",
        time: "19:00 - 21:30 WIB",
        location: "Hotel Grand Tasikmalaya",
        description: "Seminar dan workshop tentang strategi pemasaran digital untuk UMKM di era modern.",
        image: "image/past-event2.jpg",
        tickets: {
            regular: { price: 100000, benefits: ["Akses ke seminar", "Materi digital (PDF)", "Sertifikat elektronik"] },
            vip: { price: 150000, benefits: ["Akses ke seminar", "Materi lengkap (hardcopy)", "Sertifikat fisik", "Coffee break"] },
            vvip: { price: 200000, benefits: ["Tempat duduk prioritas", "Materi lengkap + template", "Sertifikat fisik premium", "Makan siang", "Sesi konsultasi 1-on-1"] }
        }
    },
    {
        id: 14,
        title: "Tasik Coffee Festival",
        category: "Festival",
        date: "28 Juli 2025",
        time: "19:00 - 21:30 WIB",
        location: "Taman Dadaha",
        description: "Festival kopi yang menampilkan berbagai jenis kopi dari petani lokal Tasikmalaya dan sekitarnya.",
        image: "image/past-event3.jpg",
        tickets: {
            regular: { price: 100000, benefits: ["Akses ke festival", "5 voucher minum gratis", "Goodie bag kecil"] },
            vip: { price: 150000, benefits: ["Akses ke semua area", "10 voucher minum gratis", "Goodie bag premium", "Workshop seduh kopi dasar"] },
            vvip: { price: 230000, benefits: ["Akses VIP ke semua area", "15 voucher minum gratis", "Goodie bag eksklusif", "Workshop seduh kopi premium", "Paket 3 bibit kopi unggulan"] }
        }
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Kode yang bisa berjalan di semua halaman (seperti chatbot)
    
    // Kode khusus ticket.html
    if (window.location.pathname.includes('ticket.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const eventId = parseInt(urlParams.get('id'));
        const event = eventData.find(e => e.id === eventId) || eventData[0];
        updateEventDetails(event);
        setupTicketTypeSelection();
        setupQuantityControls();
        setupPaymentMethodSelection();
        updateSummary();
        setupFormHandling();
        setupCheckoutButton();
    }
});

function updateEventDetails(event) {
    // Update event image
    const eventImage = document.querySelector('.event-image img');
    if (eventImage) eventImage.src = event.image;
    
    // Update event badge
    const eventBadge = document.querySelector('.event-badge');
    if (eventBadge) eventBadge.textContent = event.category;
    
    // Update event title
    const eventTitleElements = document.querySelectorAll('.event-title');
    eventTitleElements.forEach(el => el.textContent = event.title);
    
    // Update ticket header
    const ticketEventTitle = document.querySelector('.ticket-event-title');
    if (ticketEventTitle) ticketEventTitle.textContent = event.title;
    
    // Update event meta information
    const dateSpan = document.querySelector('.meta-item:nth-child(1) span');
    if (dateSpan) dateSpan.textContent = event.date;
    
    const timeSpan = document.querySelector('.meta-item:nth-child(2) span');
    if (timeSpan) timeSpan.textContent = event.time;
    
    const locationSpan = document.querySelector('.meta-item:nth-child(3) span');
    if (locationSpan) locationSpan.textContent = event.location;
    
    // Update event description
    const eventDescription = document.querySelector('.event-description');
    if (eventDescription) eventDescription.textContent = event.description;
    
    // Update ticket details in preview
    const ticketDateValue = document.querySelector('.ticket-detail:nth-child(1) .detail-value');
    if (ticketDateValue) ticketDateValue.textContent = event.date;
    
    const ticketTimeValue = document.querySelector('.ticket-detail:nth-child(2) .detail-value');
    if (ticketTimeValue) ticketTimeValue.textContent = event.time.split(' - ')[0]; // Just the start time
    
    const ticketLocationValue = document.querySelector('.ticket-detail:nth-child(3) .detail-value');
    if (ticketLocationValue) ticketLocationValue.textContent = event.location.split(' ')[0]; // First word of location
    
    // Update ticket types and prices
    updateTicketTypePrices(event);
}

function updateTicketTypePrices(event) {
    // Update Regular ticket
    const regularTicket = document.getElementById('regular');
    if (regularTicket && event.tickets.regular) {
        const regularPrice = regularTicket.querySelector('.ticket-price');
        if (regularPrice) regularPrice.textContent = `Rp ${formatNumber(event.tickets.regular.price)}`;
        
        const regularBenefits = regularTicket.querySelector('.ticket-benefits');
        if (regularBenefits) {
            regularBenefits.innerHTML = '';
            event.tickets.regular.benefits.forEach(benefit => {
                const li = document.createElement('li');
                li.textContent = benefit;
                regularBenefits.appendChild(li);
            });
        }
    }
    
    // Update VIP ticket
    const vipTicket = document.getElementById('vip');
    if (vipTicket && event.tickets.vip) {
        const vipPrice = vipTicket.querySelector('.ticket-price');
        if (vipPrice) vipPrice.textContent = `Rp ${formatNumber(event.tickets.vip.price)}`;
        
        const vipBenefits = vipTicket.querySelector('.ticket-benefits');
        if (vipBenefits) {
            vipBenefits.innerHTML = '';
            event.tickets.vip.benefits.forEach(benefit => {
                const li = document.createElement('li');
                li.textContent = benefit;
                vipBenefits.appendChild(li);
            });
        }
    }
    
    // Update VVIP ticket
    const vvipTicket = document.getElementById('vvip');
    if (vvipTicket && event.tickets.vvip) {
        const vvipPrice = vvipTicket.querySelector('.ticket-price');
        if (vvipPrice) vvipPrice.textContent = `Rp ${formatNumber(event.tickets.vvip.price)}`;
        
        const vvipBenefits = vvipTicket.querySelector('.ticket-benefits');
        if (vvipBenefits) {
            vvipBenefits.innerHTML = '';
            event.tickets.vvip.benefits.forEach(benefit => {
                const li = document.createElement('li');
                li.textContent = benefit;
                vvipBenefits.appendChild(li);
            });
        }
    }
}

// Fungsi-fungsi lain yang sudah ada di ticket.html
function setupTicketTypeSelection() {
    const ticketTypes = document.querySelectorAll('.ticket-type');
    ticketTypes.forEach(ticket => {
        ticket.addEventListener('click', function() {
            // Remove selected class from all tickets
            ticketTypes.forEach(t => t.classList.remove('selected'));
            // Add selected class to clicked ticket
            this.classList.add('selected');
            
            // Update ticket preview based on selection
            const ticketBadge = document.querySelector('.ticket-badge');
            if (this.id === 'regular') {
                ticketBadge.textContent = 'TIKET REGULAR';
            } else if (this.id === 'vip') {
                ticketBadge.textContent = 'TIKET VIP';
            } else if (this.id === 'vvip') {
                ticketBadge.textContent = 'TIKET VVIP';
            }
            
            // Update summary based on selection
            updateSummary();
        });
    });
}

function setupQuantityControls() {
    const minusBtns = document.querySelectorAll('.minus');
    const plusBtns = document.querySelectorAll('.plus');
    const qtyInputs = document.querySelectorAll('.qty-input');
    
    minusBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            let value = parseInt(qtyInputs[index].value);
            if (value > 0) {
                qtyInputs[index].value = value - 1;
                updateSummary();
            }
        });
    });
    
    plusBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            let value = parseInt(qtyInputs[index].value);
            qtyInputs[index].value = value + 1;
            updateSummary();
        });
    });
}

function setupPaymentMethodSelection() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

function updateSummary() {
    // Hanya jalankan jika di halaman ticket
    if (!document.querySelector('.ticket-type')) return
    // Ambil parameter id dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id'));
    
    // Temukan event yang sesuai dengan id
    const event = eventData.find(e => e.id === eventId) || eventData[0];
    
    const selectedTicket = document.querySelector('.ticket-type.selected');
    const quantityInput = selectedTicket.querySelector('.qty-input');
    const quantity = parseInt(quantityInput.value);
    
    let ticketPrice = 0;
    if (selectedTicket.id === 'regular') {
        ticketPrice = event.tickets.regular.price;
    } else if (selectedTicket.id === 'vip') {
        ticketPrice = event.tickets.vip.price;
    } else if (selectedTicket.id === 'vvip') {
        ticketPrice = event.tickets.vvip.price;
    }
    
    const subtotal = ticketPrice * quantity;
    const adminFee = 5000;
    const tax = subtotal * 0.1;
    const total = subtotal + adminFee + tax;
    
    // Update summary display
    const summaryContent = document.querySelector('.checkout-summary');
    
    // Clear previous items
    while (summaryContent.children.length > 1) {
        summaryContent.removeChild(summaryContent.children[1]);
    }
    
    // Create ticket item
    const ticketItem = document.createElement('div');
    ticketItem.className = 'summary-item';
    
    const ticketName = selectedTicket.querySelector('.ticket-name').textContent;
    
    ticketItem.innerHTML = `
        <span class="summary-label">${ticketName} (${quantity} x Rp ${formatNumber(ticketPrice)})</span>
        <span class="summary-value">Rp ${formatNumber(subtotal)}</span>
    `;
    
    // Create admin fee item
    const adminItem = document.createElement('div');
    adminItem.className = 'summary-item';
    adminItem.innerHTML = `
        <span class="summary-label">Biaya Admin</span>
        <span class="summary-value">Rp ${formatNumber(adminFee)}</span>
    `;
    
    // Create tax item
    const taxItem = document.createElement('div');
    taxItem.className = 'summary-item';
    taxItem.innerHTML = `
        <span class="summary-label">Pajak (10%)</span>
        <span class="summary-value">Rp ${formatNumber(tax)}</span>
    `;
    
    // Create total item
    const totalItem = document.createElement('div');
    totalItem.className = 'summary-item total-row';
    totalItem.innerHTML = `
        <span class="summary-label">Total Pembayaran</span>
        <span class="summary-value">Rp ${formatNumber(total)}</span>
    `;
    
    // Add button
    const checkoutBtn = document.createElement('a');
    checkoutBtn.className = 'checkout-btn';
    checkoutBtn.href = '#';
    checkoutBtn.textContent = 'Bayar Sekarang';
    
    // Append all elements to summary
    summaryContent.appendChild(ticketItem);
    summaryContent.appendChild(adminItem);
    summaryContent.appendChild(taxItem);
    summaryContent.appendChild(totalItem);
    summaryContent.appendChild(checkoutBtn);
    
    // Setup checkout button event
    checkoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validate form
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const id = document.getElementById('id').value;
        
        if (!name || !email || !phone || !id) {
            alert('Silakan lengkapi semua data diri Anda');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Format email tidak valid');
            return;
        }
        
        // Validate ID number (KTP)
        if (id.length !== 16 || isNaN(id)) {
            alert('Nomor KTP harus 16 digit angka');
            return;
        }
        
        // Check if at least one ticket is selected
        if (quantity === 0) {
            alert('Silakan pilih minimal 1 tiket');
            return;
        }
        
        // If all validations pass, proceed to payment page
        alert('Pesanan berhasil dibuat! Anda akan diarahkan ke halaman pembayaran.');
        // window.location.href = 'payment.html'; // Uncomment to redirect to payment page
    });
    
    // Update ticket preview
    const ticketOwner = document.querySelector('.ticket-owner .detail-value');
    const nameInput = document.getElementById('name');
    if (nameInput.value) {
        ticketOwner.textContent = nameInput.value;
    }
}

function setupFormHandling() {
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (input.id === 'name') {
                const ticketOwner = document.querySelector('.ticket-owner .detail-value');
                ticketOwner.textContent = input.value || 'Nama Anda';
            }
        });
    });
}

function setupCheckoutButton() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate form
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const id = document.getElementById('id').value;
            
            if (!name || !email || !phone || !id) {
                alert('Silakan lengkapi semua data diri Anda');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Format email tidak valid');
                return;
            }
            
            // Validate ID number (KTP)
            if (id.length !== 16 || isNaN(id)) {
                alert('Nomor KTP harus 16 digit angka');
                return;
            }
            
            // Check if at least one ticket is selected
            const selectedTicket = document.querySelector('.ticket-type.selected');
            const quantity = parseInt(selectedTicket.querySelector('.qty-input').value);
            
            if (quantity === 0) {
                alert('Silakan pilih minimal 1 tiket');
                return;
            }
            
            // If all validations pass, proceed to payment page
            alert('Pesanan berhasil dibuat! Anda akan diarahkan ke halaman pembayaran.');
            // window.location.href = 'payment.html'; // Uncomment to redirect to payment page
        });
    }
}

// Format number to Indonesian currency format
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

//CHATBOT
        // Get DOM elements
        const chatbotToggle = document.getElementById('chatbot-toggle');
        const chatbotContainer = document.getElementById('chatbot-container');
        const chatbotMessages = document.getElementById('chatbot-messages');
        const userInput = document.getElementById('user-input');
        const sendBtn = document.getElementById('send-btn');

        // Toggle chatbot
        chatbotToggle.addEventListener('click', () => {
            chatbotContainer.classList.toggle('expanded');
            if (chatbotContainer.classList.contains('expanded')) {
                userInput.focus();
            }
        });

        // Send message when button is clicked
        sendBtn.addEventListener('click', () => {
            sendMessage();
        });

        // Send message when Enter key is pressed
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Send message function
        function sendMessage() {
            const message = userInput.value.trim();
            
            if (message !== '') {
                // Add user message to chat
                addMessage(message, 'user');
                
                // Clear input
                userInput.value = '';
                
                // Show typing indicator
                showTypingIndicator();
                
                // Process response (with delay to simulate thinking)
                setTimeout(() => {
                    processResponse(message);
                }, 1000);
            }
        }

        // Quick reply function
        function sendQuickReply(message) {
            addMessage(message, 'user');
            showTypingIndicator();
            
            setTimeout(() => {
                processResponse(message);
            }, 1000);
        }

        // Add message to chat
        function addMessage(message, sender) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', sender);
            
            messageElement.innerHTML = `
                ${message}
                <div class="message-time">${getCurrentTime()}</div>
            `;
            
            chatbotMessages.appendChild(messageElement);
            
            // Scroll to bottom
            scrollToBottom();
        }

        // Show typing indicator
        function showTypingIndicator() {
            const typingElement = document.createElement('div');
            typingElement.classList.add('typing');
            typingElement.id = 'typing-indicator';
            
            typingElement.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;
            
            chatbotMessages.appendChild(typingElement);
            
            // Scroll to bottom
            scrollToBottom();
        }

        // Remove typing indicator
        function removeTypingIndicator() {
            const typingIndicator = document.getElementById('typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }

        // Process response based on user input
        function processResponse(message) {
            removeTypingIndicator();
            
            let response = '';
            let quickReplies = [];
            
            // Simple response logic
            message = message.toLowerCase();
            
            if (message.includes('halo') || message.includes('hai') || message.includes('hi')) {
                response = 'Halo! Ada yang bisa saya bantu tentang acara di Tasikmalaya?';
                quickReplies = ['Acara terbaru', 'Lokasi acara', 'Kontak penyelenggara'];
            } 
            else if (message.includes('acara minggu') || message.includes('event minggu')) {
                response = 'Minggu ini ada beberapa acara seru: Tasik Jazz Festival (15 Mei), Pameran Seni Rupa (20 Mei), dan Tasik Food Festival (25 Mei). Acara mana yang ingin Anda ketahui lebih lanjut?';
                quickReplies = ['Tasik Jazz Festival', 'Pameran Seni Rupa', 'Tasik Food Festival'];
            }
            else if (message.includes('jazz') || message.includes('festival jazz')) {
                response = 'Tasik Jazz Festival akan diadakan pada 15 Mei 2025 di Taman Kota Tasikmalaya. Anda dapat menikmati pertunjukan jazz dari musisi terbaik lokal dan nasional. Tiket mulai dari Rp 75.000.';
                quickReplies = ['Beli tiket', 'Lokasi venue', 'Line-up musisi'];
            }
            else if (message.includes('pameran') || message.includes('seni rupa')) {
                response = 'Pameran Seni Rupa dengan tema "Harmoni Alam" akan diadakan pada 20 Mei 2025 di Galeri Seni Tasikmalaya. Pameran ini menampilkan karya-karya terbaik dari seniman lokal Tasikmalaya.';
                quickReplies = ['Beli tiket', 'Informasi seniman', 'Jam buka'];
            }
            else if (message.includes('food') || message.includes('kuliner')) {
                response = 'Tasik Food Festival akan diadakan pada 25 Mei 2025 di Alun-alun Tasikmalaya. Festival ini menampilkan beragam kuliner khas Tasikmalaya dan sekitarnya. Gratis untuk umum!';
                quickReplies = ['Daftar tenant', 'Jam operasional', 'Lokasi venue'];
            }
            else if (message.includes('kategori musik') || message.includes('acara musik')) {
                response = 'Untuk kategori musik, kami memiliki 24 acara yang sedang berlangsung dan akan datang di Tasikmalaya, termasuk konser, festival musik, dan pertunjukan live.';
                quickReplies = ['Konser terbaru', 'Festival musik', 'Live music cafe'];
            }
            else if (message.includes('cara beli tiket') || message.includes('beli tiket')) {
                response = 'Untuk membeli tiket, Anda dapat mengklik tombol "Detail" pada acara yang Anda minati, lalu pilih "Beli Tiket". Anda perlu login terlebih dahulu untuk melanjutkan proses pembelian.';
                quickReplies = ['Cara pembayaran', 'Refund tiket', 'Tiket group'];
            }
            else if (message.includes('terima kasih') || message.includes('makasih')) {
                response = 'Sama-sama! Senang bisa membantu Anda. Jika ada pertanyaan lain, jangan ragu untuk bertanya kembali.';
                quickReplies = ['Tanya lagi', 'Acara lainnya', 'Berlangganan info'];
            }
            else {
                response = 'Maaf, saya belum bisa menjawab pertanyaan tersebut. Silakan tanyakan tentang acara di Tasikmalaya, cara pembelian tiket, atau kategori acara yang tersedia.';
                quickReplies = ['Acara terbaru', 'Kategori acara', 'Kontak admin'];
            }
            
            // Add bot response
            addMessage(response, 'bot');
            
            // Add quick replies if available
            if (quickReplies.length > 0) {
                addQuickReplies(quickReplies);
            }
        }

        // Add quick replies
        function addQuickReplies(replies) {
            const quickRepliesElement = document.createElement('div');
            quickRepliesElement.classList.add('quick-replies');
            
            replies.forEach(reply => {
                quickRepliesElement.innerHTML += `
                    <div class="quick-reply" onclick="sendQuickReply('${reply}')">${reply}</div>
                `;
            });
            
            chatbotMessages.appendChild(quickRepliesElement);
            
            // Scroll to bottom
            scrollToBottom();
        }

        // Get current time for message timestamp
        function getCurrentTime() {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            
            // Add leading zero if needed
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            
            return `${hours}:${minutes}`;
        }

        // Scroll chat to bottom
        function scrollToBottom() {
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }