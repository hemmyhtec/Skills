<template>
    <div class="container">
       <div class="row mt-5">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Posts Table</h3>

                <div class="card-tools">
                      <button class="btn btn-success" @click="newModal"> Add New <i class="fas fa-user-plus fa-fw"></i></button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Products / Skills Name</th>
                      <th>Description</th>
                      <th>Prize</th>
                      <th>Offer Close</th>
                      <th>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="post in posts" :key="post.id">
                      <td>{{post.id}}</td>
                      <td>{{post.productsname}}</td>
                      <td>{{post.description }}</td>
                      <td>#{{post.prize}}</td>
                      <td>{{post.offerclose | mydate}}</td>
                      <td>{{post.created_at | mydate}}</td>
                      <td>
                        <a href="#" @click="editModel(post)">
                            <i class="fa fa-edit blue"></i>
                        </a>

                        <a href="#" @click="deletepost(post.id)">
                            <i class="fa fa-trash red"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>
<div class="modal" id="addNew" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" v-show="editmode" id="addNew">Update Data</h5>
        <h5 class="modal-title" v-show="!editmode" id="addNew">Create Skills or Services</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <form @submit.prevent="editmode ? updatepost() : createpost()" @keydown="form.onKeydown($event)">
                <AlertError :form="form" />
                <AlertSuccess :form="form" message="Your changes have beend saved!" />

                <div class="mb-3">
                    <input id="productsname" v-model="form.productsname" type="text" name="name" class="form-control" placeholder="Products or Skills Name">
                    <HasError :form="form" field="productsname" />
                </div>
                <div class="mb-3">
                    <input id="description" v-model="form.description" type="textarea" name="description" class="form-control" placeholder="Product or Skills Description">
                    <HasError :form="form" field="description" />
                </div>
                <div class="mb-3">
                    <input id="prize" v-model="form.prize" type="number" name="prize" class="form-control" placeholder="Enter Prize">
                    <HasError :form="form" field="prize" />
                </div>
                <div class="mb-3">
                    <input id="offerclose" v-model="form.offerclose" type="date" name="offerclose" class="form-control" placeholder="Offer closing Date">
                    <HasError :form="form" field="offerclose" />
                </div>

        <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        <button v-show="!editmode" type="submit" class="btn btn-primary">Create</button>
        <button v-show="editmode" type="submit" class="btn btn-success">Update</button>
      </div>
      </form>
      </div>
    </div>
  </div>
</div>

    </div>
</template>

<script>
import Form from 'vform'
import { Button, HasError, AlertError } from 'vform/src/components/bootstrap5'

    export default {
        components: {
            Button, HasError, AlertError
        },
        data () {
            return {
                editmode: false,
                posts: {},
                form: new Form ({
                    id: '',
                    productsname: '',
                    description: '',
                    prize: '',
                    offerclose: '',
                    photo: ''
                })
            }
        },
        methods: {
          updatepost() {
            this.$Progress.start()
            this.form.put('api/post/'+this.form.id)
            .then (()=> {
              $('#addNew').modal('hide')
                swal.fire(
                      'Updated!',
                      'Your file has been Updates.',
                      'success'
                      )
                      Fire.$emit('AfterCreated')
                      this.$Progress.finish()
            })
            .catch (()=> {
              this.$Progress.fail()
            })
          },
          editModel(post) {
            this.editmode = true
            this.form.reset()
            $('#addNew').modal('show')
            this.form.fill(post)
          },
          newModal() {
            this.editmode = false
            this.form.reset()
            $('#addNew').modal('show')
          },
            deletepost(id){
              swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {


                //Send request to the server
            if (result.value) {
              this.form.delete('api/post/'+id).then(()=>{
                      swal.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                      )
                      Fire.$emit('AfterCreated')
              }).catch (()=> {
                swal.fire('Failed', 'There was something wrong.', 'warning')
              })
            }
              })
            },
            async loadposts () {
                await axios.get('api/user').then(({ data }) => (this.posts = data.data))
            },
            createpost () {
                this.$Progress.start()
                this.form.post('api/post')
                .then (() => {
                    Fire.$emit('AfterCreated')
                    $('#addNew').modal('hide')
                    toast.fire({
                        icon: 'success',
                        title: 'post Created'
                    })
                    this.$Progress.finish()
                })
                .catch (() => {

                })
            }
        },
        created () {
            this.loadposts()
            Fire.$on('AfterCreated', () => {
                this.loadposts()
            })
            // setInterval(() => this.loadposts(), 3000)
        }
    }
</script>
