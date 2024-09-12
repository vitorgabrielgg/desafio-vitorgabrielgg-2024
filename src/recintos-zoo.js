import {
  transformarRecintosEmTexto,
  filtrarRecintosPeloTipoDeAlimentacao,
  filtrarRecintosPelaEspecieEspecifica,
} from "./utils";

import infoAnimais from "../infoAnimais.json";

class RecintosZoo {
  recintos = [
    {
      numero: 1,
      bioma: "savana",
      tamanhoTotal: 10,
      tamanhoOcupado: 3,
      animais: ["MACACO", "MACACO", "MACACO"],
    },
    {
      numero: 2,
      bioma: "floresta",
      tamanhoTotal: 5,
      tamanhoOcupado: 0,
      animais: [],
    },
    {
      numero: 3,
      bioma: "savana e rio",
      tamanhoTotal: 7,
      tamanhoOcupado: 2,
      animais: ["GAZELA"],
    },
    {
      numero: 4,
      bioma: "rio",
      tamanhoTotal: 8,
      tamanhoOcupado: 0,
      animais: [],
    },
    {
      numero: 5,
      bioma: "savana",
      tamanhoTotal: 9,
      tamanhoOcupado: 3,
      animais: ["LEAO"],
    },
  ];

  analisaRecintos(animal, quantidade) {
    let resultado;

    if (quantidade <= 0) {
      resultado = this.verificarQuantidade(quantidade);
    } else {
      resultado = this.verficarAnimal(animal, quantidade);
    }

    return resultado;
  }

  verificarQuantidade(quantidade) {
    if (quantidade <= 0) {
      return {
        erro: "Quantidade inválida",
      };
    }
  }

  verficarAnimal(animal, quantidade) {
    let animalInformado = infoAnimais.filter(
      (infoAnimal) => infoAnimal.especie === animal
    );

    if (!animalInformado[0]) {
      return {
        erro: "Animal inválido",
      };
    }

    const tamanhoTotalDosAnimais =
      quantidade * animalInformado.map((animal) => animal.tamanho);

    const recintosViaveis = this.verificarRecintos(
      animalInformado[0],
      tamanhoTotalDosAnimais
    );

    if (!recintosViaveis?.length) {
      return {
        erro: "Não há recinto viável",
      };
    } else {
      return {
        recintosViaveis,
      };
    }
  }

  verificarRecintos(animal, tamanhoDosAnimais) {
    const { alimentacao, especie, bioma } = animal;

    let recintosViaveis = this.recintos
      // Retorna os recintos que contém espaços para receber o tamanho dos animais que estão sendo inseridos
      .filter(
        (recinto) =>
          recinto.tamanhoTotal - recinto.tamanhoOcupado >= tamanhoDosAnimais
      )
      // Retorna os recintos que contém o bioma do animal
      .filter((recinto) => {
        for (let i = 0; i < bioma.length; i++) {
          if (recinto.bioma.includes(bioma[i])) {
            return recinto;
          }
        }
      });

    recintosViaveis = filtrarRecintosPeloTipoDeAlimentacao(
      alimentacao,
      recintosViaveis,
      especie
    );

    recintosViaveis = filtrarRecintosPelaEspecieEspecifica(
      especie,
      recintosViaveis,
      tamanhoDosAnimais
    );

    const resultado = recintosViaveis.length
      ? transformarRecintosEmTexto(recintosViaveis, tamanhoDosAnimais, especie)
      : [];

    return resultado;
  }
}

export { RecintosZoo as RecintosZoo };
