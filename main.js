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

// Load header categories across all pages
async function loadHeaderCategories() {
    try {
        const res = await fetch('http://localhost:8000/public/allCategories');
        if (!res.ok) return;
        const categories = await res.json();

        // Populate any header select controls inside .top-navbar-1
        const headerSelects = document.querySelectorAll('.top-navbar-1 select.form-control');
        headerSelects.forEach(select => {
            // preserve a default first option if present
            const defaultOpt = select.querySelector('option');
            select.innerHTML = '';
            if (defaultOpt) {
                const opt = document.createElement('option');
                opt.value = '';
                opt.textContent = defaultOpt.textContent || '';
                select.appendChild(opt);
            }
            categories.forEach(cat => {
                const o = document.createElement('option');
                o.value = cat.maincatname;
                o.textContent = cat.maincatname;
                select.appendChild(o);
            });
        });

        // Optionally, populate selects with id=productCategory used in Shop/admin pages
        const productSelect = document.getElementById('productCategory');
        if (productSelect) {
            productSelect.innerHTML = '';
            categories.forEach(cat => {
                const o = document.createElement('option');
                o.value = cat.maincatname;
                o.textContent = cat.maincatname;
                productSelect.appendChild(o);
            });
        }

        populateProductDropdowns(categories);

    } catch (err) {
        console.error('Header categories load error:', err);
    }
}

function populateProductDropdowns(categories) {
    const dropdownLists = document.querySelectorAll('.dropdown-2 .dropdown-menu .maincat-dropdown-list');
    dropdownLists.forEach(list => {
        list.innerHTML = '';
        if (!categories || !categories.length) {
            list.innerHTML = '<p class="dropdown-item-text">No categories available.</p>';
            return;
        }
        categories.forEach(cat => {
            const link = document.createElement('a');
            link.className = 'dropdown-item';
            link.href = `shop.html?maincatname=${encodeURIComponent(cat.maincatname)}`;
            link.textContent = cat.maincatname;
            list.appendChild(link);
        });
    });
}

function redirectToShopSearch(searchText) {
    if (!searchText || !searchText.trim()) return;
    const query = new URLSearchParams();
    query.set('booktitle', searchText.trim());
    window.location.href = 'shop.html?' + query.toString();
}

// Run on load
document.addEventListener('DOMContentLoaded', () => {
    loadHeaderCategories();

    const searchInputs = document.querySelectorAll('.top-navbar-1 input[type="search"]');
    searchInputs.forEach(input => {
        const parent = input.closest('.overlay-1');
        const searchButton = parent ? parent.querySelector('a') : null;
        if (searchButton) {
            searchButton.addEventListener('click', event => {
                event.preventDefault();
                redirectToShopSearch(input.value);
            });
        }
        input.addEventListener('keypress', event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                redirectToShopSearch(input.value);
            }
        });
    });
});