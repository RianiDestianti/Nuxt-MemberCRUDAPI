<template>
  <div class="container-fluid">
    <div class="page-title d-flex justify-content-between align-items-center mb-3">
      <h2>Data Orders</h2>
      <nuxt-link to="/orders/create" class="btn btn-primary">Tambah Order</nuxt-link>
    </div>

    <div v-if="orders.length" class="card">
      <div class="card-body table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Member</th>
              <th>Tanggal</th>
              <th>Total</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orders" :key="order.id">
              <td>{{ index + 1 }}</td>
              <td>{{ order.member?.name }}</td>
              <td>{{ order.order_date }}</td>
              <td>{{ formatCurrency(order.total) }}</td>
              <td>{{ order.status }}</td>
              <td>
                <nuxt-link :to="`/orders/${order.id}`" class="btn btn-warning btn-sm me-2">Edit</nuxt-link>
                <button @click="deleteOrder(order)" class="btn btn-danger btn-sm">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="alert alert-info">Belum ada data order.</div>
  </div>
</template>

<script>
export default {
  data: () => ({ orders: [] }),
  methods: {
    async fetchOrders() {
      const response = await this.$api.get('/orders')
      this.orders = response?.data?.data?.map(order => ({...order,member: order.member || {}})) || []
    },

    formatCurrency(value) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
    },

    async deleteOrder(order) {
      const confirmation = await this.$swal.fire({
        title: 'Hapus Order?',
        text: `Yakin ingin menghapus order milik ${order.member?.name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus!'
      })

      if (!confirmation.isConfirmed) return

      await this.$api.delete(`/orders/${order.id}`)
      this.$swal.fire('Terhapus!', 'Order berhasil dihapus.', 'success')
      this.fetchOrders()
    }
  },
  mounted() {
    this.fetchOrders()
  }
}
</script>
