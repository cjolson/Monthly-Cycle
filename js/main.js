$(document).ready(function () {

  // init controller
  var controller = new ScrollMagic.Controller();
/*
  var timeline = new ScrollMagic.Scene({
    triggerElement: '#timeline-nav',
    triggerHook: 0.9,
    reverse: true,
  })
    .setPin('#timeline-nav')
    .addIndicators()
    .addTo(controller);
*/
  var wipeAnimation = new TimelineMax()
    .fromTo('section.panel.menstruation-start',
            1, {x:  '100%'}, {x: '0%', ease: Linear.easeNone})
    .fromTo('section.panel.follicular-phase',
            1, {x:  '100%'}, {x: '0%', ease: Linear.easeNone})
    .fromTo('section.panel.ovulation',
            1, {x:  '100%'}, {x: '0%', ease: Linear.easeNone})
    .fromTo('section.panel.luteal-phase',
            1, {x:  '100%'}, {x: '0%', ease: Linear.easeNone})
    .fromTo('section.panel.menstruation-end',
            1, {x:  '100%'}, {x: '0%', ease: Linear.easeNone});

  var scene = new ScrollMagic.Scene({
    triggerElement: '#content-container',
    triggerHook: 'onLeave',
    duration: '300%',
    reverse: true,
  })
    .setPin('#content-container')
    .setTween(wipeAnimation)
    .addIndicators()
    .addTo(controller);

});
