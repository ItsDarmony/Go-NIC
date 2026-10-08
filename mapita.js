var map = L.map('map').setView([12.13282, -86.2504], 8);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var markers = [];
var markerObjects = [];

// Ajustar el tamano del mapa cuando se carga la pagina
setTimeout(function() {
    map.invalidateSize();
}, 100);

// Tambien ajustar cuando cambie el tamano de la ventana
window.addEventListener('resize', function() {
    map.invalidateSize();
});

map.on('click', function(e) {
    var coordinates = e.latlng;
    document.getElementById('latitude').value = coordinates.lat.toFixed(6);
    document.getElementById('longitude').value = coordinates.lng.toFixed(6);
});

function saveMarker() {
    var placeName = document.getElementById('placeName').value;
    var placeDescription = document.getElementById('placeDescription').value;
    var placeImage = document.getElementById('placeImage').value;
    var placePhone = document.getElementById('placePhone').value;
    var placeFacebook = document.getElementById('placeFacebook').value;
    var placeInstagram = document.getElementById('placeInstagram').value;
    var placeTwitter = document.getElementById('placeTwitter').value;
    var latitude = document.getElementById('latitude').value;
    var longitude = document.getElementById('longitude').value;

    if (placeName && latitude && longitude) {
        var marker = {
            name: placeName,
            description: placeDescription || 'Sin descripción',
            image: placeImage || 'https://via.placeholder.com/300x200?text=Sin+Imagen',
            phone: placePhone || 'No especificado',
            facebook: placeFacebook || '',
            instagram: placeInstagram || '',
            twitter: placeTwitter || '',
            lat: latitude,
            lng: longitude
        };

        markers.push(marker);
        updateMarkedLocations();
        
        // Limpiar campos
        document.getElementById('placeName').value = '';
        document.getElementById('placeDescription').value = '';
        document.getElementById('placeImage').value = '';
        document.getElementById('placePhone').value = '';
        document.getElementById('placeFacebook').value = '';
        document.getElementById('placeInstagram').value = '';
        document.getElementById('placeTwitter').value = '';
        document.getElementById('latitude').value = '';
        document.getElementById('longitude').value = '';
        
        alert('¡Local promocionado exitosamente!');
    } else {
        alert('Debes llenar al menos el nombre y hacer clic en el mapa para obtener coordenadas');
    }
}

function updateMarkedLocations() {
    var markedLocationsList = document.getElementById('markedLocations');
    markedLocationsList.innerHTML = '';

    // Limpiar marcadores anteriores
    markerObjects.forEach(function(markerObj) {
        map.removeLayer(markerObj);
    });
    markerObjects = [];

    markers.forEach(function(marker, index) {
        var listItem = document.createElement('li');
        listItem.innerHTML = `<div><span>${marker.name}</span> <button onclick="viewLocation(${marker.lat}, ${marker.lng})">Ver</button></div>`;
        markedLocationsList.appendChild(listItem);

        var popupContent = `
            <div class="custom-popup">
                <img src="${marker.image}" alt="${marker.name}" class="popup-image" onerror="this.src='https://via.placeholder.com/300x200?text=Sin+Imagen'">
                <div class="popup-content">
                    <h3 class="popup-name">${marker.name}</h3>
                    <p class="popup-description">${marker.description}</p>
                    <p class="popup-phone"><i class="fas fa-phone"></i> ${marker.phone}</p>
                    <div class="popup-social">
                        ${marker.facebook ? `<a href="#" onclick="event.preventDefault(); window.open('https://facebook.com/${marker.facebook.replace('@', '')}', '_blank')"><i class="fab fa-facebook"></i> ${marker.facebook}</a>` : ''}
                        ${marker.instagram ? `<a href="#" onclick="event.preventDefault(); window.open('https://instagram.com/${marker.instagram.replace('@', '')}', '_blank')"><i class="fab fa-instagram"></i> ${marker.instagram}</a>` : ''}
                        ${marker.twitter ? `<a href="#" onclick="event.preventDefault(); window.open('https://twitter.com/${marker.twitter.replace('@', '')}', '_blank')"><i class="fab fa-twitter"></i> ${marker.twitter}</a>` : ''}
                    </div>
                </div>
            </div>
        `;

        var markerObj = L.marker([marker.lat, marker.lng]).addTo(map)
            .bindPopup(popupContent, {
                maxWidth: 320,
                className: 'popup-container'
            });

        markerObjects.push(markerObj);
    });
}

function viewLocation(lat, lng) {
    map.panTo(new L.LatLng(lat, lng));
    
    markerObjects.forEach(function(markerObj) {
        var markerLatLng = markerObj.getLatLng();
        if (markerLatLng.lat === parseFloat(lat) && markerLatLng.lng === parseFloat(lng)) {
            markerObj.openPopup();
        }
    });
}