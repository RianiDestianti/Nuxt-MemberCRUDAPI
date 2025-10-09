<template>
  <div>
    <h1 class="mb-4 fw-bold text-center" style="color: #6B3F69;">Profile</h1>
    <p class="text-center text-muted mb-5">Ini adalah halaman profil pengguna.</p>

    <div class="card shadow-sm border-0 mx-auto" style="max-width: 500px;">
      <div class="card-body text-center">
        <h5 class="card-title fw-bold" style="color: #6B3F69;">John Doe</h5>
        <p class="card-text text-muted mb-1">Email: john.doe@example.com</p>
        <p class="card-text text-muted mb-3">Role: Administrator</p>
        <button class="btn text-white" style="background-color: #A376A2;">Edit Profil</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "app",
};
</script>
