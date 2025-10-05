<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label>Member ID</label>
      <input type="number" v-model="form.member_id" class="form-control" required />
    </div>

    <div class="mb-3">
      <label>Group ID</label>
      <input type="number" v-model="form.group_id" class="form-control" required />
    </div>

    <div class="mb-3">
      <label>Role</label>
      <input type="text" v-model="form.role" class="form-control" required />
    </div>

    <div class="text-end">
      <button type="submit" class="btn btn-primary">{{ isEdit ? 'Update' : 'Simpan' }}</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    isEdit: { type: Boolean, default: false },
    formData: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      form: {
        member_id: this.formData.member_id || '',
        group_id: this.formData.group_id || '',
        role: this.formData.role || '',
      },
    }
  },
  watch: {
    formData: {
      handler(newVal) {
        this.form = { ...newVal }
      },
      deep: true,
    },
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.form)
    },
  },
}
</script>
