<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="form-card">
        <div class="form-header">
          <div class="title-group">
            <div class="icon-badge">
              <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </div>
            <h4 class="page-title">Edit Member</h4>
          </div>
        </div>

        <form @submit.prevent="update" class="form-content">
          <div class="form-group">
            <label class="form-label">
              <svg class="label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Nama
            </label>
            <input v-model="form.name" class="form-input" required placeholder="Masukkan nama lengkap">
          </div>

          <div class="form-group">
            <label class="form-label">
              <svg class="label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Email
            </label>
            <input v-model="form.email" type="email" class="form-input" required placeholder="contoh@email.com">
          </div>

          <div class="form-group">
            <label class="form-label">
              <svg class="label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Phone
            </label>
            <input v-model="form.phone" class="form-input" placeholder="08xxxxxxxxxx">
          </div>

          <div class="form-group">
            <label class="form-label">
              <svg class="label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Alamat
            </label>
            <input v-model="form.address" class="form-input" placeholder="Masukkan alamat lengkap">
          </div>

          <div class="form-group">
            <label class="form-label">
              <svg class="label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 11 12 14 22 4"></polyline>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
              Status
            </label>
            <select v-model="form.status" class="form-select">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div class="button-group">
            <button type="submit" class="btn-submit">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Update Member
            </button>
            <nuxt-link to="/members" class="btn-cancel">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Kembali
            </nuxt-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import memberService from '~/services/memberService'

export default {
  layout: 'app',
  data() {
    return { 
      form: {
        name: '',
        email: '',
        phone: '',
        address: '',
        status: 'active'
      }
    }
  },
  mounted() {
    if (this.$route.query.data) {
      this.form = JSON.parse(this.$route.query.data)
    }
  },
  methods: {
    async update() {
      const id = this.$route.query.id   
      await memberService.update(id, this.form)
      this.$router.push('/members')
    }
  }
}
</script>

