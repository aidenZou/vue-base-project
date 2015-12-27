import Wilddog from 'wilddog/lib/wilddog-node.js'
import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'

console.log(Wilddog);

const api = new Wilddog("https://vue-pro.wilddogio.com/")
const itemsCache = Object.create(null)
const store = new EventEmitter()
const storiesPerPage = store.storiesPerPage = 30

let topStoryIds = []

export default store

/**
 * Subscribe to real time updates of the top 100 stories,
 * and cache the IDs locally.
 */
api.child('topstories').on('value', snapshot => {
  topStoryIds = snapshot.val()
  store.emit('topstories-updated')
})

// /**
//  * Fetch an item data with given id.
//  *
//  * @param {Number} id
//  * @return {Promise}
//  */
// store.fetchItem = id => {
//   return new Promise((resolve, reject) => {
//     if (itemsCache[id]) {
//       resolve(itemsCache[id])
//     } else {
//       api.child('item/' + id).once('value', snapshot => {
//         const story = itemsCache[id] = snapshot.val()
//         resolve(story)
//       }, reject)
//     }
//   })
// }

/**
 * Fetch the given list of items.
 *
 * @param {Array<Number>} ids
 * @return {Promise}
 */
// store.fetchItems = ids => {
//   if (!ids || !ids.length) {
//     return Promise.resolve([])
//   } else {
//     return Promise.all(ids.map(id => store.fetchItem(id)))
//   }
// }

/**
 * Fetch items for the given page.
 *
 * @param {Number} page
 * @return {Promise}
 */
store.fetchItemsByPage = page => {
  const start = (page - 1) * storiesPerPage
  const end = page * storiesPerPage
  console.log(topStoryIds);
  const ids = topStoryIds.slice(start, end)
  console.log(ids);
  return store.fetchUsers(ids)
}

/**
 * Fetch a user data with given id.
 *
 * @param {Number} id
 * @return {Promise}
 */
// store.fetchUser = id => {
//   return new Promise((resolve, reject) => {
//     api.child('user/' + id).once('value', snapshot => {
//       resolve(snapshot.val())
//     }, reject)
//   })
// }

/**
 * Fetch an item data with given id.
 *
 * @param {Number} id
 * @return {Promise}
 */
store.fetchUser = id => {
  return new Promise((resolve, reject) => {
    if (itemsCache[id]) {
      resolve(itemsCache[id])
    } else {
      api.child('user/' + id).once('value', snapshot => {
        const story = itemsCache[id] = snapshot.val()
        resolve(story)
      }, reject)
    }
  })
}

/**
 * Fetch the given list of items.
 *
 * @param {Array<Number>} ids
 * @return {Promise}
 */
store.fetchUsers = ids => {
  if (!ids || !ids.length) {
    return Promise.resolve([])
  } else {
    return Promise.all(ids.map(id => store.fetchUser(id)))
  }
  // return new Promise((resolve, reject) => {
  //   api.child('user/').once('value', snapshot => {
  //   // api.once('value', snapshot => {
  //     console.log(snapshot.val())
  //     resolve(snapshot.val())
  //   }, reject)
  // })

  // api.child('user/').once('value', snapshot => {
  //   const story = snapshot.val()
  //   console.log(story)
  //   resolve(story)
  // }, reject)

  // if (!ids || !ids.length) {
  //   return Promise.resolve([])
  // } else {
  //   return Promise.all(ids.map(id => store.fetchUser(id)))
  // }
}

store.fetchFirstUsers = () => {
  api.child('user').limitToFirst(10).on("child_added",function(snapshot){

    console.log(snapshot.key());
    console.log(snapshot.val());
    return Promise.resolve()
  });
}
