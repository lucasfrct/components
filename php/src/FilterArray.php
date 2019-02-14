<?php
#FilterArray.php

/* CLASS PARA FILTRAR ARRAY PELO INDICE */

class _FilterArray{
    protected $finality = array();
    protected $charDiv = ":";
    protected $charH = "-";
    protected $charV = ",";
    protected $a;
    protected $f;
    protected $fts;
    
    protected function is_char($string,$char){
        return (strstr($string,$char)) ? TRUE : FALSE;
    }
    
    protected function addCourse($filter){
        $n = array();
        $f = explode("-",$filter);
        foreach($this->a as $i=>$v){
           ($i >= $f[0] && $i <=$f[1]) ? array_push($n,$this->a[$i]) : $i;
        }
        return $n;
    }
    
    protected function addJump($filter){
        $n = array();
        $f = explode(",",$filter);
        $num = (count($f) - 1);
        $j = 0;
        foreach($this->a as $i=>$v){
            if($i == $f[$j]){
                array_push($n,$this->a[$i]);
                if($j < $num){ $j++;}
            }
        }
        return $n; 
    }
    
    protected function mergeArray($array1,$array2){
        return array_merge($array1,$array2);   
    }

    protected function controller(){
        $arr = array();
        $fts = $this->fts;
        $n = count($fts);
        for($i = 0; $i < $n; $i++){
            $ft = $fts[$i];
            if($this->is_char($ft,$this->charH)){
                $arr = $this->mergeArray($arr,$this->addCourse($ft));
            } elseif($this->is_char($ft,$this->charV)){
                $arr = $this->mergeArray($arr,$this->addJump($ft));
            } else{
                $arr = $this->mergeArray($arr,$this->addJump($ft));
            }
        }
        $this->finality = $this->mergeArray($this->finality,$arr);
    }
    
    public function getFilter($array,$filter){
        $this->a = $array;
        $this->f = $filter; 
        
        if($this->is_char($this->f,$this->charDiv)){
            $this->fts = explode($this->charDiv,$this->f);
            $this->controller();
        } else{
            if($this->is_char($this->f,$this->charH)){
                $this->finality = $this->mergeArray($this->finality,$this->addCourse($this->f));
            } elseif($this->is_char($this->f,$this->charV)){
                $this->finality = $this->mergeArray($this->finality,$this->addJump($this->f));
            } else{
                $this->finality = $this->mergeArray($this->finality,$this->addJump($this->f));
            }
        }
        
        $final = $this->finality;
        $this->finality = array();
        return $final;   
    }
}

/*
// EXEMPLO DE UTILIZAÇÃO 
$a = array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20);
$f = "0-2:7";
$c = new _FilterArray();
$newArray = $c->getFilter($a,$f);
//print_r($newArray);
*/


