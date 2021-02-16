// Protótipos de Array 
Array.prototype.union = function ( arr = [] ) {
	let that = this 
	return [ ...new Set([...that, ...arr]) ].sort()
}

// retorna quais elementos tem iguais entre a array atual e a array de entrada
Array.prototype.intersection = function ( arr = [] ) {
	return this.filter(item => arr.includes(item))
}

// retorn os elementyos diferentes entre a array atual e a array de entrada
Array.prototype.differenre = function ( arr = [] ) {
	let that = this
	return this
		.filter(item => !arr.includes(item))
		.concat(arr.filter(element => !that.includes(element)))
}

// detecta uma string na array e retorna o índice
Array.prototype.detectIndex = function ( value = undefined ) {
	return this.indexOf ( value )
}

// remove um item da array com base no índice ou na string
Array.prototype.retire = function ( item = undefined, enableIndex = false ) {
	let index = this.indexOf ( item )
	if (enableIndex) { index = item }
	this.splice ( index, 1 )
	return this
}

Array.prototype.clean = function ( ) {
  	return this.filter(element => element)
}

// TESTS
var numbersA = Array(1, 2, 3, "1", "2", "3", "one", "two", "tree", "", Number(), Object(), Array(), String(), Boolean(), null, undefined, false, true )
var numbersB = Array(4, 5, 6, "4", "5", "6", "four", "five", "six", "", null, undefined, false, true, 1, "2", "tree" )
console.log("INIT TESTS")
console.log(".")
console.log("==================================================================================================")
console.log("DUMP A: ", numbersA)
console.log("DUMP B: ", numbersB)
console.log(".")

console.log("==================================================================================================")
console.log("prototype Array.union(array)")
console.log("Union: ", numbersA.union(numbersB))
console.log(".")

console.log("==================================================================================================")
console.log("prototype Array.intersection(array)")
console.log("Intercection: ", numbersA.intersection(numbersB))
console.log(".")

console.log("==================================================================================================")
console.log("prototype Array.differenre(array)")
console.log("differenre: ", numbersA.differenre(numbersB))
console.log(".")

console.log("==================================================================================================")
console.log("Prototype Array.detectIndex(value)")
console.log("type undefined [return index = 16]: ", numbersA.detectIndex())
console.log("Number 1 [return index = 0]: ", numbersA.detectIndex(1))
console.log("String 2 [return index = 4]: ", numbersA.detectIndex("2"))
console.log("String tree [return index = 8]: ", numbersA.detectIndex("tree"))
console.log("Object null [return index = 15]: ", numbersA.detectIndex(null))
console.log("Boolean true [return index = 18]: ", numbersA.detectIndex(true))
console.log(".")

console.log("==================================================================================================")
console.log("prototype Array.retire(value)")
console.log("retire value 2: ", numbersA.retire(2))
console.log("retire value '2': ", numbersA.retire("2"))
console.log("retire value two: ", numbersA.retire("two"))
console.log("retire index 0: ", numbersA.retire(0, true))
console.log("retire index 1: ", numbersA.retire(1, true))
console.log("retire index 2: ", numbersA.retire(2, true))
console.log("retire index 2: ", numbersA.retire(true))
console.log("retire index 2: ", numbersA.retire(false))
console.log(".")

console.log("==================================================================================================")
console.log("Prototype Array.retire(value)")
console.log("clean values [null, false, undefined]: ", numbersA.clean())
console.log(".")

