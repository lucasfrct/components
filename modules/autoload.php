<?php
/**
 * @param string $class The fully-qualified class name.
 * @return void
 */
spl_autoload_register ( function ( $class ) {

    echo '<div style="border:solid 1px #F00; padding: 0 16px; display:block;">';
    echo "<h4> Class: ".$class."</h4>";

    # project-specific namespace prefix
    $prefix = '';

    # base directory for the namespace prefix
    $directory = __DIR__ . DIRECTORY_SEPARATOR;

    # does the class use the namespace prefix?
    $len = strlen ( $prefix );
    if ( strncmp ( $prefix, $class, $len ) !== 0 ) {
        // no, move to the next registered autoloader
        return;
    };

    # get the relative class name
    $class = substr ( $class, $len );
    
    # cria o arquivo .php
    $file = str_replace ( '\\', DIRECTORY_SEPARATOR, $directory.$class );
    $file = str_replace ( '/', DIRECTORY_SEPARATOR, $file );
    $file .= ".php";

    echo "<h5> File: ".$file."</h5>";
    echo "</div>";

    # if the file exists, require it
    if ( file_exists ( $file ) ) {
        require $file;
    };
});