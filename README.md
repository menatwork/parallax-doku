Parallax for Contao - English
=============================

About
-----

The parallax extension offers the possibility to add article and content element animations to pages.


System requirements
-------------------

* Contao 2.9.x or higher
* jQuery


Installation & Configuration
----------------------------

* Unpack the archive on your server
* Open the installation directory in your web browser
* Update the database
* Set the configurations in the parallax menu entry


Inserttags
----------

This tag will be replaced with a link and anchor to an internal page and article (replace * with the article ID).

```html
{{parallax_article_url::*}}
```


Simple startup guide
--------------------

* Install extension on your contao installation
* Create your default theme and layout
* Enable "jQuery" in the layout (theme_plus_jquery is best practice for this)
* Add page to pagetree
* Add articles to page as many as you like to animate
* Add a few content elements under your articles
* Go to the parallax menu entry
* Add a new element, choose your root page and set "Activate scrollbar"
* Add another element and choose your regular page under "Animation Page"
* Now add the containing articles in this page. Later you can play with the duration but for the first time set the value to 500
* To bring the animation to life set the following CSS parameter in your stylesheet


Parallax f�r Contao - Deutsch
=============================

�ber
----

Die Parallaxe Erweiterung bietet die M�glichkeit, Artikeln und Content Elementen Animationen hinzuf�gen.

Systemvoraussetzungen
---------------------

* Contao 2.9.x oder h�her
* jQuery


Installation & Konfiguration
----------------------------

* Entpacken Sie das Archiv auf Ihrem Server
* �ffnen Sie das Installationsverzeichnis in Ihrem Web-Browser
* Aktualisieren Sie die Datenbank
* Setzen Sie die Konfiguration im Parallaxe Men�eintrag


Inserttags
----------

Dieses Tag wird mit einem Link und Anker zu einer internen Seite und Artikel (ersetzen Sie * mit der Artikel-ID) ersetzt werden.

```html
{{parallax_article_url::*}}
```


Einfache Startup-Anleitung
--------------------------

* Installieren der Erweiterung auf Ihrer Contao-Installation
* Erstellen Sie Ihr Standard-Theme und Layout
* Aktivieren Sie "jQuery" im Layout (die beste m�glichkeit dies zu machen ist theme_plus_jquery)
* F�gen Sie eine Seite zum Seitenbaum hinzu
* F�gen Sie so viele Artikel unter Ihre Seite wie Sie Animieren m�chten
* F�gen Sie ein paar Content-Elemente unter Ihre Artikel
* Gehen Sie in den Parallax Men�eintrag
* F�gen Sie ein neues Element ein, w�hlen Sie Ihren Root-Seite und setzen Sie "Scrollbar aktivieren"
* F�gen Sie ein weiteres Element hinzu und w�hlen Sie Ihre normale Seite unter "Animationsseite" aus
* F�gen Sie nun die beinhaltenden Artikel auf dieser Seite hinzu. Sp�ter k�nnen Sie mit der Dauer spielen, setzten Sie f�r den Anfang den Wert auf 500
* Um die Animation zum Leben zu erwecken setzen Sie die folgenden Parameter in Ihrem CSS Stylesheet


Code examples
--------------------------

**CSS**

```css
@media screen, projection {

  /**
   * Default parallax
   */

  html.parallax {overflow-y:hidden;}

  html.parallax, .parallax body {height:100%;}

  .parallax #wrapper {height:100%;}

  .parallax #container {
    height:100%;
    width:100%;
    position:absolute;
  }

  /* This value is variable and can be set explicit for each article */
  .parallax .mod_article {height:1000px;} 

  /**
   * Scrollbar
   */

  .parallax #scrollBar {
    background-color:lightgrey;
    display:none;
    position:fixed;
    right:0;
    top:0;
    width:16px;
    z-index:1000;
  }

  .parallax .thumb {
    background-color:black;
    height:37px;
    left:0;
    position:absolute;
    top:0;
    width:100%;
  }

}
```

* The animation for the article is now active and you are able to see it in the frontend


**Extend $.ParallaxBuilder**

With this little example, you can access the special callbacks and you can specify new helper functions which are choosable in the backend

**Javascript**

```javascript
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
```

**PHP**

To register your helper functions, write them to the global configuration array

```php
/**
 * Config array
 */
$GLOBALS['Parallax']['jsFunctions'] = array_merge(
        $GLOBALS['Parallax']['jsFunctions'], array(
            'exampleFunction' => 'exampleLabel'
        )
);

/**
 * Styles
 */
if (TL_MODE == 'FE')
{
    $GLOBALS['TL_MOOTOOLS'][] = '<script src="system/modules/parallaxExt/html/js/parallaxExt.js"></script>';
}
```