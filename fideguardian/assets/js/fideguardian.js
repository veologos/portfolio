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
});
