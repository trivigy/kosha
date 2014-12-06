<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Ksenia Dominova</title>
<link href="_css/reset.css" rel="stylesheet" type="text/css" />
<link href="_css/main.css" rel="stylesheet" type="text/css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
<script type="text/javascript" charset="utf-8" src="_lib/jquery.tubular.1.0.js"></script>
<script type="text/javascript" charset="utf-8" src="_lib/audioPlayer.js"></script>
<script type="text/javascript" charset="utf-8" src="_lib/script.js"></script>
<script>
$(document).ready(function () {
	$('#wrapper').tubular({
		videoId: 'uVsP-jGATBc',
		shieldImage: "url(../_img/overlay.png)"
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
	<div class="opaque" id="about">
	</div>
	<div class="transparent" id="social">
		<span><a href="https://www.facebook.com/kse.sha.1" target="_blank"><span class="icon-facebook-circled social-icon"></span></a></span>
		<span><a href="www.linkedin.com/pub/ksenia-dominova/21/618/b45" target="_blank"><span class="icon-linkedin-circled social-icon"></span></a></span>
		<span><a href="https://twitter.com/Kseshka" target="_blank"><span class="icon-twitter-circled social-icon"></span></a></span>
		</div>
	<div class="transparent" id="equalizer">
		<div id="audioWrapper"></div>
	</div>
	<div class="opaque" id="extra"> </div>
	<div class="transparent temp"> </div>
</div>
</body>
</html>