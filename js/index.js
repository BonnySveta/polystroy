/**
 * Created by kashko.iu on 04.09.2017.
 */
$(document).ready(function(){
    var show = true;
    $(window).on("scroll load resize", function(){

        if(!show) return false;                   // Отменяем показ анимации, если она уже была выполнена

        var w_top = $(window).scrollTop();        // Количество пикселей на которое была прокручена страница
        var e_top = $('#count1 span.spincrement').offset().top;     // Расстояние от блока со счетчиками до верха всего документа

        var w_height = $(window).height();        // Высота окна браузера
        var d_height = $(document).height();      // Высота всего документа

        var e_height = $('#count1 span.spincrement').outerHeight() + $('#count2 span.spincrement').outerHeight(); // Полная высота блока со счетчиками

        /*w_top + 200 >= e_top || w_height + w_top == d_height || (e_height + e_top < w_height && */

        if(w_top + 1/3*w_height >= e_top || w_height + w_top == d_height || e_height + e_top < w_height){
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
      if (!p.material || !p.etazh || !p.komnat){
        alert('Введите все данные');
        return false;
      }
      $(this).find('div#dop button.selButt').each(function () {
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
        success: function (data) {
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

    $('#form button:not([type="submit"])').click(function () {
      if (!$(this).hasClass('selButt')) {
        if ($(this).attr('name')!= 'all')
           $(this).closest('div').find('button').removeClass('selButt');
        $(this).addClass('selButt');
      }
      else{
        $(this).removeClass('selButt');
      }
    })




    $('#carousel').carouFredSel({
      width: '100%',
      height: 'variable',
      items: {
        visible: 3,
        start: -1
      },
      scroll: {
        items: 1,
        duration: 1000,
        timeoutDuration: 10000,
        pauseOnHover: 'resume'
      },
      prev: '#wrapper .hsldr-prev',
      next: '#wrapper .hsldr-next'
    });

    $('#carousel2').carouFredSel({
      width: '100%',
      height: 'variable',
      items: {
        visible: 3,
        start: -1
      },
      scroll: {
        items: 1,
        duration: 1000,
        timeoutDuration: 10000,
        pauseOnHover: 'resume'
      },
      prev:{
        button: '#wrapper2 a.hsldr-prev',
        pauseOnHover: true,
        onBefore: function () {
          var ppdata = $('#carousel2').find('img:nth-child(2)').attr('data');
					$('.container1').find('p').hide().end()
            .find('p[data="'+ppdata+'"]').fadeIn(1000);
        }
      },
      next:{
        button: '#wrapper2 a.hsldr-next',
        pauseOnHover: true,
        onBefore: function () {
          var ppdata = $('#carousel2').find('img:nth-child(3)').attr('data');
					$('.container1').find('p').hide().end()
            .find('p[data="'+ppdata+'"]').fadeIn(1000);
        }
      }
    });

    $('.licence .container .row img').click(function(){
	  	var img = $(this);
      var src = img.attr('src');
      // $(this).parents('section').after("<div class='popup'>"+
      $('body').append("<div class='popup'>"+
               "<div class='popup_bg'></div>"+
               "<img src='"+src+"' class='popup_img canclose' />"+
               "</div>");
      $(".popup").fadeIn(800);
      $(".popup_bg, img.canclose").click(function(){
        $(".popup").fadeOut(800);
        setTimeout(function() {
          $(".popup").remove();
        }, 800);
      });
    });



    var otst = ($('.slider').width() - $('#carousel').find('img:first').width())/2;
    $('#wrapper a.hsldr-prev, #wrapper a.hsldr-next').css({width: otst});


    var otst2 = ($('.container1').width() - $('#carousel2').find('img:first').width())/2;
    $('#wrapper2 a.hsldr-prev, #wrapper2 a.hsldr-next').css({width: otst2});

});
