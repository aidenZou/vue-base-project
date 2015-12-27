<style>

body {
    background-color: #ccc;
}

</style>

<template>

<div>
  用户：
    {{ user[0].name }}
    <!-- <p v-on:click="test">test.vue已经加载</p> -->
</div>

</template>

<script>

import store from '../store/wilddogStore'

export default {
    name: 'Test',

    data() {
        return {
          page: 1,
          users: [],
          user: []
        }
    },

    route: {
      data ({ to }) {
        console.log(to);
        const page = +to.params.page
        // return store.fetchItemsByPage(page).then(items => ({
        //   page,
        //   items
        // }))
        store.fetchFirstUsers()
        return store.fetchItemsByPage(page).then(users => {
          // user
          console.log(users)
        })
      }
    },

    created () {
      // store.on('topstories-updated', this.update)
    },

    methods: {
      update () {
        store.fetchItemsByPage(this.page).then(items => {
          this.items = items
        })
      }
    },
}

</script>
