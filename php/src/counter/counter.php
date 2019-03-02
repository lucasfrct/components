<?php

function storeVisitor()
{
    $storage = 0;
    include_once('storage.php');
    $file_storage = "storage.php";

    if (isset($_COOKIE['counte'])){
        $count = $_COOKIE['counte'] + 1;
    }
    else{
        $count = 1;
        $storage++;
    }
   
    setcookie('counte', "$count", time()+3700);
    
     $OS = PHP_OS ;
    $NAVEGADOR = $_SERVER['HTTP_USER_AGENT'];
    if(preg_match('|MSIE ([0-9].[0-9]{1,2})|',$NAVEGADOR,$matched)){
        $browser_version=$matched[1]; 
        $browser = 'IE';
    } 
    elseif(preg_match( '|Opera/([0-9].[0-9]{1,2})|',$NAVEGADOR,$matched)){
        $browser_version=$matched[1]; 
        $browser = 'Opera';
    } 
    elseif(preg_match('|Firefox/([0-9\.]+)|',$NAVEGADOR,$matched)){
        $browser_version=$matched[1]; 
        $browser = 'Firefox';
    }
    elseif(preg_match('|Chrome/([0-9\.]+)|',$NAVEGADOR,$matched)){
        $browser_version=$matched[1]; 
        $browser = 'Chrome';
    } 
    elseif(preg_match('|Safari/([0-9\.]+)|',$NAVEGADOR,$matched)){
        $browser_version=$matched[1]; 
        $browser = 'Safari';
    } 
    else{
        $browser_version = 0;
        $browser= 'não reconhecido';
    }
    
    $browser = " || OS- ".$OS." - nav- ".$browser." - ver- ".$browser_version."<br>";
    
    if(isset($acess)){
        $acess .= $browser;
    }
    else{
        $acess = $browser;
    }
        
    $open_file =@fopen("".$file_storage."","w");
    $store_file ='
    <?php 
    $storage ='.$storage.' 
    ?>';
    $write_file =fwrite($open_file, $store_file);
    if($write_file==true){
        print "gravado com sucesso";
    }
    else{
        print "erro de gravação";
    }

    $counter = $storage;
    return array($counter,$count);
}
list($counter,$count)=storeVisitor(); 



?>