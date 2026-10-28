const carousel = document.querySelector<HTMLElement>('[data-brands-carousel]');
const grid = carousel?.querySelector<HTMLElement>('[data-brands-grid]');

if (carousel && grid) {
	const items = Array.from(grid.querySelectorAll<HTMLElement>('[data-brand-item]'));
	const labels = Array.from(grid.querySelectorAll<HTMLElement>('[data-brand-label]'));
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	const animationSpeed = 24;
	let previousTime = 0;
	let position = carousel.scrollLeft;
	let animationFrameId: number | null = null;
	let isVisible = false;
	let isDragging = false;
	let isTouchDragging = false;
	let dragStartX = 0;
	let dragStartY = 0;
	let dragStartScroll = 0;

	const updateItemWidth = () => {
		if (!labels.length || !items.length) return;

		const widestLabel = Math.max(...labels.map((label) => label.getBoundingClientRect().width));
		const itemStyle = getComputedStyle(items[0]);
		const inlineSpace = [
			'padding-left',
			'padding-right',
			'border-left-width',
			'border-right-width',
		].reduce(
			(total, property) => total + (Number.parseFloat(itemStyle.getPropertyValue(property)) || 0),
			0,
		);

		carousel.style.setProperty(
			'--brands-item-width',
			`${Math.ceil(widestLabel + inlineSpace)}px`,
		);
	};

	const stopAnimation = () => {
		if (animationFrameId !== null) window.cancelAnimationFrame(animationFrameId);
		animationFrameId = null;
		previousTime = 0;
	};

	const animate = (time: number) => {
		if (!isVisible || document.hidden || prefersReducedMotion.matches) {
			stopAnimation();
			return;
		}

		if (previousTime && !isDragging) {
			position += (animationSpeed * (time - previousTime)) / 1000;
			const loopPoint = grid.scrollWidth;
			if (loopPoint && position >= loopPoint) position -= loopPoint;
			carousel.scrollLeft = position;
		}

		previousTime = time;
		animationFrameId = window.requestAnimationFrame(animate);
	};

	const startAnimation = () => {
		if (animationFrameId !== null || !isVisible || document.hidden || prefersReducedMotion.matches) return;
		animationFrameId = window.requestAnimationFrame(animate);
	};

	const setVisible = (visible: boolean) => {
		isVisible = visible;
		if (visible) startAnimation();
		else stopAnimation();
	};

	const updatePositionAfterDrag = () => {
		const loopPoint = grid.scrollWidth;
		if (!loopPoint) return;

		position = ((carousel.scrollLeft % loopPoint) + loopPoint) % loopPoint;
		carousel.scrollLeft = position;
	};

	const endPointerDrag = () => {
		if (!isDragging) return;
		isDragging = false;
		updatePositionAfterDrag();
	};

	carousel.addEventListener('pointerdown', (event) => {
		if (event.pointerType !== 'mouse' || event.button !== 0) return;
		isDragging = true;
		dragStartX = event.clientX;
		dragStartScroll = carousel.scrollLeft;
		position = dragStartScroll;
		carousel.setPointerCapture(event.pointerId);
	});

	carousel.addEventListener('pointermove', (event) => {
		if (!isDragging || event.pointerType !== 'mouse') return;
		position = dragStartScroll - (event.clientX - dragStartX);
		carousel.scrollLeft = position;
	});

	carousel.addEventListener('pointerup', (event) => {
		if (event.pointerType === 'mouse') endPointerDrag();
	});

	carousel.addEventListener('pointercancel', (event) => {
		if (event.pointerType === 'mouse') endPointerDrag();
	});

	carousel.addEventListener('lostpointercapture', endPointerDrag);

	carousel.addEventListener(
		'touchstart',
		(event) => {
			const touch = event.touches[0];
			if (!touch) return;
			isTouchDragging = true;
			dragStartX = touch.clientX;
			dragStartY = touch.clientY;
			dragStartScroll = position;
		},
		{ passive: true },
	);

	carousel.addEventListener(
		'touchmove',
		(event) => {
			if (!isTouchDragging) return;
			const touch = event.touches[0];
			if (!touch) return;

			const deltaX = touch.clientX - dragStartX;
			const deltaY = touch.clientY - dragStartY;
			if (Math.abs(deltaX) <= Math.abs(deltaY)) return;
			event.preventDefault();
			position = dragStartScroll - deltaX;
			carousel.scrollLeft = position;
		},
		{ passive: false },
	);

	const endTouchDrag = () => {
		if (!isTouchDragging) return;
		isTouchDragging = false;
		updatePositionAfterDrag();
	};

	carousel.addEventListener('touchend', endTouchDrag, { passive: true });
	carousel.addEventListener('touchcancel', endTouchDrag, { passive: true });

	if ('IntersectionObserver' in window) {
		const observer = new IntersectionObserver(([entry]) => {
			setVisible(Boolean(entry?.isIntersecting));
		});
		observer.observe(carousel);
	} else {
		setVisible(true);
	}

	prefersReducedMotion.addEventListener('change', () => {
		if (prefersReducedMotion.matches) stopAnimation();
		else startAnimation();
	});
	document.addEventListener('visibilitychange', () => {
		if (document.hidden) stopAnimation();
		else startAnimation();
	});
	document.fonts.ready.then(updateItemWidth);
	window.addEventListener('resize', updateItemWidth, { passive: true });
}
