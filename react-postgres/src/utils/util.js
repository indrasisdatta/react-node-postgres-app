const USER_KEY = 'userData';
const THEME_KEY = 'theme';

export const getLoggedinUser = () => {
    console.log('Fetch user LS data')
    return JSON.parse(localStorage.getItem(USER_KEY));
}

export const setLoggedinUser = (userData) => {
    console.log('Set user LS data', userData)
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
}

export const removeLoggedinUser = () => {
    console.log('Clear user LS data')
    localStorage.removeItem(USER_KEY);
}

export const setThemeLS = (theme) => {
    localStorage.setItem(THEME_KEY, theme);
}

export const getThemeLS = (theme) => {
    let thm = localStorage.getItem(THEME_KEY);
    return thm ?? 'light';
}