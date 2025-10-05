<template>
  <div class="container-fluid">
    <h2>Tambah Member Group</h2>
    <MemberGroupForm @submit="createMemberGroup" />
  </div>
</template>

<script>
import MemberGroupForm from '~/components/MemberGroupForm.vue'

export default {
  components: { MemberGroupForm },
  methods: {
    async createMemberGroup(form) {
      await this.$api.post('/member-groups', form)
      alert('Data berhasil disimpan!')
      this.$router.push('/member-groups')
    },
  },
}
</script>
