// Countdown Timer Script
(() => {
  // Target date for launch (October 1st, 2025 at 00:00:00). Using local timezone.
  const launchDate = new Date('2025-10-01T00:00:00');

  const daysSpan = document.getElementById('days');
  const hoursSpan = document.getElementById('hours');
  const minutesSpan = document.getElementById('minutes');
  const secondsSpan = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date();
    let diff = launchDate - now;
    if (diff < 0) diff = 0;

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);

    daysSpan.textContent = days;
    hoursSpan.textContent = hours.toString().padStart(2, '0');
    minutesSpan.textContent = minutes.toString().padStart(2, '0');
    secondsSpan.textContent = seconds.toString().padStart(2, '0');
  }

  // Initial update
  updateCountdown();
  // Update every second
  setInterval(updateCountdown, 1000);
})();

// Product search and filter functionality for customers page
(() => {
  const searchInput = document.getElementById('product-search');
  const categoryFilter = document.getElementById('category-filter');
  const productGrid = document.getElementById('product-grid');
  if (searchInput && categoryFilter && productGrid) {
    const products = productGrid.querySelectorAll('.product-card');
    function filterProducts() {
      const term = searchInput.value.trim().toLowerCase();
      const category = categoryFilter.value;
      products.forEach((card) => {
        const name = card.getAttribute('data-name')?.toLowerCase() || '';
        const cat = card.getAttribute('data-category');
        const matchesName = name.includes(term);
        const matchesCategory = category === 'all' || cat === category;
        if (matchesName && matchesCategory) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
  }
})();

// Product request form submission handler
(() => {
  const form = document.getElementById('request-form');
  const successMsg = document.getElementById('request-success');
  if (form && successMsg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // In a real MVP this would send the request to a backend service.
      // For demo purposes, just display a success message.
      form.style.display = 'none';
      successMsg.style.display = 'block';
      form.reset?.();
    });
  }
})();

// Merchant login form handler
(() => {
  const loginForm = document.getElementById('login-form');
  const loginSuccess = document.getElementById('login-success');
  if (loginForm && loginSuccess) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Show success message and reset form
      loginForm.style.display = 'none';
      loginSuccess.style.display = 'block';
      loginForm.reset?.();
    });
  }
})();

// Global login form handler (login.html)
(() => {
  const form = document.getElementById('login-form-global');
  const success = document.getElementById('login-global-success');
  if (form && success) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      success.style.display = 'block';
      form.reset?.();
    });
  }
})();

// Sign up form handler (signup.html)
(() => {
  const signupForm = document.getElementById('signup-form');
  const signupSuccess = document.getElementById('signup-success');
  if (signupForm && signupSuccess) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // For demonstration, we simply show success message and hide form
      signupForm.style.display = 'none';
      signupSuccess.style.display = 'block';
      signupForm.reset?.();
    });
  }
})();

// Contact form submission handler
(() => {
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.style.display = 'none';
      contactSuccess.style.display = 'block';
      contactForm.reset?.();
    });
  }
})();

// Load products from local JSON and render cards on customers page
(() => {
  const productGrid = document.getElementById('product-grid');
  // Only execute if the product grid exists (i.e., on customers page)
  if (productGrid) {
    fetch('data/products.json')
      .then((resp) => resp.ok ? resp.json() : [])
      .then((data) => {
        if (!Array.isArray(data)) return;
        data.forEach((product) => {
          const card = document.createElement('div');
          card.className = 'product-card';
          card.setAttribute('data-name', product.name);
          card.setAttribute('data-category', product.category);
          card.style.border = '1px solid #e0efe7';
          card.style.borderRadius = '6px';
          card.style.padding = '1rem';
          card.style.width = '250px';
          card.style.backgroundColor = '#f9fdfb';

          const img = document.createElement('img');
          img.src = product.image;
          img.alt = product.name;
          img.style.width = '100%';
          img.style.borderRadius = '4px';
          card.appendChild(img);

          const h3 = document.createElement('h3');
          h3.textContent = product.name;
          h3.style.marginTop = '0.75rem';
          card.appendChild(h3);

          const pDesc = document.createElement('p');
          pDesc.textContent = product.description;
          pDesc.style.fontSize = '0.9rem';
          pDesc.style.color = '#555';
          card.appendChild(pDesc);

          const pPrice = document.createElement('p');
          pPrice.textContent = `$${product.price}`;
          pPrice.style.fontWeight = 'bold';
          card.appendChild(pPrice);

          // Navigate to product detail page when card is clicked
          card.style.cursor = 'pointer';
          card.addEventListener('click', () => {
            window.location.href = `product.html?id=${product.id}`;
          });

          productGrid.appendChild(card);
        });
      })
      .catch((err) => {
        console.error('Error loading products:', err);
      });
  }
})();

// Load single product details on product.html
(() => {
  const detailsContainer = document.getElementById('product-details');
  if (detailsContainer) {
    // Parse query string to get product id
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    const productId = idParam ? parseInt(idParam, 10) : null;
    fetch('data/products.json')
      .then((resp) => resp.ok ? resp.json() : [])
      .then((products) => {
        const product = Array.isArray(products) && productId
          ? products.find((p) => p.id === productId)
          : null;
        if (!product) {
          detailsContainer.innerHTML = '<p>Product not found.</p>';
          return;
        }
        // Build product detail markup
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexWrap = 'wrap';
        wrapper.style.gap = '2rem';
        wrapper.style.alignItems = 'flex-start';

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        img.style.width = '300px';
        img.style.borderRadius = '6px';
        wrapper.appendChild(img);

        const info = document.createElement('div');
        info.style.maxWidth = '600px';
        const title = document.createElement('h2');
        title.textContent = product.name;
        info.appendChild(title);
        const desc = document.createElement('p');
        desc.textContent = product.description;
        info.appendChild(desc);
        const price = document.createElement('p');
        price.textContent = `Price: $${product.price}`;
        price.style.fontWeight = 'bold';
        info.appendChild(price);
        const backLink = document.createElement('a');
        backLink.href = 'customers.html';
        backLink.className = 'primary-btn';
        backLink.style.display = 'inline-block';
        backLink.style.marginTop = '1rem';
        backLink.textContent = 'Back to Products';
        info.appendChild(backLink);
        wrapper.appendChild(info);
        detailsContainer.appendChild(wrapper);
      })
      .catch((err) => {
        console.error('Error loading product details:', err);
        detailsContainer.innerHTML = '<p>Error loading product details.</p>';
      });
  }
})();