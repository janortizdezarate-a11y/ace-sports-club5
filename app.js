// app.js - Core logic for the PWA App Experience

const SUPABASE_URL = 'https://hdysujzyabenovvnwauf.supabase.co';
// Public Anon Key (safe to expose in client code)
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkeXN1anp5YWJlbm92dm53YXVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzODc3MzQsImV4cCI6MjEwNjk2MzczNH0.WLi7JxM3Ah8Xwv5GemCtArKwDe7tx21NcK9TA2aG7IQ';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// State
let currentUser = null;
let userProfile = null;

// Mock Data
const MOCK_DATA = {
    courts: [
        { id: 1, type: 'padel', time: '18:00', duration: '90 min', basePrice: 12 },
        { id: 2, type: 'padel', time: '19:30', duration: '90 min', basePrice: 12 },
        { id: 3, type: 'tennis', time: '18:00', duration: '60 min', basePrice: 15 },
    ],
    classes: [
        { id: 1, name: 'Cross Training', time: '19:15', basePrice: 8 },
        { id: 2, name: 'Pilates', time: '18:10', basePrice: 8 },
        { id: 3, name: 'Barre', time: '15:30', basePrice: 8 }
    ],
    restaurant: [
        { id: 1, name: 'Menú Fit Post-Entreno', desc: 'Pollo a la plancha, arroz integral y batido de proteínas.', price: 14.50 },
        { id: 2, name: 'Ensalada Ace', desc: 'Quinoa, aguacate, cherrys y vinagreta de limón.', price: 9.90 }
    ],
    shop: [
        { id: 1, name: 'Bote Bolas Pádel Head Pro S', price: 6.50 },
        { id: 2, name: 'Overgrip Wilson Pro (x3)', price: 7.00 },
        { id: 3, name: 'Bote Bolas Tenis Dunlop Fort', price: 7.50 }
    ]
};

// Authentication Checks
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        currentUser = session.user;
        await fetchProfile();
        return true;
    }
    return false;
}

async function fetchProfile() {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();
    
    if (!error && data) {
        userProfile = data;
    }
}

async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = 'login.html';
}

// Pricing Engine (Personalization)
function calculatePrice(itemType, basePrice) {
    if (!userProfile || userProfile.subscription_status !== 'active') return basePrice;
    
    const membership = userProfile.membership_type;
    
    if (itemType === 'padel') {
        if (['padel', 'adulto', 'completo_dirigidas_ilimitadas'].includes(membership)) return 0;
    }
    
    if (itemType === 'tennis') {
        if (['adulto', 'completo_dirigidas_ilimitadas'].includes(membership)) return 0;
    }
    
    if (itemType === 'class') {
        if (['gym_clases', 'clases_ilimitado', 'completo_dirigidas_ilimitadas', 'clases_2horas'].includes(membership)) return 0;
    }
    
    return basePrice;
}

// Rendering Functions
function renderAppUI() {
    // 1. Profile header
    document.getElementById('userNameDisplay').textContent = userProfile?.full_name || 'Usuario';
    const subBadge = document.getElementById('subscriptionBadge');
    
    if (userProfile?.subscription_status === 'active') {
        subBadge.textContent = 'Abono Activo: ' + (userProfile.membership_type || 'General').toUpperCase();
        subBadge.className = 'text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold inline-block mt-1';
    } else {
        subBadge.textContent = 'Sin Abono Activo';
        subBadge.className = 'text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-bold inline-block mt-1';
    }

    // 2. Render Courts (Reservas)
    const courtsList = document.getElementById('courtsList');
    if (courtsList) {
        courtsList.innerHTML = MOCK_DATA.courts.map(court => {
            const finalPrice = calculatePrice(court.type, court.basePrice);
            const sportUrl = court.type === 'padel' ? '?sport=PADEL' : '?sport=TENNIS';
            
            return `
            <div class="bg-white rounded-xl p-4 shadow-sm flex justify-between items-center border border-gray-100">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full ${court.type === 'padel' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'} flex items-center justify-center text-lg">
                        <i class="fas ${court.type === 'padel' ? 'fa-table-tennis' : 'fa-baseball-ball'}"></i>
                    </div>
                    <div>
                        <p class="font-bold text-gray-800 capitalize">Pista de ${court.type}</p>
                        <p class="text-xs text-gray-500">${court.time} (${court.duration})</p>
                    </div>
                </div>
                <div class="text-right">
                    <p class="font-bold text-lg ${finalPrice === 0 ? 'text-green-500' : 'text-gray-800'}">${finalPrice === 0 ? 'Gratis' : finalPrice + '€'}</p>
                    <a href="https://playtomic.com/clubs/se-lespiral-manager${sportUrl}" target="_blank" class="text-xs bg-gray-900 text-white px-3 py-1.5 rounded-full mt-1 inline-block font-semibold">Reservar</a>
                </div>
            </div>`;
        }).join('');
    }

    // 3. Render Classes
    const classesList = document.getElementById('classesList');
    if (classesList) {
        classesList.innerHTML = MOCK_DATA.classes.map(cls => {
            const finalPrice = calculatePrice('class', cls.basePrice);
            return `
            <div class="bg-white rounded-xl p-4 shadow-sm flex justify-between items-center border border-gray-100">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-lg">
                        <i class="fas fa-dumbbell"></i>
                    </div>
                    <div>
                        <p class="font-bold text-gray-800">${cls.name}</p>
                        <p class="text-xs text-gray-500">${cls.time}</p>
                    </div>
                </div>
                <div class="text-right">
                    <p class="font-bold text-lg ${finalPrice === 0 ? 'text-green-500' : 'text-gray-800'}">${finalPrice === 0 ? 'Incluido' : finalPrice + '€'}</p>
                    <a href="https://bookyway.com/en/app-for-bookings/" target="_blank" class="text-xs bg-purple-600 text-white px-3 py-1.5 rounded-full mt-1 inline-block font-semibold">Apuntarse</a>
                </div>
            </div>`;
        }).join('');
    }

    // 4. Render Restaurant & Shop
    const extrasList = document.getElementById('extrasList');
    if (extrasList) {
        const restHtml = MOCK_DATA.restaurant.map(item => `
            <div class="flex gap-4 bg-orange-50 rounded-xl p-4 border border-orange-100 shrink-0 w-64">
                <div>
                    <h4 class="font-bold text-orange-900 text-sm">${item.name}</h4>
                    <p class="text-xs text-orange-700 mt-1 line-clamp-2">${item.desc}</p>
                    <p class="font-black text-orange-600 mt-2">${item.price.toFixed(2)}€</p>
                </div>
            </div>`).join('');
            
        const shopHtml = MOCK_DATA.shop.map(item => `
            <div class="flex gap-4 bg-blue-50 rounded-xl p-4 border border-blue-100 shrink-0 w-64">
                <div>
                    <h4 class="font-bold text-blue-900 text-sm">${item.name}</h4>
                    <p class="font-black text-blue-600 mt-2">${item.price.toFixed(2)}€</p>
                </div>
            </div>`).join('');

        extrasList.innerHTML = `<h3 class="font-bold text-gray-700 mb-2 mt-4"><i class="fas fa-utensils text-orange-500 mr-2"></i>Restaurante</h3>
                                <div class="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">${restHtml}</div>
                                <h3 class="font-bold text-gray-700 mb-2 mt-2"><i class="fas fa-shopping-bag text-blue-500 mr-2"></i>Tienda del Club</h3>
                                <div class="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">${shopHtml}</div>`;
    }
}

// Tab Navigation Logic
function setupTabs() {
    const tabs = document.querySelectorAll('.app-tab');
    const screens = document.querySelectorAll('.app-screen');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const target = tab.getAttribute('data-target');
            
            // Update active states for tabs
            tabs.forEach(t => {
                t.classList.remove('text-blue-600');
                t.classList.add('text-gray-400');
            });
            tab.classList.remove('text-gray-400');
            tab.classList.add('text-blue-600');

            // Show target screen
            screens.forEach(s => {
                s.classList.add('hidden');
                if (s.id === target) s.classList.remove('hidden');
            });
        });
    });
}
