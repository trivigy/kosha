<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Portfolio</title>
<link href="_css/reset.css" rel="stylesheet" type="text/css" />
<link href="_css/main.css" rel="stylesheet" type="text/css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
<script type="text/javascript" charset="utf-8" src="_lib/jquery.tubular.1.0.js"></script>
<script type="text/javascript" charset="utf-8" src="_lib/audioPlayer.js"></script>
<script type="text/javascript" charset="utf-8" src="_lib/script.js"></script>
<script>
$(document).ready(function () {
	$('#wrapper').tubular({
		videoId: 'f-5McdCoY1Q',
		shieldImage: "url(_img/overlay.png)"
	});
	
	$(window).ready(function(e) {
		$(".transparent:first").css("width", $(window).width());
		if ($(window).height() >= 750) {
			$(".transparent:first").css("height", "775px");
		}
		else {
			$(".transparent:first").css("height", "645px");
		}
	});
	
	$(window).load(function () {
		$("#audioWrapper").audioPlayer({
			fx: "bars",
			width: 125,
			height: 35,
			color: [255,255,255,0.65],
			shuffle: true,
			playlist: [
				{src: "_media/audio0001.mp3"},
				{src: "_media/audio0002.mp3"},
				{src: "_media/audio0003.mp3"},
				{src: "_media/audio0004.mp3"},
				{src: "_media/audio0005.mp3"},
				{src: "_media/audio0006.mp3"},
				{src: "_media/audio0007.mp3"},
				{src: "_media/audio0008.mp3"},
				{src: "_media/audio0009.mp3"}
			]
		});
		
		$("#audioWrapper").audioPlayer().play();
	});
});
</script>
</head>
<body>
<div id="wrapper">
	<div id="logo">
		<img src="_img/logo.png" width="600" height="600"  alt="Logo Image"/>
	</div>
	<div class="transparent"> </div>
	<div class="opaque" id="about" style="color: #FFF; text-align: center;">
		<h1 style="font-size: 100px; position: relative; top: 50%; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%);">CONTENT</h1>
	</div>
	<div class="transparent" id="social">
		<span><a href="" target="_blank"><span class="icon-facebook-circled social-icon"></span></a></span>
		<span><a href="" target="_blank"><span class="icon-linkedin-circled social-icon"></span></a></span>
		<span><a href="" target="_blank"><span class="icon-twitter-circled social-icon"></span></a></span>
		</div>
	<div class="transparent" id="equalizer">
		<div id="audioWrapper"></div>
	</div>
	<div class="opaque" id="extra" style="color: #FFF; text-align: center;">
		<h1 style="font-size: 100px; position: relative; top: 50%; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%);">CONTENT</h1>
	</div>
	<div class="transparent temp"> </div>
</div>
</body>
</html>