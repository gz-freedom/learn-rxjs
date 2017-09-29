let refreshButton = document.querySelector('.refresh');
let closeButton1 = document.querySelector(".close1");
let closeButton2 = document.querySelector(".close2");
let closeButton3 = document.querySelector(".close3");

let refreshClickStream = Rx.Observable.fromEvent(refreshButton, "click");
let closeStream1 = Rx.Observable.fromEvent(closeButton1, "click");
let closeStream2 = Rx.Observable.fromEvent(closeButton2, "click");
let closeStream3 = Rx.Observable.fromEvent(closeButton3, "click");

let requestStream = refreshClickStream.startWith('startup click').map(() => {
    let randomOffset = Math.floor(Math.random() * 500);
    return 'https://api.github.com/users?since=' + randomOffset;
});

let responseStream = requestStream.flatMap(url => {
    return Rx.Observable.fromPromise(jQuery.getJSON(url));
});

let suggestion1Stream = responseStream.map((listUsers) => {
    return listUsers[Math.floor(Math.random() * listUsers.length)];
})
.merge(refreshClickStream.map( () => null)).startWith(null);

let suggestion2Stream = responseStream.map((listUsers) => {
    return listUsers[Math.floor(Math.random() * listUsers.length)];
});

let suggestion3Stream = responseStream.map((listUsers) => {
    return listUsers[Math.floor(Math.random() * listUsers.length)];
});

let renderSuggestion = (suggestedUser, selector) => {
    let $suggestionSelector = $(selector);
    if(!suggestedUser) {
        $suggestionSelector.css("visibility", "hidden");
    } else {
        $suggestionSelector.css("visibility", "visible");
        let $userName = $suggestionSelector.find(".username");
        $userName.attr("href", suggestedUser.html_url);
        $userName.text(suggestedUser.login);

        let $img = $suggestionSelector.find("img");
        $img.attr("src", suggestedUser.avatar_url);
    }
}

suggestion1Stream.subscribe((suggestion) => {
    renderSuggestion(suggestion, ".suggestion1");
});
suggestion2Stream.subscribe((suggestion) => {
    renderSuggestion(suggestion, ".suggestion2");
});
suggestion3Stream.subscribe((suggestion) => {
    renderSuggestion(suggestion, ".suggestion3");
});

