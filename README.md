skettingRaces
=============

web program for sketting races (white system http://www.fihp.org/artistico/iniziative/sistemawhite.pdf )
============
nome: pattinaggio.

descrizione: programmino per calcolare i punteggi durante le gare di pattinaggio, basato su javascript per web-apps.

autore: "Marco Clocchiatti"<ziapannocchia@gmail.com>

repository: https://github.com/cloc3/skettingRaces

data: ottobre 2012

licenza: GPL3

Link:
* http://www.cloc3.net/pattinaggio
* http://www.cloc3.net/pattinaggio/pattinaggio.tar.bz2

istruzioni per l'uso: aprire il file index.html con un browser moderno (la prima versione è testata su firefox).

caratteristiche:
* interfaccia utente (quasi) autoesplicativa;
* friubilità via web, attraverso un servizio http, oppure sia in locale;
* conforme all'algoritmo del sistema white (http://www.fihp.org/artistico/iniziative/sistemawhite.pdf)
* adattabilità a gare con 3 giudici o con 5 giudici;
* possibilità di personalizzare l'intestazione;
* separazione funzionale delle fasi di scelta del numero dei giudici, inserimento degli atleti e inserimento dei punteggi;
* meccanismi di salvataggio istantaneo in locale del lavoro corrente (http://dev.w3.org/html5/webstorage) . Lo stato del sistema non si perde ricaricando la pagina o chiudendo il browser;
* meccanismo di salvataggio del lavoro corrente su file di testo e meccanismo di ricaricamento dello stesso file.

TODO (cose da fare):
* verifica e adeguamento della compatibiltà croos-browser per versioni recenti, con buon supporto al linguaggio javascript;
* miglioramento della grafica, attraveso una cura più attenta delle impostazioni css.
