$(document).ready(function () { // wait for document ready
		// init
		var controller = new ScrollMagic.Controller();

		// define movement of panels
		var wipeAnimation = new TimelineMax()
			.fromTo("section.panel.mensturation-start",    1, {x:  "100%"}, {x: "0%", ease: Linear.easeNone})  // in from right

		// create scene to pin and link animation
		var scene = new ScrollMagic.Scene({
				triggerElement: "#content-container",
				triggerHook: "onLeave",
				duration: "300%"
			})
			.setPin("mensturation-start")
			.setTween(wipeAnimation)
			.addIndicators() // add indicators (requires plugin)
			.addTo(controller);
	});
