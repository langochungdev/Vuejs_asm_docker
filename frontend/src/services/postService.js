import axios from 'axios'

const API = 'http://localhost:8080/api/baiviet'
const BINHLUAN_API = 'http://localhost:8080/api/binhluan'
const UPLOAD_API = 'http://localhost:8080/api/upload'

export const getTatCaBaiViet = async () => {
    const res = await axios.get(API)
    return res.data
}

export const getBaiVietTheoNguoiDung = async (maNguoiDung) => {
    const res = await axios.get(`${API}?maNguoiDung=${maNguoiDung}`)
    return res.data
}

export const themBaiViet = async (bv) => {
    const res = await axios.post(API, bv)
    return res.data
}

export const suaBaiViet = async (bv) => {
    const res = await axios.put(API, bv)
    return res.data
}

export const xoaBaiViet = async (maBaiViet) => {
    const res = await axios.delete(`${API}?id=${maBaiViet}`)
    return res.data
}

export const uploadHinhAnh = async (file) => {
    const form = new FormData()
    form.append('file', file)
    const res = await axios.post(UPLOAD_API, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    return res.data.link
}

export const guiBinhLuan = async (bl) => {
    const res = await axios.post(BINHLUAN_API, bl)
    return res.data
}

export const getBinhLuanTheoBaiViet = async (maBaiViet) => {
    const res = await axios.get(`http://localhost:8080/api/binhluan?maBaiViet=${maBaiViet}`)
    return res.data
}

