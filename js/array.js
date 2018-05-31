//	DISCOVER STRING IN ARRAY AND RETURN A ARRAY WITCH INDEX

// DETECTA SE UMA STRING ESTÁ PRESENTE NA ARRAY
Array.prototype.detect = function ( $string = "" ) {
	var $return = [ ];
	this.find ( function ( $item, $index ) { 
		if ( String ( $item ) == String ( $string ) ) { 
			$return.push ( $index ); 
		}; 
	} );
	return $return;
};

// REMOVE UM ITEM NA ARRAY COM BASE NO ÍNDICE
Array.prototype.retire = function ( $index = 0 ){
 	return this.splice ( Number ( $index ), 1 );
};

// REMOVE TODOS OS ITENS VAZIOS DE UMA ARRAY
Array.prototype.cleaner = function ( $string = "" ) {
	var $sel = ( $string ) ? String ( $string ) : null;
  	
  	return this.filter ( function ( $item, $index ) {
	    if ( $item == $sel ) {         
	      	this.splice ( $index, 1 ); 
	    };
 	} );
};