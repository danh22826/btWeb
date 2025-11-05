document.addEventListener("DOMContentLoaded", () => {
  // Lấy các phần tử cần thiết
  const posterArea = document.getElementById("poster-area");
  const trailerModal = document.getElementById("trailerModal");
  const closeVideoBtn = document.querySelector(".close-video");
  const trailerIframe = document.getElementById("trailerPlayer");
  const followButton = document.getElementById("followButton");

  // Lấy URL trailer động từ thuộc tính HTML
  const baseTrailerSrc = posterArea
    ? posterArea.getAttribute("data-trailer-url")
    : null;

  // --- CHỨC NĂNG CHÍNH: QUẢN LÝ MODAL VÀ VIDEO ---

  // Đóng Modal: Dừng video và cho phép cuộn trang
  const closeModal = () => {
    trailerIframe.src = "";
    trailerModal.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  const allBuyButtons = document.querySelectorAll(".buy-btn");
  const ticketPageURL = "/gia_ve/giave.html"; // Đường dẫn tới trang giá vé

  allBuyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Chuyển hướng người dùng đến trang giá vé
      window.location.href = ticketPageURL;
    });
  });
  // Mở Modal: Gắn URL, thêm autoplay=1 và ngăn cuộn trang
  const openVideo = () => {
    if (!baseTrailerSrc) return;

    // Tối ưu hóa URL (dùng '?' hoặc '&')
    const separator = baseTrailerSrc.includes("?") ? "&" : "?";

    trailerIframe.src = baseTrailerSrc + separator + "autoplay=1";
    trailerModal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  // --- CHỨC NĂNG CHÍNH: XỬ LÝ NÚT THEO DÕI ---

  // Xử lý nút Theo dõi (chỉ thêm trạng thái)
  const handleFollow = () => {
    if (!followButton) return;

    if (!followButton.classList.contains("followed")) {
      alert("🎉 Theo dõi thành công!"); // Hiện thông báo thành công

      followButton.classList.add("followed");
      followButton.innerHTML = '<i class="fas fa-check"></i> Đã theo dõi'; // Đổi trạng thái nút
    } else {
      alert("Bạn đã theo dõi phim này rồi."); // Xác nhận đã theo dõi
    }
  };

  // --- GẮN SỰ KIỆN VÀO CÁC PHẦN TỬ HTML ---
  if (posterArea) posterArea.addEventListener("click", openVideo);
  if (closeVideoBtn) closeVideoBtn.addEventListener("click", closeModal);
  if (trailerModal)
    trailerModal.addEventListener("click", (e) => {
      // Thoát khi click vào nền đen
      if (e.target.id === "trailerModal") closeModal();
    });

  if (followButton) followButton.addEventListener("click", handleFollow);
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
