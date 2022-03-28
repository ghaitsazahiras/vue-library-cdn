z<template>
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
                        Class List
                        <button @click="Add()" data-bs-toggle="modal" data-bs-target="#class_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i>Add Class</button>
                </div>
                
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-stripped">
                        <thead>
                            <tr>
                                <th>CLASS ID</th>
                                <th>CLASS NAME</th>
                                <th>GROUP</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="lc in list_class" :key="lc">
                                <td>{{ lc.class_id }}</td>
                                <td>{{ lc.class_name }}</td>
                                <td>{{ lc.group }}</td>
                                <td>
                                    <button class="btn btn-info" @click="Edit(lc)" data-bs-toggle="modal" data-bs-target="#class_modal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger" @click="Delete(lc.class_id)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="class_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Class Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="class_name" class="form-label">Class Name</label>
                            <input type="text" class="form-control" id="class_name" v-model="class_name" placeholder="Class Name">
                        </div>
                        
                        <div class="mb-3">
                            <label for="group" class="form-label">Group</label>
                            <input type="text" class="form-control" id="group" v-model="group" placeholder="Group">
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
            class_id : "",
            class_name : "",
            group : "",
            action : "",
            list_class : [],
        }
    },

    methods : {
        getData : function(){
            //maping header token dulu
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }

            axios.get(api_url + "/class", token)
            .then(response => {
                this.list_class = response.data;
            })
        },

        Add : function(){
            this.class_id = "",
            this.class_name = "",
            this.group = "",
            this.action = "insert"
        },

        Edit : function(lc){
            this.class_id        = lc.class_id
            this.class_name      = lc.class_name
            this.group           = lc.group
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
                'class_name'     : this.class_name,
                'group'          : this.group
            }

            if(this.action === "insert"){ // post
                axios.post(api_url + '/class', form, token)
                .then(response =>{
                    Swal.fire({
                            title: 'Success!',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'Ok'
                    })
                })
            } else { // put
                axios.put(api_url + '/class/' + this.class_id, form, token)
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

        Delete : function(class_id){
            //maping header token dulu
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }

            Swal.fire({
                title: 'Delete Class Data',
                text:'Do you want to delete this data?',
                icon: 'warning',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Delete',
                denyButtonText: `Cancel`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios.delete(api_url + '/class/' + class_id, token)
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
