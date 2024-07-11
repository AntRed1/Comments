<?php


function conectarBaseDatos() {
    require 'config.php';

    // Crear la conexión
    $conn = new mysqli($servername, $username, $password, $db_name);

    // Verificar la conexión
    if ($conn->connect_error) {
        error_log("Conexión fallida: " . $conn->connect_error);
        die("Conexión fallida: " . $conn->connect_error);
    } else {
        error_log("Conexión exitosa a la base de datos.");
    }

    return $conn;
}

?>