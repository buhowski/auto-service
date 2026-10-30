const mediaElements = document.querySelectorAll<HTMLImageElement | HTMLVideoElement>(
	'[data-lazy-media]',
);

const loadMedia = (element: HTMLImageElement | HTMLVideoElement) => {
	if (element.dataset.lazyLoaded === 'true') return;
	element.dataset.lazyLoaded = 'true';

	if (element instanceof HTMLImageElement) {
		const source = element.dataset.src;
		if (source) element.src = source;
		return;
	}

	const poster = element.dataset.poster;
	if (poster) element.poster = poster;

	element.querySelectorAll<HTMLSourceElement>('source[data-src]').forEach((source) => {
		const url = source.dataset.src;
		if (url) source.src = url;
	});

	element.load();
};

if ('IntersectionObserver' in window) {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;

				loadMedia(entry.target as HTMLImageElement | HTMLVideoElement);
				observer.unobserve(entry.target);
			});
		},
		{ rootMargin: '0px' },
	);

	mediaElements.forEach((element) => observer.observe(element));
} else {
	mediaElements.forEach(loadMedia);
}
