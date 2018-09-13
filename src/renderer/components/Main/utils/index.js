import moment from 'moment'
import storage from 'electron-json-storage'

const storageGetPromise = (key) => new Promise((resolve, reject) =>
  storage.get(key, (err, data) => {
    if (err) {
      return reject(err)
    }

    return resolve(data)
  }))

const storageSetPromise = (key, source) => new Promise((resolve, reject) =>
  storage.set(key, source, (err, data) => {
    if (err) {
      return reject(err)
    }

    return resolve(data)
  }))

const chunkArray = (arr, size) => {
  const arrLength = arr.length
  const tempArray = []

  let myChunk
  for (let index = 0; index < arrLength; index += size) {
    myChunk = arr.slice(index, index + size)
    // Do something if you want with the group
    tempArray.push(myChunk)
  }

  return tempArray
}

const getTimeConfigObj = (name) => {
  const dateNow = moment()
  const format = dateNow.format('YY-MM-DD HH:mm')
  const value = `${dateNow.format('L')} ${dateNow.format('LT')}`
  return { name, value, no_format: dateNow, format }
}

export default {
  storageGetPromise,
  storageSetPromise,
  chunkArray,
  getTimeConfigObj,
}
