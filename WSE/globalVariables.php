<?php

$globalSpaceSize = 1000;
$globalSpaceID = 2;
$globalSpaceAccessRules = 0644;

function getGlobal ($variableName) {
	global $globalSpaceSize,$globalSpaceID,$globalSpaceAccessRules;
	$globalSpace = shmop_open ( $globalSpaceID, "c" , $globalSpaceAccessRules , $globalSpaceSize );
	$serializedForm=shmop_read ( $globalSpace , 0, $globalSpaceSize );
	$variables=unserialize($serializedForm);
	$value=$variables[$variableName];
	shmop_close ( $globalSpace );
	return $value;
}

function setGlobal ($variableName, $variableValue) {
	global $globalSpaceSize,$globalSpaceID,$globalSpaceAccessRules;
	$globalSpace = shmop_open ( $globalSpaceID, "c" , $globalSpaceAccessRules , $globalSpaceSize );
	$serializedForm=shmop_read ( $globalSpace , 0, $globalSpaceSize );
	$variables=unserialize($serializedForm);
	$variables[$variableName]=$variableValue;
	shmop_write ( $globalSpace , serialize($variables) , 0 );
	shmop_close ( $globalSpace );
}

?>