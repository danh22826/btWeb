// Chờ cho toàn bộ trang được tải xong
document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.getElementById('dang_ki');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const sdtInput = document.getElementById('sdt');
    const passwordInput = document.getElementById('password');
    const ngaySinhInput = document.getElementById('ngay_sinh');
    const khuVucInput = document.getElementById('khu_vuc');
    const rapInput = document.getElementById('rap_yeu_thich');

    if (registerButton) {
        registerButton.addEventListener('click', (event) => {
            // Ngăn form gửi đi và tải lại trang
            event.preventDefault();
            const name = nameInput.value;
            const email = emailInput.value;
            const sdt = sdtInput.value;
            const password = passwordInput.value;
            const ngaySinh = ngaySinhInput.value;
            const khuVuc = khuVucInput.value;
            const rap = rapInput.value;
            // Kiểm tra xem có ô nào bị bỏ trống không
            if (!name || !email || !sdt || !password || !ngaySinh || !khuVuc || !rap) {
                alert("Vui lòng điền đầy đủ tất cả thông tin bắt buộc!");
                return;
            }

            // 1. Lấy "database" người dùng từ localStorage
            // Nếu chưa có, khởi tạo một mảng rỗng
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // 2. Kiểm tra xem email đã tồn tại chưa
            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
                alert("Email này đã được sử dụng. Vui lòng chọn email khác.");
                return; // Dừng thực thi
            }

            // 3. Tạo đối tượng người dùng mới
            const newUser = {
                name: name,
                email: email,
                sdt: sdt,
                password: password,
                ngaySinh: ngaySinh,
                khuVuc: khuVuc,
                rapYeuThich: rap
            };

            // 4. Thêm người dùng mới vào mảng
            users.push(newUser);

            // 5. Lưu mảng (database) đã cập nhật trở lại localStorage
            localStorage.setItem('users', JSON.stringify(users));

            // 6. Thông báo thành công và chuyển hướng
            alert("Đăng kí thành công! Bạn sẽ được chuyển đến trang đăng nhập.");
            window.location.href = "dang_nhap.html";
        });
    }
});