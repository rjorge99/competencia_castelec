const api = (function () {
    function toggleSideMenu(target) {
        const sidenav = document.getElementById('sidenav');
        const imageElement = target;
        const isCurremtHamburguer = imageElement.src.includes('images/hamburguer-icon.svg');

        sidenav.classList.toggle('show');
        imageElement.src = isCurremtHamburguer ? 'images/arrow-icon.svg' : 'images/hamburguer-icon.svg';
    }

    // Click behaviour
    (function addPageEvents() {
        (function addLinkClickEvents() {
            const links = document.getElementsByClassName('nav-link');
            for (let i = 0; i < links.length; i++) {
                links[i].addEventListener('click', function ({ target }) {
                    removeActiveLinks();
                    setActiveLink(target.attributes['href'].value.replace('#', ''));
                });
            }
        })();

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

        function setActiveLink(href) {
            const linksToActivate = document.getElementsByClassName(`lnk${href}`);
            for (let y = 0; y < linksToActivate.length; y++) linksToActivate[y].classList.add('active');
        }

        function removeActiveLinks() {
            document.querySelectorAll('.active').forEach((e) => e.classList.remove('active'));
        }

        document.getElementById('form-demostracion').addEventListener('submit', function (e) {
            e.preventDefault();
            sendData();
        });

        async function sendData() {
            notify();
            return;
            var myform = document.getElementById('form-demostracion');
            var formData = new FormData(myform);

            fetch('https://api.castelec.mx/Castelec/Demostracion', {
                method: 'POST',
                // headers: {
                //     Accept: 'application/json',
                //     'Content-Type': 'application/json'
                // },
                body: formData
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.StatusCode === 400) {
                        let campo;
                        switch (data.StatusDescription) {
                            case 'name':
                                campo = 'Nombre';
                                $('#popUp').children().children()[1].innerText = "El campo 'Nombre' debe contener al menos 1 apellido";
                                $('#popUp').show();
                                $("[name= 'name']").addClass('campoInaceptable');
                                break;
                            case 'state':
                                campo = 'Estado';
                                $("[name= 'state']").addClass('campoInaceptable');
                                break;
                            case 'city':
                                campo = 'Ciudad';
                                $("[name= 'city']").addClass('campoInaceptable');
                                break;
                            case 'jobtitle':
                                campo = 'Puesto del responsable';
                                $("[name= 'jobtitle']").addClass('campoInaceptable');
                                break;
                            case 'source':
                                campo = '¿Cómo se enteró de nosotros?';
                                $("[name= 'source']").addClass('campoInaceptable');
                                break;
                            case 'company':
                                campo = 'Empresa';
                                $("[name= 'company']").addClass('campoInaceptable');
                                break;
                            case 'phone':
                                campo = 'Teléfono';
                                $("[name= 'phone']").addClass('campoInaceptable');
                                break;
                            case 'email':
                                campo = 'Email';
                                $("[name= 'email']").addClass('campoInaceptable');
                                break;
                            case 'promocode':
                                campo = 'Código de promoción';
                                $("[name= 'promocode']").addClass('campoInaceptable');
                                break;
                        }
                        if (campo != 'Nombre') {
                            $('#popUp').children().children()[1].innerText =
                                'El campo: ' + campo + '\n es invalido. Verifica que no esté vacio o contenga caracteres especiales (ej. <, >, !, *, etc...)';
                            $('#popUp').show();
                        }
                        $('#enviar').html('<img class="imagen_flecha"src="images/HomePage/Flecha_b_.svg" alt="">&nbsp;&nbsp;&nbsp;Enviar');
                        $('#enviar').prop('disabled', false);
                    } else if (data.StatusCode === 200) {
                        $(this).attr('disabled', 'disabled');
                        $(this).removeClass('gradiente-trans');
                        $(this).css('filter', 'brightness');
                        window.location.replace('confirmacionRecibo.html');
                    } else if (data.StatusCode === 401) {
                        $('#popUp').children().children()[1].innerText = `Ocurrio un error por favor intente más tarde.`;
                        $('#popUp').show();
                        $('#enviar').html('<img class="imagen_flecha"src="images/HomePage/Flecha_b_.svg" alt="">&nbsp;&nbsp;&nbsp;Enviar');
                        $('#enviar').prop('disabled', false);
                    }
                })
                .catch((textStatus) => {
                    console.log(textStatus);
                    $('#popUp').children().children()[1].innerText =
                        'No se pudo procesar tu solicitud, inténtalo más tarde.\nSi el problema persiste, favor de reportarlo a Castelec.';
                    $('#popUp').show();
                    $('#enviar').html('<img class="imagen_flecha"src="images/HomePage/Flecha_b_.svg" alt="">&nbsp;&nbsp;&nbsp;Enviar');
                    $('#enviar').prop('disabled', false);
                });
        }
    })();

    return {
        toggleSideMenu
    };
})();

function notify(message) {
    new AWN({
        // durations: { global: 100000 }
    }).info('Mensaje enviado');
}
