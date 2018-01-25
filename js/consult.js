//	query = { url:'url', before:'', send:objSend, receive:function(data){ ... }, }; consult(query);
var __consult = function($option){
    let $defaults = {
        type: 'text',
        url: null,
        send: null,
        before: null,
        receive: null,
        data: null,
    };
    
    let $opt = $.extend($defaults, $option);

    if($.isFunction($opt.before)){ 
        $opt.before($opt.send);
    }; 
        
    $.ajax({
        url:$opt.url,
        timeout:300,
        type:'POST',
        dataType:'html',
        method:'POST',
        async:true,
        data:$opt.send,
        context: document.body,
        success   :function($data){ 
            $opt.data = ($opt.type != "json") ? String($data.trim()) : JSON.parse($data.trim());
        },
        error     :function($e){ 
            $opt.data = $e.statusText;
        },
        complete  :function(){
            if($.isFunction($opt.receive)){ 
                $opt.receive($opt.data,$opt); 
            }; 
        },
    });
    
    return this;
};

__consult({
    url:'test.php',
    type:'json',
    send: { name:'post', value:'post'},
    before: function($dat){
        $dat.value = "before";
    },
    receive:function($data, $opt){ 
        alert(JSON.stringify($opt));
    }, 
});