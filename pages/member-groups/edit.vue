<template>
  <div class="container-fluid">
    <h2>Edit Member Group</h2>
    <MemberGroupForm :isEdit="true" :formData="form" @submit="updateMemberGroup" />
  </div>
</template>

<script>
import MemberGroupForm from '~/components/MemberGroupForm.vue'

export default {
  components: { MemberGroupForm },
  data() {
    return {
      form: {},
      member_id: this.$route.query.member_id,
      group_id: this.$route.query.group_id,
    }
  },
  async mounted() {
    const res = await this.$api.get('/member-groups')
    this.form = res.data.data.find(
      item => item.member_id == this.member_id && item.group_id == this.group_id
    )
  },
  methods: {
    async updateMemberGroup(form) {
      await this.$api.put(`/member-groups/${this.member_id}/${this.group_id}`, form)
      alert('Data berhasil diperbarui!')
      this.$router.push('/member-groups')
    },
  },
}
</script>
