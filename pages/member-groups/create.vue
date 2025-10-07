<template>
  <div class="container-fluid">
    <div class="page-title d-flex justify-content-between align-items-center mb-3">
      <h2>Tambah Member Group</h2>
      <nuxt-link to="/member-groups" class="btn btn-secondary">Back</nuxt-link>
    </div>

    <MemberGroupForm
      v-if="members.length && groups.length"
      :members="members"
      :groups="groups"
      @submit="createMemberGroup"
    />
    <div v-else class="alert alert-info">Loading data...</div>
  </div>
</template>

<script>
import MemberGroupForm from '~/components/MemberGroupForm.vue'

export default {
  layout: 'app',
  components: { MemberGroupForm },
  data() {
    return { members: [], groups: [] }
  },
  methods: {
    async fetchData() {
      const members = (await this.$api.get('/members'))?.data?.data || []
      const groups = (await this.$api.get('/groups'))?.data?.data || []
      this.members = members
      this.groups = groups
    },
    async createMemberGroup(form) {
      const res = (await this.$api.post('/member-groups', form))?.data
      this.$swal.fire('Success', res?.message || 'Data berhasil disimpan!', 'success')
      this.$router.push('/member-groups')
    },
  },
  mounted() {
    this.fetchData()
  },
}
</script>
