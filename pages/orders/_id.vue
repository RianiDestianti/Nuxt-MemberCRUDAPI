<template>
  <div class="container-fluid">
    <h2>Edit Order</h2>
    <OrderForm
      v-if="loaded"
      :form="form"
      :members="members"
      @submit="updateOrder"
    />
    <div v-else class="alert alert-info">Memuat data order...</div>
  </div>
</template>

<script>
import OrderForm from '~/components/OrderForm.vue'

export default {
  components: { OrderForm },
  data: () => ({
    form: { member_id: '', order_date: '', total: 0, status: 'pending' }, members: [],
    loaded: false
  }),
  methods: {
    async fetchData() {
      this.orderId = this.$route.params.id;[
      this.membersResponse, this.orderResponse] = await Promise.all([
      this.$api.get('/members'),
      this.$api.get(`/orders/${this.orderId}`)
      ])

      this.members = this.membersResponse?.data?.data || []
      this.order = this.orderResponse?.data?.data || {}

      this.form = {
           member_id: String(this.order.member_id || ''),
           order_date: this.order.order_date || '',
           total: parseFloat(this.order.total || 0),
           status: this.order.status || 'pending'
      }

      this.loaded = true
    },

    async updateOrder(formData) {
      this.response = await this.$api.put(`/orders/${this.$route.params.id}`, formData)
      this.$swal.fire('Berhasil', this.response?.data?.message || 'Order diperbarui', 'success')
      this.$router.push('/orders')
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
