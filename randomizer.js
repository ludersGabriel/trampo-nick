// Math.random -> retorna um valor entre 0 e 1

import List from "./list.js"

// Math.floor -> é pra "arredondar" para baixo o valor escolhido
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 
 * @param {List} list 
 * @returns {string[]} mecanicas
 */

export function chooseMecanic(list, randomizeAll = false) {
  const numMecanica = list.howManyToUse

  const mecanicas = list.itens
    .filter((item) => item.selected).map((item) => item.name)

  const controle = []
  for (let i = 0; i < mecanicas.length; i++) controle.push(0)

  if (numMecanica > mecanicas.length) {
    if (!randomizeAll) {
      alert(`More wanted mecanics than available items in list ${list.name}`)
    }

    throw new Error(`More wanted mecanics than available items in list ${list.name}`)
  }

  const ret = []

  for (let i = 0; i < numMecanica; i++) {
    // escolhe uma mecanica
    let index = randomIntFromInterval(0, mecanicas.length - 1)

    // enquanto a mecanica escolhida já tiver sido escolhida anteriormente
    while (controle[index] !== 0) {
      // escolhe outra mecanica
      index = randomIntFromInterval(0, mecanicas.length - 1)
    }

    // salva a mecanica escolhida
    ret.push(mecanicas[index])

    // atualiza o controle para avisar que a mecanica foi escolhida
    controle[index] = 1
  }

  return ret
}