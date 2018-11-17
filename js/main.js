$(document).ready(function () {

  // init controller
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      reverse: true
    },
    vertical: false
  });

  // animate scroll instead of a jump
  controller.scrollTo(function(i, newpos) {
    TweenMax.to(window, 1, { // scroll speed
      scrollTo: {
        x: newpos,           // scroll along x axis
      },
      ease: Cubic.easeInOut,
    });
  });

  // scroll action when you click the nav links
  $(document).on('click', 'a[href^=#]', function(e) {
    var id = $(this).attr('href'); // get the href of clicked link
    if ($(id).length > 0) { // not empty links
      e.preventDefault(); // prevent normal link action
      controller.scrollTo(0, id); // scroll on click
      if (window.history && window.history.pushState) {
        history.pushState("", document.title, id); // update the URL
      }
    }
  });

  var pin_timeline =   new ScrollMagic.Scene({
    triggerElement: '.timeline-nav',
    triggerHook: '0',
    pushFollowers: true,
    duration: '900%',
  })
  .setPin('.timeline-nav')
  .addIndicators()
  .addTo(controller);

});
