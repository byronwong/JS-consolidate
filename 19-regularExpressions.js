// Regular Expressions
// ===================

var myString = "The quick brown fox jumps over the lazy dog";

// strings have a search function which take a  regular expression
// you can enter in literals
myString.search(/quick/); //


myString.search(/[a-z]*/); // characters [a-z] any number *
// retuns: an offset 0
// NOTE: include spaces


myString.search(/[a-z]{5}\b/);// looking for 5 characters [a-z], word boundary \b 
// returns: an offset of 4


// Example 2
// ---------
var myString = "my zip is 01720 what is yours?";
var offset = myString.search(/\b[0-9]{5}\b/);
// returns offset: 10


// Example 3
// ---------
var myString = "my zip is 01720-1234 what is yours?";
var offset = myString.search(/\b[0-9]{5}(?:-[0-9]{4})?\b/);
// returns offset: 10

// To generate reg ex we can use a tool
// http://www.regexbuddy.com/
// http://regexlib.com/?AspxAutoDetectCookieSupport=1