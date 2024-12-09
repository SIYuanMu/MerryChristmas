const names = [
    "三万", "橘子", "陈迪", "Snow", "图图", 
    "肚挺挺", "肛妹", "白白", "香香", 
    "钟意", "momo", "周周", "香菜", "竹竹"
];

let assignments = [];
let available = [...names];
let drawn = new Set();

function startDrawing() {
    const userName = document.getElementById('userName').value.trim();

    // 检查名字是否有效
    if (!names.includes(userName)) {
        document.getElementById('result').innerHTML = "<p style='color:red;'>名字不在抽签列表中，请重新输入。</p>";
        return;
    }

    // 检查是否已经抽签
    if (drawn.has(userName)) {
        document.getElementById('result').innerHTML = "<p style='color:red;'>你已经抽过签了！</p>";
        return;
    }

    // 抽签逻辑
    let choices = available.filter(name => name !== userName);

    if (choices.length === 0) {
        document.getElementById('result').innerHTML = "<p style='color:red;'>无法完成抽签，请重试！</p>";
        return;
    }

    let randomIndex = Math.floor(Math.random() * choices.length);
    let selected = choices[randomIndex];

    assignments.push({ from: userName, to: selected });
    available = available.filter(name => name !== selected);
    drawn.add(userName);

    document.getElementById('result').innerHTML = `
        <p><strong>${userName}</strong> 抽中了 <strong>${selected}</strong>！</p>
        <p>你可以准备圣诞礼物啦！</p>
    `;

    document.getElementById('result').style.display = 'block';

    // 检查是否所有人完成抽签
    if (assignments.length === names.length) {
        showFinalResults();
    }
}

function showFinalResults() {
    let output = "<h2>最终抽签结果</h2><ul>";
    assignments.forEach(pair => {
        output += `<li>${pair.from} → ${pair.to}</li>`;
    });
    output += "</ul>";
    document.getElementById('result').innerHTML = output;
}
