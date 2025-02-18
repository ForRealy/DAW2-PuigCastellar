"use strict";
// Valida que el email tenga el formato correcto
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// Retorna un mensaje de error según el campo
function getErrorMessage(field) {
    if (field === "nom")
        return "El nom és obligatori";
    if (field === "dataNaixement")
        return "Selecciona una data";
    if (field === "email")
        return "Email invàlid";
    if (field === "password")
        return "Mínim 8 caràcters, 1 majúscula, 1 minúscula i 1 número";
    return "Valor invàlid";
}
// Limpia los mensajes de error
function clearErrors() {
    document.querySelectorAll(".error-message").forEach((el) => {
        el.textContent = "";
    });
}
// Valida un campo y muestra el error si no es válido
function validateField(id, test) {
    const input = document.getElementById(id);
    const errorSpan = input.nextElementSibling;
    if (!test(input.value)) {
        errorSpan.textContent = getErrorMessage(id);
        return false;
    }
    return true;
}
// Evento al enviar el formulario
document.getElementById("clientForm").addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();
    // Validar cada campo
    const validNom = validateField("nom", (val) => val.trim() !== "");
    const validDataNaixement = validateField("dataNaixement", (val) => !!val);
    const validEmail = validateField("email", isValidEmail);
    const validPassword = validateField("password", (val) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(val));
    if (validNom && validDataNaixement && validEmail && validPassword) {
        const emailInput = document.getElementById("email");
        const email = emailInput.value;
        // Buscar usuarios ya guardados
        const storedUsers = localStorage.getItem("users");
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        // Verificar si el email ya existe (ignorando mayúsculas/minúsculas)
        if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
            emailInput.nextElementSibling.textContent =
                "Aquest correu electrònic ja està registrat";
            return;
        }
        // Crear el nuevo usuario
        const newUser = {
            nom: document.getElementById("nom").value.trim(),
            dataNaixement: document.getElementById("dataNaixement")
                .value,
            email: email,
            password: document.getElementById("password").value,
        };
        // Guardar el nuevo usuario y enviar el formulario
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        this.submit();
    }
});
//# sourceMappingURL=form_validation.js.map