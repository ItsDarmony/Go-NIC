var map = L.map('map', {
    zoomControl: false
}).setView([12.13282, -86.2504], 8);

// CONTROLES DE LA ESQUINA INFERIOR IZQUIERDA para el boton ubicacion/Boton marcador

var bottomLeftControls = L.Control.extend({
    options: {
        position: 'bottomleft'
    },
    
    onAdd: function(map) {
        var wrapper = L.DomUtil.create('div', 'bottom-left-controls-wrapper');
        
        var locationBtn = L.DomUtil.create('a', 'leaflet-control-location-btn', wrapper);
        locationBtn.innerHTML = '<i class="fas fa-location-crosshairs"></i>';
        locationBtn.href = '#';
        locationBtn.title = 'Mi ubicación actual';
        locationBtn.setAttribute('role', 'button');
        locationBtn.setAttribute('aria-label', 'Mi ubicación actual');
        
        L.DomEvent.disableClickPropagation(locationBtn);
        L.DomEvent.disableScrollPropagation(locationBtn);
        
        L.DomEvent.on(locationBtn, 'click', function(e) {
            L.DomEvent.preventDefault(e);
            getUserLocation();
        });
        
        var markerBtn = L.DomUtil.create('a', 'leaflet-control-marker-btn', wrapper);
        markerBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
        markerBtn.href = '#';
        markerBtn.title = 'Colocar marcador en el mapa';
        markerBtn.setAttribute('role', 'button');
        markerBtn.setAttribute('aria-label', 'Colocar marcador en el mapa');
        
        L.DomEvent.disableClickPropagation(markerBtn);
        L.DomEvent.disableScrollPropagation(markerBtn);
        
        L.DomEvent.on(markerBtn, 'click', function(e) {
            L.DomEvent.preventDefault(e);
            toggleMarkerMode(markerBtn);
        });
        
        return wrapper;
    }
});

map.addControl(new bottomLeftControls());

L.control.zoom({ position: 'bottomleft' }).addTo(map);

/*FUncion para activar/desactivar los marcadores*/
function toggleMarkerMode(buttonElement) {
    markerModeActive = !markerModeActive;
    
    if (markerModeActive) {
        buttonElement.classList.add('active');
        buttonElement.title = 'Quitar marcador y desactivar';
        document.getElementById('map').style.cursor = 'crosshair';
    } else {
        buttonElement.classList.remove('active');
        buttonElement.title = 'Colocar marcador en el mapa';
        document.getElementById('map').style.cursor = '';
        
        if (temporaryMarker) {
            map.removeLayer(temporaryMarker);
            temporaryMarker = null;
        }
        
        document.getElementById('latitude').value = '';
        document.getElementById('longitude').value = '';
    }
}

/*CONTROL DE BÚSQUEDA CON AUTOCOMPLETADO*/

var searchControl = L.Control.extend({
    options: {
        position: 'topleft'
    },
    
    onAdd: function(map) {
        var container = L.DomUtil.create('div', 'leaflet-control-search-wrapper');
        
        container.innerHTML = `
    <div class="search-control-wrapper-inner">
        <div class="search-control collapsed" id="search-control-box">
            <button type="button" 
                    class="search-toggle-btn" 
                    id="search-toggle-btn" 
                    title="Buscar lugar"
                    aria-label="Abrir buscador">
                <i class="fas fa-search"></i>
            </button>
            <input type="text" 
                id="map-search-input" 
                class="map-search-input" 
                placeholder="Buscar lugar..." 
                autocomplete="off">
            <button type="button" 
                    id="map-search-clear" 
                    class="map-search-clear" 
                    title="Limpiar">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="search-results" id="search-results"></div>
    </div>
`;
        
        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.disableScrollPropagation(container);
        
        setTimeout(function() {
            initSearchLogic();
        }, 0);
        
        return container;
    }
});

map.addControl(new searchControl());

function initSearchLogic() {
    var searchInput = document.getElementById('map-search-input');
    var searchResults = document.getElementById('search-results');
    var clearBtn = document.getElementById('map-search-clear');
    var searchBox = document.getElementById('search-control-box');
    var toggleBtn = document.getElementById('search-toggle-btn');
    
    if (!searchInput) return;
    
    var debounceTimer = null;
    var currentResults = [];
    var searchMarker = null;
    var isExpanded = false;
    
    function expandSearch() {
        if (isExpanded) return;
        isExpanded = true;
        searchBox.classList.remove('collapsed');
        searchBox.classList.add('expanded');
        setTimeout(function() {
            searchInput.focus();
        }, 250);
    }
    
    function collapseSearch() {
        if (!isExpanded) return;
        isExpanded = false;
        searchBox.classList.remove('expanded');
        searchBox.classList.add('collapsed');
        searchInput.value = '';
        searchResults.innerHTML = '';
        searchResults.classList.remove('show');
        searchInput.blur();
    }
    
    toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (isExpanded) {
            if (searchInput.value.trim() === '') {
                collapseSearch();
            } else {
                searchInput.focus();
            }
        } else {
            expandSearch();
        }
    });
    
    function performSearch(query) {
        if (query.length < 3) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('show');
            return;
        }
        
        var center = map.getCenter();
        
        var url = 'https://api.heigit.org/pelias/v1/autocomplete' +
                '?text=' + encodeURIComponent(query) +
                '&focus.point.lat=' + center.lat +
                '&focus.point.lon=' + center.lng +
                '&boundary.country=NI' +
                '&size=5';
        
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': ORS_API_KEY,
                'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
            }
        })
        .then(function(response) {
            if (!response.ok) throw new Error('Error HTTP: ' + response.status);
            return response.json();
        })
        .then(function(data) {
            currentResults = data.features || [];
            renderResults(currentResults);
        })
        .catch(function(error) {
            console.error('Error en búsqueda:', error);
            searchResults.innerHTML = '<div class="search-no-results">Error al buscar</div>';
            searchResults.classList.add('show');
        });
    }
    
    function renderResults(features) {
        if (!features || features.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results">Sin resultados</div>';
            searchResults.classList.add('show');
            return;
        }
        
        searchResults.innerHTML = features.map(function(feature, index) {
            var props = feature.properties;
            var name = props.name || props.label || 'Sin nombre';
            var locality = props.locality || props.county || props.region || '';
            var country = props.country || '';
            
            var coords = feature.geometry.coordinates;
            var lng = coords[0];
            var lat = coords[1];
            
            var secondary = [locality, country].filter(Boolean).join(', ');
            
            return `
                <div class="search-result-item" 
                    data-lat="${lat}" 
                    data-lng="${lng}"
                    data-name="${name.replace(/"/g, '&quot;')}">
                    <div class="search-result-name">${name}</div>
                    ${secondary ? `<div class="search-result-location">${secondary}</div>` : ''}
                </div>
            `;
        }).join('');
        
        searchResults.classList.add('show');
        
        searchResults.querySelectorAll('.search-result-item').forEach(function(item) {
            item.addEventListener('click', function() {
                var lat = parseFloat(this.getAttribute('data-lat'));
                var lng = parseFloat(this.getAttribute('data-lng'));
                var name = this.getAttribute('data-name');
                
                selectResult(lat, lng, name);
            });
        });
    }
    
    function selectResult(lat, lng, name) {
        if (searchMarker) {
            map.removeLayer(searchMarker);
        }
        
        var selectedFeature = currentResults.find(function(feature) {
            return feature.properties.name === name;
        });
        
        if (!selectedFeature) {
            console.warn('No se encontraron los datos del resultado seleccionado');
            return;
        }
        
        var props = selectedFeature.properties;
        
        var searchIcon = L.divIcon({
            className: 'search-marker-icon',
            html: '<div class="search-marker-dot"><i class="fas fa-map-pin"></i></div>',
            iconSize: [30, 40],
            iconAnchor: [15, 40],
            popupAnchor: [0, -40]
        });
        
        var placeData = {
            name: props.name || name,
            category: props.layer || 'Lugar',
            address: props.label || '',
            website: (props.addendum && props.addendum.osm && props.addendum.osm.website) || '',
            phone: (props.addendum && props.addendum.osm && props.addendum.osm.phone) || '',
            hours: (props.addendum && props.addendum.osm && props.addendum.osm.opening_hours) || '',
            image: '',
            description: '',
            lat: lat,
            lng: lng,
            facebook: '',
            instagram: '',
            twitter: '',
            isSearchResult: true,
            reviews: []
        };
        
        searchMarker = L.marker([lat, lng], {
            icon: searchIcon,
            zIndexOffset: 500
        }).addTo(map);
        
        var popupContent = buildPlaceCardHTML(placeData);
        searchMarker.bindPopup(popupContent, {
            maxWidth: 380,
            minWidth: 340,
            className: 'popup-container place-card-popup'
        });

        searchMarker.bindPopup(popupContent, {
    maxWidth: 380,
    minWidth: 340,
    className: 'popup-container place-card-popup'
});

// Extraer el cardId y asignar listeners al abrir el popup
var cardIdMatch = popupContent.match(/data-card-id="([^"]+)"/);
var cardId = cardIdMatch ? cardIdMatch[1] : null;

searchMarker.on('popupopen', function() {
    if (cardId) {
        setupCardEventPropagation(cardId);
    }
});
        
        map.flyTo([lat, lng], 16, {
            duration: 1.2
        });
        
        setTimeout(function() {
            searchMarker.openPopup();
        }, 1200);
        
        searchResults.classList.remove('show');
        searchInput.value = name;
    }
    
    searchInput.addEventListener('input', function(e) {
        var query = e.target.value.trim();
        
        if (query.length > 0 && !isExpanded) {
            expandSearch();
        }
        
        clearTimeout(debounceTimer);
        
        if (query.length < 3) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('show');
            return;
        }
        
        searchResults.innerHTML = '<div class="search-loading">Buscando...</div>';
        searchResults.classList.add('show');
        
        debounceTimer = setTimeout(function() {
            performSearch(query);
        }, 300);
    });
    
    clearBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        searchInput.value = '';
        searchResults.innerHTML = '';
        searchResults.classList.remove('show');
        
        if (searchMarker) {
            map.removeLayer(searchMarker);
            searchMarker = null;
        }
        
        searchInput.focus();
    });
    
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            clearTimeout(debounceTimer);
            performSearch(searchInput.value.trim());
        }
        if (e.key === 'Escape') {
            if (searchInput.value.trim() === '') {
                collapseSearch();
            } else {
                searchResults.classList.remove('show');
            }
        }
    });
    
    searchInput.addEventListener('blur', function() {
        setTimeout(function() {
            if (searchInput.value.trim() === '' && !searchResults.classList.contains('show')) {
                collapseSearch();
            }
        }, 200);
    });
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-control')) {
            searchResults.classList.remove('show');
            
            if (searchInput.value.trim() === '') {
                collapseSearch();
            }
        }
    });
}

//Mapa default
var callesLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Nueva capa de satelite (Esri World Imagery)
var sateliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 19
});

// Capa de transporte de OSM
var transporteLayer = L.tileLayer('https://tile.memomaps.de/tilegen/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles: <a href="https://memomaps.de/">MeMoMaps</a>'
});

var baseLayers = {
    "Calles": callesLayer,
    "Satélite": sateliteLayer,
    "Transporte (OSM)": transporteLayer
};

L.control.layers(baseLayers).addTo(map);

var markers = [];
var markerObjects = [];
var currentEditIndex = -1;
var currentDeleteIndex = -1;

// Variables para las imágenes subidas (base64)
var currentPlaceImageBase64 = null;
var currentEditImageBase64 = null;
var currentReviewImageBase64 = null;

// Variables para la reseña actualmente abierta en el modal
var currentReviewCardId = null;
var currentReviewRating = 0;

/*OpenRouteService*/
const ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjBlZGYxOGVmNTViMTQxM2RiYmYzNGZiMmJhMzc4OGYzIiwiaCI6Im11cm11cjY0In0=";
var routeLayer = L.layerGroup().addTo(map);
var userLocationMarker = null;
var temporaryMarker = null;
var markerModeActive = false;


setTimeout(function() {
    map.invalidateSize();
}, 100);

window.addEventListener('resize', function() {
    map.invalidateSize();
});

map.on('click', function(e) {
    if (!markerModeActive) return;
    
    var coordinates = e.latlng;
    
    document.getElementById('latitude').value = coordinates.lat.toFixed(6);
    document.getElementById('longitude').value = coordinates.lng.toFixed(6);
    
    if (temporaryMarker) {
        map.removeLayer(temporaryMarker);
    }
    
    temporaryMarker = L.marker([coordinates.lat, coordinates.lng]).addTo(map);
});

//Obtener ubicacion
function getUserLocation() {
    if (!navigator.geolocation) {
        alert("Tu navegador no soporta geolocalización.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            if (userLocationMarker) {
                map.removeLayer(userLocationMarker);
            }

            var userIcon = L.divIcon({
                className: 'user-location-icon',
                html: '<div class="user-location-dot"></div>',
                iconSize: [22, 22],
                iconAnchor: [11, 11],
                popupAnchor: [0, -11]
            });

            userLocationMarker = L.marker([lat, lng], {
                icon: userIcon,
                zIndexOffset: 1000
            }).addTo(map);

            map.flyTo([lat, lng], 15, {
                duration: 1.5
            });
        },
        function(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("Debes permitir el acceso a tu ubicación.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("No se pudo obtener tu ubicación.");
                    break;
                case error.TIMEOUT:
                    alert("Se agotó el tiempo para obtener tu ubicación.");
                    break;
                default:
                    alert("Ocurrió un error al obtener tu ubicación.");
            }
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

// Calcula la ruta con Openrouteservice.
function calculateRoute(originLat, originLng, destinationLat, destinationLng, profile) {
    var url = "https://api.heigit.org/openrouteservice/v2/directions/" + profile + "/geojson";

    var requestData = {
        coordinates: [
            [originLng, originLat],
            [destinationLng, destinationLat]
        ],
        instructions: true,
        units: "km",
        language: "es"
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": ORS_API_KEY
        },
        body: JSON.stringify(requestData)
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }
        return response.json();
    })
    .then(function(data) {
        console.log("Respuesta ORS:", data);
        routeLayer.clearLayers();

        var route = L.geoJSON(data, {
            style: {
                weight: 6,
                opacity: 0.8
            }
        }).addTo(routeLayer);

        map.fitBounds(route.getBounds(), {
            padding: [40, 40]
        });

        if (data.features && data.features.length > 0 && 
            data.features[0].properties && data.features[0].properties.summary) {
            var summary = data.features[0].properties.summary;
            var distance = summary.distance;
            var duration = summary.duration;
            var minutes = Math.round(duration / 60);

            alert(
                "Ruta calculada\n\n" +
                "Distancia: " + distance.toFixed(2) + " km\n" +
                "Tiempo aproximado: " + minutes + " minutos"
            );
        }
    })
    .catch(function(error) {
        console.error("Error ORS:", error);
        alert("No se pudo calcular la ruta.\n\n" + "Revisa tu API Key y la conexión a Internet.");
    });
}

function clearRoute() {
    routeLayer.clearLayers();
    alert("Ruta eliminada.");
}

function routeToMarker(index, profile) {
    var marker = markers[index];

    if (!marker) {
        alert("No se encontró el local.");
        return;
    }

    if (!navigator.geolocation) {
        alert("Tu navegador no soporta geolocalización.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function(position) {
            var originLat = position.coords.latitude;
            var originLng = position.coords.longitude;

            var destinationLat = parseFloat(marker.lat);
            var destinationLng = parseFloat(marker.lng);

            calculateRoute(originLat, originLng, destinationLat, destinationLng, profile);
        },
        function(error) {
            if (error.code === error.PERMISSION_DENIED) {
                alert("Necesitamos permiso para obtener tu ubicación y calcular la ruta.");
            } else {
                alert("No fue posible obtener tu ubicación.");
            }
        }
    );
}


function saveMarker() {
    var placeName = document.getElementById('placeName').value;
    var placeType = document.getElementById('placeType').value;
    var placeDescription = document.getElementById('placeDescription').value;
    var placeAddress = document.getElementById('placeAddress').value;
    var placePhone = document.getElementById('placePhone').value;
    var placeFacebook = document.getElementById('placeFacebook').value;
    var placeInstagram = document.getElementById('placeInstagram').value;
    var placeTwitter = document.getElementById('placeTwitter').value;
    var latitude = document.getElementById('latitude').value;
    var longitude = document.getElementById('longitude').value;

    if (placeName && latitude && longitude) {
        var marker = {
            name: placeName,
            type: placeType || 'Otro',
            description: placeDescription || 'Sin descripción',
            address: placeAddress || '',
            image: currentPlaceImageBase64 || '',
            phone: placePhone || 'No especificado',
            facebook: placeFacebook || '',
            instagram: placeInstagram || '',
            twitter: placeTwitter || '',
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
            reviews: []
        };

        markers.push(marker);
        updateMarkedLocations();
        
        if (temporaryMarker) {
            map.removeLayer(temporaryMarker);
            temporaryMarker = null;
        }

        markerModeActive = false;
        var markerBtn = document.querySelector('.leaflet-control-marker-btn');
        if (markerBtn) {
            markerBtn.classList.remove('active');
            markerBtn.title = 'Colocar marcador en el mapa';
        }
        document.getElementById('map').style.cursor = '';

        document.getElementById('placeName').value = '';
        document.getElementById('placeType').value = '';
        document.getElementById('placeDescription').value = '';
        document.getElementById('placeAddress').value = '';
        document.getElementById('placePhone').value = '';
        document.getElementById('placeFacebook').value = '';
        document.getElementById('placeInstagram').value = '';
        document.getElementById('placeTwitter').value = '';
        document.getElementById('latitude').value = '';
        document.getElementById('longitude').value = '';
        
        currentPlaceImageBase64 = null;
        document.getElementById('placeImage').value = '';
        document.getElementById('imagePreviewContainer').style.display = 'none';
        document.getElementById('imagePreview').src = '';
        
        alert('¡Local promocionado exitosamente!');
    } else {
        alert('Debes llenar al menos el nombre y hacer clic en el mapa para obtener coordenadas');
    }
}

function updateMarkedLocations() {
    var markedLocationsList = document.getElementById('markedLocations');
    markedLocationsList.innerHTML = '';

    markerObjects.forEach(function(markerObj) {
        map.removeLayer(markerObj);
    });
    markerObjects = [];

    markers.forEach(function(marker, index) {
        var listItem = document.createElement('li');
        listItem.innerHTML = `
            <div>
                <span>${marker.name}</span>
                <div class="list-buttons">
                    <button class="btn-delete" onclick="openDeleteModal(${index})">Delete</button>
                    <button class="btn-mod" onclick="openConfirmModal(${index})">Mod</button>
                    <button onclick="viewLocation(${index})">Ver</button>
                </div>
            </div>
        `;
        markedLocationsList.appendChild(listItem);

        var placeData = {
            name: marker.name,
            category: marker.type || 'Local promocionado',
            address: marker.address || '',
            website: '',
            phone: marker.phone || '',
            hours: '',
            image: marker.image || '',
            description: marker.description || '',
            lat: marker.lat,
            lng: marker.lng,
            facebook: marker.facebook || '',
            instagram: marker.instagram || '',
            twitter: marker.twitter || '',
            isSearchResult: false,
            reviews: marker.reviews || []
        };

        var markerObj = L.marker([marker.lat, marker.lng]).addTo(map);
        
        markerObj._placeData = placeData;
        markerObj._markerIndex = index;
        
        markerObjects.push(markerObj);
    });
}

function viewLocation(index) {
    var marker = markers[index];
    if (!marker) return;
    
    var targetMarkerObj = null;
    for (var i = 0; i < markerObjects.length; i++) {
        var latLng = markerObjects[i].getLatLng();
        if (latLng.lat === parseFloat(marker.lat) && latLng.lng === parseFloat(marker.lng)) {
            targetMarkerObj = markerObjects[i];
            break;
        }
    }
    
    if (!targetMarkerObj) return;
    
    // Refrescar los datos del marcador desde el array markers
    targetMarkerObj._placeData = {
        name: marker.name,
        category: marker.type || 'Local promocionado',
        address: marker.address || '',
        website: '',
        phone: marker.phone || '',
        hours: '',
        image: marker.image || '',
        description: marker.description || '',
        lat: marker.lat,
        lng: marker.lng,
        facebook: marker.facebook || '',
        instagram: marker.instagram || '',
        twitter: marker.twitter || '',
        isSearchResult: false,
        reviews: marker.reviews || []
    };
    
    var placeData = targetMarkerObj._placeData;
    var popupContent = buildPlaceCardHTML(placeData);
    
    // Extraer el cardId generado
    var cardIdMatch = popupContent.match(/data-card-id="([^"]+)"/);
    var cardId = cardIdMatch ? cardIdMatch[1] : null;
    
    targetMarkerObj.bindPopup(popupContent, {
        maxWidth: 380,
        minWidth: 340,
        className: 'popup-container place-card-popup'
    });
    
    // Escuchar cuando el popup se abra para asignar los listeners
    targetMarkerObj.on('popupopen', function() {
        if (cardId) {
            setupCardEventPropagation(cardId);
        }
    });
    
    map.flyTo([marker.lat, marker.lng], 15, {
        duration: 1.2
    });
    
    setTimeout(function() {
        targetMarkerObj.openPopup();
    }, 1200);
}

/* ========== FUNCIONES DE MODIFICACIÓN ========== */

function openConfirmModal(index) {
    currentEditIndex = index;
    document.getElementById('confirmModal').classList.add('show');
}

function closeConfirmModal() {
    document.getElementById('confirmModal').classList.remove('show');
    currentEditIndex = -1;
}

function confirmModify() {
    document.getElementById('confirmModal').classList.remove('show');
    
    if (currentEditIndex === -1) return;
    
    var marker = markers[currentEditIndex];
    
    document.getElementById('editPlaceName').value = marker.name;
    document.getElementById('editPlaceType').value = marker.type || '';
    document.getElementById('editPlaceDescription').value = marker.description;
    document.getElementById('editPlaceAddress').value = marker.address || '';
    document.getElementById('editPlacePhone').value = marker.phone;
    document.getElementById('editPlaceFacebook').value = marker.facebook || '';
    document.getElementById('editPlaceInstagram').value = marker.instagram || '';
    document.getElementById('editPlaceTwitter').value = marker.twitter || '';
    document.getElementById('editLatitude').value = marker.lat;
    document.getElementById('editLongitude').value = marker.lng;
    
    currentEditImageBase64 = marker.image || null;
    var editImagePreviewContainer = document.getElementById('editImagePreviewContainer');
    var editImagePreview = document.getElementById('editImagePreview');
    if (marker.image) {
        editImagePreview.src = marker.image;
        editImagePreviewContainer.style.display = 'block';
    } else {
        editImagePreview.src = '';
        editImagePreviewContainer.style.display = 'none';
    }
    document.getElementById('editPlaceImage').value = '';
    
    document.getElementById('editModal').classList.add('show');
}

function closeEditModal() {
    document.getElementById('editModal').classList.remove('show');
    currentEditIndex = -1;
}

function applyChanges() {
    if (currentEditIndex === -1) return;
    
    var editName = document.getElementById('editPlaceName').value;
    
    if (!editName) {
        alert('El nombre del local no puede estar vacío');
        return;
    }
    
    markers[currentEditIndex] = {
        name: editName,
        type: document.getElementById('editPlaceType').value || 'Otro',
        description: document.getElementById('editPlaceDescription').value || 'Sin descripción',
        address: document.getElementById('editPlaceAddress').value || '',
        image: currentEditImageBase64 || '',
        phone: document.getElementById('editPlacePhone').value || 'No especificado',
        facebook: document.getElementById('editPlaceFacebook').value || '',
        instagram: document.getElementById('editPlaceInstagram').value || '',
        twitter: document.getElementById('editPlaceTwitter').value || '',
        lat: document.getElementById('editLatitude').value,
        lng: document.getElementById('editLongitude').value,
        reviews: markers[currentEditIndex].reviews || []
    };
    
    updateMarkedLocations();
    
    document.getElementById('editModal').classList.remove('show');
    currentEditIndex = -1;
    
    currentEditImageBase64 = null;
    
    alert('¡Local modificado exitosamente!');
}

/* ========== FUNCIONES DE ELIMINACIÓN ========== */

function openDeleteModal(index) {
    currentDeleteIndex = index;
    document.getElementById('deleteModal').classList.add('show');
}

function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('show');
    currentDeleteIndex = -1;
}

function confirmDelete() {
    if (currentDeleteIndex === -1) return;
    
    markers.splice(currentDeleteIndex, 1);
    
    updateMarkedLocations();
    
    document.getElementById('deleteModal').classList.remove('show');
    currentDeleteIndex = -1;
    
    alert('¡Local eliminado exitosamente!');
}


/* ============================================================
   FUNCIONES PARA MANEJO DE IMÁGENES
   ============================================================ */

function previewPlaceImage(event) {
    var file = event.target.files[0];
    if (!file) return;
    
    var reader = new FileReader();
    reader.onload = function(e) {
        currentPlaceImageBase64 = e.target.result;
        document.getElementById('imagePreview').src = e.target.result;
        document.getElementById('imagePreviewContainer').style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function removePlaceImage() {
    currentPlaceImageBase64 = null;
    document.getElementById('placeImage').value = '';
    document.getElementById('imagePreview').src = '';
    document.getElementById('imagePreviewContainer').style.display = 'none';
}

function previewEditPlaceImage(event) {
    var file = event.target.files[0];
    if (!file) return;
    
    var reader = new FileReader();
    reader.onload = function(e) {
        currentEditImageBase64 = e.target.result;
        document.getElementById('editImagePreview').src = e.target.result;
        document.getElementById('editImagePreviewContainer').style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function removeEditPlaceImage() {
    currentEditImageBase64 = null;
    document.getElementById('editPlaceImage').value = '';
    document.getElementById('editImagePreview').src = '';
    document.getElementById('editImagePreviewContainer').style.display = 'none';
}


/*CONSTRUCTOR DE LA TARJETA GRANDE (PLACE CARD) */

function buildPlaceCardHTML(data) {
    var imageHTML = '';
    if (data.image) {
        imageHTML = `<img src="${data.image}" alt="${data.name}" class="place-card-image" onerror="this.onerror=null; this.src='../ASSETS/img/ISOTIPOGONIC.png'; this.classList.add('place-card-logo');">`;
    } else {
        imageHTML = `<img src="../ASSETS/img/ISOTIPOGONIC.png" alt="${data.name}" class="place-card-image place-card-logo">`;
    }
    
    var descriptionHTML = data.description 
        ? `<p class="place-card-description">${data.description}</p>` 
        : '';
    
    var addressHTML = data.address 
        ? `<li><i class="fas fa-map-marker-alt"></i><span>${data.address}</span></li>` 
        : '';
    
    var websiteHTML = data.website 
        ? `<li><i class="fas fa-globe"></i><a href="${data.website}" target="_blank">${data.website}</a></li>` 
        : '';
    
    var socialHTML = '';
    if (data.facebook) {
        socialHTML += `<li><i class="fab fa-facebook"></i><a href="https://facebook.com/${data.facebook.replace('@','')}" target="_blank">${data.facebook}</a></li>`;
    }
    if (data.instagram) {
        socialHTML += `<li><i class="fab fa-instagram"></i><a href="https://instagram.com/${data.instagram.replace('@','')}" target="_blank">${data.instagram}</a></li>`;
    }
    if (data.twitter) {
        socialHTML += `<li><i class="fab fa-twitter"></i><a href="https://twitter.com/${data.twitter.replace('@','')}" target="_blank">${data.twitter}</a></li>`;
    }
    
    var phoneHTML = data.phone 
        ? `<li><i class="fas fa-phone"></i><span>${data.phone}</span></li>` 
        : '';
    
    var hoursHTML = data.hours 
        ? `<li><i class="fas fa-clock"></i><span>${data.hours}</span></li>` 
        : '';
    
    // UNA SOLA DECLARACIÓN de cardId
    var cardId = 'place-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    window.__placeCards = window.__placeCards || {};
    window.__placeCards[cardId] = data;
    window.__lastCardId = cardId;
    
    // Construir el HTML de las reseñas CON este cardId
    var reviewsHTML = buildReviewsTabHTML(cardId, data.reviews || []);
    

    return `
        <div class="place-card" data-card-id="${cardId}">
            <div class="place-card-header">
                ${imageHTML}
            </div>
            
            <div class="place-card-body">
                <h3 class="place-card-name">${data.name}</h3>
                <p class="place-card-category">
                    <i class="fas fa-tag"></i> ${data.category || 'Lugar'}
                </p>
                
                ${descriptionHTML}
                
                    <div class="place-card-tabs">
                    <button class="place-card-tab active" data-action="switch-tab" data-tab="general" data-card-id="${cardId}">
                        <i class="fas fa-info-circle"></i> General
                    </button>
                    <button class="place-card-tab" data-action="switch-tab" data-tab="reviews" data-card-id="${cardId}">
                        <i class="fas fa-star"></i> Reseñas
                    </button>
                </div>
                
                <div class="place-card-tab-content" data-tab-content="general">
                    <div class="place-card-section">
                        <h4 class="place-card-section-title">Cómo llegar</h4>
                        <div class="route-buttons">
                            <button onclick="routeFromCard('${cardId}', 'driving-car')">
                                <i class="fas fa-car"></i> Auto
                            </button>
                            <button onclick="routeFromCard('${cardId}', 'cycling-regular')">
                                <i class="fas fa-bicycle"></i> Bicicleta
                            </button>
                            <button onclick="routeFromCard('${cardId}', 'foot-walking')">
                                <i class="fas fa-walking"></i> Caminando
                            </button>
                        </div>
                    </div>
                    
                    <div class="place-card-section">
                        <h4 class="place-card-section-title">Información</h4>
                        <ul class="place-card-info-list">
                            ${addressHTML}
                            ${websiteHTML}
                            ${socialHTML}
                            ${phoneHTML}
                            ${hoursHTML}
                            ${!addressHTML && !websiteHTML && !socialHTML && !phoneHTML && !hoursHTML ? '<li class="place-card-no-info">No hay información adicional disponible</li>' : ''}
                        </ul>
                    </div>
                </div>
                
                <div class="place-card-tab-content" data-tab-content="reviews" style="display: none;">
                    <div id="reviews-container-${cardId}">
                        ${reviewsHTML}
                    </div>
                </div>
            </div>
        </div>
    `;
}

/*CONSTRUCTOR DE LA PESTAÑA DE RESEÑAS*/

function buildReviewsTabHTML(cardId, reviews) {
    var headerHTML = `
        <div class="reviews-header">
            <h4>Reseñas</h4>
            <button class="btn-add-review" data-action="add-review" data-card-id="${cardId}">
                <i class="fas fa-plus"></i> Añadir reseña
            </button>
        </div>
    `;
    
    if (!reviews || reviews.length === 0) {
        return headerHTML + `
            <div class="reviews-empty">
                <i class="fas fa-comment-slash"></i>
                <p>Aún no hay reseñas.<br>¡Sé el primero en dejar una!</p>
            </div>
        `;
    }
    
    var total = reviews.length;
    var sum = reviews.reduce(function(acc, r) { return acc + r.rating; }, 0);
    var average = (sum / total).toFixed(1);
    
    var distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(function(r) {
        distribution[r.rating]++;
    });
    
    var avgStars = '';
    for (var i = 1; i <= 5; i++) {
        if (i <= Math.round(average)) {
            avgStars += '<i class="fas fa-star"></i>';
        } else {
            avgStars += '<i class="far fa-star"></i>';
        }
    }
    
    var chartRows = '';
    for (var star = 5; star >= 1; star--) {
        var count = distribution[star];
        var percent = total > 0 ? (count / total) * 100 : 0;
        chartRows += `
            <div class="reviews-chart-row">
                <span class="chart-label">${star}★</span>
                <div class="chart-bar-bg">
                    <div class="chart-bar-fill" style="width: ${percent}%"></div>
                </div>
                <span class="chart-count">${count}</span>
            </div>
        `;
    }
    
    var sortedReviews = reviews.slice().sort(function(a, b) {
        return b.timestamp - a.timestamp;
    });
    
    var reviewsListHTML = sortedReviews.map(function(review) {
        var starsHTML = '';
        for (var i = 1; i <= 5; i++) {
            starsHTML += i <= review.rating 
                ? '<i class="fas fa-star"></i>' 
                : '<i class="far fa-star"></i>';
        }
        
        var timeAgo = getTimeAgo(review.timestamp);
        var imageHTML = review.image 
            ? `<img src="${review.image}" class="review-image-thumb" data-action="view-image" data-image="${review.image}" alt="Imagen de la reseña">` 
            : '';
        
        var likeClass = review.userLiked ? 'liked' : '';
        
        return `
            <div class="review-item" data-review-id="${review.id}">
                <div class="review-header">
                    <img src="${review.userAvatar}" class="review-avatar" alt="${review.userName}">
                    <div class="review-meta">
                        <p class="review-name">${review.userName}</p>
                        <p class="review-time">${timeAgo}</p>
                    </div>
                    <div class="review-stars">${starsHTML}</div>
                </div>
                ${review.text ? `<p class="review-text">${review.text}</p>` : ''}
                ${imageHTML}
                <div class="review-footer">
                    <button class="review-like-btn ${likeClass}" data-action="toggle-like" data-card-id="${cardId}" data-review-id="${review.id}">
                        <i class="fas fa-thumbs-up"></i>
                        <span>Me gusta${review.likes > 0 ? ' · ' + review.likes : ''}</span>
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    return headerHTML + `
        <div class="reviews-summary">
            <div class="reviews-average">
                <div class="reviews-average-number">${average}</div>
                <div class="reviews-average-stars">${avgStars}</div>
                <div class="reviews-average-count">${total} reseña${total !== 1 ? 's' : ''}</div>
            </div>
            <div class="reviews-chart">
                ${chartRows}
            </div>
        </div>
        <div class="reviews-list">
            ${reviewsListHTML}
        </div>
    `;
}

/* Calcula el tiempo relativo (hace 5 min, hace 2 días, etc.) */
function getTimeAgo(timestamp) {
    var now = Date.now();
    var diff = now - timestamp;
    
    var seconds = Math.floor(diff / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    var months = Math.floor(days / 30);
    var years = Math.floor(days / 365);
    
    if (seconds < 60) return 'Hace unos segundos';
    if (minutes < 60) return 'Hace ' + minutes + ' min';
    if (hours < 24) return 'Hace ' + hours + ' hora' + (hours !== 1 ? 's' : '');
    if (days < 30) return 'Hace ' + days + ' día' + (days !== 1 ? 's' : '');
    if (months < 12) return 'Hace ' + months + ' mes' + (months !== 1 ? 'es' : '');
    return 'Hace ' + years + ' año' + (years !== 1 ? 's' : '');
}

/* ============================================================
   MODAL DE NUEVA RESEÑA
   ============================================================ */

function openReviewModal(cardId) {
    var data = window.__placeCards && window.__placeCards[cardId];
    if (!data) {
        alert('No se encontró la información del lugar');
        return;
    }
    
    currentReviewCardId = cardId;
    currentReviewRating = 0;
    currentReviewImageBase64 = null;
    
    // Cargar título del local
    document.getElementById('reviewModalTitle').textContent = 'Reseñar: ' + data.name;
    
    // Resetear formulario
    document.getElementById('reviewText').value = '';
    document.getElementById('reviewRating').value = '0';
    document.getElementById('reviewImage').value = '';
    document.getElementById('reviewImagePreviewContainer').style.display = 'none';
    document.getElementById('reviewImagePreview').src = '';
    
    // Resetear estrellas
    var stars = document.querySelectorAll('#reviewStarSelector i');
    stars.forEach(function(star) {
        star.classList.remove('selected', 'hovered');
    });
    
    // Cargar avatar y nombre del usuario
    var navbarAvatar = document.getElementById('navbarUserAvatar');
    var navbarName = document.getElementById('navbarUserName');
    if (navbarAvatar) {
        document.getElementById('reviewUserAvatar').src = navbarAvatar.src;
    }
    if (navbarName) {
        document.getElementById('reviewUserName').textContent = navbarName.textContent;
    }
    
    document.getElementById('reviewModal').classList.add('show');
    
    // Configurar eventos de estrellas (solo la primera vez)
    setupReviewStarEvents();
}

function setupReviewStarEvents() {
    var starSelector = document.getElementById('reviewStarSelector');
    if (!starSelector || starSelector.dataset.eventsSetup === 'true') return;
    
    var stars = starSelector.querySelectorAll('i');
    
    stars.forEach(function(star) {
        star.addEventListener('mouseenter', function() {
            var value = parseInt(this.getAttribute('data-value'));
            stars.forEach(function(s) {
                var v = parseInt(s.getAttribute('data-value'));
                s.classList.toggle('hovered', v <= value);
            });
        });
        
        star.addEventListener('click', function() {
            var value = parseInt(this.getAttribute('data-value'));
            currentReviewRating = value;
            document.getElementById('reviewRating').value = value;
            
            stars.forEach(function(s) {
                var v = parseInt(s.getAttribute('data-value'));
                s.classList.toggle('selected', v <= value);
            });
        });
    });
    
    starSelector.addEventListener('mouseleave', function() {
        stars.forEach(function(s) {
            s.classList.remove('hovered');
        });
    });
    
    starSelector.dataset.eventsSetup = 'true';
}

function closeReviewModal() {
    document.getElementById('reviewModal').classList.remove('show');
    currentReviewCardId = null;
    currentReviewRating = 0;
    currentReviewImageBase64 = null;
}

function previewReviewImage(event) {
    var file = event.target.files[0];
    if (!file) return;
    
    var reader = new FileReader();
    reader.onload = function(e) {
        currentReviewImageBase64 = e.target.result;
        document.getElementById('reviewImagePreview').src = e.target.result;
        document.getElementById('reviewImagePreviewContainer').style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function removeReviewImage() {
    currentReviewImageBase64 = null;
    document.getElementById('reviewImage').value = '';
    document.getElementById('reviewImagePreview').src = '';
    document.getElementById('reviewImagePreviewContainer').style.display = 'none';
}

function publishReview() {
    if (!currentReviewCardId) return;
    
    if (currentReviewRating === 0) {
        alert('Por favor selecciona una calificación con las estrellas');
        return;
    }
    
    var text = document.getElementById('reviewText').value.trim();
    if (!text) {
        alert('Por favor escribe tu reseña');
        return;
    }
    
    var data = window.__placeCards[currentReviewCardId];
    if (!data) return;
    
    // Inicializar array de reseñas si no existe
    if (!data.reviews) data.reviews = [];
    
    // Tomar nombre y avatar del navbar
    var navbarName = document.getElementById('navbarUserName');
    var navbarAvatar = document.getElementById('navbarUserAvatar');
    
    var newReview = {
        id: 'review-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        userName: navbarName ? navbarName.textContent : 'Pepito',
        userAvatar: navbarAvatar ? navbarAvatar.src : '../ASSETS/img/ISOTIPOGONIC.png',
        rating: currentReviewRating,
        text: text,
        image: currentReviewImageBase64 || null,
        timestamp: Date.now(),
        likes: 0,
        userLiked: false
    };
    
    data.reviews.push(newReview);
    
    //SINCRONIZAR CON markers[]
    // Buscar el marcador correspondiente por lat/lng y actualizar sus reseñas
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].lat === data.lat && markers[i].lng === data.lng) {
            if (!markers[i].reviews) markers[i].reviews = [];
            // Reemplazar el array completo para mantener sincronización
            markers[i].reviews = data.reviews;
            break;
        }
    }
    
    // Refrescar la pestaña de reseñas en el DOM
    refreshReviewsTab(currentReviewCardId);
    
    // Cerrar modal
    closeReviewModal();
}

function refreshReviewsTab(cardId) {
    var data = window.__placeCards[cardId];
    if (!data) return;
    
    var reviewsContainer = document.getElementById('reviews-container-' + cardId);
    if (!reviewsContainer) return;
    
    reviewsContainer.innerHTML = buildReviewsTabHTML(cardId, data.reviews || []);
    
    // Reasignar listeners a los nuevos botones
    setTimeout(function() {
        setupCardEventPropagation(cardId);
    }, 50);
}

/*ME GUSTA EN RESEÑAS*/

function toggleReviewLike(cardId, reviewId) {
    var data = window.__placeCards[cardId];
    if (!data || !data.reviews) return;
    
    var review = data.reviews.find(function(r) { return r.id === reviewId; });
    if (!review) return;
    
    if (review.userLiked) {
        review.userLiked = false;
        review.likes = Math.max(0, review.likes - 1);
    } else {
        review.userLiked = true;
        review.likes++;
    }
    
    // Sincronizar con markers[]
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].lat === data.lat && markers[i].lng === data.lng) {
            markers[i].reviews = data.reviews;
            break;
        }
    }
    
    // Refrescar la pestaña para reflejar el cambio
    refreshReviewsTab(cardId);
}

/*VISOR DE IMÁGENES*/

function openImageViewer(src) {
    document.getElementById('imageViewerImg').src = src;
    document.getElementById('imageViewerModal').classList.add('show');
}

function closeImageViewer() {
    document.getElementById('imageViewerModal').classList.remove('show');
    document.getElementById('imageViewerImg').src = '';
}


/* ============================================================
   FUNCIONES DE TARJETA GRANDE
   ============================================================ */

function switchPlaceCardTab(cardId, tabName) {
    var cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
    if (!cardElement) return;
    
    var tabs = cardElement.querySelectorAll('.place-card-tab');
    tabs.forEach(function(tab) {
        tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
    });
    
    var contents = cardElement.querySelectorAll('.place-card-tab-content');
    contents.forEach(function(content) {
        content.style.display = content.getAttribute('data-tab-content') === tabName ? 'block' : 'none';
    });
}

function routeFromCard(cardId, profile) {
    var data = window.__placeCards && window.__placeCards[cardId];
    if (!data) {
        alert('No se encontró la información del lugar');
        return;
    }
    
    if (!navigator.geolocation) {
        alert("Tu navegador no soporta geolocalización.");
        return;
    }
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            calculateRoute(
                position.coords.latitude,
                position.coords.longitude,
                data.lat,
                data.lng,
                profile
            );
        },
        function(error) {
            alert("No se pudo obtener tu ubicación para calcular la ruta.");
        }
    );
}


/* ============================================================
   DESTINO DESDE INDEX.HTML (localStorage)
   ============================================================ */
window.addEventListener('load', function() {
    var destinoGuardado = localStorage.getItem('destinoRuta');
    
    if (!destinoGuardado) return;
    
    var destino;
    try {
        destino = JSON.parse(destinoGuardado);
    } catch (e) {
        console.error('Error al leer destinoRuta:', e);
        localStorage.removeItem('destinoRuta');
        return;
    }
    
    if (!destino.lat || !destino.lng) {
        localStorage.removeItem('destinoRuta');
        return;
    }
    
    var destinoLatLng = L.latLng(parseFloat(destino.lat), parseFloat(destino.lng));
    
    var hotelMarker = L.marker(destinoLatLng).addTo(map);
    
    var popupContent = `
        <div class="custom-popup">
            <img src="${destino.imagen || 'https://via.placeholder.com/300x200?text=Sin+Imagen'}" 
                alt="${destino.nombre}" 
                class="popup-image" 
                onerror="this.src='https://via.placeholder.com/300x200?text=Sin+Imagen'">
            <div class="popup-content">
                <h3 class="popup-name">${destino.nombre}</h3>
                <p class="popup-description">${destino.ubicacion || ''}</p>
                <div class="route-buttons">
                    <button onclick="routeFromHotel('driving-car')">
                        <i class="fas fa-car"></i> Cómo llegar
                    </button>
                    <button onclick="routeFromHotel('foot-walking')">
                        <i class="fas fa-walking"></i> Caminar
                    </button>
                    <button onclick="routeFromHotel('cycling-regular')">
                        <i class="fas fa-bicycle"></i> Bicicleta
                    </button>
                </div>
            </div>
        </div>
    `;
    
    hotelMarker.bindPopup(popupContent, {
        maxWidth: 320,
        className: 'popup-container'
    });
    
    window.__hotelDestinoLatLng = destinoLatLng;
    
    window.routeFromHotel = function(profile) {
        if (!navigator.geolocation) {
            alert("Tu navegador no soporta geolocalización.");
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            function(position) {
                calculateRoute(
                    position.coords.latitude,
                    position.coords.longitude,
                    destinoLatLng.lat,
                    destinoLatLng.lng,
                    profile
                );
            },
            function(error) {
                alert("No se pudo obtener tu ubicación para calcular la ruta.");
            }
        );
    };
    
    hotelMarker.closePopup();
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                calculateRoute(
                    position.coords.latitude,
                    position.coords.longitude,
                    destinoLatLng.lat,
                    destinoLatLng.lng,
                    destino.perfil || 'driving-car'
                );
            },
            function(error) {
                console.warn('Sin geolocalización, mostrando solo el destino.');
                map.setView(destinoLatLng, 15);
            }
        );
    }
    
    localStorage.removeItem('destinoRuta');
});

/*EVITAR QUE EL CLIC EN LA TARJETA CIERRE EL POPUP*/

/*EVITAR QUE EL CLIC EN LA TARJETA CIERRE EL POPUP Y ASIGNAR LISTENERS DIRECTOS*/

function setupCardEventPropagation(cardId) {
    var cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
    if (!cardElement) return;
    
    // Evitar que los clics de la tarjeta lleguen al mapa
    L.DomEvent.disableClickPropagation(cardElement);
    L.DomEvent.disableScrollPropagation(cardElement);
    
    // Listeners directos a las pestañas
    cardElement.querySelectorAll('[data-action="switch-tab"]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var tabName = btn.getAttribute('data-tab');
            switchPlaceCardTab(cardId, tabName);
        });
    });
    
    // Listener al botón "Añadir reseña"
    cardElement.querySelectorAll('[data-action="add-review"]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openReviewModal(cardId);
        });
    });
    
    // Listeners a los botones "Me gusta"
    cardElement.querySelectorAll('[data-action="toggle-like"]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var reviewId = btn.getAttribute('data-review-id');
            toggleReviewLike(cardId, reviewId);
        });
    });
    
    // Listeners a las miniaturas de imágenes
    cardElement.querySelectorAll('[data-action="view-image"]').forEach(function(thumb) {
        thumb.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var imageSrc = thumb.getAttribute('data-image');
            openImageViewer(imageSrc);
        });
    });
}

/*MANEJADOR GLOBAL DE EVENTOS DE LA TARJETA*/