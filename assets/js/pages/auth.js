function initPasswordToggle() {
    document.querySelectorAll('[data-toggle-password]').forEach((button) => {
        const inputId = button.getAttribute('aria-controls');
        const input = document.getElementById(inputId);
        const icon = button.querySelector('i');
        if (!input || !icon) return;

        button.addEventListener('click', () => {
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            icon.classList.toggle('fa-eye', !isPassword);
            icon.classList.toggle('fa-eye-slash', isPassword);
            button.setAttribute('aria-label', isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña');
        });
    });
}

function validatePasswordMatch(form) {
    const password = form.querySelector('[name="contrasena"]');
    const confirm = form.querySelector('[name="confirmar_contrasena"]');
    if (!password || !confirm) return true;

    if (password.value !== confirm.value) {
        confirm.setCustomValidity('Las contraseñas no coinciden.');
        confirm.reportValidity();
        return false;
    }

    confirm.setCustomValidity('');
    return true;
}

function initRegisterValidation() {
    document.querySelectorAll('[data-register-form]').forEach((form) => {
        const confirm = form.querySelector('[name="confirmar_contrasena"]');
        const password = form.querySelector('[name="contrasena"]');
        if (!confirm || !password) return;

        const clearMismatch = () => {
            if (password.value === confirm.value) {
                confirm.setCustomValidity('');
            }
        };

        confirm.addEventListener('input', clearMismatch);
        password.addEventListener('input', clearMismatch);
    });
}

function initAuthForms() {
    initRegisterValidation();

    document.querySelectorAll('[data-auth-form]').forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (form.hasAttribute('data-register-form') && !validatePasswordMatch(form)) {
                return;
            }

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const feedback = form.querySelector('[data-form-feedback]');
            if (feedback) {
                feedback.classList.remove('hidden');
            }
        });
    });
}

initPasswordToggle();
initAuthForms();
