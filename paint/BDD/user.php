<?php


$action = $_GET['action'];
$name_user = $_GET['name'];
$file = "base.json";


  // TODO: Faire fonction qui va chercher les utilisateurs avec id et date de connexion
function get(){
}

  
function create(){
  global $name;
  $data = recup_all_users();
  if (exist($data,$name)) {
    //TODO SI EXIST RECUPERE ID DERNIER ET +1
  } else {
    
  }
  

}


  // TODO : Faire fonction qui ifExist user
function exist($data,$name){
  return false;
}

  //TODO : Get with $name
function get_by_name($name)
{

}

  //TODO : recupname
function get_name()
{

}

function errors()
{
  throw new Exception("Paramater action and/or name is empty");
}

function create_in_files($name){

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

function name_is_empty($name){
  if($name == NULL){
    throw new Exception("$name should not empty");
  }
}
try {
  switch ($action) {
    case 'get':
    get();
    break;
    case 'create':
    name_is_empty($name_user);
    create();
    break;
    case 'get_by_name':
    break;
    default:
    errors();
    break;
  }
} catch (Exception $e) {
  echo $e->getMessage();
}

?>