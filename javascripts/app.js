var main = function () {
	"use strict";

	var getSearchWord = function () {
		var $new_word;

		if ($(".search-input input").val() !== "") {
			$new_word = $("<p>").text($(".search-input input").val());
			$(".search-input input").val("");
			console.log($new_word);
		}
		var url = "http://api.flickr.com/services/feeds/photos_public.gne?tags=" +
			$new_word[0].textContent + "&format=json&jsoncallback=?";
		console.log($new_word[0].textContent);
		
		$.getJSON(url, function (flickrResponse) {
			// 受け取ったJSONオブジェクトをコンソールに表示
			console.log(flickrResponse);
			
			var displayPhoto = function (photoIndex) {
				var $img = $("<img>").hide();
				$img.attr("src", flickrResponse.items[photoIndex].media.m);
				$("main .photos").empty();
				$("main .photos").append($img);
				$img.fadeIn();
				
				var time_id = setTimeout(function () {
					photoIndex = (photoIndex + 1) % flickrResponse.items.length;
					displayPhoto(photoIndex);
				}, 3000);

                $(".search-input button").on("click", function (event) {
                    clearTimeout(time_id);
                });
                $(".search-input input").on("keypress", function (event) {
                    clearTimeout(time_id);
                });
			};
			displayPhoto(0);
		});
	};
	
	$(".search-input button").on("click", function (event) {
		getSearchWord();
	});
	$(".search-input input").on("keypress", function(event) {
		if (event.keyCode === 13) {
            getSearchWord();
        }
	});
};

$(document).ready(main);