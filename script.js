// ==================== DARK MODE TOGGLE ====================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });
}

// ==================== MODAL MATERI ====================
function showMateri(id) {
  const modal = document.getElementById('materiModal');
  const modalBody = document.getElementById('modal-body');
  
  let content = '';

  switch(id) {
    case 1:
      content = `
        <h2>🔤 1. Simple Present Tense</h2>
        <p><strong>Rumus:</strong> Subject + Verb 1 (+ s/es untuk He/She/It)</p>
        <h3>Penggunaan:</h3>
        <ul>
          <li>Kebiasaan sehari-hari</li>
          <li>Fakta umum atau kebenaran</li>
          <li>Jadwal tetap</li>
        </ul>
        <h3>Contoh Kalimat:</h3>
        <p>• I eat rice every day.<br>
           • She works in a bank.<br>
           • The sun rises in the east.<br>
           • We study English at campus every morning.</p>
        <p><strong>Catatan Penting:</strong> He, She, It menggunakan kata kerja + s/es (goes, works, studies)</p>
      `;
      break;

    case 2:
      content = `
        <h2>🗣️ 2. Daily Conversation</h2>
        <h3>1. Greeting (Salam)</h3>
        <p><strong>A:</strong> Good morning! How are you today?<br>
           <strong>B:</strong> I'm great, thank you. And you?</p>
        <h3>2. Introduction (Perkenalan)</h3>
        <p><strong>A:</strong> Hi, my name is Nathan. Nice to meet you.<br>
           <strong>B:</strong> Nice to meet you too. I'm Rina.</p>
        <h3>3. Other Useful Phrases</h3>
        <p>• How's it going?<br>
           • See you later!<br>
           • Thank you very much.<br>
           • You're welcome.<br>
           • I'm sorry I'm late.</p>
      `;
      break;

    case 3:
      content = `
        <h2>📝 3. Vocabulary Builder</h2>
        <p><strong>Kosakata Dasar yang Sering Digunakan:</strong></p>
        <table width="100%" style="border-collapse: collapse; margin-top: 15px;">
          <tr><th>English</th><th>Indonesia</th></tr>
          <tr><td>Beautiful</td><td>Indah / Cantik</td></tr>
          <tr><td>Happy</td><td>Senang / Bahagia</td></tr>
          <tr><td>Difficult</td><td>Sulit</td></tr>
          <tr><td>Important</td><td>Penting</td></tr>
          <tr><td>Interesting</td><td>Menarik</td></tr>
          <tr><td>Brilliant</td><td>Hebat / Cerdas</td></tr>
          <tr><td>Exhausted</td><td>Sangat lelah</td></tr>
          <tr><td>Amazing</td><td>Luar biasa</td></tr>
        </table>
      `;
      break;

    case 4:
      content = `
        <h2>❓ 4. WH Questions (Question Words)</h2>
        <p><strong>Penggunaan dan Contoh:</strong></p>
        <ul>
          <li><strong>What</strong> = Apa → What is your name?</li>
          <li><strong>Where</strong> = Di mana → Where do you live?</li>
          <li><strong>When</strong> = Kapan → When is your birthday?</li>
          <li><strong>Who</strong> = Siapa → Who is your teacher?</li>
          <li><strong>Why</strong> = Mengapa → Why are you late?</li>
          <li><strong>How</strong> = Bagaimana → How are you today?</li>
        </ul>
      `;
      break;
  }

  modalBody.innerHTML = content;
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById('materiModal');
  if (modal) modal.style.display = "none";
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('materiModal');
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// ==================== QUIZ SYSTEM ====================
let currentQuestion = 0;
let score = 0;
let timerInterval;
let timeLeft = 900;

const questions = [
  { question: "What is the correct form: 'She ___ to school every day'?", options: ["go", "goes", "going", "went"], answer: 1 },
  { question: "Which sentence is grammatically correct?", options: ["I am study English now.", "I studying English now.", "I am studying English now.", "I study English now."], answer: 2 },
  { question: "What does 'Beautiful' mean?", options: ["Buruk", "Indah", "Cepat", "Lambat"], answer: 1 },
  { question: "How do you say 'Terima kasih' in English?", options: ["Please", "Thank you", "Sorry", "Welcome"], answer: 1 },
  { question: "'Where ___ you from?'", options: ["is", "am", "are", "be"], answer: 2 },
  { question: "___ is your name?", options: ["What", "Where", "When", "Why"], answer: 0 },
  { question: "Opposite of 'Happy' is ...", options: ["Sad", "Big", "Fast", "Tall"], answer: 0 },
  { question: "I ___ born in 2005.", options: ["was", "were", "am", "is"], answer: 0 },
  { question: "Which one is a greeting?", options: ["Goodbye", "Good morning", "Thank you", "Sorry"], answer: 1 },
  { question: "It's ___ o'clock.", options: ["two", "to", "too", "too much"], answer: 0 }
];

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  timeLeft = 900;
  
  const startScreen = document.getElementById('start-screen');
  const quizScreen = document.getElementById('quiz-screen');
  
  if (startScreen) startScreen.classList.remove('active');
  if (quizScreen) quizScreen.classList.add('active');
  
  document.getElementById('current-score').textContent = '0';
  
  startTimer();
  showQuestion();
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    const timeEl = document.getElementById('time');
    if (timeEl) timeEl.textContent = timeLeft;
    
    if (timeLeft <= 60) {
      const timerEl = document.querySelector('.timer');
      if (timerEl) timerEl.style.color = '#f87171';
    }
    if (timeLeft <= 0) endQuiz();
  }, 1000);
}

function showQuestion() {
  const q = questions[currentQuestion];
  
  document.getElementById('question-number').textContent = `${currentQuestion + 1}/${questions.length}`;
  document.getElementById('question-text').innerHTML = `<strong>${q.question}</strong>`;

  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';

  q.options.forEach((option, index) => {
    const div = document.createElement('div');
    div.className = 'option';
    div.textContent = option;
    div.onclick = () => selectAnswer(index, div);
    optionsDiv.appendChild(div);
  });

  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('feedback').style.display = 'none';
}

function selectAnswer(selectedIndex, element) {
  const q = questions[currentQuestion];
  const options = document.querySelectorAll('.option');
  
  options.forEach(opt => opt.style.pointerEvents = 'none');

  options.forEach((opt, idx) => {
    if (idx === q.answer) {
      opt.style.borderColor = '#4ade80';
      opt.style.backgroundColor = 'rgba(74, 222, 128, 0.3)';
    }
    if (idx === selectedIndex && selectedIndex !== q.answer) {
      opt.style.borderColor = '#f87171';
    }
  });

  if (selectedIndex === q.answer) {
    score++;
    const scoreEl = document.getElementById('current-score');
    if (scoreEl) scoreEl.textContent = score;
    showFeedback(true);
  } else {
    showFeedback(false);
  }

  document.getElementById('next-btn').style.display = 'block';
}

function showFeedback(isCorrect) {
  const feedbackDiv = document.getElementById('feedback');
  feedbackDiv.style.display = 'flex';
  
  if (isCorrect) {
    feedbackDiv.className = 'feedback correct';
    feedbackDiv.innerHTML = `✅ Jawaban Benar!`;
  } else {
    feedbackDiv.className = 'feedback incorrect';
    feedbackDiv.innerHTML = `❌ Jawaban Salah`;
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

// ==================== END QUIZ + SAVE TO LEADERBOARD ====================
function endQuiz() {
  clearInterval(timerInterval);
  
  document.getElementById('quiz-screen').classList.remove('active');
  document.getElementById('result-screen').classList.add('active');
  
  const percentage = Math.round((score / questions.length) * 100);
  document.getElementById('score').textContent = score;
  
  let message = percentage >= 80 ? "🎉 Excellent! Kamu Luar Biasa!" :
                percentage >= 60 ? "👍 Good Job! Terus Semangat!" : 
                "💪 Jangan Menyerah! Masih Bisa Lebih Baik";

  document.getElementById('result-message').innerHTML = `<strong>${message}</strong><br>Nilai kamu: <strong>${percentage}%</strong>`;

  // Simpan ke Leaderboard
  const playerName = prompt("🎉 Quiz Selesai!\nMasukkan nama kamu untuk Leaderboard:", "Nama Kamu");
  
  if (playerName && playerName.trim() !== "") {
    saveScore(playerName.trim(), score);
  } else {
    saveScore("Anonymous", score);
  }
}

function restartQuiz() {
  document.getElementById('result-screen').classList.remove('active');
  document.getElementById('start-screen').classList.add('active');
}

// ==================== DAILY WORD ====================
function getDailyWord() {
  const words = [
    { word: "Serendipity", meaning: "Menemukan sesuatu yang baik secara tidak sengaja", example: "Meeting her was pure serendipity." },
    { word: "Baca ini", meaning: "Kuat dan cepat pulih dari kesulitan", example: "She is a resilient student." },
    { word: "Eloquent", meaning: "Pandai berbicara dengan fasih", example: "He gave an eloquent speech." },
    { word: "Immerse", meaning: "Mencelupkan diri sepenuhnya", example: "Immerse yourself in English." },
    { word: "Perseverance", meaning: "Ketabahan dan kegigihan", example: "Perseverance is key to success." }
  ];

  const today = new Date().toDateString();
  const savedDate = localStorage.getItem('dailyWordDate');
  
  let dailyData;

  if (savedDate === today) {
    dailyData = JSON.parse(localStorage.getItem('dailyWordData'));
  } else {
    dailyData = words[Math.floor(Math.random() * words.length)];
    localStorage.setItem('dailyWordDate', today);
    localStorage.setItem('dailyWordData', JSON.stringify(dailyData));
  }

  document.getElementById('daily-word').textContent = dailyData.word;
  document.getElementById('daily-meaning').textContent = dailyData.meaning;
  document.getElementById('daily-example').textContent = dailyData.example;
}

function speakWord() {
  const word = document.getElementById('daily-word').textContent;
  const meaning = document.getElementById('daily-meaning').textContent;
  const example = document.getElementById('daily-example').textContent;

  const fullText = `${word}. ${meaning}. Contoh: ${example}`;

  const utterance = new SpeechSynthesisUtterance(fullText);
  utterance.lang = 'en-US';        // Pengucapan bahasa Inggris
  utterance.rate = 0.95;           // Kecepatan sedang
  utterance.pitch = 1.0;

  speechSynthesis.speak(utterance);
}

// ==================== LEADERBOARD ====================
function saveScore(playerName, finalScore) {
  let scores = JSON.parse(localStorage.getItem('leaderboard')) || [];
  
  scores.push({
    name: playerName,
    score: finalScore,
    date: new Date().toLocaleDateString('id-ID')
  });

  scores.sort((a, b) => b.score - a.score);
  scores = scores.slice(0, 10);

  localStorage.setItem('leaderboard', JSON.stringify(scores));
  displayLeaderboard();
}

function displayLeaderboard() {
  const list = document.getElementById('leaderboard-list');
  let scores = JSON.parse(localStorage.getItem('leaderboard')) || [];

  let html = '<h3>🏆 Top 10 Pemain</h3>';

  if (scores.length === 0) {
    html += '<p>Belum ada skor. Jadilah yang pertama!</p>';
  } else {
    scores.forEach((item, index) => {
      html += `
        <div class="leader-item">
          <span><span class="rank">#${index + 1}</span> ${item.name}</span>
          <span><strong>${item.score}</strong> pts</span>
        </div>
      `;
    });
  }

  list.innerHTML = html;
}

// Load data saat halaman dibuka
window.onload = function() {
  getDailyWord();
  displayLeaderboard();
};

// ==================== FLASHCARD SYSTEM ====================
let currentCardIndex = 0;

const flashcards = [
  { 
    word: "Resilient", 
    meaning: "Tangguh dan cepat pulih dari kesulitan", 
    example: "She is a resilient student who never gives up." 
  },
  { 
    word: "Serendipity", 
    meaning: "Menemukan hal baik secara tidak sengaja", 
    example: "Our meeting was pure serendipity." 
  },
  { 
    word: "Eloquent", 
    meaning: "Pandai dan fasih berbicara", 
    example: "He is an eloquent speaker." 
  },
  { 
    word: "Immerse", 
    meaning: "Mencelupkan diri sepenuhnya", 
    example: "You should immerse yourself in English every day." 
  },
  { 
    word: "Perseverance", 
    meaning: "Ketekunan dan kegigihan", 
    example: "Perseverance is the key to success." 
  },
  { 
    word: "Empathy", 
    meaning: "Empati, kemampuan memahami perasaan orang lain", 
    example: "She has great empathy for others." 
  },
  { 
    word: "Nostalgia", 
    meaning: "Rasa rindu pada masa lalu", 
    example: "Listening to old songs brings nostalgia." 
  },
  { 
    word: "Ubiquitous", 
    meaning: "Ada di mana-mana", 
    example: "Smartphones are ubiquitous in modern life." 
  },
  { 
    word: "Tenacious", 
    meaning: "Gigih dan tidak mudah menyerah", 
    example: "His tenacious spirit inspired everyone." 
  },
  { 
    word: "Effervescent", 
    meaning: "Penuh semangat dan ceria", 
    example: "Her effervescent personality lights up the room." 
  },
  { 
    word: "Serenity", 
    meaning: "Ketenangan dan kedamaian", 
    example: "I love the serenity of the beach." 
  },
  { 
    word: "Brilliant", 
    meaning: "Sangat cerdas atau luar biasa", 
    example: "That's a brilliant idea!" 
  }
];

function loadFlashcard() {
  const card = flashcards[currentCardIndex];
  
  document.getElementById('word').textContent = card.word;
  document.getElementById('meaning').textContent = card.meaning;
  document.getElementById('example').textContent = card.example;
  document.getElementById('progress-text').textContent = `${currentCardIndex + 1} / ${flashcards.length}`;
  
  // Reset flip setiap ganti kartu
  document.getElementById('flashcard').classList.remove('flipped');
}

function flipCard() {
  document.getElementById('flashcard').classList.toggle('flipped');
}

function nextCard() {
  currentCardIndex = (currentCardIndex + 1) % flashcards.length;
  loadFlashcard();
}

function prevCard() {
  currentCardIndex = (currentCardIndex - 1 + flashcards.length) % flashcards.length;
  loadFlashcard();
}

// Inisialisasi Flashcard
document.addEventListener('DOMContentLoaded', () => {
  const flashcard = document.getElementById('flashcard');
  if (flashcard) {
    flashcard.addEventListener('click', flipCard);
    loadFlashcard();
  }
});

// ================= ABOUT PAGE ANIMATION =================

document.addEventListener('DOMContentLoaded', () => {

  const cards = document.querySelectorAll('.about-card');

  cards.forEach((card, index) => {

    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';

    setTimeout(() => {
      card.style.transition = '0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 200);

  });

});

// ==================== DARK MODE TOGGLE (Pastikan ini ada) ====================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });
}

// ==================== ABOUT PAGE - Optional (kalau mau tambah animasi) ====================
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll untuk link internal (opsional)
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});