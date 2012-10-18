function cellaRigaGiudici(string) {
	var td = document.createElement('td');
	td.innerHTML=string
	document.getElementById('rigaGiudici').appendChild(td);
}

function rigaGiudici() {
	document.getElementById('rigaGiudici').innerHTML='';
	cellaRigaGiudici('');
	for (var i=0;i<3*nG;i++) {
		var label=97+Number(i%nG); 
		cellaRigaGiudici('&#'+label+';')
	}
	cellaRigaGiudici('TOT');
	cellaRigaGiudici('cG');
	cellaRigaGiudici('spareggi');
	var span = document.getElementsByName('colspan');
	for (var i=0;i<span.length;i++) {
		span[i].setAttribute('colspan',nG);
	}
	var span = document.getElementsByName('span');
	for (var i=0;i<span.length;i++) {
		span[i].setAttribute('span',nG);
	}
}

function numeroGiudici(el) {
	var radioButtons=el.parentNode.getElementsByTagName('input');
	for (var i=0;i<radioButtons.length;i++) {
		if (radioButtons[i].checked) nG=radioButtons[i].value;
	}
	salvaGara('pattinaggio.nG',nG);
	offset=2*nG+1;
	cG=3*nG+1;
	el.parentNode.style.display='none';
	rigaGiudici();
	document.getElementById('areaDiLavoro').style.display='block';
}

function punteggio(totale,spareggi) {
	this.totale=totale
	this.spareggi=spareggi
}

function aggiornaPunteggio(graduatoria,punteggio,atletaAttuale,avversario,confrontoDiretto,colonna) {
					punteggio.totale+=Number(confrontoDiretto);
					if (punteggio.hasOwnProperty(avversario)) {
						punteggio.totale-=Number(punteggio[avversario]);
						punteggio[avversario]=confrontoDiretto;
					}else{
						Object.defineProperty(graduatoria[atletaAttuale],avversario,{value: confrontoDiretto,writable:true,configurable:true,enumerable:true});
					}
					document.getElementById(atletaAttuale+colonna).innerHTML=punteggio.totale/2.
}

function classifica(colonna) {
	this.modifica = function (el) {
		var numeroAtleti = Object.keys(this).length;
		var childNodeAttuale = el.parentNode.parentNode
		var atletaAttuale=el.parentNode.parentNode.id
		if (numeroAtleti > 1) {
			var giudizi = childNodeAttuale.getElementsByTagName('td');
			for (var i=1;i<numeroAtleti;i++) {
				var vittorie=0;
				var avversario = Object.keys(this)[i];
				if (avversario != atletaAttuale) {
					var giudiziAvversario = document.getElementById(avversario).getElementsByTagName('td');
					for (var j=offset;j<Number(offset)+Number(nG);j++) {
						var a = Number(giudizi[j].innerHTML);
						var b = Number(giudiziAvversario[Number(j)].innerHTML)
						vittorie+=Number(confronta(a,b));
					}
					var confrontoDiretto=Number(confronta(Number(vittorie),Number(nG)));
					aggiornaPunteggio(this,this[atletaAttuale],atletaAttuale,avversario,confrontoDiretto,colonna)
					aggiornaPunteggio(this,this[avversario],avversario,atletaAttuale,Number(2)-Number(confrontoDiretto),colonna)
				}
			}
		}
	}
}

gara=new classifica('_classifica');

function totale(elId,value){
	var el=document.getElementById(elId);
	if (value==null) var value=el.value;
	el.value=value;
	var trId=ultimaOccorenza(elId,/_/)[0];
	var riga=document.getElementById(trId);
	var inputs=riga.getElementsByTagName('input');
	var celle=riga.getElementsByTagName('td');
	
	var somma=0;
	var giudici = new Array();
	for (var i=0;i<nG;i++) giudici[i]=Number(0);
	for (var i=0;i<inputs.length;i++) {
		var valore=Number(inputs[i].value);
		somma+=Number(valore);
		giudici[i%nG]+=Number(valore);
	}
	celle[cG].innerHTML=Number(celle[cG].innerHTML)+Number(el.value);
	for (var i in giudici) {
		celle[Number(i)+Number(offset)].innerHTML=giudici[i];
	}

	gara.modifica(el);
	//ordine(posizione);
	salvaGara(elId,el.value);
}

function cella(id,sel) {
	var cella = document.createElement('td');
	if (sel) {
		var input = document.createElement('input');
		input.setAttribute('type','text')
		input.setAttribute('onblur','totale(this.id)')
		input.setAttribute('id',id);
		input.setAttribute('disabled',1);
		input.setAttribute('onfocus','ascoltaUnTasto(this)');
		input.setAttribute('onselected','selezione(this)');
		input.setAttribute('maxlength',3);
		input.setAttribute('style','width:2em;text-align:center');
		cella.appendChild(input);
	}
	if (!sel) cella.setAttribute('id',id);
	return cella;
}

function confronta(a,b) {
	if (a<b) return 0
	if (a==b) return 1
	return 2
}

alfabetico=confronta;

function posizione(a,b) {
	var a=Number(document.getElementById(a+'_classifica').innerHTML)*10+Number(document.getElementById(a+'_spareggi').innerHTML);
	var b=Number(document.getElementById(b+'_classifica').innerHTML)*10+Number(document.getElementById(b+'_spareggi').innerHTML);
	return confronta(b,a);
}

function ricercaSpareggi(ids) {
	var parita=new Object;
		ids.forEach(function (el,index,array) {
			var pareggio=array.filter(function(El) {
					return (document.getElementById(El+'_classifica').innerHTML==document.getElementById(el+'_classifica').innerHTML)	
			});
			if (pareggio.length == 1) document.getElementById(pareggio[0]+'_spareggi').innerHTML='';
			if (pareggio.length >1) {
				if (parita[pareggio[0]]==undefined) {
					parita[document.getElementById(pareggio[0]+'_classifica').innerHTML] = new Array;
					pareggio.forEach(function (el) {
					parita[document.getElementById(pareggio[0]+'_classifica').innerHTML].push(el)});
				}
			}
		});
	for (var key in parita) {
		var classificaAvulsa= new classifica('_spareggi');
		for (var i=0;i<parita[key].length;i++) {
			var atleta=parita[key][i];
			Object.defineProperty(classificaAvulsa,atleta,{ value: new punteggio(0,0),writable:true,configurable:true,enumerable:true});
			for (var j=0;j<2*nG;j++) {
				if (j>0) classificaAvulsa.modifica(document.getElementById(atleta+'_'+j));
			}
		}
	}
}

function ordine(algoritmo) {
	var corpo=document.getElementById('corpoTabella');
	var children=corpo.childNodes;
	var ids= new Array;
	
	for (var i=0; i<children.length;i++) {
		ids[i]=children[i].id;
	}
	ricercaSpareggi(ids);
	ids.sort(algoritmo);
	
	for (var i in ids) {
		var scambio=document.getElementById(ids[i]);
		var title = document.getElementById(scambio.id);
		document.getElementById(scambio.id+'_classifica').setAttribute('title',title);
		corpo.appendChild(scambio);
	}
}

function rimuoviRiga(id) {
	var riga=document.getElementById(id);
	riga.parentNode.removeChild(riga);
}

function inserisciRiga(nomeRiga,skip) {
	if (nomeRiga=='') return;
	if (document.getElementById(nomeRiga) !== null) return;

	var menu = document.createElement('ul');
	menu.setAttribute('class','topmenu');
	menu.setAttribute('name','menu');
	var li = document.createElement('li');
	li.setAttribute('class','menu');
	menu.appendChild(li);
	var text = document.createTextNode(nomeRiga);
	li.appendChild(text);
	var subMenu = document.createElement('ul')
	subMenu.setAttribute('class','menu');
	li.appendChild(subMenu);
	var subLi = document.createElement('li');
	subLi.setAttribute('class','menu');
	subMenu.appendChild(subLi);
	var ancora = document.createElement('a');
	ancora.setAttribute('title','rimuoviUtente');
	ancora.setAttribute('onclick','rimuoviRiga("'+nomeRiga+'")');
	ancora.appendChild(document.createTextNode('rimuovi'));
	subLi.appendChild(ancora);

	riga = document.createElement('tr');
	riga.setAttribute('id',nomeRiga);
	var td = document.createElement('td');
	riga.appendChild(td)
	td.appendChild(menu)

	for (var i=0;i<2*nG;i++) riga.appendChild(cella(nomeRiga+'_'+i,true));
	for (var i=0;i<nG;i++) riga.appendChild(cella());

	riga.appendChild(cella(nomeRiga+'_totale'));
	riga.appendChild(cella(nomeRiga+'_classifica'));
	riga.appendChild(cella(nomeRiga+'_spareggi'));

	document.getElementById('corpoTabella').appendChild(riga);
	Object.defineProperty(gara,nomeRiga,{ value: new punteggio(0,0),writable:true,configurable:true,enumerable:true});
	if (skip==false) salvaGara(nomeRiga+'_0',0);
	document.getElementById('nomeAtleta').value='';
	document.getElementById('nomeAtleta').focus();
};


function RWswitch(y) {
	var inputs = document.getElementById('corpoTabella').getElementsByTagName('input');
	for (var i=0;i<inputs.length;i++) {
		if (y)	{
			inputs[i].setAttribute('disabled',1);
			document.getElementById('inserimentoAtleti').style.display='block'
			document.getElementById('inserimentoPunteggi').style.display='none'
		} else {
			inputs[i].removeAttribute('disabled');
			document.getElementById('inserimentoAtleti').style.display='none'
			document.getElementById('inserimentoPunteggi').style.display='block'
		}
	}
}

function modifica(el,text,value) {
	var nuovoTesto=prompt(text,value)
	if (nuovoTesto == '') return;
	el.innerHTML=nuovoTesto;
	salvaGara('_'+el.id,nuovoTesto)
}

riavvia();
