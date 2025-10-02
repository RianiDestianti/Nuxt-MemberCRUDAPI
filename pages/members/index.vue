<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between mb-3">
      <h4>Daftar Member</h4>
      <nuxt-link to="/members/create" class="btn btn-primary btn-sm">+ Tambah</nuxt-link>
    </div>

    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Alamat</th>
          <th>Status</th>
          <th style="width:150px;">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(m, i) in members" :key="m.id">
          <td>{{ i+1 }}</td>
          <td>{{ m.name }}</td>
          <td>{{ m.email }}</td>
          <td>{{ m.phone }}</td>
          <td>{{ m.address }}</td>
          <td>
            <span class="badge" :class="m.status === 'active' ? 'badge-success' : 'badge-secondary'">
              {{ m.status }}
            </span>
          </td>
          <td>
            <button class="btn btn-warning btn-sm mr-1" @click="edit(m)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="remove(m.id)">Hapus</button>
          </td>
        </tr>
        <tr v-if="members.length === 0">
          <td colspan="7" class="text-center">Belum ada data</td>
        </tr>
      </tbody>
    </table>
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
    query: { id: member.id, data: JSON.stringify(member) }
  })
}
,
    async remove(id) {
      if (confirm('Yakin ingin menghapus data ini?')) {
        await memberService.delete(id)
        this.members = this.members.filter(m => m.id !== id)
      }
    }
  }
}
</script>