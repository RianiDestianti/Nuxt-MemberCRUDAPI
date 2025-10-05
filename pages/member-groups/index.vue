<template>
  <div class="container mt-4">
    <h2>📋 Member Groups</h2>

    <form @submit.prevent="addMemberGroup" class="row g-3 mb-4 border rounded p-3">
      <div class="col-md-3">
        <label>Member ID</label>
        <input v-model="newGroup.member_id" type="number" class="form-control" required>
      </div>
      <div class="col-md-3">
        <label>Group ID</label>
        <input v-model="newGroup.group_id" type="number" class="form-control" required>
      </div>
      <div class="col-md-3">
        <label>Role</label>
        <input v-model="newGroup.role" type="text" class="form-control" required>
      </div>
      <div class="col-md-3 d-flex align-items-end">
        <button class="btn btn-primary w-100">Add</button>
      </div>
    </form>

    <table class="table table-bordered align-middle">
      <thead class="table-light">
        <tr>
          <th>#</th>
          <th>Member</th>
          <th>Group</th>
          <th>Role</th>
          <th>Joined At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(mg, index) in memberGroups" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <strong>{{ mg.member.name }}</strong><br>
            <small>{{ mg.member.email }}</small>
          </td>
          <td>
            {{ mg.group.name }} <br>
            <small>{{ mg.group.description }}</small>
          </td>
          <td>
            <input v-if="editId === index" v-model="mg.role" class="form-control" />
            <span v-else>{{ mg.role }}</span>
          </td>
          <td>{{ formatDate(mg.joined_at) }}</td>
          <td>
            <button v-if="editId !== index" @click="editId = index" class="btn btn-warning btn-sm">Edit</button>
            <button v-if="editId === index" @click="updateMemberGroup(mg)" class="btn btn-success btn-sm me-1">Save</button>
            <button v-if="editId === index" @click="editId = null" class="btn btn-secondary btn-sm me-1">Cancel</button>
            <button @click="deleteMemberGroup(mg.member_id, mg.group_id)" class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      memberGroups: [],
      newGroup: { member_id: '', group_id: '', role: '' },
      editId: null
    }
  },
  async mounted() {
    await this.fetchMemberGroups()
  },
  methods: {
    async fetchMemberGroups() {
      try {
        const res = await this.$api.get('/member-groups')
        if (res.data.status) {
          this.memberGroups = res.data.data
        }
      } catch (error) {
        console.error('Fetch error:', error)
      }
    },
    async addMemberGroup() {
      try {
        const res = await this.$api.post('/member-groups', this.newGroup)
        if (res.data.status) {
          this.memberGroups.push(res.data.data)
          this.newGroup = { member_id: '', group_id: '', role: '' }
        }
      } catch (error) {
        console.error('Add error:', error)
      }
    },
    async updateMemberGroup(item) {
      try {
        const res = await this.$api.put(`/member-groups/${item.member_id}/${item.group_id}`, {
          role: item.role
        })
        if (res.data.status) {
          this.editId = null
        }
      } catch (error) {
        console.error('Update error:', error)
      }
    },
    async deleteMemberGroup(memberId, groupId) {
      if (!confirm('Are you sure?')) return
      try {
        const res = await this.$api.delete(`/member-groups/${memberId}/${groupId}`)
        if (res.data.status) {
          this.memberGroups = this.memberGroups.filter(
            (m) => !(m.member_id === memberId && m.group_id === groupId)
          )
        }
      } catch (error) {
        console.error('Delete error:', error)
      }
    },
    formatDate(dt) {
      return new Date(dt).toLocaleString('id-ID')
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1100px;
}
.table {
  font-size: 14px;
}
</style>
