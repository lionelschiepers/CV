// Runs before first paint so a saved theme doesn't flash the system theme first.
(function () {
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.dataset.theme = saved;
    }
  } catch (e) {
    // Storage can be unavailable (privacy mode); fall back to the system theme.
  }
})();
