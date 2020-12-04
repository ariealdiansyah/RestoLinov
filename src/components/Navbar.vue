<template>
  <div>
    <div class="container">
      <b-navbar toggleable="lg" type="light">
        <b-navbar-brand href="#">Resto Linov</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/food">Food</b-nav-item>
          </b-navbar-nav>

          <template v-if="!isAuntheticated">
            <b-navbar-nav class="ml-auto">
              <b-icon icon="cart4"></b-icon>
              <b-nav-item to="/cart"
                >Keranjang<b-badge variant="success">{{
                  count
                }}</b-badge></b-nav-item
              >
              <b-nav-item to="/login" @click="logout()">
                Logout
              </b-nav-item>
            </b-navbar-nav>
          </template>
          <template v-if="isAuntheticated">
            <b-navbar-nav class="ml-auto">
              <b-nav-item to="/login">Login</b-nav-item>
              <b-nav-item to="/register">Register</b-nav-item>
            </b-navbar-nav>
          </template>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    count: Number,
  },
  data() {
    return {
      isAuntheticated: null,
    };
  },
  watch : {
    isAuntheticated() {
      this.checkAuth()
    }
  },
  methods: {
    checkAuth() {
      this.isAuntheticated = this.$parent.authenticated;
    },
  },
  beforeMount() {
    this.checkAuth();
  },
  updated() {
    this.checkAuth()
  }
};
</script>

<style>
a.nav-link.router-link-exact-active.router-link-active {
  font-weight: bold;
}
</style>