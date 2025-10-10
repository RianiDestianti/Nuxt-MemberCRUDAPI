<template>
  <div class="container-fluid">
    <h2>{{ isEdit ? 'Edit Order' : 'Create Order' }}</h2>

    <OrderForm
      v-if="loaded"
      :form="form"
      :members="members"
      @submit="handleSubmit"
    />

    <div v-else class="alert alert-info">
      {{ isEdit ? 'Memuat data order...' : 'Memuat data member...' }}
    </div>
  </div>
</template>

<script>
import OrderForm from '~/components/OrderForm.vue'

export default {
  layout: 'app',
  components: { OrderForm },

  data: () => ({
    form: {},
    members: [],
    loaded: false,
  }),

  computed: {
    isEdit() {
      return this.$route.params.action !== 'create'
    },
  },

  methods: {
    async fetchData() {
      this.members = (await this.$api.get('/members')).data.data
      if (this.isEdit) {
        this.form = (await this.$api.get(`/orders/${this.$route.params.action}`)).data.data
      }
      this.loaded = true
    },

    async handleSubmit(data) {
      if (this.isEdit) {
        this.$api.put(`/orders/${this.$route.params.action}`, data)
        this.$swal.fire('Berhasil', 'Order diperbarui', 'success')
      } else {
        this.$api.post('/orders', data)
        this.$swal.fire('Berhasil', 'Order ditambahkan', 'success')
      }
      this.$router.push('/orders')
    },
  },

  mounted() {
    this.fetchData()
  },
}
</script>
