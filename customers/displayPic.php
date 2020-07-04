<?php    
    define('IMAGEPATH', '../images/dispPic/');
$msg = array();
$files = array();
if (is_dir(IMAGEPATH)){
    $handle = opendir(IMAGEPATH);
    $directoryfiles = array();
    while (($file = readdir($handle)) !== false) {
        $newfile = str_replace(' ', '_', $file);
        //rename(IMAGEPATH . $file, IMAGEPATH . $newfile);
        $directoryfiles[] = $newfile;
    }
    
    foreach($directoryfiles as $directoryfile){
        if(strlen($directoryfile) > 3){
            array_push($files,$directoryfile);
        
        }
    }    
    $msg["error"] = FALSE;
    $msg["data"] = json_encode($files);
}
else{
    $msg['error'] = TRUE;
    $msg['msg'] = "No images found.";
}
echo json_encode($msg);


?>