let items = [1, 2, 3, 4, 5];
let myStream = Rx.Observable.from(items).startWith("click");

let button = document.querySelector(".btn");
let clickStream = Rx.Observable.fromEvent(button, "click");

// myStream.subscribe((item) => {
//     console.log(item);
// });

clickStream.subscribe((result) => {
    console.log(result);
});