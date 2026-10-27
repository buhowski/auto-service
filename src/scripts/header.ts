// Mobile navigation
	document.addEventListener('DOMContentLoaded', () => {
		const burger = document.querySelector('.burger');
		const menu = document.querySelector('.mobile');
		const overlay = document.querySelector('.overlay');
		const closeBtn = document.querySelector('.mobile-close');

		if (!burger || !menu) return;
		const activeBurger = burger;
		const activeMenu = menu;

		function open() {
			activeMenu.classList.add('open');
			overlay?.classList.add('open');
			activeBurger.classList.add('open');
			activeBurger.setAttribute('aria-expanded', 'true');
			document.body.classList.add('nav-lock');
		}

		function close() {
			activeMenu.classList.remove('open');
			overlay?.classList.remove('open');
			activeBurger.classList.remove('open');
			activeBurger.setAttribute('aria-expanded', 'false');
			document.body.classList.remove('nav-lock');
		}

		function toggle() {
			activeMenu.classList.contains('open') ? close() : open();
		}

		burger.addEventListener('click', toggle);
		overlay?.addEventListener('click', close);
		closeBtn?.addEventListener('click', close);
		activeMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && activeMenu.classList.contains('open')) close();
		});
		const nav = document.querySelector('.nav');
		const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 20);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
	});
