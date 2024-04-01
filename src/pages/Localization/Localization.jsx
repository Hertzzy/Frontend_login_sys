import { useEffect, useState } from 'react';

const Localization = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    googleMapScript.onload = () => setMapLoaded(true);
    document.body.appendChild(googleMapScript);
  }, []);

  useEffect(() => {
    if (mapLoaded) {
      // Aqui você pode adicionar o código para inicializar o mapa do Google
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: -23.55052, lng: -46.633308 }, // Coordenadas de São Paulo como exemplo
        zoom: 12
      });

      // Aqui você pode adicionar um marcador para a localização da empresa
      const marker = new window.google.maps.Marker({
        position: { lat: -23.55052, lng: -46.633308 }, // Coordenadas de São Paulo como exemplo
        map: map,
        title: 'Local da Empresa'
      });
    }
  }, [mapLoaded]);

  return (
    <div>
      <h1>Localização da Empresa</h1>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default Localization;
