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

  // Funcion de validacion
  function validarFormularioCompleto(formulario) {
    const esValido = formulario.checkValidity();
    formulario.classList.add("was-validated");
    return esValido;
  }

  // 2. Boton de Envio por WhatsApp con numeros decimales seguros (Cero errores en Windows)
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

        // Emojis generados mediante numeros decimales puros (imunes a la codificacion ANSI/Windows)
        const emojiObra = String.fromCodePoint(127959); // 🏗️
        const emojiCliente = String.fromCodePoint(128100); // 👤
        const emojiUbicacion = String.fromCodePoint(128205); // 📍
        const emojiServicio = String.fromCodePoint(128736); // 🛠️
        const emojiNota = String.fromCodePoint(128221); // 📝
        const emojiTelefono = String.fromCodePoint(128222); // 📞

        const textoWhatsApp = `${emojiObra} *SOLICITUD DE PRESUPUESTO - SGM*
----------------------------------------
${emojiCliente} *Cliente:* ${nombre}
${emojiUbicacion} *Ubicacion:* ${zona}
${emojiServicio} *Servicio:* ${servicio}

${emojiNota} *Detalles del proyecto:*
"${mensaje}"

${emojiTelefono} *Datos de contacto:*
- Telefono: ${telefono}
- Email: ${email}
----------------------------------------
_Mensaje enviado desde la web corporativa_`;

        const telefonoEmpresa = "34644164231";
        const urlWa = `https://wa.me/${telefonoEmpresa}?text=${encodeURIComponent(textoWhatsApp)}`;

        window.open(urlWa, "_blank");
      }
    });
  }

  // 3. Envio por Correo
  form.addEventListener("submit", (e) => {
    if (!validarFormularioCompleto(form)) {
      e.preventDefault();
    } else {
      const alerta = document.getElementById("alertaExito");
      if (alerta) alerta.classList.remove("d-none");
    }
  });
});
