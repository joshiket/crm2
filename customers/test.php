<?php
        $dbConfig = json_decode(file_get_contents('../db.json'));
        $dsn = sprintf("mysql:host=%s;dbname=%s",$dbConfig->server, $dbConfig->dbname);
        $config = array( PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,PDO::ATTR_PERSISTENT => true);
        $conn = new PDO($dsn,$dbConfig->user,$dbConfig->pass,$config);
        $tableCols = array();
        $q = $conn->prepare("SELECT * FROM crm.customers");
        $q->execute();
        $colCnt = $q->columnCount();                    
        for($i=0;$i<$colCnt;$i++)
        {
            $meta = $q->getColumnMeta($i);
            $mdata = array();
            $mdata["name"] = $meta['name'];
            $mdata["meta"] = $meta['native_type'];
            array_push($tableCols,$mdata);                     
        }  
        
        for($i=0;$i<sizeOf($tableCols);$i++)
        {
           switch($tableCols[$i]["meta"])
            {
                case "LONG" :
                    $tableCols[$i]["meta"] = "%d";
                    break;
                case "VAR_STRING" :
                    $tableCols[$i]["meta"] = "%s";
                    break;  
                case "DATE" :
                    $tableCols[$i]["meta"] = "%s";
                    break;      
                case "FLOAT" :
                    $tableCols[$i]["meta"] = "%f";
                    break;    
                case "DOUBLE" :
                    $tableCols[$i]["meta"] = "%f";
                    break;    
                case "NEWDECIMAL" :
                    $tableCols[$i]["meta"] = "%f";
                    break;                                                                                          
                case "BIT" :
                    $tableCols[$i]["meta"] = "%d";
                    break;                                        
            }
        }        
        //print_r($tableCols)      ;
        $table = "crm.customers";
        $cols = " set ";
        $vals = "$" . "this->table, ";
        $q = "UPDATE $table set " ;
        $barr  = array();
        for($i = 1;$i <sizeOf($tableCols);$i++)
        {
            $t = $tableCols[$i]['name'] . "= :" . $tableCols[$i]['name'] ." , ";
            $q .= $t;
            
            $barr[":".$tableCols[$i]['name']] = "$" . "this->" . $tableCols[$i]['name'];
        }

        $q = substr($q,0,strlen($q)-2);
        $q .= " WHERE " . $tableCols[0]['name']  . " = :".$tableCols[0]['name'];
        echo "$q <br>";
        print_r($barr);
        

?>