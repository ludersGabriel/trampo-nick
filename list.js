
import { chooseMecanic } from './randomizer.js'
import resultManager from './results.js'
import saver from './saver.js'

class List {
  itens = []
  name = ''
  howManyToUse = 0
  li = null
  ulItens = null
  result = []
  checked = false

  constructor(
    name,
    itens = [],
    howManyToUse = 0,
    result = [],
    checked = false
  ) {
    this.name = name
    this.itens = itens
    this.howManyToUse = howManyToUse
    this.result = result
    this.checked = checked

    this.li = this.createLi()

    this.itens.forEach((item) => {
      this.ulItens.appendChild(this.createItem(item.name, item.selected))
    })

    this.updateRender()
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

    const checkbox = this.craeteLiCheckbox()

    div.appendChild(p)
    div.appendChild(input)
    div.appendChild(deleteIcon)
    div.appendChild(checkbox)

    li.appendChild(div)
    li.appendChild(this.createUlItens())
    li.appendChild(this.createMoreItensIcon())

    if (this.checked) {
      li.classList.add('checked')
    } else li.classList.add('unchecked')

    return li
  }

  craeteLiCheckbox = () => {
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.className = 'listCheckbox'

    if (this.checked) {
      checkbox.checked = true
    }

    checkbox.onclick = () => {
      if (checkbox.checked) {
        this.li.classList.add('checked')
        this.li.classList.remove('unchecked')
        this.checked = true
      }
      else {
        this.li.classList.remove('checked')
        this.li.classList.add('unchecked')
        this.checked = false
      }

      this.updateRender()
      saver.save()
      resultManager.updateResult(this)
    }

    return checkbox
  }

  updateRender = () => {
    const ul = this.li.querySelector('ul.ulItens')
    const plus = this.li.querySelector('img.moreItensIcon')

    if (!this.checked) {
      ul.style.display = 'none'
      plus.style.display = 'none'
    }
    else {
      ul.style.display = 'flex'
      plus.style.display = 'block'
    }
  }

  createHowManyInput = () => {
    const input = document.createElement('input')
    input.type = 'number'
    input.className = 'howManyToUse'
    input.value = this.howManyToUse

    input.onchange = (e) => {
      this.howManyToUse = e.target.value

      saver.save()
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
      const item = prompt('Type the name of the item')

      if (!item) return

      const exists = this.itens.find((item) => item.name === item)

      if (exists) {
        alert('Item already exists')
        return
      }

      this.ulItens.appendChild(this.createItem(item))

      this.itens.push({
        name: item,
        selected: false
      })

      saver.save()
    }
    return icon
  }

  createItem = (name, selected = false) => {
    const li = document.createElement('li')
    li.className = 'liItem'

    if (selected) li.classList.add('selected')

    const p = document.createElement('p')
    p.innerHTML = name

    const deleteIcon = this.createItemDelete(li)

    li.appendChild(p)
    li.appendChild(deleteIcon)

    li.onclick = () => {
      const index = this.itens.findIndex((item) => item.name === name)

      if (li.classList.contains('selected')) {
        li.classList.remove('selected')

        this.itens[index].selected = false
      }
      else {
        li.classList.add('selected')

        this.itens[index].selected = true
      }

      saver.save()
    }

    return li
  }

  createUlItens = () => {
    if (this.ulItens) return

    const ul = document.createElement('ul')
    ul.className = 'ulItens'

    this.ulItens = ul

    return ul
  }

  createItemDelete = (ref) => {
    const icon = this.createGarbageIcon()

    icon.onclick = (e) => {
      e.stopPropagation()

      const r = confirm('Are you sure you want to delete this item?')

      if (!r) return

      ref.remove()

      saver.save()
    }

    return icon
  }

  createLiDelete = () => {
    const icon = this.createGarbageIcon()

    icon.onclick = () => {
      const r = confirm('Are you sure you want to delete this list?')

      if (!r) return

      this.li.remove()

      saver.save()
      saver.removeList(this)
      resultManager.removeList(this)
    }

    return icon
  }

  createGarbageIcon = () => {
    const icon = document.createElement('img')
    icon.src = './delete.png'
    icon.className = 'deleteListIcon'

    return icon
  }

  randomize = (randomizeAll = false) => {
    this.result = chooseMecanic(this, randomizeAll)

    saver.save()

    return this.result
  }

}

export default List