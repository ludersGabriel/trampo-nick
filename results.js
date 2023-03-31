import saver from './saver.js'

class Result {
  result = {}
  ulResults = null
  reusltsLi = []

  constructor() {
    this.ulResults = document.getElementById('ulResults')
  }

  init = () => {

    saver.lists.forEach((list) => {
      this.result[list.name] = list.result || []

      const li = this.createResultLi(list)

      this.reusltsLi.push(li)
    })

    const button = document.getElementById('randomizeAll')
    button.onclick = this.randomizeAll

    this.render()
  }

  createResultLi = (list) => {
    const li = document.createElement('li')
    li.className = 'liResult'

    const div = document.createElement('div')
    div.className = 'resultHeader'

    const redoBtn = document.createElement('img')
    redoBtn.src = './redo.png'
    redoBtn.className = 'redoBtn'

    redoBtn.onclick = () => {
      this.result[list.name] = list.randomize()

      this.render()
    }

    const p = document.createElement('p')
    p.innerHTML = list.name

    div.appendChild(p)
    div.appendChild(redoBtn)

    const divResult = document.createElement('div')
    divResult.className = 'resultContainer'

    li.appendChild(div)
    li.appendChild(divResult)

    return li
  }

  update = (list) => {
    const li = this.createResultLi(list)

    this.reusltsLi.push(li)
    this.result[list.name] = []

    this.render()
  }

  updateResult = (list) => {
    this.result[list.name] = list.result

    this.render()
  }

  removeList = (list) => {
    this.reusltsLi = this.reusltsLi.filter((li) => {
      const listName = li.querySelector('p').innerHTML

      return listName !== list.name
    })

    delete this.result[list.name]

    this.render()
  }

  randomizeAll = () => {
    const results = {}

    try {
      saver.lists.forEach((list) => {
        console.log(`randomizing ${list.name}: ${list.checked}`)

        if (list.checked)
          results[list.name] = list.randomize(true)
      })

      this.result = results
    }
    catch (e) {
      alert(`${e.message}`)
    }


    this.render()
  }


  render = () => {
    this.ulResults.innerHTML = ''

    this.reusltsLi.forEach((li) => {

      const divResult = li.querySelector('.resultContainer')
      divResult.innerHTML = ''

      const listName = li.querySelector('p').innerHTML

      if (
        saver.lists.find(
          (list) => list.name === listName
        ).checked === false
      ) return

      if (this.result[listName].length === 0) {
        const p = document.createElement('p')
        p.innerHTML = 'Nenhum resultado gerado'
        p.className = 'noResult'

        divResult.appendChild(p)
      }
      else {
        this.result[listName].forEach((item) => {
          const p = document.createElement('p')
          p.innerHTML = item

          divResult.appendChild(p)
        })
      }

      this.ulResults.appendChild(li)
    })
  }

}

const result = new Result()

export default result