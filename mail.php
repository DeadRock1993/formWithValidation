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
?>