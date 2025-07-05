<template>
    <div class="container mt-4">
        <h3 class="mb-4">Danh Sách Bài Viết</h3>

        <div v-if="danhSachBaiViet.length === 0" class="text-center text-muted">
            Không tìm thấy bài viết nào
        </div>

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-4" v-else>
            <div v-for="bai in danhSachBaiViet" :key="bai.maBaiViet">
                <router-link :to="`/baiviet/${bai.maBaiViet}`" class="text-decoration-none text-dark">
                    <div class="card h-100">
                        <img :src="getHinhAnh(bai.hinhAnh)" class="card-img-top" alt="Hình ảnh bài viết"
                            style="height: 150px; object-fit: cover" />
                        <div class="card-body">
                            <h6 class="card-title">{{ bai.tieuDe }}</h6>
                            <p class="card-text" style="font-size: 0.85rem">
                                {{ tomTatNoiDung(bai.noiDung) }}
                            </p>
                        </div>
                        <div class="card-footer text-muted" style="font-size: 0.75rem">
                            {{ dinhDangNgay(bai.ngayTao) }}
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, computed } from 'vue'
import { usePostStore } from '@/stores/postStore'
import { useSearchStore } from '@/stores/searchStore'

const { danhSach, taiTatCaBaiViet } = usePostStore()
const searchStore = useSearchStore()

onMounted(() => {
    taiTatCaBaiViet()
})

onUnmounted(() => {
    searchStore.tuKhoa = ''
})

const danhSachBaiViet = computed(() => {
    if (!searchStore.tuKhoa) return danhSach.value
    const keyword = searchStore.tuKhoa.toLowerCase()
    return danhSach.value.filter(bv =>
        bv.tieuDe.toLowerCase().includes(keyword)
    )
})

const getHinhAnh = (url) => {
    if (!url || url === 'null') return 'http://localhost:8080/uploaded/avt.png'
    if (url.startsWith('http')) return url
    if (!url.startsWith('/')) url = '/uploaded/' + url
    return 'http://localhost:8080' + url
}

const tomTatNoiDung = (nd) => {
    return nd?.split(' ').slice(0, 20).join(' ') + '...'
}

const dinhDangNgay = (ngay) => {
    const date = new Date(ngay)
    return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN')
}
</script>
  
