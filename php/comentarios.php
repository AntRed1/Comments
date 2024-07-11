<?php
require 'db.php'; // Incluye el archivo que contiene la función conectarBaseDatos()

function insertarComentario($nombre, $apellidos, $email, $comentarios, $ip) {
    // Obtener la conexión a la base de datos
    $conn = conectarBaseDatos();

    // Preparar la llamada al procedimiento almacenado
    $stmt = $conn->prepare("CALL InsertarComentario(?, ?, ?, ?, ?)");
    if ($stmt === false) {
        error_log("Error al preparar el procedimiento almacenado: " . $conn->error);
        die("Error al preparar el procedimiento almacenado: " . $conn->error);
    }

    // Vincular parámetros al statement
    $stmt->bind_param("sssss", $nombre, $apellidos, $email, $comentarios, $ip);

    // Ejecutar el procedimiento almacenado
    if ($stmt->execute()) {
        error_log("Nuevo registro creado exitosamente");
        echo "Nuevo registro creado exitosamente";
    } else {
        error_log("Error al ejecutar el procedimiento almacenado: " . $stmt->error);
        echo "Error al ejecutar el procedimiento almacenado: " . $stmt->error;
    }

    // Cerrar el statement y la conexión a la base de datos
    $stmt->close();
    $conn->close();
    error_log("Conexión cerrada.");
}
?>
