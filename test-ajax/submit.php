<?php

if(isset($_POST['testData'])){
    $data = $_POST['testData'];

    // unserialize js query string URL
//    parse_str($data, $data);

    if($data['firstName'] == 'Mike'){
        include_once('submit-success.php');
    } else {
        include_once('submit-fail.php');
    }
} else {
    // code: 0 -> fail
    //       1 -> success
    $data = [
        'code' => 550,
        'message' => "No permission"
    ];
    echo json_encode($data);
    exit;
}
exit;