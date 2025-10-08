<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">MyApp</nuxt-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/dashboard">Dashboard</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/profile">Profile</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/about">About</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Content -->
    <main class="py-4">
      <nuxt />
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white py-3 mt-auto">
      <div class="container text-center">
        &copy; {{ new Date().getFullYear() }} MyApp. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "AppLayout",
};
</script>
