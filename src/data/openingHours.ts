export type OpeningScheduleGroup = {
	label: string;
	days: readonly number[];
	open?: string;
	close?: string;
};

export type OpeningHour = {
	day: string;
	time: string;
	shortDay: string;
	isClosed: boolean;
};

const dayNames = [
	{ full: 'Неділя', short: 'Нд' },
	{ full: 'Понеділок', short: 'Пн' },
	{ full: 'Вівторок', short: 'Вт' },
	{ full: 'Середа', short: 'Ср' },
	{ full: 'Четвер', short: 'Чт' },
	{ full: "П'ятниця", short: 'Пт' },
	{ full: 'Субота', short: 'Сб' },
] as const;

// Єдине джерело годин: дні тижня та час відкриття/закриття.
export const openingSchedule: readonly OpeningScheduleGroup[] = [
	{ label: 'Пн–Пт', days: [1, 2, 3, 4, 5], open: '07:30', close: '18:00' },
	{ label: 'Сб', days: [6], open: '08:00', close: '15:00' },
	{ label: 'Нд', days: [0] },
];

const formatTime = (group: OpeningScheduleGroup) =>
	group.open && group.close ? `${group.open} – ${group.close}` : 'Зачинено';

export const openingHours: OpeningHour[] = dayNames.map(({ full, short }, day) => {
	const group = openingSchedule.find((item) => item.days.includes(day));
	const isClosed = !group?.open || !group.close;
	return {
		day: full,
		shortDay: short,
		time: group ? formatTime(group) : 'Зачинено',
		isClosed,
	};
});

export const openingHoursSummary = openingSchedule
	.map((group) => `${group.label} ${formatTime(group)}`)
	.join(' · ');
