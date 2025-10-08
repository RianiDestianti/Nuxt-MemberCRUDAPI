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
  data: () => ({
    groups: [],
    members: [],
    form: { group_id: '', member_id: '', role: 'member' }
  }),
  
  methods: {
    async fetchData() {
      this.groups = (await this.$api.get('/groups')).data.data
      this.members = (await this.$api.get('/members')).data.data
    },
    async submitForm() {
      await this.$api.post('/member-groups', this.form)
      this.$swal.fire('Success', 'Member berhasil ditambahkan ke group', 'success')
      this.$router.push('/groups-list')
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
