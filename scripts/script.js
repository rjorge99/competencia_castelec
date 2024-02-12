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
                removeActiveLinks();
                setActiveLink(target.attributes['href'].value.replace('#', ''));
            });
        }
    })();

    function setActiveLink(href) {
        const linksToActivate = document.getElementsByClassName(`lnk${href}`);
        for (let y = 0; y < linksToActivate.length; y++) linksToActivate[y].classList.add('active');
    }

    function removeActiveLinks() {
        document.querySelectorAll('.active').forEach((e) => e.classList.remove('active'));
    }

    document.addEventListener('scroll', function () {
        removeActiveLinks();

        const principalSection = document.querySelector('#principales');
        const generalesSection = document.querySelector('#generales');
        const ventasSection = document.querySelector('#ventas');
        const almacenSection = document.querySelector('#almacen');
        const contabilidadSection = document.querySelector('#contabilidad');
        const disposicionesSection = document.querySelector('#disposiciones');
        const demostracionSection = document.querySelector('#demostracion');

        let scrollPosition = window.scrollY || document.documentElement.scrollTop;

        // Principal
        if (scrollPosition >= principalSection.offsetTop && scrollPosition < principalSection.offsetTop + principalSection.offsetHeight) {
            document.getElementsByClassName('navbar')[0].classList.remove('navbar--dark');
            setActiveLink('principales');
        } else document.getElementsByClassName('navbar')[0].classList.add('navbar--dark');

        // Generales
        if (scrollPosition >= generalesSection.offsetTop && scrollPosition < generalesSection.offsetTop + generalesSection.offsetHeight)
            setActiveLink('generales');

        //Ventas
        if (scrollPosition >= ventasSection.offsetTop && scrollPosition < ventasSection.offsetTop + ventasSection.offsetHeight) setActiveLink('ventas');

        //Almacen
        if (scrollPosition >= almacenSection.offsetTop && scrollPosition < almacenSection.offsetTop + almacenSection.offsetHeight) setActiveLink('almacen');

        //Contabilidad
        if (scrollPosition >= contabilidadSection.offsetTop && scrollPosition < contabilidadSection.offsetTop + contabilidadSection.offsetHeight)
            setActiveLink('contabilidad');

        // Disposiciones
        if (scrollPosition >= disposicionesSection.offsetTop && scrollPosition < disposicionesSection.offsetTop + disposicionesSection.offsetHeight)
            setActiveLink('disposiciones');

        // Demostracion
        if (scrollPosition >= demostracionSection.offsetTop && scrollPosition < demostracionSection.offsetTop + demostracionSection.offsetHeight) {
            document.getElementsByClassName('navbar')[0].classList.add('navbar--blue');
            setActiveLink('demostracion');
        } else document.getElementsByClassName('navbar')[0].classList.remove('navbar--blue');
    });
    return {
        toggleSideMenu
    };
})();
