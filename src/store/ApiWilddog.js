import Wilddog from 'wilddog/lib/wilddog-node.js'
import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'

const api = new Wilddog("https://vue-pro.wilddogio.com/demo-crud/todos");
// const itemsCache = Object.create(null)
const store = new EventEmitter()
// const storiesPerPage = store.storiesPerPage = 30

/**
 * Wilddog 持久化方案
 */
export default store

store.fetch = () => {
  let list = []

  return new Promise((resolve, reject) => {
    api.limitToFirst(499).on("child_added", function(snapshot) {
      let data = snapshot.val()
      data.id = snapshot.key()
      list.push(data)
      resolve(list)
    }, reject);
  })
}

store.save = todos => {
  if (!todos) return
  // api.push(todo);
  api.set(todos)
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
