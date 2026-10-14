document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch('data/empresa.json');
    if (!response.ok) throw new Error('No se pudo cargar la configuración de la empresa.');
    const empresa = await response.json();

    // Rellenar dinámicamente elementos con atributos de datos o IDs específicos
    document.querySelectorAll('[data-empresa="nombre"]').forEach(el => el.textContent = empresa.nombre);
    document.querySelectorAll('[data-empresa="telefono"]').forEach(el => {
      el.textContent = empresa.telefono;
      el.href = `tel:${empresa.telefono.replace(/\s+/g, '')}`;
    });
    document.querySelectorAll('[data-empresa="whatsapp"]').forEach(el => {
      el.href = empresa.whatsapp;
    });
    document.querySelectorAll('[data-empresa="email"]').forEach(el => {
      el.textContent = empresa.email;
      el.href = `mailto:${empresa.email}`;
    });
    document.querySelectorAll('[data-empresa="zona"]').forEach(el => el.textContent = empresa.zona);
    document.querySelectorAll('[data-empresa="horario"]').forEach(el => el.textContent = empresa.horario);
  } catch (error) {
    console.error("Error al inicializar los datos de empresa:", error);
  }
});