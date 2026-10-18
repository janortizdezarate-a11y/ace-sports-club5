// app.js - Core logic for the Ace Sport Club PWA with i18n and clean solid styling

const SUPABASE_URL = 'https://hdysujzyabenovvnwauf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkeXN1anp5YWJlbm92dm53YXVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzODc3MzQsImV4cCI6MjEwNjk2MzczNH0.WLi7JxM3Ah8Xwv5GemCtArKwDe7tx21NcK9TA2aG7IQ';

let supabaseClient = null;
if (window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// State
let currentUser = null;
let userProfile = null;
let appLang = localStorage.getItem('preferredLang') || 'es';

// Translations for PWA
const APP_TRANSLATIONS = {
    es: {
        app_title: "Ace Sport Club",
        exploring: "Explorando App",
        hello: "Hola",
        free_plan: "Plan Gratuito",
        hours_title: "Horarios de Apertura",
        hours_tag: "Club Abierto",
        hours_mon_fri: "Lunes a Viernes",
        hours_weekends: "Fines de Semana",
        hours_sub: "Tenis, pádel, clases dirigidas y gimnasio.",
        quick_title: "Accesos Rápidos",
        btn_web: "Sitio Web →",
        quick_tennis: "Tenis",
        quick_padel: "Pádel",
        quick_classes: "Clases",
        courts_avail_title: "Pistas Disponibles Hoy",
        rate_note_guest: "Tarifas estándar sin cuota",
        rate_note_member: "Ventajas de abonado aplicadas (0€)",
        classes_today_title: "Actividades Dirigidas de Hoy",
        btn_see_all: "Ver todas",
        tennis_screen_title: "Tenis",
        tennis_book_box_title: "4 Pistas de Tenis",
        tennis_book_box_desc: "Pistas reglamentarias con iluminación LED de alta potencia.",
        tennis_playtomic_btn: "Reservar en Playtomic",
        tennis_school_title: "Escuela de Tenis",
        tennis_school_desc: "Clases individuales y en grupo organizadas por edad y nivel:",
        tennis_lvl_1: "Iniciación (Empuñaduras y golpeo base)",
        tennis_lvl_2: "Intermedio (Control, efectos y posicionamiento)",
        tennis_lvl_3: "Competición (Táctica avanzada y torneos)",
        tennis_comp_title: "Competiciones de Tenis",
        tennis_comp_item1: "Torneos Intraclub: Campeonatos internos bimestrales por categorías.",
        tennis_comp_item2: "Partidos Interclubs: Encuentros amistosos contra clubes colaboradores.",
        tennis_comp_item3: "Ligas Regulares: Ligas por fases con ascensos anuales.",
        tennis_balls_title: "Bolas de Tenis en Recepción",
        padel_screen_title: "Pádel",
        padel_book_box_title: "11 Pistas de Pádel",
        padel_book_box_desc: "Pistas panorámicas de cristal y pistas cubiertas.",
        padel_playtomic_btn: "Reservar en Playtomic",
        padel_school_title: "Escuela de Pádel",
        padel_school_desc: "Clases individuales o grupales con monitores certificados:",
        padel_lvl_1: "Iniciación (Rebotes, empuñaduras y control)",
        padel_lvl_2: "Intermedio (Bandeja, víbora y estrategia en pareja)",
        padel_lvl_3: "Competición (Alta intensidad y juego táctico)",
        padel_comp_title: "Competiciones de Pádel",
        padel_comp_item1: "Americanas de Fin de Semana: Torneos dinámicos con rotación de parejas.",
        padel_comp_item2: "Partidos Abiertos en Playtomic: Encuentros organizados según tu nivelación.",
        padel_comp_item3: "Liga Social de Pádel: Categorías masculina, femenina y mixta.",
        padel_balls_title: "Bolas de Pádel en Recepción",
        classes_screen_title: "Clases & Gimnasio",
        classes_box_title: "Gimnasio y Actividades Dirigidas",
        classes_box_sub: "Lun-Vie: 9:00 - 22:00 | Sáb-Dom: 9:00 - 21:00",
        classes_bookyway_btn: "Reservar en BookyWay",
        classes_prices_note: "Las tarifas se adaptan automáticamente a tu membresía.",
        lang_label: "Idioma de la App",
        account_title: "Mi Cuenta",
        account_sub: "Accede para ver tu abono y disfrutar de reservas a 0€",
        login_heading: "Iniciar Sesión",
        label_email: "Correo Electrónico",
        label_password: "Contraseña",
        btn_submit_login: "Entrar a Mi Cuenta",
        signup_cta_title: "¿Aún no eres miembro?",
        signup_cta_sub: "Comienza con el Plan Gratuito o el abono deportivo que prefieras.",
        signup_cta_btn: "Darse de Alta / Elegir Plan",
        mem_active_title: "Tu Membresía",
        mem_change_title: "Cambiar de Plan",
        mem_change_sub: "Actualiza tu membresía en cualquier momento para disfrutar de ventajas ampliadas.",
        mem_change_btn: "Ver Tarifas de Abonado",
        logout_btn: "Cerrar Sesión",
        tab_home: "Inicio",
        tab_tennis: "Tenis",
        tab_padel: "Pádel",
        tab_classes: "Clases",
        tab_account: "Cuenta",
        restaurant_title: "Restaurante & Cafetería",
        shop_title: "Tienda del Club",
        court_rate_label: "Tarifa por pista:",
        court_rate_free: "0€ (Incluida en tu abono)",
        court_rate_standard: "Tarifa general",
        included_in_plan: "0€ Incluida",
        book_btn: "Reservar",
        join_class_btn: "Plaza"
    },
    en: {
        app_title: "Ace Sport Club",
        exploring: "Exploring App",
        hello: "Hello",
        free_plan: "Free Plan",
        hours_title: "Opening Hours",
        hours_tag: "Club Open",
        hours_mon_fri: "Monday to Friday",
        hours_weekends: "Weekends",
        hours_sub: "Tennis, padel, guided classes and gym.",
        quick_title: "Quick Access",
        btn_web: "Website →",
        quick_tennis: "Tennis",
        quick_padel: "Padel",
        quick_classes: "Classes",
        courts_avail_title: "Courts Available Today",
        rate_note_guest: "Standard rates applied",
        rate_note_member: "Member discounts applied (0€)",
        classes_today_title: "Guided Classes Today",
        btn_see_all: "View all",
        tennis_screen_title: "Tennis",
        tennis_book_box_title: "4 Tennis Courts",
        tennis_book_box_desc: "Regulation courts with high-visibility LED floodlights.",
        tennis_playtomic_btn: "Book on Playtomic",
        tennis_school_title: "Tennis Academy",
        tennis_school_desc: "Individual and group training organized by age and level:",
        tennis_lvl_1: "Initiation (Grip and basic strokes)",
        tennis_lvl_2: "Intermediate (Control, spin and positioning)",
        tennis_lvl_3: "Competition (Match tactics and tournament prep)",
        tennis_comp_title: "Tennis Competitions",
        tennis_comp_item1: "Intraclub Tournaments: Bi-monthly internal events across divisions.",
        tennis_comp_item2: "Interclub Matches: Friendly fixtures against partner clubs.",
        tennis_comp_item3: "Seasonal Leagues: Phased league with annual promotions.",
        tennis_balls_title: "Tennis Balls at Reception",
        padel_screen_title: "Padel",
        padel_book_box_title: "11 Padel Courts",
        padel_book_box_desc: "Panoramic glass courts and covered courts.",
        padel_playtomic_btn: "Book on Playtomic",
        padel_school_title: "Padel Academy",
        padel_school_desc: "Individual and group sessions with certified coaches:",
        padel_lvl_1: "Initiation (Rebounds, grip and basic control)",
        padel_lvl_2: "Intermediate (Bandeja, vibora and partnership tactics)",
        padel_lvl_3: "Competition (High intensity and tactical matchplay)",
        padel_comp_title: "Padel Competitions",
        padel_comp_item1: "Weekend Americanas: Social play with partner rotations.",
        padel_comp_item2: "Playtomic Open Matches: Official level-rated fixtures.",
        padel_comp_item3: "Padel League: Men's, women's and mixed divisions.",
        padel_balls_title: "Padel Balls at Reception",
        classes_screen_title: "Classes & Gym",
        classes_box_title: "Gym & Guided Activities",
        classes_box_sub: "Mon-Fri: 9:00 - 22:00 | Sat-Sun: 9:00 - 21:00",
        classes_bookyway_btn: "Book on BookyWay",
        classes_prices_note: "Rates adjust automatically based on your membership.",
        lang_label: "App Language",
        account_title: "My Account",
        account_sub: "Log in to check your plan and enjoy 0€ court bookings",
        login_heading: "Log In",
        label_email: "Email Address",
        label_password: "Password",
        btn_submit_login: "Log In to My Account",
        signup_cta_title: "Not a member yet?",
        signup_cta_sub: "Start with the Free Plan or choose your preferred sports membership.",
        signup_cta_btn: "Sign Up / Choose Plan",
        mem_active_title: "Your Membership",
        mem_change_title: "Change Plan",
        mem_change_sub: "Upgrade your membership at any time to unlock more club benefits.",
        mem_change_btn: "View Membership Rates",
        logout_btn: "Log Out",
        tab_home: "Home",
        tab_tennis: "Tennis",
        tab_padel: "Padel",
        tab_classes: "Classes",
        tab_account: "Account",
        restaurant_title: "Restaurant & Bar",
        shop_title: "Club Shop",
        court_rate_label: "Court rate:",
        court_rate_free: "0€ (Included in your plan)",
        court_rate_standard: "Standard rate",
        included_in_plan: "0€ Included",
        book_btn: "Book",
        join_class_btn: "Book"
    },
    ca: {
        app_title: "Ace Sport Club",
        exploring: "Explorant l'App",
        hello: "Hola",
        free_plan: "Pla Gratuït",
        hours_title: "Horaris d'Obertura",
        hours_tag: "Club Obert",
        hours_mon_fri: "Dilluns a Divendres",
        hours_weekends: "Caps de Setmana",
        hours_sub: "Tennis, pàdel, classes dirigides i gimnàs.",
        quick_title: "Accessos Ràpids",
        btn_web: "Lloc Web →",
        quick_tennis: "Tennis",
        quick_padel: "Pàdel",
        quick_classes: "Classes",
        courts_avail_title: "Pistes Disponibles Avui",
        rate_note_guest: "Tarifes estàndard aplicades",
        rate_note_member: "Avantatges d'abonat aplicats (0€)",
        classes_today_title: "Activitats Dirigides d'Avui",
        btn_see_all: "Veure totes",
        tennis_screen_title: "Tennis",
        tennis_book_box_title: "4 Pistes de Tennis",
        tennis_book_box_desc: "Pistes reglamentàries amb il·luminació LED d'alta potència.",
        tennis_playtomic_btn: "Reservar a Playtomic",
        tennis_school_title: "Escola de Tennis",
        tennis_school_desc: "Classes individuals i en grup organitzades per edat i nivell:",
        tennis_lvl_1: "Iniciació (Empunyadures i cops bàsics)",
        tennis_lvl_2: "Intermedi (Control, efectes i posicionament)",
        tennis_lvl_3: "Competició (Tàctica avançada i tornejos)",
        tennis_comp_title: "Competicions de Tennis",
        tennis_comp_item1: "Tornejos Intraclub: Campionats interns bimestrals per categories.",
        tennis_comp_item2: "Partits Interclubs: Trobades amistoses contra clubs col·laboradors.",
        tennis_comp_item3: "Lligues Regulars: Lligues per fases amb ascensos anuals.",
        tennis_balls_title: "Pilotes de Tennis a Recepció",
        padel_screen_title: "Pàdel",
        padel_book_box_title: "11 Pistes de Pàdel",
        padel_book_box_desc: "Pistes panoràmiques de vidre i pistes cobertes.",
        padel_playtomic_btn: "Reservar a Playtomic",
        padel_school_title: "Escola de Pàdel",
        padel_school_desc: "Classes individuals o en grup amb monitors titulats:",
        padel_lvl_1: "Iniciació (Rebots, empunyadures i control)",
        padel_lvl_2: "Intermedi (Bandeja, víbora i estratègia en parella)",
        padel_lvl_3: "Competició (Alta intensitat i joc tàctic)",
        padel_comp_title: "Competicions de Pàdel",
        padel_comp_item1: "Americanes de Cap de Setmana: Tornejos dinàmics amb rotació de parelles.",
        padel_comp_item2: "Partits Oberts a Playtomic: Trobades organitzades segons el teu nivell.",
        padel_comp_item3: "Lliga Social de Pàdel: Categories masculina, femenina i mixta.",
        padel_balls_title: "Pilotes de Pàdel a Recepció",
        classes_screen_title: "Classes & Gimnàs",
        classes_box_title: "Gimnàs i Activitats Dirigides",
        classes_box_sub: "Dll-Dv: 9:00 - 22:00 | Ds-Dg: 9:00 - 21:00",
        classes_bookyway_btn: "Reservar a BookyWay",
        classes_prices_note: "Les tarifes s'adapten automàticament a la teva membresia.",
        lang_label: "Idioma de l'App",
        account_title: "El Meu Compte",
        account_sub: "Accedeix per veure el teu abonament i gaudir de reserves a 0€",
        login_heading: "Iniciar Sessió",
        label_email: "Correu Electrònic",
        label_password: "Contrasenya",
        btn_submit_login: "Entrar al Meu Compte",
        signup_cta_title: "Encara no ets membre?",
        signup_cta_sub: "Comença amb el Pla Gratuït o l'abonament esportiu que prefereixis.",
        signup_cta_btn: "Donar-se d'Alta / Triar Pla",
        mem_active_title: "La Teva Membresia",
        mem_change_title: "Canviar de Pla",
        mem_change_sub: "Actualitza la teva membresia en qualsevol moment per gaudir d'avantatges.",
        mem_change_btn: "Veure Tarifes d'Abonat",
        logout_btn: "Tancar Sessió",
        tab_home: "Inici",
        tab_tennis: "Tennis",
        tab_padel: "Pàdel",
        tab_classes: "Classes",
        tab_account: "Compte",
        restaurant_title: "Restaurant & Cafeteria",
        shop_title: "Botiga del Club",
        court_rate_label: "Tarifa per pista:",
        court_rate_free: "0€ (Inclosa al teu abonament)",
        court_rate_standard: "Tarifa general",
        included_in_plan: "0€ Inclosa",
        book_btn: "Reservar",
        join_class_btn: "Plaça"
    }
};

// Data (Class names preserved as registered trademarks/activities)
const MOCK_DATA = {
    courts: [
        { id: 1, type: 'padel', name: 'Pista Pádel Cristal', time: '18:00', duration: '90 min', basePrice: 12, court: 'Pista 3' },
        { id: 2, type: 'padel', name: 'Pista Pádel Panorámica', time: '19:30', duration: '90 min', basePrice: 12, court: 'Pista 7' },
        { id: 3, type: 'padel', name: 'Pista Pádel Cubierta', time: '20:30', duration: '90 min', basePrice: 14, court: 'Pista 1' },
        { id: 4, type: 'tennis', name: 'Pista Tenis Rápida', time: '18:00', duration: '60 min', basePrice: 15, court: 'Pista 1' },
        { id: 5, type: 'tennis', name: 'Pista Tenis Tierra', time: '19:00', duration: '60 min', basePrice: 15, court: 'Pista 2' },
        { id: 6, type: 'tennis', name: 'Pista Tenis Nocturna', time: '20:30', duration: '60 min', basePrice: 16, court: 'Pista 4' },
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
        { id: 1, name: 'Menú Fit Post-Entreno', desc: 'Pechuga a la plancha, arroz integral, aguacate y batido proteico.', price: 14.50 },
        { id: 2, name: 'Ensalada Ace Quinoa', desc: 'Quinoa real, aguacate, canónigos, cherrys y vinagreta cítrica.', price: 9.90 },
        { id: 3, name: 'Bocata de Jamón Ibérico', desc: 'Pan de cristal recién tostado con tomate de rama y aceite AOVE.', price: 6.50 },
        { id: 4, name: 'Smoothie Proteico Antioxidante', desc: 'Frutos rojos, plátano, espinaca baby y proteína isolate.', price: 4.80 }
    ],
    shop: [
        { id: 1, name: 'Bote Bolas Pádel Head Pro S (x3)', price: 6.50, type: 'padel' },
        { id: 2, name: 'Bote Bolas Bullpadel Premium Pro (x3)', price: 7.00, type: 'padel' },
        { id: 3, name: 'Bote Bolas Tenis Dunlop Fort All Court (x3)', price: 7.50, type: 'tennis' },
        { id: 4, name: 'Bote Bolas Tenis Head Tour (x3)', price: 7.20, type: 'tennis' },
        { id: 5, name: 'Pack Overgrips Wilson Pro (x3)', price: 6.95, type: 'general' }
    ]
};

const STANDARD_PRICES = {
    padel_court: 12,
    tennis_court: 15,
    guided_class: 8
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

// ===================== PRICING LOGIC =====================
function calculatePrice(itemType, basePrice) {
    if (!userProfile) return basePrice;
    
    const membership = userProfile.membership_type;
    const status = userProfile.subscription_status;

    if (!membership || membership === 'gratuito' || status !== 'active') {
        return basePrice;
    }

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

function getMembershipName(type) {
    const names = {
        gratuito: 'Plan Gratuito',
        adulto: 'Abonado Adulto',
        padel: 'Abonado Pádel',
        gym: 'Abonado Gym',
        gym_clases: 'Gym + Clases Ilimitadas',
        clases_2horas: 'Clases Dirigidas 2h/sem',
        clases_ilimitado: 'Clases Dirigidas Ilimitadas',
        completo_dirigidas_ilimitadas: 'Completo + Dirigidas'
    };
    return names[type] || 'Plan Gratuito';
}

// ===================== APP LANGUAGE & TEXT APPLICATION =====================
function setupAppLanguage() {
    const select = document.getElementById('app-lang-select');
    if (select) {
        select.value = appLang;
        select.addEventListener('change', (e) => {
            appLang = e.target.value;
            localStorage.setItem('preferredLang', appLang);
            applyAppTranslations();
            renderAppUI(!!currentUser);
        });
    }
    applyAppTranslations();
}

function applyAppTranslations() {
    const t = APP_TRANSLATIONS[appLang] || APP_TRANSLATIONS.es;

    const setTxt = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };

    setTxt('app_hours_title', t.hours_title);
    setTxt('app_hours_tag', t.hours_tag);
    setTxt('app_hours_mon_fri', t.hours_mon_fri);
    setTxt('app_hours_weekends', t.hours_weekends);
    setTxt('app_hours_sub', t.hours_sub);
    setTxt('app_quick_title', t.quick_title);
    setTxt('app_btn_web', t.btn_web);
    setTxt('app_quick_tennis', t.quick_tennis);
    setTxt('app_quick_padel', t.quick_padel);
    setTxt('app_quick_classes', t.quick_classes);
    setTxt('app_courts_avail_title', t.courts_avail_title);
    setTxt('app_classes_today_title', t.classes_today_title);
    setTxt('app_btn_see_all', t.btn_see_all);
    setTxt('app_tennis_screen_title', t.tennis_screen_title);
    setTxt('app_tennis_book_box_title', t.tennis_book_box_title);
    setTxt('app_tennis_book_box_desc', t.tennis_book_box_desc);
    setTxt('app_tennis_playtomic_btn', t.tennis_playtomic_btn);
    setTxt('app_tennis_school_title', t.tennis_school_title);
    setTxt('app_tennis_school_desc', t.tennis_school_desc);
    setTxt('app_tennis_lvl_1', t.tennis_lvl_1);
    setTxt('app_tennis_lvl_2', t.tennis_lvl_2);
    setTxt('app_tennis_lvl_3', t.tennis_lvl_3);
    setTxt('app_tennis_comp_title', t.tennis_comp_title);
    setTxt('app_tennis_comp_item1', t.tennis_comp_item1);
    setTxt('app_tennis_comp_item2', t.tennis_comp_item2);
    setTxt('app_tennis_comp_item3', t.tennis_comp_item3);
    setTxt('app_padel_screen_title', t.padel_screen_title);
    setTxt('app_padel_book_box_title', t.padel_book_box_title);
    setTxt('app_padel_book_box_desc', t.padel_book_box_desc);
    setTxt('app_padel_playtomic_btn', t.padel_playtomic_btn);
    setTxt('app_padel_school_title', t.padel_school_title);
    setTxt('app_padel_school_desc', t.padel_school_desc);
    setTxt('app_padel_lvl_1', t.padel_lvl_1);
    setTxt('app_padel_lvl_2', t.padel_lvl_2);
    setTxt('app_padel_lvl_3', t.padel_lvl_3);
    setTxt('app_padel_comp_title', t.padel_comp_title);
    setTxt('app_padel_comp_item1', t.padel_comp_item1);
    setTxt('app_padel_comp_item2', t.padel_comp_item2);
    setTxt('app_padel_comp_item3', t.padel_comp_item3);
    setTxt('app_classes_screen_title', t.classes_screen_title);
    setTxt('app_classes_box_title', t.classes_box_title);
    setTxt('app_classes_box_sub', t.classes_box_sub);
    setTxt('app_classes_bookyway_btn', t.classes_bookyway_btn);
    setTxt('app_classes_prices_note', t.classes_prices_note);
    setTxt('app_lang_label', t.lang_label);
    setTxt('app_account_title', t.account_title);
    setTxt('app_account_sub', t.account_sub);
    setTxt('app_login_heading', t.login_heading);
    setTxt('app_label_email', t.label_email);
    setTxt('app_label_password', t.label_password);
    setTxt('app_btn_submit_login', t.btn_submit_login);
    setTxt('app_signup_cta_title', t.signup_cta_title);
    setTxt('app_signup_cta_sub', t.signup_cta_sub);
    setTxt('app_signup_cta_btn', t.signup_cta_btn);
    setTxt('app_mem_active_title', t.mem_active_title);
    setTxt('app_mem_change_title', t.mem_change_title);
    setTxt('app_mem_change_sub', t.mem_change_sub);
    setTxt('app_mem_change_btn', t.mem_change_btn);
    setTxt('app_logout_btn', t.logout_btn);
    setTxt('app_tab_home', t.tab_home);
    setTxt('app_tab_tennis', t.tab_tennis);
    setTxt('app_tab_padel', t.tab_padel);
    setTxt('app_tab_classes', t.tab_classes);
    setTxt('app_tab_account', t.tab_account);
}

// ===================== RENDER UI =====================
function renderAppUI(loggedIn) {
    const t = APP_TRANSLATIONS[appLang] || APP_TRANSLATIONS.es;

    renderHeader(loggedIn, t);
    renderCourts(t);
    renderHomeClasses(t);
    renderAllClasses(t);
    renderHomeExtras(t);
    renderTennisScreen(t);
    renderPadelScreen(t);
    renderAccountScreen(loggedIn, t);
}

function renderHeader(loggedIn, t) {
    const title = document.getElementById('headerTitle');
    const badge = document.getElementById('headerBadge');
    const actions = document.getElementById('headerActions');
    const note = document.getElementById('pricePersonalizationNote');
    if (!title) return;

    if (loggedIn && userProfile) {
        const fullName = userProfile.full_name || currentUser.user_metadata?.full_name || 'Usuario';
        const firstName = fullName.split(' ')[0];
        title.textContent = `${t.hello}, ${firstName}`;

        const isFree = !userProfile.membership_type || userProfile.membership_type === 'gratuito';
        if (!isFree && userProfile.subscription_status === 'active') {
            badge.className = 'text-[11px] bg-emerald-700 text-white font-bold px-2.5 py-0.5 rounded-full inline-block';
            badge.textContent = getMembershipName(userProfile.membership_type);
            if (note) note.textContent = t.rate_note_member;
        } else {
            badge.className = 'text-[11px] bg-slate-800 text-slate-300 font-medium px-2.5 py-0.5 rounded-full inline-block';
            badge.textContent = t.free_plan;
            if (note) note.textContent = t.rate_note_guest;
        }
        actions.innerHTML = `
            <button onclick="switchTab('screen-account')" class="text-white hover:text-emerald-400 text-sm p-1.5" title="Mi Cuenta">
                <i class="fas fa-user-circle"></i>
            </button>
            <button onclick="handleLogout()" class="text-slate-300 hover:text-rose-400 text-sm p-1.5" title="Salir">
                <i class="fas fa-sign-out-alt"></i>
            </button>
        `;
    } else {
        title.textContent = t.app_title;
        badge.className = 'text-[11px] bg-slate-800/80 text-slate-200 font-medium px-2.5 py-0.5 rounded-full inline-block';
        badge.textContent = t.exploring;
        if (note) note.textContent = t.rate_note_guest;
        actions.innerHTML = `
            <button onclick="switchTab('screen-account')" class="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm transition">
                Acceder
            </button>
        `;
    }
}

function renderCourts(t) {
    const el = document.getElementById('courtsList');
    if (!el) return;

    el.innerHTML = MOCK_DATA.courts.map(court => {
        const price = calculatePrice(court.type, court.basePrice);
        const isFree = price === 0;
        const sportParam = court.type === 'padel' ? '?sport=PADEL' : '?sport=TENNIS';
        const isPadel = court.type === 'padel';

        return `
        <div class="club-card p-3.5 flex justify-between items-center">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl ${isPadel ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'} flex items-center justify-center text-sm shrink-0">
                    <i class="fas ${isPadel ? 'fa-table-tennis' : 'fa-baseball-ball'}"></i>
                </div>
                <div>
                    <p class="font-bold text-slate-900 text-xs">${court.name} · ${court.court}</p>
                    <p class="text-[11px] text-slate-500">${court.time} (${court.duration})</p>
                </div>
            </div>
            <div class="text-right">
                <p class="text-sm font-extrabold ${isFree ? 'text-emerald-700' : 'text-slate-900'}">
                    ${isFree ? '0€ <span class="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded">Abono</span>' : price + '€'}
                </p>
                <a href="https://playtomic.com/clubs/se-lespiral-manager${sportParam}" target="_blank" class="text-[11px] bg-[#1e3a5f] hover:bg-[#152840] text-white px-3 py-1 rounded-lg mt-1 inline-block font-semibold transition">
                    ${t.book_btn}
                </a>
            </div>
        </div>`;
    }).join('');
}

function renderHomeClasses(t) {
    const el = document.getElementById('homeClassesList');
    if (!el) return;

    el.innerHTML = MOCK_DATA.classes.slice(0, 3).map(cls => {
        const price = calculatePrice('class', cls.basePrice);
        const isFree = price === 0;
        return `
        <div class="club-card p-3 flex justify-between items-center">
            <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs shrink-0">
                    <i class="fas fa-dumbbell"></i>
                </div>
                <div>
                    <p class="font-bold text-slate-900 text-xs">${cls.name}</p>
                    <p class="text-[10px] text-slate-500">${cls.time} · ${cls.sala}</p>
                </div>
            </div>
            <div class="text-right">
                <p class="text-xs font-bold ${isFree ? 'text-emerald-700' : 'text-slate-900'}">
                    ${isFree ? t.included_in_plan : price + '€'}
                </p>
                <a href="https://bookyway.com/en/app-for-bookings/" target="_blank" class="text-[10px] bg-slate-900 text-white px-2.5 py-1 rounded-md mt-0.5 inline-block font-semibold">
                    ${t.join_class_btn}
                </a>
            </div>
        </div>`;
    }).join('');
}

function renderAllClasses(t) {
    const el = document.getElementById('classesList');
    if (!el) return;

    el.innerHTML = MOCK_DATA.classes.map(cls => {
        const price = calculatePrice('class', cls.basePrice);
        const isFree = price === 0;
        return `
        <div class="club-card p-3.5 flex justify-between items-center">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-sm shrink-0">
                    <i class="fas fa-dumbbell"></i>
                </div>
                <div>
                    <p class="font-bold text-slate-900 text-xs">${cls.name}</p>
                    <p class="text-[11px] text-slate-500">${cls.time} (${cls.duration}) · ${cls.sala}</p>
                </div>
            </div>
            <div class="text-right">
                <p class="text-sm font-extrabold ${isFree ? 'text-emerald-700' : 'text-slate-900'}">
                    ${isFree ? '0€ <span class="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded">Abono</span>' : price + '€'}
                </p>
                <a href="https://bookyway.com/en/app-for-bookings/" target="_blank" class="text-[11px] bg-[#1e3a5f] hover:bg-[#152840] text-white px-3 py-1.5 rounded-lg mt-1 inline-block font-semibold transition">
                    ${t.join_class_btn}
                </a>
            </div>
        </div>`;
    }).join('');
}

function renderHomeExtras(t) {
    const el = document.getElementById('homeExtras');
    if (!el) return;

    const restHtml = MOCK_DATA.restaurant.map(item => `
        <div class="club-card p-3.5 shrink-0 w-60">
            <div class="flex justify-between items-start">
                <h4 class="font-bold text-slate-900 text-xs">${item.name}</h4>
                <span class="font-black text-slate-900 text-xs">${item.price.toFixed(2)}€</span>
            </div>
            <p class="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">${item.desc}</p>
        </div>`).join('');

    const shopHtml = MOCK_DATA.shop.map(item => `
        <div class="club-card p-3 shrink-0 w-48">
            <span class="text-[9px] uppercase font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">${item.type}</span>
            <h4 class="font-bold text-slate-900 text-xs mt-1 truncate">${item.name}</h4>
            <p class="font-black text-slate-900 text-xs mt-1">${item.price.toFixed(2)}€</p>
        </div>`).join('');

    el.innerHTML = `
        <div class="pt-2">
            <div class="flex items-center justify-between mb-2 px-1">
                <h3 class="font-bold text-xs uppercase tracking-wider text-slate-500">${t.restaurant_title}</h3>
            </div>
            <div class="flex gap-2.5 overflow-x-auto pb-2 hide-scrollbar">${restHtml}</div>
        </div>

        <div class="pt-3">
            <div class="flex items-center justify-between mb-2 px-1">
                <h3 class="font-bold text-xs uppercase tracking-wider text-slate-500">${t.shop_title}</h3>
            </div>
            <div class="flex gap-2.5 overflow-x-auto pb-2 hide-scrollbar">${shopHtml}</div>
        </div>`;
}

function renderTennisScreen(t) {
    const priceTag = document.getElementById('tennisPriceTag');
    if (priceTag) {
        const price = calculatePrice('tennis', STANDARD_PRICES.tennis_court);
        const isFree = price === 0;
        priceTag.innerHTML = `
            <div class="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3 flex justify-between items-center text-xs">
                <span class="text-slate-300">${t.court_rate_label}</span>
                <span class="font-extrabold text-sm ${isFree ? 'text-emerald-400' : 'text-white'}">
                    ${isFree ? t.court_rate_free : price + '€ / 60min'}
                </span>
            </div>`;
    }

    const ballsEl = document.getElementById('tennisBalls');
    if (ballsEl) {
        const tennisBalls = MOCK_DATA.shop.filter(i => i.type === 'tennis');
        ballsEl.innerHTML = `
            <h3 class="font-bold text-sm text-slate-900 mb-2">${t.tennis_balls_title}</h3>
            <div class="space-y-2 text-xs">
                ${tennisBalls.map(b => `
                    <div class="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                        <span class="font-medium text-slate-800">${b.name}</span>
                        <span class="font-bold text-slate-900">${b.price.toFixed(2)}€</span>
                    </div>
                `).join('')}
            </div>`;
    }
}

function renderPadelScreen(t) {
    const priceTag = document.getElementById('padelPriceTag');
    if (priceTag) {
        const price = calculatePrice('padel', STANDARD_PRICES.padel_court);
        const isFree = price === 0;
        priceTag.innerHTML = `
            <div class="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3 flex justify-between items-center text-xs">
                <span class="text-slate-300">${t.court_rate_label}</span>
                <span class="font-extrabold text-sm ${isFree ? 'text-emerald-400' : 'text-white'}">
                    ${isFree ? t.court_rate_free : price + '€ / 90min'}
                </span>
            </div>`;
    }

    const ballsEl = document.getElementById('padelBalls');
    if (ballsEl) {
        const padelBalls = MOCK_DATA.shop.filter(i => i.type === 'padel');
        ballsEl.innerHTML = `
            <h3 class="font-bold text-sm text-slate-900 mb-2">${t.padel_balls_title}</h3>
            <div class="space-y-2 text-xs">
                ${padelBalls.map(b => `
                    <div class="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                        <span class="font-medium text-slate-800">${b.name}</span>
                        <span class="font-bold text-slate-900">${b.price.toFixed(2)}€</span>
                    </div>
                `).join('')}
            </div>`;
    }
}

function renderAccountScreen(loggedIn, t) {
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
            ? 'bg-slate-800 text-slate-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider'
            : 'bg-emerald-700 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider';

        const detailEl = document.getElementById('accountSubDetail');
        if (!isFree) {
            detailEl.innerHTML = `
                <div class="flex items-center gap-2 mb-1.5">
                    <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <strong class="text-emerald-900 font-bold">${mLabel}</strong>
                </div>
                <p class="text-slate-600 leading-relaxed">Tu tarifa incluye reservas a <strong>0€</strong> en las disciplinas contratadas. Al realizar tu reserva en Playtomic o BookyWay se aplican tus ventajas de socio.</p>
            `;
        } else {
            detailEl.innerHTML = `
                <div class="flex items-center gap-2 mb-1.5">
                    <span class="w-2 h-2 rounded-full bg-slate-400"></span>
                    <strong class="text-slate-700 font-bold">${t.free_plan}</strong>
                </div>
                <p class="text-slate-600 leading-relaxed">Estás registrado con acceso general. Puedes reservar pistas con tarifa estándar o contratar un abono de socio para disfrutar de ventajas completas.</p>
            `;
        }
    } else {
        outView.classList.remove('hidden');
        inView.classList.add('hidden');
    }
}

// ===================== FORM HANDLER =====================
function setupAccountUI() {
    const form = document.getElementById('appLoginForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const btn = document.getElementById('loginBtn');
        const err = document.getElementById('loginError');

        btn.disabled = true;
        err.classList.add('hidden');

        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
            if (error) {
                err.textContent = error.message.includes('Invalid') ? 'Credenciales incorrectas.' : error.message;
                err.classList.remove('hidden');
                btn.disabled = false;
            } else {
                currentUser = data.user;
                await fetchProfile();
                renderAppUI(true);
                btn.disabled = false;
            }
        } catch (e) {
            err.textContent = 'Error de conexión con el servidor.';
            err.classList.remove('hidden');
            btn.disabled = false;
        }
    });
}

// ===================== TAB NAV =====================
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

function updateTabHighlight(activeTarget) {
    document.querySelectorAll('.app-tab').forEach(t => {
        if (t.getAttribute('data-target') === activeTarget) {
            t.classList.remove('text-slate-400');
            t.classList.add('text-[#1e3a5f]');
        } else {
            t.classList.remove('text-[#1e3a5f]');
            t.classList.add('text-slate-400');
        }
    });
}
