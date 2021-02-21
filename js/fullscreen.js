
function RequestScreen( ) {
    let element = document.documentElement   
    if(element.requestFullscreen) {         element.requestFullscreen()         } 
    if (element.mozRequestFullScreen) {     element.mozRequestFullScreen()      } 
    if (element.webkitRequestFullscreen) {  element.webkitRequestFullscreen()   }  
    if (element.msRequestFullscreen) {      element.msRequestFullscreen()       }
}