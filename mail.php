<?php

if (isset($_POST['username'])){
    $name = $_POST['username'];
    $contacts = $_POST['contacts'];
    $message = $_POST['message'];
    $from = 'no-reply@yandex.ru';
    $mailTo='mail@yandex.ru';
    $headers = "From: Иван Петров <$from>\nReply-To: $from\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    $message="
    <h1>Сообщение с сайта</h1>
    <p>Имя: $name</p>
    <p>Контакты: $contacts</p>
    <p>Сообщение: $message</p>
    ";
     
    wp_mail($mailTo,"Форма обратной связи",$message,$headers);
}

/// for wordpress
function ajax_order(){
    $to = "impala7691@gmail.com"; //КУДА ОТПРАВЛЯТЬ ПИСЬМО, УКАЖИТЕ СВОЙ E-MAIL
    $subject = "Заказ с сайта";
    $sit_url = $_SERVER['SERVER_NAME'];
    $message = "<h4>ФИО:</h4>" . $_POST['name'] . "\r\n <h4>Email:</h4>" . $_POST["email"] . "\r\n <h4>Телефон:</h4>" . $_POST["phone"];
	$message .= "<h4>Сообщение:</h4>" . $_POST['msg'] . "\r\n <h4>Товар:</h4>" . $_POST["product"] . "\r\n <h4>Соглашение:</h4>" . $_POST["policy"];
    $headers = "Content-type: text/html; charset=UTF-8 \r\n";
    $headers .= "From: <wordpress@".$sit_url.">\r\n";
    $result = mail($to, $subject, $message, $headers);
   
    if ($result){
    header('Content-type: text/html; charset=utf-8');
    echo "Сообщение успешно отправлено.";
    }else{ 
    header('Content-type: text/html; charset=utf-8');
    echo "Что-то пошло не так...";}
    die(); 
}
add_action('wp_ajax_ajax_order', 'ajax_order' );
add_action('wp_ajax_nopriv_ajax_order', 'ajax_order' );
?>