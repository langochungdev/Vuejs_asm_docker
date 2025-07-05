<template>
    <div class="container mt-5" style="max-width: 500px">
        <h3 class="mb-4 text-center">Đăng Nhập</h3>

        <div class="mb-3">
            <label for="id" class="form-label">Mã Người Dùng</label>
            <input type="text" id="id" v-model="id" class="form-control">
        </div>

        <div class="mb-3">
            <label for="matKhau" class="form-label">Mật Khẩu</label>
            <input type="password" id="matKhau" v-model="matKhau" class="form-control">
        </div>

        <button class="btn btn-primary w-100" @click="dangNhapNguoiDung">Đăng Nhập</button>

        <p class="text-danger text-center mt-3">{{ state.thongBao }}</p>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const { dangNhap, state } = useAuthStore()
const router = useRouter()

const id = ref('')
const matKhau = ref('')

const dangNhapNguoiDung = () => {
    if (!id.value || !matKhau.value) {
        state.thongBao = 'Vui lòng nhập đầy đủ thông tin'
        return
    }

    dangNhap(id.value, matKhau.value)
}

watch(
    () => state.nguoiDung,
    (nguoiDungMoi) => {
        if (nguoiDungMoi) {
            window.location.href = '/'
        }
    }
)
</script>

