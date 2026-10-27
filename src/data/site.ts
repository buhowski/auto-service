import { openingHours, openingHoursSummary } from './openingHours';

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
type SocialLink = {
	href: string;
	label: string;
	title: string;
	icon: 'viber' | 'telegram' | 'instagram';
	external?: boolean;
};
const brand = { prefix: 'СТО', name: 'Поршень' };
const businessName = `${brand.prefix} ${brand.name}`;
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
export { openingHoursSummary };

