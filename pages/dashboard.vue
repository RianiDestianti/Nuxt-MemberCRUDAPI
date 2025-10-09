<template>
  <div>
    <h1 class="mb-4 fw-bold text-center" style="color: #6B3F69;">Dashboard</h1>
    <p class="text-center text-muted mb-5">Selamat datang di halaman dashboard!</p>

    <div class="row g-4">
      <div class="col-md-4" v-for="card in 3" :key="card">
        <div class="card shadow-sm border-0">
          <div class="card-body text-center">
            <h5 class="card-title fw-bold" style="color: #6B3F69;">Card {{ card }}</h5>
            <p class="card-text text-muted">Ini adalah deskripsi card {{ card }}.</p>
            <button class="btn text-white mt-2" style="background-color: #A376A2;">Lihat Detail</button>
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
