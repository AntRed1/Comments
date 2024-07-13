// Función para cargar los comentarios existentes
function cargarComentarios() {
  // Mostrar SweetAlert de carga con el spinner de Bootstrap
  Swal.fire({
    title: "Cargando comentarios...",
    html: '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Cargando...</span>',
    allowOutsideClick: false,
    showConfirmButton: false,
  });

  fetch("php/comentarios.php")
    .then((response) => response.json())
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

      // Actualizar el badge con la cantidad de comentarios
      const commentBadge = document.getElementById("commentBadge");
      commentBadge.innerText = data.length;

      // Cerrar SweetAlert después de cargar los comentarios
      Swal.close();
    })
    .catch((error) => {
      console.error("Error al cargar los comentarios:", error);
      // Mostrar mensaje de error con SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al cargar los comentarios. Por favor, inténtelo de nuevo más tarde.",
      });
    });
}

// Obtener referencia al botón de comentarios
const btnCargarComentarios = document.getElementById("btnCargarComentarios");

// Agregar listener al botón para cargar comentarios al hacer clic
btnCargarComentarios.addEventListener("click", () => {
  cargarComentarios();
});

// Función para validar campos
function validarCampos(nombre, apellidos, email, comentarios) {
  // Validar formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (
    nombre.trim() !== "" &&
    apellidos.trim() !== "" &&
    email.trim() !== "" &&
    comentarios.trim() !== "" &&
    emailRegex.test(email)
  );
}

// Función para limpiar los campos del formulario después de enviar
function limpiarCampos() {
  document.getElementById("nombre").value = "";
  document.getElementById("apellidos").value = "";
  document.getElementById("email").value = "";
  document.getElementById("comentarios").value = "";
}

// Función para enviar comentarios
function Enviar(event) {
  event.preventDefault(); // Prevenir que el formulario se envíe por default.

  const nombre = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const email = document.getElementById("email").value.trim();
  const comentarios = document.getElementById("comentarios").value.trim();

  if (!validarCampos(nombre, apellidos, email, comentarios)) {
    Swal.fire({
      icon: "error",
      title: "Existen Campos vacíos",
      text: "Por favor, complete todos los campos correctamente.",
    });
  } else {
    Swal.fire({
      title: "Desea guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `No Guardar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("apellidos", apellidos);
        formData.append("email", email);
        formData.append("comentarios", comentarios);

        fetch("php/comentarios.php", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              limpiarCampos();
              cargarComentarios();
              Swal.fire({
                title: "Guardado!",
                text: "El comentario se ha guardado correctamente.",
                icon: "success",
                confirmButtonText: "OK",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo guardar el comentario. " + data.message,
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un problema con la solicitud. " + error,
            });
          });
      } else if (result.isDenied) {
        Swal.fire("Los cambios no fueron guardados", "", "info");
      }
    });
  }
}

// Llamar a cargarComentarios al cargar la página (opcional, si lo quieres cargar automáticamente)
document.addEventListener("DOMContentLoaded", () => {
  // cargarComentarios();
});
