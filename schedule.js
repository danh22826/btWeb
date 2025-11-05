/* schedule.js - UTC Cinema | Lịch chiếu
   Giao diện giống BHD Star, hoạt động theo ngày, rạp, định dạng và thể loại.
*/

/* --- Dữ liệu phim (đầy đủ bạn cung cấp) --- */
const MOVIES = [
  { id: "conan", title: "Thám Tử Lừng Danh Conan", poster: "/New folder/conan.jpg", start: "30/10/2025", end: "02/11/2025", times: ["09:00", "13:30", "18:00", "21:00"] },
  { id: "lord", title: "Lord of Mysteries", poster: "New folder/lotm.jpg", start: "30/10/2025", end: "04/11/2025", times: ["08:30", "12:45", "17:00", "20:15"] },
  { id: "grandma", title: "CỤC VÀNG CỦA BÀ", poster: "/New folder/grandma.jpg", start: "30/10/2025", end: "08/11/2025", times: ["09:00", "13:30", "18:00", "22:00"] },
  { id: "GiaiMa", title: "CẢI MÃ", poster: "/New folder/caima.jpg", start: "30/10/2025", end: "10/11/2025", times: ["09:00", "13:30", "18:00", "21:00"] },
  { id: "MucSu", title: "MỤC SƯ, THẦY ĐỒ VÀ CON QUỶ ÂM TRÌ", poster: "/New folder/thaymuc.jpg", start: "30/10/2025", end: "07/11/2025", times: ["09:00", "13:30", "18:00", "21:00"] },
  { id: "KhongChien", title: "TỬ CHIẾN TRÊN KHÔNG", poster: "/New folder/sky.jpg", start: "30/10/2025", end: "06/11/2025", times: ["09:00", "13:30", "18:00", "21:00"] },
  { id: "NhatNiem", title: "NHẤT NIỆM VĨNH HẰNG", poster: "/New folder/btt.jpg", start: "30/10/2025", end: "06/11/2025", times: ["09:00", "13:30", "18:00", "21:00"] },
  { id: "OPM", title: "One PUNCH MAN", poster: "/New folder/onepunch.jpg", start: "30/10/2025", end: "10/11/2025", times: ["09:00", "13:30", "18:00", "21:00"] },
  { id: "ToQuoc", title: "TỔ QUỐC TRONG TIM: THE CONCERT FILM", poster: "/New folder/VIETNAM.jpg", start: "30/10/2025", end: "12/11/2025", times: ["09:00", "13:30", "18:00", "21:00"] },
  { id: "NhaMa", title: "NHÀ MA XÓ", poster: "/New folder/ma.jpg", start: "30/10/2025", end: "05/11/2025", times: ["09:00", "13:30", "18:00", "21:00"] },
  { id: "BiMat", title: "BÍ MẬT SAU BỮA TIỆC", poster: "/New folder/BM.jpg", start: "30/10/2025", end: "12/11/2025", times: ["09:00", "13:30", "18:00", "21:00"] },
  { id: "BlackPhone", title: "ĐIỆN THOẠI ĐEN 2", poster: "New folder/dt.jpg", start: "30/10/2025", end: "04/11/2025", times: ["09:00", "13:30", "18:00", "21:00"] },
  { id: "ThayCung", title: "CHÚ THUẬT HỒI CHIẾN: THE MOVIE", poster: "New folder/jjk.jpg", start: "30/10/2025", end: "03/11/2025", times: ["09:00", "13:30", "18:00", "21:00"] },
  { id: "QuyCua", title: "CHAINSAW MAN - THE MOVIE: CHƯƠNG REZE", poster: "New folder/chainsaw.jpg", start: "30/10/2025", end: "02/11/2025", times: ["09:00", "13:30", "18:00", "21:00"] },
  { id: "Gio", title: "GIÓ VẪN THỔI", poster: "New folder/wind.jpg", start: "30/10/2025", end: "09/11/2025", times: ["09:00", "13:30", "18:00", "21:00"] },
  { id: "GODZILLA", title: "GODZILLA MINUS ONE", poster: "/New folder/godzilla.jpg", start: "03/11/2025", end: "12/11/2025", times: ["09:00", "13:30", "18:00", "21:00"] },
  { id: "PhiVu", title: "PHI VỤ ĐỘNG TRỜI 2", poster: "/New folder/zooTopia.jpg", start: "02/11/2025", end: "13/11/2025", times: ["09:00", "13:30", "18:00", "21:00"] },
  { id: "War", title: "TRẬN CHIẾN SAU TRẬN CHIẾN", poster: "/New folder/final.jpg", start: "07/11/2025", end: "13/11/2025", times: ["09:00", "13:30", "18:00", "21:00"] },
  { id: "SPONGEBOB", title: "SPONGEBOB: LỜI NGUYỀN HẢI TẶC", poster: "/New folder/spongbob.jpg", start: "06/11/2025", end: "13/11/2025", times: ["09:00", "13:30", "18:00", "21:00"] },
  { id: "WICKED", title: "WICKED: PHẦN 2", poster: "/New folder/wicked.jpg", start: "04/11/2025", end: "12/11/2025", times: ["09:00", "13:30", "18:00", "21:00"] },
  { id: "assasin", title: "SÁT THỦ LƯỠI KÉO", poster: "/New folder/sisor.jpg", start: "02/11/2025", end: "10/11/2025", times: ["09:00", "13:30", "18:00", "21:00"] },
  { id: "NguHanh", title: "VỤ SƠN NGŨ HÀNH", poster: "/New folder/6hanh.jpg", start: "03/11/2025", end: "15/11/2025", times: ["09:00", "13:30", "18:00", "21:00"] },
];


const THEATERS = [
  { id: 'utc-a', name: 'UTC Cinema - Trung tâm', addr: 'Tầng 3, UTC Mall' },
  { id: 'utc-b', name: 'UTC Cinema - Cơ sở B', addr: '87 Nguyễn Lương Bằng' },
  { id: 'utc-c', name: 'UTC Cinema - Cơ sở C', addr: 'Số 12, Quận 1' }
];

function parseDMY(dmy){ const [d,m,y]=dmy.split('/').map(Number); return new Date(y,m-1,d); }
function isBetween(date,start,end){ return date>=start && date<=end; }
function formatDeviceDate(d){ return new Intl.DateTimeFormat('vi-VN',{weekday:'short',day:'2-digit',month:'2-digit',year:'numeric'}).format(d); }

const deviceDateSpan=document.getElementById('device-date');
const theaterSelect=document.getElementById('theater-select');
const dateStrip=document.getElementById('date-strip');
const moviesList=document.getElementById('movies-list');

const today=new Date();
deviceDateSpan.textContent=formatDeviceDate(today);
const DATES=Array.from({length:15},(_,i)=>new Date(today.getFullYear(),today.getMonth(),today.getDate()+i));

THEATERS.forEach(t=>{
  const opt=document.createElement('option');
  opt.value=t.id; opt.textContent=t.name;
  theaterSelect.appendChild(opt);
});

function renderMoviesForDate(date){
  moviesList.innerHTML='';
  const matches=MOVIES.filter(m=>isBetween(date,parseDMY(m.start),parseDMY(m.end)));
  if(!matches.length){moviesList.innerHTML='<div class="no-data card">Không có suất chiếu cho ngày này.</div>';return;}
  matches.forEach(m=>{
    const item=document.createElement('div');
    item.className='movie-item';
    item.innerHTML=`
      <div class="movie-poster"><img src="${m.poster}" alt="${m.title}"></div>
      <div class="movie-info">
        <div class="movie-title">${m.title}</div>
        <div class="movie-meta">2D • Phim hành động</div>
        <div class="theater-row">
          ${m.times.map(t=>`<button class="time-btn">${t}</button>`).join('')}
        </div>
      </div>`;
    moviesList.appendChild(item);
  });
}

function buildDateStrip(){
  DATES.forEach((d,i)=>{
    const btn=document.createElement('button');
    btn.className='date-button';
    btn.innerHTML=`<span>${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}</span>`;
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.date-button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderMoviesForDate(d);
    });
    dateStrip.appendChild(btn);
  });
  dateStrip.firstChild.classList.add('active');
}
buildDateStrip();
renderMoviesForDate(today);
