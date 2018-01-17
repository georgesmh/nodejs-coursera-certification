/**
 * Created by gmhanna on 10-Apr-17.
 */


// exports.perimeter = function(x,y){
//     return 2*(x+y);
// };

// exports.area = function(x,y){
//     return x*y;
// };



// OR: -----------------------------------------------

// module.exports = function(){
//     return{
//         perimeter: function(x,y){
//             return 2*(x+y);
//         },
//         area: function(x,y){
//             return x*y;
//         }
//     }
// };


// OR: -----------------------------------------------

// module.exports = ()=>{
//     return{
//         perimeter: (x,y)=>2*(x+y),
//         area: (x,y)=> x*y
//     }
// };

module.exports  = ()=> {
    return {
        perimeter: (x, y) => 2 * (x + y),
        area: (x, y) => x * y
    };
};
// OR: -----------------------------------------------

// exports.perimeter = (x,y)=>2*(x+y);
// exports.area = (x,y)=>(x*y);
//
