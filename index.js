// Math.random -> retorna um valor entre 0 e 1
// Math.floor -> é pra "arredondar" para baixo o valor escolhido
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const inputRef = document.getElementById('inputMecanica')
const ulRef = document.getElementById('mecanicas')

const saveList = () => {
  const mecanicas = document.getElementsByClassName('liMecanica')
  const list = []

  for (let i = 0; i < mecanicas.length; i++) {
    const mecanica = {}

    mecanica.text = mecanicas[i].children[0].innerHTML
    mecanica.checked = mecanicas[i].classList.contains('checked')

    list.push(mecanica)
  }

  localStorage.setItem('mecanicas', JSON.stringify(list))
}


const createGarbage = (li) => {
  const garbageImg = document.createElement('img')
  garbageImg.src = './delete.png'

  garbageImg.onclick = () => {
    li.remove()
    saveList()
  }

  return garbageImg
}

const createLiMecanica = () => {
  const li = document.createElement('li')
  li.className = 'liMecanica'

  li.onclick = () => {
    const classList = li.classList

    if (classList.contains('checked')) {
      classList.remove('checked')
    } else {
      classList.add('checked')
    }

    saveList()
  }

  return li
}

const createPMecanica = (text) => {
  const p = document.createElement('p')
  p.innerHTML = text
  p.className = 'mecanica'

  return p
}

const appendListaMecanicas = () => {
  const list = JSON.parse(localStorage.getItem('mecanicas'))

  if (!list) return

  for (let i = 0; i < list.length; i++) {
    const li = createLiMecanica()
    const p = createPMecanica(list[i].text)
    const garbageImg = createGarbage(li)

    if (list[i].checked) {
      li.classList.add('checked')
    }

    li.appendChild(p)
    li.appendChild(garbageImg)

    ulRef.appendChild(li)
  }
}

appendListaMecanicas()


const appendMecanica = (e) => {
  e.preventDefault()

  if (inputRef.value === '') return

  const li = createLiMecanica()

  const p = createPMecanica(inputRef.value)

  const garbageImg = createGarbage(li)

  li.appendChild(p)
  li.appendChild(garbageImg)

  ulRef.appendChild(li)

  inputRef.value = ''

  saveList()
}


function chooseMecanic(e) {
  e.preventDefault()

  const numMecanica = document.getElementById('inputNumberMecanica').value

  const mecanicas = [...document.getElementsByClassName('liMecanica')]
    .filter((mecanica) => mecanica.classList.contains('checked'))
    .map((mecanica) => mecanica.children[0].innerHTML)

  const controle = []
  for (let i = 0; i < mecanicas.length; i++) controle.push(0)

  if (numMecanica > mecanicas.length) {
    alert('Mais escolhas desejadas que mecanicas disponiveis')
    return
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

  const resultSpan = document.getElementById('result-mecanica')
  resultSpan.innerHTML = ret.join(', ')
}