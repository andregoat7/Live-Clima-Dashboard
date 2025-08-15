
function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

function loadTheme() {
    return localStorage.getItem('theme') || 'light';
}
