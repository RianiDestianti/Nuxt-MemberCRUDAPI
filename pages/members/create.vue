<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="form-card">
        <div class="form-header">
          <div class="title-group">
            <div class="icon-badge">
              <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            </div>
            <h4 class="page-title">Tambah Member</h4>
          </div>
        </div>

        <form @submit.prevent="save" class="form-content">
          <div class="form-group">
            <label class="form-label">Nama</label>
            <input v-model="form.name" class="form-input" required placeholder="Masukkan nama lengkap" />
          </div>

          <div class="form-group">
            <label class="form-label">Email</label>
            <input v-model="form.email" type="email" class="form-input" required placeholder="contoh@email.com" />
          </div>

          <div class="form-group">
            <label class="form-label">Phone</label>
            <input v-model="form.phone" class="form-input" placeholder="08xxxxxxxxxx" />
          </div>

          <div class="form-group">
            <label class="form-label">Alamat</label>
            <input v-model="form.address" class="form-input" placeholder="Masukkan alamat lengkap" />
          </div>

          <div class="form-group">
            <label class="form-label">Status</label>
            <select v-model="form.status" class="form-select">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div class="button-group">
            <button type="submit" class="btn-submit">Simpan Member</button>
            <nuxt-link to="/members" class="btn-cancel">Batal</nuxt-link>
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
      form: { name:'', email:'', phone:'', address:'', status:'active' } 
    }
  },
  methods: {
    async save() {
      await memberService.create(this.form)
      this.$router.push('/members')
    }
  }
}
</script>

