// fideguardian.js
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.fg-decision-tab');
    const panels = document.querySelectorAll('.fg-decision-panel');
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.decision;
            tabs.forEach((item) => {
                const active = item === tab;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-selected', active ? 'true' : 'false');
            });
            panels.forEach((panel) => panel.classList.toggle('is-focused', panel.id === targetId));
            const target = document.getElementById(targetId);
            if (target) target.focus({ preventScroll: true });
        });
    });

    const modal = document.getElementById('fg-image-modal');
    const modalImg = document.getElementById('fg-image-modal-img');
    const closeModal = () => {
        if (!modal) return;
        modal.hidden = true;
        document.body.classList.remove('fg-modal-open');
        if (modalImg) modalImg.src = '';
    };
    document.querySelectorAll('.fg-expand-button').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            if (!modal || !modalImg) return;
            modalImg.src = button.getAttribute('href');
            modalImg.alt = button.closest('.fg-scenario-shot')?.querySelector('img')?.alt || 'Captura ampliada del cotizador';
            modal.hidden = false;
            document.body.classList.add('fg-modal-open');
        });
    });
    modal?.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });
    modal?.querySelector('.fg-image-modal-close')?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeModal();
    });
});
