
$(function () {


    // Button startGame
    $("#startGame").on({
        focus: function () {
            $(this).css('background-color', 'rgb(204, 24, 24)');

        },
        mousedown: function () {
            $(this).css('outline', '2px solid rgb(224, 176, 176)');

        },

        click: function () {

            $(this).css('background-color', 'rgb(247, 139, 139)');
            $('.check-result').addClass('active');

        },
        blur: function () {

            $(this).css('outline', 'none');

        }
    });

    // Button  checkResult
    $("#checkResult").on({

        focus: function () {
            $(this).css('background-color', 'rgb(204, 24, 24)');

        },

        mousedown: function () {
            $(this).css('outline', '2px solid rgb(224, 176, 176)');


        },
        mouseup: function () {
            $(this).css('background-color', 'rgb(245, 22, 22)');
            $(this).css('outline', 'none');

        }
    });

    // Button newGame
    $("#newGame").on({

        focus: function () {
            $(this).css('background-color', 'rgb(204, 24, 24)');

        },

        mousedown: function () {
            $(this).css('outline', '2px solid rgb(224, 176, 176)');
            $('#startGame').css('background-color', 'rgb(245, 22, 22)');
            $("#startGame").prop("disabled", false);

        },
        blur: function () {
            $(this).css('background-color', 'rgb(245, 22, 22)');
            $(this).css('outline', 'none');

        }
    });

    $(".btn-close").on({

        focus: function () {
            $(this).css('background-color', 'rgb(204, 24, 24)');

        },

        mousedown: function () {
            $(this).css('outline', '2px solid rgb(224, 176, 176)');


        },
        blur: function () {
            $(this).css('background-color', 'rgb(245, 22, 22)');
            $(this).css('outline', 'none');

        }
    })
    $('.btn-check').on({

        focus: function () {
            $(this).css('background-color', 'rgb(0, 128, 0)');

        },

        mousedown: function () {
            $(this).css('outline', '2px solid rgb(104, 165, 104)');
            $('#checkResult').css('background-color', 'rgb(247, 139, 139');

            $("#checkResult").prop("disabled", true);
            resultat()
            taimerstop()


        },
        blur: function () {
            $(this).css('background-color', 'rgb(5, 148, 36)');
            $(this).css('outline', 'none');

        }
    });

    //                      START JS

    $(function sort1() {
        let divs = $('.image-block-left ').children();
        while (divs.length) {
            $('.image-block-left ').append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }

    });

    // — При кліку на кнопку Start game або при перетягуванні пазла на правий блок(використовуємо drag & drop) 
    // має запуститися зворотній відлік. Сама кнопка має заблокуватися.

    // Button Start
    let chas = + document.querySelector('.vidlic-Dec').textContent
    let vch = +document.querySelector('.vidlic-Chyl').textContent
    let startvidlic;
    let chack = true;
    $('#startGame').click(function () {

        taimerstart()

        $("#startGame").prop("disabled", true);

        $("#checkResult").prop("disabled", false);


    })



    // TIMER
    function taimerstart() {
        $('.vidlic-Dec').text('01');
        $('.vidlic-Chyl').text('00');
        startvidlic = setInterval(vidlic, 1000);

        chack = false;
    }
    function vidlic() {
        $('.vidlic-Dec').text(+chas)
        if (vch == "00") {
            vch = 59
            chas = 00
            if (chas < 10) chas = '0' + chas;
        }
        else vch = vch - 1

        if (vch < 10) vch = '0' + vch;

        if (chas == 00 & vch == 00) {
            taimerstop()
            resultat()


            $('.check-modal-block').show();
            // $('.text').html(`<h2>It's a pity, but you lost </h2>`)
            $('#checkResult').css('background-color', 'rgb(247, 139, 139');
            $("#checkResult").prop("disabled", true);
            $('.btn-check').hide();
        }

        $('.vidlic-Dec').text(chas)
        $('.vidlic-Chyl').text(vch)
    }

    if (chas == 00 & vch == 45) {
        taimerstop()
        resultat()
    }

    function taimerstop() {
        clearInterval(startvidlic)

    }




    // drag & drop

    $('.image-block-left .image').draggable({

        grid: [37.25, 74.5],
        containment: '.image-block-rigth',
        start: function () {
            if (chack) {

                $("#startGame").addClass('inertButton');
                $("#checkResult").addClass('active');
                $('#startGame').attr('disabled', 'disabled');
                $('#checkResult').removeAttr('disabled');
                if (chack) {
                    startvidlic = setInterval(vidlic, 1000);
                    chack = false;

                }

            }

        }
    });



    $('.imageRigth').droppable({
        accept: '.image',

        drop: function (e, ui) {

            let m = $(ui.draggable).attr("value")
            // console.log (m)
            $(this).attr("value", m)
            // console.log (this)

        }

    })
    $("imageRigth").droppable("enable")

    // — При кліку на кнопку Check result має видати повідомлення в модальному вікні:
    //  “You still have time, you sure?” з часом який залишився.

    // Button Check
    $('#checkResult').click(function () {

        $('.check-modal-block').show()
        $('.text').html(`<h2>You still have time, you sure?${chas}:${vch}</h2>`)
        taimerstop()


    })


    // Button newGame
    $('#newGame').click(function () {
        location.reload('.image');

        sort1()


    })


    // <!-- modal-block -->

    // Button close

    $('.btn-close').click(function () {

        $('.check-modal-block').hide()
        $('.btn-check').show()
        startvidlic = setInterval(vidlic, 1000)



    })


    // Button check

    // — При кліку на кнопку Check перевіряється чи добре складений пазл, якщо так видає повідомлення: “Woohoo, well done, you did it!” 
    // в іншому варіанті “It's a pity, but you lost”. Кнопка Check result має заблокуватися.

    let winArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let check = true;
    function resultat() {


        $('.btn-check').hide()
        $('.check-modal-block').hide()

        for (let i = 0; i < $('.imageRigth').length; i++) {
            if ($(`.imageRigth `).eq(i).attr("value") != winArr[i]) {

                check = false;
                break;
            }

        }
        if (check) {
            $('.check-modal-block').show()
            $('.btn-check').hide()
            $('.text').html(`<h2>Woohoo, well done, you did it!</h2>`)
            taimerstop()
        }
        else {
            $('.check-modal-block').show()
            $('.btn-check').hide()
            $('.text').html(`<h2>It's a pity, but you lost</h2>`)
            taimerstop()

            // check = true;


        }
    }


})
