export interface Event {
	eventId: number;
	eventTitle: string;
	eventStatus: string;
	eventStartDate: string;
	eventEndDate: string;
	createdAt: string;
	updatedAt: string;
	eventLocation?: any;
	eventActivity: any[];
	eventCourse: any[];
}
