<template>
  <div class="container-fluid">
    <div class="page-title d-flex justify-content-between align-items-center mb-3">
      <h2>Kelola Member di {{ group.name }}</h2>
      <nuxt-link to="/groups-list" class="btn btn-secondary">Back</nuxt-link>
    </div>

    <table v-if="group.members.length" class="table table-bordered">
      <thead>
        <tr>
          <th>No</th>
          <th>Member</th>
          <th>Role</th>
          <th>Joined At</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(m, i) in group.members" :key="m.id">
          <td>{{ i + 1 }}</td>
          <td>{{ m.name }}</td>
          <td>{{ m.pivot.role }}</td>
          <td>{{ m.pivot.joined_at }}</td>
          <td>
            <button @click="editMember(m)" class="btn btn-warning btn-sm me-2">Edit</button>
            <button @click="deleteMember(m)" class="btn btn-danger btn-sm">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="alert alert-info">Belum ada member di group ini.</div>

    <div v-if="editingMember" class="modal show d-block">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5>Edit Role Member</h5>
            <button @click="editingMember=null" class="btn-close"></button>
          </div>
          <div class="modal-body">
            <input type="text" v-model="editingMember.pivot.role" class="form-control" />
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="editingMember=null">Batal</button>
            <button class="btn btn-primary" @click="updateMember()">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'app',
  data: () => ({group: { members: [] }, editingMember: null}),

  methods: {
    async fetchGroup() {
      this.group = (await this.$api.get(`/groups/${this.$route.params.id}`)).data.data
    },
    editMember(member) {
      this.editingMember = { ...member }
    },

    async updateMember() {
      await this.$api.put(`/member-groups/${this.editingMember.id}/${this.group.id}`, {role: this.editingMember.pivot.role})
      this.$swal.fire('Berhasil', 'Role member diperbarui', 'success')
      this.editingMember = null
      this.fetchGroup()
    },

    async deleteMember(member) {
      const confirm = await this.$swal.fire({
        title: 'Hapus Member?',
        text: `Hapus ${member.name} dari ${this.group.name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus!'
      })
        if (confirm.isConfirmed) {
        await this.$api.delete(`/member-groups/${member.id}/${this.group.id}`)
        this.$swal.fire('Dihapus', 'Member berhasil dihapus', 'success')
        this.fetchGroup()
      }
    }
  },
  mounted() {
    this.fetchGroup()
  }
}
</script>
