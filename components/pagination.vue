<template>
  <nav>
    <ul class="pagination justify-content-end">
      <li class="page-item" :class="{ disabled: page===1 }">
        <a href="#" class="page-link" @click.prevent="handleAction(page-1)">Previous</a>
      </li>
      <li class="page-item" v-for="p in totalPages" :key="p" :class="{ active: page===p }">
        <a href="#" class="page-link" @click.prevent="handleAction(p)">{{ p }}</a>
      </li>
      <li class="page-item" :class="{ disabled: page===totalPages }">
        <a href="#" class="page-link" @click.prevent="handleAction(page+1)">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['page','total','handleAction','limit'],
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.limit);
    }
  }
}
</script>
