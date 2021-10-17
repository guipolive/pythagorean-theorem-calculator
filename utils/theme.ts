export function changeTheme(theme: 'light' | 'dark') {
    if(theme === 'dark'){
        document.documentElement.style.setProperty("--color-black", '#FFFF');    
        document.documentElement.style.setProperty("--color-white", "#212121");
        document.documentElement.style.setProperty("--theme-color-danger", "var(--color-red2)");
    }
    else {
        document.documentElement.style.setProperty("--color-black", '#212121');    
        document.documentElement.style.setProperty("--color-white", "#FFFF");
        document.documentElement.style.setProperty("--theme-color-danger", "var(--color-red)");
    }

    window.localStorage.setItem('theme', theme);
}