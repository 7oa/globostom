var isDesktop = window.matchMedia('(min-width: 1024px)').matches;
var isMobile = window.matchMedia('(max-width: 480px)').matches;
$(window).on('load resize', function () {
    isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    isMobile = window.matchMedia('(max-width: 480px)').matches;
});

function tag() {
    var id = $(".js-tag.selected").data("id");
    $("#" + id).show().siblings().hide();
    if (isMobile) {
        $(".js-tag.selected").after($('.price__info'));
    }
}

function responseMenu() {
    $('ul.dropdown-menu li.second-menu__item').appendTo('ul.second-menu__list');
    var items = $('ul.second-menu__list li.second-menu__item');
    var max_width = $('ul.second-menu__list').width() - $('ul.second-menu__list li.second-menu__item-dd').outerWidth();
    var width = 0;
    var hide_from = 0;

    items.css({'width': 'auto'});

    items.each(function (index) {
        if (width + $(this).outerWidth() > max_width) {
            return false;
        } else {
            hide_from = index;
            width += $(this).outerWidth();
        }
    });
    if (hide_from < items.length - 1) {
        items.eq(hide_from).nextAll('li.second-menu__item').appendTo('ul.dropdown-menu');
        items.css({'width': (max_width / (hide_from + 1)) + 'px'});
        $('ul.second-menu__list li.second-menu__item-dd').show();
    } else {
        $('ul.second-menu__list li.second-menu__item-dd').hide();
    }
}

$(document).ready(function () {
    // Слайдер навигации для карточек докторов
    $('.b-doctors__slider').sly({
        horizontal: 1,
        itemNav: 'basic',
        mouseDragging: 1,
        dragHandle: 1,
        clickBar: 1,
        touchDragging: true,
        releaseSwing: 1,
        scrollBar: $('.b-doctors__slider').parent().find('.sly-scrollbar')
    });

    // Слайдер для блока "уровень сервиса"
    $('.b-svc_level-slider').slick({
        arrows: true,
        dots: true,
        slidesToShow: 1,
        lazyLoad: 'ondemand',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    arrows: false
                }
            }
        ]
    });
    // Слайдер акций
    $('.b-stocks-slider').slick({
        arrows: false,
        dots: true,
        slidesToShow: 1,
        lazyLoad: 'ondemand'
    });
    //Слайдер отзывов
    $('.b-reviews-slider').slick({
        arrows: false,
        dots: false,
        slidesToShow: 4,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });
    //
    // Всплывающие окна
    //

    // Меню навигации на мобильных
    $(".i-nav").on("click", function () {
        var elem = $('.b-header__nav')[0];
        elem.classList.toggle("shown");
    });
    $("#close").on("click", function () {
        var elem = $('.shown')[0];
        elem.classList.toggle("shown");
    });

    //загрузка файла
    $(document).on("change", ".file-upload input[type=file]", function () {
        var filename = $(this).val().replace(/.*\\/, "");
        var file = $(this).parents(".file-upload");
        var label = file.find(".file-upload__filename");

        if (filename.length > 15) filename = filename.substring(0, 15) + '...';
        label.text(filename);
        if (filename) file.addClass('hasfile');
        else file.removeClass('hasfile');
    });
    $(document).on("click", ".file-upload__remove", function () {
        var file = $(this).parents(".file-upload");
        file.removeClass('hasfile')
          .find("input[type=file]").val("");
        file.find(".file-upload__filename").text('');
    });

    if ($('.modal').length > 0) {
        var modal = $('.modal').iziModal({
            radius: 25,
            overlayColor: 'rgba(0, 0, 0, 0.4)',
            transitionIn: 'fadeInUp',
            transitionOut: 'fadeOutDown',
            transitionInOverlay: 'fadeIn',
            transitionOutOverlay: 'fadeOut',
            onOpening: function (modal) {
                if (isDesktop) {
                    modal.setWidth(934);
                } else modal.setWidth('100%');
            },
            onResize: function (modal) {
                if (isDesktop) {
                    modal.setWidth(934);
                } else modal.setWidth('100%');
            }
        });

    }

    $('.page404').parents('.wrapper').addClass("blue");

    tag();

    $(".js-tag").click(function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        tag();
    });

    $('.second-menu').on('click', '.dropdown-toggle', function () {
        $('.dropdown-menu').toggle();
    });

    //  Выбор доктора
    $(".js-docs-list__spec>p").on("click", function () {
        $(".b-date__time .time").removeClass('chosen');
        if ($(this.closest('.js-docs-list__spec')).hasClass('chosen')) {
            $(this.closest('.js-docs-list__spec')).toggleClass('chosen');
        } else {
            $(".js-docs-list__spec").removeClass('chosen');
            $(this.closest('.js-docs-list__spec')).addClass('chosen');
        }
    });

    $(".js-docs-list__doc").on("click", function () {
        $(".js-docs-list__doc").removeClass('chosen');
        $(".b-date__time .time").removeClass('chosen');
        $(this).addClass('chosen');
    });

    $(document).on("click",".b-date__time .time",function () {
        $(".b-date__time .time").removeClass('chosen');
        $(this).addClass('chosen');
    });

    // Инициализация календаря
    var disabledDays = [0];
    $('.calendar').datepicker({
        onRenderCell: function (date, cellType) {
            if (cellType == 'day') {
                var day = date.getDay(),
                  isDisabled = disabledDays.indexOf(day) != -1;

                return {
                    disabled: isDisabled
                }
            }
        },
        minDate: new Date(),
    });

    // Маска на телефон
    $("input[type='phone']").inputmask({"mask": "+7 (999) 999 9999"});
});

$(window).on('load resize', function () {
    $('.b-doctors__slider').sly('reload');
    responseMenu();
});