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

if(isset($_POST) && !empty($_POST)) {
  $username = htmlentities($_POST['username']);
  $password = htmlentities($_POST['password']);

  if($username == 'admin' && $password == 'admin') {
    $_SESSION['user'] = 'admin';
?>
{
  "success": true,
  "secret": "This is the secret no one knows but the admin"
}
<?php    
  } else {
?>
{
  "success": false,
  "message": "invalid credentials"
}
<?php    
  } 
} else {
?>
{
  "success": false,
  "message": "Only POST access accepted"
}
<?php    
}
exit();
?>