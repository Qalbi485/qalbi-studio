document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("year").textContent = new Date().getFullYear();

  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  toggle.addEventListener("click", function () {
    links.classList.toggle("open");
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { links.classList.remove("open"); });
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  var statsBox = document.getElementById("stats");
  var counted = false;
  var cio = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      document.querySelectorAll(".stat-num").forEach(function (el) {
        var target = parseInt(el.dataset.target, 10);
        var suffix = el.dataset.suffix || "";
        var start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / 1400, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
      cio.disconnect();
    }
  }, { threshold: 0.4 });
  if (statsBox) cio.observe(statsBox);

});
