var rv,notrv,wd,notwd,wp,wh,m,len,col,breadth,notbr;
var freq;
var cnt=0;
var video;
var vid;
var called=false;

//Wave height for wave period 1.5s 		   
var options1=[[8,12], //0.75D spacing, breadth 1D and water depth 0.4m
			  [12], //0.75D spacing, breadth 1D and water depth 0.5m
              [6,8,12], //1D spacing, breadth 1D and water depth 0.4m
			  [6,10,12], //1D spacing, breadth 1D and water depth 0.5m
			  [12], //1D spacing, breadth 2D and water depth 0.4m
			  [6]]; //1D spacing, breadth 2D and water depth 0.5m
			  
//Wave height for wave period 2s 	
var options2=[[12], //0.75D spacing, breadth 1D and water depth 0.4m
			  [12], //0.75D spacing, breadth 1D and water depth 0.5m //manipulated 1.5s videos has to be displayed
              [12], //1D spacing, breadth 1D and water depth 0.4m
			  [6,10,12], //1D spacing, breadth 1D and water depth 0.5m //manipulated 1.5s videos has to be displayed
			  [12], //1D spacing, breadth 2D and water depth 0.4m
			  [10,12]]; //1D spacing, breadth 2D and water depth 0.5m	   
			   
//Kt for wave period 1.5s 
//kt(m)=ht/hi; (here hi=options1[i][j]/100)
var kt1=[[0.85,0.8074],
		[0.7442],
		[0.9382,0.8872,0.7621],
		[0.9257,0.9045,0.8491],
		[0.8359],
		[0.8746]];
		
//Kt for wave period 2s 
//kt(m)=ht/hi; (here hi=options2[i][j]/100)
var kt2=[[0.7992],
		[0.8457],
		[0.8765],
		[0.8827,0.8738,0.8735],
		[0.9418],
		[0.8617,0.8692]];	
		
var wdht,wdhi;

// var p=Math.floor(Math.random()*(4));  
var p;		   
function navNext()
{
	for(temp=0;temp<=7;temp++)
	{
		document.getElementById("canvas"+temp).style.visibility="hidden";
	}
	simsubscreennum+=1;
	document.getElementById("canvas"+simsubscreennum).style.visibility="visible";
	document.getElementById("nextButton").style.visibility="hidden";
	magic();
}

var ca;
var questions=["Wave length is the distance between two successive crest or trough.",
				"The waves are most often generated with a mechanical wave generator.",
				"The ratio between the transmitted wave height </br>(H<sub>t</sub>) and incident wave height (H<sub>i</sub>) is "];
				
var options5=[["True","False"],//True
			  ["True","False"],//True
			  ["Wave incident coefficient","Wave transmission coefficient","Wave steepness ","None of the above"]];//wave transmission coefficient 
			  
function validateAnswer(qn,ans,left,top)
{
	$("#answer").empty();
	document.getElementById("a").innerHTML="";
	document.getElementById("questDiv").style="position:absolute; font-size:14px; background-color:grey; color:white; padding:7.5px; border-radius:5px; visibility:visible; left:"+left+";top:"+top+";";
	document.getElementById("q").innerHTML=questions[qn];
	el = document.createElement("option");
	el.textContent = " ";
	el.value = " ";
	answer.appendChild(el);
  
	for(j=0;j<options5[qn].length;j++)
	{
		opt = options5[qn][j];

		el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		answer.appendChild(el);
		$("#answer").change(function()
		{
			ca=$(this).children("option:selected").val();
			if(options5[qn][ans]==ca)
			{
				document.getElementById("a").innerHTML="Correct Answer!";
			}
			else
			{
				document.getElementById("a").innerHTML="Wrong! Answer is "+options5[qn][ans];
			}
			setTimeout(function()
			{
				document.getElementById("questDiv").style.visibility="hidden";
				document.getElementById("nextButton").style.visibility="visible";
			},1500);
		});
	}
}
//-----------------------------------------blink arrow on the next step---------------------------------------------
//blink arrow on the next step
function animatearrow()
{
     if (document.getElementById('arrow1').style.visibility=="hidden")
         document.getElementById('arrow1').style.visibility="visible";
     else
         document.getElementById('arrow1').style.visibility="hidden";
}

//stop blinking arrow
function myStopFunction() 
{
     clearInterval(myInt);
     document.getElementById('arrow1').style.visibility="hidden";
}

//to prevent from entering non-integer values and alphabets
$(function()
{
	$('input').on('input', function() {
		this.value = this.value.match(/\d*(\.\d*)?/)[0];
	});
});

	var looper;
    var degrees = 0;
	var trackf=0;
    function rotateAnimation(el,speed)
	{
        var elem = document.getElementById(el);
        if(navigator.userAgent.match("Chrome"))
		{
            elem.style.WebkitTransform = "rotate("+degrees+"deg)";
        } 
		else if(navigator.userAgent.match("Firefox"))
		{
            elem.style.MozTransform = "rotate("+degrees+"deg)";
        } 
		else if(navigator.userAgent.match("MSIE"))
		{
            elem.style.msTransform = "rotate("+degrees+"deg)";
        }
		else if(navigator.userAgent.match("Opera"))
		{
            elem.style.OTransform = "rotate("+degrees+"deg)";
        } 
		else 
		{
            elem.style.transform = "rotate("+degrees+"deg)";
        }
		looper = setTimeout('rotateAnimation(\''+el+'\','+speed+')',speed);
		trackf=(degrees/8.60).toFixed(1);
		if(trackf < +freq )
		{
			// cnt=0;
			degrees++;
			// console.log(degrees+" "+freq+" "+trackf);
		}
		else if(trackf >= +freq && cnt==0)
		{
			cnt=1;
			setTimeout(function()
			{
				$("#5-1").css({"visibility":"hidden"});
				$("#5-2").css({"visibility":"hidden"});
				$("#5-3").css({"visibility":"hidden"});
				$("#5-4a").css({"visibility":"hidden"});
				$("#5-4b").css({"visibility":"hidden"});
				$("#5-4c").css({"visibility":"hidden"});
				$("#5-4d").css({"visibility":"hidden"});
				$("#p5-1").css({"visibility":"hidden"});
				$("#p5-2").css({"visibility":"hidden"});
				
				$("#p5-4").css({"visibility":"hidden"});
				
				// $("#5-5c").css({"visibility":"visible"});
				// ecc=10;
				$("#p5-3").css({"visibility":"visible"});
				$("#t5-3").css({"visibility":"visible"});
				$("#b5-3").css({"visibility":"visible"});
				$("#b5-3").click(function()
				{
					if(!document.getElementById("t5-3").value || document.getElementById("t5-3").value==null)
					{
						alert("Enter the frequency value you have selected in the previous step");
					}
					else
					{
						if(document.getElementById("t5-3").value==ecc)
						{
							document.getElementById("t5-3").style.visibility="hidden";
							document.getElementById("b5-3").style.visibility="hidden";
							$("#p5-3").css({"visibility":"visible","color":"green"});
							$("#p5-3").text("Correct! Frequency you have chosen is "+ecc);
							$("#5-5a").css({"visibility":"visible"});
							$("#5-5b").css({"visibility":"visible"});
							setEcc();
						}
						else
						{
							document.getElementById("t5-3").style.visibility="hidden";
							document.getElementById("b5-3").style.visibility="hidden";
							$("#p5-3").css({"visibility":"visible","color":"red"});
							$("#p5-3").text("Wrong! Frequency you have chosen is "+ecc);	
							$("#5-5a").css({"visibility":"visible"});
							$("#5-5b").css({"visibility":"visible"});
							setEcc();
						}
					}
				});	
				
			},750);
		}

		document.getElementById("p5-2").innerHTML="Frequency to be set = "+trackf+ " Hz" ;
    }
	
function magic()
{
	if(simsubscreennum==1)
	{
		$("#1").mouseover(function(){
		  $("#11").show();
		});
		$("#1").mouseout(function(){
		  $("#11").hide();
		});
		$("#12").mouseover(function(){
		  $("#112").show();
		});
		$("#12").mouseout(function(){
		  $("#112").hide();
		});
		$("#13").mouseover(function(){
		  $("#113").show();
		});
		$("#13").mouseout(function(){
		  $("#113").hide();
		});
		$("#14").mouseover(function(){
		  $("#114").show();
		});
		$("#14").mouseout(function(){
		  $("#114").hide();
		});
		$("#15").mouseover(function(){
		  $("#115").show();
		});
		$("#15").mouseout(function(){
		  $("#115").hide();
		});
		setTimeout(function()
		{
			// document.getElementById("nextButton").style.visibility="visible";
			validateAnswer(1,0,"100px","160px");
		},750);
	}
	if(simsubscreennum==2)
	{
		$("input[type='radio']").click(function()
		{
			rv=$("input[name='space']:checked").val(); //spacing
			notrv=$("input[name='space']:not(:checked)").val();
				if(rv=="0.75D")
				{
					$("input[type=radio][value="+ notrv +"]").prop("disabled",true);
					$("#L2-2").css({"color":"grey"});
					document.getElementById("p2-1").style.visibility="visible";
					breadth=1;
					setTimeout(function()
					{
						document.getElementById("p2-1").style.visibility="hidden";
						document.getElementById("r2-1").style.visibility="hidden";
						document.getElementById("r2-2").style.visibility="hidden";
						document.getElementById("i2-1").style.visibility="hidden";
						document.getElementById("img2-1").style.visibility="hidden";
						document.getElementById("L2-1").style.visibility="hidden";
						document.getElementById("img2-2").style.visibility="hidden";
						document.getElementById("i2-2").style.visibility="hidden";
						document.getElementById("L2-2").style.visibility="hidden";
						document.getElementById("L2-3").style.visibility="hidden";
						document.getElementById("L2-4").style.visibility="hidden";
						document.getElementById("2-1").style.visibility="visible";
						document.getElementById("2-2").style.visibility="visible";
						document.getElementById("2-3").style.visibility="visible";
						document.getElementById("2-4").style.visibility="visible";
						document.getElementById("2-5").style.visibility="visible";
						document.getElementById("2-6").style.visibility="visible";
						document.getElementById("2-7").style.visibility="visible";
						document.getElementById("nextButton").style.visibility="visible";
					},750);
				}
				if(rv=="1D")
				{
					$("input[type=radio][value='0.75D']").prop("disabled",true);
					$("#L2-1").css({"color":"grey"});
					document.getElementById("i2-1").style.visibility="visible";
					document.getElementById("i2-2").style.visibility="visible";
					document.getElementById("L2-3").style.visibility="visible";
					document.getElementById("L2-4").style.visibility="visible";
					$("input[type='radio'][name='breadth']").click(function()
					{
						breadth=$("input[name='breadth']:checked").val(); 
						notbr=$("input[name='breadth']:not(:checked)").val();
						if(breadth==1)
						{
							$("input[type=radio][value=2]").prop("disabled",true);
							$("#L2-4").css({"color":"grey"});
						}
						if(breadth==2)
						{
							$("input[type=radio][value=1]").prop("disabled",true);
							$("#L2-3").css({"color":"grey"});
						}
						console.log("rv="+rv+",breadth="+breadth);
						document.getElementById("p2-1").style.visibility="hidden";
						document.getElementById("r2-1").style.visibility="hidden";
						document.getElementById("r2-2").style.visibility="hidden";
						document.getElementById("i2-1").style.visibility="hidden";
						document.getElementById("img2-1").style.visibility="hidden";
						document.getElementById("L2-1").style.visibility="hidden";
						document.getElementById("img2-2").style.visibility="hidden";
						document.getElementById("i2-2").style.visibility="hidden";
						document.getElementById("L2-2").style.visibility="hidden";
						document.getElementById("L2-3").style.visibility="hidden";
						document.getElementById("L2-4").style.visibility="hidden";
						document.getElementById("2-1").style.visibility="visible";
						document.getElementById("2-2").style.visibility="visible";
						document.getElementById("2-3").style.visibility="visible";
						document.getElementById("2-4").style.visibility="visible";
						document.getElementById("2-5").style.visibility="visible";
						document.getElementById("2-6").style.visibility="visible";
						document.getElementById("2-7").style.visibility="visible";
						document.getElementById("nextButton").style.visibility="visible";
					});
				}
		});
	}
	if(simsubscreennum==3)
	{
		document.getElementById("2-1").style.visibility="hidden";
		document.getElementById("2-2").style.visibility="hidden";
		document.getElementById("2-3").style.visibility="hidden";
		document.getElementById("2-4").style.visibility="hidden";
		document.getElementById("2-5").style.visibility="hidden";
		document.getElementById("2-6").style.visibility="hidden";
		document.getElementById("2-7").style.visibility="hidden";
		document.getElementById("p2-1").style.visibility="hidden";
		document.getElementById("r2-1").style.visibility="hidden";
		document.getElementById("r2-2").style.visibility="hidden";
		document.getElementById("i2-1").style.visibility="hidden";
		document.getElementById("img2-1").style.visibility="hidden";
		document.getElementById("L2-1").style.visibility="hidden";
		document.getElementById("img2-2").style.visibility="hidden";
		document.getElementById("i2-2").style.visibility="hidden";
		document.getElementById("L2-2").style.visibility="hidden";
		document.getElementById("L2-3").style.visibility="hidden";
		document.getElementById("L2-4").style.visibility="hidden";
		$("input[type='radio'][name='depth']").click(function()
		{
			wd=$("input[name='depth']:checked").val();
			notwd=$("input[name='depth']:not(:checked)").val();
			if(confirm("You have selected "+wd+" water depth"))
			{
				if(wd=="0.4m")
				{
					$("input[type=radio][value='0.5m']").prop("disabled",true);
					$("#L3-2").css({"color":"grey"});
				}
				if(wd=="0.5m")
				{
					$("input[type=radio][value='0.4m']").prop("disabled",true);
					$("#L3-1").css({"color":"grey"});
				}
			}
			else
			{
				if(wd=="0.4m")
				{
					$("input[type=radio][value='0.5m']").prop("checked",true);
					$("input[type=radio][value='0.4m']").prop("disabled",true);
					$("#L3-2").css({"color":"grey"});
				}
				if(wd=="0.5m")
				{
					$("input[type=radio][value='0.4m']").prop("checked",true);
					$("input[type=radio][value='0.5m']").prop("disabled",true);
					$("#L3-1").css({"color":"grey"});
				}
			}
			console.log("rv="+rv+",breadth="+breadth+",depth="+wd);
			// document.getElementById("nextButton").style.visibility="visible";
			validateAnswer(0,0,"120px","250px");
		});
	}
	if(simsubscreennum==4)
	{
		document.getElementById("2-1").style.visibility="hidden";
		document.getElementById("2-2").style.visibility="hidden";
		if(wd=="0.4m")
		{
			m=1;
		}
		if(wd=="0.5m")
		{
			m=2;
		}
	
		var n,i,x,td;
		var currow=0;
		var newArray=[];
		$('#table'+m).css({"visibility":"visible"});
		var table=document.getElementById('table'+m);

		//approach 3
		$("#wp").change(function()
		{
			wp=$(this).children("option:selected").val();
			x = table.getElementsByTagName("tr");

		    var txt = "";

		    for (i = 0; i < x.length;i++) 
		    {
			
				var y = x[i].getElementsByTagName("td");
				$("#note4-1").fadeOut(100);
				if(y[0].innerHTML==wp)
				{
					txt = "For wave period = "+y[0].innerHTML+"s, frequency = "+y[1].innerHTML+"Hz<br>";
					freq=y[1].innerHTML;
					currow=i;
					document.getElementById("wht").style.visibility="visible";

						console.log("rv="+rv+",wd="+wd);
						if(rv=="0.75" && breadth=="1" && wd=="0.4m")
						{
							p=0;
						}
						if(rv=="0.75" && breadth=="1" && wd=="0.5m")
						{
							p=1;
						}
						if(rv=="1" && breadth=="1" && wd=="0.4m")
						{
							p=2;
						}
						if(rv=="1" && breadth=="1" && wd=="0.5m")
						{
							p=3;
						}
						if(rv=="1" && breadth=="2" && wd=="0.4m")
						{
							p=4;
						}
						if(rv=="1" && breadth=="2" && wd=="0.5m")
						{
							p=5;
						}
					if(wp==1.5)
					{
						for (var i = 0; i < options1.length; i++)
						{
							newArray[i] = options1[i].slice();
						}
					}
					if(wp==2)
					{
						for (var i = 0; i < options2.length; i++)
						{
							newArray[i] = options2[i].slice();
						}
					}
				//console.log("1)spacing ="+rv+", depth="+wd+",m="+m+", period="+wp+", p="+p+", newArray=["+newArray[p]+"]");
					myNextFunction(currow);
				}
		  }
		  document.getElementById("p4-1").style.visibility="visible";
		  document.getElementById("p4-1").innerHTML = txt;
		  document.getElementById("p4-2").innerHTML="";
		});
		var whh;
		function myNextFunction(currow)
		{
		    $("#waveHeight").empty();

		    el = document.createElement("option");
		    el.textContent = " ";
		    el.value = " ";
		    waveHeight.appendChild(el);
		  
		//  console.log("2)spacing ="+rv+", depth="+wd+",m="+m+", period="+wp+", p="+p+", newArray=["+newArray[p]+"]");
		    for(j=0;j<newArray[p].length;j++)
		    {
			  	opt = newArray[p][j];

				el = document.createElement("option");
				el.textContent = opt;
				el.value = opt;
				waveHeight.appendChild(el);
				$("#waveHeight").change(function()
				{
					wh=$(this).children("option:selected").val();
				
					var z1=x[1].getElementsByTagName("td");
					var z2=x[currow].getElementsByTagName("td");
					var text;
					for(i=2;i<z1.length;i++)
					{
						if(z1[i].innerHTML==wh)
						{
							text="For  wave height = "+z1[i].innerHTML+"cm , eccenricty = "+z2[i].innerHTML;
							ecc=z2[i].innerHTML;
							//wh=z1[i].innerHTML;
							//To display Hi and Ht
							
							var h;
							var wht=parseFloat(z1[i].innerHTML/100);//cm->m // wave height
							var wdt=parseFloat(wd.slice(0,3));//remove unit from the variable i.e. wd=0.5m //water depth
							wdhi=wdt+wht; //water depth + incident wave height
							if(wp==1.5)
							{
								h=options1[p].indexOf(parseInt(z1[i].innerHTML));
								wdht=(wdt+(wht*kt1[p][h])).toFixed(4); //water depth + transmitted wave height
								console.log(h,wdhi,wdht,kt1[p][h],wdt,wht);
							}
							if(wp==2)
							{
								h=options2[p].indexOf(parseInt(z1[i].innerHTML));
								wdht=(wdt+(wht*kt2[p][h])).toFixed(4); //water depth + transmitted wave height
								console.log(h,wdhi,wdht,kt2[p][h],wdt,wht);
							}
						}
					}
					document.getElementById("p4-2").style.visibility="visible";
				    document.getElementById("p4-2").innerHTML=text;
					$("#note4-1").fadeIn(100);
					$("#b4-1").click(function()
					{
						$("#note4-1").fadeOut(100);
						document.getElementById("nextButton").style.visibility="visible";
						document.getElementById("wp").disabled="true";
						document.getElementById("waveHeight").disabled="true";
					});
				});
			}
		}
	}
	if(simsubscreennum==5)
	{
		$("#table"+m).css({"visibility":"hidden"});
		$("#wht").css({"visibility":"hidden"});
		$("#p4-1").css({"visibility":"hidden"});
		$("#p4-2").css({"visibility":"hidden"});
		$("#b5-1").click(function()
		{
			if(!document.getElementById("t5-1").value || document.getElementById("t5-1").value==null)
			{
				alert("Enter the frequency value you have selected in the previous step");
			}
			else
			{
				if(document.getElementById("t5-1").value==freq)
				{
					document.getElementById("t5-1").style.visibility="hidden";
					document.getElementById("b5-1").style.visibility="hidden";
					$("#p5-1").css({"visibility":"visible","color":"green"});
					$("#p5-1").text("Correct! Frequency you have chosen is "+freq+" Hz");
					setFreq();
				}
				else
				{
					document.getElementById("t5-1").style.visibility="hidden";
					document.getElementById("b5-1").style.visibility="hidden";
					$("#p5-1").css({"visibility":"visible","color":"red"});
					$("#p5-1").text("Wrong! Frequency you have chosen is "+freq+" Hz");	
					setFreq();
				}
			}
		});	
	}
	
	if(simsubscreennum==6)
	{
		$("#p5-4").css({"visibility":"hidden"});
		$("#p5-3").css({"visibility":"hidden"});
		$("#5-5a").css({"visibility":"hidden"});
		$("#5-5b").css({"visibility":"hidden"});
		$("#5-5c").css({"visibility":"hidden"});
		$("#canvas5-1").css({"visibility":"hidden"});
		$("#ecc1").css({"visibility":"hidden"});
		$("#l5-1").css({"visibility":"hidden"});
		$("#ecc2").css({"visibility":"hidden"});
		myInt = setInterval(function(){ animatearrow(); }, 500);
		document.getElementById('arrow1').style="visibility:visible ;position:absolute;  left:320px; top:240px; height:30px; z-index: 10;";
		document.getElementById("arrow1").style.WebkitTransform = "rotate(240deg)"; 
		// Code for IE9
		document.getElementById("arrow1").style.msTransform = "rotate(230deg)"; 
		// Standard syntax
		document.getElementById("arrow1").style.transform = "rotate(230deg)";
		$("#6-5c").on('click',function()
		{
			$("#6-5c").off("click");             
			myStopFunction();
			console.log("Spacing="+rv+"D, breadth="+breadth+"D, water depth="+wd+", wave period="+wp+"s, wave height="+wh+"m");
			//display video in a small window
			document.getElementById("Spacing="+rv+"D, breadth="+breadth+"D, water depth="+wd+", wave period="+wp+"s, wave height="+wh+"m").style.visibility="visible";
			//play video
			document.getElementById("Spacing="+rv+"D, breadth="+breadth+"D, water depth="+wd+", wave period="+wp+"s, wave height="+wh+"m").play();
			
			// $("#6-2").animate({"position":"absolute","top":"379px"},1000);
			document.getElementById("6-5a").style.backgroundColor="#00CC00";
			document.getElementById("6-31").style.transformOrigin="90% 100%";
			document.getElementById("6-31").style.animation="rotateflap 2.75s infinite linear";
			document.getElementById("6-4").style.transformOrigin="90% 0%";
			document.getElementById("6-4").style.animation="rotateflap3 2.75s infinite linear";
			document.getElementById("6-3").style.animation="moveflap 2.75s infinite linear";	
			document.getElementById("6-1c").style.animation="movewhite 2.75s infinite linear";
			document.getElementById("6-6a").style.animation="rotatewheel 2.75s infinite linear";
			
			window.requestAnimFrame = (function(){
				return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function( callback ) {
					window.setTimeout(callback, 2.75);
				};
			})();

			function distance(p1X, p1Y, p2X, p2Y) {
				return Math.sqrt(Math.pow(p1X - p2X, 2) + Math.pow(p1Y - p2Y, 2));
			}

			// dom
			var canvas = document.getElementById('mainCanvas');
			var ctx = canvas.getContext('2d');
			
			//Hi and Ht display
			var can=document.getElementById("subCanvas");
			var cctx=can.getContext("2d");
			
			var engineSpeed = 0.1,
				engineAngle = 0,
				engineX = Math.floor(canvas.width * 0.15);//change x axis by decreasing 0.6 value
				engineR = 10,
				engineY = Math.floor(canvas.height - 1 * engineR),//change y axis by decreasing 2 value and canvas.height
				leftWiperX = Math.floor(engineX - canvas.height / 3),//change the width of the line by increasing 2 value
				leftWiperLowerHandle = 11,
				leftWiperY = engineY - leftWiperLowerHandle,
				leftShaftLength = leftWiperX - engineX - leftWiperLowerHandle + engineR,
				jointR = 2,
				lineWidth = 3;

			(function animloop(){
				requestAnimFrame(animloop);
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.lineWidth = lineWidth;

				// motor circle
				engineAngle = (engineAngle + engineSpeed) % (2 * Math.PI);

				var crankX = engineX + Math.cos(engineAngle) * engineR,
					crankY = engineY + Math.sin(engineAngle) * engineR;
					//circle right hand side
					
					// ctx.globalAlpha="0.35";//set opacity
					ctx.lineTo(crankX, crankY);
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(crankX, crankY, jointR, 0, 2 * Math.PI);
					ctx.closePath();
					ctx.stroke();

				var dx = crankX - leftWiperX;
				var dy = crankY - leftWiperY;
				var d = distance(crankX, crankY, leftWiperX, leftWiperY);
				var a = ((leftWiperLowerHandle * leftWiperLowerHandle) - (leftShaftLength * leftShaftLength) + (d * d)) / (2.0 * d) ;
				var x2 = leftWiperX + (dx * a / d);
				var y2 = leftWiperY + (dy * a / d);
				var h = Math.sqrt((leftWiperLowerHandle * leftWiperLowerHandle) - (a * a));
				var rx = -dy * (h / d);
				var ry = dx * (h / d);
				var joinLeftX = x2 + rx;
				var jointLeftY = y2 + ry;

				// left shaft
				ctx.beginPath();
				ctx.moveTo(crankX, crankY);
				ctx.lineTo(joinLeftX, jointLeftY);
				ctx.closePath();
				ctx.stroke();
				// <!-- circle on left side -->
				ctx.beginPath();
				ctx.arc(joinLeftX, jointLeftY, jointR, 0, 2 * Math.PI);
				ctx.closePath();
				ctx.stroke();

			})();

			setTimeout(function()
			{
				var ocean1 = document.getElementById("waves1"),
				waveWidth = 1,
				waveCount = Math.floor(430/waveWidth),
				docFrag = document.createDocumentFragment();
				document.getElementById("6-2").style.visibility="hidden";
				//initial waves				
				for(var i = 0; i < waveCount; i++)
				{  
					var wave = document.createElement("div");
					wave.className += " wave"; //assigning class name to the waves
					docFrag.appendChild(wave);
					wave.style.left = -29 + i * waveWidth + "px"; //initial position left:78px+
					// wave.style.webkitAnimationDelay = (i/100) + "s";//The animation-delay property specifies a delay for the start of an animation.
					wave.style.animationName= "dostuff";
					wave.style.animationDuration= "7.5s";
					wave.style.animationIterationCount="infinite";
					wave.style.transitionTimingFunction="ease-in-out";
					wave.style.webkitAnimationDelay = (i/100) + "s";
				}
				//reflect wave at beach
				for(var i = 433; i < 760; i++)
				{
					if( i >= 732.5 && i <= 770 )
					{
						var wave = document.createElement("div");
						wave.className += " wave"; //assigning class name to the waves
						docFrag.appendChild(wave);
						wave.style.left = -29 + i * waveWidth + "px"; //initial position left:78px+
						// wave.style.webkitAnimationDelay = (i/100) + "s";//The animation-delay property specifies a delay for the start of an animation.
						wave.style.animationName= "dostuff3";
						wave.style.animationDuration= "7.5s";
						wave.style.animationIterationCount="infinite";
						wave.style.transitionTimingFunction="ease-in-out";
						wave.style.webkitAnimationDelay = (i/100) + "s";
					}
					//wave after reaching obstacles
					else
					{
						var wave = document.createElement("div");
						wave.className += " wave"; //assigning class name to the waves
						docFrag.appendChild(wave);
						wave.style.left = -29 + i * waveWidth + "px"; //initial position left:78px+
						// wave.style.webkitAnimationDelay = (i/100) + "s";//The animation-delay property specifies a delay for the start of an animation.
						wave.style.animationName= "dostuff2";
						wave.style.animationDuration= "7.5s";
						wave.style.animationIterationCount="infinite";
						wave.style.transitionTimingFunction="ease-in-out";
						wave.style.webkitAnimationDelay = (i/100) + "s";
					}
				}
				ocean1.appendChild(docFrag);
				
				//display incident and transmitted wave height
				var fa11x,fa11y,ma1x,ma1y,fa2x,fa2y,ma2x,ma2y,ahy1,ahx1,ahy2,ahx2;
				setTimeout(function()
				{
					draw(12,37.5,15,27.5,18,37.5,15,28,15,58,12,48,15,58,18,48,18,43.5,wdhi);
					setTimeout(function()
					{
						document.getElementById("p6-2").innerHTML="Water depth + Incident wave height (H<sub>i</sub>)= "+wdhi+"m";
					},150);
				},3950);
				function draw(ax,ay,bx,by,cx,cy,dx,dy,ex,ey,fx,fy,gx,gy,hx,hy,tx,ty,val)
				{
					cctx.clearRect(0,0,can.width,can.height);
					//arrow1
					cctx.beginPath();
					cctx.moveTo(ax,ay);
					cctx.lineTo(bx,by);
					cctx.lineTo(cx,cy);
					cctx.stroke();	

					cctx.fillText(val+"cm",tx,ty);

					//line between arrow head
					cctx.beginPath();
					cctx.moveTo(dx,dy);
					cctx.lineTo(ex,ey);
					cctx.stroke();

					//arrow2
					cctx.beginPath();
					cctx.moveTo(fx,fy);
					cctx.lineTo(gx,gy);
					cctx.lineTo(hx,hy);
					cctx.stroke();
					
					setTimeout(function()
					{
						clearDisplay();
					},350);
				}
				function clearDisplay()
				{
					//clearInterval(simTimeId);
					cctx.clearRect(0,0,can.width,can.height);
					if(!called)
					{
						called=true;
						setTimeout(function()
						{	
							draw(112,43,115,33,118,43,115,33,115,58,112,48,115,58,118,48,118,47.5,wdht);
							setTimeout(function()
							{
								document.getElementById("p6-2").innerHTML="Water depth + Incident wave height (H<sub>i</sub>)= "+wdhi+"m </br></br>Water depth + Transmitted wave height (H<sub>t</sub>)= "+wdht+"m";
							},100);
						},1025);
					}
					else
					{
						validateAnswer(2,1,"420px","120px");
					}
				}
				// setTimeout(function()
				// {
					// $("#6-2").animate({"position":"absolute","top":"382.5px"},100);
					// var ocean2 = document.getElementById("waves2"),
					// waveWidth = 1,
					// waveCount = Math.floor(325/waveWidth),
					// docFrag = document.createDocumentFragment();
				 
					// // <!-- alert(waveCount); -->
				 
					// for(var i = 0; i < waveCount; i++)
					// {
						// var wave = document.createElement("div");
						// wave.className += " wave2"; //assigning class name to the waves
						// docFrag.appendChild(wave);
						// wave.style.left = 403 + i * waveWidth + "px"; //initial position left:78px+
						// wave.style.webkitAnimationDelay = (i/100) + "s";//The animation-delay property specifies a delay for the start of an animation.
					// }
					// ocean2.appendChild(docFrag);
					
					// setTimeout(function()
					// {
						// document.getElementById("nextButton").style.visibility="visible";
						// validateAnswer(2,1,"420px","120px");
					// },12500);
				// },3550);	
			},1000);	
		});	
	}
	
	// if(simsubscreennum==7)
	// {
		
		// console.log("Spacing="+rv+"D, breadth="+breadth+"D, water depth="+wd+", wave period="+wp+"s, wave height="+wh+"m");
		// video=document.getElementById("Spacing="+rv+"D, breadth="+breadth+"D, water depth="+wd+", wave period="+wp+"s, wave height="+wh+"m");
		// //display video in a small window
		// document.getElementById("Spacing="+rv+"D, breadth="+breadth+"D, water depth="+wd+", wave period="+wp+"s, wave height="+wh+"m").style.visibility="visible";
		// document.getElementById("Spacing="+rv+"D, breadth="+breadth+"D, water depth="+wd+", wave period="+wp+"s, wave height="+wh+"m").addEventListener('ended',myHandler,false);
		// function myHandler(e) {
			// if(!e) { e = window.event; }
			// document.getElementById("nextButton").style.visibility="visible";
		// }
	// }
	if(simsubscreennum==7)
	{
		document.getElementById("nextButton").style.visibility="hidden";
		document.getElementById("Spacing="+rv+"D, breadth="+breadth+"D, water depth="+wd+", wave period="+wp+"s, wave height="+wh+"m").style.visibility="hidden";
		document.getElementById("Spacing="+rv+"D,breadth="+breadth+"D").style.visibility="visible";
	}
	if(simsubscreennum==8)
	{
		// hide buttons
		document.getElementById("Spacing="+rv+"D,breadth="+breadth+"D").style.visibility="hidden";
		// hide video
		document.getElementById(vid).style.visibility="hidden";
		document.getElementById("prevButton").style.visibility="hidden";
		document.getElementById("graph1").style.visibility="visible";
		dispGraph();
	}
}

function dispVideo(v)
{
	document.getElementById("nextButton").style.visibility="hidden";
	vid=v;
	document.getElementById(v).style.width="750px";
	document.getElementById(v).style.height="450px";
	document.getElementById(v).style.visibility="visible";
	document.getElementById(v).addEventListener('ended',myHandler2,false);
	function myHandler2(e2) 
	{
		if(!e2) { e2 = window.event; }
		document.getElementById("prevButton").style.visibility="visible";
		document.getElementById("nextButton").style.visibility="visible";
	}
}

function prevTab()
{
	document.getElementById(vid).style.visibility="hidden";
	document.getElementById("nextButton").style.visibility="hidden";
	document.getElementById("prevButton").style.visibility="hidden";
}

function setFreq()
{
	myInt = setInterval(function(){ animatearrow(); }, 500);
	document.getElementById('arrow1').style="visibility:visible ;position:absolute;  left:245px; top:190px; height:30px; z-index: 10;";
	document.getElementById("arrow1").style.WebkitTransform = "rotate(0deg)"; 
	// Code for IE9
	document.getElementById("arrow1").style.msTransform = "rotate(0deg)"; 
	// Standard syntax
	document.getElementById("arrow1").style.transform = "rotate(0deg)";
	$("#5-3").on('click',function()
	{
		$("#5-3").off("click");             
		myStopFunction();
		$("#5-4a").css({"visibility":"visible"});
		$("#5-4b").css({"visibility":"visible"});
		$("#5-4c").css({"visibility":"visible"});
		$("#p5-1").css({"visibility":"visible"});
			
		// $("#p5-1").text("Set the frequency value to "+freq+" Hz");
					
		myInt = setInterval(function(){ animatearrow(); }, 500);
		document.getElementById('arrow1').style="visibility:visible ;position:absolute;  left:530px; top:300px; height:30px; z-index: 10;";
		document.getElementById("arrow1").style.WebkitTransform = "rotate(0deg)"; 
		// Code for IE9
		document.getElementById("arrow1").style.msTransform = "rotate(0deg)"; 
		// Standard syntax
		document.getElementById("arrow1").style.transform = "rotate(0deg)";
		$("#5-4b").on('click',function()
		{
			$("#5-4b").off("click");             
			myStopFunction();
			document.getElementById('5-4c').style.transformOrigin="100% 10%";
			rotateAnimation("5-4c",60);
			$("#p5-2").css({"visibility":"visible"});
			// $("#p5-3").css({"visibility":"visible","color":"red","font-size":"14px"});
			// $("#p5-3").text("Click again to set the frequency once the pointer reaches desired value");
				
		});
	});
}

function setEcc()
{
	myInt = setInterval(function(){ animatearrow(); }, 500);
	document.getElementById('arrow1').style="visibility:visible ;position:absolute;  left:150px; top:345px; height:30px; z-index: 10;";
	document.getElementById("arrow1").style.WebkitTransform = "rotate(270deg)"; 
	// Code for IE9
	document.getElementById("arrow1").style.msTransform = "rotate(270deg)"; 
	// Standard syntax
	document.getElementById("arrow1").style.transform = "rotate(270deg)";
	$("#5-5b").on('click',function()
	{
		$("#5-5b").off("click");             
		myStopFunction();
		$("#5-5c").css({"visibility":"visible"});
		$("#canvas5-1").css({"visibility":"visible"});
		$("#ecc1").css({"visibility":"visible"});
		$("#l5-1").css({"visibility":"visible"});
		$("#ecc2").css({"visibility":"visible"});
		$("#p5-4").css({"visibility":"visible"});
		draw();
	});
}


var trace1 = {
				y: [0.85,0.8074,0.7442,0.7992,0.8692], //Kt
				x: [0.00353,0.00557,0.00539,0.00313,0.00306], //Hi/gT2
				type: 'scatter',
				mode:'markers',
				name:'',//to remove trace1 from the points name (0.00276 trace1) 
				enableAnimation: true
			};
			
		var trace11={
					   y:[0.783825,0.8256],
					   x:[0.00143,0.00802],
					   mode:'lines',
					   text:'',
					   name:''//to remove trace0 from the points name (0.00276 trace0)
					   //enableAnimation: true
					};			
					
		var trace2 = {
						y: [0.9382,0.8872,0.7621,0.9257,0.9045,0.8491,0.8765], 
						x: [0.00254,0.00353,0.00557,0.00294,0.00421,0.00539,0.00313], 
						type: 'scatter',
						mode:'markers',
						name:'',
						enableAnimation: true
					};
					
		var trace22={
					   y:[0.9551,0.79],
					   x:[0.0027,0.0060],
					   mode:'lines',
					   text:'',
					   name:''//to remove trace0 from the points name (0.00276 trace0)
					   //enableAnimation: true
					};			
					
		var trace3 = {
						y: [0.8359,0.8746,0.9418,0.8617,0.8692],
						x: [0.00557,0.00294,0.00313,0.00280,0.00306], 
						type: 'scatter',
						mode:'markers',
						name:'',
						enableAnimation: true
					};
					
		var trace33={
					   y:[0.885,0.83],
					   x:[0.00143,0.00553],
					   mode:'lines',
					   text:'',
					   name:''//to remove trace0 from the points name (0.00276 trace0)
					   //enableAnimation: true
					};			

		var layout = {
			title:'Wave steepness Vs Wave transmission co-efficient',
			showlegend: false,
			xaxis: {
			title:'Wave steepness (H<sub>i</sub>/gT<sup>2</sup>)',
			fixedrange: true
		  },
		  yaxis: {
			title:'Wave transmission co-efficient (K<sub>t</sub>)',
			fixedrange: true
		  }
		};    

		var options = {
			scrollZoom: false, // lets us scroll to zoom in and out - works
			showLink: false, // removes the link to edit on plotly - works
			modeBarButtonsToRemove: ['toImage', 'zoom2d', 'pan', 'pan2d', 'autoScale2d'],
			//modeBarButtonsToAdd: ['lasso2d'],
			displayLogo: false, // this one also seems to not work
			displayModeBar: false, //this one does work
			isResponsive:false,
			animationEnabled:true,
		};	

function dispGraph()
{
	console.log("rv=="+rv+" && breadth=="+breadth);
	if(rv=="0.75" && breadth=="1")
	{
		data=[trace1,trace11];
	}
	if(rv=="1" && breadth=="1")
	{
		data=[trace2,trace22];
	}
	if(rv=="1" && breadth=="2")
	{
		data=[trace3,trace33];
	}
	Plotly.newPlot('graph1', data, layout,options);
	
}	