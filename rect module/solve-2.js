/**
 * Created by gmhanna on 14-Apr-17.
 */
// same as solve-1 but with error handling and callbacks

let rect = require('./rectangle-2');

function solveRect(l,b) {
    console.log("Solving for rectangle with l = " + l + " and b = " + b);
    rect(l, b, function (error, rectangle) {

        if (error) {
            console.log(error);
        }
        else {
            let area = rectangle.area();
            let perimeter = rectangle.perimeter();
            console.log("The area of a rectangle of dimensions length = " + l + " and breadth = " + b + " is: " + area);
            console.log("The perimeter of a rectangle of dimensions length = " + l + " and breadth = " + b + " is: " + perimeter);
        }
    });
}

solveRect(2,4);
solveRect(3,5);
solveRect(-3,5);
