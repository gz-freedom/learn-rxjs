let items = [1, 2, 3, 4, 5];
let myStream = Rx.Observable.from(items).map((item) => {
    console.log(item);
});
// from方法可以接受的参数是数组，类数组，Promise等

let button = document.querySelector(".btn");
let clickStream = Rx.Observable.fromEvent(button, "click").startWith("startup click").map(() => [1, 2, 3]);

myStream.subscribe((item) => {
    //console.log(item);
});

clickStream.subscribe((result) => {
    console.log(result);
});

/*----------------------------------------------------------------------------------------------------------------*/
let input = document.getElementById("todo");
let btn = document.getElementById("addBtn");

let input$ = Rx.Observable.fromEvent(input, "keyup").pluck("target", "value");
// pluck可以理解成对一个嵌套对象进行属性查找，比如在这里keyup事件流返回的obj对象，那么pluck("target", "value")就相当于obj.target.value
let btn$ = Rx.Observable.fromEvent(btn, "click").mapTo("clicked");
// mapTo是一个简化版的map，相当于.map(() => "clicked");

Rx.Observable.combineLatest(input$, btn$, (ev, input) => {
  return {
    ev: ev,
    input: input
  }
}).subscribe(v => console.log(v));

/*----------------------------------------------------------------------------------------------------------------*/