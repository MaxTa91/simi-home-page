<?php

return $_POST['testData'];
if(isset($_POST['testData'])){
    $data = $_POST['testData'];
    parse_str($data, $data); // unserialize js query string URL
    if($data['firstName'] == 'Mike'){
        include_once('submit-success.php');
    } else {
        include_once('submit-fail.php');
    }
} else {
    // code: 0 -> fail
    //       1 -> success
    $data = [
        'code' => 0,
        'message' => "No permission"
    ];
    echo json_encode($data);
    exit;
}
exit;