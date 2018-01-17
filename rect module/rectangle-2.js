/**
 * Created by gmhanna on 14-Apr-17.
 */

module.exports = (x,y,callback)=> {

    try {

        if (x < 0 || y < 0) {
            throw new Error("Rectangle dimensions should be greater than 0");
        }
        else {
            callback(null, {perimeter: () => 2 * (x + y), area: () => x * y});
        }
    } catch (error) {
        callback(error, null);
    }
};