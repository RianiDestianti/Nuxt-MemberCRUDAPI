<template>
  <div class="container mt-4">
    <h1 class="mb-4">Dashboard</h1>
    <p>Selamat datang di halaman dashboard!</p>

    <div class="row">
      <div class="col-md-4" v-for="card in 3" :key="card">
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Card {{ card }}</h5>
            <p class="card-text">Ini adalah deskripsi card {{ card }}.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "app",
};
</script>
