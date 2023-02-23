let timer;
let beginTime;
let curTime;
let lastTime;
let i;
let color_r = 206;
let color_g = 208;
let color_b = 209;
let colorPaltteState = false;

function init() {
    function initColorBox(color, base) {
        let box = document.getElementById(`${color}Box`);
        let value = document.getElementById(`${color}Slide`).value;
        box.style["background-color"] = `rgba(${base}, ${value / 255})`;
    }

    let ccolor_r = getCookie("color_r");
    let ccolor_g = getCookie("color_g");
    let ccolor_b = getCookie("color_b");
    console.log(ccolor_r);

    if (ccolor_r != "")
        color_r = parseInt(ccolor_r);
    if (ccolor_g != "")
        color_g = parseInt(ccolor_g);
    if (ccolor_b != "")
        color_b = parseInt(ccolor_b);

    document.getElementById("redSlide").value = color_r;
    document.getElementById("greenSlide").value = color_g;
    document.getElementById("blueSlide").value = color_b;

    let newColor = document.getElementById("newColor");
    newColor.style["background-color"] = `rgb(${color_r}, ${color_g}, ${color_b})`;
    let currentColor = document.getElementById("currentColor");
    currentColor.style["background-color"] = `rgb(${color_r}, ${color_g}, ${color_b})`;


    initColorBox("green", "0,255,0");
    initColorBox("red", "255,0,0");
    initColorBox("blue", "0,0,255");
    updateColor();
}


/* ****************************** timer */

function setTime(time) {
    let timeSpan = document.getElementById("time");
    timeSpan.innerHTML = time;
}

function getTime() {
    return new Date(new Date().getTime() - beginTime.getTime() - 60 * 60 * 8 * 1000);
}

function clock() {
    curTime = getTime();
    setTime(curTime.toLocaleTimeString());
}

function setSystemState(state) {
    /* true for timing */

    i = 1;
    document.getElementById("begin").disabled = state;
    document.getElementById("split").disabled = !state;
    document.getElementById("reset").disabled = !state;
}

function begin() {
    lastTime = beginTime = new Date();
    timer = window.setInterval("clock()", 1000);
    setSystemState(true);
}

function reset() {
    setTime("00:00:00");
    window.clearInterval(timer);
    let table = document.getElementById("timeTable");
    while (1 < table.children.length)
        table.removeChild(table.children[1]);
    setSystemState(false);
}

function split() {
    let table = document.getElementById("timeTable");
    let tr = document.createElement("tr");
    let td0 = document.createElement("td");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");

    let newTime = new Date();
    let long = new Date(newTime.getTime() - lastTime.getTime() - 60 * 60 * 8 * 1000);

    if (long.getTime() >= 1000 - 60 * 60 * 8 * 1000) {
        td0.innerHTML = i++;
        td1.innerHTML = curTime.toLocaleTimeString();
        td2.innerHTML = long.toLocaleTimeString();

        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);

        lastTime = newTime;
    }
}

/* ****************************** 调色板 */

function changeColor(value, id) {
    let e = document.getElementById(id);
    let newColor = document.getElementById("newColor");
    let base = "0,0,0";
    if (id == "greenBox") {
        base = "0,255,0";
        color_g = value;
    } else if (id == "redBox") {
        base = "255,0,0";
        color_r = value;
    } else {
        base = "0,0,255";
        color_b = value;
    }
    e.style["background-color"] = `rgba(${base}, ${value / 255})`;
    newColor.style["background-color"] = `rgb(${color_r}, ${color_g}, ${color_b})`;
    updateColor();
}

function colorPaltteBtn() {
    let cp = document.getElementById("colorPaltteBtn");
    if (colorPaltteState) {
        cp.innerHTML = "显示🎨";
        document.getElementById("colorPaltte").style["display"] = "none";
    }
    else {
        cp.innerHTML = "隐藏🎨";
        document.getElementById("colorPaltte").style["display"] = "block";
    }
    colorPaltteState = !colorPaltteState;
}

function updateColor() {
    document.body.style.setProperty("--color-r", color_r);
    document.body.style.setProperty("--color-g", color_g);
    document.body.style.setProperty("--color-b", color_b);
}

function saveColor() {
    setCookie("color_r", color_r, 365);
    setCookie("color_g", color_g, 365);
    setCookie("color_b", color_b, 365);
}

function resetCookies() {
    deleteCookie("color_r");
    deleteCookie("color_g");
    deleteCookie("color_b");
}

/* ****************************** cookies */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = `expires=${d.toGMTString()}`;
    document.cookie = `${cname}=${cvalue}; ${expires}`;
}

function deleteCookie(cname) {
    setCookie(cname, 0, 0);
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    console.log(ca);
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}


