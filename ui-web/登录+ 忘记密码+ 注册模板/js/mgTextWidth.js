/****************************************************************
 *																*		
 * 						      代码库							*
 *                        www.dmaku.com							*
 *       		  努力创建完善、持续更新插件以及模板			*
 * 																*
****************************************************************/
/**
 *	Copyright (c) 2012 - 2013 Mega-Intel Co. (http://www.maiganerp.com)
 *	
 *	version:	0.9.9, 2013.08.11 - 2013.08.12
 *	author:		zhangwei
 *	note:		Get text width given text, fontSize and fontName.
 *	range:		12px - 50px, IE, Chrome
 *	caution:	Firefox comes with a bug in width calculation, so there may be 1 or 2 pixels error.
 */

var MG_TEXT_WIDTH_CHAR_IDS = {
		// 微软雅黑
		"MYH":"·,.:;…N—abpcxdgqefhijlkmnuorstvwyzABCDEFGHIJKLMOQPRSTUVWXYZ`~^=+<>1234567890$!@#%&*()[]{}-_\\|?/'\" ",
		// Verdana
		"VER":"·abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~1234567890!#$%^&*()-=_+[]{}\\|,.<>?/:;'\" ",
		"TAH":"·abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~1234567890!@#$%^&*()-=_+[]{}\\|,.<>?/:;'\" "
}
var MG_TEXT_WIDTH_FACTORS = {
		// 微软雅黑
		"MYH":[0.2415, 0.2415, 0.2415, 0.2415, 0.2415, 0.8139, 0.8139, 1.0802, 0.5533, 0.6394, 0.6394, 0.5079, 0.5079, 0.6402, 0.6402, 0.6402, 0.5674, 0.3472, 0.6154, 0.2663, 0.2663, 0.2663, 0.5459, 0.9363, 0.6163, 0.6163, 0.6369, 0.3821, 0.4632, 0.3730, 0.5252, 0.7891, 0.5286, 0.4921, 0.7032, 0.6270, 0.6667, 0.7618, 0.5500, 0.5318, 0.7436, 0.7734, 0.2945, 0.3962, 0.6351, 0.5136, 0.9773, 0.8147, 0.8147, 0.6121, 0.6528, 0.5781, 0.5732, 0.7461, 0.6766, 1.0185, 0.6452, 0.6038, 0.6203, 0.2953, 0.7419, 0.7419, 0.7419, 0.7419, 0.7419, 0.7419, 0.5864, 0.5864, 0.5864, 0.5864, 0.5864, 0.5864, 0.5864, 0.5864, 0.5864, 0.5864, 0.5864, 0.3135, 1.0314, 0.6385, 0.8892, 0.8710, 0.4541, 0.3333, 0.3333, 0.3333, 0.3333, 0.3333, 0.3333, 0.4326, 0.4483, 0.4152, 0.2696, 0.4830, 0.4285, 0.2564, 0.4359, 0.2968],
		// Verdana
		"VER":[0.3631, 0.6005, 0.6237, 0.5211, 0.6237, 0.5964, 0.3524, 0.6237, 0.6328, 0.2763, 0.3441, 0.5917, 0.2763, 0.9732, 0.6328, 0.6070, 0.6237, 0.6237, 0.4269, 0.5212, 0.3947, 0.6328, 0.5914, 0.8191, 0.5914, 0.5914, 0.5256, 0.6840, 0.6852, 0.6998, 0.7709, 0.6328, 0.5760, 0.7750, 0.7527, 0.4205, 0.4541, 0.6915, 0.5569, 0.8429, 0.7452, 0.7874, 0.6034, 0.7874, 0.6952, 0.6840, 0.6166, 0.7322, 0.6840, 0.9975, 0.6857, 0.6162, 0.6857, 0.6369, 0.8180, 0.6369, 0.6369, 0.6369, 0.6369, 0.6369, 0.6369, 0.6369, 0.6369, 0.6369, 0.6369, 0.3945, 0.8172, 0.6369, 1.0761, 0.8180, 0.7270, 0.6374, 0.4541, 0.4541, 0.4555, 0.8171, 0.6369, 0.8171, 0.4541, 0.4541, 0.6351, 0.6351, 0.4541, 0.4549, 0.3631, 0.3631, 0.8171, 0.8171, 0.5459, 0.4541, 0.4541, 0.4541, 0.2680, 0.4584, 0.3524],
		// Tahoma
		"TAH":[0.3540, 0.5252, 0.5533, 0.4624, 0.5533, 0.5269, 0.3184, 0.5533, 0.5583, 0.2258, 0.2821, 0.4921, 0.2258, 0.8404, 0.5583, 0.5434, 0.5533, 0.5533, 0.3606, 0.4467, 0.3342, 0.5583, 0.4938, 0.7428, 0.4938, 0.4938, 0.4442, 0.6020, 0.5897, 0.6005, 0.6782, 0.5608, 0.5211, 0.6658, 0.6749, 0.3724, 0.4177, 0.5875, 0.4921, 0.7709, 0.6658, 0.7083, 0.5517, 0.7083, 0.6203, 0.5576, 0.5851, 0.6559, 0.5975, 0.9021, 0.5806, 0.5769, 0.5591, 0.5459, 0.7270, 0.5459, 0.5459, 0.5459, 0.5459, 0.5459, 0.5459, 0.5459, 0.5459, 0.5459, 0.5459, 0.3309, 0.9098, 0.7270, 0.5459, 0.9762, 0.7270, 0.6749, 0.5465, 0.3830, 0.3830, 0.3631, 0.7270, 0.5459, 0.7262, 0.3830, 0.3830, 0.4821, 0.4821, 0.3830, 0.3833, 0.3036, 0.3036, 0.7270, 0.7270, 0.4739, 0.3830, 0.3540, 0.3540, 0.2115, 0.4003, 0.3135]
		
	};
var MG_TEXT_WIDTH_FIX = {
		"MYH":"E",
		"VER":"abcdefgiklmopqrstwxzBCDFGHIKMNOPQRTUWY#%*-=+|<>\"",
		"TAH":"ceilmtvwxyABCDGHIKMNOQSTUVWY!%*+|"
	};
var MG_TEXT_WIDTH_DELTA = {
		"MYH":[
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1]
		],
		"TAH":[
			[0, 0, 1],	//c
			[1],	//e
			[-1, 0, -1, -1],	//i
			[-1, 0, -1, -1],	//l
			[0, 0, 0, 0, 1], 	//m
			[1], 	//t
			[0, 0, 1, 1], 	//v
			[1, 0, 0, -1],	//w
			[0, 0, 1, 1],	//x
			[0, 0, 1, 1],	//y
			[1, 0, 0, 0, 1, 1],	//A
			[0, -1, 0, 0, 0, 0, 0, 0, 0, 1],	//B
			[0, 0, 1],	//C
			[0, -1, 1],	//D
			[0, -1],	//G
			[0, -1],	//H
			[0, -1, -1],	//I
			[0, -1],	//K
			[0, 0, -1],	//M
			[0, -1],	//N
			[1, 0, 0, 0, 1],	//O
			[1, 0, 0, 0, 1],	//Q
			[0, 1],	//S
			[1, 0, 0, 1, 1],	//T
			[0, -1, 0, 0, 1],	//U
			[1],	//V
			[1, 0, 1],	//W
			[1, 0, 0, 1, 1],	//Y
			[0, 0, -1, -1, -1],
			[0, -1],	//%
			[0, 1],	//*
			[-1, -1],	//+
			[0, 1]	//|
		],
		"VER":[
			[1],	//a
			[1],
			[0, 1],
			[1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1],
			[0, -1, -1, -1, 1, 0, 0, 1, 0, 0, 0, 0, -1, -1, 0, 0, 1, 1, 1, 0, 0, 0, 0, -1, -1, 0, 0, 1, 1, 1, 0, 0, 0, 0, -1, 0, 0, -1, 1],
			[0, -1],	//k
			[0, -1, -1, -1, 1, 0, 0, 1, 0, 0, 0, 0, -1, -1, 0, 0, 1, 1, 1, 0, 0, 0, 0, -1, -1, 0, 0, 1, 1, 1, 0, 0, 0, 0, -1, 0, 0, -1, 1],
			[-1, -2, -1],
			[1, 0, 1, 1],
			[1], 	//p
			[1],
			[0, -1],
			[1, 0, 1],
			[0, 1],
			[1, 0, 0, 1],	//w
			[0, -1, 1],
			[1, 0, 1, 1],
			[0, -1],	//B
			[1, 0, 0, 1],
			[0, -1, 0, -1],
			[0, 1],
			[0, -1],
			[0, -1, -1],	//H
			[0, 0, -1, -1, 0, 1, 0, 0, 0, -1, 1, 0, 0, -1, 0, 0, 1, 1, 0, 0, 0, -1, 1, 0, 0, 0, 0, 0, -1, 1, 0, 0, 0, -1, -1, 1, 1],
			[0, -1],
			[0, 0, -1],
			[0, -1],
			[1],	//O
			[1],	//P
			[1],
			[0, -1],
			[0, 1],
			[0, -1],
			[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1], 	//W
			[0, 1, 0, 0, 1],
			[0, -1],	//#
			[0, -1],
			[0, 1],
			[0, 1, 1],
			[-1, -2],
			[-1, -2],
			[0, 1],
			[-1, -2],	//<
			[-1, -2],
			[0, -1]
		]	
		
	}
	
/* 获取带省略号情况下的有效显示字符长度 */
function getShowLength(text, fontSize, fontName, widthLimit) {
	var additionWidth = getTextWidth('...', fontSize, fontName);
	text = text.replace(/(^\s*)|(\s*$)/g, "");
	text = text.replace(/ +/g, " ");
	var currentWidth = 0;
	var charCount = 0;
	var len = text.length;
	
	for (var i=0; i<len; i++) {				
		currentWidth += getCharWidth(text.charAt(i), fontSize, fontName);				
		if (currentWidth+additionWidth <= widthLimit) {
			charCount ++;
		} else {
			break;
		}
	}
	
	if (charCount == len) {
		return -1;
	} else if (charCount == len-1) {
		if (currentWidth <= widthLimit) {
			return -1;
		}
	}
	
	return charCount;	
}

function getCharWidth(chr, fontSize, fontName) {
	var factor = 1;	
	var delta = 0;
	var getIDS = MG_TEXT_WIDTH_CHAR_IDS[fontName];
	if(!getIDS){
		getIDS = MG_TEXT_WIDTH_CHAR_IDS['MYH'];
		fontName = 'MYH';
	}
	var offset =  getIDS.indexOf(chr);
	if (offset >= 0) {
		factor = MG_TEXT_WIDTH_FACTORS[fontName][offset];				
		var deltaOffset = MG_TEXT_WIDTH_FIX[fontName].indexOf(chr);
		if (deltaOffset >= 0) {					
			delta = MG_TEXT_WIDTH_DELTA[fontName][deltaOffset][fontSize-12];
			if (delta == undefined) {
				delta = 0;					
			}
		}
	}
	
	return Math.round(factor * fontSize) + delta;
}

function getTextWidth(text, fontSize, fontName) {	
	text = text.replace(/(^\s*)|(\s*$)/g, "");
	text = text.replace(/ +/g, " ");
	var totalWidth = 0;
	var len = text.length;
	
	for (var i=0; i<len; i++) {				
		totalWidth += getCharWidth(text.charAt(i), fontSize, fontName);				
	}
	
	return totalWidth;
}

function getFontName(parent) {
	var testSpan = document.createElement('span');
	testSpan.style.visibility = 'hidden';
	testSpan.style.fontSize = '50px';
	testSpan.style.whiteSpace = 'nowrap';
	testSpan.appendChild(document.createTextNode('~'));
	parent.appendChild(testSpan);
	var testWidth = testSpan.offsetWidth;
	parent.removeChild(testSpan);
	
	switch (testWidth) {
		case 37:
			return 'MYH';			
		case 41:
			return 'VER';
		case 36:
			return 'TAH';
		case 29:
			return 'ARI';
		case 32:
			return 'GEO';
		case 27:
			return 'TIM';
		case 34:
			return 'SEG';
	}
	
	return false;
}

/*
var myDate = new Date();
var mytime=myDate.toLocaleTimeString();    //获取当前时间

var otime = document.getElementById('time');
var tt;
for (var i=0; i<1; i++) {
	tt = getTextWidth("·ab我cdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~1234567890!@#$%^&*()-=_+[]{}\\|,.<>?/:;'\"", 30, "TAH");	//e
}

var myDate2 = new Date();
var mytime2=myDate2.toLocaleTimeString();    //获取当前时间
otime.innerHTML = mytime + " | " +mytime2;
alert("tt"+tt);
*/