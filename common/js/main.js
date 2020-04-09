;(function($) {




// settings


var rootDir = "/";




// include HTML


var includeHtml = {
	
	cnt: 0,
	cntLen: 4,
	
	init: function() {
		
		if (location.pathname.indexOf("/en/") === 0) {
			$(".page-header").addClass("is-en").load("/common/inc/en_header.html", this.loaded.bind(this));
			$(".page-footer").addClass("is-en").load("/common/inc/en_footer.html", this.loaded.bind(this));
			$(".hamburger-button").hide();
		} else {
			$(".page-header").load("/common/inc/header.html", this.loaded.bind(this));
			$(".page-footer").load("/common/inc/footer.html", this.loaded.bind(this));
		}
		
		$(".hamburger-body").load("/common/inc/hamburger.html", this.loaded.bind(this));
		
		if ($(".related-contents")[0]) {
			var category = $(".related-contents").data("category");
			category = category ? "_" + category : "";
			$(".related-contents .row").load("/motivation/note/inc/related_contents" + category + ".html", this.loaded.bind(this));
			this.cntLen++;
		}
		
		if ($(".work-related-body")[0]) {
			$(".work-related-body").load("/work/inc/other_works.html", this.loaded.bind(this));
			this.cntLen++;
		}
		
	},
	
	loaded: function() {
		
		this.cnt++;
		
		if (this.cnt == this.cntLen) {
			
			initPage();
			
			$(".page-cover").fadeOut(400, function() {
				$(this).remove();
			});
			
		}
		
	}
	
}




// hamburger menu


var hamburger = {
	
	
	isOpen: false,
	isOpening: false,
	
	scroll_y: 0,
	
	$container: $(),
	$body: $(),
	$button: $(),
	$cover: $(),
	$accordionButtons: $(),
	$corner: $(),
	$allLinks: $(),
	
	
	init: function() {
		
		var _this = this;
		
		this.$container = $(".global-container");
		this.$body = $(".hamburger-body");
		this.$button = $(".hamburger-button");
		this.$cover = $(".hamburger-cover");
		this.$accordionButtons = this.$body.find("button");
		this.$accordionBodies = this.$body.find(".accordion");
		this.$corner = this.$body.find(".corner");
		this.$allLinks = this.$body.find("a");
		
		this.$button.attr({ "aria-controls": "hamburger-body", "aria-expanded": "false" });
		this.$body.attr({ id: "hamburger-body", "aria-hidden": "true" });
		this.$allLinks.attr({ tabindex: "-1" });
		
		this.$button.on("click", function() {
			
			if (_this.isOpening) return false;
			_this.isOpening = true;
			
			if (_this.isOpen) {
				_this.close();
			} else {
				_this.open();
			}
			
		}).on("mouseup", function() {
			$(this).blur();
		});
		
		this.$corner.on("click", function() {
			
			if (_this.isOpening) return false;
			_this.isOpening = true;
			
			_this.close();
			
		});
		
		this.$accordionButtons.on("click", function() {
			
			if (_this.isOpening) return false;
			_this.isOpening = true;
			
			var $accordion = $(this).next();
			
			if ($(this).hasClass("open")) {
				
				$(this).removeClass("open");
				$accordion.css({ height: 0 }).one("transitionend", function() {
					if (_isSP) _this.fixCoverHeight();
					_this.isOpening = false;
				});
				
				$(this).attr({ "aria-expanded": "false" }).find("span").text("Open");
				$accordion.attr({ "aria-hidden": "true" });
				
			} else {
				
				$(this).addClass("open");
				
				var h = $accordion.children().innerHeight();
				
				$accordion.css({ height: h }).one("transitionend", function() {
					if (_isSP) _this.fixCoverHeight();
					_this.isOpening = false;
				});
				
				$(this).attr({ "aria-expanded": "true" }).find("span").text("Close");
				$accordion.attr({ "aria-hidden": "false" });
				
			}
			
		});
		
		this.$allLinks.last().on("keydown", function(e) {
			if (!e.shiftKey && e.keyCode == 9) {
				_this.$button.focus();
				e.preventDefault();
			}
		});
		
		this.$button.on("keydown", function(e) {
			if (_this.isOpen && e.shiftKey && e.keyCode == 9) {
				_this.$allLinks.last().focus();
				e.preventDefault();
			}
		});
		
	},
	
	
	open: function() {
		
		var _this = this;
		this.isOpen = true;
		
		this.scroll_y = $(window).scrollTop();
		this.$container.css({ position: "fixed", top: -this.scroll_y });
		$(window).scrollTop(0);
		
		this.$cover.addClass("show").one("transitionend", function() {
			if (_isSP) _this.fixCoverHeight();
		});;
		this.$button.addClass("close");
		this.$body.addClass("show").one("transitionend", function() {
			
			_this.$button.attr({ "aria-expanded": "true" }).find("span").text("Close");
			_this.$body.attr({ "aria-hidden": "false" });
			_this.$allLinks.attr({ tabindex: "0" });
			
			if (!_isSP) {
				_this.$accordionButtons.attr({ "aria-expanded": "true" });
				_this.$accordionBodies.attr({ "aria-hidden": "false" });
			}
			
			_this.isOpening = false;
			
		});
		
	},
	
	
	close: function() {
		
		var _this = this;
		this.isOpen = false;
		
		this.$body.removeClass("show").attr({ "aria-hidden": "true" });
		this.$button.removeClass("close").attr({ "aria-expanded": "false" }).find("span").text("Menu");
		this.$cover.removeClass("show").one("transitionend", function() {
			
			if (_isSP) {
				_this.$accordionButtons.removeClass("open").attr({ "aria-expanded": "false" }).find("span").text("Open");
				_this.$accordionBodies.css({ height: 0 }).attr({ "aria-hidden": "true" });
				_this.resetCoverHeight();
			} else {
				_this.$accordionButtons.attr({ "aria-expanded": "false" });
				_this.$accordionBodies.attr({ "aria-hidden": "true" });
			}
			_this.$allLinks.attr({ tabindex: "-1" });
			
			_this.$container.css({ position: "static", top: 0 });
			$(window).scrollTop(_this.scroll_y);
			
			_this.isOpening = false;
			
		});
		
	},
	
	
	fixCoverHeight: function() {
		
		var height = Math.max(this.$body.innerHeight(), _windowHeight);
		
		this.$cover.height(height);
		
	},
	
	
	resetCoverHeight: function() {
		
		this.$cover.height(_windowHeight);
		
	}
	
	
};




// fluid background


function initFluidBg() {
	
	var canvas = document.createElement("canvas");
	var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	var framebuffer = gl.createFramebuffer();
	var isSupported = !!(gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_UNSUPPORTED);
	
	if (isSupported && !_isAndroid) {
		
		window.fluid = {
			stage: "fluid-bg",
			shaderDir: rootDir + "common/js/shaders/",
			player: null,
			play: false,
			isSP: _isSP
		};
		
		require(["fluid-bg"], function() {
			
			function checkLoaded() {
				
				if (window.fluidBg) {
					
					window.fluid.player = new window.fluidBg;
					window.fluid.player.start();
					
					function checkReady() {
						if (window.fluidBg.ready) {
							includeHtml.loaded();
						} else {
							setTimeout(checkReady, 50);
						}
					}
					checkReady();
					
				} else {
					
					setTimeout(checkLoaded, 50);
					
				}
				
			}
			
			checkLoaded();
			
		});
		
	} else {
		
		$("#fluid-bg").replaceWith('<div id="fluid-bg"><div></div><div></div><div></div></div>');
		
		$("#fluid-bg div").each(function(idx) {
			
			if (idx == 0) return true;
			
			var duration = Math.floor(Math.random() * 3000) + 5000 + "ms";
			var delay = Math.floor(Math.random() * 3000) + "ms";
			
			$(this).css({
				animation: "alt-fluid-bg " + duration + " " + delay + " infinite"
			});
			
		});
		
		includeHtml.loaded();
		
	}
	
}


function pauseFluidBg() {
	
	if ($("#fluid-bg").prop("tagName") == "CANVAS") {
		
		$("#bg-pause").on("click", function() {
			
			if ($(this).hasClass("paused")) {
				window.fluid.player.start();
				$(this).removeClass("paused");
				$(this).find("span").text("BACKGROUND ON");
				$(this).find("img").attr({ src: "/common/img/icon-bgpause_bk.png" });
			} else {
				window.fluid.player.stop();
				$(this).addClass("paused");
				$(this).find("span").text("BACKGROUND OFF");
				$(this).find("img").attr({ src: "/common/img/icon-bgpause-off_bk.png" });
			}
			
		}).on("mouseup", function() {
			$(this).blur();
		});
		
	} else {
		
		$("#bg-pause").on("click", function() {
			
			if ($(this).hasClass("paused")) {
				$("#fluid-bg div").css({ "animation-play-state": "running" });
				$(this).removeClass("paused");
				$(this).find("span").text("BACKGROUND ON");
				$(this).find("img").attr({ src: "/common/img/icon-bgpause_bk.png" });
			} else {
				$("#fluid-bg div").css({ "animation-play-state": "paused" });
				$(this).addClass("paused");
				$(this).find("span").text("BACKGROUND OFF");
				$(this).find("img").attr({ src: "/common/img/icon-bgpause-off_bk.png" });
			}
			
		}).on("mouseup", function() {
			$(this).blur();
		});
	
	}
	
}




// top page: lead copy


function setTopLeadCopy() {
	
	var $copies = $(".catch p");
	var idx = Math.floor(Math.random() * $copies.length);
	
	$copies.eq(idx).show();
	
}




// top page: slider


var worksSlider = {
	
	currentId: 0,
	maxId: 0,
	isSliding: false,
	timer: null,
	interval: 3000,
	paused: false,
	
	$slide: $(),
	$slideTxt: $(),
	$slideImg: $(),
	$indicator: $(),
	
	init: function() {
		
		var _this = this;
		
		require(["lib/hammer.min"], function(hammer) {
			
			_this.$slide = $(".slide-container .slide");
			_this.$slideTxt = $(".slide-container .txt");
			_this.$slideImg = $(".slide-container .img");
			
			_this.maxId = _this.$slideImg.length - 1;
			
			var indicatorHtml = "", cls = ' class="current"';
			for (var i = 0; i < _this.$slide.length; i++) {
				indicatorHtml += '<button id="ind_' + i + '"' + cls + '>スライド' + (i + 1) + '</button>';
				cls = "";
			}
			$("#indicator-container").html(indicatorHtml);
			_this.$indicator = $("#indicator-container button");
			
			_this.$slide.find("a").attr({ tabindex: "-1" });
			
			$(".slider-nav .next").on("click", _this.slideNext.bind(_this, null)).on("mouseup", function() {
				$(this).blur();
			});
			$(".slider-nav .prev").on("click", _this.slidePrev.bind(_this, null)).on("mouseup", function() {
				$(this).blur();
			});
			$(".slider-nav .pause").on("click", function() {
				if (_this.paused) {
					_this.timer = setTimeout(_this.slideNext.bind(_this, null), _this.interval);
					$(this).removeClass("paused");
					_this.paused = false;
				} else {
					clearTimeout(_this.timer);
					$(this).addClass("paused");
					_this.paused = true;
				}
			}).on("mouseup", function() {
				$(this).blur();
			});
			
			_this.$indicator.on("click", function() {
				var idx = $(this).attr("id").substr(4) * 1;
				if (idx == _this.currentId) return;
				if (idx == _this.maxId || idx > _this.currentId) {
					_this.slideNext(idx);
				} else if (idx == 0 || idx < _this.currentId) {
					_this.slidePrev(idx);
				}
			});
			
			var mc = new Hammer(document.getElementById("fluid-slider"));
			mc.on("swipeleft", _this.slideNext.bind(_this, null));
			mc.on("swiperight", _this.slidePrev.bind(_this, null));
			
			$("#fluid-slider").on("mouseenter", function() {
				clearTimeout(_this.timer);
			}).on("mouseleave", function() {
				if (!_this.paused) {
					_this.timer = setTimeout(_this.slideNext.bind(_this, null), _this.interval);
				}
			});
			_this.timer = setTimeout(_this.slideNext.bind(_this, null), _this.interval);
			
			_this.slideFirst();
			fadeCatchCopy.init();
			
		});
		
	},
	
	slideFirst: function() {
		
		this.$slide.eq(this.currentId).addClass("show");
		this.$slideImg.eq(this.currentId).addClass("show-right");
		
	},
	
	slideNext: function(id) {
		
		if (this.isSliding) return;
		this.isSliding = true;
		
		clearTimeout(this.timer);
		
		var _this = this;
		var nextId = id !== null ? id : this.currentId == this.maxId ? 0 : this.currentId + 1;
		
		this.$slide.eq(this.currentId).removeClass("show");
		this.$slideImg.eq(this.currentId).addClass("hide-right");
		this.$slideImg.eq(nextId).addClass("show-right");
		
		this.$slideTxt.eq(this.currentId).one("transitionend", function() {
			_this.$slide.eq(nextId).addClass("show");
			_this.$slideTxt.eq(nextId).one("transitionend", function() {
				_this.$slideImg.eq(_this.currentId).attr({ "class": "img bgimg" });
				_this.$slideImg.eq(nextId).attr({ "class": "img bgimg show" });
				_this.$slide.eq(_this.currentId).find("a").attr({ tabindex: "-1" });
				_this.$slide.eq(nextId).find("a").attr({ tabindex: "0" });
				if (!_this.paused) {
					_this.timer = setTimeout(_this.slideNext.bind(_this, null), _this.interval);
				}
				_this.currentId = nextId;
				_this.isSliding = false;
			});
		});
		
		this.$indicator.eq(this.currentId).removeClass("current");
		this.$indicator.eq(nextId).addClass("current");
		
	},
	
	slidePrev: function(id) {
		
		if (this.isSliding) return;
		this.isSliding = true;
		
		clearTimeout(this.timer);
		
		var _this = this;
		var nextId = id !== null ? id : this.currentId == 0 ? this.maxId : this.currentId - 1;
		
		this.$slide.eq(this.currentId).removeClass("show");
		this.$slideImg.eq(this.currentId).addClass("hide-left");
		this.$slideImg.eq(nextId).addClass("show-left");
		
		this.$slideTxt.eq(this.currentId).one("transitionend", function() {
			_this.$slide.eq(nextId).addClass("show");
			_this.$slideTxt.eq(nextId).one("transitionend", function() {
				_this.$slideImg.eq(_this.currentId).attr({ "class": "img bgimg" });
				_this.$slideImg.eq(nextId).attr({ "class": "img bgimg show" });
				_this.$slide.eq(_this.currentId).find("a").attr({ tabindex: "-1" });
				_this.$slide.eq(nextId).find("a").attr({ tabindex: "0" });
				if (!_this.paused) {
					_this.timer = setTimeout(_this.slideNext.bind(_this, null), _this.interval);
				}
				_this.currentId = nextId;
				_this.isSliding = false;
			});
		});
		
		this.$indicator.eq(this.currentId).removeClass("current");
		this.$indicator.eq(nextId).addClass("current");
		
	}
	
}




// top page: catch copy fade


var fadeCatchCopy = {
	
	showOffset: .2,
	showPos: 0,
	isHidden: true,
	
	$slider: $(),
	$catch: $(),
	$viewMore: $(),
	$siteId: $(),
	
	init: function() {
		
		var _this = this;
		var waiting = false;
		
		this.$slider = $(".works").eq(0);
		this.$catch = $(".top").eq(0);
		this.$viewMore = this.$catch.find("a");
		this.$siteId = $(".site-id").eq(0);
		
		this.$siteId.attr({ tabindex: "-1" });
		this.$catch.addClass("show");
		this.$viewMore.attr({ tabindex: "0" });
		
		this.setPos();
		
		window.addEventListener("scroll", function() {
			
			if (!waiting && !hamburger.isOpen) {
				
				waiting = true;
				
				requestAnimationFrame(function() {
					
					var scrollTop = window.pageYOffset;
					
					if (scrollTop < _this.showPos && !_this.isHidden) {
						_this.$siteId.removeClass("show").attr({ tabindex: "-1" });
						_this.$catch.removeClass("hide").addClass("show");
						_this.$viewMore.attr({ tabindex: "0" });
						_this.$slider.removeClass("show");
						_this.isHidden = true;
					} else if (scrollTop >= _this.showPos && _this.isHidden) {
						_this.$siteId.addClass("show").attr({ tabindex: "0" });
						_this.$catch.removeClass("show").addClass("hide");
						_this.$viewMore.attr({ tabindex: "-1" });
						_this.$slider.addClass("show");
						_this.isHidden = false;
					}
					
					waiting = false;
					
				});
				
			}
			
		}, isPassiveSupported ? { passive: true } : false);
		
	},
	
	setPos: function() {
		
		this.showPos = _windowHeight * this.showOffset;
		
	}
	
}




// panels


function initWorkPanels() {
	
	$(".panel").addClass("loaded").append('<div class="bg"></div>');
	
	fadePanelsIn();
	
}


function fadePanelsIn() {
	
	var interval = .1;
	
	$(".panel").each(function(idx) {
		$(this).css({ transitionDelay: interval * idx + "s" }).addClass("show");
	});
	
}




// filtering bar


var filteringBar = {
	
	
	unfixY: 0,
	unfixPos: 0,
	tmpPos: 0,
	isFixed: true,
	isOpening: false,
	keys: [],
	
	$body: $(),
	$bar: $(),
	$list: $(),
	$openBtn: $(),
	$slideBtn: $(),
	$keys: $(),
	$bg: $(),
	
	
	init: function() {
		
		_this = this;
		var waiting = false;
		
		this.$body = $(".body-container");
		this.$bar = $(".filtering-bar");
		this.$list = $(".filtering-bar .list");
		this.$openBtn = $(".filtering-bar > button");
		this.$slideBtn = $(".filtering-bar .bar > button");
		this.$keys = $(".filtering-bar a");
		this.$bg = $(".filtering-bar .bg");
		
		/*
		this.keys = this.$keys.map(function() {
			return $(this).text();
		}).get();
		*/
		
		this.setPos();
		this.setCurrent();
		
		if (this.$bar.hasClass("close")) {
			this.$keys.attr({ tabindex: "-1" });
		} else {
			this.$openBtn.find("span").text("Close");
		}
		
		this.$openBtn.on("click", function() {
			
			if (_this.isOpening) return;
			_this.isOpening = true;
			
			if (_this.$bar.hasClass("close")) {
				
				_this.$bar.removeClass("close");
				$(this).find("span").text("Close");
				_this.$keys.attr({ tabindex: "0" });
				
			} else {
				
				if (_this.$slideBtn.hasClass("open")) {
					_this.$slideBtn.removeClass("open");
					_this.$list.css({ height: 0 }).one("transitionend", function() {
						_this.$bar.addClass("close");
					});
				} else {
					_this.$bar.addClass("close");
				}
				
				$(this).find("span").text("CATEGORY &amp; TAG");
				_this.$keys.attr({ tabindex: "-1" });
				
			}
			
			_this.$bg.one("transitionend", function() {
				_this.isOpening = false;
			});
			
			if (_isIE) _this.isOpening = false;
			
		});
		
		this.$slideBtn.on("click", function() {
			
			if (_this.isOpening) return;
			_this.isOpening = true;
			
			var height = 0;
			
			if ($(this).hasClass("open")) {
				$(this).removeClass("open");
				$(this).text("CATEGORY &amp; TAG");
			} else {
				_this.$list.children().each(function() {
					height += $(this).innerHeight();
				});
				$(this).addClass("open");
				$(this).text("Close");
			}
			
			_this.$list.css({ height: height }).one("transitionend", function() {
				_this.isOpening = false;
			});
			
		});
		
		/*
		this.$keys.on("click", function() {
			
			if (panels.isIndex) {
				
				if (!panels.action && !$(this).hasClass("selected")) {
					
					var key = $(this).text();
					
					if (_this.$slideBtn.css("display") == "block") {
						_this.$slideBtn.trigger("click");
					}
					_this.setCurrent(key);
					panels.filter(key);
					
				}
				
				return false;
				
			}
			
		});
		*/
		
		window.addEventListener("scroll", function() {
			
			if (!waiting && !_this.tmpPos && !hamburger.isOpen) {
				
				waiting = true;
				
				requestAnimationFrame(function() {
					_this.checkScrollPos();
					waiting = false;
				});
				
			}
			
		}, isPassiveSupported ? { passive: true } : false);
		
	},
	
	
	checkScrollPos: function() {
		
		var scrollTop = window.pageYOffset;
		
		if (scrollTop < this.unfixPos && !this.isFixed) {
			this.$bar.removeClass("unfixed").css({ bottom: 0 });
			this.isFixed = true;
		} else if (scrollTop >= this.unfixPos && this.isFixed) {
			this.$bar.addClass("unfixed").css({ bottom: this.unfixY });
			this.isFixed = false;
		}
		
	},
	
	
	setPos: function() {
		
		var barHeight = this.$bar.height();
		var bodyHeight = this.$body.innerHeight();
		var panelBottomMargin = _isSP ? 10 : 40;
		
		this.unfixY = Math.floor($("body").height() - bodyHeight - panelBottomMargin - barHeight);
		this.unfixPos = Math.floor(bodyHeight - _windowHeight + panelBottomMargin + barHeight);
		
		var scrollTop = window.pageYOffset;
		
		if (scrollTop < this.unfixPos) {
			if (this.tmpPos) {
				this.$bar.css({ transition: "bottom .3s ease-in-out", bottom: 0 })
					.one("transitionend", function() {
						$(this).css({ transition: "none" });
						_this.tmpPos = 0;
						_this.isFixed = true;
					});
			} else {
				this.$bar.removeClass("unfixed").css({ bottom: 0 });
				this.isFixed = true;
			}
		} else if (scrollTop >= this.unfixPos) {
			if (this.tmpPos || this.isFixed) {
				this.setPosFixedToAbs();
				this.tmpPos = 0;
			} else {
				this.$bar.addClass("unfixed");
			}
			if (parseInt(this.$bar.css("bottom"), 10) != this.unfixY) {
				this.$bar.css({ transition: "bottom .3s ease-in-out", bottom: this.unfixY })
					.one("transitionend", function() {
						$(this).css({ transition: "none" });
						_this.isFixed = false;
					});
			} else {
				this.isFixed = false;
			}
		}
		
	},
	
	
	setPosAbsToFixed: function() {
		
		var scrollTop = window.pageYOffset;
		this.tmpPos = this.unfixY - ($("body").height() - scrollTop - _windowHeight);
		
		this.$bar.removeClass("unfixed").css({ bottom: this.tmpPos });
		
	},
	
	
	setPosFixedToAbs: function() {
		
		var scrollTop = window.pageYOffset;
		var bottom = this.tmpPos + ($("body").height() - scrollTop - _windowHeight);
		
		this.$bar.addClass("unfixed").css({ bottom: bottom });
		
	},
	
	
	__setCurrent: function(key) { // by key
		
		this.$keys.removeClass("selected");
		this.$keys.filter(function() {
			return $(this).text() == key;
		}).addClass("selected");
		
	},
	
	
	setCurrent: function() { // by path
		
		var path = location.pathname;
		
		this.$keys.removeClass("selected");
		this.$keys.filter(function() {
			return $(this).attr("href") == path;
		}).addClass("selected");
		
	}
	
	
};




// fade-in, fade-out


var fader = {
	
	target: ".fade, .ats",
	defaultDelay: 0,
	threshold: { down: .9, up: .5 },
	fadeOut: false,
	
	$elms: $(),
	elmsPos: [],
	prevPos: 0,
	
	init: function() {
		
		var _this = this;
		var waiting = false;
		
		this.$elms = $(this.target);
		
		this.$elms.each(function() {
			var delay = _this.defaultDelay, additionalDelay = $(this).data("delay");
			if (additionalDelay) {
				delay += parseInt(additionalDelay, 10);
			}
			$(this).css({ animationDelay: delay + "ms" });
			if ($(this).hasClass("fade")) {
				$(this).children().css({ animationDelay: delay + "ms" });
			}
		});
		
		this.setPos();
		
		window.addEventListener("scroll", function() {
			
			if (!waiting && !hamburger.isOpen) {
				
				waiting = true;
				
				requestAnimationFrame(function() {
					_this.onScroll();
					waiting = false;
				});
				
			}
			
		}, isPassiveSupported ? { passive: true } : false);
		
	},
	
	setPos: function() {
		
		var _this = this;
		//var additionalOffset = 0;
		this.elmsPos = [];
		
		//if ($("#toppage")[0] && !_isSP) {
			//additionalOffset = (fadeFluidSlider.showDst + fadeFluidSlider.unfixDst) * _windowHeight;
		//}
		
		this.$elms.each(function(idx) {
			var top = $(this).offset().top;
			_this.elmsPos.push({
				idx: idx,
				pos: {
					up: top - _windowHeight * _this.threshold.up,// + additionalOffset,
					down: top - _windowHeight * _this.threshold.down// + additionalOffset
				},
				shown: false
			});
		});
		
		this.onScroll();
		
	},
	
	onScroll: function() {
		
		var scrollTop = $(window).scrollTop();
		var dir = this.prevPos > scrollTop ? "up" : "down";
		this.prevPos = scrollTop;
		
		if (dir == "down") {
			for (var i = 0; i < this.elmsPos.length; i++) {
				if (!this.elmsPos[i].shown && scrollTop > this.elmsPos[i].pos.down) {
					this.$elms.eq(this.elmsPos[i].idx).removeClass("hide").addClass("show");
					this.elmsPos[i].shown = true;
				}
			}
		} else if (this.fadeOut) {
			for (var i = 0; i < this.elmsPos.length; i++) {
				if (this.elmsPos[i].shown && scrollTop < this.elmsPos[i].pos.up) {
					this.$elms.eq(this.elmsPos[i].idx).removeClass("show").addClass("hide");
					this.elmsPos[i].shown = false;
				}
			}
		}
		
	}
	
}




// step background heading


function initStepBgHeading() {
	
	var $heading = $(".step-bg-heading");
	
	$heading.each(function() {
		
		var orgHtml = $(this).html(), dstHtml = "";
		var lines = orgHtml.split(/<br(?:\s*\/)?>/i);
		var w = [], z = 10, style = "";
		
		$(this).css({ visibility: "hidden" });
		
		for (var i = 0; i < lines.length; i++) {
			dstHtml += '<span style="display: inline-block;">' + lines[i] + '</span>';
		}
		$(this).html(dstHtml);
		dstHtml = "";
		
		$(this).children().each(function() {
			w.push($(this).width());
		});
		
		for (var i = 0; i < lines.length; i++) {
			
			style = "";
			
			if (i > 0) {
				if (w[i] > w[i - 1]) {
					z--;
				} else {
					style += 'padding-top: 0;';
					z++;
				}
			}
			
			if (i < lines.length - 1) {
				if (w[i] < w[i + 1]) {
					style += 'padding-bottom: 0;';
				}
			}
			
			dstHtml += '<div style="z-index: ' + z + ';"><span style="' + style + '">' + lines[i] + '</span></div>';
			
		}
		$(this).html(dstHtml);
		
		$(this).css({ visibility: "visible" });
		
	});
	
}




// share buttons


var shareButtons = {
	
	
	status: "",
	fixedX: 0,
	fixedY: 0,
	fixedFrom: 0,
	fixedTo: 0,
	
	$container: $(),
	$track: $(),
	$box: $(),
	
	
	init: function() {
		
		var _this = this;
		var waiting = false;
		
		this.$track = $(".share-buttons");
		this.$box = this.$track.children();
		this.$container = this.$track.parent();
		
		this.$container.css({ position: "relative" });
		
		this.setLink(this.$track);
		this.setPos();
		
		window.addEventListener("scroll", function() {
			
			if (!waiting && !hamburger.isOpen) {
				
				waiting = true;
				
				requestAnimationFrame(function() {
					_this.checkScrollPos();
					waiting = false;
				});
				
			}
			
		}, isPassiveSupported ? { passive: true } : false);
		
	},
	
	
	checkScrollPos: function() {
		
		var scrollTop = window.pageYOffset;
		
		if (scrollTop < this.fixedFrom && this.status != "above") {
			this.$box.css({ position: "absolute", top: 0, bottom: "auto", left: "auto" });
			this.status = "above";
		} else if (scrollTop >= this.fixedFrom && scrollTop < this.fixedTo && this.status != "fixed") {
			this.$box.css({ position: "fixed", top: this.fixedY, bottom: "auto", left: this.fixedX });
			this.status = "fixed";
		} else if (scrollTop >= this.fixedTo && this.status != "below") {
			this.$box.css({ position: "absolute", top: "auto", bottom: 0, left: "auto" });
			this.status = "below";
		}
		
	},
	
	
	setPos: function() {
		
		var style = window.getComputedStyle(this.$container[0]);
		var paddingTop = parseInt(style.paddingTop, 10);
		var paddingbottom = parseInt(style.paddingBottom, 10);
		var paddingLeft = parseInt(style.paddingLeft, 10);
		var height = parseInt(style.height, 10);
		
		var trackHeight = height - paddingTop - paddingbottom;
		
		this.$track.css({
			top: paddingTop,
			left: _isSP ? -15 : paddingLeft / 2 - 35,
			height: trackHeight
		});
		
		var trackOffset = this.$track.offset();
		
		this.fixedX = trackOffset.left;
		this.fixedY = _isSP ? 80 : paddingTop;
		this.fixedFrom = trackOffset.top - this.fixedY;
		this.fixedTo = this.fixedFrom + trackHeight - this.$box.height();
		
		this.checkScrollPos();
		
	},
	
	
	setLink: function(elm) {
		
		var url = location.href;
		var title = $("title").text();
		
		var facebook = "http://www.facebook.com/share.php?u=" + url;
		var twitter = "https://twitter.com/share?url=" + url + "&text=" + title;
		
		elm.each(function() {
			var btns = $(this).find("a");
			btns.eq(0).attr({ href: twitter, target: "_blank", rel: "nofollow" });
			btns.eq(1).attr({ href: facebook, target: "_blank", rel: "nofollow" });
			btns.eq(2).on("click", function() {
				copyText(url);
				return false;
			});
		});
		
	}
	
	
};




// works: lazyload

function lazyload() {
	
	var thumbnails = document.querySelectorAll(".thumbnail");
	
	if ("IntersectionObserver" in window) {
		
		var observer = new IntersectionObserver(load);
		
		Array.prototype.forEach.call(thumbnails, function(thumbnail) {
			observer.observe(thumbnail);
		});
		
		function load(entries, observer) {
			
			entries.forEach(function(entry) {
				
				if (entry.isIntersecting) {
					entry.target.style.backgroundImage = "url(" + entry.target.dataset.img + ")";
					removeLoader(entry.target);
					observer.unobserve(entry.target);
				}
				
				function removeLoader(target) {
					var img = new Image();
					img.onload = function() {
						target.parentNode.classList.add("loaded");
					};
					img.src = target.dataset.img;
				}
				
			});
			
		}
		
	} else {
		
		Array.prototype.forEach.call(thumbnails, function(thumbnail) {
			thumbnail.style.backgroundImage = "url(" + thumbnail.dataset.img + ")";
			thumbnail.parentNode.classList.add("loaded");
		});
		
	}
	
}




// change <img> to background-image


function imgToBackground() {
	
	$(".bgimg").each(function() {
		
		var img = $(this).children().attr("src");
		
		$(this).css({
			backgroundImage: "url(" + img + ")"
		});
		
	});
	
}




// load script


function loadScript(src, options) {
	
	var el = document.createElement("script");
	el.src = src;
	
	Object.keys(options).forEach(function(key) {
		el.setAttribute(key, this[key]);
	}, options);
	
	document.body.appendChild(el);
	
}




// clipboard


function copyText(str) {
	
	$(document.body).append('<textarea id="tmp" style="position: fixed; right: 100vw; font-size: 16px;" readonly="readonly">' + str + '</textarea>');
	var elm = $("#tmp")[0];
	
	elm.select();
	var range = document.createRange();
	range.selectNodeContents(elm);
	var sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(range);
	elm.setSelectionRange(0, 999999);
	
	document.execCommand("copy");
	
	$(elm).remove();
	
}　




// smooth scroll


function smoothScroll() {
	
	$("a[href^='#'][href!='#']").on("click", function() {
		
		var href = $(this).attr("href");
		var top = 0;
		
		if ($(href)[0]) {
			top = $(href).offset().top - (_isSP ? _scrollOffsetSP : _scrollOffsetPC);
		} else {
			if (href != "#top") return false;
		}
		
		_scrollableElement.animate({ scrollTop: top }, 600, "easeInOutCubic");
		
		return false;
		
	});
	
}


function getScrollableElement() {
	
	var elm;
	
	$(window).scrollTop(1);
	
	if ($("html").scrollTop() > 0) {
		elm = $("html");
	} else {
		elm = $("body");
	}
	
	$(window).scrollTop(0);
	
	return elm;
	
}




// easing


$.extend($.easing, {
	easeOutExpo: function (x, t, b, c, d) {
		return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b;
	}
});




// cookie


var Cookies = {
	
	get: function(key) {
		
		if (!this.has(key)) return null;
		
		return decodeURIComponent(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
		
	},
	
	set: function(key, value, days, path, domain, secure) {
		
		if (days) {
			var expires = new Date();
			expires.setMilliseconds(expires.getMilliseconds() + days * 864e+5);
			expires = expires.toUTCString();
		} else {
			var expires = "";
		}
		
		document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + (expires ? "; expires=" + expires : "") + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "") + (secure ? "; secure" : "");
		
	},
	
	has: function(key) {
		
		return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
		
	},
	
	del: function(key) {
		
		document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
		
	}
	
};




// sp?


function isSP() {
	
	return !!($(".page-footer").css("padding-bottom") != "70px");
	
}




// passive support check


function isPassiveSupported() {
	
	var supported = false;
	
	try {
		window.addEventListener("test", null, Object.defineProperty({}, "passive", {
			get: function() {
				supported = true;
			}
		}));
	} catch(err) {}
	
	return supported;
	
}




// google analytics


function loadGoogleAnalytics() {
	
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-33603236-1']);
	_gaq.push(['_setDomainName', 'frontage.jp']);
	_gaq.push(['_trackPageview']);
	
	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
	
}


/*
function loadGoogleAnalytics() {
	
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	
	ga('create', 'UA-33603236-1', 'auto');
	ga('send', 'pageview');
	
}
*/




// on ready


var _windowWidth = 0, _windowHeight = 0;
var _isSP = false;
var _os = navigator.platform.toLowerCase();
var _ua = navigator.userAgent.toLowerCase();
var _isIE = !!(_ua.indexOf("msie") > -1 || _ua.indexOf("trident/7") > -1);
var _isAndroid = !!(_ua.indexOf("android") > -1);
var _isTouchDevice = !!(window.ontouchstart === null && _os.indexOf("win") == -1 && _os.indexOf("mac") == -1);
var _isPassiveSupported = isPassiveSupported();
var _scrollableElement, _scrollOffsetPC = 100, _scrollOffsetSP = 75;
var _mousewheelEvent = "onwheel" in document ? "wheel" : "mousewheel";


$(function() {
	
	
	// init
	
	_windowWidth = $(window).width();
	_windowHeight = $(window).height();
	_scrollableElement = getScrollableElement();
	_isSP = isSP();
	
	
	// fluid background
	
	if ($("#fluid-bg")[0]) {
		initFluidBg();
	} else {
		includeHtml.cntLen--;
	}
	
	
	includeHtml.init();
	
	
});


function initPage() {
	
	
	// google analytics
	
	//loadGoogleAnalytics();
	
	
	// hamburger menu
	
	hamburger.init();
	
	
	// change <img> to background-image
	
	imgToBackground();
	
	
	// smooth scroll
	
	smoothScroll();
	
	if (location.hash && location.hash.indexOf("%") == -1 && $(location.hash)[0]) {
		var top = $(location.hash).offset().top - (_isSP ? _scrollOffsetSP : _scrollOffsetPC);
		_scrollableElement.animate({ scrollTop: top }, 600, "easeInOutCubic");
	}
	
	
	// fade-in, fade-out
	
	if ($(fader.target)[0]) {
		fader.init();
	}
	
	
	// step background heading
	
	if ($(".step-bg-heading")[0]) {
		initStepBgHeading();
	}
	
	
	// panel filtering
	
	if ($(".filtering-bar")[0]) {
		filteringBar.init();
		//panels.init();
	}
	
	
	// works, solution articles
	
	if ($("#works-index")[0] || $("#works-article")[0] || $("#solution-article")[0]) {
		initWorkPanels();
	}
	
	
	// top page
	
	if ($("#toppage")[0]) {
		setTopLeadCopy();
		worksSlider.init();
	}
	
	
	// works index: lazyload
	
	if ($("#works-index")[0]) {
		lazyload();
	}
	
	
	// note index
	
	if ($("#columns-index")[0]) {
		fadePanelsIn();
	}
	
	
	// news index
	
	if ($("#news-index")[0]) {
		fadePanelsIn();
	}
	
	
	// share buttons
	
	if ($(".share-buttons")[0]) {
		shareButtons.init();
	}
	
	if ($("#works-article")[0]) {
		shareButtons.setLink($(".share"));
	}
	
	
	// fluid background
	
	if ($("#fluid-bg")[0]) {
		pauseFluidBg();
	}
	
	
	// on resize
	
	var resizeTimer = false;
	
	$(window).on("resize", function() {
		
		if (resizeTimer !== false) {
			clearTimeout(resizeTimer);
		}
		
		resizeTimer = setTimeout(function() {
			
			var w = $(window).width();
			_windowHeight = $(window).height();
			
			if (w != _windowWidth) {
				
				
				_windowWidth = w;
				
				var wasSP = _isSP;
				_isSP = isSP();
				var broken = ((wasSP && !_isSP) || (!wasSP && _isSP));
				
				
				// reload
				
				if (broken) {
					//location.reload();
				}
				
				
				// share buttons
				
				if ($(".share-buttons")[0]) {
					shareButtons.setPos();
				}
				
				
				// fade-in, fade-out
				
				if ($(fader.target)[0]) {
					fader.setPos();
				}
				
				
			}
			
			
			// top page
			
			if ($("#toppage")[0]) {
				fadeCatchCopy.setPos();
			}
			
			
			// panel filtering
			
			if ($(".filtering-bar")[0]) {
				filteringBar.setPos();
			}
			
			
		}, 500);
		
	});
	
	
}




})(jQuery);