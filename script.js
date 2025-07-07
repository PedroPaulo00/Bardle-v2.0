const audioPlayer = document.getElementById('audioPlayer');
const lyricDisplay = document.getElementById('lyric');
const timerDisplay = document.getElementById('timer');
const optionsContainer = document.getElementById('options');
const feedbackDisplay = document.getElementById('feedback');
const pauseButton = document.getElementById('pauseButton');
const nextButton = document.getElementById('nextButton');
const songInfo = document.getElementById('songInfo');
const songTitle = document.getElementById('songTitle');
const songGenres = document.getElementById('songGenres');
const songDate = document.getElementById('songDate');
const songAlbum = document.getElementById('songAlbum');
const artistImage = document.getElementById('artistImage');
const artistName = document.getElementById('artistName');
const songImage = document.getElementById('songImage');
const progressBars = document.getElementById('progressBars');
const partialScoreDisplay = document.getElementById('partialScore');
const gameContainer = document.getElementById('gameContainer');
const startButton = document.getElementById('startButton');
const pausePopup = document.getElementById('pausePopup');
const resumeButton = document.getElementById('resumeButton');
const gameOverPopup = document.getElementById('gameOverPopup');
const finalScoreDisplay = document.getElementById('finalScore');
const correctAnswersDisplay = document.getElementById('correctAnswers');
const incorrectAnswersDisplay = document.getElementById('incorrectAnswers');
const restartButton = document.getElementById('restartButton');
const themeToggleButton = document.getElementById('themeToggleButton');
const heroSection = document.getElementById('hero');
const benefitsSection = document.getElementById('benefits');
const testimonialsSection = document.getElementById('testimonials');
const ctaSection = document.getElementById('cta-form'); 
const signupForm = document.getElementById('signupForm');
const formMessage = document.getElementById('formMessage');
const navLinks = document.querySelector('.nav-links');
const logoLink = document.getElementById('logoLink');

let currentSongIndex = 0;
let score = 0;
let partialScore = 0;
let timeLeft = 0;
let timer;
let startTime;
let isPaused = false;
let correctGuesses = 0;
let incorrectGuesses = 0;
const totalQuestions = 10;
let gameActive = false;

//data de hoje
document.getElementById('current-date').textContent =
    new Date().toLocaleDateString('pt-BR');

//musicas
const songs = [
    {
        artist: 'Sleep Theory',
        artistImage: 'https://i.scdn.co/image/ab6761610000517434577c2bdff9becc8e201bc4',
        title: 'Gravity',
        src: 'musics/gravity.mp3',
        cover: 'https://i1.sndcdn.com/artworks-xsRMR29OX1rz-0-t500x500.png',
        genres: 'Alt-Rock, Post-Hardcore, R&B',
        date: '2025-05-16',
        album: 'Afterglow',
        duration: 20,
        options: ['Gravity', 'Parasite', 'Hourglass', 'Afterglow'],
        answeredCorrectly: null
    },
    {
        artist: 'Phoebe Bridgers',
        artistImage: 'https://i.scdn.co/image/ab6761610000e5eb626686e362d30246e816cc5b',
        title: 'Kyoto',
        src: 'musics/kyoto.mp3',
        cover: 'https://i1.sndcdn.com/artworks-P0vWMHmNWnSZ-0-t500x500.jpg',
        genres: 'Indie Rock, Pop Rock, Grunge',
        date: '2020-04-09',
        album: 'Punisher',
        duration: 20,
        options: ['Kyoto', 'Savior Complex', 'I Know The End', 'Moon Song'],
        answeredCorrectly: null
    },
    {
        artist: 'Sleep Token',
        artistImage: 'https://i.scdn.co/image/ab67616100005174d00c2ff422829437e6b5f1e0',
        title: 'Caramel',
        src: 'musics/caramel.mp3',
        cover: 'https://t2.genius.com/unsafe/300x300/https%3A%2F%2Fimages.genius.com%2F3fdee75365e67d6638d96e0c38a8a4fe.1000x1000x1.png',
        genres: 'Progressive Metal, Alt-R&B, Reggaeton',
        date: '2023-04-04',
        album: 'Even in Arcadia',
        duration: 20,
        options: ['Damocles', 'Caramel', 'Emergence', 'Past Self'],
        answeredCorrectly: null
    },
    {
        artist: 'Linkin Park',
        artistImage: 'https://akamai.sscdn.co/uploadfile/letras/fotos/3/8/9/e/389e7b11ac1b7eb0f6cf5a737c22feff.jpg',
        title: 'Up From The Bottom',
        src: 'musics/up from the bottom.mp3',
        cover: 'https://i.scdn.co/image/ab67616d0000b273d9de81090bd9699c9d36696e',
        genres: 'Nu Metal, Rap Rock, Pop Punk',
        date: '2025-03-27',
        album: 'From Zero (Deluxe Edition)',
        duration: 20,
        options: ['Up From The Bottom', 'Cut The Bridge', 'Two Faced', 'Heavy is The Crown'],
        answeredCorrectly: null
    },
    {
        artist: 'Balu Brigada',
        artistImage: 'https://substackcdn.com/image/fetch/$s_!tFgk!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9dcea577-73dd-4221-816e-1086f62c6ce1_1199x1163.jpeg',
        title: 'So Cold',
        src: 'musics/so cold.mp3',
        cover: 'https://i1.sndcdn.com/artworks-9S6OYHduVlQB-0-t500x500.jpg',
        genres: 'Indie Pop, Alt-Rock, Alt-R&B',
        date: '2024-01-25',
        album: 'Single',
        duration: 20,
        options: ['So Cold', 'Designer', 'Moon Man', 'Backseat'],
        answeredCorrectly: null
    },
    {
        artist: 'Thirty Seconds to Mars',
        artistImage: 'https://i.scdn.co/image/ab6761610000e5eb5307a8a358283efe769d9c2a',
        title: 'A Beautiful Lie',
        src: 'musics/a beautiful lie.mp3',
        cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDjsyJXfWHxJH3SvlrAodatV0wzKtIdSGINw&s',
        genres: 'Alternative Rock, Post-Hardcore, Post-Grunge',
        date: '2005-08-17',
        album: 'A Beautiful Lie',
        duration: 20,
        options: ['A Beautiful Lie', 'The Kill', 'From Yesterday', 'Attack'],
        answeredCorrectly: null
    },
    {
        artist: 'Twenty One Pilots',
        artistImage: 'https://nosmallthing82509953.wordpress.com/wp-content/uploads/2018/10/99368938579c64997f1bd33b0b8d5e9c1.jpg',
        title: 'The Hype',
        src: 'musics/the hype.mp3',
        cover: 'https://i.scdn.co/image/ab67616d0000b273d1d301e737da4324479c6660',
        genres: 'Pop Rock , Alt-Pop, Indie Pop',
        date: '2019-07-02',
        album: 'Trench',
        duration: 20,
        options: ['The Hype', 'Nico and The Niners', 'Bandito', 'Chlorine'],
        answeredCorrectly: null
    },
    {
        artist: 'Paramore',
        artistImage: 'https://townsquare.media/site/366/files/2022/11/attachment-Paramore-Paramore-Album-Artwork.jpg?w=720&q=75',
        title: 'crushcrushcrush',
        src: 'musics/crushcrushcrush.mp3',
        cover: 'https://i.scdn.co/image/ab67616d0000b27369966efa45b125ed6711b43c',
        genres: 'Pop Punk, Alt-Rock, Emo',
        date: '2008-01-23',
        album: 'Riot!',
        duration: 20,
        options: ['crushcrushcrush', 'Misery Business', 'Hard Times', 'Thats What You Get'],
        answeredCorrectly: null
    },
    {
        artist: 'Arctic Monkeys',
        artistImage: 'https://i.scdn.co/image/ab6761610000e5eb7da39dea0a72f581535fb11f',
        title: '505',
        src: 'musics/505.mp3',
        cover: 'https://i.scdn.co/image/ab67616d0000b2730c8ac83035e9588e8ad34b90',
        genres: 'Indie Rock, Alt-Rock, Garage Rock',
        date: '2007-04-23',
        album: 'Favourite Worst Nightmare',
        duration: 20,
        options: ['505', 'Do I Wanna Know?', 'R U Mine?', 'I Wanna Be Yours'],
        answeredCorrectly: null
    },
    {
        artist: 'Radiohead',
        artistImage: 'https://i.scdn.co/image/ab6761610000e5eba03696716c9ee605006047fd',
        title: 'No Surprises',
        src: 'musics/no surprises.mp3',
        cover: 'https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856',
        genres: 'Alternative Rock, Art Rock, Post-Rock',
        date: '1997-12-10',
        album: 'OK Computer',
        duration: 20,
        options: ['No Surprises', 'Creep', 'Karma Police', 'Exit Music (For A Film)'],
        answeredCorrectly: null
    }
];

//sortear musicas
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        ([array[i], array[j]] = [array[j], array[i]]);
    }
    return array;
}

//trocar tema claro e escuro
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLightTheme = document.body.classList.contains('light-theme');
    themeToggleButton.textContent = isLightTheme ? '🌙' : '☀️';
    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
}

//aplica o tema salvo ao carregar a página
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggleButton.textContent = '🌙';
    } else {
        document.body.classList.remove('light-theme');
        themeToggleButton.textContent = '☀️';
    }
}

//rolar para o topo da página
document.getElementById('scrollToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

//começar o jogo
function startGame() {
    gameActive = true;
    //oulta as seções da landing page
    heroSection.style.display = 'none';
    benefitsSection.style.display = 'none';
    testimonialsSection.style.display = 'none';
    ctaSection.style.display = 'none'; // Esconde toda a seção CTA, incluindo o h2 e formulário
    
    //mostra o container do jogo
    gameContainer.style.display = 'flex';
    pauseButton.style.display = 'block';
    
    //esconde os links de navegação na header
    navLinks.classList.add('hidden');
    
    //adiciona a classe para o background do jogo
    document.body.classList.add('game-background');
    
    shuffle(songs);
    currentSongIndex = 0;
    isPaused = false;
    loadQuestion();   
}

//carregar a pergunta
function loadQuestion() {
    if (currentSongIndex >= totalQuestions) {
        endGame();
        return;
    }

    const song = songs[currentSongIndex];
    audioPlayer.src = song.src;
    audioPlayer.currentTime = 0;

    if (gameActive && !isPaused) {
        audioPlayer.play().catch(e => console.log("Erro ao tocar áudio:", e));
    }

    lyricDisplay.textContent = 'Qual o nome da música?';
    feedbackDisplay.textContent = '';
    timerDisplay.className = ''; // Remove classes de cor do timer
    timeLeft = song.duration;
    startTime = Date.now();
    updateProgressBars();
    updatePartialScore();

    artistImage.src = song.artistImage;
    artistName.textContent = song.artist;
    songImage.src = song.cover;
    songGenres.textContent = song.genres;
    songDate.textContent = song.date;
    songAlbum.textContent = song.album;
    songTitle.textContent = '---'; // Set title to '---' initially

    const options = shuffle([...song.options]);
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option, song.title, song.duration);
        optionsContainer.appendChild(button);
    });

    //reseta o timer
    clearInterval(timer);
    if (gameActive && !isPaused) {
        timer = setInterval(() => {
            timeLeft = song.duration - (Date.now() - startTime) / 1000;
            timerDisplay.textContent = `Tempo restante: ${Math.ceil(timeLeft)}s`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                disableOptions(song.title);
                timerDisplay.textContent = 'TEMPO ESGOTADO!';
                timerDisplay.classList.add('times-up');
                incorrectGuesses++;
                songs[currentSongIndex].answeredCorrectly = false;
                nextButton.style.display = 'block';
                songTitle.textContent = song.title; // Show song title
                updateProgressBars();
            }
        }, 100);
    }

    nextButton.style.display = 'none';
}

//verifica a resposta
function checkAnswer(selected, correct, duration) {
    if (!isPaused) {
        clearInterval(timer);
        const currentSong = songs[currentSongIndex];
        const buttons = optionsContainer.getElementsByTagName('button');

        for (let button of buttons) {
            button.disabled = true;
            if (button.textContent === correct) {
                button.classList.add('correct');
            } else if (button.textContent === selected) {
                button.classList.add('incorrect');
            }
        }

        if (selected === correct) {
            score += Math.max(0, Math.floor(timeLeft));
            partialScore = score;
            timerDisplay.textContent = 'CORRETO!';
            timerDisplay.classList.add('correct');
            correctGuesses++;
            currentSong.answeredCorrectly = true;
        } else {
            timerDisplay.textContent = 'INCORRETO!';
            timerDisplay.classList.add('incorrect');
            incorrectGuesses++;
            currentSong.answeredCorrectly = false;
        }
        songTitle.textContent = correct;
        nextButton.style.display = 'block';
        updatePartialScore();
        updateProgressBars();
    }
}

//desabilita as opções e destaca a resposta correta
function disableOptions(correctAnswer = null) {
    const buttons = optionsContainer.getElementsByTagName('button');
    for (let button of buttons) {
        button.disabled = true;
        if (correctAnswer && button.textContent === correctAnswer) {
            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
        }
    }
}

//próxima pergunta
function nextQuestion() {
    if (!isPaused) {
        audioPlayer.pause();
        currentSongIndex++;
        if (currentSongIndex < totalQuestions) {
            loadQuestion();
        } else {
            endGame();
        }
    }
}

//atualiza as barras de progresso
function updateProgressBars() {
    progressBars.innerHTML = '';
    for (let i = 0; i < totalQuestions; i++) {
        const bar = document.createElement('div');
        bar.className = 'progress-bar';
        if (songs[i].answeredCorrectly === true) {
            bar.classList.add('completed-correct');
        } else if (songs[i].answeredCorrectly === false) {
            bar.classList.add('completed-incorrect');
        } else if (i < currentSongIndex && songs[i].answeredCorrectly === null) {
            bar.classList.add('completed');
        }
        if (i === currentSongIndex) bar.classList.add('current');
        progressBars.appendChild(bar);
    }
}

//atualiza a pontuação parcial
function updatePartialScore() {
    partialScoreDisplay.textContent = `Pontuação Parcial: ${partialScore}`;
}

//finaliza o jogo
function endGame() {
    clearInterval(timer);
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    gameContainer.style.display = 'none';
    pauseButton.style.display = 'none';
    finalScoreDisplay.textContent = score;
    correctAnswersDisplay.textContent = correctGuesses;
    incorrectAnswersDisplay.textContent = incorrectGuesses;
    gameOverPopup.style.display = 'flex';
    navLinks.classList.add('hidden'); //mnter os links de navegação ocultos
    document.body.classList.remove('game-background'); //remove o background do jogo
}

//reseta o jogo
function resetGame() {
    currentSongIndex = 0;
    score = 0;
    partialScore = 0;
    correctGuesses = 0;
    incorrectGuesses = 0;
    isPaused = false;
    gameActive = false;
    gameOverPopup.style.display = 'none';
    gameContainer.style.display = 'none';
    pauseButton.style.display = 'none';

    //torna as seções da landing page visíveis novamente
    heroSection.style.display = 'flex'; // 'flex' porque é o display original da hero-section
    benefitsSection.style.display = 'block';
    testimonialsSection.style.display = 'block';
    ctaSection.style.display = 'block'; //mostra toda a seção CTA
    
    //mostra os links de navegação na header
    navLinks.classList.remove('hidden');

    songs.forEach(song => song.answeredCorrectly = null);
    document.body.classList.remove('game-background'); //garante que o fundo volte ao normal

    //rola para o topo da página para mostrar a hero section
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

//função para lidar com animações de rolagem
function handleScrollAnimations() {
    const sections = [benefitsSection, testimonialsSection, ctaSection];
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    sections.forEach((section) => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', () => {
    if (!isPaused) {
        isPaused = true;
        audioPlayer.pause();
        clearInterval(timer);
        pausePopup.style.display = 'flex';
    }
});
resumeButton.addEventListener('click', () => {
    if (isPaused) {
        isPaused = false;
        pausePopup.style.display = 'none';
        startTime = Date.now() - (songs[currentSongIndex].duration - timeLeft) * 1000;
        audioPlayer.play().catch(e => console.log("Erro ao resumir áudio:", e));
        if (gameActive && !isPaused) {
            timer = setInterval(() => {
                timeLeft = songs[currentSongIndex].duration - (Date.now() - startTime) / 1000;
                timerDisplay.textContent = `Tempo restante: ${Math.ceil(timeLeft)}s`;
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    disableOptions(songs[currentSongIndex].title); // Pass correct answer to highlight
                    timerDisplay.textContent = 'TEMPO ESGOTADO!';
                    timerDisplay.classList.add('times-up');
                    incorrectGuesses++;
                    songs[currentSongIndex].answeredCorrectly = false;
                    nextButton.style.display = 'block';
                    songTitle.textContent = songs[currentSongIndex].title; // Show song title
                }
            }, 100);
        }
    }
});
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', resetGame);
themeToggleButton.addEventListener('click', toggleTheme);
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 2) {
        formMessage.textContent = 'O nome deve ter pelo menos 2 caracteres.';
        formMessage.className = 'form-message error';
        return;
    }

    if (!emailRegex.test(email)) {
        formMessage.textContent = 'Por favor, insira um e-mail válido.';
        formMessage.className = 'form-message error';
        return;
    }

    formMessage.textContent = 'Cadastro realizado com sucesso!';
    formMessage.className = 'form-message success';
    signupForm.reset();

    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }, 3000);
});

//ajuste para o link do logo
logoLink.addEventListener('click', (e) => {
    e.preventDefault(); //impede o comportamento padrão do link
    if (gameActive || gameOverPopup.style.display === 'flex' || pausePopup.style.display === 'flex') {
        //se o jogo estiver ativo, pausado ou na tela de game over, reseta o jogo
        audioPlayer.pause(); //pausa o áudio
        audioPlayer.currentTime = 0; //reseta o áudio para o início
        resetGame(); //chama a função para resetar o jogo e mostrar a landing page
    } else {
        //se o jogo não estiver ativo, apenas rola para o topo da hero section
        heroSection.scrollIntoView({ behavior: 'smooth' });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    applySavedTheme();
    handleScrollAnimations();
});