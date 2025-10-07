<template>
  <div class="container d-flex justify-content-center mt-5">
    <div class="welcome-card text-center p-4 shadow rounded">
      <div class="icon-wrapper mb-3">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      </div>
      <h2 class="title mb-2">Selamat Datang!</h2>
      <p class="description mb-4">Klik tombol di bawah untuk mengelola data.</p>

      <div class="d-flex flex-column gap-2">
        <nuxt-link to="/members" class="btn btn-primary d-flex justify-content-between align-items-center">
          Kelola Member
          <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </nuxt-link>

        <nuxt-link to="/orders" class="btn btn-primary d-flex justify-content-between align-items-center">
          Kelola Orders
          <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </nuxt-link>

        <nuxt-link to="/member-groups" class="btn btn-primary d-flex justify-content-between align-items-center">
          Kelola Member Groups
          <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
}
</script>
