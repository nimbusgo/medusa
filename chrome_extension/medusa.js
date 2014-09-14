
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    return xhr;
}


var medusaFuncs = {

    main: function(){
        var tweets = document.querySelectorAll("div.tweet");
        for (i=0; i<tweets.length; i++){
            var tweet = tweets[i];
            medusaFuncs.addFedora(tweet);
        }
    },

    addFedora: function(tweet){

        var tweetAction = tweet.querySelector(".tweet-actions");

        var listItem = document.createElement("li.fedora");
        var a = document.createElement("a");
        var span = document.createElement("span");
        var b = document.createElement("b");
        var text = document.createTextNode("Fedora");
        
        a.addEventListener("click", function () {
            var content = tweet.querySelector("div.content");
            var context = tweet.querySelector("div.context");
            var tweetLink = content.querySelector("a.tweet-timestamp").getAttribute("href");
            console.log("fedora");
            console.log(content);
            var initData = document.querySelector("#init-data");
            var screenName = JSON.parse(initData.getAttribute("value")).screenName;
            console.log(screenName);
            var data = {tweet_link: tweetLink,
                        screen_name: screenName};
            medusaFuncs.postFedora(data);
        });

        b.appendChild(text);
        span.appendChild(b);
        a.appendChild(span);
        listItem.appendChild(a);

        var firstLi = tweetAction.querySelector("li");
        tweetAction.insertBefore(listItem, firstLi);

        return listItem;
    },

    postFedora: function(data){
        var xhr = createCORSRequest('POST', "http://localhost:5000/post_fedora");
        xhr.onload = function (){
            console.log(xhr.responseText);
        };
        xhr.onerror = function() {
            console.log('There was an error!');
        };
        xhr.send(JSON.stringify(data));
    },

    getFedoras: function(){
        var xhr = createCORSRequest('GET', "http://localhost:5000/get_fedoras");
        xhr.onload = function (){
            console.log(xhr.responseText);
        }
        xhr.onerror = function() {
            console.log('There was an error!');
        };
        xhr.send();
    }
};

medusaFuncs.main();

//var pageContainer = document.querySelector("div#page-container");
//pageContainer.addEventListener('DOMNodeInserted', function () {
//    console.log('DOMNodeInserted');
//    console.log(event);
//
//});
//  console.log('DOM CONTENT LOADED');
//});
//
//document.onload = function () {
//    console.log('document on load');
//};


//document.addEventListener('DOMContentLoaded', function () {
//    kittenGenerator.requestKittens();
//});
//document.onload =
//document.onload(function () {
//    console.log('document on load');
//});
//window.onload(function () {
//    console.log('window on load');
//});

