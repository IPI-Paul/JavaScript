<?php
$_POST = json_decode(file_get_contents('php://input'), true);
if ($_POST['session_id']) {
  session_id($_POST['session_id']);
}
session_start();

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
// header('Access-Control-Allow-Methods: GET, POST');
// header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

if (isset($_SESSION['user'])) {
  echo '{"status": true}';
} else {
  echo '{"status": false}';
}
exit();
?>