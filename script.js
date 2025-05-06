// Initialize AOS Animation Library
document.addEventListener("DOMContentLoaded", () => {
  // Declare AOS if it's not already available globally
  if (typeof AOS === "undefined") {
    console.warn("AOS is not properly initialized. Make sure AOS library is included.")
  } else {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    })
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        })

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse.classList.contains("show")) {
          document.querySelector(".navbar-toggler").click()
        }
      }
    })
  })

  // Add floating animation to skill icons
  const skillIcons = document.querySelectorAll(".skill-icon")
  skillIcons.forEach((icon, index) => {
    icon.classList.add("float-animation")
    icon.style.animationDelay = `${index * 0.1}s`
  })

  // Handle contact form submission with AJAX
  const contactForm = document.getElementById("contactForm")
  const formMessage = document.getElementById("formMessage")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const formData = new FormData(this)

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalBtnText = submitBtn.innerHTML
      submitBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...'
      submitBtn.disabled = true

      fetch("contact.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Reset button
          submitBtn.innerHTML = originalBtnText
          submitBtn.disabled = false

          // Show success or error message
          if (data.success) {
            formMessage.innerHTML =
              '<div class="alert alert-success">Thank you for your message! I will get back to you soon.</div>'
            contactForm.reset()
          } else {
            formMessage.innerHTML = `<div class="alert alert-danger">${data.message}</div>`
          }

          // Hide message after 5 seconds
          setTimeout(() => {
            formMessage.innerHTML = ""
          }, 5000)
        })
        .catch((error) => {
          console.error("Error:", error)
          submitBtn.innerHTML = originalBtnText
          submitBtn.disabled = false
          formMessage.innerHTML =
            '<div class="alert alert-danger">There was an error sending your message. Please try again.</div>'
        })
    })
  }

  // Navbar background change on scroll
  const navbar = document.querySelector(".navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.padding = "0.5rem 0"
      navbar.style.backgroundColor = "rgba(10, 10, 20, 0.95)"
    } else {
      navbar.style.padding = "1rem 0"
      navbar.style.backgroundColor = "rgba(10, 10, 20, 0.9)"
    }
  })

  // Add parallax effect to hero section
  const heroSection = document.querySelector(".hero-section")
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY
    if (heroSection) {
      heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`
    }
  })

  // Add typing effect to hero title
  const heroTitle = document.querySelector(".hero-section h1")
  if (heroTitle) {
    const text = heroTitle.innerHTML
    heroTitle.innerHTML = ""

    let i = 0
    function typeWriter() {
      if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 500)
  }
})
