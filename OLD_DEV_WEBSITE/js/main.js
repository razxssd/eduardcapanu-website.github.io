/* Template Name : Moive - Creative Modern Personal Page                 */
/* Author        : Rietts Andreas Ruff                                   */
/* Author URI    : https://themeforest.net/user/riettsruff               */
/* Version       : 1.0                                                   */
/* ===================================================================== */

(function($) {
	"use strict";

	// Declaration of moive variable globally
	var moive = {};

	// Portfolio Filter
	moive.portfolioFilter = {
		// Item container
		container: $('#portfolio .content-wrapper .project-items'),
		// Init function
		init: function() {
			// Checking if all images are loaded
			moive.portfolioFilter.container.imagesLoaded(function() {
				// Init isotope once all images are loaded
				moive.portfolioFilter.container.isotope({
					itemSelector: '#portfolio .content-wrapper .project-items .single-item',
					layoutMode: 'masonry',
					transitionDuration: '0.8s'
				});
				// Forcing a perfect masonry layout after initial load
				moive.portfolioFilter.container.isotope('layout');
				// Filter items when the button is clicked
				$('#portfolio .content-wrapper .project-filters a').on('click', function() {
					// Remove the active class from the previous element
					$('#portfolio .content-wrapper .project-filters a.active').removeClass('active');
					// Add the active class to the button clicked
					$(this).addClass('active');
					// Data filter
					var selector = $(this).attr('data-filter');
					moive.portfolioFilter.container.isotope({
						filter: selector
					});
					setTimeout(function() {
						moive.portfolioFilter.container.isotope('layout');
					}, 6);
					return false;
				});
			});
		}
	};

	// Page Resolution
	moive.pageResolution = {
		pageHeight: "",
		container: "",
		pageWidth: "",
		init: function() {
			this.pageHeight = $(window).height();
			this.containerHeight = $(document).height();
			this.pageWidth = $(window).width();
		}
	};

	// Reading Indicator
	moive.readingIndicator = {
		progressBar: $("#reading-indicator .indicator-progress"),
		init: function() {
			var adjustedHeight = moive.pageResolution.containerHeight - moive.pageResolution.pageHeight;
			var value = (($(window).scrollTop() / adjustedHeight) * 100);
			this.progressBar.css("width", value + "%");
		}
	};

	// Skill Progress
	moive.skillProgress = {
		bottomOfObject: "",
		bottomOfWindow: "",
		completedCounting: 0,
		count: function() {
			$('.single-grouping-skill .single-skill').each(function() {
				var skillPercent = $(this).find('.percentage').data('percent');
				$(this)
					.find('.percentage')
					.countTo({
						from: 0,
						to: skillPercent,
						speed: 1000
					});
				$(this)
					.find('.progress-wrapper .progress')
					.css({
						'width': skillPercent + '%',
						'transition': 'width 2s linear'
					});
			});
			this.completedCounting = 1;
		},
		init: function() {
			if (this.completedCounting == 0) {
				this.bottomOfObject = $('.single-grouping-skill .single-skill:nth-of-type(1)').offset()?.top + $('.single-grouping-skill .single-skill:nth-of-type(1)').outerHeight();
				this.bottomOfWindow = $(window).scrollTop() + moive.pageResolution.pageHeight;
				if (this.bottomOfWindow > this.bottomOfObject) {
					this.count();
				}
			}
		}
	};

	// Fun Fact Progress
	moive.funFactProgress = {
		bottomOfObject: "",
		bottomOfWindow: "",
		completedCounting: 0,
		count: function() {
			$('.fun-facts .single-fun-fact').each(function() {
				var funFactVal = $(this).find('.fun-fact-value').data('value');
				$(this)
					.find('.fun-fact-value')
					.countTo({
						from: 0,
						to: funFactVal,
						speed: 1000
					});
			});
			this.completedCounting = 1;
		},
		init: function() {
			if (this.completedCounting == 0) {

				this.bottomOfObject = $('.fun-facts .single-fun-fact:nth-of-type(1)').offset().top + $('.fun-facts .single-fun-fact:nth-of-type(1)').outerHeight();
				this.bottomOfWindow = $(window).scrollTop() + moive.pageResolution.pageHeight;

				if (this.bottomOfWindow > this.bottomOfObject) {
					this.count();
				}
			}
		}
	};

	// Replace Viewport Height
	// Solves the issue about the viewport height on mobile devices as when the page loads
	moive.replaceVHeight = function() {
		$('html').css({
			'height': moive.pageResolution.pageHeight
		});
	};

	// Pre Loader
	moive.preLoader = function(duration) {
		$('.pre-loader').fadeOut(parseInt(duration, 10));
	};

	// Use Typed
	moive.useTyped = function() {
		var target = $(".profession-text");
		target.typed({
			strings: target.attr("data-text").split(","),
			typeSpeed: 50
		});
	};

	// Use OnePageNav
	moive.useOnePageNav = function() {
		$("#menu-overlay").onePageNav({
			currentClass: "active",
			changeHash: false,
			scrollSpeed: 1000,
			scrollThreshold: 0.5,
			filter: "",
			easing: "swing",
			begin: function() {
				// If clicking a link in the menu overlay makes the rest of the links unclickable until you scroll, you can solve it in this hacky way
				$("body").append('<div id="device-dummy" style="height: 1px;"></div>');
			},
			end: function() {
				$("#device-dummy").remove();
				$("#menu-overlay").removeClass("active");
			}
		});
	};

	// Use Magnific Popup
	moive.useMagnificPopup = function() {
		// For portfolio item
		$('.project-items .single-item .project-preview .overlay').magnificPopup({
			delegate: '.view-more',
			type: 'inline',
			removalDelay: 300,
			mainClass: 'mfp-fade',
			fixedContentPos: true,
			callbacks: {
				beforeOpen: function() {
					$('html').addClass('mfp-helper');
				},
				close: function() {
					$('html').removeClass('mfp-helper');
				}
			}
		});
	};

	// Process Contact Form
	moive.processContactForm = function() {
		var form = $('form[name="contact"]'),
			message = $('.alert-msg'),
			formData;

		// Success Function
		var doneFunc = function(response) {
			message.text(response);
			message
				.removeClass('danger-msg')
				.addClass('success-msg')
				.fadeIn();
			setTimeout(function() {
				message.fadeOut();
			}, 3000);
			form.find('input:not([type="submit"]), textarea').val('');
		};

		// Fail Function
		var failFunc = function(jqXHR, textStatus, errorThrown) {
			if (jqXHR.status === 400) {
				message.text(jqXHR.responseText);
			} else {
				message.text(jqXHR.statusText);
			}
			message
				.removeClass('sucess-msg')
				.addClass('danger-msg')
				.fadeIn();
			setTimeout(function() {
				message.fadeOut();
			}, 6000);
		};

		// Form On Submit
		form.on('submit', function(e) {
			e.preventDefault();
			formData = $(this).serialize();
			$.ajax({
					type: 'POST',
					url: form.attr('action'),
					data: formData
				})
				.done(doneFunc)
				.fail(failFunc);
		});
	};

	// Add Accordion On Reviews Section
	moive.addAccordionOnReviews = function () {
		let acc = document.getElementsByClassName("reviews-accordion");
		let i;

		for (i = 0; i < acc.length; i++) {
			acc[i].addEventListener("click", function() {
				this.classList.toggle("active");
				const panel = this.parentElement?.nextElementSibling?.nextElementSibling;
				if (panel.style.display === "block") {
					panel.style.display = "none";
				} else {
					panel.style.display = "block";
				}
			});
		}
	}

	// Contact Button On Click
	$(".contact-button").on("click", function(e) {
		e.preventDefault();
		var target = $("#contact").offset().top;
		$("html, body").animate({
			scrollTop: target,
		}, 2000);
	});

	// Scroll Down On Click
	$(".scroll-down").on("click", function(e) {
		e.preventDefault();
		var target = $($(this).attr("href")).offset().top;
		$("html, body").animate({
			scrollTop: target,
		}, 1000);
	});

	// Prevent Default 'a[href="#"]' click
	$('a[href="#"]').on('click', function(e) {
		e.preventDefault();
	});

	// Menu Button On Click
	$("#menu-button").on("click", function() {
		$("#menu-overlay").addClass("active");
	});

	// Close Button On Menu Overlay On Click
	$("#menu-overlay .close-menu-overlay").on("click", function() {
		$("#menu-overlay").removeClass("active");
	});

	// Window On Scroll
	$(window).on("scroll", function() {
		moive.pageResolution.init();
		moive.readingIndicator.init();
		moive.skillProgress.init();
		moive.funFactProgress.init();
	});

	// Window On Resize
	$(window).on("resize", function() {
		moive.pageResolution.init();
		moive.readingIndicator.init();
		moive.replaceVHeight();
	});

	// Window On Load
	$(window).on('load', function() {
		moive.preLoader(1500);
	});

	// Device Orientation Changes
	window.addEventListener("orientationchange", function() {
		moive.pageResolution.init();
		moive.readingIndicator.init();
		moive.portfolioFilter.container.isotope("layout");
	}, false);

	$("#rx-in-progress-0, #rx-in-progress-1").on("click", function() {
		console.log("clicked");
		alert("Will be released soon! Thank you for your patience :)")
	});

	// Document Ready
	$(document).ready(function() {
		moive.pageResolution.init();
		moive.readingIndicator.init();
		moive.portfolioFilter.init();
		moive.skillProgress.init();
		moive.funFactProgress.init();
		moive.useTyped();
		moive.useOnePageNav();
		moive.useMagnificPopup();
		moive.processContactForm();
		moive.addAccordionOnReviews();
	});
})(jQuery);
