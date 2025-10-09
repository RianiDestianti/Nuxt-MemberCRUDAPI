<template>
  <div class="container-fluid">
    <div class="page-title d-flex justify-content-between align-items-center mb-3">
      <h2>Edit Member Group</h2>
      <nuxt-link to="/member-groups" class="btn btn-secondary">Back</nuxt-link>
    </div>

    <MemberGroupForm
      v-if="formLoaded && members.length && groups.length"
      :formData="form"
      :members="members"
      :groups="groups"
      :isEdit="true"
      @submit="updateMemberGroup"
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
    return {
      members: [],
      groups: [],
      form: {},
      formLoaded: false,
      member_id: null,
      group_id: null,
    }
  },
  methods: {
    async fetchData() {
      this.members = (await this.$api.get('/members'))?.data?.data || []
      this.groups  = (await this.$api.get('/groups'))?.data?.data || []
    },
    async fetchForm() {
      this.member_id = this.$route.query.member_id
      this.group_id  = this.$route.query.group_id
      const api = (await this.$api.get('/member-groups'))?.data?.data || []
      this.form = api.find(item => item.member_id == this.member_id && item.group_id == this.group_id) || {}
      this.formLoaded = true
    },
    async updateMemberGroup(form) {
      this.response = (await this.$api.put(`/member-groups/${this.member_id}/${this.group_id}`,form))?.data
      this.$swal.fire('Success', this.response?.message || 'Data berhasil diperbarui!', 'success')
      this.$router.push('/member-groups')
    },
  },
  mounted() {
    this.fetchData().then(() => this.fetchForm())
  },
}
</script>
