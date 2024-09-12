function filtrarRecintosPelaEspecieEspecifica(
  especie,
  recintos,
  tamanhoDosAnimais
) {
  let recintosViaveis;

  switch (especie) {
    case "MACACO": {
      // Condição para que os macacos não fiquem sozinhos nos recintos
      recintosViaveis = recintos.filter(
        (recinto) => tamanhoDosAnimais > 1 || recinto.tamanhoOcupado >= 1
      );
      break;
    }
    case "HIPOPOTAMO": {
      // Condição para os hipopótamos tolerarem outra espécie apenas no recinto de savana e rio
      recintosViaveis = recintos.filter((recinto) => {
        if (
          (recinto.bioma.includes("rio") && !recinto.animais.length) ||
          recinto.bioma.includes("savana e rio")
        ) {
          return recinto;
        }
      });
      break;
    }

    default:
      recintosViaveis = recintos;
  }

  return recintosViaveis;
}

export { filtrarRecintosPelaEspecieEspecifica };
