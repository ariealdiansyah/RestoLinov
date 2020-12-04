<template>
  <div>
    <Navbar />
    <div class="row justify-content-md-center mt-4">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="email">Username</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email.."
                  v-model="username"
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password.."
                  v-model="password"
                />
              </div>
              <button @click="checkLogin()" class="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import Navbar from "../components/Navbar.vue";

export default {
  name: "Login",
  components: {
    Navbar,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    checkLogin() {
      console.log("ua", this.username);
      if (this.username != "" && this.password != "") {
        if (
          this.username == this.$parent.mockAccount.username &&
          this.password == this.$parent.mockAccount.password
        ) {
          this.$emit("authenticated", true);
          this.$router.replace({ name: "Home" });
        } else {
          console.log("The username and / or password is incorrect");
        }
        // console.log('u',this.username)
        // axios
        //   .get(
        //     "http://localhost:3000/users?username=" +
        //       this.username +
        //       "&password=" +
        //       this.password
        //   )
        //   .then((res) => {
        //     if (res.data.length > 0) {
        //       this.$emit("authenticated", true);
        //       this.$router.replace({ name: "Home" });
        //     } else {
        //       console.log("Username atau Password Salah");
        //     }
        //   });
      } else {
        console.log("Harap Masukkan Username dan Password");
      }
    },
  },
};
</script>

<style>
</style>