/*//	ENTIRE = INTEIRO
//	$('div').entire();
$.fn.entire = function ( ) {
    
    var $that = $( this );
    var $defaults = { width: 10, height: 10, orientation: "portrait", }; //landscape
   
   	function __getWidth ( ) {
		return Number ( $ ( window ).width ( ) );
   	};

   	function __getHeight ( ) {
		return Number ( $ ( window ).height ( ) );
   	};

   	function __getOrientation ( ) {
		return String ( ( window.matchMedia("(orientation: portrait)").matches ) ? "portrait" : "landscape" );
	};

	function __setElement ( $width = 10, $height = 10, $orientarion = "landscape" ) {
		$that.css ( { "min-width": $width+"px", "min-height": $height+"px", "height": $height+"px", } );
	};

	function __construct ( ) {
		__setElement ( __getWidth ( ), __getHeight ( ),  __getOrientation ( ) );
	};

	__construct ( );
	$( window ).resize ( function ( ) {
		__construct ( );
	} );
    
    return this;
};
$("#entire").entire ( );*/

/*

//   CHECK IF ID EXISTS | RETURN TRUE OR FALSE
//   $('#foo').hasId(); 
//   $('section').hasId('foo');
//   $('section').hasId('foo', function(){ ... }); // SUPORT CALLBACK
$.fn.hasId = function($id, $callback){
    var $defaults = { status:false, state:false, id:false, self:false, compare:false, callback:false };
    var $that = $(this);
	$defaults.id = ($id) ? $id : false;
	$defaults.callback = ($callback) ? $callback : false;
	var breakEach = function(){ return false; };
    
	// seek = procurar
     var simpleSeek =  function(){ return $defaults.state = ($that.length > 0) ? true : false; }
    
    // seek = procurar
    var complexSeek = function(){
		
		$defaults.gate = ($('#'+$id).length > 0) ? true : false;
		if($defaults.gate){
			$that.each(function(){
				var $thatIs = $(this);
				$defaults.self = ($thatIs.attr('id')) ? $thatIs.attr('id') : false;
				$defaults.state = ($defaults.id == $defaults.self) ? true : false;
				if($defaults.state){ ($callback) ? $callback() : ''; return breakEach(); };
			});
		};
		
        return $defaults.state;
    };
	
	$defaults.status = (!$id) ? simpleSeek() : complexSeek();
	return $defaults.status;
};

//   /CHECK IF ATRIBUTTE EXISTS | RETURN TRUE OR FALSE
//	$([attr]).hasAttr();
//  $(element).hasAttr(attr);
//  $(element).hasAttr(attr,value);
//  $(element).hasAttr(attr,value, function(){ ... }); // SUPORT CALLBACK
$.fn.hasAttrib = function($attr, $val, $callback){
    var $defaults = { status:false, state:false, attr:false, val:false, self:false, compare:false, callback:false };
    var $that = $(this);
	$defaults.attr = ($attr) ? $attr : false;
	$defaults.val = ($val) ? $val : false;
	$defaults.callback = ($callback) ? $callback : false;
	var breakEach = function(){ return false; };
    
	// seek = procurar
	var basicSeek = function(){
		return ($that.length > 0) ? true : false;
	};
	
	// seek = procurar
    var simpleSeek =  function(){
		return $defaults.gate = ($('['+$defaults.attr+']').length > 0) ? true : false;
	};
    
    // seek = procurar
    var complexSeek = function(){
		
		$defaults.gate = simpleSeek();
		if($defaults.gate){
			$that.each(function(){
				var $thatIs = $(this);
				$defaults.self = ($thatIs.attr($defaults.attr)) ? $thatIs.attr($defaults.attr) : false;
				$defaults.state = ($defaults.val == $defaults.self) ? true : false;
				if($defaults.state){ ($callback) ? $callback() : ''; return breakEach(); };
			});
		};
		
        return $defaults.state;
    };
	
	$defaults.status = (!$attr) ? basicSeek() : ($attr && !$val) ? simpleSeek() : complexSeek();
	return $defaults.status;
};

//	BOX OF MSG TO ELEMENT OF THE DOM
//  $('#notice').notice({ type:'success', text:'text1', float:'top', timeout:800, });
//	type : info | success | warning | danger
//	float : top | bottom | inset | inside
//	dependency $('element').hasAttrib(attr,value);
$.fn.notice = function($option){
    var $defaults = { notice:false, id:'notice', type:'info', text:false, float:false, timeout:false, };
    var $that = $(this);

    var addPosition = function($position, $block){
    	switch($position){
    		case 'top'   : $that.before($block);  break;
    		case 'bottom': $that.after($block);   break;
    		case 'inset' : $that.prepend($block); break;
    		case 'inside': $that.append($block);  break;
    		default      : $that.before($block);
    	};
    };
    
    var create = function(){	
		var $style = ' style="position:relative;display:none !important;cursor:help;margin:2px !important;"';
		var $block = '<div data-notice="'+$option.id+'" class="alert alert-'+$option.type+'"'+$style+'>'+$option.text+'</div>';
		addPosition($option.float, $block);
		$option.notice = $('[data-notice="'+$option.id+'"]');
		$option.notice.show(300);
		return $option.id;
    };

    var update = function(){
    	$option.notice.html($option.text);
    	$option.notice.attr('class','');
    	$option.notice.addClass('alert');
    	$option.notice.addClass('alert-'+$option.type);
    };

    var remove = function(){
		var $hide = 300;
		setTimeout(function(){ $option.notice.hide($hide); }, $option.timeout);
		setTimeout(function(){ $option.notice.remove(); }, (Number($option.timeout) + ($hide + 50)));
    };
    
    var $option = $.extend($defaults, $option);
	var $comp = ($that.attr('id')) ? $that.attr('id') : String(Math.floor(Math.random() * 100 + 1));
    
    $option.id = $option.id+'-'+$comp;
    $option.notice = $('[data-notice="'+$option.id+'"]');
    
    if($option.text){ (!$('div').hasAttrib('data-notice',$option.id)) ? create() : update(); };
    if($option.timeout > 0 || !$option.text){ remove(); };

    return this;
};

//	BOX OF MSG TO INPUT AND SELECT AND TEXTAREA
//	$(element).msg({ type:'', text:'', float:'', });
//	type : info | success | warning | danger
//	float : top | bottom 
// 	dependency : jquery , $(element).hasAttrib(attr,value);
$.fn.msg = function($option){
    var $defaults = { msg:false, id:'msg', type:false, text:false, float:false, };
    var $that = $(this);
    
    var $width    = Number($that.css('width').replace('px',''));
    var $top      = Number($that.css('top').replace('px',''));
    var $left     = Number($that.css('left').replace('px',''));
    var $mLeft    = Number($that.css('margin-left').replace('px',''));
    var $mBottom  = Number($that.css('margin-bottom').replace('px',''));

    var $d = 20;
    var $margin = 2;
    var $marginT = ($margin - $mBottom);
    var $marginB = -($d + (2 * $margin) - 3);

    var addPosition = function($position, $block){
    	switch($position){
			case 'top'   : $that.before($block); break;
			case 'bottom': $that.after($block);  break;
			default      : $that.before($block);
		};
    };
    
    var create = function(){
		var $position = 'position:relative;left:'+$left+'px;top:'+$top+'px;margin:'+$marginT+'px 0px '+$marginB+'px '+$mLeft+'px;float:left;';
		var $style = 'padding:1px 10px;display:none;overflow:hidden;z-index:1001;width:'+$width+'px;height:'+$d+'px;font-size:9pt;cursor:help;'+$position;
		var $block = '<span data-msg="'+$option.id+'" class="alert alert-'+$option.type+'" style="'+$style+'" >'+$option.text+'</span>';
		addPosition('bottom',$block);
		$option.msg = $('[data-msg="'+$option.id+'"]');
		$option.msg.show(300);
    };

    var update = function(){
    	$option.msg.html($option.text);
    	$option.msg.attr('class','');
    	$option.msg.addClass('alert');
    	$option.msg.addClass('alert-'+$option.type);
    };

    var remove = function(){
    	$option.msg.hide(300);
    	setTimeout(function(){ $option.msg.remove(); },500);
    };
    
    var $option = $.extend($defaults, $option);
    $option.id = $option.id+'-'+$that.attr('name');

    $option.msg = $('[data-msg="'+$option.id+'"]');
    if($('span').hasAttrib('data-msg',$option.id) && $option.text){ update(); };
    if(!$('span').hasAttrib('data-msg',$option.id) && $option.text){ create(); };
    if($('span').hasAttrib('data-msg',$option.id) && !$option.type && !$option.text){ remove(); };

    return this;
};



//	ADD ICON IN INPUT
//	$(elemet).icon({ type:'', float:'', });
// 	dependency : jquery, $(element).hasAttrib(attr,value);
$.fn.icon = function($option){
    var $defaults = { icon:false, id:'icon', type:false, float:'right', input:false, };
	var $that = $(this);
	var $option = $.extend($defaults, $option);

	var $width   = Number($that.css('width').replace('px',''));
	var $height  = Number($that.css('height').replace('px',''));
    var $top     = Number($that.css('top').replace('px',''));
    var $right   = Number($that.css('right').replace('px',''));
    var $left    = (Number($that.css('left').replace('px','')) && $that.css('position') == 'relative') ? Number($that.css('left').replace('px','')) : 0;
    var $bottom  = (Number($that.css('bottom').replace('px','')) && $that.css('position') == 'relative') ? Number($that.css('bottom').replace('px','')) : 0;
    var $mTop    = Number($that.css('margin-top').replace('px',''));
    var $mLeft   = Number($that.css('margin-left').replace('px',''));
    var $mBottom = Number($that.css('margin-bottom').replace('px',''));

    var $d = 16;
	var $margin = 10;
	var $left = ("right" == $option.float) ? (($width - $d) - $margin + $left) : (0 + $margin + $left); 
	var $marginT = (-$d - ($height / 2) + ($d / 2) - 1 - $mBottom);
	var $marginB = (-$d + 2) - $marginT;

	var rulesConfig = function($type){
		switch($type){
        	case 'info'   : return { color:'#31708f', border:'49,112,143,0.8', shadow:'49,112,143,0.6'  }; break;
        	case 'warning': return { color:'#f0ad4e', border:'240,173,78,0.8', shadow:'240,173,78,0.6'  }; break;
        	case 'success': return { color:'#3c763d', border:'60,118,61,0.8',  shadow:'60,118,61,0.6'   }; break;  
        	case 'danger' : return { color:'#a94442', border:'169,68,66,0.8',  shadow:'169,68,66,0.6'   }; break;
        	case 'pattern': return { color:'#555',    border:'200,200,200,1',  shadow:'102,175,233,0.6' }; break;
        	default       : return { color:'#555',    border:'200,200,200,1',  shadow:'102,175,233,0.6' };
        };
    };

	var rulesType = function($type){
		switch($type){
			case 'info'    : return 'glyphicon-asterisk'; break;
			case 'success' : return 'glyphicon-ok';       break;
			case 'danger'  : return 'glyphicon-remove';   break;
			case 'warning' : return 'glyphicon-alert';    break;
			case 'pattern' : return '';                   break;
			default        : return '';
		};
	};

	var create = function(){
		var pos = 'position:relative;top:'+$top+'px;left:'+$left+'px;right:'+$right+'px;bottom:'+$bottom+'px;margin:'+$marginT+'px 0px '+$marginB+'px '+$mLeft+'px;float:left;';
		var $style = 'display:none;height:'+$d+'px;width:'+$d+'px;z-index:1000 !important;overflow:hidden;color:'+$option.input.color+';cursor:pointer;'+pos;
		var $block = '<span data-icon="'+$option.id+'" class="glyphicon '+rulesType($option.type)+'" style="'+$style+'""></span>';
		
		$that.after($block);

		$option.icon = $('[data-icon="'+$option.id+'"]');
		$option.icon.show(300);
	};

	var update = function(){
		$option.icon.attr('class','');
		$option.icon.addClass('glyphicon');
		$option.icon.addClass(rulesType($option.type));

		$option.input = rulesConfig($option.type);
		$option.icon.css({ 'color':$option.input.color, 'border-color':$option.input.border});
		$option.icon.animate({ 'left':$left },600);
	};

	var remove = function(){
		$option.icon.hide(300);
		setTimeout(function(){ $option.icon.remove(); },500);
	};

	var setInput = function(){

		var $box = 'inset 0 2px 2px rgba(0,0,0,.075),0 0px 4px rgba('+$option.input.shadow+')';
		var $pLeft = ('left' == $option.float) ? 30 : 5 ;
		var $pRight = ('right' == $option.float) ? 30 : 5 ;
		if('pattern' == $option.type || !$option.type){ $pLeft = 5; $pRight = 5; };

		var onBox = function(){
			$that.css({ 'box-shadow':$box, '-webkit-box-shadow':$box, '-moz-box-shadow':$box, '-o-box-shadow':$box, });
		};

		var offBox = function(){
			$that.css({ 'box-shadow':'none', '-webkit-box-shadow':'none', '-moz-box-shadow':'none', '-o-box-shadow':'none', });
		};

		$that.css({
			'color':$option.input.color,
			'border-color':'rgba('+$option.input.border+')',
			'padding-left': $pLeft+'px',
			'padding-right': $pRight+'px',
		}).focus(function(){ 
			onBox(); 
		}).blur(function(){ 
			offBox(); 
		});

		if('pattern' == $option.type || !$option.type){  
			
			$that.focus(function(){ 
				$that.css('border-color','#0AF');
			}).blur(function(){
				$that.css('border-color','rgba('+$option.input.border+')');
			});

			if($that.is(':focus')){ $that.css('border-color','#08f'); };

		};

		($that.is(':focus')) ? onBox() : offBox();
	};

	var checkInput = function(){
		return ($that.hasAttrib('type','checkbox')) ? true : false;
	};

	var setCheckbox = function(){
		$that.removeClass('form-control');
		$that.addClass('checkbox');
		
		$that.css({
			'position':'relative',
			'opacity':'1',
			'display':'inline-block',
			'top':'2.5px',
			'margin-right':'10px',
		});

		$option.icon.css({
			'left': '1px',
			'top':'5px',
			'z-index':'-1',
		});
	};

	var dynamicCheckbox = function(){

		$option.type = ($that.is(':checked')) ? 'success' : 'danger';
		update();

		var inverseStateCheck = function(){
			var $checked = $that.is(':checked');
			$option.type = ($checked) ? 'success' : 'danger';
			$that.attr('checked',$checked);
			update();
		};

		$that.on('change',function(){ inverseStateCheck(); });
	};

	$option.id = $option.id+'-'+$that.attr('name');
	$option.icon = $('[data-icon="'+$option.id+'"]');

	$option.release = $option.type;

	$option.input = rulesConfig($option.type);
	
	 (!$('span').hasAttrib('data-icon',$option.id)) ? create() : update();

	if(!checkInput()){
		setInput();
	} else{
		setCheckbox();
		dynamicCheckbox();
	};

	if('pattern' == $option.type || !$option.type){ remove(); };
    
    return this;
};


//  VERUFY INPUT
// 	$(element).verify( type:'', maxChar:'', minChar:'', maxNum:'', minNum:'', text:'', );
// 	type = text | onlyText | number | onlynumber | email | zipcode | cpf | tel |
//  dependency : jquery, $(element).icon(), $(element).msg(), 
$.fn.verify = function($option){
    var $defaults = {
        type:false, 
        text:false,
        number:false,
        email:false,
        zipcode:false,
        cpf:false,
        tel:false,
        minChar:3,
        maxChar:50,
        minNum:1,
        maxNum:11,
        street:'input[name="street"]', 
        district:'input[name="district"]', 
        city:'input[name="city"]', 
        state:'input[name="state"]'
    };

    var $that = $(this);
    var $option = $.extend($defaults, $option);

    var valid = function($state){
    	if($state === false){
    		$that.msg({ type:'danger', text:$option.text });
    		$that.icon({ type:'danger', float:'right'});
    	};

    	if($state === true){
    		$that.msg();
    		$that.icon({ type:'success', float:'right' });
    	};

    	if($state === 'pattern'){
    		$that.msg();
    		$that.icon();
    	};
    };

    var limitChar = function($limit){
    	
    	var keysLimit = function($key){
    		switch($key){
    			case 8 : return false; break;
    			case 13 : return false; break;
    			case 35 : return false; break;
    			case 36 : return false; break;
    			case 37 : return false; break;
    			case 38 : return false; break;
    			case 39 : return false; break;
    			case 40 : return false; break;
    			case 46 : return false; break;
    			default: return true;
    		};
    	};

    	$that.on('keydown', function($event){
    		var $key = $event.width || $event.keyCode; //imprime($key);
    		var $n = $that.val().length;
    		if(keysLimit($key) && $n >= $limit){ return false; };
    	});
    };
    
    var typeText = function(){
    	var $n = $that.val().length;
    	var $gate = ($n == 0) ? 'pattern' : ($n >= $option.minChar && $n <= $option.maxChar) ? true : false;
    	valid($gate);
    	limitChar($option.maxChar);
    };

    var typeEmail = function(){
    	var $value = $that.val();
    	var $n = $value.length;
    	var $gate = ($n == 0) ? 'pattern' : (hasLetter('@',$value) && hasLetter('.com',$value) &&  $n >= 9) ? true : false;
    	valid($gate);
    };

    var typeTel = function(){
    	var $n = $that.val().length;
    	var $gate = ($n == 0) ? 'pattern' : ($n > 12) ? true : false;
    	valid($gate);
    	$that.num();
    	limitChar($option.maxNum);	
    };

    var typeCpf = function(){
    	$that.num();
    	var $value = $that.val();
    	var $n = $value.length;
    	var $gate = ($n == 0) ? 'pattern' : ($n >= 10) ? cpfEvaluate($value) : false;
    	valid($gate);
    };
    
    var selective = function($type){
        switch($type){
            case 'text'   : return typeText();    break;
            case 'email'  : return typeEmail();   break;
            case 'tel'    : return typeTel();     break;
            case 'cpf'    : return typeCpf();     break;
            case 'zipcode': return typeZipcode(); break;
            default       : return typeText();
        };
    };
    

    selective($option.type);
    $that.on('keyup', function($event){	
    	return selective($option.type);
    });
    
    return this;
};

//   INCLUDE TEXT IN ELEMENT THE OF DOM
//   $('#article').include('texts/article.php');
//   $('.article').include('texts/article.php', function(data){ ... }); // SUPORT CALLBACK
$.fn.include = function($url, $callback){
    var $that = $(this);

    consult({
    	url:$url, 
    	receive:function($data){
    		var $dataFinal = false;
    		var $alter = false;

    		if($.isFunction($callback)){ $alter = $callback($data); ($alter) ? $dataFinal = $alter : $dataFinal = $data; };
    		$that.append($dataFinal);
    	},
    });

	return this;
};

/*
*    AUTO UP DATE OF FILES OR ARQUIVES
*    add FILES direct in tag wicth atribute : data-include="file.php" 
*    add TIME direct in tag wicth atriburte : data-time="100"
*    dependency of fn.hasAttr(); and fn.include();
*    < body gss-app> ... </body>
*/
/*var autoInclude = function(option){
	var defaults = { 
        status:false, 
        state:false, 
        zone:'html *', 
        include:'gss-include', 
        time:'gss-time', 
        url:false, 
        update:false,
        callback:false
    };
    var option = $.extend(defaults, option);
    
    var check = function(){
        return option.state = $(option.zone).hasAttr(option.include);
    };
    
    var checkUnit = function(that){
        return option.state = (that.hasAttr(option.include)) ? true : false;
    };
    
    var include = function(){
        
        if(check()){
            $(option.zone).each(function(){
                var that = $(this);
                if(checkUnit(that)){
                    var url = (that.attr(option.include).length > 1) ? that.attr(option.include) : false;
                    var update = (that.hasAttr(option.time)) ? Number(that.attr(option.time)) : false; 
                    that.include(url, option.callback(option.state));
                    if(update){
                        var get = setInterval(function(){ that.include(url); }, update);
                        if(!url){ clearInterval(get); };
                    };
                    option.state = true;
                };
            });
        };
        return option.status = option.state;
    };
    
    var _construct = function(){
        return include();
    };
	
    _construct();
	return this;
}
//autoInclude()

*/