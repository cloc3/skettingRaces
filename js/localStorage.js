var nG;
var cG;
var offset;

function ultimaOccorenza(string,re) {
	var split=string.split(re);
	var out = [''];
	for (i=0;i<split.length-1;i++) out[0]+=split[i]+'_';
	out[0]=out[0].slice(0,-1);
	out[1]=split[split.length-1];
	return out
}

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function salvaGara(key,value) {
	if (!supports_html5_storage()) {return false;}
	localStorage.setItem(key,value);
}

function statoAttuale() {
	return [JSON.stringify(localStorage)];
}

function recupero() {
	if(localStorage.getItem('pattinaggio.nG')!==null) {
		nG=localStorage['pattinaggio.nG'];
		offset=2*nG+1;
		cG=3*nG+1;
		document.getElementById('radiogroup').style.display='none';
		rigaGiudici();
		document.getElementById('areaDiLavoro').style.display='block';
		for (var i=0; i<localStorage.length;i++) {
			chiave = localStorage.key(i);
			if (chiave != 'pattinaggio.nG') {
				if (chiave[0] == '_') {
					document.getElementById(chiave.slice(1)).innerHTML=localStorage[chiave];
				} else {
					var riga=ultimaOccorenza(chiave,/_/);
					inserisciRiga(riga[0],true)
					totale(chiave,localStorage[chiave]);
				}
			}
		}
		ordine(posizione);
	}
}

function riavvia() {
	if (!supports_html5_storage()) {return false;}
	window.addEventListener("DOMContentLoaded", function() {recupero()})
}

function reset() {
	if (confirm('Desideri vuotare il programma, perdendo tutti i dati?')) {
	  classificaAvulsa=undefined;
	  gara = new classifica('_classifica');
	  if (!supports_html5_storage()) {return false;}
		  localStorage.clear();
			window.location.reload();
	}
}
