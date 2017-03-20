document.addEventListener('readystatechange', function(event) {

	if (event.target.readyState === 'complete') {

		let canvas          = document.getElementById('clock');
		let context         = canvas.getContext('2d');
		let canvasWidth     = canvas.width;
		let canvasHeight    = canvas.height;
		
		let coordX          = canvasWidth / 2;
		let coordY          = canvasHeight / 2;
		
		
		let hoursRadius     = 200;
		let minutesRadius   = hoursRadius - 30;
		let secondsRadius   = minutesRadius - 30;
		
		let primaryColor    = '#28d1fa';
		const fps           = Math.ceil(1000/60);
		const factor        = Math.PI / 180;
		
		// Settings
		context.strokeStyle = primaryColor;
		context.lineWidth   = 10;
		context.lineCap     = 'round';
		context.shadowColor = primaryColor;
		context.shadowBlur  = 10;


		let degreeToRadian = function(degree) {

			return degree * factor;
		};


		let gradient = function() {

			let grad = context.createRadialGradient(coordX, coordY, 5, coordX, coordY, 300);
			grad.addColorStop(0, '#09303a');
			grad.addColorStop(1, 'black');
			return grad;
		};


		let render = function() {

			let now          = new Date();
			let today        = now.toDateString();
			let time         = now.toLocaleTimeString();
			let hours        = now.getHours();
			let minutes      = now.getMinutes();
			let seconds      = now.getSeconds();
			let milliseconds = now.getMilliseconds();
			let newSeconds   = seconds + (milliseconds/1000);

			// Background
			context.fillStyle = gradient();
			context.fillRect(0, 0, canvasWidth, canvasHeight);


			// Hours -- 360° / 24h == 15
			context.beginPath();
			context.arc(coordX, coordY, hoursRadius, degreeToRadian(180+90), degreeToRadian((hours*15)-90));
			context.stroke();

			// Minutes -- 360° / 60m == 6
			context.beginPath();
			context.arc(coordX, coordY, minutesRadius, degreeToRadian(180+90), degreeToRadian((minutes*6)-90));
			context.stroke();

			// Seconds -- 360° / 60s == 6
			context.beginPath();
			context.arc(coordX, coordY, secondsRadius, degreeToRadian(180+90), degreeToRadian((newSeconds*6)-90));
			context.stroke();

			// Text
			context.font = '25px Arial bold';
			context.fillStyle = primaryColor;
			context.fillText(today, 165, 250);

			context.font = '15px Arial';
			context.fillStyle = primaryColor;
			context.fillText(time, 220, 280);
		};


		let initApp = function() {
			console.log('initApp');
			/*setInterval(function() {

				render();

			}, fps);*/
			render();
			requestAnimationFrame(initApp);
		};
		
		initApp();
	}

}, false);

