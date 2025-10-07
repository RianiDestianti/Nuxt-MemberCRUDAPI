<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label>Member</label>
      <select v-model="form.member_id" class="form-control" required>
        <option value="">Pilih Member</option>
        <option v-for="m in members" :key="m.id" :value="m.id">{{ m.name }}</option>
      </select>
    </div>

    <div class="mb-3">
      <label>Group</label>
      <select v-model="form.group_id" class="form-control" required>
        <option value="">Pilih Group</option>
        <option v-for="g in groups" :key="g.id" :value="g.id">{{ g.name }}</option>
      </select>
    </div>

    <div class="mb-3">
      <label>Role</label>
      <input type="text" v-model="form.role" class="form-control" required />
    </div>

    <div class="text-end">
      <button type="submit" class="btn btn-primary">
        {{ isEdit ? 'Update' : 'Simpan' }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    isEdit: { type: Boolean, default: false },
    formData: { type: Object, default: () => ({}) },
    members: { type: Array, default: () => [] },
    groups: { type: Array, default: () => [] },
  },
  data() {
    return {
      form: { member_id: '', group_id: '', role: '' },
    }
  },
  watch: {
    formData: {
      handler(val) {
        this.form.member_id = val.member_id || ''
        this.form.group_id = val.group_id || ''
        this.form.role = val.role || ''
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleSubmit() {
      this.form.member_id = parseInt(this.form.member_id)
      this.$emit('submit', this.form)
    },
  },
}
</script>
