
// La cortina se configura apenas el DOM está listo para que el primer clic siempre responda.
document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro');
    const skipBtn = document.getElementById('skip-btn');
    if (!intro || !skipBtn) return;
    const closeIntro = () => {
        if (intro.classList.contains('slide-up')) return;
        intro.classList.add('slide-up');
        window.setTimeout(() => { intro.setAttribute('aria-hidden', 'true'); intro.inert = true; }, 1050);
    };
    if (window.location.hash) { closeIntro(); return; }
    const introTimer = window.setTimeout(closeIntro, 6000);
    skipBtn.addEventListener('click', () => { window.clearTimeout(introTimer); closeIntro(); }, { once: true });
});

// Configuración del Observador (El "Vigilante")
const options = {
    root: null,
    rootMargin: '-40% 0px -40% 0px', // Se activa cuando el texto está en el CENTRO de la pantalla
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 1. Averiguar qué paso es (1, 2 o 3)
            const stepNumber = entry.target.getAttribute('data-step');

            // 2. Desactivar todas las imágenes
            document.querySelectorAll('.scroll-img').forEach(img => {
                img.classList.remove('active');
            });

            // 3. Activar solo la imagen correspondiente
            const imgToActivate = document.querySelector(`.scroll-img[data-img="${stepNumber}"]`);
            if (imgToActivate) {
                imgToActivate.classList.add('active');
            }
        }
    });
}, options);

// Decirle al vigilante que observe los pasos de texto
document.querySelectorAll('.step').forEach(step => {
    observer.observe(step);
});

// --- LÓGICA DEL FORMULARIO DE CONTACTO ---
const sayHiBtn = document.getElementById('say-hi-btn');
const contactOverlay = document.getElementById('contact-overlay');
const nameInput = document.getElementById('name-input');
const contactInfoInput = document.getElementById('contact-info-input');
const messageInput = document.getElementById('message-input');
const backBtn = document.getElementById('back-btn');
const sendBtn = document.getElementById('send-btn');

function checkFormValidity() {
    if (!nameInput || !contactInfoInput || !messageInput || !sendBtn) return;

    const isNameValid = nameInput.value.trim().length > 0;
    const isContactValid = contactInfoInput.value.trim().length > 0;
    const isMessageValid = messageInput.value.trim().length > 0;

    if (isNameValid && isContactValid && isMessageValid) {
        if (sendBtn.classList.contains('hidden')) {
            sendBtn.classList.remove('hidden');
            sendBtn.style.display = 'inline-block';
            sendBtn.animate([
                { opacity: 0, transform: 'translateX(-10px)' },
                { opacity: 1, transform: 'translateX(0)' }
            ], {
                duration: 300,
                easing: 'ease-out',
                fill: 'forwards'
            });
        }
    } else {
        sendBtn.classList.add('hidden');
        sendBtn.style.display = 'none';
    }
}

// 1. Mostrar el overlay y posicionar botón
if (sayHiBtn && contactOverlay) {
    sayHiBtn.addEventListener('click', () => {
        const rect = sayHiBtn.getBoundingClientRect();
        const actionsContainer = document.querySelector('.contact-actions');

        actionsContainer.style.top = `${rect.top}px`;
        actionsContainer.style.left = `${rect.left}px`;

        contactOverlay.classList.add('active');
        if (nameInput) nameInput.focus();

        checkFormValidity();
    });
}

// 2. Ocultar el overlay (Botón Regresar)
if (backBtn && contactOverlay) {
    backBtn.addEventListener('click', () => {
        contactOverlay.classList.remove('active');
    });
}

// 3. Mostrar botón "Enviar" solo si hay texto en todos los campos
if (messageInput && sendBtn && nameInput && contactInfoInput) {
    nameInput.addEventListener('input', checkFormValidity);
    contactInfoInput.addEventListener('input', checkFormValidity);
    messageInput.addEventListener('input', checkFormValidity);
}

// 4. Simular envío
if (sendBtn && messageInput && contactOverlay) {
    sendBtn.addEventListener('click', () => {
        if (!nameInput || !contactInfoInput || !messageInput) return;

        const name = nameInput.value.trim();
        const contact = contactInfoInput.value.trim();
        const message = messageInput.value.trim();

        if (name && contact && message) {
            // Aquí iría la integración con EmailJS o Backend
            console.log("Nom:", name, "Contacto:", contact, "Msj:", message);

            sendBtn.textContent = "¡Enviado!";
            sendBtn.style.backgroundColor = "#4caf50";
            sendBtn.style.borderColor = "#4caf50";

            setTimeout(() => {
                contactOverlay.classList.remove('active');
                nameInput.value = "";
                contactInfoInput.value = "";
                messageInput.value = "";

                sendBtn.classList.add('hidden');
                sendBtn.style.display = 'none';
                sendBtn.textContent = "Enviar";
                sendBtn.style.backgroundColor = "";
                sendBtn.style.borderColor = "";
            }, 1500);
        }
    });
}

/* --- CUSTOM CURSOR LOGIC --- */
const cursor = document.getElementById('custom-cursor');

// 1. Mover el cursor con el mouse
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // 2. Detectar Hover en elementos de texto e interactivos
    const hoverElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button, input, textarea, label, li, .logo-wrapper, .nav-links a');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');

            // Calcular altura dinámica basada en el texto
            const style = window.getComputedStyle(el);
            let height = parseFloat(style.lineHeight);

            // Si line-height es 'normal' o no numérico, usar font-size * 1.2
            if (isNaN(height)) {
                height = parseFloat(style.fontSize) * 1.2;
            }

            // Aplicar altura al cursor
            // Añadimos un pequeño ajuste si es necesario, pero line-height suele ser correcto
            cursor.style.height = `${height}px`;
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
            cursor.style.height = ''; // Resetear al valor del CSS original
        });
    });
}
// 3. Efecto "Magnético" en imágenes de servicios
const serviceImages = document.querySelectorAll('.service-image');

serviceImages.forEach(wrapper => {
    const img = wrapper.querySelector('img') || wrapper.querySelector('.material-symbols-outlined');

    // Mover la imagen al pasar el mouse por el contenedor
    wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();

        // Posición del mouse dentro del elemento
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calcular el centro
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calcular el desplazamiento (delta) desde el centro
        // Dividimos entre un factor (ej: 15) para suavizar el movimiento
        // Si quieres más movimiento, reduce el divisor (ej: 10)
        // Si quieres menos, auméntalo (ej: 20)
        const moveX = (x - centerX) / 15;
        const moveY = (y - centerY) / 15;

        // Aplicamos la transformación
        // scale(1.1) asegura que al moverse no queden bordes vacíos
        img.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;

        // IMPORTANTE: Quitamos la transición durante el movimiento para que sea instantáneo y siga al mouse
        img.style.transition = 'none';
    });

    // Resetear al salir
    wrapper.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1) translate(0, 0)';
        // Restauramos la transición para que vuelva suavemente al centro
        img.style.transition = 'transform 0.5s ease';
    });
});

// 4. Gradiente interactivo en las tarjetas de expertise (Sigue al mouse)
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        
        // Calcular posición en píxeles relativa a la card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calcular porcentajes para el radial-gradient
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        // Pasar las coordenadas a CSS como variables
        card.style.setProperty('--x', `${xPercent}%`);
        card.style.setProperty('--y', `${yPercent}%`);
    });
});


// Navegación: scroll corto con easing y contraste del header sobre el hero claro.
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const hero = document.querySelector('.hero');
    const projectsLink = document.querySelector('.site-nav a[href="#casos"]');

    if (header && hero && 'IntersectionObserver' in window) {
        const lightSectionObserver = new IntersectionObserver(([entry]) => {
            header.classList.toggle('over-light', entry.isIntersecting && entry.intersectionRatio > 0.12);
        }, { threshold: [0, 0.12, 0.5] });
        lightSectionObserver.observe(hero);
    }

    if (projectsLink) {
        projectsLink.addEventListener('click', event => {
            const target = document.getElementById('casos');
            if (!target) return;
            event.preventDefault();
            const startY = window.scrollY;
            const endY = target.getBoundingClientRect().top + startY - (header?.offsetHeight || 0);
            const duration = 400;
            const startTime = performance.now();
            const ease = t => 1 - Math.pow(1 - t, 3);
            const frame = now => {
                const progress = Math.min((now - startTime) / duration, 1);
                window.scrollTo(0, startY + (endY - startY) * ease(progress));
                if (progress < 1) requestAnimationFrame(frame);
                else history.replaceState(null, '', '#casos');
            };
            requestAnimationFrame(frame);
        });
    }
});
