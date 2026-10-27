const localDay = new Intl.DateTimeFormat('en-US', {
	weekday: 'short',
	timeZone: 'Europe/Kyiv',
}).format(new Date());
const dayIndexes: Record<string, number> = {
	Mon: 1,
	Tue: 2,
	Wed: 3,
	Thu: 4,
	Fri: 5,
	Sat: 6,
	Sun: 0,
};
const todayIndex = dayIndexes[localDay];
document.querySelector(`.hours-table [data-day="${todayIndex}"]`)?.classList.add('today');
