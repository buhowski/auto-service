import { Map, Marker, NavigationControl, setWorkerUrl } from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import 'maplibre-gl/dist/maplibre-gl.css';

setWorkerUrl(workerUrl);

const localDay = new Intl.DateTimeFormat('en-US', {
	weekday: 'short',
	timeZone: 'Europe/Kyiv',
}).format(new Date());
const dayIndexes: Record<string, number> = {
	Mon: 1,
	Tue: 2,
	Wed: 3,
	Thu: 4,
	Fri: 5,
	Sat: 6,
	Sun: 0,
};
const todayIndex = dayIndexes[localDay];
document.querySelector(`.hours-table [data-day="${todayIndex}"]`)?.classList.add('today');

const mapContainer = document.querySelector<HTMLDivElement>('[data-visit-map]');

if (mapContainer) {
	const lat = Number(mapContainer.dataset.lat);
	const lng = Number(mapContainer.dataset.lng);

	if (Number.isFinite(lat) && Number.isFinite(lng)) {
		const initMap = () => {
			const map = new Map({
				container: mapContainer,
				style: 'https://tiles.openfreemap.org/styles/fiord',
				center: [lng, lat],
				zoom: 16,
			});

			map.addControl(new NavigationControl({ showCompass: false }), 'top-right');

			new Marker().setLngLat([lng, lat]).addTo(map);
		};

		if ('IntersectionObserver' in window) {
			const observer = new IntersectionObserver(
				(entries) => {
					if (entries.some((entry) => entry.isIntersecting)) {
						observer.disconnect();
						initMap();
					}
				},
				{ rootMargin: '200px' },
			);
			observer.observe(mapContainer);
		} else {
			initMap();
		}
	}
}
