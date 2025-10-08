<template>
  <div class="container-fluid">
    <div class="page-title d-flex justify-content-between align-items-center mb-3">
      <h2>Data Member Groups</h2>
      <nuxt-link to="/member-groups/create" class="btn btn-primary">Tambah Member Group</nuxt-link>
    </div>

    <div class="card" v-if="memberGroups.length">
      <div class="card-body table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Member</th>
              <th>Group</th>
              <th>Role</th>
              <th>Joined At</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in memberGroups" :key="`${item.member_id}-${item.group_id}`">
              <td>{{ index + 1 }}</td>
              <td>{{ item.member?.name }}</td>
              <td>{{ item.group?.name }}</td>
              <td>{{ item.role }}</td>
              <td>{{ item.joined_at }}</td>
              <td>
                <nuxt-link
                  :to="`/member-groups/edit?member_id=${item.member_id}&group_id=${item.group_id}`"
                  class="btn btn-warning btn-sm me-2"
                >Edit</nuxt-link>
                <button @click="deleteMemberGroup(item)" class="btn btn-danger btn-sm">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="alert alert-info">No member groups found.</div>
  </div>
</template>

<script>
export default {
  data() {
    return { memberGroups: [] }
  },
  methods: {
    async fetchData() {
      this.memberGroups = (await this.$api.get('/member-groups'))?.data?.data || []
    },
    
    async deleteMemberGroup(item) {
      const confirm = await this.$swal.fire({
        title: 'Delete Member Group?',
        text: `Delete ${item.member?.name} from ${item.group?.name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
      })

      if (!confirm.isConfirmed) return
      this.response = await this.$api.delete(`/member-groups/${item.member_id}/${item.group_id}`)
      await this.fetchData()
      this.$swal.fire('Deleted!', 'Data berhasil dihapus.', 'success')
    },
  },
  mounted() {
    this.fetchData()
  },
}
</script>
