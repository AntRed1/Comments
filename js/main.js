function validarCampos(nombre, apellidos, email, comentarios) {
  return nombre && apellidos && email && comentarios;
}

function Enviar() {
  var nombre = document.getElementById("nombre").value.trim();
  var apellidos = document.getElementById("apellidos").value.trim();
  var email = document.getElementById("email").value.trim();
  var comentarios = document.getElementById("comentarios").value.trim();

  if (validarCampos(nombre, apellidos, email, comentarios)) {
    Swal.fire({
      icon: "error",
      title: "Existen Campos vacios",
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
        Swal.fire("Guardado!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Los cambios no fueron guardados", "", "info");
      }
    });
  }
}
