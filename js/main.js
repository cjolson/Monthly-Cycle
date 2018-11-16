$(document).ready(function () {

  // init controller
  var controller = new ScrollMagic.Controller();

  // animate scroll instead of a jump
  controller.scrollTo(function(target) {
    console.log('scroooooll');
    console.log('target = '+target); // BUT HERE IT IS 0 :cry:
    console.log(typeof(target));
    /*TweenMax.to(window, 0.5, { // .5 is scroll speed
      scrollTo: {
        y: id,        // scroll along y axis
        autoKill: true,   // allow users to kill scroll action
      },
      ease: Cubic.easeInOut,
    });*/
  });

  // scroll action when you click the nav links
  $(document).on('click', 'a[href^=#]', function(e) {
    var id = $(this).attr('href'); // get the href of clicked link
    if ($(id).length > 0) { // not empty links
      e.preventDefault(); // prevent normal link action
      console.log('click');
      console.log('id = '+id); // IT PRINTS CORRECT HERE
      console.log(typeof(id));
      controller.scrollTo(id); // scroll on click
      // update the URL
      if (window.history && window.history.pushState) {
        history.pushState("", document.title, id);
      }
    }
  });

});
