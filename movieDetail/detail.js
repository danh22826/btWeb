document.addEventListener("DOMContentLoaded", () => {
  const posterArea = document.getElementById("poster-area");
  const trailerModal = document.getElementById("trailerModal");
  const closeVideoBtn = document.querySelector(".close-video");
  const trailerIframe = document.getElementById("trailerPlayer");

  // Đọc URL trailer từ thuộc tính data-trailer-url của poster
  const baseTrailerSrc = posterArea
    ? posterArea.getAttribute("data-trailer-url")
    : null;

  // Hàm đóng modal và dừng video (Dùng cho nút X và click ra ngoài)
  const closeModal = () => {
    // Dừng video bằng cách reset src của iframe
    trailerIframe.src = "";
    trailerModal.classList.remove("active");
    document.body.style.overflow = "auto"; // Cho phép cuộn trang
  };

  // Hàm mở modal và tự động play video
  const openVideo = () => {
    if (!baseTrailerSrc) {
      console.error(
        "Lỗi: Không tìm thấy URL trailer. Hãy kiểm tra thuộc tính data-trailer-url."
      );
      return;
    }

    // 💡 TỐI ƯU HÓA URL: Kiểm tra xem URL đã có tham số nào chưa
    const separator = baseTrailerSrc.includes("?") ? "&" : "?";

    // Gán lại src với tham số autoplay=1 để video tự chạy
    trailerIframe.src = baseTrailerSrc + separator + "autoplay=1";
    trailerModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Ngăn cuộn trang
  };

  // 1. Lắng nghe sự kiện click trên Poster để mở trailer
  if (posterArea) {
    posterArea.addEventListener("click", openVideo);
  }

  // 2. Lắng nghe sự kiện đóng Modal (bấm nút X)
  if (closeVideoBtn) {
    closeVideoBtn.addEventListener("click", closeModal);
  }

  // 3. Lắng nghe sự kiện đóng Modal khi click ra ngoài (trên nền đen)
  if (trailerModal) {
    trailerModal.addEventListener("click", (e) => {
      // Kiểm tra xem người dùng có click chính xác vào modal background không
      if (e.target.id === "trailerModal") {
        closeModal();
      }
    });
  }
});
// detail.js

document.addEventListener("DOMContentLoaded", () => {
  const posterArea = document.getElementById("poster-area");
  const trailerModal = document.getElementById("trailerModal");
  const closeVideoBtn = document.querySelector(".close-video");
  const trailerIframe = document.getElementById("trailerPlayer");

  // Đọc URL trailer từ thuộc tính data-trailer-url của poster
  const baseTrailerSrc = posterArea
    ? posterArea.getAttribute("data-trailer-url")
    : null;

  // Hàm đóng modal và dừng video (Dùng cho nút X và click ra ngoài)
  const closeModal = () => {
    // Dừng video bằng cách reset src của iframe
    trailerIframe.src = "";
    trailerModal.classList.remove("active");
    document.body.style.overflow = "auto"; // Cho phép cuộn trang
  };

  // Hàm mở modal và tự động play video
  const openVideo = () => {
    if (!baseTrailerSrc) {
      console.error(
        "Lỗi: Không tìm thấy URL trailer. Hãy kiểm tra thuộc tính data-trailer-url."
      );
      return;
    }

    // Tối ưu hóa URL: Kiểm tra xem URL đã có tham số nào chưa để sử dụng '?' hay '&'
    const separator = baseTrailerSrc.includes("?") ? "&" : "?";

    // Gán lại src với tham số autoplay=1 để video tự chạy
    trailerIframe.src = baseTrailerSrc + separator + "autoplay=1";
    trailerModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Ngăn cuộn trang
  };

  // 1. Lắng nghe sự kiện click trên Poster để mở trailer
  if (posterArea) {
    posterArea.addEventListener("click", openVideo);
  }

  // 2. Lắng nghe sự kiện đóng Modal (bấm nút X)
  if (closeVideoBtn) {
    closeVideoBtn.addEventListener("click", closeModal);
  }

  // 3. Lắng nghe sự kiện đóng Modal khi click ra ngoài (trên nền đen)
  if (trailerModal) {
    trailerModal.addEventListener("click", (e) => {
      // Kiểm tra xem người dùng có click chính xác vào modal background không
      if (e.target.id === "trailerModal") {
        closeModal();
      }
    });
  }
});
// 4.Lắng nghe thao tác bấm nút theo dõi
document.addEventListener("DOMContentLoaded", function () {
  const followBtn = document.querySelector(".follow-btn");

  followBtn.addEventListener("click", function () {
    alert("✅ Bạn đã theo dõi phim thành công!");
  });
});
