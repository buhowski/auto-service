const widgets = document.querySelectorAll<HTMLElement>('[data-business-hours]');
const timeFormatter = new Intl.DateTimeFormat('en-GB', {
	timeZone: 'Europe/Kyiv',
	weekday: 'short',
	hour: '2-digit',
	minute: '2-digit',
	hourCycle: 'h23',
});
const dayIndexes: Record<string, number> = {
	Sun: 0,
	Mon: 1,
	Tue: 2,
	Wed: 3,
	Thu: 4,
	Fri: 5,
	Sat: 6,
};

widgets.forEach((widget) => {
	const trigger = widget.querySelector<HTMLButtonElement>('.business-hours__trigger');
	const panel = widget.querySelector<HTMLElement>('.business-hours__panel');
	const status = widget.querySelector<HTMLElement>('[data-business-status]');
	const statusText = widget.querySelector<HTMLElement>('[data-business-status-text]');
	if (!trigger || !panel || !status || !statusText) return;
	const schedule = Array.from(panel.querySelectorAll<HTMLElement>('[data-schedule-days]')).map(
		(row) => ({
			days: (row.dataset.scheduleDays ?? '').split(',').map(Number),
			open: row.dataset.open || null,
			close: row.dataset.close || null,
			row,
		}),
	);
	const toMinutes = (time: string) => {
		const [hours, minutes] = time.split(':').map(Number);
		return hours! * 60 + minutes!;
	};

	const updateStatus = () => {
		const parts = Object.fromEntries(
			timeFormatter.formatToParts(new Date()).map(({ type, value }) => [type, value]),
		);
		const weekday = parts.weekday ?? 'Mon';
		const today = dayIndexes[weekday] ?? 1;
		const hour = Number(parts.hour ?? 0);
		const minute = Number(parts.minute ?? 0);
		const now = hour * 60 + minute;
		const todaySchedule = schedule.find((group) => group.days.includes(today));
		const isOpen = Boolean(
			todaySchedule?.open &&
			todaySchedule.close &&
			now >= toMinutes(todaySchedule.open) &&
			now < toMinutes(todaySchedule.close),
		);
		let nextOpenTime = todaySchedule?.open ?? '';
		let relativeDay = 'сьогодні';
		let daysUntilOpen = 0;

		if (!isOpen) {
			for (let offset = 0; offset <= 7; offset += 1) {
				const candidateDay = (today + offset) % 7;
				const candidate = schedule.find((group) => group.days.includes(candidateDay));
				if (!candidate?.open) continue;
				if (offset === 0 && now >= toMinutes(candidate.open)) continue;
				nextOpenTime = candidate.open;
				daysUntilOpen = offset;
				break;
			}
			if (daysUntilOpen === 1) relativeDay = 'завтра';
			else if (daysUntilOpen > 1) relativeDay = 'у понеділок';
		}

		status.classList.toggle('is-open', isOpen);
		status.classList.toggle('is-closed', !isOpen);
		statusText.textContent = isOpen
			? `Відчинено до ${todaySchedule!.close}`
			: `Зачинено · Відкриємось ${relativeDay} о ${nextOpenTime}`;
		schedule.forEach((group) => {
			group.row.classList.toggle('is-current', group.days.includes(today));
		});
	};

	const setOpen = (open: boolean) => {
		trigger.setAttribute('aria-expanded', String(open));
		panel.hidden = !open;
	};

	trigger.addEventListener('click', () => {
		setOpen(trigger.getAttribute('aria-expanded') !== 'true');
	});
	document.addEventListener('click', (event) => {
		if (!widget.contains(event.target as Node)) setOpen(false);
	});
	widget.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			setOpen(false);
			trigger.focus();
		}
	});

	updateStatus();
	window.setInterval(updateStatus, 60_000);
});
