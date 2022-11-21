// On sélectione le H1 du chronometre + on crée des variables
let  bouton_valide = document.querySelector("#valide");
let h1 = document.querySelectorAll("#chrono")[0],
  seconde = 0,
  minutes = 0,
  temps;

// On crée une fonction qui permet d'ajouter + 1 au minute quand le chrono est à 60 seconde et on ajoute du texte


function chrono() {
  seconde++;
  if (seconde >= 60) {
    seconde = 0;
    minutes++;
  }

  h1.textContent =
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" +
    (seconde > 9 ? seconde : "0" + seconde);

  timer();
}

//On crée une fonction temps pour le chrono se lance en une seconde

 function timer() {
  temps = setTimeout(chrono, 1000);
}

bouton_valide.addEventListener("click", chrono);