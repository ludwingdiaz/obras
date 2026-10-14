document.addEventListener("DOMContentLoaded", async () => {
  const contenedorServicios = document.getElementById("contenedor-servicios");
  const contenedorFiltros = document.getElementById("contenedor-filtros");
  
  if (!contenedorServicios) return;

  try {
    const response = await fetch('data/servicios.json');
    if (!response.ok) throw new Error('Error al cargar servicios.json');
    const servicios = await response.json();

    // Renderizar tarjetas de servicios
    function renderizarServicios(lista) {
      contenedorServicios.innerHTML = "";
      if (lista.length === 0) {
        contenedorServicios.innerHTML = `<div class="col-12 text-center py-5"><p class="text-muted">No se encontraron servicios en esta categoría.</p></div>`;
        return;
      }

      lista.forEach(servicio => {
        const col = document.createElement("div");
        col.className = "col-md-4";
        col.innerHTML = `
          <div class="card h-100 shadow-sm border-0">
            <div class="position-relative">
              <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.nombre}" style="height: 220px; object-fit: cover;">
              <span class="badge bg-primary position-absolute top-0 end-0 m-3">${servicio.categoria}</span>
            </div>
            <div class="card-body d-flex flex-column">
              <h3 class="h5 card-title fw-bold text-dark mb-2">
                <i class="bi ${servicio.icono || 'bi-tools'} text-primary me-2"></i>${servicio.nombre}
              </h3>
              <p class="card-text text-muted small flex-grow-1">${servicio.descripcion}</p>
              <button class="btn btn-outline-primary btn-sm mt-3 w-100" data-bs-toggle="modal" data-bs-target="#modalServicio" data-id="${servicio.id}">
                Ver detalles y ventajas
              </button>
            </div>
          </div>
        `;
        contenedorServicios.appendChild(col);
      });
    }

    // Generar botones de filtro dinámicamente
    if (contenedorFiltros) {
      const categorias = ["Todos", ...new Set(servicios.map(s => s.categoria))];
      contenedorFiltros.innerHTML = "";
      
      categorias.forEach((cat, index) => {
        const btn = document.createElement("button");
        btn.className = `btn ${index === 0 ? 'btn-dark' : 'btn-outline-dark'} btn-sm m-1`;
        btn.textContent = cat;
        btn.addEventListener("click", () => {
          document.querySelectorAll("#contenedor-filtros button").forEach(b => {
            b.classList.remove('btn-dark');
            b.classList.add('btn-outline-dark');
          });
          btn.classList.remove('btn-outline-dark');
          btn.classList.add('btn-dark');

          if (cat === "Todos") {
            renderizarServicios(servicios);
          } else {
            renderizarServicios(servicios.filter(s => s.categoria === cat));
          }
        });
        contenedorFiltros.appendChild(btn);
      });
    }

    // Renderizado inicial
    renderizarServicios(servicios);

    // Configurar Modal de Detalle
    const modalServicio = document.getElementById('modalServicio');
    if (modalServicio) {
      modalServicio.addEventListener('show.bs.modal', event => {
        const button = event.relatedTarget;
        const idServicio = button.getAttribute('data-id');
        const servicio = servicios.find(s => s.id === idServicio);

        if (servicio) {
          document.getElementById('modalTitulo').textContent = servicio.nombre;
          document.getElementById('modalCategoria').textContent = servicio.categoria;
          document.getElementById('modalDescripcion').textContent = servicio.descripcion;
          document.getElementById('modalCuandoConviene').textContent = servicio.cuandoConviene;
          document.getElementById('modalVentajas').textContent = servicio.ventajas;
          document.getElementById('modalImagen').src = servicio.imagen;
          
          const listaIncluye = document.getElementById('modalIncluye');
          listaIncluye.innerHTML = '';
          if (servicio.queIncluye && servicio.queIncluye.length > 0) {
            servicio.queIncluye.forEach(item => {
              const li = document.createElement('li');
              li.textContent = item;
              listaIncluye.appendChild(li);
            });
          }

          // Enlace del botón de presupuesto del modal
          const btnPresupuestoModal = document.getElementById('btnPresupuestoModal');
          if (btnPresupuestoModal) {
            btnPresupuestoModal.href = `contacto.html?servicio=${encodeURIComponent(servicio.nombre)}`;
          }
        }
      });
    }

  } catch (error) {
    console.error("Error cargando el catálogo de servicios:", error);
    if (contenedorServicios) {
      contenedorServicios.innerHTML = `<div class="col-12 text-center text-danger"><p>Error al cargar los servicios. Por favor, recarga la página.</p></div>`;
    }
  }
});