<template>
  <div class="container mt-5 text-center">
    <h2>Selamat Datang!</h2>
    <p class="mt-3">Klik tombol di bawah untuk mengelola member.</p>
    <nuxt-link to="/members" class="btn btn-primary btn-lg mt-3">
      Kelola Member
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style>
.container {
  max-width: 500px;
}
</style>
