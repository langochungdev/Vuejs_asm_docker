import axios from 'axios'

const API = 'http://localhost:8080/api/nguoidung'
const UPLOAD_API = 'http://localhost:8080/api/upload'

export const dangKyNguoiDung = async (nguoiDung) => {
    const res = await axios.post(API, nguoiDung)
    return res.data
}

export const dangNhapNguoiDung = async (id) => {
    const res = await axios.get(`${API}?id=${id}`)
    return res.data
}

export const capNhatNguoiDung = async (nguoiDung) => {
    const res = await axios.put(API, nguoiDung)
    return res.data
}

export const uploadAnh = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const res = await axios.post(UPLOAD_API, formData)
    return res.data.link
}
