document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formPresupuesto");
  if (!form) return;

  // 1. Detectar si viene un servicio precargado por URL y seleccionarlo en el select
  const urlParams = new URLSearchParams(window.location.search);
  const servicioParam = urlParams.get("servicio");

  if (servicioParam) {
    const selectServicio = document.getElementById("servicio");
    if (selectServicio) {
      const servicioDecodificado = decodeURIComponent(servicioParam).trim();
      // Buscar la opción cuyo valor o texto coincida
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

  // 2. Botón de Envío por WhatsApp directo
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

        // Construir el texto formateado correctamente
        const textoWhatsApp = `Hola, mi nombre es *${nombre}*. Me interesa el servicio de *${servicio}* en *${zona}*.\n\n*Detalles del proyecto:* ${mensaje}\n\n*Contacto:* Tel: ${telefono} | Email: ${email}`;

        const telefonoEmpresa = "34644164231";
        const urlWa = `https://wa.me/${telefonoEmpresa}?text=${encodeURIComponent(textoWhatsApp)}`;

        window.open(urlWa, "_blank");
      }
    });
  }

  // 3. Envío por Correo (FormSubmit con validación previa)
  form.addEventListener("submit", (e) => {
    if (!validarFormularioCompleto(form)) {
      e.preventDefault(); // Detiene el envío si hay errores
    } else {
      const alerta = document.getElementById("alertaExito");
      if (alerta) alerta.classList.remove("d-none");
    }
  });
});
