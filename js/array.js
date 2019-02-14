// detecta uma string na array e return o índice
Array.prototype.detect = function ( $str = "" ) {
	return this.indexOf ( $str );
};

// remove um item da array com base no ídice ou na string
Array.prototype.retire = function ( $item = 0 ){
	if ( typeof $item == "string" ) {
		this.splice ( this.indexOf ( $item ), 1 );
	} else if ( typeof $item == "number" ) {
		this.splice ( $item, 1 );
	};
	return this;
};

Array.prototype.clean = function ( $string = "" ) {
  	let $this = this;
  	$this.forEach ( function ( $item, $index ) {
  		if ( null == $item ) {
  			$this.splice ( $index, 1 );
  		};
  		if ( undefined == $item ) {
  			$this.splice ( $index, 1 );
  		};
 	} );
 	return $this;
};