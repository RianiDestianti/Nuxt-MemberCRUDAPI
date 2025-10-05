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

    <OrderForm v-if="formLoaded" :form="form" :members="members" @submit="updateOrder" />
    <div v-else class="alert alert-info">Loading order data...</div>
  </div>
</template>

<script>
import OrderForm from "~/components/OrderForm.vue";

export default {
  layout: "app",
  components: { OrderForm },
  data() {
    return {
      id: null,
      form: { 
        member_id: "", 
        order_date: "", 
        total: "", 
        status: "pending" 
      },
      members: [],
      formLoaded: false,
    };
  },
  methods: {
    async fetchMembers() {
      try {
        const res = await this.$api.get("/members");
        this.members = res.data?.data || [];
      } catch {
        this.$swal.fire("Error", "Failed to load members", "error");
      }
    },
    
    async fetchOrder() {
      this.id = this.$route.query.id || this.$route.query.content;
      if (!this.id) {
        this.$swal.fire("Error", "Order ID not found in URL", "error");
        this.$router.push("/orders");
        return;
      }

      try {
        const res = await this.$api.get(`/orders/${this.id}`);
        const order = res.data?.data;
        this.form = {
          member_id: String(order.member_id),
          order_date: order.order_date,
          total: String(order.total).replace(".00", ""),
          status: order.status,
        };
        this.formLoaded = true;
      } catch {
        this.$swal.fire("Error", "Failed to load order data", "error");
        this.$router.push("/orders");
      }
    },
    
    async updateOrder(data) {
      try {
        const res = await this.$api.put(`/orders/${this.id}`, data);
        if (res.data?.status) {
          await this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Order updated successfully",
            timer: 2000,
          });
          this.$router.push("/orders");
        } else {
          this.$swal.fire("Error", res.data?.message || "Update failed", "error");
        }
      } catch {
        this.$swal.fire("Error", "Failed to update order", "error");
      }
    },
  },
  mounted() {
    this.fetchMembers().then(() => this.fetchOrder());
  },
};
</script>
