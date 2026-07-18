document.addEventListener("DOMContentLoaded", function() {
    // Создаем контейнер для шапки
    const header = document.createElement('div');
    header.className = 'navbar';
    header.innerHTML = `
        <div class="logo" style="cursor: pointer;" onclick="window.location.href='/'">RANCOL<span>.DEV</span></div>
        <div class="nav-links">
            <a href="https://nfsmods.xyz/user/9422" target="_blank">NFSMODS</a>
            <a href="https://t.me/rancol347" target="_blank">TELEGRAM</a>
        </div>
    `;
    
    // Вклеиваем шапку в самый верх тега body на любой странице
    document.body.insertBefore(header, document.body.firstChild);
});
