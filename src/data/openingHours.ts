import schedule from '../content/opening-hours.json';

export type OpeningScheduleGroup = (typeof schedule.groups)[number];
export const openingSchedule = schedule.groups;
export type OpeningHour = {
	day: string;
	time: string;
	weekday: number;
	isClosed: boolean;
};

const dayNames = [
	{ full: 'Понеділок', weekday: 1 },
	{ full: 'Вівторок', weekday: 2 },
	{ full: 'Середа', weekday: 3 },
	{ full: 'Четвер', weekday: 4 },
	{ full: "П'ятниця", weekday: 5 },
	{ full: 'Субота', weekday: 6 },
	{ full: 'Неділя', weekday: 0 },
] as const;

const formatTime = (group: OpeningScheduleGroup) =>
	group.open && group.close ? `${group.open} – ${group.close}` : 'Зачинено';

export const openingHours: OpeningHour[] = dayNames.map(({ full, weekday }) => {
	const group = openingSchedule.find((item) => item.days.includes(weekday));
	const isClosed = !group?.open || !group.close;
	return {
		day: full,
		weekday,
		time: group ? formatTime(group) : 'Зачинено',
		isClosed,
	};
});
