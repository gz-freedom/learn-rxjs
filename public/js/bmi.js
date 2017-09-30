let weightInput = document.getElementById("weight");
let heightInput = document.getElementById("height");

let weightStream = Rx.Observable.fromEvent(weightInput, "keyup").pluck("target", "value");
let heightStream = Rx.Observable.fromEvent(heightInput, "keyup").pluck("target", "value");

Rx.Observable.combineLatest(weightStream, heightStream, (w, h) => {
    return {
        w: w,
        h: h
    };
}).subscribe((v) => {
    let bmi = v.w / ((v.h/100) * (v.h/100));
    document.getElementById("bmi").innerHTML = bmi;
});

// combineLatest 操作符其实是在组合2个源数据流中选择最新的2个数据进行配对，如果其中一个源之前没有任何数据产生，那么结果流也不会产生数据
// 在这里，只输入体重而没有输入身高是不会有数据产生的