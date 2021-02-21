var Autoload = new Object()
    
Autoload.create = AutoloadCreateScript
Autoload.require = AutoloadRequireURL
Autoload.on = AutoloadOn


function AuloadScript(scripts = []) {
    AutoloadOn(scripts)
}

function AutoloadCreateScript(src = '') {
    let script = document.createElement('script')
    script.src = src 
    script.onload = function() {
        alert("Script OK")
    }

    document.getElementsByTagName('head')[0].appendChild(script)
    return script
}

function AutoloadRequireURL(url = '' ) { 
    setTimeout (()=> { AutoloadCreateScript(url) }, 10 )
}

function AutoloadOn(array = []) {
    array.forEach((url)=> { AutoloadRequireURL(url) })
}

console.log("Autooad: ", Autoload)
console.log("Autooad Create: ", Autoload.create(''))
console.log("Autooad Require: ", Autoload.require(''))
console.log("Autooad Create: ", Autoload.on([]))
console.log("funtion Autoload", AuloadScript([]))