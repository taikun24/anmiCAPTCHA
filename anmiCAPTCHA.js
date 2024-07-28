
function _onload(){
	document.body.innerHTML += `<style>.form{
			margin: auto auto;
		}
		.fullscreen{
			margin: 0px 0px;
			width: 100%;height: 100%;
		}
		body{
			background-color:rgba(255,255,255,0.8);
			background-blend-mode:lighten;
			background-size: cover;
			display: flex;
			align-items: center;
		}
		.anmiCAPTCHA{
			/*777:191*/
			width: 388px;height: 95px;margin: auto auto;
		}
		.popup{
			position:absolute;top:15%;left:25%;
			min-width: 350px;
			width: 50%;
			height: 70%;
			background-color: white;
			border: black 2px;border:4px solid lightgray;border-radius: 3px;
		}
		@media (max-width: 600px) {
		  .popup{
		  	left:5%;
		  }
		}
		.title{
			display: flex;
			margin: 1.25% 1.25%;
			width: 93.5%;
			height: 20%;
			background-color: #4285F4;
			padding: 2% 2%;
		}

		#select{
			margin: 1.25% 1.25%;
			width: 93.5%;
			padding: 2% 2%;
			height: 40%;
			background-color: lightgray;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			overflow-y: scroll;
		}
		#button_captcha{
			margin-left:2%;width: 7.7%;height: 33%;background-color: snow;margin-right: 4%;border: black 2px;border:3px solid lightgray;border-radius: 2px;display: flex;align-items: center;
		}
		#icon_x{
			color: red;
			font-size: 500%;
			text-align: center;
			position: relative;
			right: 50%;
		}
		.color_select{
			width:80px;
			height: 80px;
		}
		.progress{
			justify-content: center;
			display: flex;
			margin: 0% 1.25%;
			width: 93.5%;
			height: 20%;
			padding: 2% 2%;
		}
		.fadein {
		  animation-duration: 0.5s;
		  animation-name: fadein;
		}
		@keyframes fadein {
		  from {
		    opacity: 0;
		  }

		  to {
		  	opacity: 1;
		  }
		}</style>`;
		document.body.innerHTML += '<div class="popup" id="popup" style="display:none;"><div class="title"><div><h1 style="color:white;font-size: 30px;margin: 0px 0px;">純色の白(#ffffff)</h1><p style="color:white;font-size: 15px;margin: 0px 0px;">を選択してください</p></div><div style="margin-left:30px;width: 80px;height: 80px;background-color: white;margin-left: 29px;"></div></div><div id="select"></div><div class="progress"><p style="font-size:20px;" id="progg">1 / 5</p></div></div>';
		let cap = document.getElementById('anmiCAPTCHA');
		cap.innerHTML = `<div style="width: 100%;height: 100%;background-color: #f9f9f9;border:1px solid #d3d3d3;border-radius: 10px;"></div>
			<div style="width: 100%;height: 100%;position: relative;top:-100%;left:0px;display: flex;align-items: center;    justify-content: flex-end;">
				<div id ="button_captcha"></div>
				<div style="width: 50%;">
					<p style="font-size: 120%;width: 100%;">私はアンミカです</p>
					<p style="color: red;display: none;" id="retry_captcha">もう一度試してください</p>
				</div>
				<div style="display: flex;align-items: center;flex-direction: column;margin-left: 5%;width: 30%;">
					<img src="https://www.gstatic.com/recaptcha/api2/logo_48.png", style="width:40%;"><p style="font-size:80%;margin: 0px 0px;">anmiCAPTCHA</p>
					<p style="margin: 0px 0px;font-size: 30%;color: gray;">プライバシー・利用規約</p>
				</div>
			</div>`;
		cap.className = 'anmiCAPTCHA';
		setTimeout(function(){
			let link = document.getElementById('button_captcha');
			link.addEventListener(
			  "click",
			  (event) => {
			  	prog = 1;
			  	document.getElementById('progg').innerHTML = prog+' / 5';
			  	document.getElementById('button_captcha').innerHTML='';
			   	show();
			    reset(50);
			  },
			  false,
			);
		});
}
window.onload = _onload;
		let prog = 0;
		function getRandom(range) {
		  return Math.floor(Math.random() * range);
		}
		
		function reset(love){
			correct = false;
			let select = document.getElementById('select');
			select.innerHTML = '';
			const count = 15;
			let index = getRandom(count);
			for (var i = 0; i < count; i++) {
				let r = 255-getRandom(love)-love/2;
				let g = 255-getRandom(love)-love/2;
				let b = 255-getRandom(love)-love/2;
				let new_element = document.createElement('div');
				new_element.className = "color_select";
				if(i==index){
					r=255;g=255;b=255;new_element.addEventListener('click', ok,false);
				}else{new_element.addEventListener('click', ng,false);}
				new_element.style.backgroundColor = 'rgb('+r+','+g+','+b+')';
				select.appendChild(new_element);
			}
		}
		let correct = false;
		function ok(){
			prog++;
			if(prog != 6){
				document.getElementById('progg').innerHTML = prog+' / 5';
				if(prog == 2)reset(20);
				if(prog == 3)reset(10);
				if(prog == 4)reset(4);
				if(prog == 5)reset(2);
			}else{
				document.getElementById('button_captcha').innerHTML='<p id="icon_x">✓</p>';
				document.getElementById('icon_x').style.color = 'green';
				document.getElementById('icon_x').className = 'fadein';
				document.body.style.backgroundImage = 'url("https://miyearnzzlabo.com/wp-content/uploads/2023/07/siro200_R.jpg")';
				let audio = document.getElementById('audio');
				audio.play();
				hide();
				document.getElementById('retry_captcha').style.display = "none";
				correct = true;
			}
		}
		function ng() {
			hide();
			document.getElementById('retry_captcha').style.display = null;
		}
		function show() {
		    document.getElementById('popup').style.display = null;
			document.getElementById('popup').className = 'popup fadein';
		}
		function hide(){
		    document.getElementById('popup').style.display = 'none';
		}