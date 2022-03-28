<template>
    <div>
        <div class="container-fluid px-4">
            <h1 class="mt-4">Tables</h1>

            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="index.html">Book</a></li>
                <li class="breadcrumb-item active">Tables</li>
            </ol>
            
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                        Book List
                        <button @click="Add()" data-bs-toggle="modal" data-bs-target="#book_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i>Add Book</button>
                </div>
                
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-stripped">
                        <thead>
                            <tr>
                                <th>BOOK ID</th>
                                <th>BOOK NAME</th>
                                <th>COVER</th>
                                <th>AUTHOR</th>
                                <th>DESCRIPTION</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="bl in book_list" :key="bl">
                                <td>{{ bl.book_id }}</td>
                                <td>{{ bl.book_name }}</td>
                                <td>
                                    <img v-if="bl.image !== null" :src="api_url2 + '/images/' + bl.image" width="100">
                                    <span v-else>No Image</span>
                                </td>
                                <td>{{ bl.author }}</td>
                                <td>{{ bl.description }}</td>
                                <td>
                                    <button class="btn btn-secondary" @click="Edit(bl)" data-bs-toggle="modal" data-bs-target="#bookcover_modal"><i class="fas fa-image fa-fw"></i></button>
                                    <button class="btn btn-info" @click="Edit(bl)" data-bs-toggle="modal" data-bs-target="#book_modal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger" @click="Delete(bl.book_id)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="book_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Book Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="book_name" class="form-label">Book Name</label>
                            <input type="text" class="form-control" id="book_name" v-model="book_name" placeholder="Book Name">
                        </div>
                        
                        <div class="mb-3">
                            <label for="author" class="form-label">Author</label>
                            <input type="text" class="form-control" id="author" v-model="author" placeholder="Author">
                        </div>

                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control" v-model="description" id="description" rows="3"></textarea>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Save()" data-bs-dismiss="modal">Save</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="bookcover_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Book Cover</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="book_cover" class="form-label">Book Cover</label>
                            <input type="file" class="from-control" id="book_cover" @change="uploadCover($event)">
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Upload(book_id)" data-bs-dismiss="modal">Save</button>
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
            book_id : "",
            book_name : "",
            author : "",
            description : "",
            book_cover : "",
            action : "",
            book_list : [],
        }
    },

    methods : {
        getData : function(){
            //maping header token dulu
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }

            axios.get(api_url + "/book", token)
            .then(response => {
                this.book_list = response.data;
            })
        },

        Add : function(){
            this.book_id = "",
            this.book_name = "",
            this.author = "",
            this.description = "",
            this.action = "insert"
        },

        Edit : function(bl){
            this.book_id        = bl.book_id
            this.book_name      = bl.book_name
            this.author         = bl.author
            this.description    = bl.description
            this.action         = "update"
        },

        uploadCover : function(e){
            this.book_cover = e.target.files[0]
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
            form.append("book_cover", this.book_cover)

            axios.post(api_url + '/book/UploadCover/' + id , form, token)
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
                headers : {
                    "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }

            //mapping data
            let form = {
                //back end      //state
                'book_name'     : this.book_name,
                'author'        : this.author,
                'description'   : this.description,
                'book_cover'    : this.book_cover
            }

            if(this.action === "insert"){ // post
                axios.post(api_url + '/book', form, token)
                .then(response =>{
                    Swal.fire({
                            title: 'Success!',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'Ok'
                    })
                })
            } else { // put
                axios.put(api_url + '/book/' + this.book_id, form, token)
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

        Delete : function(book_id){
            //maping header token dulu
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }

            Swal.fire({
                title: 'Delete Book  Data',
                text:'Do you want to delete this data?',
                icon: 'warning',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Delete',
                denyButtonText: `Cancel`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios.delete(api_url + '/book/' + book_id, token)
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
