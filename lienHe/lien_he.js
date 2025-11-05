/**
 * Chờ cho đến khi toàn bộ tài liệu HTML được tải và phân tích xong
 * Điều này rất quan trọng vì tệp lien_he.js của bạn được tải
 * TRƯỚC khi biểu mẫu (form) tồn tại trong HTML.
 */
document.addEventListener('DOMContentLoaded', function() {
    // 1. Chọn biểu mẫu (form) liên hệ
    // Chúng ta sử dụng '.contact-form form' để chọn đúng thẻ <form>
    // nằm bên trong <div class="contact-form">
    const contactForm = document.querySelector('.contact-form form');

    // 2. Chọn phần tử "cha" để chèn thông báo
    // Chúng ta sẽ chèn thông báo vào bên trong <div class="contact-form">
    // ngay phía trên biểu mẫu
    const formContainer = document.querySelector('.contact-form');

    // 3. Chỉ chạy code nếu tìm thấy biểu mẫu
    if (contactForm && formContainer) {
        // 4. Thêm một trình nghe sự kiện 'submit' cho biểu mẫu
        contactForm.addEventListener('submit', function(event) {
            // 5. NGĂN CHẶN hành vi mặc định của form
            // Đây là bước quan trọng nhất!
            // Nó ngăn trang web tải lại khi nhấn nút "Gửi Tin Nhắn".
            event.preventDefault();

            // --- Xử lý hiển thị thông báo ---

            // (Tùy chọn) Xóa thông báo thành công cũ nếu người dùng nhấn gửi nhiều lần
            const existingAlert = formContainer.querySelector('.alert-success');
            if (existingAlert) {
                existingAlert.remove();
            }

            // 6. Tạo mã HTML cho thông báo (sử dụng lớp của Bootstrap)
            // Chúng ta dùng các lớp CSS của Bootstrap 5 có sẵn trong dự án của bạn
            // để thông báo trông đẹp mắt và chuyên nghiệp.
            const alertHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Gửi tin nhắn thành công!</strong> Chúng tôi sẽ liên hệ lại với bạn sớm nhất.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;

            // 7. Chèn thông báo vào đầu của formContainer
            // 'afterbegin' có nghĩa là chèn ngay bên trong .contact-form,
            // ở vị trí trước cả thẻ <form>
            formContainer.insertAdjacentHTML('afterbegin', alertHTML);

            // 8. (Tùy chọn) Xóa sạch nội dung người dùng đã nhập trong form
            // Điều này tạo cảm giác "đã gửi" hoàn tất.
            contactForm.reset();
        });
    } else {
        // Thông báo lỗi nếu không tìm thấy form (hữu ích khi gỡ lỗi)
        console.error('Không tìm thấy biểu mẫu liên hệ hoặc vùng chứa form.');
    }
});