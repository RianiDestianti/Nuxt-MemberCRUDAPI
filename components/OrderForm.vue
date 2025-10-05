<template>
  <div class="card">
    <div class="card-body">
      <div class="mb-3">
        <label>Member</label>
        <select v-model="localForm.member_id" class="form-control rounded-pill">
          <option value="">Select Member</option>
          <option v-for="m in members" :key="m.id" :value="m.id">{{ m.name }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label>Order Date</label>
        <input type="date" v-model="localForm.order_date" class="form-control rounded-pill" />
      </div>

      <div class="mb-3">
        <label>Total</label>
        <input type="number" v-model="localForm.total" class="form-control rounded-pill" />
      </div>

      <div class="mb-3">
        <label>Status</label>
        <select v-model="localForm.status" class="form-control rounded-pill">
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div class="text-end">
        <button @click="handleSubmit" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    form: Object,
    members: Array,
  },
  data() {
    return {
      localForm: {
        member_id: "",
        order_date: "",
        total: "",
        status: "pending"
      },
    };
  },
  // TAMBAHKAN WATCH untuk update localForm ketika props form berubah
  watch: {
    form: {
      handler(newVal) {
        if (newVal) {
          // Deep copy untuk menghindari mutasi props
          this.localForm = {
            member_id: newVal.member_id || "",
            order_date: newVal.order_date || "",
            total: newVal.total || "",
            status: newVal.status || "pending"
          };
        }
      },
      deep: true,
      immediate: true  // Jalankan segera saat component dibuat
    }
  },
  methods: {
    handleSubmit() {
      // Validasi
      if (!this.localForm.member_id || !this.localForm.order_date || !this.localForm.total) {
        this.$swal.fire("Warning", "Please fill all fields", "warning");
        return;
      }

      // Pastikan member_id adalah number
      const submitData = {
        ...this.localForm,
        member_id: parseInt(this.localForm.member_id),
        total: parseFloat(this.localForm.total)
      };

      this.$emit("submit", submitData);
    },
  },
};
</script>