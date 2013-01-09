/*
 * ev-scroll-loader
 * https://github.com/jmpease/ev-scroll-loader
 *
 * Copyright (c) 2013 Jim Pease
 * Licensed under the MIT, GPL licenses.
 */
 (function($) {

  var defaults = {
    callback: function() {}
  };

  var methods = {
    init: function(options) {
      var settings = $.extend({}, defaults, options);
      return this.each(function() {
        var $this = $(this);
        $this.addClass('scroll-content');
        var $wrap = $this.wrap('<div class=\"scrollWrap\"/>').closest('.scrollWrap');
        $wrap.append('<div class="loader"></div>');
        var scrollHeight = this.scrollHeight;
        var setHeight = settings.height || scrollHeight;
        var wrapHeight = Math.min(setHeight, scrollHeight) - 10;
        $wrap.css({
          'position': 'relative',
          'height': wrapHeight + 'px',
          'overflow-y': 'scroll'
        }).scroll(function() {
          if ($wrap.scrollTop() === $wrap[0].scrollHeight - wrapHeight) {
            settings.callback.apply($this[0]);
          }
        });
      });
    },
    showLoader: function() {
      var $wrap = $(this).closest('.scrollWrap');
      $('.loader', $wrap).show();
      return this;
    },
    hideLoader: function() {
      var $wrap = $(this).closest('.scrollWrap');
      $('.loader', $wrap).hide();
      return this;
    }
  };

  $.fn.scrollLoader = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    }
  };

}(jQuery));