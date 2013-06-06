(function ($) {
    $.extendScrolling = {
        options: {},
        // INITIALIZE ----------------------------------------------------------
        /**
         * Initialize $.expentScolling
         */
        init: function () {
            if (this.isParallaxPage()) {

                // Register callbacks for $.ParallaxBuilder
                this.registerCallbacks();

                // Set additional functions to $.ParallaxBuilder
                this.addAnimationHelperFunctions();
            }
        },
        // HELPER --------------------------------------------------------------
        /**
         * Register callbacks for $.ParallaxBuilder
         */
        registerCallbacks: function () {
            var self = this;

            objParallax.callbacks.ScrollAnimator.touchMoveHandler.push(function (e) {
                return self.ontouchMoveHandler(e);
            });

            objParallax.callbacks.ScrollAnimator.afterInit.push(function () {
                return self.onAfterInit();
            });

            objParallax.callbacks.ParallaxBuilder.init.push(function (objParam) {
                return self.onInit(objParam);
            });

            objParallax.callbacks.ParallaxBuilder.start.push(function (objParam) {
                return self.onStart(objParam);
            });

            objParallax.callbacks.ParallaxBuilder.resize.push(function (objParam) {
                return self.onResize(objParam);
            });

            objParallax.callbacks.ParallaxBuilder.update.push(function (objParam) {
                return self.onUpdate(objParam);
            });
        },
        // CALLBACKS -----------------------------------------------------------
        /**
         * Callback for on init $.ParallaxBuilder
         * 
         * @param {object} objParam
         */
        onInit: function (objParam) {},
        /**
         * Callback for on after init parallax builder
         * 
         * @param {object} objParam
         */
        onAfterInit: function (objParam) {},
        /**
         * Callback for on start $.ScrollAnimator
         * 
         * @param {object} objParam
         */
        onStart: function (objParam) {},
        /**
         * Callback for on resize $.ScrollAnimator
         * 
         * @param {object} objParam
         */
        onResize: function (objParam) {
            // Example of how to enable and disable parallax script for mobile
            // and desktop
            var intResizeWidth = $(window).width(),
                blnAbort = ((this.isParallaxPage()) ? objParam.ParallaxBuilder.isAbort() : this.options.isLowViewPort);

            if (intResizeWidth < 960 && (blnAbort === false)) {
                console.log('mobile');
                // Mobile init
                if (this.isParallaxPage()) {
                    objParam.ParallaxBuilder.abortScrollAnimation();
                } else {
                    this.options.isLowViewPort = true;
                }
            } else if (intResizeWidth >= 960 && (blnAbort === true)) {
                console.log('desktop');
                // Desktop init
                if (this.isParallaxPage()) {
                    objParam.ParallaxBuilder.continueScrollAnimation();
                } else {
                    this.options.isLowViewPort = false;
                }
            }
        },
        /**
         * Callback for on update $.ScrollAnimator
         * 
         * @param {object} objParam
         */
        onUpdate: function (objParam) {},
        /**
         * Callback for on touchMoveHandler $.ScrollAnimator
         * 
         * @param {object} event
         */
        ontouchMoveHandler: function (event) {},
        // ANIMATION HELPER FUNCTIONS ------------------------------------------
        /**
         * Set additional functions to $.ParallaxBuilder which can be choosen in 
         * the backend
         */
        addAnimationHelperFunctions: function () {
            $.extend($.ParallaxBuilder.animationHelperFunctions, {
                /**
                 * Do something here
                 * 
                 * @param {Object} anim
                 * @param {object|undefined} opts
                 * @param {ParallaxBuilder} self
                 * @param {Object} opt
                 */
                exampleFunction: function (anim, opts, self, opt) {
                    //console.log('exampleFunction call');

                    // Get window height or width
                    //console.log(self.options.wHeight, 'wHeight');
                    //console.log(self.options.wWidth, 'wWidth');

                    // Get animation object
                    //console.log(anim, 'anim');
                    //console.log(anim._elem, 'anim._elem');

                    // Set style to element with $.ParallaxBuilder helper function. 
                    // This function save alle inline styles and his element for 
                    // better handling if you want to reset all styles on special breakpoint
                    //self.setStyles(anim._elem, {
                    //    'height': height
                    //});

                    // Set property to animation
                    //anim.properties['top'] = 0;
                    //anim.properties['bottom'] = 0;
                }
            });
        },

        // HELPER --------------------------------------------------------------
        /**
         * Return if $.ParallaxBuilder exists on this page
         * 
         * @returns {@exp;jQuery@pro;ParallaxBuilder}
         */
        isParallaxPage: function () {
            return (!!$.ParallaxBuilder);
        }
    };
})(jQuery);

jQuery.extendScrolling.init();