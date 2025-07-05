<template>
    <div class="container mt-4" v-if="baiViet">
        <div class="card mb-4">
            <img :src="getHinhAnh(baiViet.hinhAnh)" class="card-img-top" alt="Ảnh bài viết"
                style="height: 250px; object-fit: cover">
            <div class="card-body">
                <h4 class="card-title">{{ baiViet.tieuDe }}</h4>
                <p class="card-text">{{ baiViet.noiDung }}</p>
                <div class="text-muted" style="font-size: 0.85rem">
                    Ngày đăng: {{ dinhDangNgay(baiViet.ngayTao) }}
                </div>
            </div>
        </div>

        <div>
            <h5>Bình luận</h5>

            <div v-if="nguoiDung" class="mb-3">
                <textarea class="form-control" rows="3" placeholder="Nhập bình luận..." v-model="noiDung"></textarea>
                <button class="btn btn-primary mt-2" @click="guiBinhLuan">Gửi bình luận</button>
            </div>
            <div v-else class="text-muted fst-italic mb-3">
                Vui lòng đăng nhập để bình luận
            </div>

            <ul class="list-group">
                <li v-for="bl in binhLuanList" :key="bl.maBinhLuan" class="list-group-item">
                    <strong>{{ bl.maNguoiDung || 'Ẩn danh' }}:</strong> {{ bl.noiDung }}
                </li>
            </ul>
        </div>
    </div>

    <div v-else class="text-center text-muted mt-5">
        Không tìm thấy bài viết
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePostStore } from '@/stores/postStore'
import { getTatCaBaiViet } from '@/services/postService'

const route = useRoute()
const baiViet = ref(null)
const noiDung = ref('')
const nguoiDung = ref(null)

const { taiBinhLuan, gui, binhLuanList } = usePostStore()

onMounted(async () => {
    const id = route.params.id
    const list = await getTatCaBaiViet()
    baiViet.value = list.find(b => b.maBaiViet === id)
    nguoiDung.value = JSON.parse(localStorage.getItem('nguoiDung'))
    await taiBinhLuan(id)
})

const guiBinhLuan = async () => {
    if (!noiDung.value.trim() || !nguoiDung.value) return
    await gui(noiDung.value, baiViet.value.maBaiViet, nguoiDung.value.maNguoiDung)
    noiDung.value = ''
}
const getHinhAnh = (url) => {
    if (!url || url === 'null' || url === null || url === '') return 'http://localhost:8080/uploaded/avt.png'
    if (url.startsWith('http')) return url
    if (!url.startsWith('/')) url = '/uploaded/' + url
    return 'http://localhost:8080' + url
}
const dinhDangNgay = (ngay) => {
    const date = new Date(ngay)
    return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN')
}
</script>
