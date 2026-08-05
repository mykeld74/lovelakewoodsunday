export type VolunteerRole = {
	id: string;
	name: string;
	description: string;
};

export const volunteerRoles: VolunteerRole[] = [
	{
		id: 'hospitality',
		name: 'Hospitality',
		description:
			'Welcome people at the doors, hand out programs, answer questions, and help guests find a seat.'
	},
	{
		id: 'parking',
		name: 'Parking',
		description:
			'Direct traffic in the lot, guide guests toward the entrance, and help drivers who need accessible parking or a drop-off.'
	},
	{
		id: 'safety',
		name: 'Safety',
		description:
			'Keep an eye on entrances and walkways, and be a calm, visible presence throughout the morning.'
	},
	{
		id: 'prayer',
		name: 'Prayer',
		description:
			'Pray for the morning ahead of time, and be available to pray with anyone who asks afterward.'
	},
	{
		id: 'setup-teardown',
		name: 'Set-up and tear-down',
		description:
			'Arrive early to set up chairs, signage, and sound — or stay after to help put the gym back the way we found it.'
	},
	{
		id: 'wherever',
		name: 'Wherever I’m needed',
		description: 'Not sure where you fit? Put you anywhere and we’ll find a good spot.'
	}
];

export type ServiceMoment = {
	id: string;
	title: string;
	description: string;
};

/** What the hour will actually hold, in the order it will happen. */
export const serviceMoments: ServiceMoment[] = [
	{
		id: 'music',
		title: 'Music and singing',
		description:
			'Musicians from across the participating churches, leading songs together. Sing along if you want to. Listening is completely fine too.'
	},
	{
		id: 'prayer',
		title: 'Prayer',
		description: 'A few honest moments praying for our neighbors, our schools, and our city.'
	},
	{
		id: 'children',
		title: 'A moment for the kids',
		description:
			'Children stay with their parents the whole time, and there is a part of the morning made just for them.'
	},
	{
		id: 'message',
		title: 'An encouraging message',
		description:
			'A short talk meant to be worth your time whether you have been in church your whole life or have never set foot in one.'
	},
	{
		id: 'communion',
		title: 'Communion',
		description:
			'A quiet, unhurried moment near the end. You are welcome to take part or simply stay seated — no one is watching, and no one will single you out.'
	}
];
