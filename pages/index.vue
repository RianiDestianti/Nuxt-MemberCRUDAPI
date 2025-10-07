<template>
  <div class="container">
    <div class="welcome-card">
      <div class="icon-wrapper">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      </div>
      <h2 class="title">Selamat Datang!</h2>
      <p class="description">Klik tombol di bawah untuk mengelola member.</p>
      <nuxt-link to="/members" class="btn-primary">
        Kelola Member
        <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

