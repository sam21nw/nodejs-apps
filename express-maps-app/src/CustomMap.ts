import { Loader } from '@googlemaps/js-api-loader';
import '../env-config';

const loader = new Loader({
    apiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    version: 'weekly',
    libraries: ['places']
});

export interface Mappable {
    location: {
        lat: number,
        lng: number
    };
    color: string,

    markerContent(): string;
}

const mapOptions = {
    center: {
        lat: 0,
        lng: 0
    },
    zoom: 1,
    mapId: 'DEMO_MAP_ID'
};

export class CustomMap {
    private readonly googleMap: Promise<google.maps.Map | null>;

    constructor(divId: string) {
        this.googleMap = loader
            .importLibrary('maps')
            .then(async ({ Map }) => {
                const mapEl = document.getElementById(divId) as HTMLElement;
                if (!mapEl) {
                    throw new Error('Map container element not found');
                }
                return new Map(mapEl, mapOptions);
            })
            .catch((error) => {
                console.error('Error loading Google Maps:', error);
                return null;
            });
    }

    async addMarker(mark: Mappable) {
        const map = await this.googleMap;
        if (!map) {
            console.error('Map is not available');
            return;
        }

        try {
            const marker = await loader.importLibrary('marker');
            const { AdvancedMarkerElement } = marker;
            const advancedMarker = new AdvancedMarkerElement({
                map,
                position: { lat: mark.location.lat, lng: mark.location.lng }
            });
            advancedMarker.addListener('click', () => {
                const infoWindow = new google.maps.InfoWindow({
                    content: mark.markerContent()
                });
                infoWindow.open({
                    anchor: advancedMarker,
                    map, shouldFocus: true
                });
            });
        } catch (error) {
            console.error('Error adding marker:', error);
        }
    }
}