import { createRouter, createWebHistory } from 'vue-router'
import HomeList from '../views/HomeList.vue'
import DangKy from '../views/DangKy.vue'
import DangNhap from '../views/DangNhap.vue'
import HoSo from '../views/HoSo.vue'
import ChinhSuaBai from '../views/ChinhSuaBai.vue'
import ChiTietBaiViet from '../views/ChiTietBaiViet.vue'

const routes = [
    { path: '/', component: HomeList },
    { path: '/dangky', component: DangKy },
    { path: '/dangnhap', component: DangNhap },
    { path: '/hoso', component: HoSo },
    { path: '/dangbai', component: ChinhSuaBai },
    { path: '/baiviet/:id', component: ChiTietBaiViet } // ✅ thêm dòng này
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
