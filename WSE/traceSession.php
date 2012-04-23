<?php

include "globalVariables.php";

$action = $_POST['action'];
$sessionName = $_POST['sessionName'];
$classicLoopDelay = 1;
$prefix_Last="last_";


function getIndexFileNameForSession ($sessionName) {
	return "index_files/" . $sessionName;
}

function getContentFileNameForSession ($sessionName) {
	return "traces_files/" . $sessionName;
}

function lastForFile ($file) {
	return count(file($file)) -1;
}
// 
// GET/SET NEW LAST INDEX OF A SESSION IN GLOBAL SPACE
//

function getLastForSession ($sessionName) {
	global $prefix_Last;
	$lastValue=getGlobal ($prefix_Last.$sessionName);
	if ($lastValue=="") {
		$indexFileName=getIndexFileNameForSession ($sessionName);
		if (file_exists($indexFileName))
			$lastValue=lastForFile ($indexFileName);
		else
			$lastValue=-1;
		setLastForSession($sessionName,$lastValue);
	}
	return $lastValue;
}

function setLastForSession ( $sessionName, $lastIndex) {
	global $prefix_Last;
	setGlobal ($prefix_Last.$sessionName,$lastIndex);
}

//
// STARTS WITH FUNCTION
//

function startswith($hay, $needle) { 
	return substr($hay, 0, strlen($needle)) === $needle; 
}

//
// WSE : GET MESSAGES
//

function getMessages ($action,  $sessionName, $since ) {
	$sessionIndexFile = getIndexFileNameForSession ($sessionName);
	$sessionContentFile = getContentFileNameForSession ($sessionName);
	$timeWait= 5000; 
	$numberOfLoopToWaitBeforeTerminate=(30*1000000)/$timeWait;
	$numberOfLoopDone=0;
	
	// A LOOP THAT WAITS FOR CHANGE
	// it starts if there is no new message for requester (comparing its $since)

	while (getLastForSession($sessionName) <= $since && $numberOfLoopDone<$numberOfLoopToWaitBeforeTerminate) {
		usleep($timeWait);
		$numberOfLoopDone++;
	}

	// time out
	if ($numberOfLoopDone>$numberOfLoopToWaitBeforeTerminate) {
		if ($action == "getMessages") 
			header("X-JSON: {} "); 
		else 
			echo(json_encode(array()));
	}
	// no time out
	else {
		
		$lastMessagesArray = array();
		
		if ( getLastForSession($sessionName) > $since)
		{
			$indexesArray = file($sessionIndexFile);
			$contentFile = fopen($sessionContentFile, "r");
		
			// numberOfMessagesInResponse : must not over 50 because Firefox has a problem with an array over 50 elements
			$numberOfMessagesInResponse = min((count($indexesArray)-1) - $since,50);
			
			fseek($contentFile,$indexesArray[$since]);
			
			for($i = 0; $i< $numberOfMessagesInResponse; $i ++)
			{			
				$message = fgets($contentFile, 8000);
				array_push($lastMessagesArray, $message);
			}
			
			
			fclose($contentFile);
		}
			
		$back = array ('lastMessages' => $lastMessagesArray, 'lastIndex' => $numberOfMessagesInResponse+$since);
	
		if ($action == "getMessages") 
			header("X-JSON: " . json_encode($back)); 
		else 
			echo(json_encode($back));
	}
}

// 
// WSE : SEND MESSAGE
//

function sendMessage ($basicMessage, $sessionName) {
	$sessionIndexFile = getIndexFileNameForSession ($sessionName);
	$sessionContentFile = getContentFileNameForSession ($sessionName); 
	
	$message = str_replace("\\","",$basicMessage);
	
	if(file_exists($sessionIndexFile))			
		$array=file($sessionIndexFile);
	else
	{
		touch($sessionContentFile);
		$fp = fopen($sessionContentFile, "r");
		$eofPositionForContent = filesize($sessionContentFile);
		fclose($fp);
		
		file_put_contents($sessionIndexFile,$eofPositionForContent.PHP_EOL,FILE_APPEND);
		$array=file($sessionIndexFile);
	}
	
	$lastPosition = $array[count($array)-1];

	$octets = file_put_contents($sessionContentFile,$message.PHP_EOL,FILE_APPEND);

	file_put_contents($sessionIndexFile,($lastPosition+$octets).PHP_EOL,FILE_APPEND);
	
	$last=count(file($sessionIndexFile)) - 1;
	setLastForSession($sessionName, $last);
	
	$response = array ('last' => $last );
	header("X-JSON: " . json_encode($response));
}

//
// WSE : JOIN SESSION
//

function joinSession ($action, $sessionName) {
	$last=getLastForSession($sessionName);
	$back = array ('lastIndex' => $last  );
	
	if ($action == "joinSession") 
		header("X-JSON: " . json_encode($back));
	else
		echo(json_encode($back));
}

//
// WSE : GET IP ADDRESS
//

function ipAddress () {
	$back = array ('ipAddress' => $_SERVER['SERVER_ADDR']  );
	header("X-JSON: " . json_encode($back));
}

//
// WSE : CLEAN SESSION
//

function cleanSession ($sessionName) {
	$sessionIndexFile = getIndexFileNameForSession ($sessionName);
	$sessionContentFile = getContentFileNameForSession ($sessionName);
	unlink($sessionIndexFile);
	unlink($sessionContentFile);
}

//
// WSE : RUNTIME
//


	// if no action is indicated, return an empty response
    if (!isset($action)) {
		header("X-JSON: {} ");
	}

	else 
	{
	    if (startswith ($action, "getMessages")) 
     		getMessages ($action, $sessionName , intval($_POST['since']));	
   
		elseif (startswith($action,"joinSession")) 
			joinSession ($action, $sessionName);
        
		elseif ($action == "sendMessage") 
			sendMessage($_POST['message'],$sessionName);
        
    	elseif ($action == "cleanSession") 
			cleanSession($sessionName);
		elseif ($action == "ipServer")
			ipAddress();
		else
	        header("X-JSON: {} ");
    }

?>


