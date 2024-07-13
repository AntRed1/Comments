// Función para mostrar mensaje de SweetAlert
function mostrarMensaje(title, text, icon = "info") {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: "OK",
  });
}

// Función para manejar errores de red o servidor
function manejarError(error) {
  console.error("Error:", error);
  mostrarMensaje(
    "Error",
    "Hubo un problema con la solicitud. Por favor, inténtelo de nuevo más tarde.",
    "error"
  );
}

// Función para cargar comentarios con paginación
function cargarComentarios(page = 1, limit = 10) {
  // Mostrar SweetAlert de carga
  Swal.fire({
    title: "Cargando comentarios...",
    html: '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Cargando...</span>',
    allowOutsideClick: false,
    showConfirmButton: false,
  });

  fetch(`php/comentarios.php?page=${page}&limit=${limit}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const comentariosContainer = document.getElementById(
        "comentariosContainer"
      );
      comentariosContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar los nuevos comentarios
      data.forEach((comentario) => {
        const comentarioHTML = `
          <div class="alert alert-light" role="alert">
            <p><strong>${comentario.nombre} ${comentario.apellidos}</strong></p>
            <p>${comentario.comentarios}</p>
            <small class="text-muted">${comentario.fecha}</small>
          </div>
        `;
        comentariosContainer.innerHTML += comentarioHTML;
      });

      // Actualizar badge con cantidad de comentarios
      const commentBadge = document.getElementById("commentBadge");
      commentBadge.innerText = data.length;

      // Cerrar SweetAlert después de cargar comentarios
      Swal.close();
    })
    .catch(manejarError);
}

// Refactorización del envío de comentarios utilizando async/await
async function enviarComentario(formData) {
  try {
    const response = await fetch("php/comentarios.php", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    manejarError(error);
  }
}

// Actualización de Enviar(event) para utilizar async/await
async function Enviar(event) {
  event.preventDefault(); // Prevenir envío por default

  const nombre = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const email = document.getElementById("email").value.trim();
  const comentarios = document.getElementById("comentarios").value.trim();

  if (!validarCampos(nombre, apellidos, email, comentarios)) {
    mostrarMensaje(
      "Existen Campos Vacíos",
      "Por favor, complete todos los campos correctamente.",
      "error"
    );
    return;
  }

  const result = await Swal.fire({
    title: "Desea guardar los cambios?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    denyButtonText: `No Guardar`,
  });

  if (result.isConfirmed) {
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("apellidos", apellidos);
    formData.append("email", email);
    formData.append("comentarios", comentarios);

    const data = await enviarComentario(formData);
    if (data.success) {
      limpiarCampos();
      cargarComentarios();
      mostrarMensaje(
        "Guardado",
        "El comentario se ha guardado correctamente.",
        "success"
      );
    } else {
      mostrarMensaje(
        "Error",
        `No se pudo guardar el comentario. ${data.message}`,
        "error"
      );
    }
  } else if (result.isDenied) {
    mostrarMensaje("Cancelado", "Los cambios no fueron guardados.", "info");
  }
}

// Listener para el botón de cargar comentarios
const btnCargarComentarios = document.getElementById("btnCargarComentarios");
btnCargarComentarios.addEventListener("click", () => {
  cargarComentarios();
});

// Cargar comentarios automáticamente al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  cargarComentarios();
});
