<template>
  <div class="container-fluid">
    <div class="page-title d-flex justify-content-between align-items-center mb-3">
      <h2>Data Member Groups</h2>
      <nuxt-link to="/member-groups/create" class="btn btn-primary">Tambah Member Group</nuxt-link>
    </div>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Member</th>
          <th>Group</th>
          <th>Role</th>
          <th>Joined At</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in memberGroups" :key="item.member_id + '-' + item.group_id">
          <td>{{ item.member?.name }}</td>
          <td>{{ item.group?.name }}</td>
          <td>{{ item.role }}</td>
          <td>{{ item.joined_at }}</td>
          <td>
            <nuxt-link
              :to="`/member-groups/edit?member_id=${item.member_id}&group_id=${item.group_id}`"
              class="btn btn-sm btn-warning me-2"
            >Edit</nuxt-link>
            <button class="btn btn-sm btn-danger" @click="deleteMemberGroup(item.member_id, item.group_id)">
              Hapus
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      memberGroups: [],
    }
  },
  async mounted() {
    await this.fetchMemberGroups()
  },
  methods: {
    async fetchMemberGroups() {
      try {
        const res = await this.$api.get('/member-groups')
        this.memberGroups = res.data.data
      } catch (error) {
        console.error('Gagal memuat data:', error)
      }
    },
    async deleteMemberGroup(member_id, group_id) {
      if (confirm('Yakin ingin menghapus data ini?')) {
        try {
          await this.$api.delete(`/member-groups/${member_id}/${group_id}`)
          alert('Berhasil dihapus!')
          this.fetchMemberGroups()
        } catch (error) {
          alert('Gagal menghapus data!')
          console.error(error)
        }
      }
    },
  },
}
</script>
