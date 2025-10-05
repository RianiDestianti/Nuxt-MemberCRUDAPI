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

    <div class="card" v-if="orders.length">
      <div class="card-body table-responsive">
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
            <tr v-for="(item, index) in orders" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.member?.name }}</td>
              <td>{{ item.order_date }}</td>
              <td>{{ formatCurrency(item.total) }}</td>
              <td>{{ item.status }}</td>
              <td>
                <nuxt-link
                  :to="`/orders/edit?content=${item.id}`"
                  class="btn btn-warning btn-sm me-2"
                >
                  Edit
                </nuxt-link>
                <button @click="deleteOrder(item)" class="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="alert alert-info">No orders found.</div>
  </div>
</template>

<script>
export default {
  data() {
    return { orders: [] }
  },
  methods: {
    async fetchOrders() {
      const res = await this.$api.get('/orders')
      this.orders = res.data.data.map(o => ({ ...o, member: o.member || {} }))
    },
    formatCurrency(v) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(v)
    },
    async deleteOrder(order) {
      const confirm = await this.$swal.fire({
        title: 'Delete Order?',
        text: `Delete order of ${order.member.name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
      })
      if (!confirm.isConfirmed) return
      await this.$api.delete(`/orders/${order.id}`)
      await this.fetchOrders()
      this.$swal.fire('Deleted!', 'Order has been deleted.', 'success')
    },
  },
  mounted() {
    this.fetchOrders()
  },
}
</script>
