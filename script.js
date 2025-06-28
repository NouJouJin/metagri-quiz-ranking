// GASで作成したAPIのURL
const API_URL = "https://script.google.com/macros/s/AKfycbxD9DfVjms0ARvCdJjJ8myieoTOAQwe-5p9RY8f1kcp07ir1jdGtSaHyBq2KvxhfstZ/exec";

document.addEventListener('DOMContentLoaded', () => {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('ranking-body');
            tableBody.innerHTML = ''; // 「読み込み中...」をクリア

            data.forEach((user, index) => {
                // 正答率を小数点以下2桁にフォーマット
                const accuracyFormatted = parseFloat(user.accuracy).toFixed(2);

                const row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${user.discordName}</td>
                        <td>${user.correctCount}</td>
                        <td>${accuracyFormatted}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error('データの取得に失敗しました:', error);
            const tableBody = document.getElementById('ranking-body');
            tableBody.innerHTML = '<tr><td colspan="4">データの読み込みに失敗しました。</td></tr>';
        });
});