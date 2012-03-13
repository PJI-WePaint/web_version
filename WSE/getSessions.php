<?php

// dossier listé (pour lister le répertoir courant : $dir_nom = '.'  --> ('point')
$dir_nom = '.'; 
 // on ouvre le contenu du dossier courant
$dir = opendir("traces_files") or die('Erreur de listage : le répertoire n\'existe pas');
// on déclare le tableau contenant le nom des fichiers
$fichier= array(); 
// on déclare le tableau contenant le nom des dossiers
$dossier= array(); 

while($element = readdir($dir)) 
{
	if($element != '.' && $element != '..') 
	{
		if (!is_dir($dir_nom.'/'.$element)) 
		{
			$fichier[] = $element;
		}
		else 
		{
			$dossier[] = $element;
		}
	}
}

$result= array(files => $fichier, directories => $dossier);
header("X-JSON: " . json_encode($result));

?>