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

var typeQuery = function(method){
    switch(method){
        case 'create' : return 'C-get'; break;
        case 'read'   : return 'R-get'; break;
        case 'update' : return 'U-get'; break;
        case 'delete' : return 'D-get'; break;
        default       : return 'R-get';
    }
};


/*
*   USAGE FUNCTION FORM
*   $("#display").form({ 
*       id : "form1", 
*       method : 'create', 
*       table : 'students', 
*       columns : '0-4:9,12', 
*       url : "buider.php", 
*       head : "Cadastro" 
*   });
*
*/

/*
*   DATA SEND TO SERVER TO CREATED FORM
*   sendData = {
*       typeQuery:'C-get', 
*       tb:'students',
*       columns:'0-4:9,12', 
*       id:'1', 
*   };
*/

/*
*   DATA OF RETURN OF SERVER TO CREATED FORM
*   data = {
*       "head":"students",
*       "fields":[
*           {"view":"Nome:","name":"name"},
*           {"view":"Sexo/Gênero:",
*               "name":"gender",
*               "option":[
*                   {"title":"Feminino","value":0},
*                   {"title":"Masculino","value":1}
*               ],
*           },
*           {"view":"Est. Civil:","name":"marital"},
*       ]
*   };
*/

/*
*   DATA SEND TO SERVER OF FORM SUBMIT
*   sendData = {
*       typeQuery:'C-set', 
*       tb:'students', 
*       send:[{name:'cpf', value:'0872587647'},{name:'rg', value:'542284734'}], 
*       id:'1', 
*   };
*/


$.fn.form = function(option){
    var defaults = {
        status:false,
        state:false,
        id:'form-auto-builder', 
        class:'form', 
        method:false, 
        table:false, 
        columns:false,
        titles: new Array(), 
        idQuery:false, 
        url:false, 
        enctype:'text', // text | plain | file
        head:'',
        btn:'Submit', 
        data:false 
    };
    var option = $.extend(defaults, option);
    var that = $(this);
    option.id = (that.attr('id')) ? that.attr('id')+'-'+option.id : alert('Defina o atributo id');
    
    var model = {
        status:true,
        state:false, 
        id:false, 
        name:false, 
        title:false, 
        forId:false, 
        class:'form-control', 
        type:false, 
        value:false,
        place:false,
        required:true, 
        param:false,
        style:'style="display:block;"'
    };

    var rulesEnctype = function(enctype){
        switch(enctype){
            case "plain" : return "text/plain"; break;
            case "text"  : return "application/x-www-form-urlencoded"; break;
            case "file"  : return "multipart/form-data"; break;
            default      : return "application/x-www-form-urlencoded";   
        };
    };
    
    var rulesType = function(name){
        switch(name){
            case "id"        : return "hidden"; break;
            case "created"   : return "hidden"; break;
            case "date"      : return "date"; break;
            case "birthDate" : return "date"; break;
            case "time"      : return "time"; break;
            case "email"     : return "email"; break;
            case "password"  : return "password"; break;
            case "ra"        : return "text"; break;
            case "tel"       : return "tel"; break;
            case "zipcode"   : return "text"; break;
            case "file"      : option.enctype = "file"; return "file"; break;
            default          : return "text";
        };
    };
    
    var rulesQuery = function(method){
        switch(method){
            case 'create' : return 'C-get'; break;
            case 'update' : return 'U-get'; break;
            case 'delete' : return 'D-get'; break;
            default       : return 'C-get';
        };
    };
    
    /* tab(['Registro','Detalhes','Educação''Contatos'])*/
    var tab = function(list){ 
        var li = '';
        
        for(i = 0; i < list.length; i++){
            var cl = (i == 0) ? 'class="active"' : '';
            li += '<li role="presentation" '+cl+' ><a href="#'+list[i].replace(/\W/g,"")+'" aria-controls="'+list[i].replace(/\W/g,"")+'" role="tab" data-toggle="tab">'+list[i]+'</a></li>';
        };
        var bar = '<ul id="#nav-progress" class="nav nav-tabs" role="tablist">'+li+'</ul>';
        return bar;
    };
    
    var progress = function(){
        return '<div class="progress" style="height:3px"><div id="'+option.id+'-progress" class="progress-bar" role="progressbar"></div></div>';
    };
    
    var lengend = function(){
        (!option.head) ? option.head = option.data.head : '';
        option.state = (option.head.length > 1) ? true : false;
        var tabble = (option.titles.length > 0) ? tab(option.titles)+progress() : '';
        return (option.state) ? '<legend><h1>'+option.head+'</h1>'+tabble+'</legend>' : '';
    };
    
    var label = function(){
        model.style = (model.name == 'number') ? 'style="display:block; margin:-85px 0px 5px 85%;"' : 'style="display:block;"';
        option.state = (model.title.length > 1) ? true : false;
        return (option.state) ? '<label for="'+model.id+'" class="control-label" '+model.style+'>'+model.title+'</label>' : '';
    }
    
    var input = function(){
        var id       = (model.id && model.id.length > 1)       ? ' id="'+model.id+'"'       : '';
        var name     = (model.name && model.name.length > 1)   ? ' name="'+model.name+'"'   : '';
        var title    = (model.title && model.title.length > 1) ? ' title="'+model.title+'"' : '';
        var classes  = (model.class && model.class.length > 1) ? ' class="'+model.class+'"' : '';
        var type     = (model.type && model.type.length > 1)   ? ' type="'+model.type+'"'   : '';
        var value    = (model.value && model.value.length >1)  ? ' value="'+model.value+'"' : '';
        var place    = (model.place && model.place.length > 1) ? ' value="'+model.title+'"' : '';
        var required = (model.required)                        ? ' required'                : '';
        var style = '';
        
        if(model.name == 'street'){ style = ' style="width:80%; margin:0px 20% 25px 0px;" '}
        if(model.name == 'number'){ style = ' style="width:15%; margin:0px 0px 45px 85%;" '}
        
        option.state = (id && name && type) ? true : false;
        return (option.state) ? '<input'+id+name+title+classes+type+value+place+required+style+'/>' : '';
    };
    
    var selectIn = function(){
        var id       = (model.id && model.id.length > 1)       ? ' id="'+model.id+'"'       : '';
        var name     = (model.name && model.name.length > 1)   ? ' name="'+model.name+'"'   : '';
        var title    = (model.title && model.title.length > 1) ? ' title="'+model.title+'"' : '';
        var classes  = (model.class && model.class.length > 1) ? ' class="'+model.class+'"' : '';
        var required = (model.required)                        ? ' required'                : '';
        var obj      = model.param;
        var row = '';
        if(obj){ for(var i = 0; i < obj.length; i++){row += '<option value="'+obj[i].value+'">'+obj[i].title+'</option>'}; }
        option.state = (id && name && obj) ? true : false;
        return (option.state) ? '<select'+id+name+title+classes+required+'><option></option>'+row+'</select>' : '';
    };
    
    var checkbox = function(){
        var id = (model.id)             ? ' id="'+model.id+'"'              : '';
        var name = (model.name)         ? ' name="'+model.name+'"'          : '';
        var title = (model.title)       ? ' title="'+model.title+'"'        : '';
        var classes = (model.class)     ? ' class="control-label checkbox"' : '';
        var type = (model.type)         ? ' type="'+model.type+'"'          : '';
        var value = (model.value)       ? ' value="'+model.value+'"'        : '';
        var required = (model.required) ? ' required'                       : '';
        var checked = (model.state )    ? ' checked'                        : '';
        
        option.state = (id && name && type && model.title) ? true : false;
        return (option.state) ? '<label for="'+model.id+'"'+classes+'><input'+id+name+title+type+value+required+checked+'/>'+model.title+'</label>' : '';
    };
    
    var radio = function(){
        var id       = '';
        var name     = (model.name)     ? ' name="'+model.name+'"'          : '';
        var classes  = (model.class)    ? ' class="control-label checkbox"' : '';
        var type     = (model.type)     ? ' type="'+model.type+'"'          : '';
        var required = (model.required) ? ' required'                       : '';
        
        var row = '';
        for(var i = 0; i < model.title.length; i++){
            var id = 'rad'+i;
            var title = ' title="'+model.title[i]+'"';
            var value = ' value="'+i+'"';
            row += '<label for="'+id+'"'+classes+' ><input id="'+id+'" '+name+title+type+value+required+'/>'+model.title[i]+'</label>';
        }
        option.state = (name && type && row) ? true : false;
        return (option.state) ? row : '';
    };

    var mount = function(){
        var row = '';
        for(var i = 0; i < option.data.fields.length; i++){
            var data = option.data.fields[i];
            model.id    = "inp-"+data.name;
            model.title = data.view;
            model.name  = data.name;
            model.type  = rulesType(model.name);
            model.value = data.value;
            model.state = data.state;

            var joinFields = '';
            if(model.type == "hidden"){
                model.required = true;
                joinFields = input();
            } else if(data.option){
                model.type = "select";
                model.param = data.option;
                model.required = true;
                joinFields = label()+selectIn();
            } else if($.isArray(data.view)){                
                model.type = "radio";
                model.required = true;
                joinFields = radio();                      
            } else if(data.state){
                model.type = "checkbox";
                model.required = true;             
                joinFields = checkbox();                
            } else{
                model.required = true;           
                joinFields = label()+input();                
            }
            row += joinFields;
        }
        
        return (option.state) ? lengend()+row : '';
    };
    
    var _builderForm = function(){
       if(option.state){
            var build =  mount();
            var classes = (option.class) ? ' class="'+option.class+'"' : '';
            var name    = (option.name)  ? ' name="'+option.name+'"'   : '';
            var btn     = (option.btn)   ? '<button type="submit" class=" btn btn-default" >'+option.btn+'</button>' : '';
            var method  = ' method="post"';
            var action = '';//' action="'+option.url+'"';
            var enctype = ' enctype="'+rulesEnctype(option.enctype)+'"';
            return (option.state) ? '<form role="form" id="'+option.id+'"'+classes+name+method+action+enctype+' >'+build+btn+'</form>' : '';
        };
    };
    
    
    
    var sender = function(){
        var form = $('#'+option.id);
        
        var rulesData = function(data){
            for(var i = 0; i < data.length; i++){
                if(data[i].name == 'status'){ data[i].value = (data[i].value == 'on') ? 'true': 'false'; };
                if(data[i].name == 'enable'){ data[i].value = (data[i].value == 'on') ? 'true': 'false'; };
                if(data[i].name == 'created'){  data.splice(i, 1); };
                if(data[i].name == 'id'){ data.splice(i, 1); };
            }; 
            return data;
        };
        
        form.submit(function(){
            if(!jQuery.browser.mozilla){ event.preventDefault(); }
            var self = $(this);
            var data = $(self).serializeArray();
            
            data = rulesData(data);
           //alert(JSON.stringify(data));
           
            var sendData = {
                typeQuery:rulesQuery(option.method).replace('get','set'), 
                tb:option.table, 
                send:data, 
                id:(option.idQuery) ? option.idQuery : '' 
            };
            
            var consultSend = function(){
                consult({
                    url:option.url, 
                    send:sendData,
                    before:function(){ that.msgAlert({ type:'info', head:'Enviando...'}); },
                    success:function(data){ option.data = data;},
                    error:function(){ that.msgAlert({ type:'danger', head:'Error of send!', roll:true}); },
                    complete:function(data, status, opt){
                        typeAlert = (opt.state) ? 'success' : 'danger';
                        option.data = (opt.state) ? option.data : 'ERROR!';
                        that.msgAlert({ type:typeAlert, head:option.data, roll:true});
                        form.animate({ 'opacity':0.6 });
                        $('input, select, textarea, button[type="submit"]')
                        .attr('readonly',true)
                        .attr('disabled',true);
                        self.reset();
                    },
                });
            };
            
            bootbox.confirm("Enviar Agora?", function(state){ (state) ? consultSend() : ''; });

            return false;
        });
    };
    
    var getForm = function(){
        
        var sendData = { 
            typeQuery:rulesQuery(option.method), 
            tb:option.table, 
            columns:option.columns, 
            id:(option.idQuery) ? option.idQuery : '', 
        };
        
        consult({
            url:option.url,
            send:sendData,
            before:function(){ that.msgAlert({ type:'info', head:'Aguarde...' }); },
            success:function(data){ option.data = data; },
            error:function(){ that.msgAlert({ type:'danger', head:'Error!' }); },
            complete:function(data, status, obj){
                
                if(obj.state){
                    that.msgAlert({ autoremove:true, time:1 });
                    that.append(_builderForm());
                    mask();
                    validation();
                    sender();
                    
                    $('#'+option.id+'-progress').progress(20);
                    
                } else{
                    that.msgAlert({ type:'danger', head:'Error!' });
                };
                
            },
        });
    };
           
    var _construct = function(){
       option.state = (option.id && option.url && option.method != 'delete' && option.method != 'read') ? true : false;
       getForm();
    };

    _construct();
    
    return this;
};


/*
data = {
    "head":"students",
    "colTb":[
        {"field":"name","title":"Nome:","sortable":true},
        {"field":"email","title":"E-mail:","sortable":true},
        {"field":"tel","title":"Tel:","sortable":true},
        {"field":"gender","title":"Sexo/Gênero:","sortable":true},
        {"field":"birthDate","title":"Nascimento:","sortable":true}
    ],
    "dataTb":[
        {"name":"Lucas Ferreira Costa","email":"a@a","tel":null,"gender":null,"birthDate":null},
        {"name":"Lucas Ferreira Costa","email":"a@a","tel":null,"gender":null,"birthDate":null},
    ]
}
*/
//$('#display').table({id :'', head : '', data : '', height : '', table : '', url : '', columns : ''});
$.fn.table = function(option){
    var defaults = {
        status:false,
        state:false,
        id:'panel-tb',
        head:false,
        data:false,
        striped:true,
        showColumns:true,
        showRefresh:false,
        idField:'id',
        height:'460',
        table:false,
        url:false,
        columns:false,
        method:false
    };
    var option = $.extend(defaults,option);
    var that = $(this);
    var ID = that.attr('id');
    option.id = (ID) ? that.attr('id')+option.id : alert('Defina a propriedade id');
    
    var rulesBtn = function(type){
        switch(type){
            case 'create' : return 'plus'; break;
            case 'update' : return 'pencil'; break;
            case 'delete' : return 'trash'; break;
        };
    };
    
    var rulesMethod = function(){
           
    }
    
    var header = function(){
        option.data.head = (option.head) ? option.head : false;
        option.state = (option.data.head) ? true : false;
        return (option.state) ? '<div class="panel-heading"><h3>'+option.head+'</h3></div>' : '';   
    };
    
    var toolBar = function(){
        var id = 'toolbar-'+option.id;
        if(option.method == 'crud'){
            option.method = 'create';
            var btn = '<button id="btn-'+option.method+'" type="button" class="btn btn-default glyphicon glyphicon-'+rulesBtn(option.method)+'"></button>';
            option.method = 'update';
            btn += '<button id="btn-'+option.method+'" type="button" class="btn btn-default glyphicon glyphicon-'+rulesBtn(option.method)+'"></button>';
            option.method = 'delete';
            btn += '<button id="btn-'+option.method+'" type="button" class="btn btn-default glyphicon glyphicon-'+rulesBtn(option.method)+'"></button>';
            option.method = 'crud';
        } else{
            var btn = '<button id="btn-'+option.method+'" type="button" class="btn btn-default glyphicon glyphicon-'+rulesBtn(option.method)+'"></button>';
        }
        
        style = 'style="margin: -5px 0px 0px 6px;"'; 
        return '<div id="'+id+'" class="btn-group" '+style+'>'+btn+'</div>';
    };
    
    var panel = function(){
        var panelBody = '<div class="panel-body">'+toolBar()+'<table id="'+option.id+'"></table></div>';
        var mountPanel = '<div class="panel panel-default">'+header()+panelBody+'</div>';
        (option.state) ? that.append(mountPanel) : '';   
    };
    
    
    var buiderTb = function(table){
        //var table = $('#'+option.id);
        
        table.bootstrapTable({
            cache:true,
            cardView:false,
            clickToSelect:true,
            pagination:true,
            search:true,
            showToggle:true,
            smartDisplay:true,
            sortable:true,
            detailView:false,
            clickToSelect:true,
            checkboxHeader:true,
            mobileResponsive:true,
            striped:option.striped,
            showColumns:option.showColumns,
            showRefresh:option.showRefresh,
            sortName:'name',
            searchAlign:'left',
            toolbar:'#toolbar-'+option.id,
            toolbarAlign:'right',
            idField:option.idField,
            uniqueId:option.idField, 
            queryParams:{ type: 'owner', sort: 'updated', direction: 'desc', per_page: 100, page: 1},
            pageList:[5, 10, 20, 50, 100, 200],
            height:option.height,
            columns:option.data.colTb,
            data:option.data.dataTb,
        });
        
        //table.bootstrapTable('hideColumn', 'id');
        //table.bootstrapTable.columnDefaults = '';
        //table.bootstrapTable('resetView');
        
    }
    
    var _construct = function(){
        
        panel();
        
        var table = $('#'+option.id);
        buiderTb(table);
       
       
        table.on('click-row.bs.table', function (e, row, element){
            $('.success').removeClass('success');
            $(element).addClass('success');
        });
        
        var getData = function(table){
            var index = table.find('tr.success').data('index');
            return table.bootstrapTable('getData')[index];
        };
        
        var modalDialog = function(content){
            var modalHeader = '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">'+option.head+'</h4></div>';
            var modalBody = '<div id="modal-content" class="modal-body"><p>'+content+'</p></div>';
            var modalFooter = '<div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div>';
            var modal = '<div id="modal-dialog" class="modal fade" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content">'+modalHeader+modalBody+modalFooter+'</div></div></div>';
            that.append(modal);
            $('#modal-dialog').modal('show'); 
        };
        
        var modalReset = function(){
             $('.modal-backdrop').hide(400);
             setTimeout(function(){
                 $('body').removeClass('modal-open').css({'padding-right':'0px'});
                 $('.modal-backdrop').remove();
                 $('div').removeClass('modal-backdrop');
                 $('#modal-dialog').remove();
             },500);  
        };
       
        var creating = function(table){ 
            $('#btn-create').click(function(){
                $("#modal-content").html('');
                modalDialog();
                var box = 'modal-content';
                var form = 'form-create';
                $("#m"+box).html('');
                option.collumns = option.collumns.replace('0,','');
                option.collumns = option.collumns.replace('0:','');
                $("#"+box).form({ id : form, method : 'create', table : option.table, collumns : option.collumns, url : option.url, head : option.head, btn : 'Novo' });        
                var g = setInterval(function(){
                    if($('#'+box+'-'+form).hasId()){
                        clearInterval(g);
                        $('#'+box+'-'+form).submit(function(){ modalReset(); });
                    }
                },50);
            });
        };
       
        var modernize = function(table){
            $('#btn-update').click(function(){
                //table.bootstrapTable('updateRow', { index: 0, row: {id: 18, name: '123', cpf: '1010101010'} });
                var id = getData(table).id;
                modalDialog();
                $("#modal-content").html('');
                $("#modal-content").form({ id : 'form-update', method : 'update', table : option.table, collumns : option.collumns, url : option.url, head : option.head, btn : 'Atualizar', idQuery : id });
                var g = setInterval(function(){
                    if($('#modal-content-form-update').hasId()){
                        clearInterval(g);
                        $('#modal-content-form-update').submit(function(){ modalReset(); });
                    }
                },50);               
            });
        };
        
         var remove = function(){
            $('#btn-delete').click(function(){
                var id = getData(table).id;
                $('.success').remove();
                that.form({ id : "form-delete", method : 'delete', table : option.table, collumns : option.collumns, url : option.url, head : option.head, idQuery : id });
            });
        }        
        
        if(option.method == 'create'){ creating(table); };
        if(option.method == 'update'){ modernize(table); };
        if(option.method == 'delete'){ remove(); };
        if(option.method == 'crud'){ creating(table); modernize(table); remove(); };
        
        function shortCut(){
            var defaults = { status:false, state:false, key:false, keyMaster:false, keySlave:false, keypress:false, };
            defaults.keypress = false;
            
            var char = function(name){
                switch(name){
                    case 'shift': return 16; break;
                    case 'a' : return 65; break;
                    case 'b' : return 66; break;
                    case 'c' : return 67; break;
                    case 'd' : return 68; break;
                    case 'e' : return 69; break;
                    case 'f' : return 70; break;
                    case 'g' : return 71; break;
                    case 'h' : return 72; break;
                    case 'i' : return 73; break;
                    case 'j' : return 74; break;
                    case 'k' : return 75; break;
                    case 'l' : return 76; break;
                    case 'm' : return 77; break;
                    case 'n' : return 78; break;
                    case 'o' : return 79; break;
                    case 'p' : return 80; break;
                    case 'q' : return 81; break;
                    case 'r' : return 82; break;
                    case 's' : return 83; break;
                    case 't' : return 84; break;
                    case 'u' : return 85; break;
                    case 'v' : return 86; break;
                    case 'w' : return 87; break;
                    case 'x' : return 88; break;
                    case 'y' : return 89; break;
                    case 'z' : return 90; break;
                    
                };
            };
            
            defaults.keyMaster = 'shift';
            defaults.keypress = false;
            
            var resetKey = function(){
                defaults.keypress = false;
            };
            
            var eventKey = function(){
                document.onkeyup = function(e){
                    if(e.which == char(defaults.keyMaster)){ defaults.keypress = false; };    
                };
                
                document.onkeydown = function(e){
                    if(e.which == char(defaults.keyMaster)){ defaults.keypress = true; }; 
                    
                    if(e.which == char('c') && defaults.keypress){ $('#btn-create').click(); };
                    if(e.which == char('u') && defaults.keypress){ $('#btn-update').click(); };
                    if(e.which == char('d') && defaults.keypress){ $('#btn-delete').click(); };
                };
            }
            eventKey();
        }
        shortCut();
    }
    
    var confer = function(){
        //option.methoded = (option.method != 'update' && option.method != 'delete' ) ? option.method : 'read';
        
        consult({
            url:option.url,
            send:{ typeQuery:typeQuery('read'), tb:option.table, collumns:option.collumns },
            before:function(opt){
                that.html('');
                that.msgAlert({ type:'info', head:'Aguarde...', text:'Buscando dados.', position:'before'});
            },
            success:function(data){ 
                option.data = data;
                if(option.data == null || option.data == 'ERROR'){
                    that.msgAlert({ type:'danger', head:'Error!', text:'Error do servidor.', position:'before'});
                } else{
                    that.msgAlert({ type:'success', head:'Sucesso!', text:'.', position:'before', hide:true, time:1000});
                    _construct();
                }
            },
            error:function(opt){
                that.msgAlert({ type:'danger', head:'Error!', text:'Error de envio.', position:'before'});
            },
            complete:function(opt){ }
        });
    }
    
    var exeTable = function(){
        confer();
        setTimeout(function(){ 
            var g = setInterval(function(){
                var n = $('form').length ;
                if(n > 0){
                    $('form').each(function(){ $(this).submit(function(){ confer(); }); });
                    clearInterval(g); 
                }
            },100); 
        }, 100);
    }
    exeTable();
}

//$("#display").builder({ method : "create", table : "students" , collumns : "0-4:9,12", url : "crud.php", head : "List Students" });
$.fn.builder = function(option){
    var defaults = { method:'',  table:'', collumns:'', url:'', head:'' };
    var option = $.extend(defaults, option);
    var obj = $('#'+this.attr('id'));
    
    var created = function(){
        obj.form({ id:"form-create", method:option.method, table:option.table, collumns:option.collumns, url:option.url, head:option.head });
    }
    
    var readed = function(){
        obj.table({ id:'tb-read', method:option.method, table:option.table, collumns:option.collumns, url:option.url, head:option.head });
    }
    
    var updated = function(){
        obj.table({ id:'tb-update', method:option.method, table:option.table, collumns:option.collumns, url:option.url, head:option.head });
    }
    
    var deleted = function(){
        obj.table({ id:'tb-delete', method:option.method, table:option.table, collumns:option.collumns, url:option.url, head:option.head });
    }
    
    var cruded = function(){
        obj.table({ id:'tb-crud', method:option.method, table:option.table, collumns:option.collumns, url:option.url, head:option.head });
    }
    
    var _construct = function(){
        switch(option.method){
            case 'create' : created(); break;
            case 'read'   : readed();  break;
            case 'update' : updated(); break;
            case 'delete' : deleted(); break;
            case 'crud'   : cruded(); break;
            default       : alert('Insira um método válido!');
       }
    }
    _construct();
    return this;   
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*var insertTb = function(){
    var $table = $('#table'),
        $button = $('#button');
    $(function () {
        $button.click(function () {
            var randomId = 100 + ~~(Math.random() * 100);
            $table.bootstrapTable('insertRow', {
                index: 1,
                row: {
                    id: randomId,
                    name: 'Item ' + randomId,
                    price: '$' + randomId
                }
            });
        });
    });
}

var updateTb = function(){
    var $table = $('#table'),
        $button = $('#button');
    $(function () {
        $button.click(function () {
            var randomId = 100 + ~~(Math.random() * 100);
            $table.bootstrapTable('updateRow', {
                index: 1,
                row: {
                    id: randomId,
                    name: 'Item ' + randomId,
                    price: '$' + randomId
                }
            });
        });
    });    
}

var remove = function(){
    var $table = $('#table'),
        $button = $('#button');
    $(function () {
        $button.click(function () {
            var ids = $.map($table.bootstrapTable('getSelections'), function (row) {
                return row.id;
            });
            $table.bootstrapTable('remove', {
                field: 'id',
                values: ids
            });
        });
    });   
}*/
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   