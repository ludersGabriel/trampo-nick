import List from './list.js'
import result from './results.js'
import saver from './saver.js'

const formCreateList = document.getElementById('formCreateList')
const btnCreateList = document.getElementById('btnCreateList')
const inputCreateList = document.getElementById('inputCreateList')
const ulLists = document.getElementById('ulLists')

saver.load()
result.init()

btnCreateList.onclick = (e) => {
  e.preventDefault()

  if (!inputCreateList.value) return

  const list = new List(inputCreateList.value)

  ulLists.appendChild(list.li)

  inputCreateList.value = ''


  saver.appendToList(list)

  saver.save()
  result.update(list)
}