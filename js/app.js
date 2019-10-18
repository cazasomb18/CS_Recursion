//==============================================================================
//Section 7 - RECURSION
//==============================================================================

//OBJECTIVES
	//Define what recursion is and how it can be used
	//Understand the two essential compoennts of a recursive function
	//Visualize the call stack to better debug and understand recursive functions
	//Use helper method recursion and pure recursion to solve more difficult problems

//WHAT IS RECURSION?
	//A process (a function in our case) that calls itself

//WHY USE RECURSION?
	//It's everywhere
	//JSON.parse & JSON.stringify are recursive functions
	//document.getElementById and DOM traversal algorithms
	//Object traversal
	//We will see it with more complex data structures
	//It's sometimes a cleaner alternative to iteration

//LET'S TALK ABOUT FUNCTIONS - if a recursive functions calls itself over and over again
//what happens BEHIND THE SCENES
	//In almost all program languages, there is a built in data structure that manages what
	//happens when functions are invoked - this is called the CALL STACK

//THE CALL STACK
	//It's a stack data structure - we'll talk about that later!
	//Any time a function is invoked it is placed (pushed) on top of the call stack
	//When JavaScript sees the RETURN keyword or when the function ends, the computer 
	//will remove (pop)

//WHY DO I CARE?
	//You're used to functions being pushed on the call stack and popped off when they
	//are done.
	//When we write recursive functions, we keep pushing new functions onto the call stack!

//HOW RECURSIVE FUNCTIONS WORK
	//Invoke the SAME function with a different input until you reach your base case!

//TWO ESSENTIAL PARTS OF A RECURSIVE FUNCTION
	//Base case
	//Different input / recursive call / function is called over and over again w/ a 
	//different input/piece of data


//Our first RECURSIVE FUNCTION
function countDown (num) {
	if (num <= 0) {
		console.log("All done!");
		return;
	}
	console.log(num);
	num--;
	countDown(num);
}

//SAME AS BELOW
//ITERATIVE SOLUTION
// function countDown(num) {
//     for (let i = 0; i < num; i--){
//         console.log(i);
//     }
//     console.log("All done!");
// }

//OUR SECOND RECURSIVE FUNCTION
function sumRange(num) {
	if (num === 1) return 1;
	return num + sumRange(num -1);
}
//base case: if num === 1 - return 1;
//recursion: num + (num  - 1) + (num - 1)... etc. until num === 1;

//FACTORIAL
	// 4! === 4 * 3 * 2 * 1;

//ITERATIVE SOLUTION
// function factorial(num) {
//     let total = 1;
//     for (let i = num; i > 0; i--) {
//         total *= i;
//     }
//     return total;
// }

//RECURSIVE SOLUTION
function factorial(num) {
	if (num === 1){
		return 1;
	} return num * factorial(num - 1);
}

//WHERE THINGS GO WRONG IN RECURSIVE FUNCTIONS
	//NO BASE CASE
		//If you don't have a base case then the call stack size will be exceeded
			//infitinite loop
	//RETURNING THE WRONG THINGS/FORGETTING TO RETURN ANYTHING
		//You'll get an infinite loop as well since the input isn't being mutated properly
	//Stack Overflow! (maximum call size exceeded)

//example
function factorial(num) {
	if (num === 1) return 1;
	return num * factorial(num - 1);
};
	//THIS IS CORRECTLY INSTANTIATING A RECURSIVE FUCTION
		//There is a base case returning an augmented input with each recursive call.

function factorial(num) {
	if (num === 1) console.log(1);
	return num * factorial(num -1);
};
	//THIS WILL THROW IN INFINITE LOOP SINCE THERE IS NO BASE CASE






//////////HELPER METHOD RECURSION//////////////////////////////////////////////
function outer(input) {
	var outerScopedVariable = []

	function helper(helperInput) {
		//modify the outerScopedVariable
		helper(helperInput--);
	}
	helper(input)

	return outerScopedVariable;
};

//We have TWO functions
	//1.) Outer function - that is not recursive, which calls an inner function.
	//2.) Inner function - RECURSIVE, called by outer function within that 
	//function's scope.

//another example that's functional
function collectOddValues(arr) {
	let result = []
	function helper(helperInput) {
		if(helperInput.length === 0) {
			return;
		}
		if (helperInput[0] % 2 !== 0) {
			result.push(helperInput[0])
		}
		helper(helperInput.slice(1));
	}
	helper(arr)
	return result;
}




//PURE RECURSION COLLECT ODD VALUES
function collectOddValuesRF(arr) {

	let newArr = []

	if(arr.length === 0) {
		return newArr;
	}

	if(arr[0] % 2 !== 0){
		newArr.push(arr[0]);
	}
	newArr = newArr.concat(collectOddValuesRF(arr.slice(1)));
	return newArr;
};

collectOddValuesRF([1,2,3,4,5]);

// newArr = [1]
// [1].concat(collectOddValuesRF([2,3,4,5]));
// 	[].concat(collectOddValuesRF([3,4,5]));
// 			[3].concat(collectOddValuesRF([4,5]))
// 				[].concat(collectOddValuesRF([4,5]))
// 					[5].concat(collectOddValuesRF([]))
// 						[]
// 							[1,3,5]
//=======STEP BY STEP HOW THE ABOVE FUNCTION WORKS RECURSIVELY==========//

//====================PURE RECURSION TIPS====================
	//For ARRAYS
		//use methods like slice, the spread operator and concat to make copies 
		//of the arrays so you do not mutate them.
	//For STRINGS
		//strings are immutable so you will need to use methods like slice, substr,
		//or substring to make copies of strings.
	//For OBJECTS
		//to make scopies use Object.assign, or the spread operator


//RECURSIVE EXERCISES//

// POWER ================================================================

//Write a function which accepts a base and an exponent.  The function should return 
//the power of the base to the exponent. This function should mimic the functionality
//of Math.pow() - do not worrya bout negative bases and exponents.

// power(2,0) === 1
// power(2,2) === 4
// power(2,4) === 1

function power(base, exponent) {
	if (exponent === 0){
		return 1
	}
	return base * power(base, exponent - 1);
}
console.log(power(2,0));
console.log(power(2,2));
// 2 * power(2,1); //so we return 2 * ( power(2, (2-1) ) )
// 	2 * power(2,0) // then we return 2 * ( power(2, (1-1)) )
// 		return 1;  //BASE CASE REACHED: return 1;
// 					//What we are left with is the base*base*1 || or 2 * 2;

console.log(power(2,4));
// 2 * power(2,3); // return 2 * ( power (2,4-1) )
// 		2 * power(2,2); // return 2 * ( power(2,3-1) )
// 			2 * power(2,1); // return 2 * ( power(2,2-1) )
// 				2 * power(2,0); // return 2 * ( power(2,1-1) )
// 					return 1; // BASE CASE REACHED: return 1;
//						//We're left with: 2 * 2 * 2 * 2 * 1 || base*base*base*base*1;



// FACTORIAL =================================================================
// Write a function called factorial which accepts a number and return the factorial 
//of that number. A factorial is the product of an integer and all the intergers below
//it; e.g., factorial four (4!) is equal to 24, because 4 * 3 * 2 * 1 equals 24.
//Factorial zero (0!) is ALWAYS 1.

function factorial(num){
	if (num === 0) return 1;

	return num * factorial(num - 1);
}

console.log(factorial(1)); //1
console.log(factorial(2)); //2
console.log(factorial(4)); //24
console.log(factorial(7)); //5040

//PRODUCTOFARRAY ================================================================
//Write a function called productOfArray which takes in an array of numbers and returns
//the product of them all;

function productOfArray(arr){
	if (arr.length === 0){
		return 1;
	}
	return arr[0] * productOfArray(arr.slice(1));
};

console.log(productOfArray([1,2,3])); //6
console.log(productOfArray([1,2,3,10])); //60

//RECURSIVERANGE ================================================================
//Write a function called recursiveRange which accepts a number and adds up all the numbers
//from 0 to the number passed to the function.

function recursiveRange(num){
	if (num === 1) return 1;

	return num + recursiveRange(num  - 1);

}

console.log(recursiveRange(6)); //21
console.log(recursiveRange(10));  // 55

//FIB ============================================================================
//Write a recursive function called fib which accepts a number and return the nth number
//in the Fibonacci sequence. Recall that the Fibonacci sequence is the sequence of whole
//numbers 1,1,2,3,5,8, ... which starts with 1 and 1, and where every number thereafter
//is equal to the sum of the previous two numbers;

function fib(n){

	if (n <= 2) return 1;

	return fib(n-1) + fib(n-2);
}

console.log(fib(3)); // 3
console.log(fib(10)); // 55
console.log(fib(28)); // 317811
console.log(fib(35)); // 9227465

//REVERSE ========================================================================
//Write a recursive function called reverse which accepts a string and returns a new 
//string in reverse.

function reverse(str){

	if(str.length <= 1 ) return str;

	return reverse(str.slice(1)) + str[0];

}

console.log(reverse('awesome')); //emosewa
	"awesome" //length !== 7
		// return reverse('wesome') + "a" //str[0] === 'a'
		// 	return revese('esome') + "w" //str[0] === 'w'
		// 		return reverse('some') + 'e' //str[0] === 'e'
		// 			return reverse('ome') + 's' //str[0] === 's'
		// 				return reverse('me') + 'o' //str[0] === 'o'
		// 					return reverse('e') + "m" //str[0] === 'm'
		// 						return 'e' //str.length <= 1 so we return 'e'
		// 							//we are left with 'e' + 'm' + 'o' + 's' + 'e' + 'w' + 'a'
console.log(reverse('rithmschool')); //loohcsmhtir


//BUILT IN METHOD SOLUTION
function reverseBI(str){

	let reverseString = str.split('').reverse().join('');

	return reverseString;
}

console.log(reverseBI('awesome')); //emosewa
	'wesome' + 
console.log(reverseBI('rithmschool')); //loohcsmhtir

function reverseIT(str){

	let reverse = '';

	for (let i = str.length - 1; i >= 0; i--){
		reverse += str[i];
	}
	return reverse;
};

console.log(reverseIT('awesome'));
console.log(reverseIT('rithmschool'));

//isPALINDROME - Write a recursive function called isPalindrome which returns 
	//true if the string passed to it is a palindrome (reads the same forward and 
	//backward). Otherwise it returns false;

function isPalindrome(str){
	if (str.length === 1) return true;

	if (str.length === 2) {
		str[0] === str[1];
		return true;
	}

	if (str[0] === str.slice(-1)){
		return isPalindrome(str.slice(1, -1));
	}
	return false;
}

console.log(isPalindrome('awesome')); // false
	// "esome", "wesome"
	// 	"some", "esome"
	// 		"ome", 'some'
	// 			"me", "ome",
	// 				"e", "me", 
	// 					return "em"
	// 						return --> 'meosewa'
console.log(isPalindrome('foobar')); // false
console.log(isPalindrome('tacocat')); // true
console.log(isPalindrome('amanaplanacanalpanama')); // true
console.log(isPalindrome('amanaplanacanalpandemonium')); // false





//someRECURSIVE ================================================================
// Write a recursive function called someRecursive which accepts an array and a callback.
// The function returns true if a single value in the array returns true when passed to 
// the callback. Otherwise returns false;

const callback = val => val % 2 !== 0;

function someRecursive(arr, callback){

    if (arr.length === 0) return false;

    if (callback(arr[0])) return true;

    return someRecursive(arr.slice(1), callback)
}

// SAMPLE INPUT / OUTPUT
// const isOdd = val => val % 2 !== 0;

console.log(someRecursive([1,2,3,4], callback)); // true
console.log(someRecursive([4,6,8,9], callback)); // true
console.log(someRecursive([4,6,8], callback)); // false
console.log(someRecursive([4,6,8], val => val > 10)); // false







//FLATTEN ========================================================================
// Write a recursive function called flatten which accepts an array of arrays and returns
// a new array with all values flattened.

function flatten(arr){
	let newArr = [];
	for (let i = 0; i < arr.length; i++) {
		if (Array.isArray(arr[i])){
			newArr = newArr.concat(flatten(arr[i]));
		} else {
			newArr.push(arr[i]);
		}
	}
	return newArr;
}


console.log(flatten([1, 2, 3, [4, 5] ])); // [1, 2, 3, 4, 5]
console.log(flatten([1, [2, [3, 4], [[5]]]])); // [1, 2, 3, 4, 5]
console.log(flatten([[1],[2],[3]])); // [1,2,3]
console.log(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])); // [1,2,3]





//CapitalizeFIRST - ================================================================
//Write a recursive function called capitalizeFirst. Given an array of strings,
//capitalize the first letter in each string.

///////YOU SOLVED THIS ONE ALL ON YOUR OWN - WAY TO GO!!!//////
function capitalizeFirst(arrStr){
	let capArr = [];
	let firstCaps = '';

	for (let i = 0; i < arrStr.length; i++){
		if (arrStr[i][0] === arrStr[i][0].toUpperCase()){
			return arrStr;
		}
	}

	firstCaps = arrStr.map(e => e[0].toUpperCase() + e.substring(1));

	capArr = [...firstCaps];

	arrStr = capArr;

	return capitalizeFirst(arrStr);

};
///////YOU SOLVED THIS ONE ALL ON YOUR OWN - WAY TO GO!!!//////

let myArray = ['car','taco','banana'];

capitalizeFirst(['car', 'taco', 'banana']); // ['Car','Taco','Banana']


//////SAVE THIS ///// THIS IS THE PATTERN FOR CAPITALIZING THE FIRST LTR IN A STR AND
////CONTATENATING IT W/ THE REST OF THE STRINGS///////////////////////////////////
console.log(myArray[0].charAt(0).toUpperCase() + myArray[0].substring(1));
/////////////////////////////////////////////////////////////////////////////////


///TESTING METHODS///
// myArray = myArray.concat(myArray[0][0].toUpperCase());
// console.log(myArray);
// console.log(myArray[0][0]);
// console.log(myArray[1][0].toUpperCase());
// console.log(myArray[1][0]);
// console.log(myArray[2][0].toUpperCase());
// console.log(myArray[2][0]);






//nestedEvenSum======================================================================
// Write a recursive function called nestedEvenSum. Return the sum of all even numbers
// in an object which may contain nested objects.

// function eachRecursive(obj)
// {
//     for (var k in obj)
//     {
//         if (typeof obj[k] == "object" && obj[k] !== null)
//             eachRecursive(obj[k]);
//         else
//             // do something... 
//     }
// }


function nestedEvenSum (obj) {

	// let result = [];

////RECURSIVE OBJECT ITERATION//////
	// let inner = {};

	// for (let i in obj){

	// 	if (typeof obj[i] == "object" && obj[i] !== null) {

	// 		console.log("here is obj[i]: ", obj[i]);

	// 		inner = obj[i];



	// 	} else {

	// 		console.log('ELSE BLOCK REACHED');

	// 		break;

	// 	};
	// }
	// return nestedEvenSum(inner);


/////////////YOU WERE MAKING SOME PROGRESS HERE BELOW (ITERATIVELY/NESTED LOOPS//////////
	let evenNums = [];

	let sum = null;

	for (let k in obj){

		if (typeof obj[k] === 'number' && obj[k] % 2 === 0){

			let outerNum = obj[k];

			evenNums.push(outerNum);

			for (let i = 0; i < evenNums.length; i++){

				return sum += evenNums[i];
			}

		} 

		if (typeof obj[k] === 'object' && obj[k] !== null){

				console.log("hitting block? ELSE IF");

				let innerObj = obj[k];

				obj = innerObj;

		} else {

			console.log("hitting block? ELSE");

			let innerObj = obj[k];

			for (let v in innerObj){

				if (typeof innerObj[v] === 'object' && innerObj[v] !== null){

					let inInnerObj = innerObj[v];

					obj = inInnerObj;

				}


			}

		}

	}

	return nestedEvenSum(obj);

}


var obj1 = {
  outer: 2,
  obj: {
    inner: 2,
    otherObj: {
      superInner: 2,
      notANumber: true,
      alsoNotANumber: "yup"
    }
  }
}

var obj2 = {
  a: 2,
  b: {b: 2, bb: {b: 3, bb: {b: 2}}},
  c: {c: {c: 2}, cc: 'ball', ccc: 5},
  d: 1,
  e: {e: {e: 2}, ee: 'car'}
};

// console.log(nestedEvenSum(obj1)); // 6
// console.log(nestedEvenSum(obj2)); // 10

//////you haven't gotten this one finished yet....//////////////////////////////////


function capitalizeWords (arr) {

  let newArr = [];
  
  for (let i = 0; i < arr.length; i++){
      if (arr[i] === arr[i].toUpperCase()) {
      	console.log(arr);
      	return arr;
      } else {

          newArr = arr.concat(arr.slice(0, 3) + "," + arr[i].toUpperCase());

      }
  }
  return capitalizeWords(newArr);
}

let words = ['i', 'am', 'learning', 'recursion'];
capitalizeWords(words); // ['I', 'AM', 'LEARNING', 'RECURSION']




//////capitalizeWords////////////////////////////////////////////////////////////////
//Write a recursive function called capitalize words. Given an array of words, return
//a new array containing each word capitalized



