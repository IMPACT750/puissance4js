const etatJeu = {
  cellules: [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ],
  // Deux joueurs possibles : "BLEU" ou "ORANGE"
  joueur: "BLEU",
};

// Selection les élements du tableau
// création de fonction

const iconx = "😀";
const icono = "😛";

function jouer(event) {
  console.log(event.target.id);
  const id = event.target.id;
  const idinfo = id.split("-");
  const ligne = Number(idinfo[1]);
  const colonne = Number(idinfo[2]);
  console.log(colonne, ligne);
  const etatCelules = etatJeu.cellules[ligne][colonne];
  if (etatCelules !== null) return;
  const icon = etatJeu.joueur === "BLEU" ? iconx : icono;
  event.target.textContent = icon;
  etatJeu.cellules[ligne][colonne] = etatJeu.joueur;
  etatJeu.joueur = etatJeu.joueur === "BLEU" ? "ROND" : "BLEU";
}
const cellules = document.querySelectorAll(".case");
for (const cellule of cellules) {
  cellule.addEventListener("click", jouer);
}
