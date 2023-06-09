var FPS = 60;
	setInterval(Animate,1000/FPS);
	var K_Value = Math.random() * 10 + 1;
	var Function_Type = Math.random() * 3;
	var Duration = 20000;
	var Time_Interval = 1;
	var Time;
	var ShowRuler = false;
	var Paused = true;
	var AnimationSpeed = 0.01;
	
	var pxpercm = 10; 
	
	var color_obj_pure = generateColorObj();
	var color_obj;
	
	
	function print(s) {
		document.getElementById("debuglog").innerHTML = s;
	}
	
	function NewSim() {
		document.getElementById("btn_replay").style.display = "inline";
		// generate new color parameters
		color_obj_pure = generateColorObj();
		
		color_obj = createError(color_obj_pure);
		
		ReplaySim();
	}
	
	function createError(pure) {
		var obj = [
			pure[0],
			pure[1],
			pure[2]
		];
		
		for (var i = 1; i < pure.length; i++) {
			obj[i][1] = obj[i][1] + Math.random() * 2 * pxpercm - pxpercm;
		}
		
		return obj;
	}
	
	function shuffle(c) {

		for (var i = 0; i < c.length - 1; i++) {
			var k = Math.round(Math.random() * (c.length - 1));
			var kth = c[k];
			var ith = c[i];
			c[i] = kth;
			c[k] = ith;
		}
		
		return c;
	}
	
	function HSLToRGB(h,s,l) {

		s /= 100;
		l /= 100;

	  let c = (1 - Math.abs(2 * l - 1)) * s,
		  x = c * (1 - Math.abs((h / 60) % 2 - 1)),
		  m = l - c/2,
		  r = 0,
		  g = 0,
		  b = 0;

	  if (0 <= h && h < 60) {
		r = c; g = x; b = 0;
	  } else if (60 <= h && h < 120) {
		r = x; g = c; b = 0;
	  } else if (120 <= h && h < 180) {
		r = 0; g = c; b = x;
	  } else if (180 <= h && h < 240) {
		r = 0; g = x; b = c;
	  } else if (240 <= h && h < 300) {
		r = x; g = 0; b = c;
	  } else if (300 <= h && h < 360) {
		r = c; g = 0; b = x;
	  }
	  r = Math.round((r + m) * 255);
	  g = Math.round((g + m) * 255);
	  b = Math.round((b + m) * 255);

	  return [r,g,b];
	}

	
	function generateColorObj() {
	
		var h = Math.random() * 360;
		
		
		var c1 = HSLToRGB(h,30,40);
		
		var h2 = h - 60;
		h2 = h2 < 0 ? 360 - h2 : h2;
		
		var c2 = HSLToRGB(h2,70,80);
		
		var h3 = h + 60;
		h3 = h3 > 360 ? h3 - 360 : h3;
		
		var c3 = HSLToRGB(h3,70,80);

		
		var obj = 
		[
			[
				rgbToHex(c1[0],c1[1],c1[2]),
				0
			],
			[
				rgbToHex(c2[0],c2[1],c2[2]),
				Math.random() * 30
			],
			[
				rgbToHex(c3[0],c3[1],c3[2]),
				50 + Math.random() * 100
			]
		];
	
		return obj;
	}
	
	function generateColorObjjj() {
	
		var c = [255, 255, 100];
		if (Math.random() > 0.5) {
			c = [255, 150, 100];
		}
		
		c = shuffle(c);
	
		var factor = [1,0.5,0];
		
		factor = shuffle(factor);
		

		var c1 = [c[0], c[1], c[2]];
		var c2 = [0,0,0];
		var c3 = [0,0,0];

		
		for (var i = 0; i < c.length; i++) {
			c2[i] = Math.round(c1[i] * factor[i]);
			c1[i] = Math.round(c1[i] - c1[i] * factor[i]);
		}
		
		factor = shuffle(factor);
		
		for (var i = 0; i < c.length; i++) {
			c3[i] = Math.round(c1[i] * factor[i]);
			c1[i] = Math.min(250, Math.round(c1[i] + c1[i] * factor[i]));
		}
	
		var obj = 
		[
			[
				rgbToHex(c1[0],c1[1],c1[2]),
				0
			],
			[
				rgbToHex(c2[0],c2[1],c2[2]),
				Math.random() * 30
			],
			[
				rgbToHex(c3[0],c3[1],c3[2]),
				50 + 160 // Math.random() * 70
			]
		];
		

		return obj;
	}
	
	function ReplaySim() {
		Paused = false;
		color_obj = createError(color_obj_pure);
		LastTime = Date.now();
		timer_counter = 0;
	}
	
	function Pause() {
		Paused = !Paused;
	}
	
	var LastTime = -1;
	var timer_counter = -1;
	function Animate() {
		
		if (timer_counter < 0) {
			return;
		}
		
		var c = document.getElementById("myCanvas");

		var dt = doTimeStuff();
		
		var rulerbottom = c.height * 0.85;
		
		Render(dt, rulerbottom);
		
		if (ShowRuler == true) {
			DrawRuler(rulerbottom);
		}

	}
	
	function doTimeStuff() {
		var NowTime = Date.now();
		var dt = NowTime - LastTime;
		LastTime = NowTime;
		
		if (!Paused) {
			timer_counter += dt;
		}
		timer_counter = Math.min(timer_counter, Duration);
		
		return dt;
	}
	
	function Render(dt, rulerbottom) {
		var c = document.getElementById("myCanvas");

		// background
		drawBox(0,0,c.width,c.height, '#ffffff');
		var bottlex = c.width * 0.25;
		var bottley = c.height * 0.25;
		var bottlewidth = c.width * 0.5;
		var bottleheight = rulerbottom - bottley;
		// container
		drawBox(bottlex, bottley, bottlewidth, bottleheight, '#dddddd');

		// paper
		drawBox(bottlex + 30, rulerbottom - (bottleheight * 0.75), 135, bottleheight * 0.75, '#ffffff');
		//water line
		drawBox(bottlex + 30, rulerbottom - 20 - timer_counter * AnimationSpeed, 135, bottleheight * 0.75, '#cccccc');
		
		// 
		DrawDots(rulerbottom, color_obj);
		
		// table
		drawBox(0, rulerbottom, c.width, c.height, '#dbcfb4');
	}
	
	function componentToHex(c) {
	  var hex = c.toString(16);
	  return hex.length == 1 ? "0" + hex : hex;
	}

	function rgbToHex(r, g, b) {
	  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}
	
	function DrawDots(rulerbottom, obj) {
		var c = document.getElementById("myCanvas");
		
		for (var i = 1; i < obj.length; i++) {
			var dot = obj[i];
			drawBox(c.width / 2, rulerbottom + dot[1] - timer_counter * AnimationSpeed, 20, 20, dot[0]);
		}
		
		var dot = obj[0];
		drawBox(c.width / 2, rulerbottom + dot[1] - 20, 20, 20, dot[0]);
		
		print("Time: " + (timer_counter / 1000.0).toFixed(2));

	}
	
	function DrawRuler(rulerbottom) {
		var c = document.getElementById("myCanvas");
		
		// vertical line
		var x = c.width * 0.75;
		var ymin = rulerbottom;
		drawLine(x, 0, x, ymin);
		
		for (var i = 0; i < 75; i++) {
			var y = ymin - pxpercm*i;
			var len = 20;			
			
			if (i % 5 == 0) {
				drawText(i + " cm", x + 15, y + 5, "17px Arial");
				len = 50
			}
			
			if (i % 10 == 0) {
				len = 75
			}
			
			drawLine(x, y, x - len, y);
		}
	}
	
	function ToggleRuler() {
		ShowRuler = !ShowRuler;
	}

	function drawLine(x1, y1, x2, y2) {
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}

	function drawText(text, x, y, font) {
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.fillStyle = '#000000';
		ctx.font = font;
		ctx.fillText(text,x,y);
	}

	function drawBox(x, y, width, height, color) {
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.fillStyle = color;
		ctx.fillRect(x, y, width, height);
	}
	
	
	function lerpColor(a, b, amount) { 

		var ah = ah = +a.replace('#', '0x'),
			ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
			bh = bh = +b.replace('#', '0x'),
			br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
			rr = ar + amount * (br - ar),
			rg = ag + amount * (bg - ag),
			rb = ab + amount * (bb - ab);

		return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
	}