import schedule from '../content/opening-hours.json';

export type OpeningScheduleGroup = (typeof schedule.groups)[number];
export const openingSchedule = schedule.groups;
export const closedLabel = schedule.closedLabel;
export type OpeningHour = {
	day: string;
	time: string;
	weekday: number;
	isClosed: boolean;
};

const dayNames = schedule.daysOfWeek;

const formatTime = (group: OpeningScheduleGroup) =>
	group.open && group.close ? `${group.open} – ${group.close}` : closedLabel;

export const openingHours: OpeningHour[] = dayNames.map(({ full, weekday }) => {
	const group = openingSchedule.find((item) => item.days.includes(weekday));
	const isClosed = !group?.open || !group.close;
	return {
		day: full,
		weekday,
		time: group ? formatTime(group) : closedLabel,
		isClosed,
	};
});
