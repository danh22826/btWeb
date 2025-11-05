document.addEventListener("DOMContentLoaded", () => {
  // Lấy các phần tử cần thiết

  const allBuyButtons = document.querySelectorAll(".buy-btn");
  const ticketPageURL = "/gia_ve/giave.html"; // Đường dẫn tới trang giá vé

  allBuyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Chuyển hướng người dùng đến trang giá vé
      window.location.href = ticketPageURL;
    });
  });
});

// logic dang nhap dang ki
document.addEventListener("DOMContentLoaded", () => {
  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

  // Lấy phần tử header-right
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
        window.location.href = "../dang_nhap.html";
      });
    }
  }
  // Nếu chưa đăng nhập (loggedInUser là null), thì không làm gì cả
  // headerRight sẽ giữ nguyên HTML gốc (Đăng nhập | Đăng ký)
});
