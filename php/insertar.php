<?php
$servername = "";
$username = "";
$password = "";
$db_name = "";

// Se crea la conexion.
$conn = new mysqli($servername, $username, $password, $db_name);

// Verificar la conexion.
if ($conn -> connect_error) {
	# code... valida si la conexion arroja algun error, indica un error.
	die("Conexion fallida: " . $conn-> connect_error);
}

// Obtener los datos desde el Formulario, en el Template HTML
$nombre = $_POST['nombre'];
$apellidos = $_POST['apellidos'];
$email = $_POST['email'];
$comentarios = $_POST['comentarios'];

// Mediante un procedimiento en la Base de Datos se realizara el insert y se realiza la llamada
$stmt = $conn->prepare("CALL InsertarComentarios(?,?,?,?)");
$stmt->bind_param("ssss", $nombre, $apellidos, $email, $comentarios);

if ($stmt->execute()) {
	# code... Ejecutar el Procedimiento Almacenado
	echo "Nuevo registro creado exitosamente";
}else{
	echo "Error al ejecutar el procedimiento almacenado: ". $stmt->error;
}

// Cierro la conexion a la Base de Datos.

$stmt->close();
$conn->close();
?>