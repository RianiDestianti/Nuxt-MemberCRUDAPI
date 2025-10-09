<template>
  <div class="card">
    <div class="card-body">
      <div class="mb-3">
        <label>Member</label>
        <select v-model="form.member_id" class="form-control rounded-pill">
          <option value="">Select Member</option>
          <option v-for="m in members" :key="m.id" :value="m.id">{{ m.name }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label>Order Date</label>
        <input type="date" v-model="form.order_date" class="form-control rounded-pill" />
      </div>

      <div class="mb-3">
        <label>Total</label>
        <input type="number" v-model="form.total" class="form-control rounded-pill" />
      </div>

      <div class="mb-3">
        <label>Status</label>
        <select v-model="form.status" class="form-control rounded-pill">
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div class="text-end">
        <button @click="submitForm" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'app',
  props: {
    form: { type: Object, required: true },
    members: { type: Array, default: () => [] },
  },
  methods: {
    submitForm() {
      this.form.member_id = parseInt(this.form.member_id)
      this.form.total = parseFloat(this.form.total)
      this.$emit('submit', this.form)
    },
  },
}
</script>