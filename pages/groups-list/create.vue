<template>
  <div class="container-fluid">
    <div class="page-title d-flex justify-content-between align-items-center mb-3">
      <h2>Tambah Member ke Group</h2>
      <nuxt-link to="/groups-list" class="btn btn-secondary">Back</nuxt-link>
    </div>

    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label>Group</label>
        <select v-model="form.group_id" class="form-control" required>
          <option value="">Pilih Group</option>
          <option v-for="g in groups" :key="g.id" :value="g.id">{{ g.name }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label>Member</label>
        <select v-model="form.member_id" class="form-control" required>
          <option value="">Pilih Member</option>
          <option v-for="m in members" :key="m.id" :value="m.id">{{ m.name }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label>Role</label>
        <input type="text" v-model="form.role" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-primary">Simpan</button>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'app',
  data() {
    return {
      groups: [],
      members: [],
      form: { group_id: '', member_id: '', role: 'member' }
    }
  },
  methods: {
    async fetchData() {
      const groupRes = await this.$api.get('/groups')
      const memberRes = await this.$api.get('/members')
      this.groups = groupRes.data.data
      this.members = memberRes.data.data
    },
    async submitForm() {
      const response = await this.$api.post('/member-groups', this.form)
      this.$swal.fire('Success', response.data.message, 'success')
      this.$router.push('/groups-list')
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
