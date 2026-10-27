const bookingModal = document.querySelector<HTMLElement>('[data-booking-modal]');
	const bookingForm = bookingModal?.querySelector<HTMLFormElement>('[data-booking-form]');
	const phoneInput = bookingModal?.querySelector<HTMLInputElement>('#booking-phone');
	const submitStatus = bookingModal?.querySelector<HTMLElement>('[data-booking-status]');
	let lastBookingTrigger: HTMLElement | null = null;

	function closeBookingModal() {
		if (!bookingModal) return;
		bookingModal.hidden = true;
		document.body.classList.remove('booking-modal-open');
		lastBookingTrigger?.focus();
	}

	document.addEventListener('click', (event) => {
		const target = event.target;
		if (!(target instanceof Element)) return;

		const trigger = target.closest<HTMLElement>('[data-booking-open]');
		if (trigger && bookingModal) {
			event.preventDefault();
			lastBookingTrigger = trigger;
			bookingModal.hidden = false;
			document.body.classList.add('booking-modal-open');
			bookingModal.querySelector<HTMLInputElement>('#booking-name')?.focus();
			return;
		}

		if (!bookingModal || bookingModal.hidden) return;

		const panel = bookingModal.querySelector<HTMLElement>('.booking-modal__panel');
		const clickedClose = target.closest('[data-booking-close]');
		const clickedOutsidePanel = panel && !panel.contains(target);
		if (clickedClose || clickedOutsidePanel) {
			closeBookingModal();
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && bookingModal && !bookingModal.hidden) closeBookingModal();
	});

	const formFields = bookingForm
		? Array.from(bookingForm.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[required]'))
		: [];

	function updateFieldState(field: HTMLInputElement | HTMLTextAreaElement, force = false) {
		if (!force && !field.value.trim()) {
			field.removeAttribute('aria-invalid');
			return;
		}
		field.setAttribute('aria-invalid', String(!field.validity.valid));
	}

	formFields.forEach((field) => {
		field.addEventListener('blur', () => updateFieldState(field, true));
		field.addEventListener('input', () => {
			if (field.hasAttribute('aria-invalid')) updateFieldState(field, true);
		});
	});

	phoneInput?.addEventListener('input', () => {
		const oldValue = phoneInput.value;
		const oldCaret = phoneInput.selectionStart ?? oldValue.length;
		let digits = oldValue.replace(/\D/g, '');
		if (digits.startsWith('380')) digits = digits.slice(3);
		else if (digits.startsWith('0')) digits = digits.slice(1);
		digits = digits.slice(0, 9);
		const digitsBeforeCaret = oldValue.slice(0, oldCaret).replace(/\D/g, '').length;
		const formatted = digits
			.replace(/^(\d{2})(\d)/, '$1 $2')
			.replace(/^(\d{2} \d{3})(\d)/, '$1 $2')
			.replace(/^(\d{2} \d{3} \d{2})(\d)/, '$1 $2');
		phoneInput.value = formatted;

		let caret = 0;
		let countedDigits = 0;
		while (caret < formatted.length && countedDigits < digitsBeforeCaret) {
			if (/\d/.test(formatted[caret])) countedDigits += 1;
			caret += 1;
		}
		if (formatted[caret] === ' ' && countedDigits < digits.length) caret += 1;
		phoneInput.setSelectionRange(caret, caret);
		if (phoneInput.hasAttribute('aria-invalid')) updateFieldState(phoneInput, true);
	});

	bookingForm?.addEventListener('submit', (event) => {
		event.preventDefault();
		formFields.forEach((field) => updateFieldState(field, true));
		if (!bookingForm.reportValidity() || !submitStatus) return;
		submitStatus.hidden = false;
	});
