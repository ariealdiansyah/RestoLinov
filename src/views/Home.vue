<template>
  <div>
    <Navbar :count="count" />
    <b-container>
      <div class="d-flex">
        <div class="col align-self-center">
          <div class="d-flex justify-content-start">
            <span>
              <h1 style="text-align: start">Delicious Food Menu</h1>
              <h2 style="text-align: start">in Your Handphone</h2>
              <h3 style="text-align: start">
                Ayo segera pilih dan pesan makanan favorit anda
              </h3>
            </span>
          </div>
          <div class="align-self-start" style="text-align: start !important">
            <b-button to="/food" variant="success" style="text-align: start"
              ><b-icon icon="arrow-right"></b-icon>Pesan</b-button
            >
          </div>
        </div>
        <div class="col">
          <img src="../assets/ilustrasi.png" style="width: 100%" />
        </div>
      </div>
      <b-row>
        <b-col cols="6">
          <h3>Best <span style="font-weight: 900">Foods</span></h3>
        </b-col>
        <b-col cols="6" class="align-self-end" style="text-align: end">
          <b-button variant="success"
            ><b-icon icon="eye"></b-icon>Lihat Semua</b-button
          >
        </b-col>
      </b-row>
      <b-row>
        <b-col v-for="item in data" :key="item.id" class="mt-4">
          <div class="card" style="width: 18rem">
            <img
              class="card-img-top"
              :src="require('@/assets/' + item.gambar)"
            />
            <div class="card-body">
              <h5 class="card-title">{{ item.nama }}</h5>
              <p class="card-text">Harga : {{ item.harga }}</p>
              <b-button :to="'/foods/' + item.id" variant="success"
                ><b-icon icon="cart4"></b-icon>Pesan</b-button
              >
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";

export default {
  name: "Home",
  components: {
    Navbar,
  },
  data() {
    return {
      data: [],
      count: 0,
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/best-products")
      .then((response) => (this.data = response.data));
    axios.get("http://localhost:3000/keranjangs/").then((response) => {
      this.count = response.data.length;
    });
  },
};
</script>

<style scoped>
.title {
  text-align: center;
}
</style>