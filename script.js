// GASで作成したAPIのURL
const API_URL = "https://script.google.com/macros/s/AKfycbxD9DfVjms0ARvCdJjJ8myieoTOAQwe-5p9RY8f1kcp07ir1jdGtSaHyBq2KvxhfstZ/exec";

// DOMContentLoadedイベントで処理を開始
document.addEventListener('DOMContentLoaded', () => {
    // 背景アニメーションの初期化
    initParticles();

    // APIからデータを取得して描画
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            renderPodium(data.slice(0, 3)); // 上位3名を表彰台に
            renderRankingList(data.slice(3)); // 4位以降をリストに
        })
        .catch(error => {
            console.error('データの取得に失敗しました:', error);
            // エラー表示処理
        });
});

// 表彰台を描画する関数
function renderPodium(top3) {
    const titles = ['農業ハック・キング', 'サイバー・ファーマー', 'データ・ハーベスター'];
    
    top3.forEach((user, index) => {
        const rank = index + 1;
        const podiumElement = document.getElementById(`rank-${rank}`);
        if (!podiumElement) return;

        const accuracyFormatted = parseFloat(user.accuracy).toFixed(2);
        
        podiumElement.innerHTML = `
            <div class="mb-4">
                <span class="text-5xl font-bold font-orbitron">${rank}</span>
                <span class="text-xl">st</span>
            </div>
            <h3 class="text-2xl font-bold truncate mb-1">${user.discordName}</h3>
            <p class="text-lg font-orbitron text-yellow-400 mb-4">${titles[index]}</p>
            <div class="text-sm text-slate-300">
                <p>正解数: ${user.correctCount}</p>
                <p>正答率: ${accuracyFormatted}%</p>
            </div>
        `;
    });
}

// 4位以降のランキングリストを描画する関数
function renderRankingList(rankers) {
    const listElement = document.getElementById('ranking-list');
    if (!listElement) return;
    
    listElement.innerHTML = ''; // クリア
    
    rankers.forEach((user, index) => {
        const rank = index + 4;
        const accuracyFormatted = parseFloat(user.accuracy).toFixed(2);
        
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="flex items-center gap-4">
                <span class="text-lg font-bold w-8 text-center">${rank}</span>
                <span class="font-semibold">${user.discordName}</span>
            </div>
            <div class="text-sm text-slate-300 text-right">
                <span>${user.correctCount} corrects (${accuracyFormatted}%)</span>
            </div>
        `;
        listElement.appendChild(item);
    });
}

// 背景パーティクルアニメーションの設定
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#34d399" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.1, width: 1 },
            move: { enable: true, speed: 1, direction: "none", random: false, straight: false, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });
}
