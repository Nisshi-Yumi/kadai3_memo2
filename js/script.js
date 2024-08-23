function recordFood(type) {
    const date = document.getElementById('date').value;
    if (!date) {
        alert('日付を選択してください');
        return;
    }

    // LocalStorageから既存の記録を取得
    let records = JSON.parse(localStorage.getItem('records')) || {};

    // 日付ごとに新しい記録を追加
    if (!records[date]) {
        records[date] = [];
    }

    // 同じ内容の記録があるか確認し、なければ追加
    if (!records[date].includes(type)) {
        records[date].push(type);
    }

    // 更新された記録をLocalStorageに保存
    localStorage.setItem('records', JSON.stringify(records));

    // すべての記録を表示
    displayAllRecords();
    toggleResetButton(); // リセットボタンの表示を確認
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月は0から始まるため+1する
    const day = date.getDate();
    const dayOfWeek = date.getDay();
    const dayOfWeekNames = ['日', '月', '火', '水', '木', '金', '土'];

    return `${year}年${month}月${day}日（${dayOfWeekNames[dayOfWeek]}）`;
}

function displayAllRecords() {
    const records = JSON.parse(localStorage.getItem('records')) || {};
    const recordListDiv = document.getElementById('recordList');
    recordListDiv.innerHTML = ''; // 既存の内容をクリア

    const foods = {
        meat: 'お肉',
        vegetable: '野菜',
        fruit: 'フルーツ',
        sanpo: '散歩'
    };

    for (const date in records) {
        const formattedDate = formatDate(date);
        const recordText = records[date].map(item => foods[item] || item).join(', ');
        const recordItem = document.createElement('div');
        recordItem.style.display = 'flex';
        recordItem.style.justifyContent = 'center';
        recordItem.style.alignItems = 'center';
        
        // 記録された内容
        const recordTextSpan = document.createElement('span');
        recordTextSpan.textContent = `${formattedDate}: ${recordText}`;
        
        // ok/ng画像
        const statusImg = document.createElement('img');
        statusImg.style.marginLeft = '10px';
        if (records[date].includes('meat') && records[date].includes('vegetable') && records[date].includes('fruit')&& records[date].includes('sanpo')) {
            statusImg.src = 'img/ok.png';
        } else {
            statusImg.src = 'img/ng.png';
        }

        recordItem.appendChild(recordTextSpan);
        recordItem.appendChild(statusImg);
        recordListDiv.appendChild(recordItem);
    }
}

function resetRecords() {
    if (confirm('すべての記録を削除してもよろしいですか？')) {
        localStorage.removeItem('records');
        displayAllRecords(); // リセット後に表示をクリア
        toggleResetButton(); // リセットボタンの表示を確認
    }
}

function toggleResetButton() {
    const records = JSON.parse(localStorage.getItem('records')) || {};
    const resetButton = document.getElementById('resetButton');
    if (Object.keys(records).length === 0) {
        resetButton.style.display = 'none';
    } else {
        resetButton.style.display = 'block';
    }
}

// ページが読み込まれたときにすべての記録を表示し、リセットボタンを適切に表示
window.onload = function() {
    displayAllRecords();
    toggleResetButton();
};
