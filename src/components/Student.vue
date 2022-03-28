<template>
    <div>
        <div class="container-fluid px-4">
            <h1 class="mt-4">Tables</h1>

            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="index.html">Student</a></li>
                <li class="breadcrumb-item active">Tables</li>
            </ol>
            
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                        Student List
                        <button @click="Add()" data-bs-toggle="modal" data-bs-target="#student_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i>Add Student</button>
                </div>
                
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-stripped">
                        <thead>
                            <tr>
                                <th>STUDENT ID</th>
                                <th>STUDENT NAME</th>
                                <th>PHOTO</th>
                                <th>BIRTHDAY</th>
                                <th>GENDER</th>
                                <th>ADDRESS</th>
                                <th>CLASS ID</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="sl in student_list" :key="sl">
                                <td>{{ sl.student_id }}</td>
                                <td>{{ sl.student_name }}</td>
                                <td>
                                    <img v-if="sl.image !== null" :src="api_url2 + '/images/' + sl.image" width="100">
                                    <span v-else>No Image</span>
                                </td>
                                <td>{{ sl.birthday }}</td>
                                <td>{{ sl.gender }}</td>
                                <td>{{ sl.address }}</td>
                                <td>{{ sl.class_id }}</td>
                                <td>
                                    <button class="btn btn-secondary" @click="Edit(sl)" data-bs-toggle="modal" data-bs-target="#photo_modal"><i class="fas fa-image fa-fw"></i></button>
                                    <button class="btn btn-info" @click="Edit(sl)" data-bs-toggle="modal" data-bs-target="#student_modal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger" @click="Delete(sl.student_id)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="student_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Student Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="student_name" class="form-label">Student Name</label>
                            <input type="text" class="form-control" id="student_name" v-model="student_name" placeholder="Student Name">
                        </div>
                        
                        <div class="mb-3">
                            <label for="birthday" class="form-label">Birthday</label>
                            <input type="date" class="form-control" id="birthday" v-model="birthday" placeholder="Birthday">
                        </div>

                        <div class="mb-3">
                            <label for="gender" class="form-label">Gender</label>
                            <select class="form-control" id="gender" v-model="gender">
                                <option></option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="address" class="form-label">Address</label>
                            <textarea class="form-control" v-model="address" id="address" rows="3"></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="class_id" class="form-label">Class_id</label>
                            <select class="form-control" id="class_id" v-model="class_id">
                                <option v-for="cl in class_list" :key="cl" v-bind:value="cl.class_id">{{ cl.class_name }} - {{ cl.group }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Save()" data-bs-dismiss="modal">Save</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="photo_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Photo</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="student_photo" class="form-label">Photo</label>
                            <input type="file" class="from-control" id="student_photo" @change="uploadPhoto($event)">
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Upload(student_id)" data-bs-dismiss="modal">Save</button>
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
            student_id : "",
            student_name : "",
            birthday : "",
            gender : "",
            address : "",
            class_id : "",
            action : "",
            class_list: [],
            student_list : [],
        }
    },

    methods : {
        getStudent: function(){
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }

            axios.get(api_url + "/class", token)
            .then(response => {
                this.class_list = response.data;
            })
        },
        getData : function(){
            //maping header token dulu
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }

            axios.get(api_url + "/student", token)
            .then(response => {
                this.student_list = response.data;
            })
        },

        Add : function(){
            this.student_id = "",
            this.student_name = "",
            this.birthday = "",
            this.gender = "",
            this.address = "",
            this.class_id = "",
            this.action = "insert"

            this.getStudent()
        },

        Edit : function(sl){
            this.student_id        = sl.student_id
            this.student_name      = sl.student_name
            this.birthday          = sl.birthday
            this.gender            = sl.gender
            this.address           = sl.address
            this.class_id          = sl.class_id
            this.action            = "update"

            this.getStudent()
        },

        uploadPhoto : function(e){
            this.student_photo = e.target.files[0]
        },

        Upload : function(id){
            //maping header token dulu
            let token = {
                headers : {
                    "Authorization" : "Bearer " + this.$cookies.get("Authorization"),
                    'content-type' : 'multipart/form-data'}
            }

            //mapping data
            let form = new FormData()
            form.append("student_photo", this.student_photo)

            axios.post(api_url + '/student/UploadPhoto/' + id , form, token)
            .then(response =>{
                Swal.fire({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'Ok'
                })
                this.getData()
            })
        },

        Save : function(){
            //maping header token dulu
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }

            //mapping data
            let form = {
                //back end      //state
                'student_name'     : this.student_name,
                'birthday'         : this.birthday,
                'gender'           : this.gender,
                'address'          : this.address,
                'class_id'         : this.class_id
            }

            if(this.action === "insert"){ // post
                axios.post(api_url + '/student', form, token)
                .then(response =>{
                    console.log(response)
                    // Swal.fire({
                    //         title: 'Success!',
                    //         text: response.data.message,
                    //         icon: 'success',
                    //         confirmButtonText: 'Ok'
                    // })
                })
            } else { // put
                axios.put(api_url + '/student/' + this.student_id, form, token)
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

        Delete : function(student_id){
            //maping header token dulu
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }

            Swal.fire({
                title: 'Delete student  Data',
                text:'Do you want to delete this data?',
                icon: 'warning',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Delete',
                denyButtonText: `Cancel`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios.delete(api_url + '/student/' + student_id, token)
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
