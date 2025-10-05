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
    await this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const res = await this.$api.get('/member-groups')
        const data = res.data.data.find(
          (item) => item.member_id == this.member_id && item.group_id == this.group_id
        )
        if (data) this.form = data
      } catch (error) {
        console.error('Gagal memuat data:', error)
      }
    },
    async updateMemberGroup(form) {
      try {
        await this.$api.put(`/member-groups/${this.member_id}/${this.group_id}`, form)
        alert('Data berhasil diperbarui!')
        this.$router.push('/member-groups')
      } catch (error) {
        alert('Gagal memperbarui data!')
        console.error(error)
      }
    },
  },
}
</script>
