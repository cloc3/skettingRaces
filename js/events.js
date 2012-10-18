function tab(el,step) {
	var table=document.getElementById('tabella');
	var inputs=table.getElementsByTagName('input');
	var inputsArray=new Array;
	var inputsLength=inputs.length
	for (var i=0;i<inputsLength;i++) {
		inputsArray[i]=inputs[i]
	}
	var next=(inputsLength+inputsArray.indexOf(el)+step)%inputsLength;
	inputs[next].focus();
}

function selezione(el) {
	var x=el.value;
	x=x.slice(0,el.selectionStart)+x.slice(el.selectionEnd);
	el.value=x;
}

function azioneRotellina(evt) {
	evt.preventDefault();
	evt.target.value=(101+Number(evt.target.value) - evt.detail/Math.abs(evt.detail))%101;
}

function azioneTastiera(evt) {
/*
	alert("onkeypress handler: \n"
 	     + "keyCode property: " + evt.keyCode + "\n"
 	     + "which property: " + evt.which + "\n"
 		     + "charCode property: " + evt.charCode + "\n"
 	     + "Character Key Pressed: "
 	     + String.fromCharCode(evt.charCode) + "\n"
 	    );
*/

	var keyChar=evt.which;
	var keyCode=evt.keyCode;

	if (keyCode==39) {
		evt.preventDefault();
		tab(evt.target,1);	
	}
		if (keyCode==37) {
		evt.preventDefault();
		tab(evt.target,-1);	
	}
		if (keyCode==38) {
		evt.preventDefault();
		tab(evt.target,-2*nG);	
	}
		if (keyCode==40) {
		evt.preventDefault();
		tab(evt.target,2*nG);
	}
		if (keyChar==43||keyCode==33) {
		evt.preventDefault();
		evt.target.value=Math.min(100,Number(evt.target.value) + 1)
	}
	if (keyChar==45||keyCode==34) {
		evt.preventDefault();
		evt.target.value=Math.max(0,Number(evt.target.value) - 1);
	}
	if (keyChar==8) return;

	if (keyChar!=0) { 
		if (keyChar > 46 && keyChar < 58) {
			evt.preventDefault();
			var x=evt.target.value;
			x+=Number(keyChar)-48;
			if (x>100) return;
			if (x<0) return;
			evt.target.value=x;
		}
	else evt.preventDefault();
	}
}

function ascoltaUnTasto(el) {
	el.addEventListener('keypress',azioneTastiera,false);
	el.addEventListener('DOMMouseScroll', azioneRotellina, false);
}
