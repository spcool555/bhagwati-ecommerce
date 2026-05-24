function updateTimer() {
    future = Date.parse("Dec 31, 2026  23:59:59");
    now = new Date();
    diff = future - now;

    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    hours = Math.floor(diff / (1000 * 60 * 60));
    mins = Math.floor(diff / (1000 * 60));
    secs = Math.floor(diff / 1000);

    d = days;
    h = hours - days * 24;
    m = mins - hours * 60;
    s = secs - mins * 60;

    document.getElementById("timer")
        .innerHTML =
        '<div>' + d + '<span>Days</span></div>' +
        '<div>' + h + '<span>Hours</span></div>' +
        '<div>' + m + '<span>Minutes</span></div>' +
        '<div>' + s + '<span>Seconds</span></div>';
}
setInterval('updateTimer()', 1000);



// navbar-slide-side bar
function openNav2() {
    document.getElementById("mySidenav-2").style.width = "100%";
}

function closeNav2() {
    document.getElementById("mySidenav-2").style.width = "0";
}





// categroy in home page
function openNav() {
    document.getElementById(
        "mySidebar").style.width = "200px";
    document.getElementById(
        "main").style.marginLeft = "200px";
    document.getElementById("category_n").style.display = "none"
}

function closeNav() {
    document.getElementById(
        "mySidebar").style.width = "0";
    document.getElementById(
        "main").style.marginLeft = "0";
    document.getElementById("category_n").style.display = "block"
}


// loader start
var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 2300);
}

function showPage() {
    document.getElementById("page-loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}
// loader end