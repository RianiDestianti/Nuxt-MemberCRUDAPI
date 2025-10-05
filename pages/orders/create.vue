<template>
  <div class="container-fluid">
    <div class="page-title">
      <div class="row">
        <div class="col-6"><h2>Create Order</h2></div>
        <div class="col-6 text-end">
          <nuxt-link to="/orders" class="btn btn-secondary">Back</nuxt-link>
        </div>
      </div>
    </div>

    <OrderForm :form="form" :members="members" @submit="submitOrder" />
  </div>
</template>

<script>
import OrderForm from "~/components/OrderForm.vue";

export default {
  layout: "app",
  components: { OrderForm },
  data() {
    return {
      form: { member_id: "", order_date: "", total: "", status: "pending" },
      members: [],
    };
  },
  methods: {
    async fetchMembers() {
      try {
        const res = await this.$api.$get("/members");
        this.members = res.data;
      } catch (err) {
        console.error("Fetch members error:", err);
      }
    },
    async submitOrder(data) {
      try {
        const resp = await this.$api.$post("/orders", data);
        if (resp.status) {
          this.$swal.fire("Success", "Order created successfully", "success");
          this.$router.push("/orders");
        }
      } catch (err) {
        this.$swal.fire("Error", "Failed to create order", "error");
      }
    },
  },
  mounted() {
    this.fetchMembers();
  },
};
</script>
