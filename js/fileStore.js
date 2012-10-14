function caricaFile(evt) {
	var files = evt.target.files;
	file = files[0];

	reader = new FileReader;
	reader.readAsText(file);
	reader.onloadend = function(evt) {
		if (evt.target.readyState == FileReader.DONE) {
			var externalStorage = JSON.parse(evt.target.result);
			for (var i=0;i<Object.keys(externalStorage).length;i++) {
				chiave=Object.keys(externalStorage)[i]
				localStorage.setItem(chiave,externalStorage[chiave]);
			}
			recupero();
			document.getElementById('radiogroup').style.display='none';
			document.getElementById('areaDiLavoro').style.display='block';
		}
	}
}

window.addEventListener("DOMContentLoaded", function() {
	document.getElementById('caricaFile').addEventListener('change', caricaFile, false);
});

function salvaSuFile(aFileParts,id) {
	//if (!(window.requestFileSystem && window.File && window.FileReader && window.FileList && window.Blob)) {
	if (!(window.Blob)) {
		alert('The File APIs non sono sufficientemente supportate in quest browser. Non sarà possiible salvare questo documento');
		return;
	}
	var oMyBlob = new Blob(aFileParts, { "type" : "application\/object-stream" });

	var objectURL = window.URL.createObjectURL(oMyBlob)
	window.open(objectURL);
}
