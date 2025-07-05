import { reactive } from 'vue'
import { dangKyNguoiDung, dangNhapNguoiDung, capNhatNguoiDung, uploadAnh } from '../services/authService'

export const useAuthStore = () => {
    const state = reactive({
        thongBao: '',
        nguoiDung: JSON.parse(localStorage.getItem('nguoiDung')) || null
    })

    const dangKy = async (form) => {
        try {
            await dangKyNguoiDung(form)
            state.thongBao = 'Đăng ký thành công'
        } catch (err) {
            state.thongBao = 'Đăng ký thất bại'
        }
    }

    const dangNhap = async (id, matKhau) => {
        try {
            const nguoiDung = await dangNhapNguoiDung(id)
            if (nguoiDung && nguoiDung.matKhau === matKhau) {
                state.nguoiDung = nguoiDung
                localStorage.setItem('nguoiDung', JSON.stringify(nguoiDung))
                state.thongBao = 'Đăng nhập thành công'
            } else {
                state.thongBao = 'Sai mật khẩu'
            }
        } catch (err) {
            state.thongBao = 'Không tìm thấy người dùng'
        }
    }

    const dangXuat = () => {
        state.nguoiDung = null
        localStorage.removeItem('nguoiDung')
        state.thongBao = 'Đã đăng xuất'
    }

    const capNhat = async (duLieuMoi, fileAnh) => {
        try {
            if (fileAnh) {
                const link = await uploadAnh(fileAnh)
                duLieuMoi.anhDaiDien = link
            }
            await capNhatNguoiDung(duLieuMoi)
            state.nguoiDung = duLieuMoi
            localStorage.setItem('nguoiDung', JSON.stringify(duLieuMoi))
            state.thongBao = 'Cập nhật thành công'
        } catch (err) {
            state.thongBao = 'Cập nhật thất bại'
        }
    }

    return {
        state,
        dangKy,
        dangNhap,
        dangXuat,
        capNhat
    }
}
