$(document).ready(function () {

  // init controller
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      reverse: true
    },
    vertical: false,
    logLevel: 3,
    refreshInterval: 100,
  });


  scrollingNavigation(controller);
  controller.addScene([
    pinItem('.hormones', 0),
    pinItem('.timeline-nav',0),
    fadeInItem('.timeline-nav', .4)
  ]);

  $('path').each(function() {
    controller.addScene(drawPath(this));
  });

  $('.hormone-text').each(function() {
    controller.addScene(revealHormone(this));
  });

  $('.section-heading').each(function() {
    controller.addScene([
      pinItem(this, .2, $(this).parent().width() * .9),
      fadeInItem(this, .9)
    ]);
  });

  $('text').find('p').each(function() {
    console.log(this);
  });


  var uterus_grow = new TweenMax.fromTo('#uterine-wall', 1,
    {width: 0}, {width: '100vw', ease: Linear.easeNone},
  );

  var uterus = new ScrollMagic.Scene({
    triggerElement: '#menstruation-start',
    duration: '1300%',
    tweenChanges: true,
  })
  .setTween(uterus_grow)
  .addTo(controller);
});



function fadeInItem(item, hook) {
  return new ScrollMagic.Scene({
    triggerElement: item,
    triggerHook: hook,
    duration: '100%',
  })
  .setTween(fadeInTween(item))
}

function pinItem(item, hook, width) {
  var duration = width || 0;
  return pinned_item = new ScrollMagic.Scene({
    triggerElement: item,
    triggerHook: hook,
    duration: duration,
  })
  .setPin(item)
}

function fadeInTween(div) {
  return new TweenMax.fromTo(div, 1,
    {autoAlpha:0}, {autoAlpha:1},
  );
};

function appear(div) {
  return new TweenMax.from(
    div,
    .5,
    {css: {scale: 0, opacity: 0}},
    {ease: Sine.easeOut}
  );
}

function pathPrepare($el) {
  var lineLength = $el[0].getTotalLength();
  $el.css("stroke-dasharray", lineLength);
  $el.css("stroke-dashoffset", lineLength);
}

function drawPath(path) {
  pathPrepare($(path));
  var draw = new TimelineMax()
                  .add(TweenMax.to(
                    path, .8,
                    {strokeDashoffset: 0, ease: Linear.easeNone }
                  )); // draw word for 0.9

  return draw_line = new ScrollMagic.Scene({
    triggerElement: '#menstruation-start',
    duration: '1300%',
    tweenChanges: true,
  })
  .setTween(draw);
};

function revealHormone(hormone) {
  var class_name = $('.'+hormone.classList[0]);
  var label_element = $('.hormones').find(class_name);
  return new ScrollMagic.Scene({
    triggerElement: hormone,
    triggerHook: .8,
  })
  .setTween(appear(label_element))
};

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
