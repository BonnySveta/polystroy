$(document).ready(function() {
    var show = true;
    $(window).on("scroll load resize", function() {

        if (!show) return false; // Отменяем показ анимации, если она уже была выполнена

        var w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
        var e_top = $('#count1 span.spincrement').offset().top; // Расстояние от блока со счетчиками до верха всего документа

        var w_height = $(window).height(); // Высота окна браузера
        var d_height = $(document).height(); // Высота всего документа

        var e_height = $('#count1 span.spincrement').outerHeight() + $('#count2 span.spincrement').outerHeight(); // Полная высота блока со счетчиками

        /*w_top + 200 >= e_top || w_height + w_top == d_height || (e_height + e_top < w_height && */

        if (w_top + 1 / 3 * w_height >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
            $(".spincrement").spincrement({
                thousandSeparator: "",
                duration: 4200
            });

            show = false;
        }
    });

    $("#form").submit(function() {
        var p = {
            material: $.trim($(this).find('div#mat button.selButt').text()),
            etazh: $.trim($(this).find('div#etaz button.selButt').text()),
            komnat: $.trim($(this).find('div#komn button.selButt').text()),
            komment: $.trim($(this).find('textarea[name="message"]').val()),
            obratka: $.trim($(this).find('input[name="name"]').val()),
            dopol: ''
        };
        if (!p.material || !p.etazh || !p.komnat) {
            alert('Введите все данные');
            return false;
        }
        $(this).find('div#dop button.selButt').each(function() {
            p.dopol += $.trim($(this).text()) + '; '
        });


        $.ajax({
            type: "POST",
            url: "send.php",
            data: p,
            dataType: 'json',
            beforeSend: function() {
                $("#form").find('button[type="submit"]').attr('disabled', 'disabled');
            },
            success: function(data) {
                if (data['error']) {
                    alert(data['error']);
                } else {
                    alert('Письмo oтврaвлeнo! Чeкaйтe пoчту! =)');
                }
            },
            complete: function() {
                $("#form").find('button[type="submit"]').prop('disabled', false);
            },
            async: false
        });
        return false;
    });

    $('#form button:not([type="submit"])').click(function() {
        if (!$(this).hasClass('selButt')) {
            if ($(this).attr('name') != 'all')
                $(this).closest('div').find('button').removeClass('selButt');
            $(this).addClass('selButt');
        } else {
            $(this).removeClass('selButt');
        }
    })


    $(".hsldr-container").hslider(
        /*{
        		  navBar: true,
        		  auto: true,
        		  delay: 4000
        		}*/
    );

    /* 	$(".b-carousel-button-right").click(function(){
      $(".h-carousel-items").animate({left: "-222px"}, 200); // производим анимацию: блок с набором картинок уедет влево на 222 пикселя (это ширина одного прокручиваемого элемента) за 200 милисекунд.
      setTimeout(function () { // устанавливаем задержку времени перед выполнением следующих функций. Задержка нужна, т.к. эти ффункции должны запуститься только после завершения анимации.
        $(".h-carousel-items .b-carousel-block").eq(0).clone().appendTo(".h-carousel-items"); // выбираем первый элемент, создаём его копию и помещаем в конец карусели
        $(".h-carousel-items .b-carousel-block").eq(0).remove(); // удаляем первый элемент карусели
        $(".h-carousel-items").css({"left":"0px"}); // возвращаем исходное смещение набора набора элементов карусели
      }, 300);
    });

    $(".b-carousel-button-left").click(function(){
      $(".h-carousel-items .b-carousel-block").eq(-1).clone().prependTo(".h-carousel-items"); // выбираем последний элемент набора, создаём его копию и помещаем в начало набора
      $(".h-carousel-items").css({"left":"-222px"}); // устанавливаем смещение набора -222px
      $(".h-carousel-items").animate({left: "0px"}, 200); // за 200 милисекунд набор элементов плавно переместится в исходную нулевую точку
      $(".h-carousel-items .b-carousel-block").eq(-1).remove(); // выбираем последний элемент карусели и удаляем его
    });


/!*    $(function() {
      auto_right('.h-carousel-wrapper:first, .b-carousel-button-left:first, .b-carousel-button-right:first');
    });

    function auto_right(carusel){
      setInterval(function(){
        if (!$(carusel).is('.hover'))
          $(".b-carousel-button-right").click();
      }, 10000)
    }*!/


    $(document).on('mouseenter', '.h-carousel-wrapper, .b-carousel-button-left, .b-carousel-button-right', function(){$(this).addClass('hover')});

    $(document).on('mouseleave', '.h-carousel-wrapper, .b-carousel-button-left, .b-carousel-button-right', function(){$(this).removeClass('hover')});
*/
});
$(window).load(function() {
    $(".hsldr-next").click();
});