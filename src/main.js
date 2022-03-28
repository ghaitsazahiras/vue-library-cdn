// base URL API
var api_url = "http://localhost:8000/api";
var api_url2 = "http://localhost:8000";

// konfigurasi route
var router = [
    {
        path : "/",
        name : "Home",
        component : httpVueLoader("./src/components/Home.vue")
    },

    {
        path : "/book",
        name : "Book",
        component : httpVueLoader("./src/components/Book.vue")
    },

    {
        path : "/class",
        name : "Class",
        component : httpVueLoader("./src/components/Class.vue")
    },

    {
        path : "/student",
        name : "Student",
        component : httpVueLoader("./src/components/Student.vue")
    },

    {
        path : "/book_borrow",
        name : "BookBorrow",
        component : httpVueLoader("./src/components/BookBorrow.vue")
    },

    {
        path : "/book_return",
        name : "BookReturn",
        component : httpVueLoader("./src/components/BookReturn.vue")
    }
];

var routes = new VueRouter({ routes: router, base: "/"});

// instance vue
var app = new Vue({
    el : "#app", // elemen yang di vue kan

    components : { // pengkategorian halaman
        "Login" : httpVueLoader("./src/components/Login.vue"),
        "apps" : httpVueLoader("./src/components/App.vue"),
    },

    data : { // state / variabel global
        user : {
            user_id : "",
            role : "",
            name : "",
            username : "",
        },
        mycomponent : ""
    },

    router : routes,

    methods : {
        CheckToken : function(){
            //punya token di cookies apa tidak?
            if(this.$cookies.isKey('Authorization')){
                //kalau punya
                //maping header token dulu
                let token = {
                    headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
                }

                //cek kevalidan token di back end
                axios.get(api_url + '/login_check', token)
                .then( response => {
                    // console.log(response);
                    if(response.data.status === 1){
                        this.mycomponent = "apps"
                    } else {
                        this.mycomponent = "Login"
                    }
                })

            } else {
                //kalau tidak punya
                this.mycomponent = "Login"
            }
        }
    },

    mounted(){
        this.CheckToken();
    }
});