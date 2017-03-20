/*!
 * Canvas Clock
 * Simple Canvas Clock
 * 
 * 
 * @author Nour-Eddine ECH-CHEBABY
 * @version 1.0.0
 * @version https://github.com/chebaby/canvas-clock
 * 
 * 
 * Copyright 2017. ISC licensed.
 * 
 */
'use strict';

document.addEventListener('readystatechange', function (event) {

			if (event.target.readyState === 'complete') {
						(function () {

									var canvas = document.getElementById('clock');
									var context = canvas.getContext('2d');
									var canvasWidth = canvas.width;
									var canvasHeight = canvas.height;

									var coordX = canvasWidth / 2;
									var coordY = canvasHeight / 2;

									var hoursRadius = 200;
									var minutesRadius = hoursRadius - 30;
									var secondsRadius = minutesRadius - 30;

									var primaryColor = '#28d1fa';
									var fps = Math.ceil(1000 / 60);
									var factor = Math.PI / 180;

									// Settings
									context.strokeStyle = primaryColor;
									context.lineWidth = 10;
									context.lineCap = 'round';
									context.shadowColor = primaryColor;
									context.shadowBlur = 10;

									var degreeToRadian = function degreeToRadian(degree) {

												return degree * factor;
									};

									var gradient = function gradient() {

												var grad = context.createRadialGradient(coordX, coordY, 5, coordX, coordY, 300);
												grad.addColorStop(0, '#09303a');
												grad.addColorStop(1, 'black');
												return grad;
									};

									var render = function render() {

												var now = new Date();
												var today = now.toDateString();
												var time = now.toLocaleTimeString();
												var hours = now.getHours();
												var minutes = now.getMinutes();
												var seconds = now.getSeconds();
												var milliseconds = now.getMilliseconds();
												var newSeconds = seconds + milliseconds / 1000;

												// Background
												context.fillStyle = gradient();
												context.fillRect(0, 0, canvasWidth, canvasHeight);

												// Hours -- 360° / 24h == 15
												context.beginPath();
												context.arc(coordX, coordY, hoursRadius, degreeToRadian(180 + 90), degreeToRadian(hours * 15 - 90));
												context.stroke();

												// Minutes -- 360° / 60m == 6
												context.beginPath();
												context.arc(coordX, coordY, minutesRadius, degreeToRadian(180 + 90), degreeToRadian(minutes * 6 - 90));
												context.stroke();

												// Seconds -- 360° / 60s == 6
												context.beginPath();
												context.arc(coordX, coordY, secondsRadius, degreeToRadian(180 + 90), degreeToRadian(newSeconds * 6 - 90));
												context.stroke();

												// Text
												context.font = '25px Arial bold';
												context.fillStyle = primaryColor;
												context.fillText(today, 165, 250);

												context.font = '15px Arial';
												context.fillStyle = primaryColor;
												context.fillText(time, 220, 280);
									};

									var initApp = function initApp() {
												console.log('initApp');
												/*setInterval(function() {
            			render();
            		}, fps);*/
												render();
												requestAnimationFrame(initApp);
									};

									initApp();
						})();
			}
}, false);