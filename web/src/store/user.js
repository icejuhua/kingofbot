import $ from 'jquery'

export default ({
    state: {
        id : '',
        username : '',
        photo : '',
        token : '',
        is_login : false,
        pulling_info : true,
    },
    getters: {
    },
    mutations: {
        updataPullinginfo(state,pulling_info){
            state.pulling_info = pulling_info;
        },
        updataUser(state , user){
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.is_login = user.is_login;
        },
        updataToken(state , token){
            state.token  = token;
        },
        logout(state){
            state.id = '';
            state.username = '';
            state.photo = '';
            state.is_login = false;
        }
    },
    actions: {
        login(context,data){
            
            $.ajax({
                  url : "http://localhost:8075/user/account/token/",
                  type: "post",
                  data:{
                    username: data.username,
                    password: data.password,
                  },
                  success(resp){
                    if(resp.error_msg === 'success'){
                        localStorage.setItem("jwt_token",resp.token);
                        context.commit("updataToken",resp.token);
                        data.success(resp);
                    }
                    else{
                        data.error(resp);
                    }
                  },
                  error(resp){
                    data.error(resp);
                  }
                });
        },
        getinfo(context , data){
            $.ajax({
                url : "http://localhost:8075/user/account/info/",
                type : "get",
                headers:{
                    Authorization: "Bearer " + context.state.token,
                },
                success(resp){
                    if(resp.error_msg === 'success'){
                        context.commit("updataUser",{
                            ...resp,
                            is_login : true,
                        });
                        data.success(resp);
                    } else {
                        data.error(resp);
                    }
                   
                },
                error(resp){
                    data.error(resp);

                },
            });
        },
        logout(context){
            localStorage.removeItem("jwt_token")
            context.commit("logout");
            location.reload();
        }
    },
    modules: {
    }
  })
  