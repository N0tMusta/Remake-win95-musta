
// Fix the Image creation issue. The error is: "Only a void function can be called with the 'new' keyword" and "Expected 1 arguments, but got 0"

// Change this line:
// const img = new Image();

// To this:
const img = document.createElement('img');
