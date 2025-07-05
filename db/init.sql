CREATE DATABASE asmvue
GO

USE asmvue
GO

CREATE TABLE NguoiDung (
    MaNguoiDung NVARCHAR(50) PRIMARY KEY,
    Ten NVARCHAR(100),
    Email NVARCHAR(100) UNIQUE,
    MatKhau NVARCHAR(255),
    GioiTinh BIT,
    AnhDaiDien NVARCHAR(255)
)

CREATE TABLE BaiViet (
    MaBaiViet NVARCHAR(50) PRIMARY KEY,
    MaNguoiDung NVARCHAR(50) FOREIGN KEY REFERENCES NguoiDung(MaNguoiDung),
    TieuDe NVARCHAR(200),
    NoiDung NVARCHAR(MAX),
    HinhAnh NVARCHAR(255),
    NgayTao DATETIME DEFAULT GETDATE()
)

CREATE TABLE BinhLuan (
    MaBinhLuan NVARCHAR(50) PRIMARY KEY,
    MaBaiViet NVARCHAR(50) FOREIGN KEY REFERENCES BaiViet(MaBaiViet),
    MaNguoiDung NVARCHAR(50),
    NoiDung NVARCHAR(MAX),
    NgayTao DATETIME DEFAULT GETDATE()
)


INSERT INTO NguoiDung (MaNguoiDung, Ten, Email, GioiTinh, MatKhau, AnhDaiDien) VALUES
('ND01', 'hung 1', 'a@gmail.com', 1, '123', 'a.jpg'),
('ND02', 'hung 2', 'b@gmail.com', 0, '123', 'b.jpg')

INSERT INTO BaiViet (MaBaiViet, MaNguoiDung, TieuDe, NoiDung, HinhAnh) VALUES
('BV01', 'ND01', N'Kinh nghiệm học lập trình', N'Lập trình là một kỹ năng cần sự kiên nhẫn và luyện tập thường xuyên. Trong bài viết này, tôi sẽ chia sẻ cách tôi bắt đầu với HTML, CSS và sau đó là JavaScript.', 'bv1.jpg'),
('BV02', 'ND02', N'Tại sao nên học Vue.js?', N'Vue.js là một framework hiện đại giúp xây dựng giao diện người dùng dễ dàng và hiệu quả. Nó dễ học và có cộng đồng hỗ trợ mạnh mẽ.', 'bv2.jpg'),
('BV03', 'ND01', N'5 mẹo học nhanh Bootstrap', N'Bootstrap giúp bạn tạo giao diện đẹp mà không cần viết nhiều CSS. Dưới đây là 5 mẹo nhỏ giúp bạn làm chủ Bootstrap nhanh chóng.', 'bv3.jpg'),
('BV04', 'ND02', N'So sánh Vue và React', N'Vue và React đều là những công cụ mạnh mẽ cho frontend. Tuy nhiên, mỗi công cụ có ưu và nhược điểm riêng, bạn nên chọn tùy vào dự án.', 'bv4.jpg'),
('BV05', 'ND01', N'Làm quen với Vue Router', N'Vue Router giúp quản lý đường dẫn trong ứng dụng Vue. Nó giúp bạn tạo các trang như trang chủ, đăng nhập, chi tiết bài viết một cách dễ dàng.', 'bv5.jpg'),
('BV06', 'ND02', N'Tạo ứng dụng blog với Vue', N'Bạn có thể tạo một blog cá nhân sử dụng Vue và Bootstrap. Bài viết này hướng dẫn chi tiết từ khâu tạo project đến xử lý dữ liệu.', 'bv6.jpg'),
('BV07', 'ND01', N'Form binding trong Vue', N'Form binding giúp liên kết dữ liệu từ form vào biến trong Vue. Đây là một phần quan trọng trong việc xử lý thông tin người dùng nhập vào.', 'bv7.jpg'),
('BV08', 'ND02', N'Hướng dẫn dùng v-if và v-for', N'v-if và v-for là hai công cụ mạnh trong Vue để hiển thị động nội dung. Bài viết này sẽ đưa ra các ví dụ thực tế và lưu ý khi sử dụng.', 'bv8.jpg'),
('BV09', 'ND01', N'Quản lý trạng thái trong Vue', N'Khi ứng dụng trở nên phức tạp, bạn cần quản lý trạng thái hiệu quả. Có thể dùng reactive, ref hoặc thư viện như Pinia để hỗ trợ.', 'bv9.jpg'),
('BV10', 'ND02', N'Upload ảnh với Vue', N'Bài viết hướng dẫn bạn cách upload ảnh từ form Vue lên server, xử lý và hiển thị lại ảnh cho người dùng.', 'bv10.jpg')


INSERT INTO BinhLuan (MaBinhLuan, MaBaiViet, MaNguoiDung, NoiDung) VALUES
('BL01', 'BV01', 'ND02', N'Cảm ơn bạn đã chia sẻ rất chi tiết, mình cũng từng gặp khó khăn khi mới bắt đầu học lập trình.'),
('BL02', 'BV02', 'ND01', N'Mình cũng thấy Vue dễ học hơn React, đặc biệt khi mới tiếp cận frontend. Bài viết rất bổ ích.'),
('BL03', 'BV03', 'ND02', N'Mấy mẹo này thật sự giúp mình tiết kiệm rất nhiều thời gian khi dùng Bootstrap. Cảm ơn bạn.'),
('BL04', 'BV04', 'ND01', N'Bạn so sánh rất rõ ràng, mình đang phân vân học Vue hay React và bài này giúp mình quyết định.'),
('BL05', 'BV05', 'ND02', N'Vue Router thực sự mạnh mẽ, cảm ơn bạn đã viết bài hướng dẫn chi tiết thế này.'),
('BL06', 'BV06', 'ND01', N'Bài viết rất dễ hiểu, mình làm theo từng bước và đã chạy được blog đầu tiên bằng Vue.'),
('BL07', 'BV07', 'ND02', N'Form binding là phần mình hay gặp lỗi nhất, bài này giúp mình hiểu rõ hơn rất nhiều.'),
('BL08', 'BV08', 'ND01', N'Cảm ơn bạn đã chia sẻ cách dùng v-if và v-for, mình sẽ áp dụng ngay cho dự án của mình.'),
('BL09', 'BV09', 'ND02', N'Trạng thái trong Vue đúng là quan trọng, mình sẽ tìm hiểu thêm về Pinia như bạn gợi ý.'),
('BL10', 'BV10', 'ND01', N'Upload ảnh là phần khá phức tạp, cảm ơn bạn đã viết hướng dẫn cụ thể và dễ làm theo như vậy.')
