export const setLocal = (key,value) => {
    if(typeof value === 'object'){
        value = JSON.stringify(value)
    }
    localStorage.setItem(key,value);
}

export const getLoacl = (key) => {
    let value = localStorage.getItem(key) || "";
    if(key.startWith("[") || key.startWith("{")){
        return JSON.parse(localStorage.getItem(key))
    }else{
        return localStorage.getItem(key) || ""
    }
}

window.setLocal = setLocal;
window.getLoacl = getLoacl;