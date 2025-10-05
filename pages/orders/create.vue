<template>
  <div class="container-fluid">
    <div class="page-title">
      <div class="row">
        <div class="col-6"><h2>Create Order</h2></div>
        <div class="col-6 text-end">
          <nuxt-link to="/orders" class="btn btn-secondary">Back</nuxt-link>
        </div>
      </div>
    </div>

    <OrderForm :form="form" :members="members" @submit="submitOrder" />
  </div>
</template>

<script>
import OrderForm from '~/components/OrderForm.vue'

export default {
  layout: 'app',
  components: { OrderForm },
  data() {
    return {
      form: { member_id: '', order_date: '', total: '', status: 'pending' },
      members: [],
    }
  },
  methods: {
    async fetchMembers() {
      const res = await this.$api.get('/members')
      this.members = res.data.data
    },
    async submitOrder(data) {
      const res = await this.$api.post('/orders', data)
      this.$swal.fire('Success', res.data.message, 'success')
      this.$router.push('/orders')
    },
  },
  mounted() {
    this.fetchMembers()
  },
}
</script>
