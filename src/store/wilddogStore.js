import Wilddog from 'wilddog/lib/wilddog-node.js'
import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'

// const api = new Wilddog("https://vue-pro.wilddogio.com/")
// https://vue-pro.wilddogio.com/demo-crud/users
const api = new Wilddog("https://vue-pro.wilddogio.com/demo-crud/users");
const itemsCache = Object.create(null)
const store = new EventEmitter()
const storiesPerPage = store.storiesPerPage = 30

let topStoryIds = []

export default store

store.add = user => {
  console.log(user);
  if (!user) return
  console.log(111);
  api.push(user);
  // let childref = api.push(user);
  // if (childref.key()) {
  //   // 成功
  // }
}

// 当有子节点被删除时触发
store.remove = id => {
  api.child(id).remove()
}

api.on('child_removed', function(snapshot,prev){
  console.log(snapshot.val());
  console.log("the previous key is",prev)
})

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
      api.child('users/' + id).once('value', snapshot => {
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

store.fetchUsersByPage = page => {

  api.orderByKey().on("child_added", function(snapshot) {
    // console.log(snapshot);
    console.log(snapshot.key());
    console.log(snapshot.val());

    // snapshot.forEach(function(data) {
    //   console.log(data);
    //
    //   console.log("The " + data.key() + " score is " + data.val());
    //
    // });

  })

  console.log(page);

  // const start = (page - 1) * storiesPerPage
  // const end = page * storiesPerPage
  // const ids = topStoryIds.slice(start, end)
  //
  // console.log(ids);
  // return store.fetchUsers(ids)
}

store.fetchFirstUsers = () => {
  let list = []
  let mdata = new Map()

  return new Promise((resolve, reject) => {
    api.limitToFirst(50).on("child_added", function(snapshot) {
      let data = snapshot.val()
      data.id = snapshot.key()
      list.push(data)
      resolve(list)

      // mdata.set(snapshot.key(), snapshot.val())
      // resolve(mdata)
    }, reject);
  })
}

// return new Promise((resolve, reject) => {
//   api.limitToFirst(2).on("child_added", function(snapshot) {
//     console.log(snapshot.key());
//     console.log(snapshot.val());
//     // TODO
//     resolve([])
//   }, reject);
// })
