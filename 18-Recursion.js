// Recursion
// ========= 
// Essentially a funtion being able to call/invoke itself

// example 
function func1 (num, exp){
	if ( exp === 0){
		return 1;
	}
	return num * func2(num, exp -1);
}

	function func2 (num, exp){
		if ( exp === 0){
			return 1;
		}
		return num * func3(num, exp -1);
	}

		function func3 (num, exp){
			if ( exp === 0){
				return 1;
			}
			return num * func4(num, exp -1);
		}

			function func4 (num, exp){
				if ( exp === 0){
					return 1;
				}
				alert("this number is too big!");
			}

var answer = func1(4,3);
console.log(answer);

// WHat happens if you put in a bigger exponent?
// simplifying the code using recursion

function func1 (num, exp){
	if ( exp === 0){
		return 1;
	}
	return num * func1(num, exp -1);
}

var answer = func1(4,3);
console.log(answer);


function funct(a,b){

	return number * x(a,b);
}
