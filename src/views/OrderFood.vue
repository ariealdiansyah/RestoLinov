<template>
  <div>
    <Navbar :count="count" />
    <b-container>
      <b-row>
        <b-col>
          <div class="mt-4">
            <b-breadcrumb>
              <b-breadcrumb-item to="/">
                <b-icon
                  icon="house-fill"
                  scale="1.25"
                  shift-v="1.25"
                  aria-hidden="true"
                ></b-icon>
                Home
              </b-breadcrumb-item>
              <b-breadcrumb-item to="/food">Food</b-breadcrumb-item>
              <b-breadcrumb-item active>Order Food</b-breadcrumb-item>
            </b-breadcrumb>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <img class="img-order" :src="getImage.img" />
        </b-col>
        <b-col cols="6">
          <b-row>
            <p class="text-title">{{ data.nama }}</p>
          </b-row>
          <b-row>
            <p class="text-harga">
              Harga <span style="font-weight: 800">Rp {{ data.harga }}</span>
            </p>
          </b-row>
          <b-row>
            <span class="mt-2">Jumlah Pesan</span>
          </b-row>
          <b-row>
            <b-form-input
              id="jumlah"
              type="number"
              placeholder="Masukkan Jumlah Pesan"
              class="mt-2"
              v-model="cart.jumlah_pemesanan"
            ></b-form-input>
          </b-row>
          <b-row>
            <span class="mt-2">Keterangan</span>
          </b-row>
          <b-row>
            <b-form-textarea
              id="keterangan"
              placeholder="Default textarea"
              class="mt-2"
              v-model="cart.pesan"
            ></b-form-textarea>
          </b-row>
          <b-row>
            <b-button @click="addToCart()" variant="success" class="mt-2"
              ><b-icon icon="cart4"></b-icon> Pesan</b-button
            >
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";

export default {
  name: "OrderFood",
  components: {
    Navbar,
  },
  data() {
    return {
      data: {},
      cart: {
        pesan: "",
        jumlah_pemesanan: "",
        products: {},
        totalHarga: "",
      },
      cartTemp: null,
      count: 0,
    };
  },
  computed: {
    getImage() {
      return {
        ...this.data,
        img: this.data.gambar && require(`../assets/${this.data.gambar}`),
      };
    },
  },
  methods: {
    addToCart() {
      this.cart.products = this.data;
      const tot = this.data.harga * this.cart.jumlah_pemesanan;
      this.cartTemp = JSON.parse(JSON.stringify(this.cart));
      this.cartTemp.totalHarga = tot;
      axios
        .post("http://localhost:3000/keranjangs/", this.cartTemp)
        .then((response) => {
          const status = response.status;
          if (status == "201") {
            this.$router.push("/cart");
          }
        });
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/products/" + this.$route.params.id)
      .then((response) => (this.data = response.data));
    axios.get("http://localhost:3000/keranjangs/").then((response) => {
      this.count = response.data.length;
    });
  },
};
</script>

<style>
.img-order {
  width: 100%;
}

.text-title {
  font-size: 45px;
  font-weight: 800;
}

.text-harga {
  font-size: 25px;
}
</style>