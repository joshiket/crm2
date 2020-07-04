<?php
    //$msg = json_decode(file_get_contents('./Customer_msg.json'));

    $formdata = json_decode(json_encode($_REQUEST));
    var_dump($formdata);
    $p = "lastName";
    echo property_exists($formdata,$p);
?>