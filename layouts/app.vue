<template>
  <div class="d-flex flex-column min-vh-100 bg-light">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg" style="background-color: #6B3F69;">
      <div class="container">
        <nuxt-link class="navbar-brand fw-bold text-white" to="/">
          Nexa Cloud Suite
        </nuxt-link>

        <button
          class="navbar-toggler text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <nuxt-link class="nav-link text-white" to="/dashboard">Dashboard</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link text-white" to="/profile">Profile</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link text-white" to="/about">About</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Content -->
    <main class="flex-grow-1 py-4">
      <div class="container">
        <nuxt />
      </div>
    </main>

    <!-- Footer -->
    <footer class="text-white py-3 mt-auto" style="background-color: #A376A2;">
      <div class="container text-center small">
        &copy; {{ new Date().getFullYear() }} Nexa Cloud Suite. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "AppLayout",
};
</script>
