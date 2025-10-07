<template>
  <div class="container-fluid">
    <div class="page-title">
      <div class="row">
        <div class="col-6"><h2>Edit Order</h2></div>
        <div class="col-6 text-end">
          <nuxt-link to="/orders" class="btn btn-secondary">Back</nuxt-link>
        </div>
      </div>
    </div>

    <OrderForm
      v-if="formLoaded"
      :form="form"
      :members="members"
      @submit="updateOrder"
    />
    <div v-else class="alert alert-info">Loading order data...</div>
  </div>
</template>

<script>
import OrderForm from '~/components/OrderForm.vue'

export default {
  layout: 'app',
  components: { OrderForm },
  data() {
    return {
      id: null,
      form: { member_id: '', order_date: '', total: '', status: 'pending' },
      members: [],
      formLoaded: false,
    }
  },
  methods: {
    async fetchMembers() {
      this.members = (await this.$api.get('/members'))?.data?.data || []
    },
    async fetchOrder() {
      this.id = this.$route.query.id || this.$route.query.content
      const o = (await this.$api.get(`/orders/${this.id}`))?.data?.data || {}
      this.form = {
        member_id: String(o.member_id || ''),
        order_date: o.order_date || '',
        total: String(o.total || '').replace('.00', ''),
        status: o.status || 'pending',
      }
      this.formLoaded = true
    },
    async updateOrder(data) {
      this.orderResponse = (await this.$api.put(`/orders/${this.id}`, data))?.data
      this.$swal.fire('Success', this.orderResponse?.message || 'Order updated', 'success')
      this.$router.push('/orders')
    },
  },
  mounted() {
    this.fetchMembers().then(() => this.fetchOrder())
  },
}
</script>

