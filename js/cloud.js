export class Cloud {
    constructor() {
        this.points = [];
    }

    addPoint(point) {
        this.points.push(point);
    }
}

// document.onkeydown = function(e) {
//     console.log('e: ');
//     switch (e.key) {
//         case 'w':
//             console.log('w');
//             break;
//         case 's':
//             console.log('s');
//             break;
//         case 'a':
//             console.log('a');
//             break;
//         case 'd':
//             console.log('d');
//             break;
//     }
// };
// document.onkeyup = function(e) {
//     console.log('e: ');
//     switch (e.key) {
//         case 'w':
//             console.log('w');
//             break;
//         case 's':
//             console.log('s');
//             break;
//         case 'a':
//             console.log('a');
//             break;
//         case 'd':
//             console.log('d');
//             break;
//     }
// };

// document.onmousedown = function(e) {
//     mouseOriginalPosition.x = e.clientX;
//     mouseOriginalPosition.y = e.clientY;
//     // console.log(e.clientX);
//     // console.log(e.clientY);
//     document.onmousemove = function(e) {
//         mouseNewPosition.x = e.clientX;
//         mouseNewPosition.y = e.clientY;

//         // if (mouseNewPosition.x > mouseOriginalPosition.x) {

//         // }
//         // console.log(e.clientX);
//         // console.log(e.clientY);
//     }
// }
// document.onmouseup = function(e) {
//     document.onmousemove = undefined;
// }