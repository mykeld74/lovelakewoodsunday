export type FaqItem = {
	id: string;
	question: string;
	/** Paragraphs. Rendered in order; keep the plain, unhurried tone. */
	answer: string[];
};

export const faqs: FaqItem[] = [
	{
		id: 'everyone-welcome',
		question: 'Is everyone welcome?',
		answer: [
			'Absolutely. Love Lakewood Sunday is for the entire community. You do not need to belong to one of the participating churches — or any church — to attend.',
			'Whatever your background, beliefs, questions, or past experiences may be, you are welcome.'
		]
	},
	{
		id: 'what-to-wear',
		question: 'What should I wear?',
		answer: [
			'Whatever makes you comfortable. Most people will dress casually. You will see everything from shorts and T-shirts to jeans, dresses, and a few suits.'
		]
	},
	{
		id: 'kids',
		question: 'Will there be something for kids?',
		answer: [
			'Yes. Children will remain with their parents during the service. We will have a special children’s moment, and every child will receive an activity bag to use throughout the morning.'
		]
	},
	{
		id: 'how-long',
		question: 'How long will the service last?',
		answer: ['We are planning for the service to last approximately one hour.']
	},
	{
		id: 'cost',
		question: 'Is there a cost?',
		answer: ['No. Love Lakewood Sunday is completely free.']
	},
	{
		id: 'offering',
		question: 'Will I be asked to give money?',
		answer: ['No. We will not be taking an offering or asking guests to give money.']
	},
	{
		id: 'parking',
		question: 'Where should I park?',
		answer: [
			'Please park in the Bear Creek High School parking lot east of the main entrance. Signs and volunteers will help direct you when you arrive.'
		]
	},
	{
		id: 'accessibility',
		question: 'Is the venue accessible?',
		answer: [
			'Yes. Accessible parking will be available, guests may be dropped off in front of the school, and the gymnasium is wheelchair accessible.'
		]
	},
	{
		id: 'bad-experience',
		question: 'What if I have had a bad experience with church?',
		answer: [
			'We are sorry that happened. We know churches and church people have not always represented Jesus well.',
			'Our hope is that Love Lakewood Sunday will be a safe, welcoming, and pressure-free experience where you are treated with kindness and respect. You will not be singled out, pressured, or embarrassed.',
			'You are welcome to attend, observe, ask questions, and participate only as much as you feel comfortable.'
		]
	},
	{
		id: 'membership',
		question: 'Do I need to belong to one of the participating churches?',
		answer: [
			'Not at all. This morning is for the entire Lakewood community, including people who do not currently attend church.'
		]
	},
	{
		id: 'register',
		question: 'Do I need to register?',
		answer: ['No registration is required. You can simply come.']
	},
	{
		id: 'arrive',
		question: 'When should I arrive?',
		answer: [
			'We encourage people to arrive 15–20 minutes early so there is plenty of time to park, find a seat, and get settled.'
		]
	}
];
