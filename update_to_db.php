<?php

$csv = array_map('str_getcsv', file($_FILES['file']['tmp_name']));
$conn = mysqli_connect('localhost', 'id12786756_pulkit', '123!@#QWEqwe', 'id12786756_chat_bot_manager');

$query = "Insert into QnA (question, answer, user_id) VALUES ";
foreach($csv as $row){
    $query.= "('{$row[0]}','{$row[1]}',1),";    
}
$query = rtrim($query, ',');

$result = mysqli_query($conn, $query);
if ($result){
    echo 1;
}