<template>
  <div class="container-fluid">
    <h2>Create Order</h2>
    <OrderForm v-if="members.length" :form="form" :members="members" @submit="submitOrder" />
    <div v-else class="alert alert-info">Loading members...</div>
  </div>
</template>

<script>
import OrderForm from '~/components/OrderForm.vue'

export default {
  components: { OrderForm },
  data() {
    return {
      form: { member_id: '', order_date: '', total: 0, status: 'pending' },members: [],
    }
  },
  methods: {
    async fetchMembers() {
      this.members = (await this.$api.get('/members'))?.data?.data || []
    },
    async submitOrder(data) {
      this.$swal.fire('Success', (await this.$api.post('/orders', data)).data?.message || 'Order created', 'success')
      this.$router.push('/orders')
    }
  },
  mounted() {
      this.fetchMembers()
  },
}
</script>