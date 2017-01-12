"use strict";

$(function(){
    // Создаем объект с вопросами и ответами -->
    var gen = {
        title : "Тест по программированию",
        questions : ["Вопрос №1", "Вопрос №2", "Вопрос №3"],
        answers : ["Вариант ответа №1","Вариант ответа №2","Вариант ответа №3"],
        right : [0, 1, 2],
    };
    // Записываем данные в локальное хранилище
    localStorage.setItem('str', JSON.stringify(gen));
    //----------------------------------------!
    // Достаем данные из локального хранилища
    var str = localStorage.getItem('str');
    // Переводим строку с данными в формате JSON в JavaScript-объект
    var data = JSON.parse(str);
    console.log(data);
    var content = document.getElementById('test-form');
    content.innerHTML = tmpl("item_test", data);
    console.log(content);

  }); //-------------------------------------------!
      // Выполняем проверку правильных ответов
        document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("click");
    var str = localStorage.getItem('str');
    var data = JSON.parse(str);
    var rez = 0;
        // Вопрос №1 ----------------->
        for(var i=0; i<  $("input[name$='listRadio1']").length; i++) {
            if ($("input[name$='listRadio1']")[i].checked) {
                if (i == data.right[0]) {
                rez +=1;
                }
            }
        }
        // Вопрос №2 ----------------->
        for(var i=0; i<$("input[name$='listRadio2']").length; i++) {
            if ($("input[name$='listRadio2']")[i].checked) {
                if (i == data.right[1]) {
                rez +=1;
                }
            }
        }
        // Вопрос №3 ----------------->
        for(var i=0; i<$("input[name$='listRadio3']").length; i++) {
            if ($("input[name$='listRadio3']")[i].checked) {
                if (i == data.right[2]) {
                rez +=1;
                }
            }
        }
        // Вывод результата ----------------->
            if (rez == 3){
                $(".message").html("<p class='rezult'>Ваш результат - <span class='rezult-value'>" + rez + "</span>.</p><p>Поздравляю! Тест пройден</p>");
            } else {
                $(".message").html("<p class='rezult'>Ваш результат - <span class='rezult-value'>" + rez + "</span>.</p><p>Тест не пройден. Попробуйте еще раз</p>");
            }

        //Выводим модальное окно с результатами теста---------------------->
        $('.overlay').fadeIn(500, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
		 	  function(){ // пoсле выпoлнения предъидущей aнимaции
				$('.modal-form')
            .css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
					  .animate({opacity: 1, top: '42%'}, 250); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
		    });

        $('.modal-close, .overlay').click( function(){ // лoвим клик пo крестику или пoдлoжке
        $("input:radio:checked").prop('checked', false);
        $('.modal-form')
            .animate({opacity: 0, top: '55%'}, 200,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
    				function(){ // пoсле aнимaции
      					$(this).css('display', 'none'); // делaем ему display: none;
      					$('.overlay').fadeOut(400); // скрывaем пoдлoжку
				    });
	      });
    });
