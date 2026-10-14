document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formPresupuesto");
  if (!form) return;

  // 1. Detectar si viene un servicio precargado por URL
  const urlParams = new URLSearchParams(window.location.search);
  const servicioParam = urlParams.get("servicio");

  if (servicioParam) {
    const selectServicio = document.getElementById("servicio");
    if (selectServicio) {
      const servicioDecodificado = decodeURIComponent(servicioParam).trim();
      for (let option of selectServicio.options) {
        if (
          option.value.toLowerCase() === servicioDecodificado.toLowerCase() ||
          option.text.toLowerCase() === servicioDecodificado.toLowerCase()
        ) {
          selectServicio.value = option.value;
          break;
        }
      }
    }
  }

  // Validación de formulario
  function validarFormularioCompleto(formulario) {
    const esValido = formulario.checkValidity();
    formulario.classList.add("was-validated");
    return esValido;
  }

  // 2. Botón de Envío por WhatsApp formateado
  const btnWhatsApp = document.getElementById("btnEnviarWhatsApp");
  if (btnWhatsApp) {
    btnWhatsApp.addEventListener("click", () => {
      if (validarFormularioCompleto(form)) {
        const nombre = document.getElementById("nombre").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const email = document.getElementById("email").value.trim();
        const servicio = document.getElementById("servicio").value;
        const zona = document.getElementById("zona").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        // Formato visual y elegante para WhatsApp
        const textoWhatsApp = `🏗️ *SOLICITUD DE PRESUPUESTO - SGM*
────────────────────────────
👤 *Cliente:* ${nombre}
📍 *Ubicación:* ${zona}
🛠️ *Servicio solicitado:* ${servicio}

📝 *Detalles de la obra:*
"${mensaje}"

📞 *Datos de contacto:*
• Teléfono: ${telefono}
• Email: ${email}
────────────────────────────
_Mensaje enviado desde la web corporativa_`;

        const telefonoEmpresa = "34644164231";
        const urlWa = `https://wa.me/${telefonoEmpresa}?text=${encodeURIComponent(textoWhatsApp)}`;

        window.open(urlWa, "_blank");
      }
    });
  }

  // 3. Envío por Correo
  form.addEventListener("submit", (e) => {
    if (!validarFormularioCompleto(form)) {
      e.preventDefault();
    } else {
      const alerta = document.getElementById("alertaExito");
      if (alerta) alerta.classList.remove("d-none");
    }
  });
});
