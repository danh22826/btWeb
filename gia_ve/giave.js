document.addEventListener("DOMContentLoaded", function () {
  let bookingData = {
    movie: null,
    date: "today",
    time: "18:00",
    seats: [],
    paymentMethod: null,
  };

  const PRICES = {
    normal: 80000,
    vip: 120000,
    family: 300000,
  };

  const steps = document.querySelectorAll(".step");
  const stepContents = document.querySelectorAll(".step-content");
  const movieOptions = document.querySelectorAll(".movie-option");
  const seats = document.querySelectorAll(".seat.available");
  const paymentMethods = document.querySelectorAll(".payment-method");

  function updateMoviesByDate(date) {
    const moviesToday = movieSchedule[date] || [];

    movieOptions.forEach((option) => {
      const movieId = option.getAttribute("data-movie");
      if (moviesToday.includes(movieId)) {
        option.style.display = "block";
      } else {
        option.style.display = "none";
      }
    });

    // Nếu không có phim nào
    if (moviesToday.length === 0) {
      const container = document.querySelector(".movie-selection");
      container.innerHTML =
        "<p style='color:white;text-align:center;'>Không có phim nào được chiếu vào ngày này.</p>";
    } else {
      // Xóa thông báo nếu có
      document
        .querySelectorAll(".movie-selection p")
        .forEach((p) => p.remove());
    }
  }

  // Khi chọn ngày mới
  document.getElementById("date-picker").addEventListener("change", (e) => {
    const selectedDate = e.target.value;
    updateMoviesByDate(selectedDate);
  });

  // ==================== LỊCH CHIẾU THẬT ====================
  const movieSchedule = {
    "2025-11-01": ["conan", "caima", "nha-ma-xo"],
    "2025-11-02": [
      "chu-thuat-hoi-chien-the-movie",
      "chainsaw-man-chuong-reze",
      "gio-van-thoi",
    ],
    "2025-11-03": ["lord", "one-punch-man", "tu-chien-tren-khong"],
    "2025-11-04": ["grandma", "bi-mat-sau-bua-tiec", "dien-thoai-den-2"],
    "2025-11-05": [
      "muc-su-thay-do-va-con-quy-am-tri",
      "to-quoc-trong-tim-the-concert-film",
      "nhat-niem-vinh-hang",
    ],
  };

  // ==================== CẬP NHẬT PHIM THEO NGÀY ====================
  const datePicker = document.getElementById("date-picker");
  const movieContainer = document.querySelector(".movie-selection");

  function updateMoviesByDate(date) {
    const moviesToday = movieSchedule[date] || [];

    // Nếu không có phim nào -> hiển thị thông báo
    if (moviesToday.length === 0) {
      movieContainer.innerHTML =
        "<p style='color:white;text-align:center;'>Không có phim nào được chiếu vào ngày này.</p>";
      return;
    }

    // Hiển thị lại tất cả phim trước
    movieContainer.querySelectorAll(".movie-option").forEach((option) => {
      const movieId = option.getAttribute("data-movie");
      if (moviesToday.includes(movieId)) {
        option.style.display = "block";
      } else {
        option.style.display = "none";
      }
    });
  }

  // Khi chọn ngày mới
  datePicker.addEventListener("change", (e) => {
    updateMoviesByDate(e.target.value);
  });

  // Tự động hiển thị phim hôm nay khi load trang
  window.addEventListener("load", () => {
    const today = new Date().toISOString().split("T")[0];
    datePicker.value = today;
    updateMoviesByDate(today);
  });

  document.getElementById("to-step2").addEventListener("click", function () {
    if (!bookingData.movie) {
      alert("Vui lòng chọn phim trước khi tiếp tục!");
      return;
    }

    changeStep(2);
  });

  document.getElementById("to-step1").addEventListener("click", function () {
    changeStep(1);
  });

  document.getElementById("to-step3").addEventListener("click", function () {
    if (bookingData.seats.length === 0) {
      alert("Vui lòng chọn ít nhất một ghế ngồi!");
      return;
    }

    updateSummary();
    changeStep(3);
  });

  movieOptions.forEach((option) => {
    option.addEventListener("click", function () {
      movieOptions.forEach((m) => m.classList.remove("selected"));
      this.classList.add("selected");
      bookingData.movie = this.getAttribute("data-movie");
    });
  });

  seats.forEach((seat) => {
    seat.addEventListener("click", function () {
      if (this.classList.contains("occupied")) return;

      const seatId = this.getAttribute("data-seat");
      const seatType = this.getAttribute("data-type");

      if (this.classList.contains("selected")) {
        this.classList.remove("selected");
        bookingData.seats = bookingData.seats.filter((s) => s.id !== seatId);
      } else {
        this.classList.add("selected");
        bookingData.seats.push({
          id: seatId,
          type: seatType,
        });
      }
    });
  });

  paymentMethods.forEach((method) => {
    method.addEventListener("click", function () {
      paymentMethods.forEach((m) => m.classList.remove("selected"));
      this.classList.add("selected");
      bookingData.paymentMethod = this.getAttribute("data-method");
    });
  });

  document
    .getElementById("confirm-payment")
    .addEventListener("click", function () {
      if (!bookingData.paymentMethod) {
        alert("Vui lòng chọn phương thức thanh toán!");
        return;
      }

      alert("Đặt vé thành công! Vé đã được gửi đến email của bạn.");
      resetBooking();
      changeStep(1);
    });

  function changeStep(stepNumber) {
    steps.forEach((step, index) => {
      if (index < stepNumber - 1) {
        step.classList.add("completed");
        step.classList.remove("active");
      } else if (index === stepNumber - 1) {
        step.classList.add("active");
        step.classList.remove("completed");
      } else {
        step.classList.remove("active", "completed");
      }
    });

    stepContents.forEach((content, index) => {
      if (index === stepNumber - 1) {
        content.style.display = "block";
      } else {
        content.style.display = "none";
      }
    });
  }

  function updateSummary() {
    const selectedMovie = document.querySelector(
      ".movie-option.selected h3"
    ).textContent;
    document.getElementById("summary-movie").textContent = selectedMovie;

    const datePicker = document.getElementById("date-picker");
    const timeSelect = document.getElementById("time-select");

    const selectedDate = new Date(datePicker.value);
    const formattedDate = selectedDate.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const timeText = timeSelect.options[timeSelect.selectedIndex].text;
    document.getElementById(
      "summary-time"
    ).textContent = `${formattedDate} - ${timeText}`;

    const seatIds = bookingData.seats.map((seat) => seat.id);
    document.getElementById("summary-seats").textContent = seatIds.join(", ");

    let normalCount = 0;
    let vipCount = 0;
    let familyCount = 0;

    bookingData.seats.forEach((seat) => {
      if (seat.type === "normal") {
        normalCount++;
      } else if (seat.type === "vip") {
        vipCount++;
      } else if (seat.type === "family") {
        familyCount++;
      }
    });

    document.getElementById("normal-count").textContent = normalCount;
    document.getElementById("vip-count").textContent = vipCount;
    document.getElementById("family-count").textContent = familyCount;

    const total =
      normalCount * PRICES.normal +
      vipCount * PRICES.vip +
      familyCount * PRICES.family;
    document.getElementById("summary-total").textContent =
      total.toLocaleString("vi-VN") + " VNĐ";
  }

  function resetBooking() {
    bookingData = {
      movie: null,
      date: "today",
      time: "18:00",
      seats: [],
      paymentMethod: null,
    };

    movieOptions.forEach((m) => m.classList.remove("selected"));
    seats.forEach((s) => s.classList.remove("selected"));
    paymentMethods.forEach((m) => m.classList.remove("selected"));
  }

  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", function (e) {
      if (!this.classList.contains("active")) {
        if (bookingData.seats.length > 0 || bookingData.movie) {
          const confirmLeave = confirm(
            "Bạn có chắc muốn rời khỏi trang? Thông tin đặt vé của bạn sẽ bị mất."
          );
          if (!confirmLeave) {
            e.preventDefault();
            return;
          }
        }
      }
    });
  });

  document
    .querySelector(".search-bar form")
    .addEventListener("submit", function (e) {
      if (bookingData.seats.length > 0 || bookingData.movie) {
        const confirmLeave = confirm(
          "Bạn có chắc muốn tìm kiếm? Thông tin đặt vé của bạn sẽ bị mất."
        );
        if (!confirmLeave) {
          e.preventDefault();
        }
      }
    });
});
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
        window.location.href = "menu.html";
      });
    }
  }
});
