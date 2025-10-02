<template>
  <div class="container mt-4">
    <h4>Tambah Member</h4>
    <form @submit.prevent="save" class="mt-3">
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
      <button class="btn btn-success">Simpan</button>
      <nuxt-link to="/members" class="btn btn-secondary ml-2">Batal</nuxt-link>
    </form>
  </div>
</template>

<script>
import memberService from '~/services/memberService'

export default {
  data() {
    return {
      form: { name:'', email:'', phone:'', address:'', status:'active' }
    }
  },
  methods: {
    async save() {
      await memberService.create(this.form)
      this.$router.push('/members')
    }
  }
}
</script>
