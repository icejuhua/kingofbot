<template>
  <NavBar/>
  <router-view/>
</template>



<script>

import NavBar from '@/components/NavBar.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
import $ from 'jquery' 

export default {
  components :{
    NavBar,
  },
  setup(){
    $.ajax({
      url : "http://localhost:8075/user/account/token/",
      type: "post",
      data:{
        username: "user1",
        password: "user1",
      },
      success(resp){
        console.log(resp);
      },
      error(resp){
        console.log(resp);
      }
    }),
    $.ajax({
      url : "http://localhost:8075/user/account/info/",
      type : "get",
      headers:{
        Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4OTJmYzQ1YmNhZGY0ZTI0ODYxNmUwMWRhMzkxNDdmMiIsInN1YiI6IjUiLCJpc3MiOiJzZyIsImlhdCI6MTY3NDE1MTY2NSwiZXhwIjoxNjc1MzYxMjY1fQ.JgVsihv4Q4oTaLz11jGWNhtyYN_nl6p9y_LVtC7Lrss",
      },
      success(resp){
        console.log(resp);
      },
      error(resp){
        console.log(resp);
      }
    }),
    $.ajax({
      url : "http://localhost:8075/user/account/register/",
      type : "post",
      data :{
        username : "icejuhua",
        password : "user2",
        confirmedPassword : "user2",
      },
      success(resp){
        console.log(resp);
      },
      error(resp){
        console.log(resp);
      }
    })
  }
}
</script>

<style>
body{
  background: url("@/assets/images/background.png");
  background-size: cover;
}
</style>
