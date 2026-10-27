import settings from '../content/site.json';
import { openingHours } from './openingHours';

const phoneHref = `tel:${settings.phoneNumber}`;
const formattedPhone = settings.phoneNumber.replace(
	/^\+380(\d{2})(\d{3})(\d{2})(\d{2})$/,
	'0$1 $2 $3 $4',
);
const addressLabel = `${settings.streetAddress}, ${settings.city}`;
const businessName = `${settings.brandPrefix} ${settings.brandName}`;

export const site = {
	name: businessName,
	brand: { prefix: settings.brandPrefix, name: settings.brandName },
	city: settings.city,
	phone: { display: formattedPhone, href: phoneHref },
	address: {
		full: `${addressLabel}, ${settings.postalCode}`,
		mapLabel: addressLabel,
		mapsUrl: `https://maps.google.com/?q=${encodeURIComponent(addressLabel)}`,
	},
	openingHours,
	links: {
		booking: phoneHref,
		services: '#services',
	},
	navigation: settings.navigation,
	socialLinks: settings.socialLinks.map((link) => ({
		...link,
		href:
			link.icon === 'viber'
				? `viber://chat?number=${encodeURIComponent(settings.phoneNumber)}`
				: link.href,
		label: link.label.replace('СТО Поршень', businessName),
	})),
} as const;

export const footerAbout = settings.footerAbout;
