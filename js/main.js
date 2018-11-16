$(document).ready(function () {

  // init controller
  var controller = new ScrollMagic.Controller();

  $('.panel').each(function() {
    console.log(this);
  })
  // define wiping animation for panels
  var wipeAnimation = new TimelineMax()
    .fromTo('section.panel.menstruation-start',
            200, {x:  '100%'}, {x: '0%', ease: Linear.easeNone, delay: 100})
    .fromTo('section.panel.follicular-phase',
            200, {x:  '100%'}, {x: '0%', ease: Linear.easeNone, delay: 100})
    .fromTo('section.panel.ovulation',
            200, {x:  '100%'}, {x: '0%', ease: Linear.easeNone, delay: 100})
    .fromTo('section.panel.luteal-phase',
            200, {x:  '100%'}, {x: '0%', ease: Linear.easeNone, delay: 100})
    .fromTo('section.panel.menstruation-end',
            200, {x:  '100%'}, {x: '0%', ease: Linear.easeNone, delay: 100});

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

  	//  bind scroll to anchor links
  	$(document).on("click", "a[href^='#']", function (e) {
  		var id = $(this).attr("href");
  		if ($(id).length > 0) {
  			e.preventDefault();

  			// trigger scroll
  			controller.scrollTo(id);

  				// if supported by the browser we can even update the URL.
  			if (window.history && window.history.pushState) {
  				history.pushState("", document.title, id);
  			}
  		}
  	});
});
