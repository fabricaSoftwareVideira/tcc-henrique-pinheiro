interface EventInterface {
	eventStartDate: Date;
	eventEndDate: Date;
	eventActivities: {
		eventActivityStartDate: Date;
		eventActivityEndDate: Date;
		eventActivityTitle: string;
		eventActivityDescription: string;
	}[];
	eventTitle: string;
	selectedCourses: CourseInterface[];
	eventStatus?: string | undefined;
	eventRadius?: number;
	eventLatitude?: number;
}
