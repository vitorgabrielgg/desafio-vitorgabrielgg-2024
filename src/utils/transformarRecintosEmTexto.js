function transformarRecintosEmTexto(recintos, tamanhoDosAnimais, especie) {
  const resultado = [];

  recintos.map((recinto) => {
    const incrementoEspeciesDistintas = verificarIncrementoEspeciesDistintas(
      recinto,
      especie
    );

    const espacoLivre =
      recinto.tamanhoTotal -
      (tamanhoDosAnimais +
        recinto.tamanhoOcupado +
        incrementoEspeciesDistintas);

    if (espacoLivre >= 0) {
      resultado.push(
        `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`
      );
    }
  });

  return resultado;
}

function verificarIncrementoEspeciesDistintas(recinto, especie) {
  const arraySemAnimaisRepetidos = [...new Set(recinto.animais)];
  // Condição adiciona 1 espaço extra, se houver mais de uma espécie no mesmo recinto
  const incremento =
    arraySemAnimaisRepetidos.length >= 1 &&
    !arraySemAnimaisRepetidos.includes(especie)
      ? 1
      : 0;

  return incremento;
}

export { transformarRecintosEmTexto };
