<!DOCTYPE html>
<html lang="es" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Go Nic - Turismo en Nicaragua</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./CSS/styles.css">
    <style>
        .hotel-filter-bar {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }
        .filter-chip {
            padding: 8px 16px;
            border-radius: 20px;
            border: 1px solid var(--border-color, #cbd5e1);
            background: var(--card-bg, #ffffff);
            color: var(--text-color, #1e293b);
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            transition: all 0.25s ease;
        }
        .filter-chip.active, .filter-chip:hover {
            background: var(--primary-color, #0284c7);
            color: #ffffff;
            border-color: var(--primary-color, #0284c7);
        }
        .load-more-container {
            grid-column: 1 / -1;
            text-align: center;
            margin-top: 20px;
        }
        .btn-load-more {
            padding: 10px 24px;
            border-radius: 20px;
            border: 1px solid var(--primary-color, #0284c7);
            background: transparent;
            color: var(--primary-color, #0284c7);
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            transition: all 0.25s ease;
        }
        .btn-load-more:hover {
            background: var(--primary-color, #0284c7);
            color: white;
        }
        .hotel-rating {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            font-weight: 600;
            font-size: 14px;
        }
        .hotel-rating svg {
            color: #eab308;
            fill: #eab308;
        }
        .hotel-card {
            cursor: pointer;
            background: var(--card-bg, #ffffff) !important;
            color: var(--text-color, #1e293b) !important;
            border: 1px solid var(--border-color, #e2e8f0);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        .hotel-card .hotel-info-text {
            color: var(--text-muted, #64748b) !important;
        }
        .hotel-card .hotel-price-tag {
            color: var(--text-color, #1e293b) !important;
        }

        /* ================= ESTILOS DEL MODAL DE DETALLES ================= */
        .hotel-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.65);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            padding: 20px;
            backdrop-filter: blur(6px);
        }
        .hotel-modal-content {
            background: var(--card-bg, #ffffff);
            color: var(--text-color, #1e293b);
            width: 100%;
            max-width: 800px;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            position: relative;
            animation: modalFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            max-height: 92vh;
            display: flex;
            flex-direction: column;
            border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
        }
        @keyframes modalFadeIn {
            from { opacity: 0; transform: translateY(30px) scale(0.96); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-close-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(0, 0, 0, 0.6);
            color: #fff;
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            transition: background 0.2s;
        }
        .modal-close-btn:hover {
            background: rgba(0, 0, 0, 0.85);
        }
        .modal-img {
            width: 100%;
            height: 320px;
            object-fit: cover;
        }
        .modal-body {
            padding: 32px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        .modal-header-info {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 15px;
        }
        .modal-title {
            font-size: 1.8rem;
            font-weight: 700;
            margin: 0;
            color: var(--text-color, #1e293b);
        }
        .modal-price {
            font-size: 1.4rem;
            font-weight: 700;
            color: var(--primary-color, #0284c7);
            white-space: nowrap;
        }
        .modal-location {
            color: var(--text-muted, #64748b);
            font-size: 1.05rem;
            margin: 4px 0 0 0;
        }
        .modal-description {
            font-size: 1rem;
            color: var(--text-muted, #475569);
            line-height: 1.6;
        }
        .modal-calendar-section {
            border-top: 1px solid var(--border-color, #e2e8f0);
            padding-top: 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .modal-calendar-section h4 {
            margin: 0;
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--text-color, #1e293b);
        }
        .date-inputs-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }
        .date-input-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .date-input-group label {
            font-size: 0.88rem;
            font-weight: 500;
            color: var(--text-muted, #64748b);
        }
        .date-input-group input {
            padding: 12px;
            border-radius: 10px;
            border: 1px solid var(--border-color, #cbd5e1);
            background: var(--card-bg, #ffffff);
            color: var(--text-color, #1e293b);
            font-family: 'Poppins', sans-serif;
            font-size: 0.95rem;
        }
        .date-input-group input::-webkit-calendar-picker-indicator {
            filter: invert(var(--calendar-invert, 0));
            cursor: pointer;
        }
        [data-theme="dark"] {
            --calendar-invert: 1;
        }
        .btn-reserve {
            background: var(--primary-color, #0284c7);
            color: white;
            border: none;
            padding: 14px;
            border-radius: 10px;
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: opacity 0.2s, transform 0.1s;
            margin-top: 8px;
        }
        .btn-reserve:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }

        /* Transición de idioma smooth & clean (0.6s) */
        .page-translate-wrapper {
            opacity: 1;
            transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .page-translate-wrapper.fade-out {
            opacity: 0;
            transform: translateY(-15px);
        }

        /* Aparición de tarjetas más lenta, fluida y escalonada */
        @keyframes cardSmoothFadeIn {
            from {
                opacity: 0;
                transform: translateY(25px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        .category-card {
            animation: cardSmoothFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Fila inferior: precio + botón cómo llegar */
        .hotel-bottom-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 8px;
            margin-top: 4px;
        }

        .hotel-bottom-row .hotel-price-tag {
            margin: 0;
        }

        .btn-route-card {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 6px 12px;
            font-size: 12px;
            font-weight: 600;
            font-family: 'Poppins', sans-serif;
            color: rgb(13, 60, 48);
            background-color: #DAE799;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.25s ease;
            white-space: nowrap;
        }

        .btn-route-card:hover {
            background-color: #c8d880;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(218, 231, 153, 0.4);
        }

        .btn-route-card i {
            font-size: 12px;
        }

        [data-theme="dark"] .btn-route-card {
            background-color: #DAE799;
            color: rgb(13, 60, 48);
        }

        [data-theme="dark"] .btn-route-card:hover {
            background-color: #e8f0b0;
        }
    </style>
</head>
<body>

    <div id="pageContent" class="page-translate-wrapper">
        <!-- Header Navigation -->
        <header class="smooth-entry delay-1">
            <div class="nav-container">
                <a href="../Go-NIC-main/index.html" class="logo">GO<span>NIC</span></a>
                <ul class="nav-links">
                    <li><a href="../Go-NIC-main/HTML/descubrir.html" class="active" data-i18n="nav_discover">Descubrir</a></li>
                    <li><a href="index.html#hotels" data-i18n="nav_hotels">Hoteles</a></li>
                    <li><a href="../Go-NIC-main/HTML/mapita.html" class="nav_mapita" data-i18n="nav_mapita">Mapa</a></li>
                    <li><a href="../Go-NIC-main/HTML/foros.html" data-i18n="nav_foros">Foros</a></li>
                    <li><a href="../Go-NIC-main/HTML/contacto.html" data-i18n="nav_contact">Contacto</a></li>
                    <li>
                        <button type="button" id="theme-toggle" class="nav-theme-btn" aria-label="Cambiar tema">
                            <span id="theme-icon" style="display: flex; align-items: center;">
                                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                            </span>
                            <span id="theme-text">Oscuro</span>
                        </button>
                    </li>
                    <!-- Botón de Idioma -->
                    <li>
                        <button type="button" id="lang-toggle" class="nav-theme-btn" aria-label="Cambiar idioma">
                            <span id="lang-text">EN</span>
                        </button>
                    </li>
                    <!-- Contenedor con ID para cambio dinámico de Sesión / Perfil -->
                    <li id="auth-container">
                        <a href="./HTML/login.html" class="btn-signin" data-i18n="nav_signin">Iniciar sesión</a>
                    </li>
                </ul>
            </div>
        </header>

        <!-- Hero Title -->
        <section class="hero smooth-entry delay-2">
            <h1 data-i18n="hero_title">¿A dónde vamos?</h1>
        </section>

        <!-- Search Tabs & Box -->
        <div class="search-bar-container smooth-entry delay-3">
            <ul class="search-tabs">
                <li class="active" data-tab="all" data-i18n="tab_all">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    Buscar todo
                </li>
                <li data-tab="activities" data-i18n="tab_activities">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    Cosas que hacer
                </li>
                <li data-tab="hotels" data-i18n="tab_hotels">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
                    Hoteles
                </li>
                <li data-tab="restaurants" data-i18n="tab_restaurants">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" x2="6" y1="1" y2="4"/><line x1="10" x2="10" y1="1" y2="4"/><line x1="14" x2="14" y1="1" y2="4"/></svg>
                    Restaurantes
                </li>
            </ul>
            <div class="search-box">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input type="text" id="search-input" data-i18n-placeholder="search_placeholder" placeholder="Lugares para visitar, volcanes, playas, hoteles...">
                <button class="btn-search" data-i18n="btn_search">Buscar</button>
            </div>
        </div>

        <!-- Dynamic Section -->
        <section class="categories-section">
            <div class="categories-container">
                <h2 class="smooth-entry delay-4" id="categories-title" data-i18n="categories_title">Maneras de explorar Nicaragua</h2>
                
                <!-- Subfiltro minimalista con departamentos ampliados -->
                <div id="hotel-filters" class="hotel-filter-bar" style="display: none;">
                    <button class="filter-chip active" data-region="all" data-i18n="filter_all">Todos</button>
                    <button class="filter-chip" data-region="granada">Granada</button>
                    <button class="filter-chip" data-region="managua">Managua</button>
                    <button class="filter-chip" data-region="leon">León</button>
                    <button class="filter-chip" data-region="ometepe">Ometepe</button>
                    <button class="filter-chip" data-region="sanjuan">San Juan del Sur</button>
                    <button class="filter-chip" data-region="matagalpa">Matagalpa</button>
                    <button class="filter-chip" data-region="esteli">Estelí</button>
                    <button class="filter-chip" data-region="caribe">Caribe / Corn Island</button>
                    <button class="filter-chip" data-region="masaya">Masaya</button>
                    <button class="filter-chip" data-region="rio_san_juan">Río San Juan</button>
                    <button class="filter-chip" data-region="chinandega">Chinandega</button>
                    <button class="filter-chip" data-region="boaco">Boaco</button>
                    <button class="filter-chip" data-region="madriz">Madriz</button>
                </div>

                <div class="categories-grid" id="categories-grid">
                    
                    <!-- ================= VISTA PRINCIPAL (DEFAULT) ================= -->
                    <div class="category-card smooth-entry delay-4" data-type="main">
                        <div class="card-image-placeholder">
                            <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M2 20s3-2 7-2 7 2 7 2 3-2 6-2"/><path d="M2 14s3-2 7-2 7 2 7 2 3-2 6-2"/><circle cx="12" cy="6" r="3"/></svg>
                        </div>
                        <h3 data-i18n="card_beaches">Playas y Costa</h3>
                    </div>

                    <div class="category-card smooth-entry delay-5" data-type="main">
                        <div class="card-image-placeholder">
                            <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
                        </div>
                        <h3 data-i18n="card_volcanoes">Volcanes y Aventura</h3>
                    </div>

                    <div class="category-card smooth-entry delay-5" data-type="main">
                        <div class="card-image-placeholder">
                            <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h2M13 10h2M9 14h2M13 14h2"/></svg>
                        </div>
                        <h3 data-i18n="card_hotels_col">Hoteles Coloniales</h3>
                    </div>

                    <div class="category-card smooth-entry delay-6" data-type="main">
                        <div class="card-image-placeholder">
                            <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" x2="6" y1="1" y2="4"/><line x1="10" x2="10" y1="1" y2="4"/><line x1="14" x2="14" y1="1" y2="4"/></svg>
                        </div>
                        <h3 data-i18n="card_food">Gastronomía Típica</h3>
                    </div>

                    <!-- ================= HOTELES REALES EN NICARAGUA ================= -->
                    <div class="category-card hotel-card smooth-entry" data-type="hotels" data-region="granada" data-lat="11.9298367" data-lng="-85.9546564" style="display: none;">
                        <div class="card-image-container"><img src="./ASSETS/hotel_granada.jpg" alt="Hotel Plaza Colón" class="card-real-img"></div>
                        <div class="card-content-area">
                            <h3>Hotel Plaza Colón</h3>
                            <p class="hotel-info-text">Granada, Centro Histórico</p>
                            <div class="hotel-rating"><svg width="16" height="16" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>5.0</span></div>
                            <div class="hotel-bottom-row">
                                <span class="hotel-price-tag"><strong>$110</strong> <span data-i18n="night_text">/ noche</span></span>
                                <button class="btn-route-card" onclick="event.stopPropagation(); irAlMapa('Hotel Plaza Colón', 11.9298367, -85.9546564, './ASSETS/hotel_granada.jpg', 'Granada, Centro Histórico')">
                                    <i class="fas fa-route"></i> Cómo llegar
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="category-card hotel-card smooth-entry" data-type="hotels" data-region="granada" style="display: none;">
                        <div class="card-image-container"><img src="./ASSETS/hotel_granada2.jpg" alt="Jicaro Island Lodge" class="card-real-img"></div>
                        <div class="card-content-area">
                            <h3>Jicaro Island Lodge</h3>
                            <p class="hotel-info-text">Isletas de Granada</p>
                            <div class="hotel-rating"><svg width="16" height="16" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>4.9</span></div>
                            <span class="hotel-price-tag"><strong>$350</strong> <span data-i18n="night_text">/ noche</span></span>
                        </div>
                    </div>

                    <div class="category-card hotel-card smooth-entry" data-type="hotels" data-region="granada" style="display: none;">
                        <div class="card-image-container"><img src="./ASSETS/hotel_darcia.jpg" alt="Tribal Hotel" class="card-real-img"></div>
                        <div class="card-content-area">
                            <h3>Tribal Hotel</h3>
                            <p class="hotel-info-text">Granada</p>
                            <div class="hotel-rating"><svg width="16" height="16" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>4.8</span></div>
                            <span class="hotel-price-tag"><strong>$145</strong> <span data-i18n="night_text">/ noche</span></span>
                        </div>
                    </div>

                    <div class="category-card hotel-card smooth-entry" data-type="hotels" data-region="granada" style="display: none;">
                        <div class="card-image-container"><img src="./ASSETS/hotel_granada_mansion.jpg" alt="Hotel Darcia Boutique" class="card-real-img"></div>
                        <div class="card-content-area">
                            <h3>Hotel Darcia Boutique</h3>
                            <p class="hotel-info-text">Granada</p>
                            <div class="hotel-rating"><svg width="16" height="16" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>4.6</span></div>
                            <span class="hotel-price-tag"><strong>$80</strong> <span data-i18n="night_text">/ noche</span></span>
                        </div>
                    </div>

                    <div class="category-card hotel-card smooth-entry" data-type="hotels" data-region="granada" style="display: none;">
                        <div class="card-image-container"><img src="./ASSETS/hotel_convento_granada.jpg" alt="Hotel Granada" class="card-real-img"></div>
                        <div class="card-content-area">
                            <h3>Hotel Granada</h3>
                            <p class="hotel-info-text">Granada</p>
                            <div class="hotel-rating"><svg width="16" height="16" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>4.5</span></div>
                            <span class="hotel-price-tag"><strong>$75</strong> <span data-i18n="night_text">/ noche</span></span>
                        </div>
                    </div>

                    <div class="category-card hotel-card smooth-entry" data-type="hotels" data-region="sanjuan" style="display: none;">
                        <div class="card-image-container"><img src="./ASSETS/hotel_sanjuan.jfif" alt="Morgan's Rock" class="card-real-img"></div>
                        <div class="card-content-area">
                            <h3>Morgan's Rock Eco-Lodge</h3>
                            <p class="hotel-info-text">San Juan del Sur, Rivas</p>
                            <div class="hotel-rating"><svg width="16" height="16" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>4.9</span></div>
                            <span class="hotel-price-tag"><strong>$240</strong> <span data-i18n="night_text">/ noche</span></span>
                        </div>
                    </div>

                    <div class="category-card hotel-card smooth-entry" data-type="hotels" data-region="sanjuan" style="display: none;">
                        <div class="card-image-container"><img src="./ASSETS/hotel_pelicano.jpg" alt="Pelican Eyes Resort" class="card-real-img"></div>
                        <div class="card-content-area">
                            <h3>Pelican Eyes Resort</h3>
                            <p class="hotel-info-text">San Juan del Sur</p>
                            <div class="hotel-rating"><svg width="16" height="16" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>4.8</span></div>
                            <span class="hotel-price-tag"><strong>$175</strong> <span data-i18n="night_text">/ noche</span></span>
                        </div>
                    </div>

                    <div class="category-card hotel-card smooth-entry" data-type="hotels" data-region="sanjuan" style="display: none;">
                        <div class="card-image-container"><img src="./ASSETS/hotel_sanjuan2.jpg" alt="Hula Kai Hotel" class="card-real-img"></div>
                        <div class="card-content-area">
                            <h3>Hula Kai Hotel</h3>
                            <p class="hotel-info-text">Playa Maderas, San Juan del Sur</p>
                            <div class="hotel-rating"><svg width="16" height="16" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>4.8</span></div>
                            <span class="hotel-price-tag"><strong>$145</strong> <span data-i18n="night_text">/ noche</span></span>
                        </div>
                    </div>

                    <div class="category-card hotel-card smooth-entry" data-type="hotels" data-region="ometepe" style="display: none;">
                        <div class="card-image-container"><img src="./ASSETS/hotel_ometepe.jpg" alt="Totoco Eco-Lodge" class="card-real-img"></div>
                        <div class="card-content-area">
                            <h3>Totoco Eco-Lodge</h3>
                            <p class="hotel-info-text">Balgüe, Isla de Ometepe</p>
                            <div class="hotel-rating"><svg width="16" height="16" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>4.8</span></div>
                            <span class="hotel-price-tag"><strong>$85</strong> <span data-i18n="night_text">/ noche</span></span>
                        </div>
                    </div>

                    <div class="category-card hotel-card smooth-entry" data-type="hotels" data-region="leon" style="display: none;">
                        <div class="card-image-container"><img src="./ASSETS/hotel_leon.jpg" alt="Hotel El Convento" class="card-real-img"></div>
                        <div class="card-content-area">
                            <h3>Hotel El Convento</h3>
                            <p class="hotel-info-text">León, Centro Histórico</p>
                            <div class="hotel-rating"><svg width="16" height="16" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>4.7</span></div>
                            <span class="hotel-price-tag"><strong>$95</strong> <span data-i18n="night_text">/ noche</span></span>
                        </div>
                    </div>

                    <!-- ================= RESTAURANTES ================= -->
                    <div class="category-card hotel-card smooth-entry" data-type="restaurants" style="display: none;">
                        <div class="card-image-container"><img src="./ASSETS/restaurant_managua.jpg" alt="Los Ranchos" class="card-real-img"></div>
                        <div class="card-content-area">
                            <h3>Restaurante Los Ranchos</h3>
                            <p class="hotel-info-text">Managua, Carnes y Cortes Finos</p>
                            <div class="hotel-rating"><svg width="16" height="16" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>4.8</span></div>
                            <span class="hotel-price-tag"><strong data-i18n="avg_plate">Consumo aprox: $25</strong></span>
                        </div>
                    </div>

                    <div class="category-card hotel-card smooth-entry" data-type="restaurants" style="display: none;">
                        <div class="card-image-container"><img src="./ASSETS/restaurant_granada.jfif" alt="Terraza Cifuentes" class="card-real-img"></div>
                        <div class="card-content-area">
                            <h3>Terraza Cifuentes</h3>
                            <p class="hotel-info-text">Granada, Comida Típica</p>
                            <div class="hotel-rating"><svg width="16" height="16" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>4.7</span></div>
                            <span class="hotel-price-tag"><strong data-i18n="avg_plate">Consumo aprox: $18</strong></span>
                        </div>
                    </div>

                    <div class="category-card hotel-card smooth-entry" data-type="restaurants" style="display: none;">
                        <div class="card-image-container"><img src="./ASSETS/restaurant_mga_garufa.jpg" alt="Garufa Argentine Grill" class="card-real-img"></div>
                        <div class="card-content-area">
                            <h3>Garufa Argentine Grill</h3>
                            <p class="hotel-info-text">Managua, Carnes</p>
                            <div class="hotel-rating"><svg width="16" height="16" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>4.8</span></div>
                            <span class="hotel-price-tag"><strong data-i18n="avg_plate">Consumo aprox: $30</strong></span>
                        </div>
                    </div>

                    <div class="category-card hotel-card smooth-entry" data-type="restaurants" style="display: none;">
                        <div class="card-image-container"><img src="./ASSETS/restaurant_el_timon.jpg" alt="El Timón" class="card-real-img"></div>
                        <div class="card-content-area">
                            <h3>Restaurante El Timón</h3>
                            <p class="hotel-info-text">San Juan del Sur, Mariscos</p>
                            <div class="hotel-rating"><svg width="16" height="16" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>4.7</span></div>
                            <span class="hotel-price-tag"><strong data-i18n="avg_plate">Consumo aprox: $20</strong></span>
                        </div>
                    </div>

                    <!-- Botón para ver más de forma progresiva -->
                    <div class="load-more-container" id="load-more-container" style="display: none;">
                        <button class="btn-load-more" id="btn-load-more" data-i18n="btn_load_more">Ver más resultados</button>
                    </div>

                </div>
            </div>
        </section>

        <!-- Modal Detalle y Reservas -->
        <div class="hotel-modal-overlay" id="hotel-modal">
            <div class="hotel-modal-content">
                <button class="modal-close-btn" id="modal-close">&times;</button>
                <img src="" alt="Lugar" class="modal-img" id="modal-img">
                <div class="modal-body">
                    <div class="modal-header-info">
                        <div>
                            <h3 class="modal-title" id="modal-title">Nombre del Lugar</h3>
                            <p class="modal-location" id="modal-location">Ubicación</p>
                        </div>
                        <span class="modal-price" id="modal-price">$0</span>
                    </div>
                    <p class="modal-description" id="modal-desc" data-i18n="modal_desc">Disfruta de una experiencia inolvidable con todas las comodidades, excelente atención y una ubicación privilegiada para explorar lo mejor de la zona.</p>
                    
                    <div class="modal-calendar-section">
                        <h4 data-i18n="modal_calendar_title">Verificar Disponibilidad y Fechas</h4>
                        <div class="date-inputs-grid">
                            <div class="date-input-group">
                                <label for="checkin-date" data-i18n="modal_checkin">Fecha de Entrada</label>
                                <input type="date" id="checkin-date">
                            </div>
                            <div class="date-input-group">
                                <label for="checkout-date" data-i18n="modal_checkout">Fecha de Salida</label>
                                <input type="date" id="checkout-date">
                            </div>
                        </div>
                        <button class="btn-reserve" id="btn-confirm-reserve" data-i18n="modal_btn_reserve">Reservar Ahora</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Promo Banner -->
        <section class="promo-section smooth-entry delay-6">
            <div class="promo-card">
                <div class="promo-media">
                    <svg width="80" height="80" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                </div>
                <div class="promo-content">
                    <h2 data-i18n="promo_title">Explora la tierra de lagos y volcanes.</h2>
                    <p data-i18n="promo_text">Vive experiencias únicas en Nicaragua. Descubre destinos increíbles y planifica tu próxima aventura con nuestra guía de viajes.</p>
                    <a href="#" class="btn-promo" data-i18n="promo_btn">Reservar experiencias</a>
                </div>
            </div>
        </section>
    </div>

    <!-- Scripts de Interacción y Traducción -->
    <script>
        // ================= DINÁMICA DE SESIÓN Y PERFIL =================
        document.addEventListener("DOMContentLoaded", () => {
            const authContainer = document.getElementById("auth-container");
            const usuarioLogueado = localStorage.getItem("user") || localStorage.getItem("gonic-logged");

            if (authContainer) {
                if (usuarioLogueado && usuarioLogueado !== "null" && usuarioLogueado !== "undefined" && usuarioLogueado !== "") {
                    authContainer.innerHTML = `
                        <div>
                            <a href="./HTML/perfil.html" style="background: #DAE799; color: #0D3C30; border: 1px solid #DAE799; padding: 8px 20px; border-radius: 20px; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; text-decoration: none; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s ease;">
                                Perfil
                            </a>
                        </div>
                    `;
                } else {
                    authContainer.innerHTML = `
                        <a href="./HTML/login.html" class="btn-signin" data-i18n="nav_signin">Iniciar sesión</a>
                    `;
                }
            }
        });

        const translations = {
            es: {
                nav_discover: "Descubrir",
                nav_hotels: "Hoteles",
                nav_mapita: "Mapa",
                nav_foros: "Foros",
                nav_contact: "Contacto",
                nav_signin: "Iniciar sesión",
                hero_title: "¿A dónde vamos?",
                tab_all: "Buscar todo",
                tab_activities: "Cosas que hacer",
                tab_hotels: "Hoteles",
                tab_restaurants: "Restaurantes",
                btn_search: "Buscar",
                filter_all: "Todos",
                card_beaches: "Playas y Costa",
                card_volcanoes: "Volcanes y Aventura",
                card_hotels_col: "Hoteles Coloniales",
                card_food: "Gastronomía Típica",
                night_text: "/ noche",
                avg_plate: "Consumo promedio",
                btn_load_more: "Ver más resultados",
                modal_desc: "Disfruta de una experiencia inolvidable con todas las comodidades, excelente atención y una ubicación privilegiada para explorar lo mejor de la zona.",
                modal_calendar_title: "Verificar Disponibilidad y Fechas",
                modal_checkin: "Fecha de Entrada",
                modal_checkout: "Fecha de Salida",
                modal_btn_reserve: "Reservar Ahora",
                promo_title: "Explora la tierra de lagos y volcanes.",
                promo_text: "Vive experiencias únicas en Nicaragua. Descubre destinos increíbles y planifica tu próxima aventura con nuestra guía de viajes.",
                promo_btn: "Reservar experiencias",
                title_all: "Maneras de explorar Nicaragua",
                title_activities: "Actividades destacadas",
                title_hotels: "Alojamientos Disponibles",
                title_restaurants: "Restaurantes y Gastronomía",
                ph_all: "Lugares para visitar, volcanes, playas, hoteles...",
                ph_activities: "Sandboarding, tours de café, kayak, senderismo...",
                ph_hotels: "Busca hotel por ciudad o departamento...",
                ph_restaurants: "Fritangas, marisquerías, café de altura..."
            },
            en: {
                nav_discover: "Discover",
                nav_hotels: "Hotels",
                nav_mapita: "Map",
                nav_foros: "Forums",
                nav_contact: "Contact",
                nav_signin: "Sign in",
                hero_title: "Where are we going?",
                tab_all: "Search all",
                tab_activities: "Things to do",
                tab_hotels: "Hotels",
                tab_restaurants: "Restaurants",
                btn_search: "Search",
                filter_all: "All",
                card_beaches: "Beaches & Coast",
                card_volcanoes: "Volcanoes & Adventure",
                card_hotels_col: "Colonial Hotels",
                card_food: "Typical Gastronomy",
                night_text: "/ night",
                avg_plate: "Average check",
                btn_load_more: "Load more results",
                modal_desc: "Enjoy an unforgettable experience with all amenities, excellent service, and a prime location to explore the best of the area.",
                modal_calendar_title: "Check Availability & Dates",
                modal_checkin: "Check-in Date",
                modal_checkout: "Check-out Date",
                modal_btn_reserve: "Book Now",
                promo_title: "Explore the land of lakes and volcanoes.",
                promo_text: "Live unique experiences in Nicaragua. Discover incredible destinations and plan your next adventure with our travel guide.",
                promo_btn: "Book experiences",
                title_all: "Ways to explore Nicaragua",
                title_activities: "Featured Activities",
                title_hotels: "Available Accommodations",
                title_restaurants: "Restaurants & Gastronomy",
                ph_all: "Places to visit, volcanoes, beaches, hotels...",
                ph_activities: "Sandboarding, coffee tours, kayak, hiking...",
                ph_hotels: "Search hotel by city or department...",
                ph_restaurants: "Fritangas, seafood, high-altitude coffee..."
            }
        };

        const langToggleBtn = document.getElementById('lang-toggle');
        const langText = document.getElementById('lang-text');
        const pageContent = document.getElementById('pageContent');

        function setLanguage(lang) {
            pageContent.classList.add('fade-out');

            setTimeout(() => {
                document.documentElement.setAttribute('lang', lang);
                localStorage.setItem('gonic-lang', lang);

                document.querySelectorAll('[data-i18n]').forEach(el => {
                    const key = el.getAttribute('data-i18n');
                    if (translations[lang] && translations[lang][key]) {
                        el.textContent = translations[lang][key];
                    }
                });

                if (tabConfig[currentActiveTab]) {
                    searchInput.placeholder = translations[lang][tabConfig[currentActiveTab].phKey];
                    categoriesTitle.textContent = translations[lang][tabConfig[currentActiveTab].titleKey];
                }

                if (langText) {
                    langText.textContent = lang === 'es' ? 'EN' : 'ES';
                }

                pageContent.classList.remove('fade-out');
            }, 350);
        }

        const savedLang = localStorage.getItem('gonic-lang') || 'es';
        setLanguage(savedLang);

        if (langToggleBtn) {
            langToggleBtn.addEventListener('click', () => {
                const currentLang = document.documentElement.getAttribute('lang') || 'es';
                setLanguage(currentLang === 'es' ? 'en' : 'es');
            });
        }

        // Cambio de Tema
        const toggleBtn = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const themeText = document.getElementById('theme-text');

        const moonSVG = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
        const sunSVG = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

        function applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('gonic-theme', theme);
            if (theme === 'dark') {
                themeIcon.innerHTML = sunSVG;
                themeText.textContent = 'Claro';
            } else {
                themeIcon.innerHTML = moonSVG;
                themeText.textContent = 'Oscuro';
            }
        }

        const savedTheme = localStorage.getItem('gonic-theme') || 'light';
        applyTheme(savedTheme);

        toggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            applyTheme(currentTheme === 'light' ? 'dark' : 'light');
        });

        // Control de Vistas
        const tabs = document.querySelectorAll('.search-tabs li');
        const searchInput = document.getElementById('search-input');
        const categoriesTitle = document.getElementById('categories-title');
        const hotelFilters = document.getElementById('hotel-filters');
        
        const mainCards = document.querySelectorAll('[data-type="main"]');
        const hotelCards = Array.from(document.querySelectorAll('[data-type="hotels"]'));
        const restaurantCards = Array.from(document.querySelectorAll('[data-type="restaurants"]'));
        const filterChips = document.querySelectorAll('.filter-chip');
        
        const navHotels = document.getElementById('nav-hotels');
        const navDiscover = document.getElementById('nav-discover');
        const loadMoreContainer = document.getElementById('load-more-container');
        const btnLoadMore = document.getElementById('btn-load-more');

        let currentActiveTab = 'all';
        let currentRegion = 'all';
        let visibleLimit = 4;

        const tabConfig = {
            all: { phKey: "ph_all", titleKey: "title_all" },
            activities: { phKey: "ph_activities", titleKey: "title_activities" },
            hotels: { phKey: "ph_hotels", titleKey: "title_hotels" },
            restaurants: { phKey: "ph_restaurants", titleKey: "title_restaurants" }
        };

        function triggerCardAnimations() {
            const visibleCards = document.querySelectorAll('.category-card[style*="display: flex"], .category-card:not([style*="display: none"])');
            visibleCards.forEach((card, index) => {
                card.style.animation = 'none';
                card.offsetHeight; 
                card.style.animation = `cardSmoothFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s forwards`;
            });
        }

        function updateDisplayList() {
            const term = searchInput.value.toLowerCase().trim();
            
            if (currentActiveTab === 'hotels') {
                restaurantCards.forEach(c => c.style.display = 'none');
                let matchedCards = hotelCards.filter(card => {
                    const matchesRegion = (currentRegion === 'all' || card.getAttribute('data-region') === currentRegion);
                    const matchesSearch = card.textContent.toLowerCase().includes(term);
                    return matchesRegion && matchesSearch;
                });

                hotelCards.forEach(card => card.style.display = 'none');
                let shownCount = 0;
                matchedCards.forEach((card, index) => {
                    if (index < visibleLimit) {
                        card.style.display = 'flex';
                        shownCount++;
                    }
                });

                loadMoreContainer.style.display = (shownCount < matchedCards.length && term === '') ? 'block' : 'none';

            } else if (currentActiveTab === 'restaurants') {
                hotelCards.forEach(c => c.style.display = 'none');
                let matchedCards = restaurantCards.filter(card => card.textContent.toLowerCase().includes(term));

                restaurantCards.forEach(card => card.style.display = 'none');
                let shownCount = 0;
                matchedCards.forEach((card, index) => {
                    if (index < visibleLimit) {
                        card.style.display = 'flex';
                        shownCount++;
                    }
                });

                loadMoreContainer.style.display = (shownCount < matchedCards.length && term === '') ? 'block' : 'none';
            }

            triggerCardAnimations();
        }

        function setView(tabKey) {
            currentActiveTab = tabKey;
            tabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-tab') === tabKey));

            const currentLang = document.documentElement.getAttribute('lang') || 'es';
            if (tabConfig[tabKey]) {
                searchInput.placeholder = translations[currentLang][tabConfig[tabKey].phKey];
                categoriesTitle.textContent = translations[currentLang][tabConfig[tabKey].titleKey];
            }

            searchInput.value = '';
            visibleLimit = 4;

            if (tabKey === 'hotels' || tabKey === 'restaurants') {
                hotelFilters.style.display = (tabKey === 'hotels') ? 'flex' : 'none';
                mainCards.forEach(card => card.style.display = 'none');
                updateDisplayList();
            } else {
                hotelFilters.style.display = 'none';
                hotelCards.forEach(card => card.style.display = 'none');
                restaurantCards.forEach(card => card.style.display = 'none');
                loadMoreContainer.style.display = 'none';
                mainCards.forEach(card => card.style.display = 'flex');
                triggerCardAnimations();
            }
        }

        tabs.forEach(tab => {
            tab.addEventListener('click', () => setView(tab.getAttribute('data-tab')));
        });

        if (navHotels) navHotels.addEventListener('click', (e) => { e.preventDefault(); setView('hotels'); });
        if (navDiscover) navDiscover.addEventListener('click', (e) => { e.preventDefault(); setView('all'); });

        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                currentRegion = chip.getAttribute('data-region');
                visibleLimit = 4;
                updateDisplayList();
            });
        });

        btnLoadMore.addEventListener('click', () => {
            visibleLimit += 4;
            updateDisplayList();
        });

        searchInput.addEventListener('input', () => {
            if (currentActiveTab === 'hotels' || currentActiveTab === 'restaurants') {
                updateDisplayList();
            } else {
                mainCards.forEach(card => {
                    const text = card.textContent.toLowerCase();
                    card.style.display = text.includes(searchInput.value.toLowerCase().trim()) ? 'flex' : 'none';
                });
                triggerCardAnimations();
            }
        });

        // Modal
        const hotelModal = document.getElementById('hotel-modal');
        const modalClose = document.getElementById('modal-close');
        const modalImg = document.getElementById('modal-img');
        const modalTitle = document.getElementById('modal-title');
        const modalLocation = document.getElementById('modal-location');
        const modalPrice = document.getElementById('modal-price');
        const btnConfirmReserve = document.getElementById('btn-confirm-reserve');
        const checkinDate = document.getElementById('checkin-date');
        const checkoutDate = document.getElementById('checkout-date');

        const allSelectableCards = document.querySelectorAll('.hotel-card, .category-card[data-type="main"]');
        allSelectableCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h3').textContent;
                const location = card.querySelector('.hotel-info-text') ? card.querySelector('.hotel-info-text').textContent : "Nicaragua";
                const price = card.querySelector('.hotel-price-tag') ? card.querySelector('.hotel-price-tag').textContent : "$50";
                const imgEl = card.querySelector('.card-real-img') || card.querySelector('.card-image-placeholder');
                const imgSrc = imgEl.tagName === 'IMG' ? imgEl.getAttribute('src') : './ASSETS/fondo-nicaragua.jpeg';

                modalTitle.textContent = title;
                modalLocation.textContent = location;
                modalPrice.textContent = price;
                modalImg.setAttribute('src', imgSrc);

                const today = new Date().toISOString().split('T')[0];
                checkinDate.value = today;
                checkoutDate.value = today;

                hotelModal.style.display = 'flex';
            });
        });

        modalClose.addEventListener('click', () => {
            hotelModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === hotelModal) {
                hotelModal.style.display = 'none';
            }
        });

        btnConfirmReserve.addEventListener('click', () => {
            if (!checkinDate.value || !checkoutDate.value) {
                alert('Por favor selecciona las fechas de entrada y salida.');
                return;
            }
            alert(`¡Reserva solicitada con éxito en ${modalTitle.textContent}!`);
            hotelModal.style.display = 'none';
        });

        /* ========== FUNCIÓN PARA IR AL MAPA CON DESTINO ========== */
        function irAlMapa(nombre, lat, lng, imagen, ubicacion) {
            var destino = {
                nombre: nombre,
                lat: lat,
                lng: lng,
                imagen: imagen,
                ubicacion: ubicacion,
                perfil: 'driving-car'
            };
            
            localStorage.setItem('destinoRuta', JSON.stringify(destino));
            window.location.href = './HTML/mapita.html';
        }
    </script>
</body>
</html>