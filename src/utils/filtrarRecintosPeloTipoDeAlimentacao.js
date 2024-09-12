import infoAnimais from "../../infoAnimais.json";

function filtrarRecintosPeloTipoDeAlimentacao(alimentacao, recintos, especie) {
  let recintosViaveis;

  const animaisCarnivoros = infoAnimais
    .filter((infoAnimal) => infoAnimal.alimentacao === "carnívoro")
    .map((infoAnimal) => infoAnimal.especie);

  // Condição para que os animais carnívoros habitem apenas com a própria espécie
  if (alimentacao === "carnívoro") {
    recintosViaveis = recintos.filter(
      (recinto) => !recinto.animais.length || recinto.animais.includes(especie)
    );
    // Condição para que os animais não carnívoros não habitarem junto com animais carnívoros
  } else {
    recintosViaveis = recintos.filter((recinto) => {
      for (let i = 0; i < animaisCarnivoros.length; i++) {
        if (
          recinto.animais.length &&
          recinto.animais.includes(animaisCarnivoros[i])
        ) {
          return;
        } else {
          return recinto;
        }
      }
    });
  }

  return recintosViaveis;
}

export { filtrarRecintosPeloTipoDeAlimentacao };
