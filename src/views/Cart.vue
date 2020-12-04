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
              <b-breadcrumb-item active>Cart</b-breadcrumb-item>
            </b-breadcrumb>
          </div>
        </b-col>
      </b-row>
      <b-row class="p-4">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Gambar</th>
              <th scope="col">Makanan</th>
              <th scope="col">Keterangan</th>
              <th scope="col">Jumlah</th>
              <th scope="col">Harga</th>
              <th scope="col">Total Harga</th>
              <th scope="col">Hapus</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" v-bind:key="item.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>
                <img
                  class="img-order2"
                  :src="require(`../assets/${item.products.gambar}`)"
                />
              </td>
              <th>{{ item.products.nama }}</th>
              <th>{{ item.pesan }}</th>
              <th>{{ item.jumlah_pemesanan }}</th>
              <th>{{ item.products.harga }}</th>
              <th>{{ item.totalHarga }}</th>
              <th>
                <b-button @click="cartDelete(item, index)" variant="danger"
                  ><b-icon icon="trash"></b-icon
                ></b-button>
              </th>
            </tr>
          </tbody>
        </table>
      </b-row>
      <b-row class="justify-content-md-end">
        <b-col cols="4">
          <b-row class="mt-2">
            <span>Nama</span>
          </b-row>
          <b-row class="mt-2">
            <b-form-input
              id="nama"
              type="text"
              placeholder="Masukkan Nama Pemesan"
              class="mt-2"
              v-model="order.nama"
            ></b-form-input>
          </b-row>
          <b-row class="mt-2">
            <span>Nomor Meja</span>
          </b-row>
          <b-row class="mt-2">
            <b-form-input
              id="noMeja"
              type="text"
              placeholder="Masukkan Nomor Meja Pemesan"
              class="mt-2"
              v-model="order.noMeja"
            ></b-form-input>
          </b-row>
          <b-row class="justify-content-md-end">
            <b-button @click="tambahPesanan()" variant="success" class="mt-2"
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
  name: "Cart",
  components: {
    Navbar,
  },
  data() {
    return {
      items: [],
      order: {
        nama: "",
        noMeja: "",
        keranjangs: {},
      },
      orderTemp: null,
      count: 0,
    };
  },
  computed: {
    getImage(i) {
      return {
        img: i.products.gambar && require(`../assets/${i.products.gambar}`),
      };
    },
  },
  methods: {
    tambahPesanan() {
      if (this.items.length > 0 && this.order.nama && this.order.noMeja) {
        this.order.keranjangs = this.items;
        this.orderTemp = JSON.parse(JSON.stringify(this.order));
        axios
          .post("http://localhost:3000/pesanans/", this.orderTemp)
          .then((response) => {
            this.items.forEach((data) => {
              this.clearCart(data);
            });
            const status = response.status;
            if (status == "201") {
              this.$router.push("/sukses");
            }
          });
      } else {
        this.$bvToast.toast("Pastikan Daftar Keranjang, Nama dan Nomor Meja Tidak Kosong", {
          title: `Gagal Memesan Makanan`,
          variant: "danger",
          solid: true,
        });
      }
    },
    clearCart(o) {
      axios.delete("http://localhost:3000/keranjangs/" + o.id);
    },
    cartDelete(item, index) {
      axios
        .delete("http://localhost:3000/keranjangs/" + item.id)
        // eslint-disable-next-line no-unused-vars
        .then((response) => this.items.splice(index, 1));
    },
  },
  mounted() {
    axios.get("http://localhost:3000/keranjangs/").then((response) => {
      this.items = response.data;
    });
    axios.get("http://localhost:3000/keranjangs/").then((response) => {
      this.count = response.data.length;
    });
  },
};
</script>

<style>
.img-order2 {
  width: 300px;
}

.text {
  font-size: 18px;
  font-weight: bold;
}
</style>