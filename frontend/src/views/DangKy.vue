<template>
    <div class="container mt-4 d-flex justify-content-center">
        <div class="card p-4" style="max-width: 600px; width: 100%">
            <h3 class="mb-4 text-center">Đăng Ký Người Dùng</h3>

            <div class="row mb-3">
                <div class="col-12">
                    <label class="form-label">Mã Người Dùng</label>
                    <input type="text" v-model="form.maNguoiDung" class="form-control">
                </div>
                <div class="col-12">
                    <label class="form-label">Tên</label>
                    <input type="text" v-model="form.ten" class="form-control">
                </div>
                <div class="col-12">
                    <label class="form-label">Email</label>
                    <input type="email" v-model="form.email" class="form-control">
                </div>
                <div class="col-12">
                    <label class="form-label">Mật Khẩu</label>
                    <input type="password" v-model="form.matKhau" class="form-control">
                </div>
                <div class="col-12">
                    <label class="form-label">Xác Nhận Mật Khẩu</label>
                    <input type="password" v-model="xacNhanMatKhau" class="form-control">
                </div>
                <div class="col-12">
                    <div class="d-flex align-items-center gap-4">
                        <label class="form-label m-0" style="min-width: 80px">Giới Tính</label>
                        <div class="form-check mb-0">
                            <input class="form-check-input" type="radio" v-model="form.gioiTinh" :value="true" id="nam">
                            <label class="form-check-label" for="nam">Nam</label>
                        </div>
                        <div class="form-check mb-0">
                            <input class="form-check-input" type="radio" v-model="form.gioiTinh" :value="false" id="nu">
                            <label class="form-check-label" for="nu">Nữ</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center">
                <button class="btn btn-success" @click="dangKyNguoiDung">Đăng Ký</button>
                <p class="text-danger mt-3">{{ state.thongBao }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '../stores/authStore'

const { dangKy, state } = useAuthStore()

const form = reactive({
    maNguoiDung: '',
    ten: '',
    email: '',
    matKhau: '',
    gioiTinh: true
})

const xacNhanMatKhau = ref('')

const dangKyNguoiDung = () => {
    if (form.matKhau !== xacNhanMatKhau.value) {
        state.thongBao = 'Mật khẩu không khớp'
        return
    }
    dangKy(form)
}
</script>
