document.addEventListener("DOMContentLoaded", function () {
  console.log("=== BẮT ĐẦU DEBUG ===");

  // === DỮ LIỆU ĐẶT VÉ ===
  let bookingData = {
    movie: null,
    movieTitle: "",
    date: "",
    time: "",
    seats: [],
    paymentMethod: null,
  };

  // === GIÁ VÉ ===
  const PRICES = {
    normal: 80000,
    vip: 120000,
    family: 300000,
  };

  // === LỊCH CHIẾU PHIM - ĐỊNH DẠNG DD/MM/YYYY ===
  const movieSchedule = {
    "01/11/2025": ["conan", "caima", "nha-ma-xo"],
    "02/11/2025": [
      "chu-thuat-hoi-chien-the-movie",
      "chainsaw-man-chuong-reze",
      "gio-van-thoi",
    ],
    "03/11/2025": ["lord", "one-punch-man", "tu-chien-tren-khong"],
    "04/11/2025": ["grandma", "bi-mat-sau-bua-tiec", "dien-thoai-den-2"],
    "05/11/2025": [
      "muc-su-thay-do-va-con-quy-am-tri",
      "to-quoc-trong-tim-the-concert-film",
      "nhat-niem-vinh-hang",
    ],
    "06/11/2025": ["conan", "lord", "grandma", "caima"],
    "07/11/2025": [
      "muc-su-thay-do-va-con-quy-am-tri",
      "tu-chien-tren-khong",
      "one-punch-man",
    ],
    "08/11/2025": ["nhat-niem-vinh-hang", "nha-ma-xo", "bi-mat-sau-bua-tiec"],
    "09/11/2025": [
      "dien-thoai-den-2",
      "chu-thuat-hoi-chien-the-movie",
      "chainsaw-man-chuong-reze",
    ],
    "10/11/2025": [
      "gio-van-thoi",
      "to-quoc-trong-tim-the-concert-film",
      "conan",
    ],
  };

  console.log("Lịch chiếu:", movieSchedule);

  const steps = document.querySelectorAll(".step");
  const stepContents = document.querySelectorAll(".step-content");
  const movieOptions = document.querySelectorAll(".movie-option");
  const seats = document.querySelectorAll(".seat.available");
  const paymentMethods = document.querySelectorAll(".payment-method");
  const datePicker = document.getElementById("date-picker");
  const timeSelect = document.getElementById("time-select");

  console.log("Tìm thấy", movieOptions.length, "phim trong DOM");
  console.log("Date picker:", datePicker);
  console.log("Time select:", timeSelect);

  // === HÀM CHUYỂN ĐỔI ĐỊNH DẠNG NGÀY ===
  function formatDateToDDMMYYYY(dateString) {
    // Chuyển từ YYYY-MM-DD sang DD/MM/YYYY
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }

  // === KHỞI TẠO NGÀY HÔM NAY ===
  const today = new Date();
  const todayString = today.toISOString().split("T")[0]; // YYYY-MM-DD
  datePicker.value = todayString;
  // datePicker.min = todayString;
  bookingData.date = todayString;
  bookingData.time = timeSelect.value;

  console.log("Ngày hôm nay:", todayString);
  console.log("Định dạng DD/MM/YYYY:", formatDateToDDMMYYYY(todayString));

  // === BƯỚC 1: CHỌN PHIM VÀ SUẤT CHIẾU ===

  // Cập nhật danh sách phim theo ngày
  function updateMoviesByDate(dateYYYYMMDD) {
    console.log("=== CẬP NHẬT PHIM THEO NGÀY:", dateYYYYMMDD, "===");

    // Chuyển đổi sang định dạng DD/MM/YYYY
    const dateDDMMYYYY = formatDateToDDMMYYYY(dateYYYYMMDD);
    console.log("Định dạng DD/MM/YYYY:", dateDDMMYYYY);

    const moviesToday = movieSchedule[dateDDMMYYYY] || [];

    console.log("Phim có trong ngày này:", moviesToday);

    let visibleCount = 0;
    movieOptions.forEach((option) => {
      const movieId = option.getAttribute("data-movie");
      const movieName = option.querySelector("h3").textContent;

      if (moviesToday.includes(movieId)) {
        option.style.display = "block";
        option.style.opacity = "1";
        option.style.pointerEvents = "auto";
        visibleCount++;
        console.log("✓ HIỂN THỊ:", movieId, "-", movieName);
      } else {
        option.style.display = "none";
        option.style.opacity = "0.5";
        option.style.pointerEvents = "none";
        console.log("✗ ẨN:", movieId, "-", movieName);
      }
    });

    console.log("Tổng số phim hiển thị:", visibleCount);

    // Bỏ chọn phim nếu không có trong ngày mới
    if (bookingData.movie && !moviesToday.includes(bookingData.movie)) {
      movieOptions.forEach((m) => {
        m.classList.remove("selected");
        m.style.backgroundColor = "";
      });
      bookingData.movie = null;
      bookingData.movieTitle = "";
      console.log("⚠ Đã bỏ chọn phim vì không có trong ngày mới");
    }
  }

  // Sự kiện chọn ngày
  datePicker.addEventListener("change", (e) => {
    console.log("Đã chọn ngày:", e.target.value);
    bookingData.date = e.target.value;
    updateMoviesByDate(e.target.value);
  });

  // Sự kiện chọn giờ chiếu
  timeSelect.addEventListener("change", (e) => {
    console.log("Đã chọn giờ:", e.target.value);
    bookingData.time = e.target.value;
  });

  // Sự kiện chọn phim - FIXED VERSION
  movieOptions.forEach((option) => {
    option.addEventListener("click", function () {
      console.log("=== CLICK PHIM ===");

      const movieId = this.getAttribute("data-movie");
      const movieName = this.querySelector("h3").textContent;
      const selectedDate = bookingData.date;
      const dateDDMMYYYY = formatDateToDDMMYYYY(selectedDate);
      const moviesToday = movieSchedule[dateDDMMYYYY] || [];

      console.log("Phim clicked:", movieId, "-", movieName);
      console.log("Ngày đã chọn:", selectedDate, "=>", dateDDMMYYYY);
      console.log("Phim có trong ngày:", moviesToday);
      console.log("Phim này có được chiếu?", moviesToday.includes(movieId));

      // Kiểm tra xem phim có đang hiển thị không
      if (
        this.style.display === "none" ||
        this.style.pointerEvents === "none"
      ) {
        console.log("⌛ PHIM ĐANG BỊ ẨN - KHÔNG THỂ CHỌN");
        alert("Phim này không được chiếu vào ngày đã chọn!");
        return;
      }

      if (!moviesToday.includes(movieId)) {
        console.log("⌛ PHIM KHÔNG CÓ TRONG LỊCH CHIẾU");
        alert("Phim này không được chiếu vào ngày đã chọn!");
        return;
      }

      // Bỏ chọn tất cả phim khác
      movieOptions.forEach((m) => {
        m.classList.remove("selected");
        m.style.backgroundColor = "";
        m.style.border = "";
      });

      // Chọn phim này
      this.classList.add("selected");
      this.style.backgroundColor = "rgba(0, 115, 207, 0.2)";
      this.style.border = "3px solid #0073cf";
      bookingData.movie = movieId;
      bookingData.movieTitle = movieName;

      console.log(
        "✅ ĐÃ CHỌN PHIM:",
        bookingData.movie,
        "-",
        bookingData.movieTitle
      );
      console.log("Booking data hiện tại:", bookingData);
    });
  });

  // Nút chuyển sang bước 2
  document.getElementById("to-step2").addEventListener("click", function () {
    console.log("=== KIỂM TRA CHUYỂN BƯỚC 2 ===");
    console.log("Booking data:", bookingData);

    if (!bookingData.movie) {
      alert("Vui lòng chọn phim trước khi tiếp tục!");
      console.log("⌛ CHƯA CHỌN PHIM");
      return;
    }
    if (!bookingData.date) {
      alert("Vui lòng chọn ngày chiếu!");
      console.log("⌛ CHƯA CHỌN NGÀY");
      return;
    }
    if (!bookingData.time) {
      alert("Vui lòng chọn suất chiếu!");
      console.log("⌛ CHƯA CHỌN GIỜ");
      return;
    }

    console.log("✅ ĐỦ ĐIỀU KIỆN - CHUYỂN BƯỚC 2");
    changeStep(2);
  });

  // === KHỞI TẠO BAN ĐẦU ===
  console.log("=== KHỞI TẠO BAN ĐẦU ===");
  updateMoviesByDate(todayString);

  // === BƯỚC 2: CHỌN GHẾ ===
  seats.forEach((seat) => {
    seat.addEventListener("click", function () {
      if (this.classList.contains("occupied")) {
        alert("Ghế này đã được đặt!");
        return;
      }

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

      console.log("Ghế đã chọn:", bookingData.seats);
    });
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

  // === BƯỚC 3: THANH TOÁN ===
  paymentMethods.forEach((method) => {
    method.addEventListener("click", function () {
      paymentMethods.forEach((m) => m.classList.remove("selected"));
      this.classList.add("selected");
      bookingData.paymentMethod = this.getAttribute("data-method");
    });
  });

  const backToStep2Buttons = document.querySelectorAll("#to-step2");
  backToStep2Buttons.forEach((button) => {
    button.addEventListener("click", function () {
      changeStep(2);
    });
  });

  document
    .getElementById("confirm-payment")
    .addEventListener("click", function () {
      if (!bookingData.paymentMethod) {
        alert("Vui lòng chọn phương thức thanh toán!");
        return;
      }

      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
      if (!loggedInUser) {
        alert("Vui lòng đăng nhập để hoàn tất đặt vé!");
        window.location.href = "/dangKi-dangNhap/dang_nhap.html";
        return;
      }

      processPayment(loggedInUser);
    });

  // === HÀM HỖ TRỢ ===
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

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateSummary() {
    document.getElementById("summary-movie").textContent =
      bookingData.movieTitle;

    const selectedDate = new Date(bookingData.date);
    const formattedDate = selectedDate.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    document.getElementById(
      "summary-time"
    ).textContent = `${formattedDate} - ${bookingData.time}`;

    const seatIds = bookingData.seats.map((seat) => seat.id);
    document.getElementById("summary-seats").textContent = seatIds.join(", ");

    let normalCount = 0;
    let vipCount = 0;
    let familyCount = 0;

    bookingData.seats.forEach((seat) => {
      if (seat.type === "normal") normalCount++;
      else if (seat.type === "vip") vipCount++;
      else if (seat.type === "family") familyCount++;
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

  function processPayment(user) {
    const bookingCode = "UTC" + Date.now().toString().slice(-8);

    let normalCount = 0;
    let vipCount = 0;
    let familyCount = 0;

    bookingData.seats.forEach((seat) => {
      if (seat.type === "normal") normalCount++;
      else if (seat.type === "vip") vipCount++;
      else if (seat.type === "family") familyCount++;
    });

    const totalPrice =
      normalCount * PRICES.normal +
      vipCount * PRICES.vip +
      familyCount * PRICES.family;

    const booking = {
      bookingCode,
      user: user.email,
      userName: user.name,
      movie: bookingData.movieTitle,
      date: bookingData.date,
      showtime: bookingData.time,
      seats: bookingData.seats.map((s) => s.id),
      totalPrice,
      paymentMethod: bookingData.paymentMethod,
      bookingDate: new Date().toLocaleString("vi-VN"),
      status: "Đã thanh toán",
    };

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert(
      `🎉 ĐẶT VÉ THÀNH CÔNG! 🎉\n\n` +
        `Mã đặt vé: ${bookingCode}\n` +
        `Phim: ${bookingData.movieTitle}\n` +
        `Ngày: ${bookingData.date}\n` +
        `Suất chiếu: ${bookingData.time}\n` +
        `Ghế: ${bookingData.seats.map((s) => s.id).join(", ")}\n` +
        `Tổng tiền: ${totalPrice.toLocaleString("vi-VN")} VNĐ\n\n` +
        `Vui lòng đến quầy vé với mã này để nhận vé!`
    );

    resetBooking();
    setTimeout(() => {
      window.location.href = "/menu.html";
    }, 1000);
  }

  function resetBooking() {
    bookingData = {
      movie: null,
      movieTitle: "",
      date: todayString,
      time: timeSelect.value,
      seats: [],
      paymentMethod: null,
    };

    movieOptions.forEach((m) => {
      m.classList.remove("selected");
      m.style.backgroundColor = "";
      m.style.border = "";
    });
    seats.forEach((s) => s.classList.remove("selected"));
    paymentMethods.forEach((m) => m.classList.remove("selected"));
    datePicker.value = todayString;
  }

  // === XỬ LÝ ĐĂNG NHẬP ===
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  const headerRight = document.querySelector(".header-right");

  if (loggedInUser && headerRight) {
    headerRight.innerHTML = `
      <a href="#" style="color: yellow;">Xin chào, ${loggedInUser.name}</a>
      <span>|</span>
      <a href="#" id="logout-button">Đăng xuất</a>
    `;

    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
      logoutButton.addEventListener("click", (event) => {
        event.preventDefault();
        sessionStorage.removeItem("loggedInUser");
        alert("Đã đăng xuất.");
        window.location.href = "../menu.html";
      });
    }
  }

  window.addEventListener("beforeunload", (e) => {
    if (bookingData.seats.length > 0 || bookingData.movie) {
      e.preventDefault();
      e.returnValue = "";
    }
  });

  console.log("=== KẾT THÚC KHỞI TẠO ===");
});

// === XỬ LÝ ĐĂNG NHẬP ===
const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
const headerRight = document.querySelector(".header-right");

if (loggedInUser && headerRight) {
  headerRight.innerHTML = `
      <a href="#" style="color: yellow;">Xin chào, ${loggedInUser.name}</a>
      <span>|</span>
      <a href="#" id="logout-button">Đăng xuất</a>
    `;

  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      sessionStorage.removeItem("loggedInUser");
      alert("Đã đăng xuất.");
      window.location.href = "../menu.html";
    });
  }
}

// === CẢNH BÁO KHI RỜI TRANG ===
window.addEventListener("beforeunload", (e) => {
  if (bookingData.seats.length > 0 || bookingData.movie) {
    e.preventDefault();
    e.returnValue = "";
  }
});
