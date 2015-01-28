var main = function () {
	"use strict";

	var url = "http://api.flickr.com/services/feeds/photos_public.gne?" +
			  "tags=cats&format=json&jsoncallback=?";


    $.getJSON(url, function (flickrResponse) {
        // 受け取ったJSONオブジェクトをコンソールに表示
		console.log(flickrResponse.items);

        var displayPhoto = function (photoIndex) {
            var $img = $("<img>").hide();
            $img.attr("src", flickrResponse.items[photoIndex].media.m);
            $("main .photos").empty();
            $("main .photos").append($img);
            $img.fadeIn();

            setTimeout(function () {
                photoIndex = (photoIndex + 1) % flickrResponse.items.length;
                displayPhoto(photoIndex);
            }, 3000);
        };

        displayPhoto(0)
    });
};

$(document).ready(main);