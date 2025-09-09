document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timerDisplay');
    const startStopBtn = document.getElementById('startStopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const addTimeBtns = document.querySelectorAll('.timer-add-btn');

    let timerInterval;
    let totalSeconds = 0; // Initial time in seconds
    let isRunning = false;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function updateTimerDisplay() {
        timerDisplay.textContent = formatTime(totalSeconds);
    }

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            startStopBtn.textContent = 'Stop';
            timerInterval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timerInterval);
                    isRunning = false;
                    startStopBtn.textContent = 'Start';
                    // Optional: Add an alert or visual cue when timer finishes
                    alert('Time is up!');
                }
            }, 1000);
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            startStopBtn.textContent = 'Start';
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        startStopBtn.textContent = 'Start';
        totalSeconds = 0; // Reset to 0 or a default value
        updateTimerDisplay();
    }

    function addTime(secondsToAdd) {
        totalSeconds += secondsToAdd;
        updateTimerDisplay();
    }

    // Event Listeners
    startStopBtn.addEventListener('click', startTimer);
    resetBtn.addEventListener('click', resetTimer);
    addTimeBtns.forEach(button => {
        button.addEventListener('click', () => {
            const timeToAdd = parseInt(button.dataset.time);
            addTime(timeToAdd);
        });
    });

    // Initial display
    updateTimerDisplay();

    // Function to update the current time (for the header)
    function updateCurrentTime() {
        const currentTimeElement = document.getElementById('currentTime'); // Assuming you add this ID to your HTML
        if (currentTimeElement) {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            currentTimeElement.textContent = now.toLocaleDateString('en-US', options);
        }
    }
    // Call once immediately and then every second
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
});
