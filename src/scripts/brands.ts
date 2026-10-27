const brandsCarousel = document.querySelector<HTMLElement>('.brands-carousel');
	const brandsTrack = brandsCarousel?.querySelector<HTMLElement>('.brands-track');
	const brandsGrid = brandsCarousel?.querySelector<HTMLElement>('.brands-grid');
	if (brandsCarousel && brandsTrack && brandsGrid) {
		const updateBrandItemWidth = () => {
			const labels = Array.from(brandsGrid.querySelectorAll<HTMLElement>('.brand-item > span'));
			const items = Array.from(brandsGrid.querySelectorAll<HTMLElement>('.brand-item'));
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
			brandsCarousel.style.setProperty(
				'--brand-item-width',
				`${Math.ceil(widestLabel + inlineSpace)}px`,
			);
		};

		let previousTime = 0;
		let position = brandsCarousel.scrollLeft;
		let isDragging = false;
		let dragStartX = 0;
		let dragStartScroll = 0;
		let touchStartY = 0;
		let isTouchDragging = false;
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const speed = 24;

		const animate = (time: number) => {
			if (previousTime && !isDragging && !reducedMotion.matches) {
				position += (speed * (time - previousTime)) / 1000;
				const loopPoint = brandsGrid.scrollWidth;
				if (loopPoint && position >= loopPoint) {
					position -= loopPoint;
				}
				brandsCarousel.scrollLeft = position;
			}
			previousTime = time;
			window.requestAnimationFrame(animate);
		};

		brandsCarousel.addEventListener('pointerdown', (event) => {
			if (event.pointerType === 'mouse' && event.button !== 0) return;
			if (event.pointerType !== 'mouse') return;
			isDragging = true;
			dragStartX = event.clientX;
			dragStartScroll = brandsCarousel.scrollLeft;
			position = dragStartScroll;
			if (event.pointerType === 'mouse') brandsCarousel.setPointerCapture(event.pointerId);
		});
		brandsCarousel.addEventListener('pointermove', (event) => {
			if (!isDragging || event.pointerType !== 'mouse') return;
			position = dragStartScroll - (event.clientX - dragStartX);
			brandsCarousel.scrollLeft = position;
		});
		const endDrag = () => {
			if (!isDragging) return;
			isDragging = false;
			const loopPoint = brandsGrid.scrollWidth;
			if (loopPoint) {
				position = ((brandsCarousel.scrollLeft % loopPoint) + loopPoint) % loopPoint;
				brandsCarousel.scrollLeft = position;
			}
		};
		brandsCarousel.addEventListener('pointerup', (event) => {
			if (event.pointerType === 'mouse') endDrag();
		});
		brandsCarousel.addEventListener('pointercancel', (event) => {
			if (event.pointerType === 'mouse') endDrag();
		});
		brandsCarousel.addEventListener('lostpointercapture', endDrag);
		brandsCarousel.addEventListener(
			'touchstart',
			(event) => {
				const touch = event.touches[0];
				if (!touch) return;
				isTouchDragging = true;
				dragStartX = touch.clientX;
				touchStartY = touch.clientY;
				dragStartScroll = position;
			},
			{ passive: true },
		);
		brandsCarousel.addEventListener(
			'touchmove',
			(event) => {
				if (!isTouchDragging) return;
				const touch = event.touches[0];
				if (!touch) return;
				const deltaX = touch.clientX - dragStartX;
				const deltaY = touch.clientY - touchStartY;
				if (Math.abs(deltaX) <= Math.abs(deltaY)) return;
				event.preventDefault();
				position = dragStartScroll - deltaX;
				brandsCarousel.scrollLeft = position;
			},
			{ passive: false },
		);
		const endTouchDrag = () => {
			isTouchDragging = false;
			const loopPoint = brandsGrid.scrollWidth;
			if (loopPoint) {
				position = ((brandsCarousel.scrollLeft % loopPoint) + loopPoint) % loopPoint;
				brandsCarousel.scrollLeft = position;
			}
		};
		brandsCarousel.addEventListener('touchend', endTouchDrag, { passive: true });
		brandsCarousel.addEventListener('touchcancel', endTouchDrag, { passive: true });

		document.fonts.ready.then(updateBrandItemWidth);
		window.addEventListener('resize', updateBrandItemWidth, { passive: true });
		window.requestAnimationFrame(animate);
	}
