<?php
// Habilitar la notificación de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'comentarios.php';

// Obtener la IP del cliente
$ip = $_SERVER['REMOTE_ADDR'];

// Obtener los datos del formulario
$nombre = $_POST['nombre'] ?? '';
$apellidos = $_POST['apellidos'] ?? '';
$email = $_POST['email'] ?? '';
$comentarios = $_POST['comentarios'] ?? '';

error_log("Datos recibidos: Nombre=$nombre, Apellidos=$apellidos, Email=$email, Comentarios=$comentarios, IP=$ip");

// Llamar a la función para insertar el comentario
insertarComentario($nombre, $apellidos, $email, $comentarios, $ip);
?>
