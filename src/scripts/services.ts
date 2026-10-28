document.querySelectorAll<HTMLElement>('[data-service-set]').forEach((serviceSet) => {
		const triggers = Array.from(
			serviceSet.querySelectorAll<HTMLButtonElement>('[data-service-trigger]'),
		);
		const panels = triggers.map((trigger) =>
			document.getElementById(trigger.getAttribute('aria-controls') ?? ''),
		);
		const allowCollapse = serviceSet.dataset.serviceSet === 'mobile';
		triggers.forEach((trigger, activeIndex) => {
			trigger.addEventListener('click', () => {
				const shouldClose = allowCollapse && trigger.getAttribute('aria-expanded') === 'true';
				const triggerTop = allowCollapse ? trigger.getBoundingClientRect().top : 0;
				triggers.forEach((item, index) => {
					const expanded = !shouldClose && index === activeIndex;
					item.setAttribute('aria-expanded', String(expanded));
					item.classList.toggle('service-category--active', expanded);
					if (panels[index]) panels[index]!.hidden = !expanded;
				});

				if (allowCollapse) {
					requestAnimationFrame(() => {
						const topShift = trigger.getBoundingClientRect().top - triggerTop;
						if (Math.abs(topShift) > 1) {
							window.scrollTo({ top: window.scrollY + topShift, behavior: 'instant' });
						}
					});
				}
			});
		});
	});
