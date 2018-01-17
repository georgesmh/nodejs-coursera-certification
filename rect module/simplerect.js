/**
 * Created by gmhanna on 10-Apr-17.
 */

let rect = {
    perimeter: function (x, y) {
        return 2 * (x + y);
    },
    area: function (x, y) {
        return x * y;
    }
};

function solveRect(l,b) {
    console.log("Solving for rectangle with l = " + l + " and b = " + b);

    if (l < 0 || b < 0) {
        console.log("Rectangle dimensions should not be 0");
    }
    else {
        let area = rect.area(l, b);
        let perimeter = rect.perimeter(l, b);
        console.log("The area of a rectangle of dimensions length = " + l + " and breadth = " + b + " is: " + area);
        console.log("The perimeter of a rectangle of dimensions length = " + l + " and breadth = " + b + " is: " + perimeter);
    }
}

solveRect(2,4);
solveRect(3,5);
solveRect(-3,5);
