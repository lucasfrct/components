// JavaScript FORM GSS

var mask = function(){
    /*$("input[name='ra']").mask("9-999");
    $("input[name='rg']").mask("99.999.999-9");
    $("input[name='cpf']").mask("999.999.999-99");
    $("input[name='cnpj']").mask("99.999.999/9999-99");
    $("input[name='percent']").mask('99,9?9%');
    $("input[name='zipcode']").mask("99.999-999");
    $("input[name='number']").num();
    $('input[type="tel"], input[name="cel"]').mask('+55 (99) 9999-9999?9').
    on('keypress',function(){
        var that = $(this); 
        var n = that.val().replace(/\D/g, '').length;
        if(n == 13){ that.mask('+55 (99) 99999-9999'); } 
        if(n == 12){ that.mask('+55 (99) 9999-9999?9'); }
    });
    $("input[name='birthDate']").mask("99/99/9999");*/
}

var validation = function(){
    /*$('input[name="enable"]').verify({ type:'checkbox'});
    $('input[name="status"]').verify({ type:'checkbox'});
    $("input[name='ra']").verify({ type:'number', msg:'Insira o Registro do Aluno:', minNum:4 });
    $("input[name='name']").verify({ type:'text', msg:'Insira seu nome:', minChar:7 });
    $("input[name='cpf']").verify({ type:'cpf', msg:'CPF inválido:' });
    $("input[name='rg']").verify({ type:'number', msg:'Insira seu R.G.:', minNum:9 });
    $("input[name='email']").verify({ type:'email', msg:'Insira seu E-mail:' });
    $("input[name='zipcode']").verify({ type:'zipcode', msg:'Insira o CEP:' });
    $("input[name='facebook']").verify({ type:'text', msg:'Insira seu facebook:', minChar:12 });
    $("input[name='cel']").verify({ type:'tel', msg:'Insira seu Celular:', maxTel:13 });
    $("input[name='tel']").verify({ type:'tel', msg:'Insira seu Celular:', maxTel:12 });*/
}; 

//  EVALUATE CPF 
//  var evaluate = cpfEvaluate(XXXXXXXXXXX);

    function __cpfUnvalidate ( $number ) {
        return ($number == 0 ) ? "00000000000" : String ( Number ( $number ) * 11111111111 );
    };

    function __cpfBlock ( $cpf ) {
        switch ( $cpf ) {
            case unvalidateCPF ( 0 ): 
                return true; 
                break;
            case unvalidateCPF ( 1 ): 
                return true;
                break;
            case unvalidateCPF ( 2 ): 
                return true; 
                break;
            case unvalidateCPF ( 3 ): 
                return true; 
                break;
            case unvalidateCPF ( 4 ): 
                return true; 
                break;
            case unvalidateCPF ( 5 ): 
                return true; 
                break;
            case unvalidateCPF ( 6 ): 
                return true; 
                break;
            case unvalidateCPF ( 7 ): 
                return true; 
                break;
            case unvalidateCPF ( 8 ): 
                return true; 
                break;
            case unvalidateCPF ( 9 ): 
                return true; 
                break;
            default: 
                return false;
        };
    };

    function __cpfValidate ( $cpf ) {
        var $defaults = { data: null, model: null, check: null, dimension : null, state: null, };
        $defaults.data = $cpf;
        $defaults.model = $defaults.data.substr ( 0, 9 );
        $defaults.check = $defaults.data.substr ( 9, 2 );
        $defaults.dimension = 0;
        $defaults.state = true;

        modelDimension ( 10 );
        
        if ( $defaults.state == true && $defaults.dimension == 0 ) { 
            $defaults.state = false;
        };

        $defaults.dimension = checkDimension ( $defaults.dimension );
        checkState ( 0 );
        $defaults.dimension *= 2; 
        modelDimension ( 11 );
        $defaults.dimension = checkDimension ( $defaults.dimension );
        checkState ( 1 );

        function modelDimension ( $matrix ) {
            for ( var $i = 0; $i < 9; $i++ ){ 
                $defaults.dimension += ( $defaults.model.charAt ( $i ) * ( $matrix - $i ) ); 
            };
            return $defaults.dimension;
        };

        function checkDimension ( $dimentsion ) {
            $dimentsion = ( 11 - ( $dimentsion % 11 ) ); 
            if ( $dimentsion > 9 ) { 
                $dimentsion = 0; 
            };
            return $dimentsion;
        };

        function checkState ( $position ) {
            if ( $defaults.state == true && $defaults.check.charAt ( $position ) != $defaults.dimension ){
                $defaults.state = false;
            };
            return $defaults.state;
        };
        
        return $defaults.state;
    };

    function __cpfEvaluate ( $cpf ) {
        return ( $cpf.length == 11 && !__cpfUnvalidate ( $cpf ) ) ? __cpfValidate ( $cpf ) : false;
    };

/*
//  LIMIT ONLY NUMBER TO INPUT
//  $(element).num();
$.fn.num = function(){
    var $that = $(this);
    var char = function($event){ return String.fromCharCode($event.keyCode || $event.which); };
    $that.on('keydown', function($event){ if(!numbers(char($event))){ return false; }; });
    $that.on('keyup',   function($event){ $that.val(numbers($that.val())); });
    $that.on('blur',    function($event){ $that.val(numbers($that.val())); });
    $that.on('change',  function($event){ $that.val(numbers($that.val())); });
    return this;
};

// $('#bar').progress(10);
$.fn.progress = function(val){
    var that = $(this);
    var id = (that.attr('id').length > 0) ? that.attr('id') : alert('Defina uma id para progress');
    var self = $('#'+id);
    
    var clear = function(){
        self.removeClass('progress-bar-success')
        .removeClass('progress-bar-danger')
        .removeClass('progress-bar-info')
        .removeClass('progress-bar-warning');
    };
    
    var selective = function(value){
        if(value >= 0 && value <= 49){ return 'progress-bar-danger' };
        if(value >= 50 && value <= 99){ return 'progress-bar-warning' };
        if(value >= 100 && value <= 100){ return 'progress-bar-success' };
    };
    
    var update = function(){
        setTimeout(function(){
            clear();
            self.attr('data-transitiongoal', val)
            .addClass(selective(val))
            .progressbar({display_text: 'center'});
        }, 300);
    };
    
    var _construct = function(){
        clear();
        update()
        
    };
    
    _construct();
};