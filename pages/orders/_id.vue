<template>
  <div class="container-fluid">
    <h2>Edit Order</h2>
    <OrderForm v-if="formLoaded" :form="form" :members="members" @submit="updateOrder" />
    <div v-else class="alert alert-info">Loading order data...</div>
  </div>
</template>

<script>
import OrderForm from '~/components/OrderForm.vue'

export default {
  components: { OrderForm },
  data() {
    return {
      form: { member_id: '', order_date: '', total: 0, status: 'pending' },
      members: [],
      formLoaded: false,
    }
  },
  methods: {
    async fetchData() {
      const id = this.$route.params.id
      const [membersRes, orderRes] = await Promise.all([
        this.$api.get('/members'),
        this.$api.get(`/orders/${id}`)
      ])
      this.members = membersRes?.data?.data || []
      const o = orderRes?.data?.data || {}
      this.form = {
        member_id: String(o.member_id || ''),
        order_date: o.order_date || '',
        total: parseFloat(o.total || 0),
        status: o.status || 'pending',
      }
      this.formLoaded = true
    },
    async updateOrder(data) {
      const id = this.$route.params.id
      const res = (await this.$api.put(`/orders/${id}`, data))?.data
      this.$swal.fire('Success', res?.message || 'Order updated', 'success')
      this.$router.push('/orders')
    },
  },
  mounted() {
    this.fetchData()
  },
}
</script>
