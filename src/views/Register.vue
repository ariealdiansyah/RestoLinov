<template>
  <div>
    <Navbar />
    <div class="row justify-content-md-center mt-4">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Register</div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" placeholder="Name.." />
              </div>
              <div class="form-group">
                <label for="email">Username</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username.."
                  v-model="akun.username"
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password.."
                  v-model="akun.password"
                />
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";
export default {
  name: "Register",
  components: {
    Navbar,
  },
  data() {
    return {
      akun: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    addUser() {
      if (!this.username && !this.password) {
        axios.post("http://localhost:3000/users", this.akun);
      }
    },
  },
};
</script>

<style>
</style>