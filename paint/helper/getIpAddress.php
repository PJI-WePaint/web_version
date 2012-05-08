<?php
$message = array("ip" => gethostbyname(gethostname()));
header('Content-type: application/json');
echo json_encode($message);

?>