
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    return xhr;
}

var medusaState = {
    waiting: false
};


var medusaFuncs = {

    init: function(){
        medusaFuncs.queueFedoraApplication();
        var homeStream = document.querySelector("div.home-stream");
        if (homeStream != null) {
            homeStream.addEventListener('DOMNodeInserted', function () {
                medusaFuncs.queueFedoraApplication();
            });
        }
        var permaLink = document.querySelector("div.permalink");
        if (permaLink != null) {
            permaLink.addEventListener('DOMNodeInserted', function () {
                medusaFuncs.queueFedoraApplication();
            });
        }
    },

    queueFedoraApplication: function(){
        if (!medusaState.waiting) {
            medusaState.waiting = true;
            setTimeout(function () {
                medusaFuncs.applyFedorasToTweets();
                medusaState.waiting = false;
            }, 300);
        }
    },

    applyFedorasToTweets: function(){
        console.log("calling apply fedoras");
        var tweets = document.querySelectorAll("div.tweet:not(.fedorad)");
        for (i = 0; i < tweets.length; i++) {
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

        tweet.className = tweet.className + " fedorad";

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


medusaFuncs.init();

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

