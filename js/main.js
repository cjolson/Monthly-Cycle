$(document).ready(function () {

  // init controller
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      reverse: true
    },
    vertical: false
  });

  scrollingNavigation(controller);
  pinItem('.hormones', 0, controller);
  pinItem('.timeline-nav', 0, controller);
  $('path').each(function() {drawPath(this, controller)});

  var fade_in_timeline = new ScrollMagic.Scene({
    triggerElement: '.timeline-nav',
    triggerHook: .4,
    duration: '100%',
  })
  .setTween(fadeInTween('.timeline-nav'))
  .addTo(controller);

  var uterus_grow = new TweenMax.fromTo('#uterine-wall', 1,
    {width: 0}, {width: '100vw', ease: Linear.easeNone},
  );

  var uterus = new ScrollMagic.Scene({
    triggerElement: '#menstruation-start',
    duration: '1400%',
    tweenChanges: true,
  })
  .setTween(uterus_grow)
  .addTo(controller);
});




function scrollingNavigation(controller) {
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
};

function fadeInTween(div) {
  return new TweenMax.fromTo(div, 1,
    {autoAlpha:0}, {autoAlpha:1},
  );
};

function pathPrepare($el) {
  var lineLength = $el[0].getTotalLength();
  $el.css("stroke-dasharray", lineLength);
  $el.css("stroke-dashoffset", lineLength);
}

function drawPath(path, controller) {
  pathPrepare($(path));
  var draw = new TimelineMax()
                  .add(TweenMax.to(
                    path, 1,
                    {strokeDashoffset: 0, ease: Linear.easeNone }
                  )); // draw word for 0.9
  var draw_line = new ScrollMagic.Scene({
    triggerElement: '#menstruation-start',
    duration: '1400%',
    tweenChanges: true
  })
  .setTween(draw)
  .addTo(controller);
}

function pinItem(item, hook, controller) {
  var pinned_item = new ScrollMagic.Scene({
    triggerElement: item,
    triggerHook: hook,
  })
  .setPin(item)
  .addTo(controller);
}
