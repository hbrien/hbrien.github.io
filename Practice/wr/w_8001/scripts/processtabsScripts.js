var btnClicked = "-1";

var isPresenter = false;
function getWidgetIFrame(){
	if(isPresenter){
		return window.parent.document.getElementById(window.name);
	}else{
		var cpWidget = window.parent.document.getElementsByClassName("cp-widget");
		for(i=0;i<cpWidget.length;i++){
			for(j=0;j<cpWidget[i].children.length;j++){
				if(cpWidget[i].children[j].children[0] != undefined){
					if(cpWidget[i].children[j].children[0].contentDocument.getElementById("processtabswdgt") != null){
						myFrameName = window.name;
						return window.parent.document.getElementById(window.name);
					}
				}
			}
		}
	}
}

function resizeInteractionPresenter(thewidth,theheight) {
	var scale = 0;
	thewidth = String(thewidth).replace("px","");
	theheight = String(theheight).replace("px","");
	
	if(thewidth<320){
		thewidth = 320
	}
	if(theheight<320){
		theheight = 320
	}
	
	/**********************/
	//Modification made for Presenter same logic holds good for Captivate
	//iframe width and Height
	var scaleW = thewidth / (700);
	var scaleH = theheight/ (498);
	
	myWidgetiFrame.style.width = parseInt(parseInt(750*scaleW))+"px"
	myWidgetiFrame.style.height = parseInt(parseInt(550*scaleH))+"px"
	
	var iframewidth = String(myWidgetiFrame.style.width).replace("px","");
	var iframeheight = String(myWidgetiFrame.style.height).replace("px","");
	
	
	if(scaleW<scaleH){
		scale = scaleW
	}else{
		scale = scaleH
	}
	
	/*********************/
	
	//Resize fonts
	var fontscaleW = thewidth / (800);
	var fontscaleH = theheight/ (600);
	if(fontscaleW<fontscaleH){
		fontscale = fontscaleW
	}else{
		fontscale = fontscaleH
	}
	
	contentStyles.size = contentStylessize*fontscale;
	buttonStyles.size = buttonStylessize*fontscale;
	headerStyles.size = headerStylessize*fontscale;
	instStyles.size = instStylessize*fontscale;
	
	setupStyle("#intTitle", headerStyles)
	setupStyle("#intInstructions", instStyles)
	setupStyle(".title", buttonStyles)
	setupStyle(".tab_content p", contentStyles)
	
	//Resize interaction
	var headerActiveSize;
	if (generalStyles.headerActive == 2) {
		headerActiveSize = -20
	}else{
		headerActiveSize = $('#headerColor').height();
	}
	
	var marginsW
	//if(thewidth>=1024){
		//marginsW = Math.round((27+scaleW) * scaleW);
	//}else if(thewidth>= 768){
		//marginsW = Math.round((25+scaleW) * scaleW);
	//}else{
		//marginsW = Math.round((19+scaleW) * scaleW);
	//}
	
	var marginsH = Math.round(10 * scaleH);
	marginsW = Math.round(8 * scaleW);
	
	$('#reveal').css('margin-left', marginsW+"px");
	$('#reveal').css('margin-right', marginsW+"px");
	$('#reveal').css('margin-top', marginsH+"px");
	
	$('#reveal').css('width',(680*scaleW));
	$('#reveal').css('height',(470*scaleH));
	
	var revealHeight = parseInt(String($('#reveal').css('height').replace("px","")));
	var revealWidth = parseInt(String($('#reveal').css('width').replace("px","")));
	
	var wspace = 42;
	var hspace = 100;
	var gSpace = 4.3;
	var setBtnHeight = false;
	var btnOrientation = "top"
	var contentBgH = 40
	
	if(currentTheme==1 || currentTheme==5 ||currentTheme==7 || currentTheme==12 || currentTheme==14 ||currentTheme==15 ){
		if(textArray.length==2){
			gSpace = 5.7;
		}else if(textArray.length==3){
			gSpace = 5.0;
		}else if(textArray.length==4){
			gSpace = 4.3;
		}else if(textArray.length==5){
			gSpace = 3.6;
		}
		wspace = 42;
		hspace = 100;
	} else if(currentTheme==2 || currentTheme==13){
		if(textArray.length==2){
			gSpace = 7.1;
		}else if(textArray.length==3){
			gSpace = 5.9;
		}else if(textArray.length==4){
			gSpace = 4.8;
		}else if(textArray.length==5){
			gSpace = 4.1;
		}
		wspace = 40;
		hspace = 120;
	} else if(currentTheme==3 || currentTheme==8 || currentTheme==10 || currentTheme==16){
		if(textArray.length==2){
			gSpace = 42;
		}else if(textArray.length==3){
			gSpace = 16;
		}else if(textArray.length==4){
			gSpace = 7.3;
		}else if(textArray.length==5){
			gSpace = 3.8;
		}
		wspace = 40;
		hspace = 80;
		setBtnHeight = true;
		btnOrientation = "left"
	} else if(currentTheme==4 || currentTheme==9){
		if(textArray.length==2){
			gSpace = 38;
		}else if(textArray.length==3){
			gSpace = 15;
		}else if(textArray.length==4){
			gSpace = 7.3;
		}else if(textArray.length==5){
			gSpace = 3.4;
		}
		wspace = 40;
		hspace = 80;
		setBtnHeight = true;
		btnOrientation = "right"
	} else if(currentTheme==6 || currentTheme==11 || currentTheme==17){
		if(textArray.length==2){
			gSpace = 6.0;
		}else if(textArray.length==3){
			gSpace = 5.2;
		}else if(textArray.length==4){
			gSpace = 4.3;
		}else if(textArray.length==5){
			gSpace = 3.6;
		}
		wspace = 42;
		hspace = 100;
		contentBgH = 50
		btnOrientation = "bottom"
	} 
	
	
	$('#tabs_content_container').css('width',(revealWidth-wspace));
	$('#tabs_content_container').css('height',((revealHeight-headerActiveSize)-(hspace)));
	
	var contentBg = document.getElementById("content_bg");
	//contentBg.style.width = ((revealHeight-headerActiveSize)-40)+"px"
	contentBg.style.height = ((revealHeight-headerActiveSize)-contentBgH)+"px"
	
	var contentDisheight = parseInt(String($('#tabs_content_container').height()))
	var contentDisWidth = parseInt(String($('#tabs_content_container').width()));
	
	
	var titleBtnWidth = (contentDisWidth/textArray.length) - (gSpace*textArray.length)
	var titleBtnheight = ((contentDisheight/textArray.length) - (gSpace*textArray.length))
	for(i=0;i<textArray.length;i++){
		if($('#tab'+i).find('img').length){
			$('#tab'+i).find('img').css('width','150px');
			$('#tab'+i).find('img').css('height','150px');
		}
	}
	
	if(setBtnHeight){
		if(titleBtnWidth<=80){
			titleBtnWidth = 80
			
			for(i=0;i<textArray.length;i++){
				if($('#tab'+i).find('img').length){
					$('#tab'+i).find('img').css('width','120px');
					$('#tab'+i).find('img').css('height','120px');
				}
			}
		}
		$('.title').css('height',(titleBtnheight))
		$('.title').css('width',(titleBtnWidth))
	}else{
		$('.title').css('height',"4%");
		var titleinnerheight = $('.title').innerHeight();
		$('.title').css('height',titleinnerheight-10);
		$('.title').css('width',(titleBtnWidth))
	}
	
	if(btnOrientation == "top"){
		$('.scroll-pane').css('height',(contentDisheight));
	}else if(btnOrientation == "left"){
		$('.scroll-pane').css('height',(contentDisheight));
		$('.scroll-pane').css('width',(contentDisWidth - parseInt(String($('.title').css('width'))))-15);
	}else if(btnOrientation == "right"){
		$('.scroll-pane').css('height',(contentDisheight));
		$('.scroll-pane').css('width',(contentDisWidth - parseInt(String($('.title').css('width'))))-15);
	}else if(btnOrientation == "bottom"){
		$('.scroll-pane').css('height',(contentDisheight-10));
		$('#tabs_container').css('position', 'absolute');
		$('#tabs_container').css('top', ((contentDisheight+headerActiveSize)+40)+'px');
		$('#tabs_container').css('width',(contentDisWidth+20)+'px');
	}
	
}

function resizeInteraction(thewidth,theheight) {
	if(isPresenter)
		return resizeInteractionPresenter(thewidth, theheight);
	var scale = 0;
	thewidth = String(thewidth).replace("px","");
	theheight = String(theheight).replace("px","");
	
	if(thewidth<320){
		thewidth = 320
	}
	if(theheight<320){
		theheight = 320
	}
	
	/**********************/
	//Modification made for Presenter same logic holds good for Captivate
	//iframe width and Height
	var scaleW = thewidth / (700);
	var scaleH = theheight/ (498);
	
	myWidgetiFrame.style.width = parseInt(parseInt(750*scaleW))+"px"
	myWidgetiFrame.style.height = parseInt(parseInt(550*scaleH))+"px"
	
	var iframewidth = String(myWidgetiFrame.style.width).replace("px","");
	var iframeheight = String(myWidgetiFrame.style.height).replace("px","");
	
	
	if(scaleW<scaleH){
		scale = scaleW
	}else{
		scale = scaleH
	}
	
	/*********************/
	
	//Resize fonts
	if(scalefont=="true"){
		
		//Content font size
		if(contentStylessize>=12){
			if(thewidth>=1024){
				contentStyles.size = contentStylessize;
			}else if(thewidth>= 768){
				var tempNum = Math.round(contentStylessize-2);
				if(tempNum>=12){
					contentStyles.size = tempNum
				}else{
					contentStyles.size = 12
				}
			}else if(thewidth>= 360){
				contentStyles.size = 12
			}else{
				contentStyles.size = 10
			}
			
			var tempcontentStylessize = contentStyles.size*scaleW;
			if(tempcontentStylessize>=12 && tempcontentStylessize<=contentStylessize){
				contentStyles.size = tempcontentStylessize;
			}
			
		}
		
		
		//Button font size
		if(buttonStylessize>=12){
			if(thewidth>=1024){
				buttonStyles.size = buttonStylessize;
			}else if(thewidth>= 768){
				var tempNum = Math.round(buttonStylessize-2);
				if(tempNum>=12){
					buttonStyles.size = tempNum
				}else{
					buttonStyles.size = 12
				}
			}else if(thewidth>= 360){
				buttonStyles.size = 12
			}else{
				buttonStyles.size = 10
			}
			
			var tempbuttonStylessize = buttonStyles.size*scaleW;
			if(tempbuttonStylessize>=12 && tempbuttonStylessize<=buttonStylessize){
				buttonStyles.size = tempbuttonStylessize;
			}
			
		}
		
		
		//Header font size
		if(headerStylessize>=16){
			if(thewidth>=1024){
				headerStyles.size = headerStylessize;
			}else if(thewidth>= 768){
				var tempNum = Math.round(headerStylessize-2);
				if(tempNum>=16){
					headerStyles.size = tempNum
				}else{
					headerStyles.size = 16
				}
			}else if(thewidth>= 360){
				headerStyles.size = 16
			}else{
				headerStyles.size = 14
			}
			
			var tempheaderStylessize = headerStyles.size*scaleW;
			if(tempheaderStylessize>=16 && tempheaderStylessize<=headerStylessize){
				headerStyles.size = tempheaderStylessize;
			}
			
		}
		
		//Instructions font size
		if(instStylessize>=12){
			if(thewidth>=1024){
				instStyles.size = instStylessize;

			}else if(thewidth>= 768){
				var tempNum = Math.round(instStylessize-2);
				if(tempNum>=12){
					instStyles.size = tempNum
				}else{
					instStyles.size = 12
				}
			}else if(thewidth>= 360){
				instStyles.size = 12
			}else{
				instStyles.size = 10
			}
			
			var tempinstStylessize = instStyles.size*scaleW;
			if(tempinstStylessize>=12 && tempinstStylessize<=instStylessize){
				instStyles.size = tempinstStylessize;
			}

		}
		
		//setupCustomStyles();
		setupStyle("#intTitle", headerStyles)
		setupStyle("#intInstructions", instStyles)
		setupStyle(".title", buttonStyles)
		setupStyle(".tab_content p", contentStyles)
	}else{
		
		contentStyles.size = contentStylessize;
		buttonStyles.size = buttonStylessize;
		headerStyles.size = headerStylessize;
		instStyles.size = instStylessize;
		
		if(theheight <= 360 || thewidth <= 360){
			contentStyles.size = 10;
			buttonStyles.size = 10;
			headerStyles.size = 14;
			instStyles.size = 10;
		}
		
		setupStyle("#intTitle", headerStyles)
		setupStyle("#intInstructions", instStyles)
		setupStyle(".title", buttonStyles)
		setupStyle(".tab_content p", contentStyles)
	}
	
	//Resize interaction
	var headerActiveSize;
	if (generalStyles.headerActive == 2) {
		headerActiveSize = -20
	}else{
		headerActiveSize = $('#headerColor').height();
	}
	
	var marginsW
	//if(thewidth>=1024){
		//marginsW = Math.round((27+scaleW) * scaleW);
	//}else if(thewidth>= 768){
		//marginsW = Math.round((25+scaleW) * scaleW);
	//}else{
		//marginsW = Math.round((19+scaleW) * scaleW);
	//}
	
	var marginsH = Math.round(10 * scaleH);
	marginsW = Math.round(8 * scaleW);
	
	$('#reveal').css('margin-left', marginsW+"px");
	$('#reveal').css('margin-right', marginsW+"px");
	$('#reveal').css('margin-top', marginsH+"px");
	
	$('#reveal').css('width',(680*scaleW));
	$('#reveal').css('height',(470*scaleH));
	
	var revealHeight = parseInt(String($('#reveal').css('height').replace("px","")));
	var revealWidth = parseInt(String($('#reveal').css('width').replace("px","")));
	
	var wspace = 42;
	var hspace = 100;
	var gSpace = 4.3;
	var setBtnHeight = false;
	var btnOrientation = "top"
	var contentBgH = 40
	
	if(currentTheme==1 || currentTheme==5 ||currentTheme==7 || currentTheme==12 || currentTheme==14 ||currentTheme==15 ){
		if(textArray.length==2){
			gSpace = 5.7;
		}else if(textArray.length==3){
			gSpace = 5.0;
		}else if(textArray.length==4){
			gSpace = 4.3;
		}else if(textArray.length==5){
			gSpace = 3.6;
		}
		wspace = 42;
		hspace = 100;
	} else if(currentTheme==2 || currentTheme==13){
		if(textArray.length==2){
			gSpace = 7.1;
		}else if(textArray.length==3){
			gSpace = 5.9;
		}else if(textArray.length==4){
			gSpace = 4.8;
		}else if(textArray.length==5){
			gSpace = 4.1;
		}
		wspace = 40;
		hspace = 120;
	} else if(currentTheme==3 || currentTheme==8 || currentTheme==10 || currentTheme==16){
		if(textArray.length==2){
			gSpace = 42;
		}else if(textArray.length==3){
			gSpace = 16;
		}else if(textArray.length==4){
			gSpace = 7.3;
		}else if(textArray.length==5){
			gSpace = 3.8;
		}
		wspace = 40;
		hspace = 80;
		setBtnHeight = true;
		btnOrientation = "left"
	} else if(currentTheme==4 || currentTheme==9){
		if(textArray.length==2){
			gSpace = 38;
		}else if(textArray.length==3){
			gSpace = 15;
		}else if(textArray.length==4){
			gSpace = 7.3;
		}else if(textArray.length==5){
			gSpace = 3.4;
		}
		wspace = 40;
		hspace = 80;
		setBtnHeight = true;
		btnOrientation = "right"
	} else if(currentTheme==6 || currentTheme==11 || currentTheme==17){
		if(textArray.length==2){
			gSpace = 6.0;
		}else if(textArray.length==3){
			gSpace = 5.2;
		}else if(textArray.length==4){
			gSpace = 4.3;
		}else if(textArray.length==5){
			gSpace = 3.6;
		}
		wspace = 42;
		hspace = 100;
		contentBgH = 50
		btnOrientation = "bottom"
	} 
	
	
	$('#tabs_content_container').css('width',(revealWidth-wspace));
	$('#tabs_content_container').css('height',((revealHeight-headerActiveSize)-(hspace)));
	
	var contentBg = document.getElementById("content_bg");
	//contentBg.style.width = ((revealHeight-headerActiveSize)-40)+"px"
	contentBg.style.height = ((revealHeight-headerActiveSize)-contentBgH)+"px"
	
	var contentDisheight = parseInt(String($('#tabs_content_container').height()))
	var contentDisWidth = parseInt(String($('#tabs_content_container').width()));
	
	
	var titleBtnWidth = (contentDisWidth/textArray.length) - (gSpace*textArray.length)
	var titleBtnheight = ((contentDisheight/textArray.length) - (gSpace*textArray.length))
	for(i=0;i<textArray.length;i++){
		if($('#tab'+i).find('img').length){
			$('#tab'+i).find('img').css('width','150px');
			$('#tab'+i).find('img').css('height','150px');
		}
	}
	
	console.log(setBtnHeight)
	if(setBtnHeight){
		if(titleBtnWidth<=80){
			titleBtnWidth = 80
			
			for(i=0;i<textArray.length;i++){
				if($('#tab'+i).find('img').length){
					$('#tab'+i).find('img').css('width','120px');
					$('#tab'+i).find('img').css('height','120px');
				}
			}
		}
		$('.title').css('height',(titleBtnheight))
		$('.title').css('width',(titleBtnWidth))
	}else{
		$('.title').css('height',"4%");
		var titleinnerheight = $('.title').innerHeight();
		$('.title').css('height',titleinnerheight);
		$('.title').css('width',(titleBtnWidth))
	}
	
	if(btnOrientation == "top"){
		$('.scroll-pane').css('height',(contentDisheight));
	}else if(btnOrientation == "left"){
		$('.scroll-pane').css('height',(contentDisheight));
		$('.scroll-pane').css('width',(contentDisWidth - parseInt(String($('.title').css('width'))))-15);
	}else if(btnOrientation == "right"){
		$('.scroll-pane').css('height',(contentDisheight));
		$('.scroll-pane').css('width',(contentDisWidth - parseInt(String($('.title').css('width'))))-15);
	}else if(btnOrientation == "bottom"){
		$('.scroll-pane').css('height',(contentDisheight-10));
		$('#tabs_container').css('position', 'absolute');
		$('#tabs_container').css('top', ((contentDisheight+headerActiveSize)+40)+'px');
		$('#tabs_container').css('width',(contentDisWidth+20)+'px');
	}
}

function addClickHandlers() {
	$("#reveal").show();
		$("#tabs li").mouseleave(function() {
  		var main = $(this).parent().hasClass('activeBtn')
		if (!main) {
			outState(this);
		}
	});
	
	$("#tabs li").mouseenter(function() {
			 var main = $(this).parent().hasClass('activeBtn')
			if (!main) {
				overState(this);
			}
	});
		
	 $("#tabs li").click(function (e) {
		$("#tabs li a").removeClass('activeBtn');
		$("#tabs li a").addClass('unactive');
		$(this).find("a").removeClass('unactive');
		$(this).find("a").addClass("activeBtn");
		$(".tab_content").hide();
		var selected_tab = "#tab" + $(this).find("a").attr("id");
		
		btnClicked = e.target.id;
		$(selected_tab).fadeIn(function() {
			pauseSound();
			if (soundArray[btnClicked] != "-1") {
				setTimeout("play_sound(soundArray[btnClicked])",50);
			}
		 });
		
		$('.unactive').css('color', buttonStyles.color);
		$('.unactive').css('background-color', generalStyles.btnColorUp);
		$('.activeBtn').css('background-color', generalStyles.btnColorDown);//generalStyles.btnColorDown);
		$('.activeBtn').css('color', buttonStyles.textDown);//generalStyles.btnColorDown);
		});
		
	$("#tabs li").keydown(function (e) {

		if(e.keyCode  == 13 || e.keyCode  == 32) {
			$("#tabs li a").removeClass('activeBtn');
			$("#tabs li a").addClass('unactive');
			$(this).find("a").removeClass('unactive');
			$(this).find("a").addClass("activeBtn");
			$(".tab_content").hide();
			var selected_tab = "#tab" + $(this).find("a").attr("id");
			
			btnClicked = e.target.id;
			$(selected_tab).fadeIn(function() {
				pauseSound();
				if (soundArray[btnClicked] != "-1") {
					setTimeout("play_sound(soundArray[btnClicked])",50);
				}
			 });
			
			$('.unactive').css('color', buttonStyles.color);
			$('.unactive').css('background-color', generalStyles.btnColorUp);
			$('.activeBtn').css('background-color', generalStyles.btnColorDown);//generalStyles.btnColorDown);
			$('.activeBtn').css('color', buttonStyles.textDown);//generalStyles.btnColorDown);
		}
		});
}

			
function overState(obj) {
	$(this).find("a").addClass('overBtn');
	
	$('.overBtn').css('background-color', generalStyles.btnColorOver);
	$('.overBtn').css('color', buttonStyles.textOver);
	
}

function outState(obj2) {
	//alert("out");
	var dad = $(obj2).parent();
	
	$(this).find("a").addClass('unactive');
	$(this).find("a").removeClass('overBtn');
	$('.unactive').css('background-color', generalStyles.btnColorUp);
	$('.unactive').css('color', buttonStyles.color);
	
}


/*var theSnd = null;

function pauseSound() {
	if(theSnd != null) // && theSnd.src != wavePath)
	{ theSnd.pause();}
}

function play_sound(url){
	theSnd = new Audio(url);
	theSnd.load();
	theSnd.play();	
}*/

//Modifying the sound function - Audio load and play is now handled by captivate: IF it does not handle the audio revert to old code.
//This fix was mainly  implemented for IPAD.
var isDevice = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	isDevice = true
}
//var isDevice = navigator.userAgent.match(/iPad/i) != null;
var theSnd = null;
var theSndURL = null;


function pauseSound() {
	if(isDevice){
		if(!this.handle)
		return;
		
		if(!this.handle.stopWidgetAudio(theSndURL)){
			if(theSnd != null){ 
				theSnd.pause();
			}
		}else{
			this.handle.stopWidgetAudio(theSndURL)
		}
	} else {
		if(theSnd != null) // && theSnd.src != wavePath)
		{ theSnd.pause();}
	}
}

function play_sound(url){
	if(isDevice){
		if(!this.handle)
		return;
		
		theSndURL = url;
		if(!this.handle.playWidgetAudio(url)){	
			theSnd = new Audio(url);
			theSnd.load();
			theSnd.play();
		}else{
			this.handle.playWidgetAudio(url)
		}
	}else{
		theSnd = new Audio(url);
		theSnd.load();
		theSnd.play();	
	}
}

function adjustTabs(amount,amountTwo){
	$('#tabs li a').css('padding-top',amount+'px');
	$('#tabs li a').css('padding-bottom',amount+'px');
	$('#tabs li a').css('margin-top',amountTwo+'px');
}

function adjustOtherThemes(tabCount){
	switch(tabCount){
		case 2:
			adjustTabs(33,14);
		break;
		case 3:
			adjustTabs(16,13);
		break;
		case 4:
			adjustTabs(12,6);
		break;
		case 5:
			adjustTabs(7,5);
		break;
	}
}

function adjustThemes(tabCount){
	switch(tabCount){
		case 2:
			adjustTabs(35,16);
		break;
		case 3:
			adjustTabs(20,10);
		break;
		case 4:
			adjustTabs(14,5);
		break;
		case 5:
			adjustTabs(9,4);
		break;
	}
}

////////////////////////////////////////////////////////

function moveNav() { 
	$('#tabs_container').css('position', 'absolute');
	$('#tabs_container').css('top', '350px');

}


function setupCustomStyles() {
generalStyles.headerColor = formatColor(generalStyles.headerColor); //generalStyles.headerColor.substring(2);
	generalStyles.contentBodyColor = formatColor(generalStyles.contentBodyColor); //"#" + generalStyles.contentBodyColor.substring(2);
	generalStyles.bodyColor = formatColor(generalStyles.bodyColor); //"#" + generalStyles.bodyColor.substring(2);
	//generalStyles.arrowColor = formatColor(generalStyles.arrowColor);
	generalStyles.btnColorUp = formatColor(generalStyles.btnColorUp);
	generalStyles.btnColorOver = formatColor(generalStyles.btnColorOver);
	generalStyles.btnColorDown = formatColor(generalStyles.btnColorDown);
	//generalStyles.lineColor = formatColor(generalStyles.lineColor);	

	buttonStyles.color  = formatColor(buttonStyles.color);
	buttonStyles.textOver = formatColor(buttonStyles.textOver);
	buttonStyles.textDown = formatColor(buttonStyles.textDown);

	//alert(generalStyles.lineColor);
		if (currentTheme != 3 && currentTheme != 11 && currentTheme != 16) {
			$('#headerColor').css('background-color', generalStyles.headerColor)//generalStyles.headerColor);
		} else {
			$('#headerColor').css('background-color', generalStyles.bodyColor)//generalStyles.headerColor);
			
		}//$('#headerColor').css('background-image', 'none');
	$('#tabs_content_container').css('background-color', generalStyles.contentBodyColor);
	$('#content_bg').css('background-color', generalStyles.bodyColor);
	
	$('#reveal').css('background-color', generalStyles.bodyColor);
	
	$('.title').css('background-color', generalStyles.btnColorUp);
	$('.title').css('cursor', 'pointer');
	
	
	
	//$('.title').css('color', 'blue');//buttonStyles.color);
	
		/*$('.unactive').css('color', buttonStyles.color);
		$('.unactive').css('background-color', generalStyles.btnColorUp);*/
		
	
	if (currentTheme == 3 || currentTheme == 4 || currentTheme == 8 || currentTheme == 9 || currentTheme == 10 || currentTheme == 16) {
		$('.scroll-pane').css('width', '385px'); 
		
	}

	if (generalStyles.headerActive == 2) {
		$('#headerColor').css('display', 'none');
	}


	//alert(generalStyles.btnColorDown);
	//$('div.timelineNode').css('background-color', generalStyles.btnColorOver);
	//$('.timelineNode:hover').css('background-color', generalStyles.btnColorOver);
	//$('div.active').css('background-color', generalStyles.btnColorOver);
	
	//#headerColor { 
	//background-color:#069;

	//generalStyles.headerActive = theTextProps.children('general').attr("headerActive");
		//generalStyles.arrowColor = theTextProps.children('general').attr("arrowColor");
		//generalStyles.headerColor = theTextProps.children('general').attr("headerColor");
		//generalStyles.contentBodyColor = theTextProps.children('general').attr("contentBodyColor");
		//generalStyles.bodyColor = theTextProps.children('general').attr("bodyColor");
		//generalStyles.btnColorUp = theTextProps.children('general').attr("btnColorUp");
		//generalStyles.btnColorOver = theTextProps.children('general').attr("btnColorOver");
		//generalStyles.btnColorDown = theTextProps.children('general').attr("btnColorDown");
}