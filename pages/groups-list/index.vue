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
              <tr v-for="(m, i) in group.members || []" :key="m.id">
                <td>{{ i + 1 }}</td>
                <td>{{ m.name }}</td>
                <td>{{ m.pivot.role }}</td>
                <td>{{ m.pivot.joined_at }}</td>
                <td>
                  <button @click="editMember(group.id, m)" class="btn btn-warning btn-sm me-2">Edit</button>
                  <button @click="deleteMember(group.id, m.id)" class="btn btn-danger btn-sm">Hapus</button>
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

    <div v-else class="alert alert-info">Tidak ada data group.</div>
  </div>
</template>

<script>
export default {
  layout: 'app',
  data: () => ({ groups: [] }),
  methods: {
    async fetchGroups() {
      this.groups = (await this.$api.get('/groups-list')).data.data
      this.groups.forEach(g => g.members = g.members || [])
    },
    async editMember(groupId, member) {
      const newRole = prompt(`Ubah role untuk ${member.name}`, member.pivot.role)
      if (newRole && newRole !== member.pivot.role) {
        await this.$api.put(`/member-groups/${member.id}/${groupId}`, { role: newRole })
        this.$swal.fire('Berhasil', 'Role member diperbarui', 'success')
        this.fetchGroups()
      }
    },
    async deleteMember(groupId, memberId) {
      const confirm = await this.$swal.fire({
        title: 'Hapus Member?',
        text: 'Apakah yakin ingin menghapus member ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus!'
      })
      if (confirm.isConfirmed) {
        await this.$api.delete(`/member-groups/${memberId}/${groupId}`)
        this.$swal.fire('Dihapus', 'Member berhasil dihapus', 'success')
        this.fetchGroups()
      }
    }
  },
  mounted() {
    this.fetchGroups()
  }
}
</script>
