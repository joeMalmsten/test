/*****************************************************************************\
  Title: testScript.js
 Author: Joseph Malmsten
Purpose: test project for git, node, and less before real coding test
   Date: 2/23/2014
\*****************************************************************************/

//--------------------------- Object Definitions ----------------------------\\ 

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
	var a = 0;
	var b = 1;
	for(var i = 0; i < index; i++) {
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
//----------------------------- End Definitions ----------------------------\\

//------------------------------- Start Code -------------------------------\\
var myContent = new MyContent();
myContent.initTestPage();
//------------------------------- End Code ----------------------------------\\
