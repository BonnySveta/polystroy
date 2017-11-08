<?
        $json = array(); 
        $to = 'yuliya_kashko@mail.ru, bonnysveta@gmail.com'; 
        $subject = 'Обратный звонок'; 
        $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Материал: '.htmlspecialchars($_POST['material']).'</p>                     
                        <p>Кол-во этажей: '.htmlspecialchars($_POST['etazh']).'</p>                     
                        <p>Кол-во комнат: '.htmlspecialchars($_POST['komnat']).'</p> ';                    
        //$message .= isset($_POST['dopol']) and $_POST['dopol']!='' ? '<p>Дополнительно: '.htmlspecialchars($_POST['dopol']).'</p>' : ' ';                      
        $message .= '<p>Дополнительно: '.htmlspecialchars($_POST['dopol']).'</p>';                      
        $message .= '<p>Комментарий: '.htmlspecialchars($_POST['komment']).'</p>';                   
        //$message .= isset($_POST['komment']) and $_POST['komment']!='' ? '<p>Комментарий: '.htmlspecialchars($_POST['komment']).'</p>' : ' ';                   
        $message .='<p>email или телефон: '.htmlspecialchars($_POST['obratka']).'</p>                    
                    </body>
                </html>'; 
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
        $headers .= "From: Полистрой <yuliya.kashko95@gmail.com>\r\n";
        mail($to, $subject, $message, $headers);
        $json['error'] = 0;
		echo json_encode($json);

?>