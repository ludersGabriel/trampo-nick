
import List from './list.js'

class Saver {
  data = {}
  lists = []

  save = () => {
    this.saveMainUlLists()

    localStorage.setItem('data', JSON.stringify(this.data))
  }

  saveMainUlLists = () => {
    const mainUl = document.getElementById('ulLists')

    const lists = [...mainUl.querySelectorAll('li.liList')]

    this.data['mainUlLists'] = lists.map((li) => {
      const list = {
        name: li.children[0].children[0].innerHTML,
        howManyToUse: li.children[0].children[1].value,
        result: this.lists.find((l) => l.name === li.children[0].children[0].innerHTML).result,
        checked: this.lists.find((l) => l.name === li.children[0].children[0].innerHTML).checked,
        itens: []
      }

      const ulItens = li.children[1]

      const itens = [...ulItens.querySelectorAll('li.liItem')]

      list.itens = itens.map((li) => {
        return {
          name: li.children[0].innerHTML,
          selected: li.classList.contains('selected')
        }
      })

      return list
    })
  }

  appendToList = (list) => {
    this.lists.push(list)
  }

  removeList = (list) => {
    const index = this.lists.findIndex((l) => l === list)

    this.lists.splice(index, 1)
  }

  load = () => {
    this.data = JSON.parse(localStorage.getItem('data'))

    if (!this.data) {
      this.data = {}
      return
    }

    this.loadMainUlLists()
  }

  loadMainUlLists = () => {
    const mainUl = document.getElementById('ulLists')

    this.data.mainUlLists.forEach((list) => {
      const newList = new List(
        list.name,
        list.itens,
        list.howManyToUse,
        list.result,
        list.checked
      )

      this.lists.push(newList)

      mainUl.appendChild(newList.li)
    })

  }
}

const saver = new Saver()

export default saver