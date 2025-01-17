let score = 0;
let currentScenario = 1;

function checkAnswer(button, isCorrect) {
    const scenario = button.closest('.scenario');
    const progressBar = document.getElementById('progress');

    if (isCorrect) {
        score += 10;
        document.getElementById('score').textContent = score;
        progressBar.style.width = `${(currentScenario / 5) * 100}%`;
    }

    scenario.classList.add('hidden');
    currentScenario++;

    const nextScenario = document.querySelector(`.scenario[data-scenario="${currentScenario}"]`);
    if (nextScenario) {
        nextScenario.classList.remove('hidden');
    } else {
        endGame();
    }
}

function triggerHack() {
    document.querySelectorAll('.scenario').forEach(scenario => scenario.classList.add('hidden'));
    document.getElementById('hacked').classList.remove('hidden');
}

function endGame() {
    document.getElementById('final-score').textContent = score;
    document.getElementById('end-game').classList.remove('hidden');
}

function restartGame() {
    score = 0;
    currentScenario = 1;
    document.getElementById('score').textContent = score;
    document.getElementById('progress').style.width = '0%';

    document.querySelectorAll('.scenario').forEach(scenario => scenario.classList.add('hidden'));
    document.querySelector('.scenario[data-scenario="1"]').classList.remove('hidden');
    document.getElementById('end-game').classList.add('hidden');
    document.getElementById('hacked').classList.add('hidden');
}
