$(document).ready(function () {

  // init controller
  var controller = new ScrollMagic.Controller();

  // animate scroll instead of a jump
  controller.scrollTo(function(i, newpos) {
    console.log(newpos);
    console.log('scroooooll');
    console.log('newpos = '+newpos); // BUT HERE IT IS 0 :cry:
    console.log(typeof(newpos));
    TweenMax.to(window, 1, { // scroll speed
      scrollTo: {
        x: newpos,        // scroll along x axis
      },
      ease: Cubic.easeInOut,
    });
  });

  // scroll action when you click the nav links
  $(document).on('click', 'a[href^=#]', function(e) {
    var id = $(this).attr('href'); // get the href of clicked link
    if ($(id).length > 0) { // not empty links
      e.preventDefault(); // prevent normal link action
      console.log('click');
      console.log('id = '+id); // IT PRINTS CORRECT HERE
      console.log(typeof(id));
      controller.scrollTo(0, id); // scroll on click
      // update the URL
      if (window.history && window.history.pushState) {
        history.pushState("", document.title, id);
      }
    }
  });

});
