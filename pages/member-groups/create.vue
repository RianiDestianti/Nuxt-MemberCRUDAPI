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
  components: { MemberGroupForm },
  data() {
    return { members: [], groups: [] }
  },
  methods: {
    async fetchData() {
      this.members = (await this.$api.get('/members'))?.data?.data || []
      this.groups  = (await this.$api.get('/groups'))?.data?.data || []
    },
    async createMemberGroup(form) {
      this.response = (await this.$api.post('/member-groups', form))?.data
      this.$swal.fire('Success', this.response?.message || 'Data berhasil disimpan!', 'Success')
      this.$router.push('/member-groups')
    },
  },
  mounted() {
    this.fetchData()
  },
}
</script>
