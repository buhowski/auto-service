const phoneNumber = '+380322345678';
const bookingLink = `tel:${phoneNumber}`;
const formattedPhoneNumber = phoneNumber.replace(
	/^\+380(\d{2})(\d{3})(\d{2})(\d{2})$/,
	'0$1 $2 $3 $4',
);
const city = 'Львів';
const streetAddress = 'вул. Сирецька, 42';
const postalCode = '79000';
const addressLabel = `${streetAddress}, ${city}`;
const address = {
	full: `${addressLabel}, ${postalCode}`,
	mapLabel: addressLabel,
};
type OpeningHour = {
	day: string;
	time: string;
	shortDay: string;
	isClosed?: boolean;
};
type SocialLink = {
	href: string;
	label: string;
	title: string;
	icon: 'viber' | 'telegram' | 'instagram';
	external?: boolean;
};
const brand = { prefix: 'СТО', name: 'Поршень' };
const businessName = `${brand.prefix} ${brand.name}`;
const weekdayHours = '07:30 – 18:00';
const saturdayHours = '08:00 – 15:00';
const openingHours: OpeningHour[] = [
	{ day: 'Понеділок', time: weekdayHours, shortDay: 'Пн' },
	{ day: 'Вівторок', time: weekdayHours, shortDay: 'Вт' },
	{ day: 'Середа', time: weekdayHours, shortDay: 'Ср' },
	{ day: 'Четвер', time: weekdayHours, shortDay: 'Чт' },
	{ day: "П'ятниця", time: weekdayHours, shortDay: 'Пт' },
	{ day: 'Субота', time: saturdayHours, shortDay: 'Сб' },
	{ day: 'Неділя', time: 'Зачинено', shortDay: 'Нд', isClosed: true },
];
const socialLinks: SocialLink[] = [
	{
		href: `viber://chat?number=${encodeURIComponent(phoneNumber)}`,
		label: 'Написати у Viber',
		title: 'Viber',
		icon: 'viber',
	},
	{
		href: 'https://t.me/sto_porshen',
		label: 'Написати у Telegram',
		title: 'Telegram',
		icon: 'telegram',
		external: true,
	},
	{
		href: 'https://instagram.com/sto_porshen',
		label: `${businessName} в Instagram`,
		title: 'Instagram',
		icon: 'instagram',
		external: true,
	},
];
export const site = {
	name: businessName,
	brand,
	city,
	phone: {
		display: formattedPhoneNumber,
		href: bookingLink,
	},
	address: {
		...address,
		mapsUrl: `https://maps.google.com/?q=${encodeURIComponent(address.mapLabel)}`,
	},
	openingHours,
	links: {
		booking: bookingLink,
		services: '#services',
		whyUs: '#why-choose',
		testimonials: '#testimonials',
		contacts: '#visit',
	},
	socialLinks,
} as const;

const monday = site.openingHours[0]!;
const friday = site.openingHours[4]!;
const saturday = site.openingHours[5]!;
const sunday = site.openingHours[6]!;
export const openingHoursSummary = `${monday.shortDay}–${friday.shortDay} ${monday.time} · ${saturday.shortDay} ${saturday.time} · ${sunday.shortDay} ${sunday.time.toLowerCase()}`;
