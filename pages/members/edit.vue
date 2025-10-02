<template>
  <div class="container mt-4">
    <h4>Edit Member</h4>
    <form @submit.prevent="update" class="mt-3">
      <div class="form-group">
        <label>Nama</label>
        <input v-model="form.name" class="form-control" required>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input v-model="form.email" type="email" class="form-control" required>
      </div>
      <div class="form-group">
        <label>Phone</label>
        <input v-model="form.phone" class="form-control">
      </div>
      <div class="form-group">
        <label>Alamat</label>
        <input v-model="form.address" class="form-control">
      </div>
      <div class="form-group">
        <label>Status</label>
        <select v-model="form.status" class="form-control">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <button class="btn btn-warning">Update</button>
      <nuxt-link to="/members" class="btn btn-secondary ml-2">Kembali</nuxt-link>
    </form>
  </div>
</template>

<script>
import memberService from '~/services/memberService'

export default {
  data() {
    return { 
      form: {
        name: '',
        email: '',
        phone: '',
        address: '',
        status: 'active'
      }
    }
  },
  mounted() {
    if (this.$route.query.data) {
      this.form = JSON.parse(this.$route.query.data)
    }
  },
  methods: {
    async update() {
      const id = this.$route.query.id   
      await memberService.update(id, this.form)
      this.$router.push('/members')
    }
  }
}
</script>
