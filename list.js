
class List {
  itens = []
  name = ''
  howManyToUse = 0
  li = null
  ulItens = null

  constructor(
    name,
    itens = []
  ) {
    this.name = name
    this.itens = itens
    this.li = this.createLi()
  }

  createLi = () => {
    if (this.li) return

    const li = document.createElement('li')
    li.className = 'liList'

    const div = document.createElement('div')
    div.className = 'listHeader'

    const p = document.createElement('p')
    p.innerHTML = this.name

    const input = this.createHowManyInput()

    const deleteIcon = this.createLiDelete()

    div.appendChild(p)
    div.appendChild(input)
    div.appendChild(deleteIcon)

    li.appendChild(div)
    li.appendChild(this.createUlItens())
    li.appendChild(this.createMoreItensIcon())

    return li
  }

  createHowManyInput = () => {
    const input = document.createElement('input')
    input.type = 'number'
    input.className = 'howManyToUse'
    input.value = this.howManyToUse

    input.onchange = (e) => {
      this.howManyToUse = e.target.value

      console.log(this.howManyToUse)
    }

    input.oninput = (e) => {
      e.target.value = e.target.value.replace(/[^0-9.]/g, '')
    }

    input.min = 0
    input.step = 1

    return input
  }

  createMoreItensIcon = () => {
    const icon = document.createElement('img')
    icon.src = './plus.png'
    icon.className = 'moreItensIcon'

    icon.onclick = () => {
      const item = prompt('Digite o nome do item')

      if (!item) return

      this.itens.push(item)

      const li = document.createElement('li')
      li.innerHTML = item
      li.className = 'liItem'

      this.ulItens.appendChild(li)
    }
    return icon
  }

  createUlItens = () => {
    if (this.ulItens) return

    const ul = document.createElement('ul')
    ul.className = 'ulItens'

    this.ulItens = ul

    return ul
  }

  createLiDelete = () => {
    const icon = document.createElement('img')
    icon.src = './delete.png'
    icon.className = 'deleteListIcon'

    icon.onclick = () => {
      const r = confirm('Tem certeza que deseja excluir essa lista?')

      if (!r) return

      this.li.remove()
    }

    return icon
  }

}

export default List