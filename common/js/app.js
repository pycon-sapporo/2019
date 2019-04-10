'use strict';

var HW = {};
var hw; // eslint-disable-line

HW = function HW() {
  this.init();
};

(function ($, window, document) {
  HW.prototype = {
    /**
     * 初期設定
     */
    init: function init() {
      var base = this;
      var $window = $(window); // トップへ戻るボタン

      base.fixedSwitch(); // スムーススクロール実行

      base.smoothScroll('.js-goto-pagetop', {
        forthTop: true
      });
      base.smoothScroll('a[href^="#"]');
      base.breakpointClassSwitch(); // JS Menu

      $('.js-menu').on('click', function (e) {
        e.preventDefault();
        var $body = $('body');
        var $menuButton = $('.spButton__link');

        if ($body.hasClass('is-open')) {
          // Close
          $body.removeClass('is-open');
          $menuButton.removeClass('open');
        } else {
          // Open
          base.scrollTop = $(window).scrollTop();
          $body.addClass('is-open');
          $menuButton.addClass('open');
          $('.nav').on('click', function (e) {
            $body.removeClass('is-open');
            $menuButton.removeClass('open');
          });
        }
      }); // スクロール時のイベント

      $window.on('scroll', $.throttle(250, function () {
        base.fixedSwitch();
      })); // リサイズ時に動くイベント

      $window.on('resize', $.throttle(250, function () {
        base.breakpointClassSwitch();
      })); // window on load イベント

      $window.on('load', function () {
        base.windowOnloadInit();
      });
    },

    /**
     * Window on load設定
     */
    windowOnloadInit: function windowOnloadInit() {// var base = this;
    },

    /**
     * スムーススクロール
     */
    smoothScroll: function smoothScroll(selector, options) {
      var c = $.extend({
        speed: 650,
        easing: 'swing',
        adjust: 0,
        forthTop: false
      }, options);
      $(selector).on('click.smoothScroll', function (e) {
        e.preventDefault();
        var elmHash = $(this).attr('href');
        var targetOffset;

        if (elmHash === '#') {
          return;
        }

        targetOffset = c.forthTop ? 0 : $(elmHash).offset().top - c.adjust;
        $('html,body').animate({
          scrollTop: targetOffset
        }, c.speed, c.easing);
      });
    },
    breakpointClassSwitch: function breakpointClassSwitch() {
      var base = this;

      if (base.isSPSize()) {
        $('body').removeClass('isPC').addClass('isSP');
      } else {
        $('body').removeClass('isSP is-open').addClass('isPC');
      }
    },
    fixedSwitch: function fixedSwitch() {},

    /**
     * Is SP Size
     */
    isSPSize: function isSPSize() {
      return !!window.matchMedia('(max-width: 768px)').matches; // return ($(window).width() <= 768) ? true : false;  // matchMediaが使えない環境の場合
    }
  };
})(jQuery, window, document);

hw = new HW();