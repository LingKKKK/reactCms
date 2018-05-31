<?php
    header("Content-type: text/html; charset=utf-8");

    echo $_POST;

    if ( $_POST['userName'] && $_POST['password'] && $_POST['type']) {
        if( $_POST['userName'] == 'admin' && $_POST['password'] == '1'){
            echo json_encode(array( 'id' => 'admin', 'name' => '1' ));
            return;
        }
        if( $_POST['userName'] == 'user' && $_POST['password'] == '123456'){
            echo json_encode(array( 'id' => 'user', 'name' => '2' ));
            return;
        }
        else {
            echo json_encode(array("no user"));
            return;
        }

    }else {
        echo "fail";
        return;
    }


?>
