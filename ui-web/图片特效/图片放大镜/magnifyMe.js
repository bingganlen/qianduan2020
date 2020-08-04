(function( $ ) {
  $.fn.magnifyMe = function(childClass) {
    this.mousemove(function(event) {
      var left = event.clientX - jQuery(this).offset().left - (0.25*jQuery(this).width());
      var top = event.clientY - jQuery(this).offset().top - (0.25*jQuery(this).height());

      var bpl = (( event.clientX - jQuery(this).offset().left ) / jQuery(this).width()) * 100;
      var bpt = (( event.clientY - jQuery(this).offset().top ) / jQuery(this).height()) * 100;

      jQuery(this).children('.' + childClass ).css({'left': left, 'top': top, 'background-position': bpl + '% ' + bpt + '%'});
    });
    return this;
  };
}( jQuery ));
