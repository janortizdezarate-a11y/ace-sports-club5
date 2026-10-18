// script.js - Translations, timetable, cookie consent and site logic

const translations = {
    en: {
        nav_home: "Home",
        nav_facilities: "Facilities",
        nav_hours: "Opening Hours",
        nav_tennis: "Tennis",
        nav_padel: "Padel",
        nav_classes: "Classes",
        nav_memberships: "Memberships",
        nav_contact: "Contact",
        nav_app_btn: "Open App",
        hero_title: "Ace Sport Club",
        hero_subtitle: "Tennis, padel, fitness and guided classes in Pallejà.",
        hero_btn_explore: "Explore Facilities",
        hero_btn_app: "Open / Install App",
        facilities_title: "Facilities",
        fac_padel_title: "11 Padel Courts",
        fac_padel_desc: "Panoramic and covered courts with premium synthetic turf.",
        fac_tennis_title: "4 Tennis Courts",
        fac_tennis_desc: "Regulation courts with high-power LED lighting.",
        fac_gym_title: "Equipped Gym",
        fac_gym_desc: "Strength training and cardio equipment for all fitness levels.",
        fac_pool_title: "Outdoor Pool",
        fac_pool_desc: "Seasonal outdoor swimming pool and sunbathing area.",
        fac_classes_title: "2 Indoor Studios",
        fac_classes_desc: "Studios for guided activities, strength and mobility training.",
        fac_restaurant_title: "Restaurant & Locker Rooms",
        fac_restaurant_desc: "Healthy food, recovery meals, bar and full changing rooms.",
        hours_title: "Opening Hours",
        hours_subtitle: "Applicable to tennis and padel courts, guided classes, and gym.",
        hours_weekdays_title: "Monday to Friday",
        hours_weekdays_time: "9:00 - 22:00",
        hours_weekdays_sub: "Tennis, Padel, Gym and Guided Classes",
        hours_weekends_title: "Weekends and Holidays",
        hours_weekends_time: "9:00 - 21:00",
        hours_weekends_sub: "Saturdays, Sundays and Holidays",
        hours_restaurant_note: "* Restaurant and cafeteria have independent schedules.",
        tennis_title: "Tennis",
        tennis_desc: "Four tournament-grade courts, tennis academy, and seasonal leagues.",
        tennis_courts_badge: "Facilities",
        tennis_courts_title: "4 Tennis Courts",
        tennis_courts_desc: "Well-maintained courts with high-visibility lighting for day and night matches.",
        tennis_courts_hours: "Mon-Fri: 9:00-22:00 | Sat-Sun: 9:00-21:00",
        tennis_book_btn: "Book on Playtomic",
        tennis_school_badge: "Academy",
        tennis_school_title: "Tennis Academy",
        tennis_school_desc: "Individual and group sessions tailored by age group and skill level:",
        tennis_level_init: "Initiation (Grip, fundamentals and basic ball control)",
        tennis_level_inter: "Intermediate (Consistency, spin, court positioning and pace)",
        tennis_level_comp: "Competition (Match strategy, physical conditioning and tournaments)",
        tennis_competitions_badge: "Competition",
        tennis_competitions_title: "Tournaments & Leagues",
        tennis_competitions_desc: "Compete throughout the season in club tournaments and official events:",
        tennis_comp_1: "Intraclub Tournaments: Bi-monthly internal events across divisions.",
        tennis_comp_2: "Interclub Matches: Friendly and official fixtures against partner clubs.",
        tennis_comp_3: "Seasonal League: Ongoing ranking system with promotion and relegation.",
        padel_title: "Padel",
        padel_desc: "11 glass padel courts, specialized academy, and open social events.",
        padel_courts_badge: "Facilities",
        padel_courts_title: "11 Padel Courts",
        padel_courts_desc: "High-standard panoramic and covered glass courts with glare-free LED floodlights.",
        padel_courts_hours: "Mon-Fri: 9:00-22:00 | Sat-Sun: 9:00-21:00",
        padel_book_btn: "Book on Playtomic",
        padel_school_badge: "Academy",
        padel_school_title: "Padel Academy",
        padel_school_desc: "Training with qualified instructors grouped by age and level:",
        padel_level_init: "Initiation (Wall rebounds, grip techniques and court positioning)",
        padel_level_inter: "Intermediate (Bandeja, vibora, volleys and tactical partnership)",
        padel_level_comp: "Competition (High intensity drills, match play and open tournaments)",
        padel_competitions_badge: "Competition",
        padel_competitions_title: "Leagues & Tournaments",
        padel_competitions_desc: "Active competition calendar for all member skill tiers:",
        padel_comp_1: "Weekend Americanas: Fast-paced social tournament play with partner rotations.",
        padel_comp_2: "Playtomic Open Matches: Join level-rated matches with community players.",
        padel_comp_3: "Club Padel League: Men's, women's and mixed team divisions across the year.",
        tt_title: "Guided Classes Timetable",
        tt_subtitle: "Check the weekly activity schedule in Studio 1 and Studio 2.",
        tt_book_btn: "Book on BookyWay",
        mem_title: "Memberships & Plans",
        mem_subtitle: "Choose the membership option that best suits your routine.",
        mem_adult_title: "Adult Membership",
        mem_adult_desc: "Full club access. Includes children under 8. From 14 years old.",
        mem_padel_title: "Padel Membership",
        mem_padel_desc: "Full padel access for members 14 and over.",
        mem_gym_title: "Gym Membership",
        mem_gym_desc: "Strength and cardio gym access from 14 years old.",
        mem_gymclass_title: "Gym + Unlimited Classes",
        mem_gymclass_desc: "Full gym access plus all weekly guided fitness classes.",
        mem_class2h_title: "Guided Classes (2h/week)",
        mem_class2h_desc: "Two weekly guided class hours in Studio 1 or Studio 2.",
        mem_classunlim_title: "Unlimited Guided Classes",
        mem_classunlim_desc: "Unlimited access to all scheduled studio classes.",
        mem_complete_title: "Full + Unlimited Classes",
        mem_complete_desc: "All-inclusive membership: tennis, padel, gym, pool and all studio classes.",
        mem_family_title: "Family Membership",
        mem_family_price: "from 94€/month",
        mem_note1_bold: "Registration fee:",
        mem_note1: "Equal to two monthly fees of the selected plan (except Free Plan).",
        mem_note2: "Children under 8 are registered on the membership roster at no extra fee.",
        mem_note3: "Unlimited guided classes carry an additional 15 € per family member.",
        mem_cta: "Open App & Join",
        contact_title: "Contact & Location",
        contact_address_label: "Address",
        contact_phone_label: "Phone",
        footer_rights: "All rights reserved.",
        footer_privacy: "Privacy Policy",
        footer_terms: "Terms & Conditions",
        cookie_text: "We use essential cookies and local storage to save your language and app session preferences.",
        cookie_accept: "Accept",
        cookie_settings: "Learn More",
        day_0: "Monday", day_1: "Tuesday", day_2: "Wednesday", day_3: "Thursday", day_4: "Friday", day_5: "Saturday"
    },
    es: {
        nav_home: "Inicio",
        nav_facilities: "Instalaciones",
        nav_hours: "Horarios",
        nav_tennis: "Tenis",
        nav_padel: "Pádel",
        nav_classes: "Clases",
        nav_memberships: "Abonos",
        nav_contact: "Contacto",
        nav_app_btn: "Instalar App",
        hero_title: "Ace Sport Club",
        hero_subtitle: "Tenis, pádel, fitness y actividades dirigidas en Pallejà.",
        hero_btn_explore: "Explorar Instalaciones",
        hero_btn_app: "Abrir / Instalar App",
        facilities_title: "Instalaciones",
        fac_padel_title: "11 Pistas de Pádel",
        fac_padel_desc: "Pistas panorámicas y cubiertas con césped sintético de alta gama.",
        fac_tennis_title: "4 Pistas de Tenis",
        fac_tennis_desc: "Pistas reglamentarias con iluminación LED de alta potencia.",
        fac_gym_title: "Gimnasio Equipado",
        fac_gym_desc: "Zona cardiovascular y de musculación completa para todos los niveles.",
        fac_pool_title: "Piscina Exterior",
        fac_pool_desc: "Piscina al aire libre con solárium de temporada.",
        fac_classes_title: "2 Salas Interiores",
        fac_classes_desc: "Salas para actividades dirigidas, entrenamiento funcional y movilidad.",
        fac_restaurant_title: "Restaurante y Vestuarios",
        fac_restaurant_desc: "Menú saludable, comida post-entreno, cafetería y vestuarios completos.",
        hours_title: "Horarios de Apertura",
        hours_subtitle: "Aplicables a pistas de tenis y pádel, clases dirigidas y gimnasio.",
        hours_weekdays_title: "Lunes a Viernes",
        hours_weekdays_time: "9:00 - 22:00",
        hours_weekdays_sub: "Tenis, Pádel, Gimnasio y Clases Dirigidas",
        hours_weekends_title: "Fines de Semana y Festivos",
        hours_weekends_time: "9:00 - 21:00",
        hours_weekends_sub: "Sábados, Domingos y Días Festivos",
        hours_restaurant_note: "* El restaurante y la cafetería disponen de horario propio independiente.",
        tennis_title: "Tenis",
        tennis_desc: "Cuatro pistas de tenis, escuela formativa para todas las edades y ligas oficiales.",
        tennis_courts_badge: "Instalación",
        tennis_courts_title: "4 Pistas de Tenis",
        tennis_courts_desc: "Superficie cuidada con iluminación uniforme para partidos diurnos y nocturnos.",
        tennis_courts_hours: "Lun-Vie: 9:00-22:00 | Sáb-Dom: 9:00-21:00",
        tennis_book_btn: "Reserva en Playtomic",
        tennis_school_badge: "Escuela",
        tennis_school_title: "Escuela de Tenis",
        tennis_school_desc: "Entrenamientos individuales y grupales según franja de edad y nivel técnico:",
        tennis_level_init: "Iniciación (Empuñaduras, golpeo base y control de pelota)",
        tennis_level_inter: "Intermedio (Consistencia, efectos, posicionamiento y ritmo)",
        tennis_level_comp: "Competición (Estrategia táctica, preparación física y torneos)",
        tennis_competitions_badge: "Competición",
        tennis_competitions_title: "Torneos y Ligas",
        tennis_competitions_desc: "Participa a lo largo de la temporada en el calendario competitivo del club:",
        tennis_comp_1: "Torneos Intraclub: Competiciones internas bimestrales por categorías.",
        tennis_comp_2: "Partidos Interclubs: Encuentros y jornadas deportivas contra otros clubes.",
        tennis_comp_3: "Liga Regular: Sistema de liga anual con fases de ascenso y descenso.",
        padel_title: "Pádel",
        padel_desc: "11 pistas de cristal, escuela especializada y torneos sociales continuos.",
        padel_courts_badge: "Instalación",
        padel_courts_title: "11 Pistas de Pádel",
        padel_courts_desc: "Pistas panorámicas y cubiertas con focos LED antideslumbrantes.",
        padel_courts_hours: "Lun-Vie: 9:00-22:00 | Sáb-Dom: 9:00-21:00",
        padel_book_btn: "Reserva en Playtomic",
        padel_school_badge: "Escuela",
        padel_school_title: "Escuela de Pádel",
        padel_school_desc: "Formación con técnicos titulados estructurada por edades y nivel:",
        padel_level_init: "Iniciación (Paredes, empuñaduras, posición y control del punto)",
        padel_level_inter: "Intermedio (Bandeja, víbora, volea y estrategia en pareja)",
        padel_level_comp: "Competición (Alta intensidad, ritmo de juego y torneos oficiales)",
        padel_competitions_badge: "Competición",
        padel_competitions_title: "Ligas y Torneos",
        padel_competitions_desc: "Calendario competitivo activo para todos los niveles de socios:",
        padel_comp_1: "Americanas de Fin de Semana: Torneos dinámicos con rotación de parejas.",
        padel_comp_2: "Partidos Abiertos en Playtomic: Encuentros nivelados por nivelación oficial.",
        padel_comp_3: "Liga Social de Pádel: Categorías masculina, femenina y mixta durante el curso.",
        tt_title: "Horario de Clases Dirigidas",
        tt_subtitle: "Consulta la programación semanal en Sala 1 y Sala 2.",
        tt_book_btn: "Reservar en BookyWay",
        mem_title: "Abonos y Tarifas",
        mem_subtitle: "Elige la modalidad que mejor encaja con tus objetivos deportivos.",
        mem_adult_title: "Abonado Adulto",
        mem_adult_desc: "Acceso completo. Incluye menores de 8 años. A partir de 14 años.",
        mem_padel_title: "Abonado Pádel",
        mem_padel_desc: "Acceso completo a pádel para mayores de 14 años.",
        mem_gym_title: "Abonado Gym",
        mem_gym_desc: "Acceso a sala de musculación y cardio a partir de 14 años.",
        mem_gymclass_title: "Gym + Clases Ilimitadas",
        mem_gymclass_desc: "Gimnasio y todas las clases dirigidas semanales sin límite.",
        mem_class2h_title: "Clases Dirigidas (2h/sem)",
        mem_class2h_desc: "Dos horas semanales de clases dirigidas en Sala 1 o Sala 2.",
        mem_classunlim_title: "Clases Dirigidas Ilimitadas",
        mem_classunlim_desc: "Acceso ilimitado a todas las actividades dirigidas.",
        mem_complete_title: "Completo + Dirigidas Ilimitadas",
        mem_complete_desc: "Todo incluido: tenis, pádel, gimnasio, piscina y todas las clases dirigidas.",
        mem_family_title: "Abonado Familiar",
        mem_family_price: "desde 94€/mes",
        mem_note1_bold: "Matrícula:",
        mem_note1: "Equivalente a dos mensualidades de la cuota elegida (excepto Plan Gratuito).",
        mem_note2: "Los niños menores de 8 años quedan incluidos en el fichero sin cuota adicional.",
        mem_note3: "Las clases dirigidas ilimitadas tienen un suplemento de 15 € por miembro de familia.",
        mem_cta: "Abrir App y Abonarse",
        contact_title: "Contacto y Ubicación",
        contact_address_label: "Dirección",
        contact_phone_label: "Teléfono",
        footer_rights: "Todos los derechos reservados.",
        footer_privacy: "Política de Privacidad",
        footer_terms: "Términos y Condiciones",
        cookie_text: "Utilizamos cookies técnicas y almacenamiento local para recordar tu idioma y preferencias en la app.",
        cookie_accept: "Aceptar",
        cookie_settings: "Más Información",
        day_0: "Lunes", day_1: "Martes", day_2: "Miércoles", day_3: "Jueves", day_4: "Viernes", day_5: "Sábado"
    },
    ca: {
        nav_home: "Inici",
        nav_facilities: "Instal·lacions",
        nav_hours: "Horaris",
        nav_tennis: "Tennis",
        nav_padel: "Pàdel",
        nav_classes: "Classes",
        nav_memberships: "Abonaments",
        nav_contact: "Contacte",
        nav_app_btn: "Instal·lar App",
        hero_title: "Ace Sport Club",
        hero_subtitle: "Tennis, pàdel, fitness i activitats dirigides a Pallejà.",
        hero_btn_explore: "Explorar Instal·lacions",
        hero_btn_app: "Obrir / Instal·lar App",
        facilities_title: "Instal·lacions",
        fac_padel_title: "11 Pistes de Pàdel",
        fac_padel_desc: "Pistes panoràmiques i cobertes amb gespa sintètica d'alta gamma.",
        fac_tennis_title: "4 Pistes de Tennis",
        fac_tennis_desc: "Pistes reglamentàries amb il·luminació LED d'alta potència.",
        fac_gym_title: "Gimnàs Equipat",
        fac_gym_desc: "Zona cardiovascular i de musculació completa per a tots els nivells.",
        fac_pool_title: "Piscina Exterior",
        fac_pool_desc: "Piscina a l'aire lliure amb solàrium de temporada.",
        fac_classes_title: "2 Sales Interiors",
        fac_classes_desc: "Sales per a activitats dirigides, entrenament funcional i mobilitat.",
        fac_restaurant_title: "Restaurant i Vestidors",
        fac_restaurant_desc: "Menú saludable, àpat post-entrenament, cafeteria i vestidors complets.",
        hours_title: "Horaris d'Obertura",
        hours_subtitle: "Aplicables a pistes de tennis i pàdel, classes dirigides i gimnàs.",
        hours_weekdays_title: "Dilluns a Divendres",
        hours_weekdays_time: "9:00 - 22:00",
        hours_weekdays_sub: "Tennis, Pàdel, Gimnàs i Classes Dirigides",
        hours_weekends_title: "Caps de Setmana i Festius",
        hours_weekends_time: "9:00 - 21:00",
        hours_weekends_sub: "Dissabtes, Diumenges i Dies Festius",
        hours_restaurant_note: "* El restaurant i la cafeteria disposen d'horari propi independent.",
        tennis_title: "Tennis",
        tennis_desc: "Quatre pistes de tennis, escola formativa per a totes les edats i lligues oficials.",
        tennis_courts_badge: "Instal·lació",
        tennis_courts_title: "4 Pistes de Tennis",
        tennis_courts_desc: "Superfície cuidada amb il·luminació uniforme per a partits diürns i nocturns.",
        tennis_courts_hours: "Dll-Dv: 9:00-22:00 | Ds-Dg: 9:00-21:00",
        tennis_book_btn: "Reserva a Playtomic",
        tennis_school_badge: "Escola",
        tennis_school_title: "Escola de Tennis",
        tennis_school_desc: "Entrenaments individuals i en grup segons franja d'edat i nivell tècnic:",
        tennis_level_init: "Iniciació (Empunyadures, cops bàsics i control de pilota)",
        tennis_level_inter: "Intermedi (Consistència, efectes, posicionament i ritme)",
        tennis_level_comp: "Competició (Estratègia tàctica, preparació física i tornejos)",
        tennis_competitions_badge: "Competició",
        tennis_competitions_title: "Tornejos i Lligues",
        tennis_competitions_desc: "Participa al llarg de la temporada en el calendari competitiu del club:",
        tennis_comp_1: "Tornejos Intraclub: Competicions internes bimestrals per categories.",
        tennis_comp_2: "Partits Interclubs: Trobades i jornades esportives contra altres clubs.",
        tennis_comp_3: "Lliga Regular: Sistema de lliga anual amb fases d'ascens i descens.",
        padel_title: "Pàdel",
        padel_desc: "11 pistes de vidre, escola especialitzada i tornejos socials continus.",
        padel_courts_badge: "Instal·lació",
        padel_courts_title: "11 Pistes de Pàdel",
        padel_courts_desc: "Pistes panoràmiques i cobertes amb focus LED antireflexos.",
        padel_courts_hours: "Dll-Dv: 9:00-22:00 | Ds-Dg: 9:00-21:00",
        padel_book_btn: "Reserva a Playtomic",
        padel_school_badge: "Escola",
        padel_school_title: "Escola de Pàdel",
        padel_school_desc: "Formació amb tècnics titulats estructurada per edats i nivell:",
        padel_level_init: "Iniciació (Parets, empunyadures, posició i control del punt)",
        padel_level_inter: "Intermedi (Bandeges, víbores, volees i estratègia en parella)",
        padel_level_comp: "Competició (Alta intensitat, ritme de joc i tornejos oficials)",
        padel_competitions_badge: "Competició",
        padel_competitions_title: "Lligues i Tornejos",
        padel_competitions_desc: "Calendari competitiu actiu per a tots els nivells de socis:",
        padel_comp_1: "Americanes de Cap de Setmana: Tornejos dinàmics amb rotació de parelles.",
        padel_comp_2: "Partits Oberts a Playtomic: Trobades anivellades per nivell oficial.",
        padel_comp_3: "Lliga Social de Pàdel: Categories masculina, femenina i mixta durant el curs.",
        tt_title: "Horari de Classes Dirigides",
        tt_subtitle: "Consulta la programació setmanal a la Sala 1 i Sala 2.",
        tt_book_btn: "Reservar a BookyWay",
        mem_title: "Abonaments i Tarifes",
        mem_subtitle: "Tria la modalitat que millor encaixa amb els teus objectius esportius.",
        mem_adult_title: "Abonat Adult",
        mem_adult_desc: "Accés complet. Inclou menors de 8 anys. A partir de 14 anys.",
        mem_padel_title: "Abonat Pàdel",
        mem_padel_desc: "Accés complet a pàdel per a majors de 14 anys.",
        mem_gym_title: "Abonat Gym",
        mem_gym_desc: "Accés a sala de musculació i càrdio a partir de 14 anys.",
        mem_gymclass_title: "Gym + Classes Il·limitades",
        mem_gymclass_desc: "Gimnàs i totes les classes dirigides setmanals sense límit.",
        mem_class2h_title: "Classes Dirigides (2h/set)",
        mem_class2h_desc: "Dues hores setmanals de classes dirigides a la Sala 1 o Sala 2.",
        mem_classunlim_title: "Classes Dirigides Il·limitades",
        mem_classunlim_desc: "Accés il·limitat a totes les activitats dirigides.",
        mem_complete_title: "Complet + Dirigides Il·limitades",
        mem_complete_desc: "Tot inclòs: tennis, pàdel, gimnàs, piscina i totes les classes dirigides.",
        mem_family_title: "Abonat Familiar",
        mem_family_price: "des de 94€/mes",
        mem_note1_bold: "Matrícula:",
        mem_note1: "Equivalent a dues mensualitats de la quota triada (excepte Pla Gratuït).",
        mem_note2: "Els nens menors de 8 anys queden inclosos al fitxer sense quota addicional.",
        mem_note3: "Les classes dirigides il·limitades tenen un suplement de 15 € per membre de família.",
        mem_cta: "Obrir App i Abonar-se",
        contact_title: "Contacte i Ubicació",
        contact_address_label: "Adreça",
        contact_phone_label: "Telèfon",
        footer_rights: "Tots els drets reservats.",
        footer_privacy: "Política de Privacitat",
        footer_terms: "Termes i Condicions",
        cookie_text: "Utilitzem cookies tècniques i emmagatzematge local per recordar el teu idioma i preferències a l'app.",
        cookie_accept: "Acceptar",
        cookie_settings: "Més Informació",
        day_0: "Dilluns", day_1: "Dimarts", day_2: "Dimecres", day_3: "Dijous", day_4: "Divendres", day_5: "Dissabte"
    }
};

// PRESERVED CLASS NAMES: Standard registered activities are NOT translated
const timetableData = {
    sala1: [
        // Monday (0)
        [{start: '07:30', end: '08:30', name: 'Barre'},
         {start: '09:15', end: '10:15', name: 'Cross Training'},
         {start: '17:30', end: '18:30', name: 'Cross Training'},
         {start: '19:10', end: '20:00', name: 'Toning'}],
        // Tuesday (1)
        [{start: '07:30', end: '08:30', name: 'Cross Training'},
         {start: '09:15', end: '10:10', name: 'Barre'},
         {start: '10:10', end: '11:00', name: 'Toning'},
         {start: '15:30', end: '16:30', name: 'Barre'},
         {start: '17:00', end: '18:00', name: 'Cross Training Kids'},
         {start: '18:10', end: '19:00', name: 'Pilates'},
         {start: '20:00', end: '21:00', name: 'Cross Training'}],
        // Wednesday (2)
        [{start: '09:15', end: '10:10', name: 'Cross Training'},
         {start: '15:30', end: '16:30', name: 'Cross Training'},
         {start: '17:30', end: '18:30', name: 'Barre'},
         {start: '19:10', end: '20:00', name: 'Toning'},
         {start: '20:15', end: '21:15', name: 'Cross Training'}],
        // Thursday (3)
        [{start: '07:30', end: '08:30', name: 'Cross Training'},
         {start: '10:10', end: '11:00', name: 'Pilates'},
         {start: '15:30', end: '16:30', name: 'Barre'},
         {start: '17:30', end: '18:30', name: 'Cross Training Kids'},
         {start: '18:10', end: '19:00', name: 'GAP / Pilates'},
         {start: '19:15', end: '20:15', name: 'Cross Training'}],
        // Friday (4)
        [{start: '07:30', end: '08:30', name: 'Barre'},
         {start: '09:15', end: '10:15', name: 'Cross Training'},
         {start: '15:30', end: '16:30', name: 'Cross Training'},
         {start: '17:10', end: '18:00', name: 'HIIT / Stretching'},
         {start: '20:15', end: '21:15', name: 'Cross Training'}],
        // Saturday (5)
        [{start: '09:15', end: '10:15', name: 'Cross Training'}]
    ],
    sala2: [
        // Monday (0)
        [{start: '15:30', end: '16:30', name: 'Jumping'},
         {start: '17:30', end: '18:30', name: 'Yoga Kids'},
         {start: '18:45', end: '19:45', name: 'Yoga / Meditation'}],
        // Tuesday (1)
        [{start: '11:00', end: '12:00', name: 'Taekwondo Adults'},
         {start: '17:15', end: '18:15', name: 'Taekwondo Kids'},
         {start: '20:00', end: '21:00', name: 'Taekwondo Adults'}],
        // Wednesday (2)
        [{start: '15:30', end: '16:30', name: 'Jumping'},
         {start: '17:30', end: '18:30', name: 'Yoga Kids'},
         {start: '18:45', end: '19:45', name: 'Hatha Yoga'}],
        // Thursday (3)
        [{start: '11:00', end: '12:00', name: 'Taekwondo Adults'},
         {start: '17:15', end: '18:15', name: 'Taekwondo Kids'},
         {start: '19:00', end: '20:00', name: 'Body Combat'},
         {start: '20:00', end: '21:00', name: 'Taekwondo Adults'}],
        // Friday (4)
        [{start: '15:30', end: '16:30', name: 'Jumping'},
         {start: '17:30', end: '18:30', name: 'GAP'},
         {start: '18:30', end: '19:30', name: 'Pilates Funcional'}],
        // Saturday (5)
        [{start: '10:00', end: '11:00', name: 'Hatha Yoga'}]
    ]
};

let currentLang = 'es';
let currentRoom = 'sala1';

function renderTimetable() {
    const container = document.getElementById('timetable-schedule');
    if (!container) return;

    const days = [0, 1, 2, 3, 4, 5];
    const data = timetableData[currentRoom];

    let html = `
        <div class="grid grid-cols-6 border-b border-slate-200 bg-slate-50 text-slate-700 font-bold text-xs">
            ${days.map(d => `<div class="p-3 text-center border-r last:border-r-0 border-slate-200 uppercase tracking-wider">${translations[currentLang]['day_' + d]}</div>`).join('')}
        </div>
        <div class="grid grid-cols-6 divide-x divide-slate-100 min-h-[360px] bg-white">
    `;

    days.forEach(d => {
        const classes = data[d] || [];
        html += `<div class="p-2 space-y-2">`;
        classes.forEach(c => {
            html += `
                <div class="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 transition">
                    <span class="text-[10px] font-bold text-slate-400 block">${c.start} - ${c.end}</span>
                    <span class="text-xs font-bold text-slate-800 block mt-0.5">${c.name}</span>
                </div>
            `;
        });
        if (classes.length === 0) {
            html += `<div class="text-[11px] text-slate-300 text-center py-8">-</div>`;
        }
        html += `</div>`;
    });

    html += `</div>`;
    container.innerHTML = html;
}

// Cookie Consent Logic
function initCookieConsent() {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (hasConsent) return;

    const banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.className = 'fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-slate-900 text-white p-5 rounded-2xl shadow-2xl z-50 border border-slate-800 text-xs';
    banner.innerHTML = `
        <div class="flex items-start gap-3">
            <i class="fas fa-cookie-bite text-emerald-400 text-lg mt-0.5"></i>
            <div>
                <p class="leading-relaxed text-slate-200" data-i18n="cookie_text">
                    ${translations[currentLang].cookie_text}
                </p>
                <div class="mt-3 flex items-center gap-2">
                    <button id="acceptCookieBtn" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl transition">
                        ${translations[currentLang].cookie_accept}
                    </button>
                    <a href="privacy.html" class="text-slate-400 hover:text-white underline text-xs ml-2">
                        ${translations[currentLang].cookie_settings}
                    </a>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(banner);

    document.getElementById('acceptCookieBtn').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.remove();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Language Setup
    const langSelect = document.getElementById('language-select');
    const langSelectMobile = document.getElementById('language-select-mobile');
    const translatableElements = document.querySelectorAll('[data-i18n]');

    function setLanguage(lang) {
        if (!translations[lang]) return;
        currentLang = lang;

        translatableElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        if (langSelect) langSelect.value = lang;
        if (langSelectMobile) langSelectMobile.value = lang;
        localStorage.setItem('preferredLang', lang);
        document.documentElement.lang = lang;

        renderTimetable();
    }

    const savedLang = localStorage.getItem('preferredLang') || 'es';
    setLanguage(savedLang);

    if (langSelect) langSelect.addEventListener('change', (e) => setLanguage(e.target.value));
    if (langSelectMobile) langSelectMobile.addEventListener('change', (e) => setLanguage(e.target.value));

    // Mobile menu toggle
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.addEventListener('click', () => menu.classList.toggle('hidden'));
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => menu.classList.add('hidden'));
        });
    }

    // Room tabs
    const tabSala1 = document.getElementById('tab-sala1');
    const tabSala2 = document.getElementById('tab-sala2');
    if (tabSala1 && tabSala2) {
        tabSala1.addEventListener('click', () => {
            currentRoom = 'sala1';
            tabSala1.className = 'px-6 py-2 rounded-xl font-bold transition-colors bg-[#1e3a5f] text-white shadow-sm';
            tabSala2.className = 'px-6 py-2 rounded-xl font-bold transition-colors bg-slate-100 text-slate-700 hover:bg-slate-200';
            renderTimetable();
        });
        tabSala2.addEventListener('click', () => {
            currentRoom = 'sala2';
            tabSala2.className = 'px-6 py-2 rounded-xl font-bold transition-colors bg-[#1e3a5f] text-white shadow-sm';
            tabSala1.className = 'px-6 py-2 rounded-xl font-bold transition-colors bg-slate-100 text-slate-700 hover:bg-slate-200';
            renderTimetable();
        });
    }

    initCookieConsent();
});
