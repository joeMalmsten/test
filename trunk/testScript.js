/*****************************************************************************\
  Title: testScript.js
 Author: Joseph Malmsten
Purpose: test project for git, node, and less before real coding test
   Date: 2/23/2014
\*****************************************************************************/

//--------------------------- Object definitions ----------------------------\\ 

/*****************************************************************************\
 Object: FibonacciContainer
Purpose: calculates fibonacci number at a desired index, stores all previous
         fibonacci queries
Members: fibList - a list containing objects with information on all previous
                   queries
\*****************************************************************************/
function FibonacciContainer() {
   // Contains all previous function calls(input, output)
   this.fibList = [];
}

// Finds the fibonacci number at the given index, main workhorse function, simple interative version
FibonacciContainer.prototype.fibNumberAtIndex = function(index) {
	// Check for bad indices
	if (typeof(index) !== "number" || index < 0) {
		return -1;
	}

	var a = 0;
	var b = 1;
	for (var i = 0; i < index; i++) {
		var temp = b;
		b = a + b;
		a = temp;
	}
	return a;
}

// This function will call the main fibonacci function, log the result in our array and return the result object
FibonacciContainer.prototype.logFibQuery = function(index) {
	var fibNumber = this.fibNumberAtIndex(index);
	var result = {n: index, fibNumber: fibNumber};
	this.fibList.push(result);
    return result;
}

// This function will return all previous queries into a string for us to dump into a log
FibonacciContainer.prototype.dumpPrevQueries = function() {
	// If we have no entries in our history return an empty string
	if (this.fibList.length <= 0) {
		return "";
	}

	// Let the user know in the logs when the fibonacci history begins, indent all entries belonging to it
	var ret = "FibonacciContainer queries\n";
	for (var x = 0; x < this.fibList.length; ++x) {
		ret += "\t#" + x + ". " + "{index = " + this.fibList[x].n + ", fibNumber = " + this.fibList[x].fibNumber + "}\n";
	}
	return ret;
}

/*****************************************************************************\
 Object: MyContent
Purpose: container for all helper Objects and functions, leaves less on 
         global scope
Members: fibContainer - a instantiation of the FibonacciContainer object
\*****************************************************************************/
function MyContent() {
  // Contains the fibonacci object
  this.fibContainer = new FibonacciContainer();
}

MyContent.prototype.logComment = function(textInput) {

	// Do not attempt to log a comment if it is empty
	if (textInput.length == 0) {
		return;
	}

	// If we have our own debug log element put the message there, otherwise use the base console.log
	var debugLog = document.getElementById("debugLog");
	if (debugLog != null) { 
		debugLog.innerHTML += textInput + "\n";
	} else {
		console.log(textInput);
	}
}

// This helper function checks to make sure we have a valid input, then logs and stores the result for the user
MyContent.prototype.attemptFibAtIndex = function() {
	var fibIndex = document.getElementById("fibIndex");
	var value = -1;

	// Check to make sure the input element exists and was grabbed correctly
	if (fibIndex != null) {
		value = fibIndex.valueAsNumber;
	} else {
		this.logComment("fibIndex is NULL");
	}

	// Make sure that the value > 0, otherwise let them know in the logs
	if (value >= 0) {
		var fibAnswer = this.fibContainer.logFibQuery(value);
		this.logComment("Fib Query: {index = " + fibAnswer.n + ", fibNumber = " + fibAnswer.fibNumber + "}");
	} else {
		this.logComment("value is not valid!");
	}
}

// This will dump every previous query stored in our helper objects
MyContent.prototype.dumpHistory = function() {
	var fibHistory = this.fibContainer.dumpPrevQueries();
	this.logComment(fibHistory);
}

// This will clear the table we are using as a debug log or tells us we don't have one
MyContent.prototype.clearLog = function() {
	var debugLog = document.getElementById("debugLog");
	if (debugLog != null) {
		debugLog.innerHTML = "";
	} else {
		console.log("debugLog textarea is NULL, nothing to clear!");
	}
}

// This is the only real function call inside the "main" of the javascript,
//   everything else should be Handled through event listeners
MyContent.prototype.initTestPage = function() {
	// This is here to make unit testing possible without having to comment out any code
	if(typeof(document) == "undefined"){
		return;
	}

	var fibButton = document.getElementById("fibNumberButton");
	if (fibButton != null) { 
		fibButton.addEventListener("click", this.attemptFibAtIndex.bind(this));
	} else {
		this.logComment("fibNumberButton is NULL");
	}

	var historyButton = document.getElementById("dumpHistoryButton");
	if (historyButton != null) { 
		historyButton.addEventListener("click", this.dumpHistory.bind(this));
	} else {
		this.logComment("dumpHistoryButton is NULL");
	}

	var clearLogButton = document.getElementById("clearLogButton");
	if (clearLogButton != null) { 
		clearLogButton.addEventListener("click", this.clearLog.bind(this));
	} else {
		this.logComment("clearLogButton is NULL");
	}
}
//----------------------------- End definitions ----------------------------\\

//------------------------------- Start code -------------------------------\\
var myContent = new MyContent();
myContent.initTestPage();
//------------------------------- End code ----------------------------------\\


/********* Comment this section out when we want to run our website **********\
//-------------------------- Start unit testing -----------------------------\\
var assert = require("assert");
describe ("FibonacciContainer.fibNumberAtIndex():", function() {
	it ("should return the fibonacci number at the given indices [0, 99]", function() {
		// An array containing the first 100 fibonacci numbers
		var fibTestArray = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 
		10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269, 2178309, 3524578, 5702887, 
		9227465, 14930352, 24157817, 39088169, 63245986, 102334155, 165580141, 267914296, 433494437, 701408733, 1134903170, 
		1836311903, 2971215073, 4807526976, 7778742049, 12586269025, 20365011074, 32951280099, 53316291173, 86267571272, 
		139583862445, 225851433717, 365435296162, 591286729879, 956722026041, 1548008755920, 2504730781961, 4052739537881, 
		6557470319842, 10610209857723, 17167680177565, 27777890035288, 44945570212853, 72723460248141, 117669030460994, 
		190392490709135, 308061521170129, 498454011879264, 806515533049393, 1304969544928657, 2111485077978050, 3416454622906707, 
		5527939700884757, 8944394323791464, 14472334024676220, 23416728348467684, 37889062373143900, 61305790721611580, 
		99194853094755490, 160500643816367070, 259695496911122560, 420196140727489660, 679891637638612200, 1100087778366101900, 
		1779979416004714000, 2880067194370816000, 4660046610375530000, 7540113804746346000, 12200160415121877000, 19740274219868226000, 
		31940434634990100000, 51680708854858330000, 83621143489848430000, 135301852344706760000, 218922995834555200000];

		var retval = -1;
		for (var i = 0; i < fibTestArray.length; ++i) {
			retval = myContent.fibContainer.fibNumberAtIndex(i);
			assert.equal(retval, fibTestArray[i]);
		}
	});

	it ("should return -1 at any index not a non-negative number [0, ∞]", function() {
		// An array containing all invalid inputs
		var fibInputArray = [-1, -1, -2, -3, -5, -8, -13, -21, -34, -55, -89, -144, -233, -377, -610, -987, -1597, -2584, -4181, -6765, 
		-10946, -17711, -28657, -46368, -75025, -121393, -196418, -317811, -514229, -832040, -1346269, -2178309, -3524578, -5702887,
		"test", "djflsj;df", "12x2", "0x", "", null, "0", "1", false, true];

		var retval = -1;
		for (var i = 0; i < fibInputArray.length; ++i) {
			retval = myContent.fibContainer.fibNumberAtIndex(fibInputArray[i]);
			assert.equal(retval, -1);
		}
	});
});
//---------------------------- End unit testing -----------------------------\\
\*****************************************************************************/

