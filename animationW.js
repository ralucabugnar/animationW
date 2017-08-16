var x, y, c;
var aria =0;
var nr =0, nr1=0;
var x, y, height, width, radius;
$(document).ready(function () {
	$( document ).tooltip();
	$("#radio-1").checkboxradio();
	$( "#dialog" ).dialog({
			dialogClass: "no-close",
		buttons: [
		{
		  text: "OK",
		  click: function() {
		  $( this ).dialog( "close" );
		  }
		}
		]
	});	
	$("#opt").selectmenu();
	function Shape(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
	};
	
	function Rectangle(width, height) {
		this.width = width;
		this.height = height;
		var rectangle= $("<div class='active1'></div>");
		$(rectangle).css({
			position: "relative",
			top : y + "px",
			left: x + "px",
			width : width + "px",
			height : height + "px",
			backgroundColor : color
		});
		$("body").append(rectangle);
	};
	
	function Circle(raza, color) {
		this.raza= raza;
		var circle = $("<div class='active'></div>");
		$(circle).css({
			position: "relative",
			top : y + "px",
			left: x + "px",
			width : raza + "px",
			height : raza + "px",
			borderRadius : "50%" ,
			backgroundColor : color
		});
		$("body").append(circle);
	};
	
	Shape.prototype.aria= function(arie, type){
		console.log("Aria " + type + ":" + arie);
		document.getElementById("aria").innerHTML= "Aria " + type + ":" + arie;
	};

	Rectangle.prototype = new Shape();
	Rectangle.constructor = Rectangle;
	Rectangle.prototype.parent = Rectangle.prototype;

	Rectangle.prototype.aria = function(width, height){
		if((width >0) && (height > 0)){
			var aria = width * height;
			Shape.prototype.aria.call(this, aria, "dreptunghi");
		}
	};

	Circle.prototype = new Shape();
	Circle.constructor = Circle;
	Circle.prototype.parent = Circle.prototype;

	Circle.prototype.aria = function(raza) {
		if(raza > 0){
			var aria = Math.PI * (raza * raza);
			Shape.prototype.aria.call(this, aria, "cerc");
		}
	};
	
	$('select').on('selectmenuchange', function() {
		console.log(this.value);
		if (this.value == "circle"){
			delete dreptunghi;
			$(".active1").remove();
			$("#drept input").val("");
			$("#cerc").css({
				display: "block"
			});
			$("#drept").css({
				display: "none"
			})
		}else{
			delete cerc;
			$(".active").remove();
			$("#raza").val("");
			$("#cerc").css({
				display: "none"
			});
			$("#drept").css({
				display: "block"
			});
		}
	});
	$("[type=color]").change(function () {
		c = $("#c").val();
		console.log(c);
	});
	$("[type=number]").change(function () {
		x= $("#x").val();
		y = $("#y").val();
		Shape(x, y, c);
	});
	$("[type=number]").change(function () {
		$(".active").remove();
		width = $("#width").val();
		height = $("#height").val();
		var dreptunghi = new Rectangle(width,height);
		dreptunghi.aria(width, height);
	});
	$("[type=number]").change(function (){
		c = $("[type=color]").val();
		raza = $("#raza").val();
		var cerc = new Circle(raza, c);
		cerc.aria(raza);
	});
	$("[type=checkbox]").change(function () {
		if($(this).is(":checked")){
			if ($("select[name='options']").val() == 'circle') {
				$(".active").animate({
					left: 300,
					top: 300
				},
				{
					duration: 2000,
					start: function() {
						$(this).css({
							backgroundColor: "red"
						});
					},
					complete: function() {
						$(this).effect( "bounce", {times:3}, 300 );
						$(this).animate({left: $("#x").val(), top: $("#y").val()});
					},
					progress: function(animation, progress) {
						$(this).css({
							opacity: progress,
							textAlign: "center",
							lineHeight: $("#raza").val() + "px"
						});
						$(this).text(Math.round(progress * 100));
					}
				}
				);
			} else {
				$(".active1").animate({
					left: 300,
					top: 300
				},
				{
					duration: 2000,
					start: function() {
						$(this).css({
							backgroundColor: "blue"
						});
					},
					complete: function() {
						$(this).effect( "shake", {times:3}, 300 );
						$(this).animate({left: $("#x").val(), top: $("#y").val()});
					},
					progress: function(animation, progress) {
						$(this).css({
							opacity: progress,
							lineHeight: $("#x").val() + "px" + $("#y").val() + "px"
						});
					}
				}
				);
			}
			
		}
	});
});