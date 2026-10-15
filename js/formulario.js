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

  // Función de validación
  function validarFormularioCompleto(formulario) {
    const esValido = formulario.checkValidity();
    formulario.classList.add("was-validated");
    return esValido;
  }

  // 2. Botón de Envío por WhatsApp con emojis seguros
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

        // Generación de emojis mediante códigos seguros (cero errores de codificación)
        const edificio = String.fromCodePoint(0x1f3d7); // 🏗️
        const persona = String.fromCodePoint(0x1f464); // 👤
        const pin = String.fromCodePoint(0x1f4cd); // 📍
        const herramienta = String.fromCodePoint(0x1f6e0); // 🛠️
        const nota = String.fromCodePoint(0x1f4dd); // 📝
        const telefonoIcon = String.fromCodePoint(0x1f4de); // 📞

        const textoWhatsApp = `${edificio} *SOLICITUD DE PRESUPUESTO - SGM*
────────────────────────────
${persona} *Cliente:* ${nombre}
${pin} *Ubicación:* ${zona}
${herramienta} *Servicio solicitado:* ${servicio}

${nota} *Detalles de la obra:*
"${mensaje}"

${telefonoIcon} *Datos de contacto:*
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
