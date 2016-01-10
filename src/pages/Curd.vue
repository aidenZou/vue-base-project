<style>

body {
    /*background-color: #ccc;*/
}

.query {
  /*width: 400px;*/
}

.table {
  margin-bottom: 0;
}

.table th, .table td {
  width: 25%;
}

/* 必需 */
.expand-transition {
  transition: all 1s ease;
  height: 51px;
  /*padding: 10px;*/
  /*background-color: #eee;*/
  /*overflow: hidden;*/
}

/* .expand-enter 定义进入的开始状态 */
/* .expand-leave 定义离开的结束状态 */
.expand-enter, .expand-leave {
  height: 0;
  padding: 0 10px;
  opacity: 0;
}

.staggered-transition {
    transition: all .5s ease;
    /*overflow: hidden;*/
    /*margin: 0;*/
    /*height: 51px;*/

}
.staggered-enter {
  height: 0;
  opacity: 0;
}

.staggered-leave {
  opacity: 0;
  transform: translateX(-100%);
}

</style>

<template>

<div>
  <link href="//cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
    <div class="container">
        <div class="header">
            <h3 class="text-muted"> CURD with WILDDOG</h3>
        </div>
        <div class="col-lg-12">
            <div class="panel panel-default">
                <div class="panel-heading">ADD A USER</div>
                <div class="panel-body">
                    <div class="input-group">
                        <span class="input-group-addon">@</span>
                        <input type="text" class="form-control" placeholder="USERNAME" aria-describedby="sizing-addon2" v-model="user.username">
                        <span class="input-group-addon">-</span>
                        <input type="text" class="form-control" placeholder="EMAIL" aria-describedby="sizing-addon2" v-model="user.email" @keyup.13="add">
                        <span class="input-group-btn">
                  <button class="btn btn-default" type="button" @click="add">ADD</button>
                </span>
                    </div>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                  <div class="row">
                    <div class="col-xs-12 col-md-6"><input type="text" class="form-control query" v-model="query" placeholder="Search Name"></div>
                    <div class="col-xs-6 col-md-6"><div class="text-right">
                        <!-- <button type="button" class="btn btn-primary">EDIT</button> -->
                        <!-- <button type="button" class="btn btn-danger">DELETE</button> -->
                    </div></div>
                  </div>


                </div>
                <div class="panel-body">
                    <table class="table table-hover">
                      <caption>Optional table caption.</caption>
                      <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <!-- <input @keyup="onKeyup | debounce 500"> -->
                          <tr v-for="(index, user) in users | filterBy query in 'username'" transition="staggered" stagger="100">
                            <td><input type='checkbox'></td>
                            <td>{{ user.username }}</td>
                            <td>{{ user.email }}</td>
                            <td><button type="button" class="btn btn-danger btn-sm" @click="remove(index)">删除</button></td>
                          </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import store from '../store/wilddogStore'

export default {
  name: 'Test',

  data() {
    return {
      page: 1,
      users: null,
      user: {
        username: '',
        email: ''
      }
    }
  },
  route: {
    data({ to }) {
      // console.log(to);
      // const page = +to.params.page
      // console.log(page);

      store.fetchFirstUsers().then(users => {
        // console.log(users);
        // for (var entry of users) {
        //   console.log(entry);
        //   // console.log(entry[0]);
        //   console.log(entry[1]);
        // }
        this.users = users
      })
    }
  },
  created() {
    // store.on('topstories-updated', this.update)
  },
  methods: {
    add() {
      store.add(this.user)
      // this.$set('user', {
      //   username: '',
      //   email: ''
      // })
    },
    remove(index) {
      store.remove(this.users[index].id)
      this.users.$remove(this.users[index]);
      // this.users.splice(index, 1)
    },
    update() {
      console.log('update');
      // store.fetchUsersByPage(this.page).then(items => {
      //   this.items = items
      // })
    }
  }
}

</script>
