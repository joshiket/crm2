<?php
                $dbConfig = json_decode(file_get_contents('../db.json'));
                //print_r($dbconfig);
                $dsn = sprintf("mysql:host=%s;dbname=%s",$dbConfig->server, $dbConfig->dbname);
                //echo($dsn);
				$config = array( PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,PDO::ATTR_PERSISTENT => true);
                $conn = new PDO($dsn,$dbConfig->user,$dbConfig->pass,$config);
                var_dump($conn);

                //$link = mysqli_connect("127.0.0.1", "root", '', "crm");
                //var_dump($link);
?>