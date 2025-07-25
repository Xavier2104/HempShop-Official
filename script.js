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