<template>
    <div class="container mt-4">
        <div class="row mb-4">
            <div class="col-md-6">
                <div class="mb-3">
                    <label class="form-label">Mã Bài Viết</label>
                    <input type="text" class="form-control" v-model="form.maBaiViet">
                </div>
                <div class="mb-3">
                    <label class="form-label">Tiêu Đề</label>
                    <input type="text" class="form-control" v-model="form.tieuDe">
                </div>
                <div class="mb-3">
                    <label class="form-label">Hình Ảnh</label>
                    <input type="file" @change="handleImage" class="form-control">
                </div>
            </div>

            <div class="col-md-6 d-flex justify-content-center align-items-center">
                <img :src="imageUrl || defaultImg" class="img-fluid rounded border"
                    style="max-height: 200px; object-fit: cover">
            </div>
        </div>

        <div class="mb-3">
            <label class="form-label">Nội Dung</label>
            <textarea class="form-control" rows="4" v-model="form.noiDung"></textarea>
        </div>

        <div class="mb-4">
            <button class="btn btn-primary me-2" @click="themMoi">Thêm</button>
            <button class="btn btn-danger me-2" @click="xoaBaiViet">Xóa</button>
            <button class="btn btn-warning me-2" @click="capNhat">Sửa</button>
            <button class="btn btn-secondary" @click="lamMoi">Làm Mới</button>
        </div>

        <table class="table table-bordered">
            <thead class="table-light">
                <tr>
                    <th>Mã Bài Viết</th>
                    <th>Tiêu Đề</th>
                    <th>Nội Dung</th>
                    <th>Hình Ảnh</th>
                    <th>Ngày Tạo</th>
                    <th>Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="bv in danhSach" :key="bv.maBaiViet">
                    <td>{{ bv.maBaiViet }}</td>
                    <td>{{ bv.tieuDe }}</td>
                    <td>{{ bv.noiDung }}</td>
                    <td>
                        <img :src="bv.hinhAnh ? 'http://localhost:8080/' + bv.hinhAnh : defaultImg"
                            style="height: 60px">
                    </td>
                    <td>{{ dinhDangNgay(bv.ngayTao) }}</td>
                    <td>
                        <button class="btn btn-sm btn-info" @click="chonBaiViet(bv)">Chỉnh sửa</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <p class="text-success text-center">{{ thongBao }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePostStore } from '@/stores/postStore'

const { danhSach, thongBao, taiBaiViet, them, sua, xoa } = usePostStore()

const form = ref({
    maBaiViet: '',
    tieuDe: '',
    noiDung: '',
    hinhAnh: '',
    ngayTao: '',
    nguoiDung: null
})

const selectedFile = ref(null)
const imageUrl = ref('')
const defaultImg = '/default.jpg'

const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
        selectedFile.value = file
        imageUrl.value = URL.createObjectURL(file)
    }
}

const themMoi = async () => {
    const nguoiDung = JSON.parse(localStorage.getItem('nguoiDung'))
    if (!nguoiDung) return
    form.value.ngayTao = new Date().toISOString()
    form.value.nguoiDung = { maNguoiDung: nguoiDung.maNguoiDung }
    await them({ ...form.value }, selectedFile.value)
    lamMoi()
}

const capNhat = async () => {
    if (!form.value.maBaiViet) return
    await sua({ ...form.value }, selectedFile.value)
    lamMoi()
}

const xoaBaiViet = async () => {
    const nguoiDung = JSON.parse(localStorage.getItem('nguoiDung'))
    if (!form.value.maBaiViet || !nguoiDung) return
    await xoa(form.value.maBaiViet, nguoiDung.maNguoiDung)
    lamMoi()
}

const chonBaiViet = (bv) => {
    form.value = { ...bv }
    imageUrl.value = bv.hinhAnh ? 'http://localhost:8080/' + bv.hinhAnh : ''
    selectedFile.value = null
}

const lamMoi = () => {
    form.value = {
        maBaiViet: '',
        tieuDe: '',
        noiDung: '',
        hinhAnh: '',
        ngayTao: '',
        nguoiDung: null
    }
    imageUrl.value = ''
    selectedFile.value = null
}

const dinhDangNgay = (iso) => {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('vi-VN')
}

onMounted(() => {
    taiBaiViet()
})
</script>
