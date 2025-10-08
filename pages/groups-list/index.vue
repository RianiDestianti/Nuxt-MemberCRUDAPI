<template>
  <div class="container-fluid">
    <div class="page-title d-flex justify-content-between align-items-center mb-3">
      <h2>Groups & Members</h2>
      <nuxt-link to="/groups-list/create" class="btn btn-primary">Tambah Member ke Group</nuxt-link>
    </div>

    <div v-if="groups.length">
      <div v-for="group in groups" :key="group.id" class="card mb-3">
        <div class="card-header">
          <h5>{{ group.name }}</h5>
        </div>
        <div class="card-body">
          <table class="table table-bordered">
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
              <tr v-for="(m, index) in group.members || []" :key="m.id">
                <td>{{ index + 1 }}</td>
                <td>{{ m.name }}</td>
                <td>{{ m.pivot.role }}</td>
                <td>{{ m.pivot.joined_at }}</td>
                <td>
                  <button @click="editMember(group.id, m)" class="btn btn-warning btn-sm me-2">Edit</button>
                  <button @click="deleteMember(group.id, m.id)" class="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
              <tr v-if="!(group.members || []).length">
                <td colspan="5" class="text-center">Belum ada member</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-info">No groups found.</div>
  </div>
</template>

<script>
export default {
  layout: 'app',
  data() {
    return {
      groups: []
    }
  },
  methods: {
    async fetchGroups() {
      const response = await this.$api.get('/groups-list')
      this.groups = response.data.data
      this.groups.forEach(g => g.members = g.members || [])
    },
    editMember(groupId, member) {
      const newRole = prompt(`Edit role member ${member.name}`, member.pivot.role)
      newRole !== null && newRole !== member.pivot.role &&
      this.$api.put(`/member-groups/${member.id}/${groupId}`, { role: newRole })
        .then(() => {
          this.fetchGroups()
          this.$swal.fire('Updated', 'Role member berhasil diperbarui', 'success')
        })
        .catch(() => this.$swal.fire('Error', 'Gagal update role', 'error'))
    },
    deleteMember(groupId, memberId) {
      this.$swal.fire({
        title: 'Hapus Member?',
        text: 'Apakah Anda yakin ingin menghapus member ini dari group?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        result.isConfirmed &&
        this.$api.delete(`/member-groups/${memberId}/${groupId}`)
          .then(() => {
            this.fetchGroups()
            this.$swal.fire('Deleted', 'Member berhasil dihapus', 'success')
          })
          .catch(() => this.$swal.fire('Error', 'Gagal menghapus member', 'error'))
      })
    }
  },
  mounted() {
    this.fetchGroups()
  }
}
</script>
