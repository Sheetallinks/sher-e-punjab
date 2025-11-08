// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")
  const menuIcon = document.getElementById("menuIcon")
  const closeIcon = document.getElementById("closeIcon")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
      menuIcon.classList.toggle("hidden")
      closeIcon.classList.toggle("hidden")
    })
  }

  // Back to top button
  const backToTopBtn = document.getElementById("backToTop")

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("visible")
      } else {
        backToTopBtn.classList.remove("visible")
      }
    })

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Contact form submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      alert("Thank you for your message! We will get back to you soon.")
      contactForm.reset()
    })
  }

  // Newsletter form submission
  const newsletterForm = document.getElementById("newsletterForm")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()
      alert("Thank you for subscribing to our newsletter!")
      newsletterForm.reset()
    })
  }

  // Load products for home page
  loadHomePageProducts()

  // Load products for category pages
  loadCategoryProducts()

  // Add fade-in animation on scroll
  observeElements()
})

// Function to create product card HTML
function createProductCard(product) {
  return `
        <div class="product-card">
            <div class="product-image-wrapper">
                <img src="public${product.image}" alt="${product.name}" class="product-image" onerror="this.src='/placeholder.svg?height=300&width=300'">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <button class="product-btn">Add to Cart</button>
            </div>
        </div>
    `
}

// Function to create deal card HTML
function createDealCard(deal) {
  return `
        <div class="deal-card">
            <div class="deal-badge">${deal.discount} OFF</div>
            <div class="deal-image-wrapper">
                <img src="public${deal.image}" alt="${deal.name}" class="deal-image" onerror="this.src='/placeholder.svg?height=300&width=300'">
            </div>
            <div class="deal-info">
                <h3 class="deal-name">${deal.name}</h3>
                <p class="deal-description">${deal.description}</p>
                <div class="deal-prices">
                    <span class="deal-original-price">${deal.originalPrice}</span>
                    <span class="deal-current-price">${deal.price}</span>
                </div>
                <button class="deal-btn">Add to Cart</button>
            </div>
        </div>
    `
}

// Load products for home page
function loadHomePageProducts() {
  // Load bakery products
  const bakeryGrid = document.getElementById("bakeryProducts")
  const bakeryProducts = [] // Declare bakeryProducts variable
  if (bakeryGrid && typeof bakeryProducts !== "undefined") {
    bakeryGrid.innerHTML = bakeryProducts.slice(0, 8).map(createProductCard).join("")
  }

  // Load spices products
  const spicesGrid = document.getElementById("spicesProducts")
  const spicesProducts = [] // Declare spicesProducts variable
  if (spicesGrid && typeof spicesProducts !== "undefined") {
    spicesGrid.innerHTML = spicesProducts.slice(0, 8).map(createProductCard).join("")
  }

  // Load vegetables products
  const vegetablesGrid = document.getElementById("vegetablesProducts")
  const vegetablesProducts = [] // Declare vegetablesProducts variable
  if (vegetablesGrid && typeof vegetablesProducts !== "undefined") {
    vegetablesGrid.innerHTML = vegetablesProducts.slice(0, 8).map(createProductCard).join("")
  }

  // Load fruits products
  const fruitsGrid = document.getElementById("fruitsProducts")
  const fruitsProducts = [] // Declare fruitsProducts variable
  if (fruitsGrid && typeof fruitsProducts !== "undefined") {
    fruitsGrid.innerHTML = fruitsProducts.slice(0, 8).map(createProductCard).join("")
  }

  // Load dairy products
  const dairyGrid = document.getElementById("dairyProducts")
  const dairyProducts = [] // Declare dairyProducts variable
  if (dairyGrid && typeof dairyProducts !== "undefined") {
    dairyGrid.innerHTML = dairyProducts.slice(0, 8).map(createProductCard).join("")
  }

  // Load drinks products
  const drinksGrid = document.getElementById("drinksProducts")
  const drinksProducts = [] // Declare drinksProducts variable
  if (drinksGrid && typeof drinksProducts !== "undefined") {
    drinksGrid.innerHTML = drinksProducts.slice(0, 8).map(createProductCard).join("")
  }

  // Load frozen products
  const frozenGrid = document.getElementById("frozenProducts")
  const frozenProducts = [] // Declare frozenProducts variable
  if (frozenGrid && typeof frozenProducts !== "undefined") {
    frozenGrid.innerHTML = frozenProducts.slice(0, 8).map(createProductCard).join("")
  }

  // Load deals products
  const dealsGrid = document.getElementById("dealsProducts")
  const dealsProducts = [] // Declare dealsProducts variable
  if (dealsGrid && typeof dealsProducts !== "undefined") {
    dealsGrid.innerHTML = dealsProducts.map(createDealCard).join("")
  }
}

// Load products for category pages
function loadCategoryProducts() {
  // Bakery page
  const bakeryGrid = document.getElementById("bakeryGrid")
  const bakeryProducts = [] // Declare bakeryProducts variable
  if (bakeryGrid && typeof bakeryProducts !== "undefined") {
    bakeryGrid.innerHTML = bakeryProducts.map(createProductCard).join("")
  }

  // Spices page
  const spicesGrid = document.getElementById("spicesGrid")
  const spicesProducts = [] // Declare spicesProducts variable
  if (spicesGrid && typeof spicesProducts !== "undefined") {
    spicesGrid.innerHTML = spicesProducts.map(createProductCard).join("")
  }

  // Vegetables page
  const vegetablesGrid = document.getElementById("vegetablesGrid")
  const vegetablesProducts = [] // Declare vegetablesProducts variable
  if (vegetablesGrid && typeof vegetablesProducts !== "undefined") {
    vegetablesGrid.innerHTML = vegetablesProducts.map(createProductCard).join("")
  }

  // Fruits page
  const fruitsGrid = document.getElementById("fruitsGrid")
  const fruitsProducts = [] // Declare fruitsProducts variable
  if (fruitsGrid && typeof fruitsProducts !== "undefined") {
    fruitsGrid.innerHTML = fruitsProducts.map(createProductCard).join("")
  }

  // Dairy page
  const dairyGrid = document.getElementById("dairyGrid")
  const dairyProducts = [] // Declare dairyProducts variable
  if (dairyGrid && typeof dairyProducts !== "undefined") {
    dairyGrid.innerHTML = dairyProducts.map(createProductCard).join("")
  }

  // Drinks page
  const drinksGrid = document.getElementById("drinksGrid")
  const drinksProducts = [] // Declare drinksProducts variable
  if (drinksGrid && typeof drinksProducts !== "undefined") {
    drinksGrid.innerHTML = drinksProducts.map(createProductCard).join("")
  }

  // Frozen page
  const frozenGrid = document.getElementById("frozenGrid")
  const frozenProducts = [] // Declare frozenProducts variable
  if (frozenGrid && typeof frozenProducts !== "undefined") {
    frozenGrid.innerHTML = frozenProducts.map(createProductCard).join("")
  }

  // Deals page
  const dealsGrid = document.getElementById("dealsGrid")
  const dealsProducts = [] // Declare dealsProducts variable
  if (dealsGrid && typeof dealsProducts !== "undefined") {
    dealsGrid.innerHTML = dealsProducts.map(createDealCard).join("")
  }
}

// Add to cart functionality (placeholder)
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("product-btn") || e.target.classList.contains("deal-btn")) {
    e.preventDefault()
    alert("Product added to cart! (This is a demo - cart functionality not implemented)")
  }
})

// Intersection Observer for fade-in animations
function observeElements() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-visible")
      }
    })
  }, observerOptions)

  // Observe all product cards and feature cards
  const elementsToObserve = document.querySelectorAll(".product-card, .deal-card, .feature-card, .category-header")
  elementsToObserve.forEach((el) => observer.observe(el))
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})
