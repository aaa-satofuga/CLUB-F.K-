// クラブデータ - すべての値を明示的に定義して undefined を防ぐ
const clubData = {
    memberCount: 25,
    foundedYear: 2020,
    activityCount: 48,
    currentYear: new Date().getFullYear(),
    email: 'info@club-fk.com',
    phone: '090-XXXX-XXXX',
    location: '東京都内各所のグラウンド'
};

// メンバーデータ - すべてのプロパティを明示的に定義
const members = [
    {
        name: '佐藤 太郎',
        position: 'キャプテン / FW',
        number: '10',
        initial: '佐'
    },
    {
        name: '田中 花子',
        position: 'ミッドフィールダー',
        number: '8',
        initial: '田'
    },
    {
        name: '鈴木 一郎',
        position: 'ディフェンダー',
        number: '5',
        initial: '鈴'
    },
    {
        name: '高橋 美咲',
        position: 'ゴールキーパー',
        number: '1',
        initial: '高'
    },
    {
        name: '伊藤 健太',
        position: 'フォワード',
        number: '9',
        initial: '伊'
    },
    {
        name: '渡辺 真',
        position: 'ミッドフィールダー',
        number: '7',
        initial: '渡'
    }
];

// DOMContentLoaded イベントで初期化
document.addEventListener('DOMContentLoaded', function() {
    // 統計データの初期化
    initializeStats();
    
    // メンバーカードの生成
    renderMembers();
    
    // 連絡先情報の初期化
    initializeContactInfo();
    
    // スムーススクロールの設定
    initializeSmoothScroll();
});

/**
 * 統計データを初期化する関数
 * undefined を防ぐため、デフォルト値を使用
 */
function initializeStats() {
    const memberCountElement = document.getElementById('memberCount');
    const foundedYearElement = document.getElementById('foundedYear');
    const activityCountElement = document.getElementById('activityCount');
    const currentYearElement = document.getElementById('currentYear');
    
    // 要素が存在する場合のみ値を設定
    if (memberCountElement) {
        animateCounter(memberCountElement, 0, clubData.memberCount || 0, 2000);
    }
    
    if (foundedYearElement) {
        animateCounter(foundedYearElement, 2015, clubData.foundedYear || 2020, 2000);
    }
    
    if (activityCountElement) {
        animateCounter(activityCountElement, 0, clubData.activityCount || 0, 2000);
    }
    
    if (currentYearElement) {
        currentYearElement.textContent = clubData.currentYear || new Date().getFullYear();
    }
}

/**
 * カウンターアニメーション関数
 * @param {HTMLElement} element - 対象の要素
 * @param {number} start - 開始値
 * @param {number} end - 終了値
 * @param {number} duration - アニメーション時間（ミリ秒）
 */
function animateCounter(element, start, end, duration) {
    if (!element) return;
    
    const range = end - start;
    const increment = range / (duration / 16); // 60FPS想定
    let current = start;
    
    const timer = setInterval(function() {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

/**
 * メンバーカードを生成する関数
 * undefined を防ぐため、デフォルト値を使用
 */
function renderMembers() {
    const membersGrid = document.getElementById('membersGrid');
    
    if (!membersGrid) {
        console.warn('メンバーグリッド要素が見つかりません');
        return;
    }
    
    // メンバーが存在しない場合のデフォルトメッセージ
    if (!members || members.length === 0) {
        membersGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">メンバー情報は準備中です</p>';
        return;
    }
    
    // メンバーカードを生成
    members.forEach(function(member) {
        const memberCard = createMemberCard(member);
        membersGrid.appendChild(memberCard);
    });
}

/**
 * メンバーカードを作成する関数
 * @param {Object} member - メンバー情報
 * @returns {HTMLElement} メンバーカード要素
 */
function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';
    
    // デフォルト値を設定して undefined を防ぐ
    const name = member.name || '名前未設定';
    const position = member.position || 'ポジション未定';
    const number = member.number || '-';
    const initial = member.initial || name.charAt(0);
    
    card.innerHTML = `
        <div class="member-avatar">${initial}</div>
        <div class="member-name">${name}</div>
        <div class="member-position">${position}</div>
        <div class="member-number">背番号: ${number}</div>
    `;
    
    return card;
}

/**
 * 連絡先情報を初期化する関数
 * undefined を防ぐため、デフォルト値を使用
 */
function initializeContactInfo() {
    const emailElement = document.getElementById('email');
    const phoneElement = document.getElementById('phone');
    const locationElement = document.getElementById('location');
    
    if (emailElement) {
        emailElement.textContent = clubData.email || 'メールアドレス未設定';
    }
    
    if (phoneElement) {
        phoneElement.textContent = clubData.phone || '電話番号未設定';
    }
    
    if (locationElement) {
        locationElement.textContent = clubData.location || '活動場所未定';
    }
}

/**
 * スムーススクロールを初期化する関数
 */
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // ヘッダーの高さを考慮
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('エラーが発生しました:', e.message);
});

// 安全な初期化を保証
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('CLUB F.K ウェブサイトが正常に読み込まれました');
    });
} else {
    console.log('CLUB F.K ウェブサイトが正常に読み込まれました');
}
