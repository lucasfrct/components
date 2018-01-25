//	DISCOVER STRING IN ARRAY AND RETURN A ARRAY WITCH INDEX
Array.prototype.detect = function ( $string = "" ) {
	var $return = [ ];
	this.find ( function ( $item, $index ) { 
		if ( String ( $item ) == String ( $string ) ) { 
			$return.push ( $index ); 
		}; 
	} );
	return $return;
};

//	REMOVE ITEM IN ARRAY BY INDEX
Array.prototype.retire = function ( $index = 0 ){
 	return this.splice ( Number ( $index ), 1 );
};

//	REMOVE ITEM NULL IN ARRAY
Array.prototype.cleaner = function ( $string = "" ) {
	var $that = this;
	var $sel = ( $string ) ? String ( $string ) : null;
  	
  	return $that.filter ( function ( $item, $index ) {
	    if ( $item == $sel ) {         
	      	$that.splice ( $index, 1 ); 
	    };
 	} );
};