<template>
  <div class="container-fluid">
    <div class="page-title">
      <div class="row">
        <div class="col-sm-6 col-12">
          <h2>Data Orders</h2>
        </div>
        <div class="col-sm-6 col-12 text-end">
          <nuxt-link to="/orders/create" class="btn btn-primary">Add Order</nuxt-link>
        </div>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-md-3">
        <input v-model="filter.member" type="text" class="form-control rounded-pill" placeholder="Search Member" />
      </div>
      <div class="col-md-2">
        <select v-model="filter.status" class="form-control rounded-pill">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div class="col-md-2">
        <button @click="searchOrders" class="btn btn-primary w-100">Search</button>
      </div>
    </div>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="col-md-auto d-flex align-items-center">
        <select class="form-select" v-model="filter.limit" style="width: auto; min-width: 60px">
          <option v-for="(item,index) in filter.limitOptions" :key="index" :value="item">{{ item }}</option>
        </select>
        <span class="ms-2">entries per page</span>
      </div>
      <div class="products-total">
        <div class="square-product-setting d-inline-block">
          <a href="#" @click.prevent="viewMode='grid'" class="icon-grid grid-layout-view rounded"><i data-feather="grid"></i></a>
        </div>
        <div class="square-product-setting d-inline-block">
          <a href="#" @click.prevent="viewMode='list'" class="icon-grid m-0 list-layout-view rounded"><i data-feather="list"></i></a>
        </div>
      </div>
    </div>

    <div v-if="viewMode==='list'">
      <div class="card">
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Member</th>
                <th>Order Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in paginatedOrders" :key="item.id">
                <td>{{ index + 1 + filter.limit*(page-1) }}</td>
                <td>{{ item.member.name }}</td>
                <td>{{ item.order_date }}</td>
                <td>{{ formatCurrency(item.total) }}</td>
                <td>{{ item.status }}</td>
                <td>
                  <nuxt-link :to="`/orders/edit?content=${item.id}`" class="btn btn-warning btn-sm me-2">Edit</nuxt-link>
                  <button @click="deleteOrder(item)" class="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="row" v-else>
      <div class="col-xl-3 col-sm-6 xl-3" v-for="item in paginatedOrders" :key="item.id">
        <div class="card">
          <div class="card-body">
            <h5>{{ item.member.name }}</h5>
            <p>Date: {{ item.order_date }}</p>
            <p>Total: {{ formatCurrency(item.total) }}</p>
            <p>Status: {{ item.status }}</p>
            <div class="d-flex mt-2">
              <nuxt-link :to="`/orders/edit?content=${item.id}`" class="btn btn-warning w-50 me-2">Edit</nuxt-link>
              <button @click="deleteOrder(item)" class="btn btn-danger w-50">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <pagination :page="page" :total="total" :limit="filter.limit" :handleAction="goToPage"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Pagination from '~/components/pagination.vue';

export default {
  components: { Pagination },
  data() {
    return {
      orders: [],
      page: 1,
      total: 0,
      viewMode: 'grid',
      filter: {
        member: '',
        status: '',
        limit: 12,
        limitOptions: [12, 24, 60]
      }
    };
  },
  computed: {
    paginatedOrders() {
      const start = (this.page - 1) * this.filter.limit;
      return this.orders.slice(start, start + this.filter.limit);
    }
  },
  methods: {
    async fetchOrders() {
      try {
        const res = await axios.get('http://localhost:8080/orders');
        this.orders = res.data.data.map(o => ({ ...o, member: o.member || {} }));
        this.total = this.orders.length;
      } catch (err) {
        console.error(err);
      }
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    },
    searchOrders() {
      this.page = 1;
      let filtered = this.orders;
      if(this.filter.member) {
        filtered = filtered.filter(o => o.member.name.toLowerCase().includes(this.filter.member.toLowerCase()));
      }
      if(this.filter.status) {
        filtered = filtered.filter(o => o.status === this.filter.status);
      }
      this.total = filtered.length;
      this.orders = filtered;
    },
    goToPage(p) {
      if(p < 1) return;
      const totalPages = Math.ceil(this.total / this.filter.limit);
      if(p > totalPages) return;
      this.page = p;
    },
    deleteOrder(order) {
      if(confirm(`Delete order of ${order.member.name}?`)) {
        this.orders = this.orders.filter(o => o.id !== order.id);
        this.total = this.orders.length;
        alert('Order deleted!');
      }
    }
  },
  mounted() {
    this.fetchOrders();
  }
}
</script>
