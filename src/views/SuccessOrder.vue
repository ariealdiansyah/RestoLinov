<template>
  <div>
    <Navbar :count="count" />
    <b-container>
      <div class="text-center">
        <img class="success-img" src="../assets/menunggu.png" />
      </div>
    </b-container>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import axios from 'axios';

export default {
  name: "Success",
   components: {
    Navbar,
  },
  data() {
      return {
          count : 0
      }
  },
  methods: {
    redirectHome() {},
  },
  created() {
    setTimeout(() => this.$router.push({ path: "/" }), 5000);
  },
  beforeMount() {
    this.$bvToast.toast("Terima Kasih telah memesan di Linov Restaurant", {
      title: `Sukses Memesan Makanan`,
      variant: "success",
      solid: true,
    });
  },
  mounted() {
      axios.get("http://localhost:3000/keranjangs/").then((response) => {
      this.count = response.data.length;
    });
  }
};
</script>

<style>
.success-img {
  height: 450px;
  width: 350px;
  text-align: center;
  align-content: center;
  align-items: center;
  align-self: center;
}
</style>