<?php
$_POST = json_decode(file_get_contents('php://input'), true);
if ($_POST->session_id) {
  session_id($_POST->session_id);
}
session_start();

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
// header('Access-Control-Allow-Methods: GET, POST');
// header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

$user = $_SESSION['user'];

if ($user == 'admin') {
  echo '{
    "username": "', $user, '",
    "message": "This is a secret message only for the administrator",
    "success": true
  }';
} else {
  echo '{
    "username": "', $user, '",
    "message": "You are not an administrator",
    "success": false
  }';
}
exit();
?>