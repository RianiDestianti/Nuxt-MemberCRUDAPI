<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="header-section">
        <div class="header-content">
          <div class="title-group">
            <div class="icon-badge">
              <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h4 class="page-title">Daftar Member</h4>
          </div>
          <nuxt-link to="/members/create" class="btn-add">
            <svg class="plus-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Tambah Member
          </nuxt-link>
        </div>
      </div>

      <div class="table-card">
        <div class="table-wrapper">
          <table class="custom-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Alamat</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(m, i) in members" :key="m.id">
                <td>{{ i + 1 }}</td>
                <td>
                  <div class="user-cell">
                    <div class="user-avatar">{{ m.name.charAt(0).toUpperCase() }}</div>
                    <span class="user-name">{{ m.name }}</span>
                  </div>
                </td>
                <td>{{ m.email }}</td>
                <td>{{ m.phone }}</td>
                <td>{{ m.address }}</td>
                <td>
                  <span class="badge" :class="m.status === 'active' ? 'badge-active' : 'badge-inactive'">
                    {{ m.status }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="btn-edit" @click="edit(m)" title="Edit">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button class="btn-delete" @click="remove(m.id)" title="Hapus">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="members.length === 0" class="empty-row">
                <td colspan="7">
                  <div class="empty-state">
                    <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <p>Belum ada data member</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import memberService from '~/services/memberService'

export default {
  data() {
    return { members: [] }
  },
  async mounted() {
    const res = await memberService.getAll()
    this.members = res.data.data
  },
  methods: {
    edit(member) {
      this.$router.push({
        path: '/members/edit',
        query: { id: member.id }
      })
    },
    async remove(id) {
      if (confirm('Yakin ingin menghapus data ini?')) {
        await memberService.delete(id)
        this.members = this.members.filter(m => m.id !== id)
      }
    }
  }
}
</script>

