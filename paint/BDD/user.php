<?php

$action = $_GET['action'];
$name_user = isset($_GET['name']) ? $_GET['name'] : NULL;
$id = isset($_GET['id']) ? intval($_GET['id']) : NULL;
$file = "base.json";
$type = isset($_GET['type']) ? $_GET['type'] : NULL;

function sortByOneKey(array $array, $key, $asc = true) {
    $result = array();
        
    $values = array();
    foreach ($array as $id => $value) {
        $values[$id] = isset($value[$key]) ? $value[$key] : '';
    }
        
    if ($asc) {
        asort($values);
    }
    else {
        arsort($values);
    }
        
    foreach ($values as $key => $value) {
        $result[$key] = $array[$key];
    }
        
    return $result;
}

  
function create(){
  global $name_user;
  global $id;
  global $type;
  $data = recup_all_users();
  $users= $data["users"];
  $users = sortByOneKey($users,"id");
  if (exist_id($users,$id) ) {
    $last_id = get_last_id(false);
    $new_user = array("id" => $last_id+1 , "connect_at" => date("d-m-Y H:i"), "type" => $type);
    $message = array("errors" => true,"new_id" => $last_id +1);
  } else {
    $new_user = array("id" => $id , "connect_at" => date("d-m-Y H:i"), "type" => $type);
    $message = array("errors" => false);
  }
  array_push($users, $new_user);
  create_in_files(array("users" => $users));
  render($message);
  

}


  // TODO : Faire fonction qui ifExist user
function exist_id($data, $id){
  $i = intval($id);
  $exist = false;
  foreach ($data as $key => $user) {
    $exist |= ($user["id"] == intval($i));
  }
  return $exist;
}

function errors()
{
  throw new Exception("Action is no knowed");
}

function create_in_files($users){
  global $file;
  $handle = fopen($file, "w") or die("can't open file");
  fputs($handle, json_encode($users));
  fclose($handle);

}

function get_last_id($return_json)
{
  $data = recup_all_users();
  $users = $data["users"];
  $users = sortByOneKey($users,"id");
  $last_user = end($users);
  if($return_json){
    $message = array("last_id" => intval($last_user["id"]));
    render($message);
  }else{
    return intval($last_user["id"]);
  }

}

function render($message){
  header('Content-type: application/json');
  echo json_encode($message);

}

function recup_all_users(){
  global $file;
  if(filesize($file) != NULL){
    $all = "";
    $handle = fopen($file, "r") or die("can't open file");
    if ($handle) {
      while (($buffer = fgets($handle, 4096)) !== false) {
        $all = $all.$buffer;
      }
      if (!feof($handle)) {
        echo "Error: unexpected fgets() fail\n";
      }
      fclose($handle);
    }
    $json = json_decode($all, true);
    return $json;
  }else{
    return NULL;
  }
}

/*function name_is_empty($name){
  if($name == NULL){
    throw new Exception("$name should not empty");
  }
}*/

try {
  switch ($action) {
    case 'get_last_id':
    get_last_id(true);
    break;
    case 'create':
    create();
    break;
    default:
    errors();
    break;
  }
} catch (Exception $e) {
  echo $e->getMessage();
}

?>