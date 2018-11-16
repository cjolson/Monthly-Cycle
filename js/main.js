$(document).ready(function () {

  // init controller
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      reverse: true
    },
    vertical: false,
  });



  new ScrollMagic.Scene({
    triggerElement: '.timeline-nav',
    triggerHook: '0',
    pushFollowers: true,
    duration: '1000%',
  })
  .setPin('.timeline-nav')
  .addIndicators()
  .addTo(controller);



});
