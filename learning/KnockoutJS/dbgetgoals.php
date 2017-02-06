<?php
	header('Content-Type: application/json');

	// connect to mongodb
	$m = new MongoClient();

	// select a database
	$db = $m->roco;

    // select a collection
	$collection = $db->goaltracker;
   
	$cursor = $collection->find();
	// iterate cursor to display title of documents
    
    $stack = array();

	foreach ($cursor as $document) {
        array_push($stack, $document);
	}	

    echo json_encode($stack);	
?>
