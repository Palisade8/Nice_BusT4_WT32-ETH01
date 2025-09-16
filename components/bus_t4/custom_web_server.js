// Функция для обновления времени каждую секунду
function updateCurrentTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const now = new Date();
        timeElement.textContent = now.toLocaleString();
    }
}

// Функция для получения IP-адреса через API
async function updateDeviceIP() {
    try {
        const response = await fetch('/state');
        if (response.ok) {
            const data = await response.json();
            const ipElement = document.getElementById('device-ip');
            if (ipElement && data.wifi && data.wifi.ip_address) {
                ipElement.textContent = 'IP: ' + data.wifi.ip_address;
            }
        }
    } catch (error) {
        console.log('Could not fetch IP address:', error);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Создаем элементы для отображения информации
    const ipDiv = document.createElement('div');
    ipDiv.className = 'header-info ip-address';
    ipDiv.id = 'device-ip';
    ipDiv.textContent = 'IP: Loading...';
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'header-info current-time';
    timeDiv.id = 'current-time';
    timeDiv.textContent = new Date().toLocaleString();
    
    // Добавляем элементы в тело документа
    document.body.appendChild(ipDiv);
    document.body.appendChild(timeDiv);
    
    // Обновляем время каждую секунду
    setInterval(updateCurrentTime, 1000);
    
    // Получаем IP-адрес
    updateDeviceIP();
    
    // Обновляем IP каждые 30 секунд
    setInterval(updateDeviceIP, 30000);
});
