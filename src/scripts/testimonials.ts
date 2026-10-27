document.addEventListener('DOMContentLoaded', () => {
		const testi = document.querySelector('[data-testi]');
		if (!testi) return;

		const track = testi.querySelector('.testi-track');
		const slides = testi.querySelectorAll('.testi-slide');
		const prevBtn = testi.querySelector('[data-testi-prev]');
		const nextBtn = testi.querySelector('[data-testi-next]');

		if (!track || slides.length <= 1) {
			prevBtn?.remove();
			nextBtn?.remove();
			return;
		}

		let currentIndex = 0;
		let intervalId: ReturnType<typeof setInterval> | undefined;

		const slidesPerView = () => (window.innerWidth >= 768 ? 2 : 1);
		const maxIndex = () => Math.max(0, slides.length - slidesPerView());

		function updatePosition() {
			currentIndex = Math.min(currentIndex, maxIndex());
			track.style.transform = `translateX(-${(100 / slidesPerView()) * currentIndex}%)`;
			slides.forEach((slide, index) => {
				const isVisible = index >= currentIndex && index < currentIndex + slidesPerView();
				slide.setAttribute('aria-hidden', String(!isVisible));
			});
		}

		function next() {
			currentIndex = currentIndex >= maxIndex() ? 0 : currentIndex + 1;
			updatePosition();
		}

		function prev() {
			currentIndex = currentIndex <= 0 ? maxIndex() : currentIndex - 1;
			updatePosition();
		}

		prevBtn?.addEventListener('click', prev);
		nextBtn?.addEventListener('click', next);

		const stopAutoAdvance = () => {
			if (intervalId) clearInterval(intervalId);
		};

		const startAutoAdvance = () => {
			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
			stopAutoAdvance();
			intervalId = setInterval(next, 6000);
		};

		testi.addEventListener('mouseenter', stopAutoAdvance);
		testi.addEventListener('mouseleave', startAutoAdvance);

		// Touch/swipe support
		let touchStartX = 0;
		track.addEventListener(
			'touchstart',
			(e) => {
				touchStartX = e.touches[0].clientX;
				stopAutoAdvance();
			},
			{ passive: true },
		);

		track.addEventListener(
			'touchend',
			(e) => {
				const touchEndX = e.changedTouches[0].clientX;
				const diff = touchStartX - touchEndX;
				if (Math.abs(diff) > 50) {
					diff > 0 ? next() : prev();
				}
				startAutoAdvance();
			},
			{ passive: true },
		);

		// Keyboard navigation
		testi.tabIndex = 0;
		testi.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowLeft') prev();
			if (e.key === 'ArrowRight') next();
		});

		window.addEventListener('resize', updatePosition);
		updatePosition();
		startAutoAdvance();
	});
