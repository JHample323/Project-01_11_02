/*  Project 01_11_02

    Author: 
    Date:   

    Filename: script.js
*/

"use strict";

// Global Variables
var httpRequest = false;
var entry = "^IXIC";

// Create a function for getRequestObject
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest();
    } catch (requestError) {
        return false;
    }
    alert(httpRequest);
    return httpRequest;
}
test
