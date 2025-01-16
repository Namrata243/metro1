function updateClock() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    const formattedDate = now.toLocaleString('en-US', options);
    const dateTimeElement = document.getElementById('date-time');
    if (dateTimeElement) {
        dateTimeElement.textContent = formattedDate;
    }
}
setInterval(updateClock, 1000);
updateClock();
document.addEventListener('DOMContentLoaded', function() {

    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    const mainWrapper = document.getElementById('main-wrapper');

    if (menuIcon && sidebar && mainWrapper) {
        menuIcon.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            mainWrapper.classList.toggle('collapsed');
        });
    }
});