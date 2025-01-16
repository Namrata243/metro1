document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    const mainWrapper = document.getElementById('main-wrapper');

    if (sidebar && mainWrapper) {
        sidebar.style.width = '40px';
        mainWrapper.style.marginLeft = '40px';
        mainWrapper.style.width = 'calc(100% - 40px)';
    }

    if (menuIcon && sidebar && mainWrapper) {
        console.log('Elements found, adding event listener');
        menuIcon.addEventListener('click', () => {
            console.log('Menu icon clicked');

            const sidebarWidth = parseInt(window.getComputedStyle(sidebar).width, 10);

            if (sidebarWidth === 40) {
                sidebar.style.width = '200px';
                mainWrapper.style.marginLeft = '200px';
                mainWrapper.style.width = 'calc(100% - 200px)';
            } else {
                sidebar.style.width = '40px';
                mainWrapper.style.marginLeft = '40px';
                mainWrapper.style.width = 'calc(100% - 40px)';
            }
        });
    }
});