function validarCampos(nombre, apellidos, email, comentarios) {
  return nombre && apellidos && email && comentarios;
}

function limpiarCampos() {
  document.getElementById("nombre").value = "";
  document.getElementById("apellidos").value = "";
  document.getElementById("email").value = "";
  document.getElementById("comentarios").value = "";
}

function Enviar(event) {
  event.preventDefault(); // Prevenir que el formulario se envíe por default.

  var nombre = document.getElementById("nombre").value.trim();
  var apellidos = document.getElementById("apellidos").value.trim();
  var email = document.getElementById("email").value.trim();
  var comentarios = document.getElementById("comentarios").value.trim();

  if (!validarCampos(nombre, apellidos, email, comentarios)) {
    // Atravez de la funcion valida que los campos no esten vacios o nulos.
    Swal.fire({
      icon: "error",
      title: "Existen Campos vacíos",
      text: "Por favor, complete todos los campos.",
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
        // Crear un objeto FormData para enviar los datos del formulario.
        var formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("apellidos", apellidos);
        formData.append("email", email);
        formData.append("comentarios", comentarios);

        // Enviar la solicitud POST con fetch
        fetch("php/insertar.php", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text())
          .then((data) => {
            if (data.trim() === "Nuevo registro creado exitosamente") {
              Swal.fire("Guardado!", "", "success");
              limpiarCampos(nombre, apellidos, email, comentarios);
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo guardar el comentario. " + data,
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
