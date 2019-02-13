var view = {
    form:{
        scope:{
            id:function(id){
                return (id) ? ' id="'+id+'"' : '';
            },
            class:function(clas){
                return (clas) ? ' class="'+clas+'"' : '';
            },
            name:function(name){
                return (name) ? ' name="'+name+'"' : '';
            },
            type:function(type){
                return (type) ? ' type="'+type+'"' : '';
            },
            value:function(value){
                return (value) ? ' value="'+value+'"' : '';
            },
            check:function(check){
                return (check) ? ' checked' : '';
            },
            radio:function(radio){
                return (radio) ? '' : '';
            },
            style:function(style){
                return (style) ? ' style="'+style+'"' : '';
            },
            required:function(required){
                return (required) ? ' required' : '';
            },
            
            view:function(view){
                return (view) ? view : '';
            },
            forLabel:function(forLabel){
                return (forLabel) ? ' for="'+forLabel+'"' : '';
            },
        },
        
        input:function(option){
            var defaults = { 
                id:'', 
                class:'form-control', 
                name:'', 
                type:'text', 
                value:'',
                check:undefined,
                radio:undefined,
                style:'display:block', 
                required:true,
                
                view:'',
                classLabel:'control-label',
                styleLabel:'display:block',
            }; 
            var option = $.extend(defaults, option);
            
            var input = '';
            
            if(option.type == 'hidden'){
                input += '<input'+
                    this.scope.id(option.id)+
                    this.scope.class(option.class)+
                    this.scope.name(option.name)+
                    this.scope.type(option.type)+
                    this.scope.value(option.value)+
                    this.scope.check(option.check)+
                    this.scope.style(option.style)+
                    this.scope.required(option.required)+
                ' />';
                
            } else if($.isArray(option.radio)){
                option.type  = 'radio';
                var n = option.radio.length;
                
                input += '<label'+
                    this.scope.forLabel(option.id)+
                    this.scope.class(option.classLabel)+
                    this.scope.style(option.styleLabel)+
                '>'+this.scope.view(option.view)+'</label>';
                
                for(var i = 0; i < n; i++){
                    var id = option.id+'-radio-'+i;
                    option.class = '';
                    option.value = '';
                    option.check = '';
                    option.style = '';
                    
                    option.classLabel = 'radio-inline';
                    option.styleLabel = '';
                    
                    inp = '<input'+
                        this.scope.id(id)+
                        this.scope.class(option.class)+
                        this.scope.name(option.name)+
                        this.scope.type(option.type)+
                        this.scope.value(option.value)+
                        this.scope.check(option.check)+
                        this.scope.style(option.style)+
                        this.scope.required(option.required)+
                    ' />';
                    
                    input += '<label'+
                        this.scope.forLabel(id)+
                        this.scope.class(option.classLabel)+
                        this.scope.style(option.styleLabel)+
                    '>'+inp+this.scope.view(option.radio[i])+'</label>';
                };
                
            } else if(option.check != undefined){
                option.type = 'checkbox';
                option.class = '';
                option.value = '';
                option.style = '';
                
                option.classLabel = 'checkbox';
                option.styleLabel = '';
                
                inp = '<input'+
                    this.scope.id(option.id)+
                    this.scope.class(option.class)+
                    this.scope.name(option.name)+
                    this.scope.type(option.type)+
                    this.scope.value(option.value)+
                    this.scope.check(option.check)+
                    this.scope.style(option.style)+
                    this.scope.required(option.required)+
                ' />';
                
                input += '<label'+
                    this.scope.forLabel(option.id)+
                    this.scope.class(option.classLabel)+
                    this.scope.style(option.styleLabel)+
                '>'+inp+this.scope.view(option.view)+'</label>';
                
            } else {
                input += '<label'+
                    this.scope.forLabel(option.id)+
                    this.scope.class(option.classLabel)+
                    this.scope.style(option.styleLabel)+
                '>'+this.scope.view(option.view)+'</label>';
                input += '<input'+
                    this.scope.id(option.id)+
                    this.scope.class(option.class)+
                    this.scope.name(option.name)+
                    this.scope.type(option.type)+
                    this.scope.value(option.value)+
                    this.scope.check(option.check)+
                    this.scope.style(option.style)+
                    this.scope.required(option.required)+
                ' />';
                
            };
            
            return input;
        },
        
        selection:function(option){
            var defaults = { 
                id:'', 
                class:'selectpicker show-tick form-control', 
                name:'', 
                type:'text', 
                value:'',
                check:undefined,
                radio:undefined,
                style:'display:block', 
                required:true,
                
                view:'',
                classLabel:'control-label',
                styleLabel:'display:block',
            }; 
            var option = $.extend(defaults, option);
            
            var seleting = '';
            var optionField = '';
            
            var opt = option.option;
            var n = opt.length;
            optionField ='<option disabled selected> -- Selecione -- </option>';
            
            for(var i = 0; i < n; i++){
                optionField += '<option value="'+opt[i].value+'">'+opt[i].title+'</option>';
            };
            
            seleting += '<label'+
                this.scope.forLabel(option.id)+
                this.scope.class(option.classLabel)+
                this.scope.style(option.styleLabel)+
            '>'+this.scope.view(option.view)+'</label>';
             
            seleting += '<select data-live-search="true" '+
                this.scope.id(option.id)+
                this.scope.class(option.class)+
                this.scope.name(option.name)+
                this.scope.style(option.style)+
                this.scope.required(option.required)+
            '>'+optionField+'</select>';
            
            return seleting;
        },
        
        textarea:function(option){     
             var defaults = { 
                id:'', 
                class:'form-control', 
                name:'', 
                type:'text', 
                value:'',
                check:undefined,
                radio:undefined,
                style:'display:block', 
                required:true,
                
                view:'',
                classLabel:'control-label',
                styleLabel:'display:block',
            }; 
            var option = $.extend(defaults, option);
            
            var textarea = '';
            
            textarea += '<label'+
                this.scope.forLabel(option.id)+
                this.scope.class(option.classLabel)+
                this.scope.style(option.styleLabel)+
            '>'+this.scope.view(option.view)+'</label>';
            
            textarea += '<textarea'+
                this.scope.id(option.id)+
                this.scope.class(option.class)+
                this.scope.name(option.name)+
                this.scope.style(option.style)+
                this.scope.required(option.required)+
            ' >'+this.scope.value(option.value)+'</textarea>';
            return textarea;
        },
        
        button:function(option){
            var defaults = { 
                id:'', 
                class:'btn btn-default btn-block ', 
                name:'', 
                type:'submit', 
                value:'',
                style:'', 
            }; 
            var option = $.extend(defaults, option);

            var button = '<button '+
                this.scope.id(option.id)+
                this.scope.class(option.class)+
                this.scope.name(option.name)+
                this.scope.type(option.type)+
                this.scope.style(option.style)+
            ' >'+this.scope.view(option.view)+'</button>';
            return button;
        },
        
        main:function(option){
            var defaults = { id:'', class:'form', type:'text', method:'post', head:'', bodyed:'VOID', style:'' };
            var option = $.extend(defaults, option);
            var form = '';
            
            var rulesEnctype = function(enctype){
                switch(enctype){
                    case "plain" : return "text/plain"; break;
                    case "text"  : return "application/x-www-form-urlencoded"; break;
                    case "file"  : return "multipart/form-data"; break;
                    default      : return "application/x-www-form-urlencoded";   
                };
            };
            

            var enc = ' method="'+option.method+'" enctype="'+rulesEnctype(option.type)+'"';
            var legend = (option.head) ? '<legend style="font-size:3em">'+this.scope.view(option.head)+'</legend>' : '';
            
            form = '<form role="form" '+
                this.scope.id('form-builder-'+option.id)+
                this.scope.class(option.class)+
                this.scope.style(option.style)+
                enc+
            ' >'+legend+option.bodyed+this.button({ view:'Submit' })+'</form>';
            
            return form;
        },
        
        mount:function(data){
            var defaults = { type:'text' };
            var n = data.fields.length
            var builder = ''

            var rulesType = function(name){
                switch(name){
                    case 'created'  : return 'hidden'; break;
                    case 'password' : return 'password'; break;
                    default         : return 'text';
                };
            };
            
            for(var i = 0; i < n; i++){
                defaults.type = rulesType(data.fields[i].value);
                var id = 'inp-'+i;
                
                if(data.fields[i].textarea){
                    builder += this.textarea({ view:data.fields[i].name, name:data.fields[i].value, });
                } else if($.isArray(data.fields[i].option)){ 
                    builder += this.selection({
                        id:id, 
                        view:data.fields[i].name, 
                        name:data.fields[i].value, 
                        option:data.fields[i].option
                    });
                } else{
                    builder += this.input({
                        id:id,
                        view:data.fields[i].name, 
                        name:data.fields[i].value, 
                        type:defaults.type, 
                        check:data.fields[i].check, 
                        radio:data.fields[i].radio, 
                    }) ; 
                };
                
            };
            
            builder = this.main({id:data.id, head:data.head, bodyed:builder});
            return builder;   
        },
    },
};

data = {
    method:'create-get',
    tb:'students',
    columns:'0,10,20',
    id:'1',
    head:'Estudante',
    fields:[
        { view:'Ativo:',    name:'state',   check:true },
        { view:'Sexo:',     name:'gender',  radio:['Masc.', 'Femin.', 'Outro'] },
        { view:'Uf:',       name:'uf',      option:[{title:'SP', value:'SP'}, {title:'MG', value:'MG'}] },
        { view:'Mensagem:', name:'msg',     value:'textarea', textarea:true },
        { view:'Nome:',     name:'name',    value:'Nomes' },
    ]
};


