import { ref } from 'vue'
import {
    getTatCaBaiViet,
    getBaiVietTheoNguoiDung,
    themBaiViet,
    suaBaiViet,
    xoaBaiViet,
    uploadHinhAnh,
    guiBinhLuan,
    getBinhLuanTheoBaiViet
} from '@/services/postService'

export const usePostStore = () => {
    const danhSach = ref([])
    const thongBao = ref('')
    const binhLuanList = ref([])

    const taiTatCaBaiViet = async () => {
        try {
            danhSach.value = await getTatCaBaiViet()
        } catch (err) {
            thongBao.value = 'Không thể tải bài viết'
        }
    }

    const taiBaiViet = async () => {
        try {
            const maNguoiDung = JSON.parse(localStorage.getItem('nguoiDung'))?.maNguoiDung
            if (!maNguoiDung) {
                thongBao.value = 'Không có mã người dùng'
                return
            }
            danhSach.value = await getBaiVietTheoNguoiDung(maNguoiDung)
        } catch (err) {
            thongBao.value = 'Không thể tải bài viết'
        }
    }

    const them = async (bv, file) => {
        try {
            if (file) bv.hinhAnh = await uploadHinhAnh(file)
            await themBaiViet(bv)
            thongBao.value = 'Đã thêm bài viết'
            await taiBaiViet()
        } catch (err) {
            thongBao.value = 'Thêm thất bại'
        }
    }

    const sua = async (bv, file) => {
        try {
            if (file) bv.hinhAnh = await uploadHinhAnh(file)
            await suaBaiViet(bv)
            thongBao.value = 'Đã cập nhật bài viết'
            await taiBaiViet()
        } catch (err) {
            thongBao.value = 'Sửa thất bại'
        }
    }

    const xoa = async (maBaiViet) => {
        try {
            await xoaBaiViet(maBaiViet)
            thongBao.value = 'Đã xóa bài viết'
            await taiBaiViet()
        } catch (err) {
            thongBao.value = 'Xóa thất bại'
        }
    }

    const taiBinhLuan = async (maBaiViet) => {
        binhLuanList.value = await getBinhLuanTheoBaiViet(maBaiViet)
    }

    const gui = async (noiDung, maBaiViet, maNguoiDung) => {
        const bl = {
            noiDung,
            ngayTao: new Date(),
            maBinhLuan: 'BL' + Date.now(),
            baiViet: { maBaiViet }, 
            maNguoiDung
        }
        await guiBinhLuan(bl)
        await taiBinhLuan(maBaiViet)
    }
    
    
    return {
        danhSach,
        thongBao,
        binhLuanList,
        taiTatCaBaiViet,
        taiBaiViet,
        them,
        sua,
        xoa,
        taiBinhLuan,
        gui
    }
}
