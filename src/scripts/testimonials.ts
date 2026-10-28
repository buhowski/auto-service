document.addEventListener('DOMContentLoaded', () => {
	const carousel = document.querySelector<HTMLElement>('[data-testi]');
	const track = carousel?.querySelector<HTMLElement>('[data-testi-track]');
	const slides = Array.from(
		carousel?.querySelectorAll<HTMLElement>('[data-testi-slide]') ?? [],
	);
	const previousButton = carousel?.querySelector<HTMLButtonElement>('[data-testi-prev]');
	const nextButton = carousel?.querySelector<HTMLButtonElement>('[data-testi-next]');

	if (!carousel || !track || slides.length <= 1) {
		previousButton?.remove();
		nextButton?.remove();
		return;
	}

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	let currentIndex = 0;
	let intervalId: ReturnType<typeof window.setInterval> | undefined;
	let touchStartX = 0;
	let isVisible = true;

	const slidesPerView = () => (window.innerWidth >= 768 ? 2 : 1);
	const maxIndex = () => Math.max(0, slides.length - slidesPerView());

	const updatePosition = () => {
		currentIndex = Math.min(currentIndex, maxIndex());
		track.style.transform = `translateX(-${(100 / slidesPerView()) * currentIndex}%)`;
		slides.forEach((slide, index) => {
			const isVisibleSlide = index >= currentIndex && index < currentIndex + slidesPerView();
			slide.setAttribute('aria-hidden', String(!isVisibleSlide));
		});
	};

	const next = () => {
		currentIndex = currentIndex >= maxIndex() ? 0 : currentIndex + 1;
		updatePosition();
	};

	const previous = () => {
		currentIndex = currentIndex <= 0 ? maxIndex() : currentIndex - 1;
		updatePosition();
	};

	const stopAutoAdvance = () => {
		if (intervalId !== undefined) window.clearInterval(intervalId);
		intervalId = undefined;
	};

	const startAutoAdvance = () => {
		if (intervalId !== undefined || !isVisible || document.hidden || prefersReducedMotion.matches) return;
		intervalId = window.setInterval(next, 6000);
	};

	previousButton?.addEventListener('click', previous);
	nextButton?.addEventListener('click', next);
	carousel.addEventListener('mouseenter', stopAutoAdvance);
	carousel.addEventListener('mouseleave', startAutoAdvance);
	carousel.addEventListener('focusin', stopAutoAdvance);
	carousel.addEventListener('focusout', (event) => {
		if (event.relatedTarget instanceof Node && carousel.contains(event.relatedTarget)) return;
		startAutoAdvance();
	});

	track.addEventListener(
		'touchstart',
		(event) => {
			touchStartX = event.touches[0]?.clientX ?? 0;
			stopAutoAdvance();
		},
		{ passive: true },
	);

	track.addEventListener(
		'touchend',
		(event) => {
			const touchEndX = event.changedTouches[0]?.clientX;
			if (touchEndX !== undefined) {
				const swipeDistance = touchStartX - touchEndX;
				if (Math.abs(swipeDistance) > 50) swipeDistance > 0 ? next() : previous();
			}
			startAutoAdvance();
		},
		{ passive: true },
	);

	carousel.tabIndex = 0;
	carousel.addEventListener('keydown', (event) => {
		if (event.key === 'ArrowLeft') previous();
		if (event.key === 'ArrowRight') next();
	});

	prefersReducedMotion.addEventListener('change', () => {
		if (prefersReducedMotion.matches) stopAutoAdvance();
		else startAutoAdvance();
	});
	document.addEventListener('visibilitychange', () => {
		if (document.hidden) stopAutoAdvance();
		else startAutoAdvance();
	});
	window.addEventListener('resize', updatePosition, { passive: true });
	updatePosition();
	startAutoAdvance();
});
