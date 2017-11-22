$(document).ready(function(){

	function getDigg(){
		$.get("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json", function(results){

			//var res = results.data.feed;
			//console.log(res.length);

		  	results.data.feed.forEach(function(result){

		  		var tagListFull = "";

		  		var searchStr = "http://digg.com/search?q=";

		  		for (var i = 0; i < result.content.tags.length; i++){

		  			var tag = result.content.tags[i].display_name;

		  			var tagStr = tag.replace(/ /g,"+");

		  			tagListFull += "<a href = '" + searchStr + tagStr + "'> " + tag + "</a> |";

		  			var lastChar = tagListFull.lastIndexOf("|");
		  			var tagList = tagListFull.substring(0, lastChar);
		  		}
		  		  		
		  	//result.content... with divs (hidden) added here, so info is available for #popup

			  	$("#main").append("<article class='article diggArticle'><div class='article_hidden'><div class='article_description'>" + result.content.description + "</div><div class='article_title'>" + result.content.title + "</div><div class='article_url'>" + result.content.url + "</div></div><section class='featuredImage'><div class='image-cropper'><img src=" + result.content.media.images[i].original_url + "></div></section><section class='articleContent'><a href='#'><h3>" + result.content.title + "</h3></a><h6>"+ tagList + "</h6></section><section class='impressions'>" + result.digg_score + "</section><div class='clearfix'></div></article>");  	
		  	
			//result.content.media.images[i].url displays a "..._blurred.jpeg" image for some articles, not found in results json, & not shown when checking HTML for affected articles
			});
		});
	}

	function getBuzzfeed(){

		$.get("https://accesscontrolalloworiginall.herokuapp.com/http://www.buzzfeed.com/api/v2/feeds/news", function(results){
//"https://accesscontrolalloworiginall.herokuapp.com/http://www.buzzfeed.com/api/v2/feeds/news"
		  	results.big_stories.forEach(function(result){

		  		var tagList = "";
				var tagListFull = "";

		  		var searchStr = "https://www.buzzfeed.com/search?q=";

		  		var urlRoot = "https://www.buzzfeed.com";

		  		function titleCase(str) {
					str = str.toLowerCase().split(' ');
					for (var i = 0; i < str.length; i++) {
				    	str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
				  }
				  return str.join(' ');
				};

		  		for (var i = 0; i < result.tags.length; i++){
		  			//console.log(result.tags[1]);
		  			var tag = result.tags[i];
		  			
		  			if (tag.charAt(0) != "-"){
		  				
		  				var capTag = titleCase(tag);
		  				var tagStr = capTag.replace(/ /g,"+");
		  				tagListFull += "<a href = '" + searchStr + tagStr + "'> " + capTag + "</a> |";
		  			} 		
		  		}
		  		var lastChar = tagListFull.lastIndexOf("|");
				tagList = tagListFull.substring(0, lastChar);	

		  	//result.content... with divs (hidden) added here, so info is available for #popup

				$("#main").append("<article class='article buzzArticle'><div class='article_hidden'><div class='article_description'>" + result.description + "</div><div class='article_title'>" + result.title + "</div><div class='article_url'>" + urlRoot + result.canonical_path + "</div></div><section class='featuredImage'><div class='image-cropper'><img src=" + result.images.standard + "></div></section><section class='articleContent'><a href='#'><h3>" + result.title + "</h3></a><h6>" + tagList + "</h6></section><section class='impressions'>" + result.impressions + "</section><div class='clearfix'></div></article>");  

			});
		});
	}

	getDigg();
	getBuzzfeed();

	//if user clicks on article, shows #popup on .this
	$(document).on("click", ".article", function(){
		//alert();
		var title = $(this).find(".article_title").text();
		$('#popUp').find('h1').text(title);
		var desc = $(this).find(".article_description").text();
		$('#popUp').find('p').text(desc);
		var link = $(this).find(".article_url").text();
		$('#popUp').find('.container a').attr("href", link);
		$('#popUp').removeClass("hidden").removeClass("loader");
	});

	//close #popup when x clicked
	$(document).on("click", ".closePopUp", function(){
		$('#popUp').addClass("hidden").addClass("loader");
	});

	//"filter" by news source
	$(document).on("click", "#buzzfeed", function(){
				console.log("buzz clicked!");
		$('.buzzArticle').show();
		$('.diggArticle').hide();
		});

	$(document).on("click", "#digg", function(){
		$('.diggArticle').show();
		$('.buzzArticle').hide();				
	});

	//clicking "Feedr" shows all feeds; using $(document).on for this disables source dropdown menu
	//$(document).on("click", "header:first-child", function(){
	$("header:first-child").on("click", function(){
		$('.diggArticle').show();
		$('.buzzArticle').show();			
	});

	//toggle search icon when clicked
	$(document).on("click", "#search", function(){
		$(this).toggleClass("active");
	});

});