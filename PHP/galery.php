<?php
class Galery
{
    public function addImages($path)
    {
        $images = Array();
        $dir = dir($path);
        while($file = $dir->read()){
            if($file!="." && $file != ".."){
                if($file!=="." && $file !== ".."){
                    $extension = strtolower(strrchr($file,'.'));
                    if(
                        $extension == ".jpg" 
                        || $extension == "jpeg" 
                        || $extension == "png" 
                        || $extension == "gif" 
                        || $extension == "bmp" 
                        || $extension == "tiff" 
                        || $extension == "raw" 
                        || $extension == "svg" 
                        || $extension == "dib"
                    ) {
                        array_push($images, $path.$file);					
                    }			
                }
            }
        }
        $dir-> close();
        return $images;
    }
}