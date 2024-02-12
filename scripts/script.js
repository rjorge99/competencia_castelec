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

    document.addEventListener('scroll', function () {
        const principalSection = document.querySelector('#principales');

        if (principalSection) {
            var scrollPosition = window.scrollY || document.documentElement.scrollTop;

            if (
                scrollPosition >= principalSection.offsetTop &&
                scrollPosition < principalSection.offsetTop + principalSection.offsetHeight
            ) {
                // El top del documento está dentro del elemento section                document.body.classList.add('nuevaClase'); // Reemplaza "nuevaClase" con el nombre de la clase que deseas agregar
                document.getElementsByClassName('navbar')[0].classList.remove('navbar--dark');
            } else {
                // El top del documento no está dentro del elemento section
                document.getElementsByClassName('navbar')[0].classList.add('navbar--dark');
            }
        }
    });

    return {
        toggleSideMenu
    };
})();
