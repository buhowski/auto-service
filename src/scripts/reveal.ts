const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initReveal() {
	const elements = document.querySelectorAll<HTMLElement>('.reveal');
	if (!elements.length) return;

	if (prefersReduced || !('IntersectionObserver' in window)) {
		elements.forEach((element) => element.classList.add('in'));
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				const element = entry.target as HTMLElement;
				const delay = Number(element.dataset.delay);
				if (delay > 0) {
					window.setTimeout(() => element.classList.add('in'), delay);
				} else {
					element.classList.add('in');
				}
				observer.unobserve(element);
			});
		},
		{ threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
	);

	elements.forEach((element) => observer.observe(element));
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initReveal, { once: true });
} else {
	initReveal();
}
