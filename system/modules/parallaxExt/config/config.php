<?php

/**
 * Powered by parallax - The ultimative parallax script for Contao
 *
 * Copyright ©2012-2013 by MEN AT WORK <info@men-at-work.de>
 * Visit the agency website at http://www.men-at-work.de for more information
 *
 * PHP version 5
 * @package    parallax
 * @copyright  MEN AT WORK
 * @link       http://www.contao-parallax.com
 * @license    EULA
 * @filesource
 */

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
    if (version_compare(VERSION, 3, '>='))
    {
        $GLOBALS['TL_JQUERY'][] = '<script src="system/modules/parallaxExt/html/js/parallaxExt.js"></script>';
    }
    else
    {
        $GLOBALS['TL_MOOTOOLS'][] = '<script src="system/modules/parallaxExt/html/js/parallaxExt.js"></script>';
    }
}