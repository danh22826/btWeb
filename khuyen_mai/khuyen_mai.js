document.addEventListener("DOMContentLoaded", () => {
  // === CHỨC NĂNG 1: KIỂM TRA ĐĂNG NHẬP ===
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  const headerRight = document.querySelector(".header-right");

  if (loggedInUser && headerRight) {
    // Nếu đã đăng nhập, thay đổi nội dung header
    headerRight.innerHTML = `
      <a href="#" style="color: yellow;">Xin chào, ${loggedInUser.name}</a>
      <span>|</span>
      <a href="#" id="logout-button">Đăng xuất</a>
    `;

    // Thêm sự kiện cho nút Đăng xuất
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
      logoutButton.addEventListener("click", (event) => {
        event.preventDefault(); // Ngăn link tự nhảy

        // Xóa thông tin đăng nhập khỏi sessionStorage
        sessionStorage.removeItem("loggedInUser");

        // Thông báo và tải lại trang (hoặc chuyển về trang đăng nhập)
        alert("Đã đăng xuất.");
        window.location.href = "menu.html"; // Chuyển về trang chủ
      });
    }
  }

  // === CHỨC NĂNG 2: LỌC THEO TAB ===
  const tabs = document.querySelectorAll(".promo-tab");
  const cards = document.querySelectorAll(".promo-card");

  if (tabs.length > 0 && cards.length > 0) {
    // Kiểm tra xem các phần tử có tồn tại không
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const filter = tab.getAttribute("data-tab");

        // Xóa lớp 'active' khỏi tất cả các tab
        tabs.forEach((t) => t.classList.remove("active"));
        // Thêm lớp 'active' cho tab vừa được click
        tab.classList.add("active");

        // Lọc các thẻ khuyến mãi
        cards.forEach((card) => {
          const category = card.getAttribute("data-category");
          if (filter === "all" || filter === category) {
            card.style.display = "block"; // Hiển thị thẻ
          } else {
            card.style.display = "none"; // Ẩn thẻ
          }
        });
      });
    });
  }

  // === CHỨC NĂNG 3: SAO CHÉP MÃ KHUYẾN MÃI (ĐÃ SỬA) ===
  const allCopyButtons = document.querySelectorAll(".copy-btn");

  allCopyButtons.forEach((button) => {
    // Tự tìm mã code (code) bên trong thẻ <code> cùng cấp
    const codeElement = button.closest(".promo-code").querySelector("code");

    if (codeElement) {
      const codeToCopy = codeElement.textContent;

      // Ghi đè lên bất kỳ 'onclick' nào trong HTML
      button.onclick = null;

      button.addEventListener("click", () => {
        // Hàm copy "giả lập" chỉ để hiện "Đã chép"
        try {
          const originalHtml = button.innerHTML;

          // Thay đổi nội dung nút
          button.innerHTML = '<i class="fas fa-check"></i> Đã chép';
          button.disabled = true;

          // Đặt lại nút sau 2 giây
          setTimeout(() => {
            button.innerHTML = originalHtml;
            button.disabled = false;
          }, 2000);

          console.log("Đã copy:", codeToCopy);
        } catch (err) {
          console.error("Lỗi khi thay đổi UI nút: ", err);
        }
      });
    }
  });
});
