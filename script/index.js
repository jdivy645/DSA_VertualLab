const stars = document.querySelectorAll(".star");
      let selectedRating = 0;
  
      stars.forEach((star) => {
          star.addEventListener("click", () => {
              selectedRating = star.getAttribute("data-value");
              stars.forEach((s, i) => {
                  if (i < selectedRating) {
                      s.classList.add("active");
                  } else {
                      s.classList.remove("active");
                  }
              });
          });
      });
  
      const feedbackForm = document.getElementById("feedback-form");
      feedbackForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const comment = feedbackForm.querySelector("textarea").value;
  
          if (selectedRating === 0) {
              alert("Please select a rating!");
              return;
          }
  
          const response = await fetch("../backend/submit_feedback.php", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: `rating=${selectedRating}&comment=${encodeURIComponent(comment)}`
          });
  
          const result = await response.json();
          if (result.success) {
              alert(result.message);
              feedbackForm.reset();
              stars.forEach((star) => star.classList.remove("active"));
              selectedRating = 0;
          } else {
              alert(result.message);
          }
      });
  
      const containSection = document.querySelector('.contain');
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
                  observer.unobserve(entry.target);
              }
          });
      }, { threshold: 0.3 });
      observer.observe(containSection);