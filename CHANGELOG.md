Changelog
=========

1.2.0
-----

* Full Contao 3.1 support
* Remove dependencies for external jquery extensions for Contao 3
* Bugfix for broken scrollbar if last article has a dynamic height
* Bugfix wrong calculated height for dynamic article with padding and box-sizing border-box
* Add user restriction in the relation between parallax and contao elements
* Remove info text and add wizard for editing related contao elements from parallax elements
* Add full fixed header support with new calculations, jump markers and more
* Split the configuration javascript into different modules for better performance, more flexibility and as preparation of the lite and pro version
* Remove Navigation, horizontal slides and resolution support for lite version
* Add repository for pro modules with full parallax support like "parallaxHorizontal", "parallaxImagePicker", "parallaxNavigation" and "parallaxResolution"
* Contao minifyHtml support for javascript configuration array
* Bugfix to remove id from copied parallax content elements
* Many little bugfixes and dca optimizations

1.1.0
-----

* Adjustment for Contao 3.0
* Remove choosable template for navigation
* Bugfix for wrong height calculated - dynamic article with padding and box-sizing border-box

1.0.1
-----

* Optimizations for keyboard controls
* Add parallax stylesheet with all necessary frontend styles
* Add possibility to enable or disable loading gif
* Remove parallax class from body tag
* Removing scrollbar if parallax is abort
* Bugfixing keydown events in lower then IE8