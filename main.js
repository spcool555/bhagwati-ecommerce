function updateTimer() {
    const timerElement = document.getElementById("timer");
    if (!timerElement) return;

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

    timerElement.innerHTML =
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
        const res = await fetch('https://bhagwaticardsandpapers.com/api/public/allCategories');
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
    const dropdownLists = document.querySelectorAll('.dropdown-2 .dropdown-menu .maincat-dropdown-list, .mobile-maincat-dropdown-list');
    dropdownLists.forEach(list => {
        list.innerHTML = '';
        if (!categories || !categories.length) {
            list.innerHTML = '<p class="dropdown-item-text">No categories available.</p>';
            return;
        }
        categories.forEach(cat => {
            const link = document.createElement('a');
            link.className = list.classList.contains('mobile-maincat-dropdown-list') ? 'nav-link' : 'dropdown-item';
            link.href = `Shop.html?maincatname=${encodeURIComponent(cat.maincatname)}`;
            link.textContent = cat.maincatname;
            list.appendChild(link);
        });
    });
}

function buildShopRedirectUrl(product) {
    const params = new URLSearchParams();
    if (product.booktitle) params.set('booktitle', product.booktitle);
    if (product.maincatname) params.set('maincatname', product.maincatname);
    if (product.subcatname) params.set('subcatname', product.subcatname);
    return 'shop.html?' + params.toString();
}

function renderFeaturedProducts(products) {
    const container = document.getElementById('featuredProductsCarousel');
    if (!container) return;
    if (!Array.isArray(products) || !products.length) {
        container.innerHTML = '<div class="col-12"><p>No featured products available.</p></div>';
        return;
    }
    container.innerHTML = '';
    products.slice(0, 4).forEach(product => {
        const imageUrl = product.imageUrl || product.bookimage || product.imagePath || product.image || '/images/shop-p-1.jpg';
        const productLink = buildShopRedirectUrl(product);
        const card = document.createElement('div');
        card.className = 'col-lg-3 col-sm-3';
        card.innerHTML = `
            <div class="product-grid">
                <div class="product-content">
                    <h3 class="title"><a href="${productLink}">${product.booktitle || 'Untitled Product'}</a></h3>
                    <div class="price"><span>${product.originalprice ? '$' + product.originalprice : 'Price unavailable'}</span></div>
                    <ul class="rating">
                        <li class="fa fa-star"></li>
                        <li class="fa fa-star"></li>
                        <li class="fa fa-star"></li>
                        <li class="fa fa-star"></li>
                        <li class="fa fa-star"></li>
                    </ul>
                    <ul class="product-links">
                        <li><a href="${productLink}"><i class="fa fa-shopping-bag"></i></a></li>
                        <li><a href="${productLink}"><i class="fa fa-random"></i></a></li>
                        <li><a href="${productLink}"><i class="fa fa-heart"></i></a></li>
                        <li><a href="${productLink}"><i class="fa fa-eye"></i></a></li>
                    </ul>
                </div>
                <div class="product-image">
                    <a href="${productLink}" class="image">
                        <img class="pic-1" src="${imageUrl}">
                        <img class="pic-2" src="${imageUrl}">
                    </a>
                    ${product.originalprice ? '<span class="product-sale-label">Sale</span>' : ''}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

async function loadFeaturedProducts() {
    const container = document.getElementById('featuredProductsCarousel');
    const mobileIndicatorsContainer = document.querySelector('#carouselId-3 .carousel-indicators');
    const mobileInner = document.querySelector('#carouselId-3 .carousel-inner');
    if (!container) return;
    container.innerHTML = '<div class="col-12"><p>Loading featured products...</p></div>';
    try {
        const response = await fetch('https://bhagwaticardsandpapers.com/api/public/allbooks');
        // remove static placeholders for mobile too, so API-render replaces them
        if (mobileIndicatorsContainer) {
            mobileIndicatorsContainer.innerHTML = '';
        }
        if (mobileInner) {
            mobileInner.innerHTML = '';
        }
        if (!response.ok) throw new Error('Featured products request failed');
        const products = await response.json();
        renderFeaturedProducts(products);
        // force desktop and mobile carousels to re-render (avoid any static placeholders)
        if (mobileIndicatorsContainer) mobileIndicatorsContainer.innerHTML = '';
        if (mobileInner) mobileInner.innerHTML = '';
        renderFeaturedProductsMobile(products);
    } catch (err) {
        console.error('Featured product load error:', err);
        container.innerHTML = '<div class="col-12"><p>Unable to load featured products.</p></div>';
    }
}

function renderFeaturedProductsMobile(products) {
    const inner = document.querySelector('#carouselId-3 .carousel-inner');
    if (!inner) return;
    if (!Array.isArray(products) || !products.length) {
        inner.innerHTML = '<div class="carousel-item active"><div class="container-fluid"><div class="row"><div class="col-12"><p>No featured products available.</p></div></div></div>';
        return;
    }
    // build indicators for mobile carousel
    const indicators = document.querySelector('#carouselId-3 .carousel-indicators');
    if (indicators) {
        indicators.innerHTML = '';
        products.forEach((p, i) => {
            const li = document.createElement('li');
            li.setAttribute('data-target', '#carouselId-3');
            li.setAttribute('data-slide-to', String(i));
            if (i === 0) li.className = 'active';
            indicators.appendChild(li);
        });
    }

    inner.innerHTML = '';
    products.forEach((product, idx) => {
        const imageUrl = product.imageUrl || product.bookimage || product.imagePath || product.image || '/images/shop-p-1.jpg';
        const productLink = buildShopRedirectUrl(product);
        const item = document.createElement('div');
        item.className = 'carousel-item' + (idx === 0 ? ' active' : '');
        item.innerHTML = `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12 col-12">
                        <div class="product-grid">
                            <div class="product-image">
                                <a href="${productLink}" class="image">
                                    <img class="pic-1" src="${imageUrl}">
                                    <img class="pic-2" src="${imageUrl}">
                                </a>
                                ${product.originalprice ? '<span class="product-sale-label">Sale</span>' : ''}
                            </div>
                            <div class="product-content">
                                <h3 class="title"><a href="${productLink}">${product.booktitle || 'Untitled Product'}</a></h3>
                                <div class="price"><span>${product.originalprice ? '$' + product.originalprice : 'Price unavailable'}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        inner.appendChild(item);
    });
}

function redirectToShopSearch(searchText) {
    if (!searchText || !searchText.trim()) return;
    const query = new URLSearchParams();
    query.set('booktitle', searchText.trim());
    window.location.href = 'Shop.html?' + query.toString();
}

function setupEnquiryForm() {
    const form = document.getElementById('enquiryForm');
    if (!form) return;

    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(form);
        const enquiry = {
            name: String(formData.get('name') || '').trim(),
            phone: String(formData.get('phone') || '').trim(),
            message: String(formData.get('message') || '').trim()
        };

        if (!enquiry.name || !enquiry.phone || !enquiry.message) {
            alert('Please fill all enquiry fields.');
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        try {
            const response = await fetch('https://bhagwaticardsandpapers.com/api/public/send-enquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(enquiry)
            });

            if (!response.ok) {
                throw new Error('Enquiry request failed');
            }

            alert('Enquiry sent successfully.');
            form.reset();
        } catch (error) {
            console.error('Enquiry send error:', error);
            alert('Unable to send enquiry. Please try again.');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Enquiry';
            }
        }
    });
}

// Reviews (temporary placeholder endpoints; replace later)
const REVIEWS_GET_URL = 'https://bhagwaticardsandpapers.com/api/getallreview';
const REVIEWS_POST_URL = 'https://bhagwaticardsandpapers.com/api/savereview';

function escapeHtml(unsafe) {
    return String(unsafe ?? '').replace(/[&<>"']/g, c => ({
        '&': '&amp;',
        '<': '<',
        '>': '>',
        '"': '"',
        "'": '&#039;'
    }[c]));
}

function renderReviewsCarousel(reviews) {
    const slider = document.getElementById('reviewsCarousel');
    const carouselInner = document.querySelector('#reviewsCarousel .carousel-inner');

    const indicators = document.querySelector('#reviewsCarousel .carousel-indicators');


    if (!slider || !carouselInner) return;

    if (!Array.isArray(reviews) || reviews.length === 0) {
        carouselInner.innerHTML = `
            <div class="carousel-item active">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <div class="reviews-empty">No reviews yet.</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        if (indicators) indicators.innerHTML = '';
        return;
    }

    // Keep items small: 1 review per slide
    carouselInner.innerHTML = '';
    if (indicators) indicators.innerHTML = '';

    reviews.forEach((r, idx) => {
        const name = escapeHtml(r.name || r.customerName || 'Customer');
        const review = escapeHtml(r.review || r.message || '');
        const stars = Number(r.stars ?? r.rating ?? 5);
        const safeStars = Number.isFinite(stars) ? Math.max(1, Math.min(5, stars)) : 5;

        const starsHtml = Array.from({ length: 5 }, (_, i) => {
            const active = i < safeStars;
            return `<i class="fa ${active ? 'fa-star' : 'fa-star-o'}" aria-hidden="true"></i>`;
        }).join('');

        const item = document.createElement('div');
        item.className = 'carousel-item' + (idx === 0 ? ' active' : '');
        item.innerHTML = `
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="review-card">
                            <div class="review-stars">${starsHtml}</div>
                            <p class="review-text">${review}</p>
                            <div class="review-name">- ${name}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        carouselInner.appendChild(item);

        if (indicators) {
            const li = document.createElement('li');
            li.setAttribute('data-target', '#reviewsCarousel');
            li.setAttribute('data-slide-to', String(idx));
            if (idx === 0) li.className = 'active';
            indicators.appendChild(li);
        }
    });
}

async function loadReviews() {
    const slider = document.getElementById('reviewsCarousel');
    if (!slider) return;

    const carouselInner = document.querySelector('#reviewsCarousel .carousel-inner');
    if (carouselInner) {
        carouselInner.innerHTML = `
            <div class="carousel-item active">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <div class="reviews-loading">Loading reviews...</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    try {
        const res = await fetch(REVIEWS_GET_URL);
        if (!res.ok) throw new Error('Reviews GET failed');
        const data = await res.json();
        // API shape may vary; normalize
        const reviews = Array.isArray(data) ? data : (data.reviews || data.data || []);
        renderReviewsCarousel(reviews);
    } catch (err) {
        console.error('Reviews load error:', err);
        renderReviewsCarousel([]);
    }
}

function setupReviewForm() {
    const form = document.getElementById('addReviewForm');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"], button[type="submit"]');


    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const name = String(formData.get('name') || '').trim();
        const stars = Number(formData.get('stars') || formData.get('rating') || 5);
        const review = String(formData.get('review') || formData.get('message') || '').trim();

        const safeStars = Number.isFinite(stars) ? Math.max(1, Math.min(5, stars)) : 5;

        const errorBox = document.getElementById('reviewFormError');
        const successBox = document.getElementById('reviewFormSuccess');
        if (errorBox) errorBox.style.display = 'none';
        if (successBox) successBox.style.display = 'none';

        if (!name || !review) {
            if (errorBox) {
                errorBox.textContent = 'Please enter your name and review.';
                errorBox.style.display = 'block';
            }
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            const prev = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            try {
                const res = await fetch(REVIEWS_POST_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, star: safeStars, review })
                });

                if (!res.ok) throw new Error('Review POST failed');

                if (successBox) {
                    successBox.textContent = 'Thanks! Your review has been submitted.';
                    successBox.style.display = 'block';
                }

                form.reset();
                await loadReviews();
            } catch (err) {
                console.error('Review submit error:', err);
                if (errorBox) {
                    errorBox.textContent = 'Unable to submit review. Please try again.';
                    errorBox.style.display = 'block';
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = prev;
                }
            }
        }
    });
}

// Run on load
document.addEventListener('DOMContentLoaded', () => {
    loadHeaderCategories();
    loadReviews();
    setupReviewForm();



    const searchInputs = document.querySelectorAll('.top-navbar-1 input[type="search"], #sidebar-section .search input');
    searchInputs.forEach(input => {
        const parent = input.closest('.overlay-1') || input.closest('.form-group');
        const searchButton = parent ? parent.querySelector('a, .fa-search') : null;
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

    loadFeaturedProducts();
    setupEnquiryForm();
});
