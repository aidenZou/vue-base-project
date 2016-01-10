import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'

const store = new EventEmitter()

/**
 * localStorage 持久化方案
 */
export default store

const STORAGE_KEY = 'todos-vuejs';

store.fetch = function () {
  // return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  return new Promise((resolve, reject) => {
    let list =  JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    resolve(list)
  })
},
store.save = function (todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
