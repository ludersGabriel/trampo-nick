import List from './list.js'

const formCreateList = document.getElementById('formCreateList')
const btnCreateList = document.getElementById('btnCreateList')
const inputCreateList = document.getElementById('inputCreateList')
const ulLists = document.getElementById('ulLists')

btnCreateList.onclick = (e) => {
  e.preventDefault()

  const list = new List(inputCreateList.value)

  ulLists.appendChild(list.li)

  inputCreateList.value = ''
}