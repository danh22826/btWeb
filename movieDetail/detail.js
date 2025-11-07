document.addEventListener("DOMContentLoaded", () => {
  // --- PHẦN LOGIC CHO TRAILER MODAL ---

  const posterArea = document.getElementById("poster-area");
  const trailerModal = document.getElementById("trailerModal");
  const closeVideoBtn = document.querySelector(".close-video");
  const trailerIframe = document.getElementById("trailerPlayer");

  // Đọc URL trailer
  const baseTrailerSrc = posterArea
    ? posterArea.getAttribute("data-trailer-url")
    : null;

  // Hàm đóng modal và dừng video
  const closeModal = () => {
    if (trailerIframe) {
      trailerIframe.src = "";
    }
    if (trailerModal) {
      trailerModal.classList.remove("active");
    }
    document.body.style.overflow = "auto";
  };

  const openVideo = () => {
    if (!baseTrailerSrc) {
      console.error(
        "Lỗi: Không tìm thấy URL trailer. Hãy kiểm tra thuộc tính data-trailer-url của #poster-area."
      );
      return;
    }

    // Kiểm tra xem URL đã có tham số nào chưa
    const separator = baseTrailerSrc.includes("?") ? "&" : "?";

    // Gán lại src với tham số autoplay=1
    if (trailerIframe) {
      trailerIframe.src = baseTrailerSrc + separator + "autoplay=1";
    }

    if (trailerModal) {
      trailerModal.classList.add("active");
    }
    document.body.style.overflow = "hidden";
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
      // Chỉ đóng khi người dùng click chính xác vào nền
      if (e.target.id === "trailerModal") {
        closeModal();
      }
    });
  }

  // --- PHẦN LOGIC CHO NÚT THEO DÕI ---

  const followBtn = document.querySelector(".follow-btn");

  if (followBtn) {
    followBtn.addEventListener("click", function () {
      alert(" Bạn đã theo dõi phim thành công!");
    });
  }
});
