<?php
if($data = $_POST['testData']){
    parse_str($data, $data); // unserialize js query string URL
    if($data['firstName'] == 'Mike'){
        include_once('submit-success.php');
    } else {
        include_once('submit-fail.php');
    }
}
exit;