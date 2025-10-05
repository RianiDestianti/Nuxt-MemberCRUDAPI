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

    <order-form :form="form" :members="members" @submit="submitOrder" />
  </div>
</template>

<script>
import OrderForm from "~/components/order-form.vue";

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
      const res = await this.$api.$get("/members");
      this.members = res.data;
    },
    async submitOrder(data) {
      const resp = await this.$api.$post("/orders", data);
      if (resp.status) {
        this.$swal.fire("Success", "Order created successfully", "success");
        this.$router.push("/orders");
      }
    },
  },
  mounted() {
    this.fetchMembers();
  },
};
</script>
