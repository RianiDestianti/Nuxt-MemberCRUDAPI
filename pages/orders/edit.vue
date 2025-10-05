<template>
  <div class="container-fluid">
    <div class="page-title">
      <div class="row">
        <div class="col-6"><h2>Edit Order</h2></div>
        <div class="col-6 text-end">
          <nuxt-link to="/orders" class="btn btn-secondary">Back</nuxt-link>
        </div>
      </div>
    </div>

    <order-form :form="form" :members="members" @submit="updateOrder" />
  </div>
</template>

<script>
import OrderForm from "~/components/order-form.vue";

export default {
  layout: "app",
  components: { OrderForm },
  data() {
    return {
      form: { member_id: "", order_date: "", total: "", status: "" },
      members: [],
      id: null,
    };
  },
  methods: {
    async fetchMembers() {
      const res = await this.$api.$get("/members");
      this.members = res.data;
    },
    async fetchOrder() {
      const contentId = this.$route.query.content;
      this.id = contentId;
      const res = await this.$api.$get(`/orders/${contentId}`);
      this.form = { ...res.data };
    },
    async updateOrder(data) {
      const resp = await this.$api.$put(`/orders/${this.id}`, data);
      if (resp.status) {
        this.$swal.fire("Success", "Order updated successfully", "success");
        this.$router.push("/orders");
      }
    },
  },
  mounted() {
    this.fetchMembers();
    this.fetchOrder();
  },
};
</script>
