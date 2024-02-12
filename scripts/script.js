const api = (function () {
    function toggleSideMenu(target) {
        const sidenav = document.getElementById('sidenav');
        const imageElement = target;
        const isCurremtHamburguer = imageElement.src.includes('images/hamburguer-icon.svg');

        sidenav.classList.toggle('show');
        imageElement.src = isCurremtHamburguer ? 'images/arrow-icon.svg' : 'images/hamburguer-icon.svg';
    }

    // Click behaviour
    (function addClickEventToNavLinks() {
        const links = document.getElementsByClassName('nav-link');
        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function ({ target }) {
                document.querySelectorAll('.active').forEach((e) => e.classList.remove('active'));

                const href = target.attributes['href'].value.replace('#', '');
                const linksToActivate = document.getElementsByClassName(`lnk${href}`);
                for (let y = 0; y < linksToActivate.length; y++) linksToActivate[y].classList.add('active');
            });
        }
    })();

    return {
        toggleSideMenu
    };
})();
