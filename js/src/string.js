( function ( ) {
	"use strict";

String.prototype.capitalize = function ( ) { 
	return this.charAt ( 0 ).toUpperCase ( ) +this.slice ( 1 ); 
};

String.prototype.letters = function ( $num ) {
	return this.substring ( 0, $num ); 
};

//	REMOVE ALL ACCENTS OF STRINGS AND TO REPLACE BY CHARACTERES COMMONS
String.prototype.removeAccents = function ( ) {
	return this.replace ( /[áàâãä]/g,'a' )
	.replace ( /[éèêë]/g,'e' )
	.replace ( /[ìíîï]/g,'i' )
	.replace ( /[óòôõö]/g,'o' )
	.replace ( /[úùûü]/g,'u' )
	.replace ( /[ÁÀÂÃÄ]/g,'A' )
	.replace ( /[ÉÈÊË]/g,'E' )
	.replace ( /[ÍÌÎÏ]/g,'I' )
	.replace ( /[ÒÓÔÕÖ]/g,'O' )
	.replace ( /[ÚÙÛÜ]/g,'U' )
	.replace ( /[ç]/g,'c' )
	.replace ( /[Ç]/g,'C' );
	.replace ( /['~']/g,'' );
};

/*
// COUNT OCORRENCY OF CHARACTERS IN STRING
var stroc = function($letter,$string){
	return Number(String($string).split(String($letter)).length - 1);
};

// SEARCH A LETTER IN WORD
var hasLetter = function($letter, $string){
    return (String($string).indexOf(String($letter)) != -1) ? true : false;
};

// ERASE ALL LETTERS
var eraseLetters = function($string){
	return String($string).replace(/\D/g,"");
};

// ERASE ALL NUMBERS
var eraseNum = function($string){
	return String($string).replace(/\d/g,"");
};

// CONTA AS OCORRENCIAS DE UM CARACTERE EM UMA STRING *
var stroc = function(letter, string){
	return Number(String(string).split(String(letter)).length - 1);
};

var numbers = function($string){ 
	return $string.removeAccents().replace(/[A-Za-z]/g, "");
};
*/
} ) ( );