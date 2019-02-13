// detecta uma string na array e return o índice
Array.prototype.detect = function ( $str = "" ) {
	return this.indexOf ( $str );
};

// remove um item da array com base no ídice
Array.prototype.retire = function ( $item = 0 ){
	return this.splice ( 0, 1 );
};


var $car = Array ( "fusca", "gol", "palio", "fusion" );
console.log ( $car.detect ( "palio" ) );

/*


// REMOVE TODOS OS ITENS VAZIOS DE UMA ARRAY
Array.prototype.cleaner = function ( $string = "" ) {
	var $sel = ( $string ) ? String ( $string ) : null;
  	
  	return this.filter ( function ( $item, $index ) {
	    if ( $item == $sel ) {         
	      	this.splice ( $index, 1 ); 
	    };
 	} );
};
*/