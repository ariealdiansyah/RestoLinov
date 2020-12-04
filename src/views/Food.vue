<template>
  <div>
    <Navbar :count="count" />
    <b-container>
      <b-row>
        <b-col>
          <div class="mt-4">
            <h3>Daftar <span style="font-weight: 900">Makanan</span></h3>
            <b-input-group size="lg" class="mb-2">
              <b-form-input
                type="search"
                placeholder="Cari Makanan"
                v-model="filteredText"
              ></b-form-input>
              <b-input-group-prepend is-text>
                <b-icon icon="search"></b-icon>
              </b-input-group-prepend>
            </b-input-group>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <div v-for="item in data" :key="item.id">
          <b-col class="mt-4">
          <div class="card" style="width: 21.5rem">
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
        </div>
        
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";

export default {
  name: "Food",
  components: {
    Navbar,
  },
  data() {
    return {
      data: [],
      filteredText: "",
      count: 0,
    };
  },
  watch: {
    filteredText(value) {
      this.doSearch(value);
    },
  },
  methods: {
    doSearch(value) {
      axios
      .get("http://localhost:3000/products?q=" + value)
      .then((response) => (this.data = response.data));
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/products")
      .then((response) => (this.data = response.data));
    axios.get("http://localhost:3000/keranjangs/").then((response) => {
      this.count = response.data.length;
    });
    
  },
};
</script>

<style>
</style>