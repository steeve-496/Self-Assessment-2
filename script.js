let score = 0;
let currentScenario = 1;
const totalScenarios = 10; // Total number of scenarios
const resultsData = [];

const explanations = {
    1: { correct: "File1.exe is suspicious because it's from an unverified source.", wrong: "Report.pdf and Image.jpg are common file types and less likely to be malicious." },
    2: { correct: "10.0.0.5 is flagged as suspicious in the firewall logs.", wrong: "192.168.1.1 and 172.16.0.2 are either allowed or known as safe IP addresses." },
    3: { correct: "Phishing emails often use generic messages like 'Click here' to reset your password.", wrong: "Legitimate emails never ask you to click links without verification." },
    4: { correct: "P@ssw0rd!2023 is strong due to its complexity, including letters, numbers, and symbols.", wrong: "Simple passwords like '123456' or 'password123' are easy to guess." },
    5: { correct: "Ignoring and closing the pop-up is the safest action.", wrong: "Clicking or providing your email risks exposing sensitive information." },
    6: { correct: "Installing updates from trusted sources ensures your device's security.", wrong: "Ignoring updates or downloading from random sites exposes your device to vulnerabilities." },
    7: { correct: "Always verify the caller’s identity via official channels before sharing sensitive information.", wrong: "Providing your PIN or ignoring the call without verification can lead to fraud." },
    8: { correct: "Checking app reviews and publisher details helps identify fake or malicious apps.", wrong: "Downloading or testing apps without verification risks malware exposure." },
    9: { correct: "Using a VPN ensures secure browsing on public Wi-Fi.", wrong: "Sharing sensitive information or connecting without precautions risks hacking." },
    10: { correct: "Do not open attachments from unknown senders to avoid malware.", wrong: "Opening or forwarding such attachments can spread malware to others." }
};

function checkAnswer(button, isCorrect, questionNumber) {
    const scenario = button.closest('.scenario');
    const progressBar = document.getElementById('progress');

    if (isCorrect) {
        score += 10;
        document.getElementById('score').textContent = score;
        resultsData.push({
            question: questionNumber,
            status: "Correct",
            explanation: explanations[questionNumber].correct
        });
    } else {
        resultsData.push({
            question: questionNumber,
            status: "Wrong",
            explanation: explanations[questionNumber].wrong
        });
    }

    // Update progress bar
    const progressPercentage = (currentScenario / totalScenarios) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    // Move to the next scenario
    scenario.classList.add('hidden');
    currentScenario++;

    const nextScenario = document.querySelector(`.scenario[data-scenario="${currentScenario}"]`);
    if (nextScenario) {
        nextScenario.classList.remove('hidden');
    } else {
        showResults();
    }
}

function triggerHack() {
    const modal = document.getElementById('hacked-modal');
    modal.classList.remove('hidden');

    // Close modal and continue to the next question
    const closeModalButton = document.getElementById('close-hack');
    closeModalButton.addEventListener('click', () => {
        modal.classList.add('hidden');

        // Mark as wrong and move to the next question
        resultsData.push({
            question: currentScenario,
            status: "Wrong",
            explanation: "Clicking on unverified links can lead to hacking or phishing attacks."
        });

        // Update progress bar
        const progressBar = document.getElementById('progress');
        const progressPercentage = (currentScenario / totalScenarios) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        // Move to the next scenario
        const scenario = document.querySelector(`.scenario[data-scenario="${currentScenario}"]`);
        scenario?.classList.add('hidden');
        currentScenario++;

        const nextScenario = document.querySelector(`.scenario[data-scenario="${currentScenario}"]`);
        if (nextScenario) {
            nextScenario.classList.remove('hidden');
        } else {
            showResults();
        }
    });
}

function showResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<h3>Your Score: ${score}/100</h3>`;
    resultsData.forEach(result => {
        resultsDiv.innerHTML += `
            <div>
                <h4>Question ${result.question}: ${result.status}</h4>
                <p>${result.explanation}</p>
            </div>
        `;
    });

    document.getElementById('end-game').classList.remove('hidden');
}
