<?php
    // connect to mongodb
    $m = new MongoClient();
	
    // select a database
    $db = $m->roco;
   
    // select a collection
    $collection = $db->goaltracker;

    $json = file_get_contents("php://input");
    $data = json_decode($json);
    
    $document = [
        "name"      => $data->name, 
        "type"      => $data->type, 
        "deadline"  => $data->deadline
    ];
    
    $collection->insert($document);
?>