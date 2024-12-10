// import { useState, useEffect } from 'react';
// import { fetchEvents } from '../services/eventService';

// interface Event {
//     id: number;
//     name: string;
//     status: number;
//     startDate: string;
//     endDate: string;
// }

// export const useFetchEvents = () => {
//     const [events, setEvents] = useState<Event[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const getEvents = async () => {
//             try {
//                 const data = await fetchEvents();
//                 setEvents(data.events);  // Extraímos a propriedade 'events' da resposta
//             } catch (error: any) {
//                 setError(error.message);
//             // } finally {
//                 setLoading(false);
//             }
//         };

//         getEvents();
//     }, []);

//     return { events, loading, error };
// };
