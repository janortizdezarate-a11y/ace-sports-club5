// app.js - Core logic for the Ace Sport Club PWA

const SUPABASE_URL = 'https://hdysujzyabenovvnwauf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkeXN1anp5YWJlbm92dm53YXVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzODc3MzQsImV4cCI6MjEwNjk2MzczNH0.WLi7JxM3Ah8Xwv5GemCtArKwDe7tx21NcK9TA2aG7IQ';

let supabaseClient = null;
if (window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// State
let currentUser = null;
let userProfile = null;

// ===================== DATA =====================
const MOCK_DATA = {
    courts: [
        { id: 1, type: 'padel', name: 'Pádel Cristal', time: '18:00', duration: '90 min', basePrice: 12, court: 'Pista 3' },
        { id: 2, type: 'padel', name: 'Pádel Panorámica', time: '19:30', duration: '90 min', basePrice: 12, court: 'Pista 7' },
        { id: 3, type: 'padel', name: 'Pádel Cubierta', time: '20:30', duration: '90 min', basePrice: 14, court: 'Pista 1' },
        { id: 4, type: 'tennis', name: 'Tenis Quick', time: '18:00', duration: '60 min', basePrice: 15, court: 'Pista 1' },
        { id: 5, type: 'tennis', name: 'Tenis Tierra', time: '19:00', duration: '60 min', basePrice: 15, court: 'Pista 2' },
        { id: 6, type: 'tennis', name: 'Tenis Nocturno', time: '20:30', duration: '60 min', basePrice: 16, court: 'Pista 4' },
    ],
    classes: [
        { id: 1, name: 'Cross Training', time: '09:15', sala: 'Sala 1', duration: '50m', basePrice: 8 },
        { id: 2, name: 'Pilates Funcional', time: '10:00', sala: 'Sala 2', duration: '50m', basePrice: 8 },
        { id: 3, name: 'Spinning Indoor', time: '18:10', sala: 'Sala 1', duration: '45m', basePrice: 8 },
        { id: 4, name: 'Body Combat', time: '19:15', sala: 'Sala 1', duration: '55m', basePrice: 8 },
        { id: 5, name: 'Hatha Yoga', time: '19:15', sala: 'Sala 2', duration: '60m', basePrice: 8 },
        { id: 6, name: 'GAP (Glúteos/Abdomen)', time: '20:00', sala: 'Sala 2', duration: '45m', basePrice: 8 }
    ],
    restaurant: [
        { id: 1, name: 'Menú Fit Post-Entreno', desc: 'Pechuga a la plancha, arroz integral, aguacate y batido.', price: 14.50 },
        { id: 2, name: 'Ensalada Ace Quinoa', desc: 'Quinoa real, aguacate, canónigos, cherrys y vinagreta cítrica.', price: 9.90 },
        { id: 3, name: 'Bocata de Jamón Ibérico', desc: 'Pan de cristal recién tostado con tomate de rama y aceite AOVE.', price: 6.50 },
        { id: 4, name: 'Smoothie Proteico Antioxidante', desc: 'Frutos rojos, plátano, espinaca baby y proteína isolate.', price: 4.80 }
    ],
    shop: [
        { id: 1, name: 'Bote Bolas Pádel Head Pro S (x3)', price: 6.50, type: 'padel' },
        { id: 2, name: 'Bote Bolas Bullpadel Premium Pro (x3)', price: 7.00, type: 'padel' },
        { id: 3, name: 'Caja x3 Botes Pádel Wilson', price: 17.50, type: 'padel' },
        { id: 4, name: 'Bote Bolas Tenis Dunlop Fort All Court (x3)', price: 7.50, type: 'tennis' },
        { id: 5, name: 'Bote Bolas Tenis Head Tour (x3)', price: 7.20, type: 'tennis' },
        { id: 6, name: 'Pack Overgrips Wilson Pro Perforated (x3)', price: 6.95, type: 'general' }
    ]
};

const STANDARD_PRICES = {
    padel_court: 12,
    tennis_court: 15,
    guided_class: 8,
    gym_day: 10
};

// ===================== AUTH =====================
async function checkAuth() {
    if (!supabaseClient) return false;
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session && session.user) {
            currentUser = session.user;
            await fetchProfile();
            return true;
        }
    } catch (e) {
        console.error("Auth check error:", e);
    }
    return false;
}

async function fetchProfile() {
    if (!supabaseClient || !currentUser) return;
    try {
        const { data, error } = await supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', currentUser.id)
            .single();
        if (!error && data) {
            userProfile = data;
        }
    } catch (e) {
        console.error("Fetch profile error:", e);
    }
}

async function handleLogout() {
    if (supabaseClient) {
        await supabaseClient.auth.signOut();
    }
    currentUser = null;
    userProfile = null;
    renderAppUI(false);
    switchTab('screen-account');
}

// ===================== PRICING ENGINE (PERSONALIZATION) =====================
// If user has no membership or 'gratuito', they pay standard prices.
// If they have a paid membership, the eligible services show 0€ / Gratis.
function calculatePrice(itemType, basePrice) {
    if (!userProfile) return basePrice;
    
    const membership = userProfile.membership_type;
    const status = userProfile.subscription_status;

    // Free plan or inactive subscription pays regular prices
    if (!membership || membership === 'gratuito' || status !== 'active') {
        return basePrice;
    }

    // Padel membership discounts
    if (itemType === 'padel') {
        if (['padel', 'adulto', 'completo_dirigidas_ilimitadas'].includes(membership)) {
            return 0;
        }
    }

    // Tennis membership discounts
    if (itemType === 'tennis') {
        if (['adulto', 'completo_dirigidas_ilimitadas'].includes(membership)) {
            return 0;
        }
    }

    // Classes discounts
    if (itemType === 'class') {
        if (['gym_clases', 'clases_ilimitado', 'completo_dirigidas_ilimitadas', 'clases_2horas'].includes(membership)) {
            return 0;
        }
    }

    // Gym discounts
    if (itemType === 'gym') {
        if (['gym', 'gym_clases', 'adulto', 'completo_dirigidas_ilimitadas'].includes(membership)) {
            return 0;
        }
    }

    return basePrice;
}

function getMembershipName(type) {
    const names = {
        gratuito: 'Plan Gratuito',
        adulto: 'Abonado Adulto',
        padel: 'Abonado Pádel',
        gym: 'Abonado Gym',
        gym_clases: 'Gym + Clases Ilimitadas',
        clases_2horas: 'Clases Dirigidas 2h/sem',
        clases_ilimitado: 'Clases Dirigidas Ilimitado',
        completo_dirigidas_ilimitadas: 'Completo + Dirigidas Ilimitadas'
    };
    return names[type] || 'Plan Gratuito';
}

// ===================== RENDER FUNCTIONS =====================
function renderAppUI(loggedIn) {
    renderHeader(loggedIn);
    renderCourts();
    renderHomeClasses();
    renderAllClasses();
    renderHomeExtras();
    renderTennisScreen();
    renderPadelScreen();
    renderAccountScreen(loggedIn);
}

function renderHeader(loggedIn) {
    const title = document.getElementById('headerTitle');
    const badge = document.getElementById('headerBadge');
    const actions = document.getElementById('headerActions');
    const note = document.getElementById('pricePersonalizationNote');
    if (!title) return;

    if (loggedIn && userProfile) {
        const fullName = userProfile.full_name || currentUser.user_metadata?.full_name || 'Usuario';
        const firstName = fullName.split(' ')[0];
        title.textContent = `Hola, ${firstName}`;

        const isFree = !userProfile.membership_type || userProfile.membership_type === 'gratuito';
        if (!isFree && userProfile.subscription_status === 'active') {
            badge.className = 'text-xs bg-green-500 text-white font-bold px-2.5 py-0.5 rounded-full inline-block mt-1';
            badge.textContent = getMembershipName(userProfile.membership_type);
            if (note) note.textContent = 'Precios abonado aplicados (0€)';
        } else {
            badge.className = 'text-xs bg-white/20 text-white/90 font-medium px-2 py-0.5 rounded-full inline-block mt-1';
            badge.textContent = 'Plan Gratuito';
            if (note) note.textContent = 'Tarifas estándar sin cuota';
        }
        actions.innerHTML = `
            <button onclick="switchTab('screen-account')" class="text-white hover:text-green-300 transition text-lg p-1.5" title="Mi Cuenta">
                <i class="fas fa-user-circle"></i>
            </button>
            <button onclick="handleLogout()" class="text-white/70 hover:text-red-300 transition text-base p-1.5" title="Salir">
                <i class="fas fa-sign-out-alt"></i>
            </button>
        `;
    } else {
        title.textContent = 'Ace Sport Club';
        badge.className = 'text-xs bg-white/20 text-white/90 font-medium px-2 py-0.5 rounded-full inline-block mt-1';
        badge.textContent = 'Explorando App';
        if (note) note.textContent = 'Tarifas generales';
        actions.innerHTML = `
            <button onclick="switchTab('screen-account')" class="bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow transition">
                Acceder
            </button>
        `;
    }
}

function renderCourts() {
    const el = document.getElementById('courtsList');
    if (!el) return;

    el.innerHTML = MOCK_DATA.courts.map(court => {
        const price = calculatePrice(court.type, court.basePrice);
        const isFree = price === 0;
        const sportParam = court.type === 'padel' ? '?sport=PADEL' : '?sport=TENNIS';
        const isPadel = court.type === 'padel';

        return `
        <div class="bg-white rounded-xl p-3.5 shadow-sm flex justify-between items-center border border-gray-100 hover:border-gray-200 transition">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full ${isPadel ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'} flex items-center justify-center text-base shrink-0">
                    <i class="fas ${isPadel ? 'fa-table-tennis' : 'fa-baseball-ball'}"></i>
                </div>
                <div>
                    <p class="font-bold text-gray-800 text-xs">${court.name} · ${court.court}</p>
                    <p class="text-[11px] text-gray-400">${court.time} (${court.duration})</p>
                </div>
            </div>
            <div class="text-right">
                <p class="text-base font-extrabold ${isFree ? 'text-green-500' : 'text-gray-800'}">
                    ${isFree ? '0€ <span class="text-[10px] uppercase bg-green-100 text-green-700 px-1.5 py-0.2 rounded font-bold">Abono</span>' : price + '€'}
                </p>
                <a href="https://playtomic.com/clubs/se-lespiral-manager${sportParam}" target="_blank" class="text-[11px] bg-gray-900 text-white px-3 py-1 rounded-full mt-1 inline-block font-semibold hover:bg-gray-800 transition">
                    Reservar
                </a>
            </div>
        </div>`;
    }).join('');
}

function renderHomeClasses() {
    const el = document.getElementById('homeClassesList');
    if (!el) return;

    const previewClasses = MOCK_DATA.classes.slice(0, 3);
    el.innerHTML = previewClasses.map(cls => {
        const price = calculatePrice('class', cls.basePrice);
        const isFree = price === 0;
        return `
        <div class="bg-white rounded-xl p-3 shadow-sm flex justify-between items-center border border-gray-100">
            <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm shrink-0">
                    <i class="fas fa-dumbbell"></i>
                </div>
                <div>
                    <p class="font-bold text-gray-800 text-xs">${cls.name}</p>
                    <p class="text-[10px] text-gray-400">${cls.time} · ${cls.sala}</p>
                </div>
            </div>
            <div class="text-right">
                <p class="text-xs font-bold ${isFree ? 'text-green-500' : 'text-gray-800'}">
                    ${isFree ? 'Incluido' : price + '€'}
                </p>
                <a href="https://bookyway.com/en/app-for-bookings/" target="_blank" class="text-[10px] bg-purple-600 text-white px-2.5 py-1 rounded-full mt-0.5 inline-block font-semibold">
                    Plaza
                </a>
            </div>
        </div>`;
    }).join('');
}

function renderAllClasses() {
    const el = document.getElementById('classesList');
    if (!el) return;

    el.innerHTML = MOCK_DATA.classes.map(cls => {
        const price = calculatePrice('class', cls.basePrice);
        const isFree = price === 0;
        return `
        <div class="bg-white rounded-xl p-3.5 shadow-sm flex justify-between items-center border border-gray-100">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-base shrink-0">
                    <i class="fas fa-dumbbell"></i>
                </div>
                <div>
                    <p class="font-bold text-gray-800 text-xs">${cls.name}</p>
                    <p class="text-[11px] text-gray-400">${cls.time} (${cls.duration}) · ${cls.sala}</p>
                </div>
            </div>
            <div class="text-right">
                <p class="text-base font-extrabold ${isFree ? 'text-green-500' : 'text-gray-800'}">
                    ${isFree ? '0€ <span class="text-[10px] uppercase bg-green-100 text-green-700 px-1 rounded font-bold">Incluida</span>' : price + '€'}
                </p>
                <a href="https://bookyway.com/en/app-for-bookings/" target="_blank" class="text-[11px] bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-full mt-1 inline-block font-semibold shadow-sm transition">
                    Apuntarse
                </a>
            </div>
        </div>`;
    }).join('');
}

function renderHomeExtras() {
    const el = document.getElementById('homeExtras');
    if (!el) return;

    const restHtml = MOCK_DATA.restaurant.map(item => `
        <div class="bg-orange-50 rounded-xl p-3.5 border border-orange-100 shrink-0 w-60 shadow-sm">
            <div class="flex justify-between items-start">
                <h4 class="font-bold text-orange-900 text-xs">${item.name}</h4>
                <span class="font-black text-orange-600 text-xs">${item.price.toFixed(2)}€</span>
            </div>
            <p class="text-[11px] text-orange-800/80 mt-1 line-clamp-2 leading-relaxed">${item.desc}</p>
        </div>`).join('');

    const shopHtml = MOCK_DATA.shop.map(item => `
        <div class="bg-blue-50 rounded-xl p-3 border border-blue-100 shrink-0 w-48 shadow-sm">
            <span class="text-[9px] uppercase font-bold text-blue-500 bg-blue-100 px-1.5 py-0.5 rounded-full">${item.type}</span>
            <h4 class="font-bold text-blue-900 text-xs mt-1 truncate">${item.name}</h4>
            <p class="font-black text-blue-600 text-xs mt-1">${item.price.toFixed(2)}€</p>
        </div>`).join('');

    el.innerHTML = `
        <div class="pt-2">
            <h3 class="font-bold text-gray-800 text-sm mb-2 px-1 flex items-center justify-between">
                <span><i class="fas fa-utensils text-orange-500 mr-1.5"></i> Restaurante &amp; Ofertas</span>
                <span class="text-[10px] text-gray-400">Club Social</span>
            </h3>
            <div class="flex gap-2.5 overflow-x-auto pb-2 hide-scrollbar">${restHtml}</div>
        </div>

        <div class="pt-3">
            <h3 class="font-bold text-gray-800 text-sm mb-2 px-1 flex items-center justify-between">
                <span><i class="fas fa-shopping-bag text-blue-500 mr-1.5"></i> Bolas &amp; Tienda</span>
                <span class="text-[10px] text-gray-400">Recepción</span>
            </h3>
            <div class="flex gap-2.5 overflow-x-auto pb-2 hide-scrollbar">${shopHtml}</div>
        </div>`;
}

function renderTennisScreen() {
    const priceTag = document.getElementById('tennisPriceTag');
    if (priceTag) {
        const price = calculatePrice('tennis', STANDARD_PRICES.tennis_court);
        const isFree = price === 0;
        priceTag.innerHTML = `
            <div class="bg-white/10 backdrop-blur rounded-xl p-2.5 flex justify-between items-center text-xs">
                <span>Tarifa por pista (60 min):</span>
                <span class="font-black text-sm ${isFree ? 'text-green-300' : 'text-white'}">
                    ${isFree ? '0€ (Incluido en tu abono)' : price + '€ / hora'}
                </span>
            </div>`;
    }

    const ballsEl = document.getElementById('tennisBalls');
    if (ballsEl) {
        const tennisBalls = MOCK_DATA.shop.filter(i => i.type === 'tennis');
        ballsEl.innerHTML = `
            <h3 class="font-bold text-sm text-gray-800 mb-2 flex items-center gap-2">
                <i class="fas fa-circle text-yellow-500"></i> Bolas de Tenis en el Club
            </h3>
            <div class="space-y-2 text-xs">
                ${tennisBalls.map(b => `
                    <div class="flex justify-between items-center bg-yellow-50/60 rounded-xl p-2.5 border border-yellow-100">
                        <span class="font-medium text-gray-800">${b.name}</span>
                        <span class="font-extrabold text-gray-900">${b.price.toFixed(2)}€</span>
                    </div>
                `).join('')}
            </div>`;
    }
}

function renderPadelScreen() {
    const priceTag = document.getElementById('padelPriceTag');
    if (priceTag) {
        const price = calculatePrice('padel', STANDARD_PRICES.padel_court);
        const isFree = price === 0;
        priceTag.innerHTML = `
            <div class="bg-white/10 backdrop-blur rounded-xl p-2.5 flex justify-between items-center text-xs">
                <span>Tarifa por pista (90 min):</span>
                <span class="font-black text-sm ${isFree ? 'text-green-300' : 'text-white'}">
                    ${isFree ? '0€ (Incluido en tu abono)' : price + '€ / 90min'}
                </span>
            </div>`;
    }

    const ballsEl = document.getElementById('padelBalls');
    if (ballsEl) {
        const padelBalls = MOCK_DATA.shop.filter(i => i.type === 'padel');
        ballsEl.innerHTML = `
            <h3 class="font-bold text-sm text-gray-800 mb-2 flex items-center gap-2">
                <i class="fas fa-circle text-blue-500"></i> Bolas de Pádel en el Club
            </h3>
            <div class="space-y-2 text-xs">
                ${padelBalls.map(b => `
                    <div class="flex justify-between items-center bg-blue-50/60 rounded-xl p-2.5 border border-blue-100">
                        <span class="font-medium text-gray-800">${b.name}</span>
                        <span class="font-extrabold text-gray-900">${b.price.toFixed(2)}€</span>
                    </div>
                `).join('')}
            </div>`;
    }
}

function renderAccountScreen(loggedIn) {
    const outView = document.getElementById('accountLoggedOut');
    const inView = document.getElementById('accountLoggedIn');
    if (!outView || !inView) return;

    if (loggedIn && userProfile) {
        outView.classList.add('hidden');
        inView.classList.remove('hidden');

        const name = userProfile.full_name || currentUser.user_metadata?.full_name || 'Abonado';
        const email = currentUser.email || '';
        document.getElementById('accountName').textContent = name;
        document.getElementById('accountEmail').textContent = email;

        const mType = userProfile.membership_type || 'gratuito';
        const mLabel = getMembershipName(mType);
        const isFree = mType === 'gratuito' || userProfile.subscription_status !== 'active';

        const badge = document.getElementById('accountMembership');
        badge.textContent = mLabel;
        badge.className = isFree 
            ? 'bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase shadow'
            : 'bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase shadow';

        const detailEl = document.getElementById('accountSubDetail');
        if (!isFree) {
            detailEl.innerHTML = `
                <div class="flex items-center gap-2 mb-1.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                    <strong class="text-green-700 font-bold">Abono Activo: ${mLabel}</strong>
                </div>
                <p class="text-gray-600">Disfrutas de precios a <strong>0€</strong> en las actividades cubiertas por tu tarifa. Cuando reserves en la app verás tus ventajas reflejadas automáticamente.</p>
            `;
        } else {
            detailEl.innerHTML = `
                <div class="flex items-center gap-2 mb-1.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                    <strong class="text-gray-700 font-bold">Plan Gratuito Activo</strong>
                </div>
                <p class="text-gray-600">Puedes navegar libremente por el club y reservar pistas con las tarifas estándar. Si lo deseas, puedes darte de alta como abonado para jugar a 0€.</p>
            `;
        }
    } else {
        outView.classList.remove('hidden');
        inView.classList.add('hidden');
    }
}

// ===================== ACCOUNT FORM HANDLER =====================
function setupAccountUI() {
    const form = document.getElementById('appLoginForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const btn = document.getElementById('loginBtn');
        const err = document.getElementById('loginError');

        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Validando...';
        btn.disabled = true;
        err.classList.add('hidden');

        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
            if (error) {
                err.textContent = error.message.includes('Invalid') ? 'Credenciales incorrectas.' : error.message;
                err.classList.remove('hidden');
                btn.innerHTML = 'Entrar a Mi Cuenta';
                btn.disabled = false;
            } else {
                currentUser = data.user;
                await fetchProfile();
                renderAppUI(true);
                btn.innerHTML = 'Entrar a Mi Cuenta';
                btn.disabled = false;
            }
        } catch (e) {
            err.textContent = 'Error de conexión con el servidor.';
            err.classList.remove('hidden');
            btn.innerHTML = 'Entrar a Mi Cuenta';
            btn.disabled = false;
        }
    });
}

// ===================== TABS NAVIGATION =====================
function setupTabs() {
    const tabs = document.querySelectorAll('.app-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const target = tab.getAttribute('data-target');
            switchTab(target);
        });
    });
}

// ===================== APP LANGUAGE PERSISTENCE & LOCALIZATION =====================
const APP_TRANSLATIONS = {
    es: {
        header_title: "Ace Sport Club",
        header_subtitle_guest: "Explorando App",
        header_hello: "Hola",
        tab_home: "Inicio",
        tab_tennis: "Tenis",
        tab_padel: "Pádel",
        tab_classes: "Clases",
        tab_account: "Mi Cuenta",
        court_label: "Pista",
        reserve_btn: "Reservar",
        join_class_btn: "Plaza",
        included: "Incluida",
        free_label: "Abono",
        tennis_courts_label: "4 Pistas de Tenis",
        padel_courts_label: "11 Pistas de Pádel",
        rate_60m: "Tarifa por pista (60 min):",
        rate_90m: "Tarifa por pista (90 min):",
        free_with_sub: "0€ (Incluido en tu abono)",
        balls_tennis_title: "Bolas de Tenis en el Club",
        balls_padel_title: "Bolas de Pádel en el Club",
        lang_saved_notice: "Idioma guardado en tu cuenta"
    },
    en: {
        header_title: "Ace Sport Club",
        header_subtitle_guest: "Exploring App",
        header_hello: "Hello",
        tab_home: "Home",
        tab_tennis: "Tennis",
        tab_padel: "Padel",
        tab_classes: "Classes",
        tab_account: "My Account",
        court_label: "Court",
        reserve_btn: "Book",
        join_class_btn: "Book Spot",
        included: "Included",
        free_label: "Member",
        tennis_courts_label: "4 Tennis Courts",
        padel_courts_label: "11 Padel Courts",
        rate_60m: "Court rate (60 min):",
        rate_90m: "Court rate (90 min):",
        free_with_sub: "0€ (Included in membership)",
        balls_tennis_title: "Tennis Balls at the Club",
        balls_padel_title: "Padel Balls at the Club",
        lang_saved_notice: "Language saved to your account"
    },
    ca: {
        header_title: "Ace Sport Club",
        header_subtitle_guest: "Explorant l'App",
        header_hello: "Hola",
        tab_home: "Inici",
        tab_tennis: "Tennis",
        tab_padel: "Pàdel",
        tab_classes: "Classes",
        tab_account: "El Meu Compte",
        court_label: "Pista",
        reserve_btn: "Reservar",
        join_class_btn: "Plaça",
        included: "Inclosa",
        free_label: "Abonat",
        tennis_courts_label: "4 Pistes de Tennis",
        padel_courts_label: "11 Pistes de Pàdel",
        rate_60m: "Tarifa per pista (60 min):",
        rate_90m: "Tarifa per pista (90 min):",
        free_with_sub: "0€ (Inclòs al teu abonament)",
        balls_tennis_title: "Pilotes de Tennis al Club",
        balls_padel_title: "Pilotes de Pàdel al Club",
        lang_saved_notice: "Idioma desat al teu compte"
    }
};

let currentAppLang = localStorage.getItem('preferredLang') || 'es';

async function setAppLanguage(lang) {
    if (!['es', 'en', 'ca'].includes(lang)) return;
    currentAppLang = lang;
    localStorage.setItem('preferredLang', lang);

    // Update buttons UI in Mi Cuenta
    updateLangButtonsUI(lang);

    // Save preference to Supabase user metadata and profiles if logged in
    if (supabaseClient && currentUser) {
        try {
            await supabaseClient.auth.updateUser({
                data: { preferred_language: lang }
            });
            // Also try updating profiles table if column exists or in user profile
            await supabaseClient
                .from('profiles')
                .update({ preferred_language: lang })
                .eq('id', currentUser.id)
                .catch(() => {});
            
            const notice = document.getElementById('appLangNotice');
            if (notice) {
                notice.textContent = APP_TRANSLATIONS[lang].lang_saved_notice;
                notice.classList.remove('hidden');
                setTimeout(() => notice.classList.add('hidden'), 3500);
            }
        } catch (e) {
            console.log("Language metadata update notice:", e);
        }
    }

    // Re-render UI with new language
    renderAppUI(!!currentUser);
}

function updateLangButtonsUI(lang) {
    ['es', 'en', 'ca'].forEach(l => {
        // Logged-in buttons
        const btn = document.getElementById('app-lang-' + l);
        if (btn) {
            if (l === lang) {
                btn.className = 'py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 bg-blue-50 border-blue-500 text-blue-700 shadow-sm';
            } else {
                btn.className = 'py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 bg-white border-gray-200 text-gray-600 hover:bg-gray-50';
            }
        }
        // Guest buttons
        const guestBtn = document.getElementById('app-guest-lang-' + l);
        if (guestBtn) {
            if (l === lang) {
                guestBtn.className = 'py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 bg-blue-50 border-blue-500 text-blue-700 shadow-sm';
            } else {
                guestBtn.className = 'py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 bg-white border-gray-200 text-gray-600 hover:bg-gray-50';
            }
        }
    });
}

// Initialise language from user profile if available
async function initUserLanguagePreference() {
    if (currentUser) {
        const userLang = currentUser.user_metadata?.preferred_language || userProfile?.preferred_language;
        if (userLang && ['es', 'en', 'ca'].includes(userLang)) {
            currentAppLang = userLang;
            localStorage.setItem('preferredLang', userLang);
        }
    }
    updateLangButtonsUI(currentAppLang);
}

// Hook language init on checkAuth
const originalCheckAuth = checkAuth;
checkAuth = async function() {
    const res = await originalCheckAuth();
    await initUserLanguagePreference();
    return res;
};

