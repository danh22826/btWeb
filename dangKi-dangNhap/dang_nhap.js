document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login_button');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (loginButton) {
        loginButton.addEventListener('click', (event) => {
            event.preventDefault();

            const email = emailInput.value;
            const password = passwordInput.value;
            if (!email || !password) {
                alert("Vui lòng nhập đầy đủ email và mật khẩu!");
                return;
            }

            // 1. Lấy "database" người dùng từ localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // 2. Tìm người dùng có email VÀ password khớp
            const foundUser = users.find(user => user.email === email && user.password === password);

            // 3. Xử lý kết quả
            if (foundUser) {
                // đúng
                alert("Đăng nhập thành công!");

                // 💡 NÂNG CAO: Lưu trạng thái đăng nhập vào sessionStorage
                // sessionStorage sẽ tự xóa khi người dùng đóng trình duyệt
                sessionStorage.setItem('loggedInUser', JSON.stringify(foundUser));
                window.location.href = "../menu.html";

            } else {
                // sai
                alert("Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
            }
        });
    }
});