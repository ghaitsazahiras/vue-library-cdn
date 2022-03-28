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
                        Book Return List
                        <button @click="Add()" data-bs-toggle="modal" data-bs-target="#return_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i>Add Returned Book</button>
                </div>
                
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-stripped">
                        <thead>
                            <tr>
                                <th>RETURN ID</th>
                                <th>BORROW ID</th>
                                <th>RETURNED DATE</th>
                                <th>PUNISHMENT</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="brl in return_list" :key="brl">
                                <td>{{ brl.return_id }}</td>
                                <td>{{ brl.borrow_id }}</td>
                                <td>{{ brl.returned_date }}</td>
                                <td>{{ brl.punishment }}</td>
                                <td>
                                    <button class="btn btn-info" @click="Edit(brl)" data-bs-toggle="modal" data-bs-target="#return_modal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger" @click="Delete(brl.return_id)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="return_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Book Return Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="borrow_id" class="form-label">Borrow ID</label>
                            <input type="text" class="form-control" id="borrow_id" v-model="borrow_id" placeholder="Borrow ID">
                        </div>
                        
                        <div class="mb-3">
                            <label for="returned_date" class="form-label">Returned Date</label>
                            <input type="date" class="form-control" id="returned_date" v-model="returned_date" placeholder="Returned Date">
                        </div>

                        <div class="mb-3">
                            <label for="punisment" class="form-label">Punishment</label>
                            <input type="date" class="form-control" id="punisment" v-model="punisment" placeholder="Punisment">
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Save()" data-bs-dismiss="modal">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
module.exports = {
    //state
    data : function(){
        return {
            borrow_id : "",
            student_id : "",
            borrowed_date : "",
            return_date : "",
            action : "",
            borrow_list : [],
        }
    },

    methods : {
        getData : function(){
            //maping header token dulu
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }

            axios.get(api_url + "/book_borrow", token)
            .then(response => {
                this.borrow_list = response.data;
            })
        },

        Add : function(){
            this.borrow_id = "",
            this.student_id = "",
            this.borrowed_date = "",
            this.return_date = "",
            this.action = "insert"
        },

        Edit : function(bbl){
            this.borrow_id       = bbl.borrow_id
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
                'return_date'    : this.return_date
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
