const api = (function () {
    function toggleSideMenu(target) {
        const sidenav = document.getElementById('sidenav');
        sidenav.classList.toggle('show');

        console.log(target);
    }

    return {
        toggleSideMenu
    };
})();
