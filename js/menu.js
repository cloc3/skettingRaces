function show(id) {
	obj=document.getElementById(id);
	obj.style.backgroundColor="#FFFFFF";
	obj=obj.lastChild;
	obj.style.visibility="visible";
}
function hide(id) {
	obj=document.getElementById(id);
	obj.style.backgroundColor="transparent";
	obj=obj.lastChild;
	obj.style.visibility="hidden";
	
}
function browser() {
	if (window.navigator.appName=="Microsoft Internet Explorer") {
		ul_submenu.style.left="-100px";
		ul_submenu.style.width="180px";
		document.getElementById("colonna_sx").style.width="90";
		document.getElementById("colonna_dx").style.marginTop="50";
	}
}

function change() {
	img=arguments[0];
	str=img.name;
	str+="_hover.png";
	img.src=str;
}

function revite() {
	img=arguments[0];
	str=img.name;
	str+=".png";
	img.src=str;
}
