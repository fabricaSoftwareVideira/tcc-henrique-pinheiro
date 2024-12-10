import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { eventFormSchema } from '@/@types/event/eventFormSchema';

interface EventMapProps {
	formMethods: UseFormReturn<z.infer<typeof eventFormSchema>>;
}

export const EventMap: React.FC<EventMapProps> = ({ formMethods }) => {
	const mapRef = useRef<HTMLDivElement | null>(null);
	const mapInstanceRef = useRef<L.Map | null>(null);
	const markerRef = useRef<L.Marker | null>(null);
	const circleRef = useRef<L.Circle | null>(null);

	useEffect(() => {
		if (mapRef.current && !mapInstanceRef.current) {
			const initialCoordinates: [number, number] = [
				formMethods.getValues('eventLatitude') || -27.026563,
				formMethods.getValues('eventLongitude') || -51.144409,
			];
			const initialRadius = formMethods.getValues('eventRadius') || 50;

			const map = L.map(mapRef.current).setView(initialCoordinates, 13);
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; OpenStreetMap contributors',
			}).addTo(map);

			mapInstanceRef.current = map;

			const marker = L.marker(initialCoordinates).addTo(map);
			markerRef.current = marker;

			const circle = L.circle(initialCoordinates, {
				color: 'green',
				fillColor: '#0c7a0c',
				fillOpacity: 0.5,
				radius: initialRadius,
			}).addTo(map);
			circleRef.current = circle;

			map.on('click', (e: L.LeafletMouseEvent) => {
				const { lat, lng } = e.latlng;
				marker.setLatLng([lat, lng]);
				circle.setLatLng([lat, lng]);

				formMethods.setValue('eventLatitude', lat);
				formMethods.setValue('eventLongitude', lng);
			});
		}
	}, [formMethods]);

	useEffect(() => {
		const radius = formMethods.watch('eventRadius');
		if (circleRef.current && radius) {
			circleRef.current.setRadius(radius);
			formMethods.setValue('eventRadius', radius);
		}
	}, [formMethods.watch('eventRadius')]);

	return (
		<div
			ref={mapRef}
			style={{ height: '400px', width: '100%', zIndex: 1, position: 'relative' }}
		/>
	);
};
