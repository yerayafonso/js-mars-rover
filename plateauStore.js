let plateau = null;

function setPlateau(newPlateau) {
  plateau = newPlateau;
}

function getPlateau() {
  if (!plateau) throw new Error("Plateau not initialised");
  return plateau;
}

module.exports = { setPlateau, getPlateau };
