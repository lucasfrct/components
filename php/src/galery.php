<?php
class Galery
{
    public function addImages($path)
    {
        $dir = dir($path);
        while($file = $dir->read()){
            if($file!="." && $file != ".."){
                if($file!=="." && $file !== ".."){
                    $extension = strrchr($file,'.');
                    if($extension == ".JPG" || $extension == ".jpg" || $extension == "JPEG" || $extension == "jpeg" || $extension == "PNG" || $extension == "png" || $extension == "GIF" || $extension == "gif" || $extension == "BMP" || $extension == "bmp" || $extension == "TIFF" || $extension == "tiff" || $extension == "RAW" || $extension == "raw" || $extension == "SVG" || $extension == "svg" || $extension == "DIB" || $extension == "dib"){
                        print '<li><img src="'.$path.$file.'"/></li>';					
                    }			
                }
            }
        }$dir-> close();  
    }
}