<template>
    <div>
        <div class="container-fluid px-4">
            <h1 class="mt-4">Tables</h1>

            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="index.html">Class</a></li>
                <li class="breadcrumb-item active">Tables</li>
            </ol>
            
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                        Book Borrow List
                        <button @click="Add()" data-bs-toggle="modal" data-bs-target="#borrow_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i>Add Borrowed Book</button>
                </div>
                
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-stripped">
                        <thead>
                            <tr>
                                <th>BORROW ID</th>
                                <th>STUDENT NAME</th>
                                <th>BORROWED DATE</th>
                                <th>RETURN DATE</th>
                                <th>DETAIL</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="bbl in borrow_list" :key="bbl">
                                <td>{{ bbl.borrow_id }}</td>
                                <td>{{ bbl.student_name }}</td>
                                <td>{{ bbl.borrowed_date }}</td>
                                <td>{{ bbl.return_date }}</td>
                                <td>
                                    <button class="btn btn-secondary" @click="Show(bbl)" data-bs-toggle="modal" data-bs-target="#detail_modal"><i class="fas fa-memo-circle-info-alt fa-fw"></i></button>
                                </td>
                                <td>
                                    <button class="btn btn-info" @click="Edit(bbl)" data-bs-toggle="modal" data-bs-target="#borrow_modal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger" @click="Delete(bbl.borrow_id)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="borrow_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Book Borrow Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <table class="table table-responsive table-stripped">
                            <thead>
                                <tr>
                                    <th>NO</th>
                                    <th>COVER</th>
                                    <th>BOOK NAME</th>
                                    <th>AUTHOR</th>
                                </tr>
                            </thead>
 
                            <tbody>
                                <tr v-for="(dl) in detail_list" :key="dl">
                                    <td>{{ dl.detail.id }}</td>
                                    <td>
                                        <img v-if="dl.book.image !== null" :src="$url + '/images/' + dl.book.image" width="150">
                                        <span v-else>No Image</span>
                                    </td>
                                    <td>{{ dl.book.book_name }}</td>
                                    <td>{{ dl.book.author }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="borrowing_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl bg-primary">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Borrowing Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="card">
                                    <div class="card-body">
                                         <div class="mb-3">
                                            <div class="form-group">
                                                <label for="student_id" class="form-label">Student Name</label>
                                                <select class="form-control" v-model="student_id">
                                                    <option value="" disabled>-- Choose Student --</option>
                                                    <option v-for="sl in student_list" :key="sl.student_id" :value="sl.student_id">{{ sl.student_name }}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="borrowed_date" class="form-label">Borrowed Date</label>
                                            <input type="date" class="form-control" id="borrowed_date" v-model="borrowed_date" placeholder="Return Date">
                                        </div>
                                        <div class="mb-3">
                                            <label for="return_date" class="form-label">Return Date</label>
                                            <input type="date" class="form-control" id="return_date" v-model="return_date" placeholder="Return Date">
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                            <div class="col-md-9">
                                <div class="card">
                                    <div class="card-body">
                                        <button @click="addItem" class="btn btn-sm btn-primary text-white"><i class="mdi mdi-plus btn-icon-prepend"></i> Add Item</button>
                                        <br><br>
                                        <div class="row" v-for="(dbl, counter) in detail_list" :key="counter">
                                            <br><br>
                                            <div class="col-md-8">
                                                <div class="form-group">
                                                    <select class="form-control" v-model="dbl.book_id">
                                                        <option value="" disabled>-- Choose Book --</option>
                                                        <option v-for="bl in book_list" :key="bl.book_id" :value="bl.book_id">{{ bl.book_name }} - {{ bl.author }}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <input class="form-control" placeholder="Qty" type="number" v-model="dbl.qty"> 
                                                </div>
                                            </div>
                                            <div class="col-md-1">
                                                <button class="btn btn-danger btn-sm" @click="deleteItem(counter)"> - </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                    <div class="modal-footer">
                        <button @click="Save" class="btn btn-block btn-lg btn-success">SUBMIT</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


// import moment from 'moment'
module.exports = {
    //state
    data : function(){
        return {
            // borrow_id : "",
            student_id : "",
            borrowed_date : "",
            return_date : "",
            borrow_list : [],
            detail_list : [],

            //for transaction form
            book_list : [],
            student_list : [],
            transaction_detail : [],
        }
    },

    methods : {
        addItem(){
            this.transaction_detail.push({
                book_id: '',
                qty: '',
            })
        },

        deleteItem(counter){
            this.transaction_detail.splice(counter,1);
        },

        getBook: function(){
            //ambil data buku untuk dropdown
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }

            this.axios.get("/book", token)
            .then(response => {
                this.book_list = response.data;
            })
        },

        getStudent: function(){
            //ambil data student untuk dropdown
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }

            this.axios.get("/student", token)
            .then(response => {
                this.student_list = response.data;
            })
        },

        getData : function(){
            //maping header token dulu
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }

            axios.get(api_url + "/book_borrow", token)
            .then(response => {
                console.log(response.data);
                this.borrow_list = response.data;
            })
        },

        // statusCheck: function(rerturn_date){
        //     const status = moment().isBefore(moment(rerturn_date))
        //     if(status){
        //         return true
        //     } else {
        //         return false
        //     }
        // },

        Add : function(){
            this.student_id = "",
            this.borrowed_date = "",
            this.return_date = "",
            this.action = "insert"
        },

        Edit : function(bbl){
            this.student_id      = bbl.student_id
            this.borrowed_date   = bbl.borrowed_date
            this.return_date     = bbl.return_date
            this.action          = "update"
        },

        Save : function(){
            //maping header token dulu
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }

            //mapping data
            let form = {
                //back end      //state
                'student_id'     : this.student_id,
                'borrowed_date'  : this.borrowed_date,
                'return_date'    : this.return_date,
                "detail"         : this.detail_list
            }

            if(this.action === "insert"){ // post
                axios.post(api_url + '/book_borrow', form, token)
                .then(response =>{
                    Swal.fire({
                            title: 'Success!',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'Ok'
                    })
                })
            } else { // put
                axios.put(api_url + '/book_borrow/' + this.borrow_id, form, token)
                .then(response =>{
                    Swal.fire({
                            title: 'Success!',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                })
            }
            this.getData();
        },

        Delete : function(borrow_id){
            //maping header token dulu
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }

            Swal.fire({
                title: 'Delete Book Borrow Data',
                text:'Do you want to delete this data?',
                icon: 'warning',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Delete',
                denyButtonText: `Cancel`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios.delete(api_url + '/book_borrow/' + borrow_id, token)
                    .then(response => {
                        Swal.fire({
                            title: 'Success!',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })

                        this.getData();
                })
                    // Swal.fire('Saved!', '', 'success')

                } else if (result.isDenied) {
                    Swal.fire({
                        title: 'Batal',
                        text: 'Data is not deleted',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                    // Swal.fire('Changes are not saved', '', 'info')
                }
            })
        }
    },

    mounted() {
        this.getData();
    }
}
</script>
