// fideguardian.js
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fg-decision-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.decision;
            document.querySelectorAll('.fg-decision-tab').forEach((item) => {
                const active = item === tab;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-selected', active ? 'true' : 'false');
            });
            document.querySelectorAll('.fg-decision-panel').forEach((panel) => {
                panel.hidden = panel.id !== targetId;
            });
        });
    });
});
