const GIFT_DESCRIPTIONS = {
    'LEADERSHIP': 'Leadership aids the body by leading and directing members to accomplish the goals and purposes of the church. Leadership motivates people to work together in unity toward common goals (Rom. 12:8).',
    'ADMINISTRATION': 'Persons with the gift of administration lead the body by steering others to remain on task. Administration enables the body to organize according to God-given purposes and long-term goals (1 Cor. 12:28).',
    'TEACHING': 'Teaching is instructing members in the truths and doctrines of God’s Word for the purposes of building up, unifying, and maturing the body (1 Cor. 12:28; Rom. 12:7; Eph. 4:11).',
    'KNOWLEDGE': 'The gift of knowledge manifests itself in teaching and training in discipleship. It is the God-given ability to learn, know, and explain the precious truths of God’s Word. A word of knowledge is a Spirit-revealed truth (1 Cor. 12:28).',
    'WISDOM': 'Wisdom is the gift that discerns the work of the Holy Spirit in the body and applies His teachings and actions to the needs of the body (1 Cor. 12:28).',
    'PROPHECY': 'The gift of prophecy is proclaiming the Word of God boldly. This builds up the body and leads to conviction of sin. Prophecy manifests itself in preaching and teaching (1 Cor. 12:10; Rom. 12:6).',
    'DISCERNMENT': 'Discernment aids the body by recognizing the true intentions of those within or related to the body. Discernment tests the message and actions of others for the protection and well-being of the body (1 Cor. 12:10).',
    'EXHORTATION': 'Possessors of this gift encourage members to be involved in and enthusiastic about the work of the Lord. Members with this gift are good counselors and motivate others to service.',
    'SHEPHERDING': 'The gift of shepherding is manifested in people who look out for the spiritual welfare of others. Although pastors, like shepherds, do care for members of the church, this gift is not limited to a pastor or staff member (Eph. 4:11).',
    'FAITH': 'Faith trusts God to work beyond the human capabilities of the people. Believers with this gift encourage others to trust in God in the face of apparently insurmountable odds (1 Cor. 12:9).',
    'EVANGELISM': 'God gifts his church with evangelists to lead others to Christ effectively and enthusiastically. This gift builds up the body by adding new members to its fellowship (Eph. 4:11).',
    'APOSTLESHIP': 'The church sends apostles from the body to plant churches or be missionaries. Apostles motivate the body to look beyond its walls in order to carry out the Great Commission (1 Cor. 12:28; Eph. 4:11).',
    'SERVICE/HELPS': 'Those with the gift of service/helps recognize practical needs in the body and joyfully give assistance to meeting those needs. Christians with this gift do not mind working behind the scenes (1 Cor. 12:28; Rom. 12:7).',
    'MERCY': 'Cheerful acts of compassion characterize those with the gift of mercy. Persons with this gift aid the body by empathizing with hurting members. They keep the body healthy and unified by keeping others aware of the needs within the church (Rom. 12:8).',
    'GIVING': 'Members with the gift of giving give freely and joyfully to the work and mission of the body. Cheerfulness and liberality are characteristics of individuals with this gift (Rom. 12:8).',
    'HOSPITALITY': 'Those with this gift make visitors, guests, and strangers feel at ease. They often use their home to entertain guests. Persons with this gift integrate new members into the body (1 Pet. 4:9).',
};

document.addEventListener('DOMContentLoaded', () => {

    const appContainer = document.getElementById('app');
    const questionsDataElement = document.getElementById('questions-data');

    if (!questionsDataElement) {
        appContainer.innerHTML = '<p>Error: Questions data not found.</p>';
        return;
    }

    const questions = JSON.parse(questionsDataElement.textContent);
    let currentQuestionIndex = 0;
    let responses = {};

    let currentView = 'directions';
    function switchView(viewName) {
        currentView = viewName;
        const views = ['directions', 'survey', 'results', 'info'];
        views.forEach(v => {
            document.getElementById(`view-${v}`).style.display = v === viewName ? 'block' : 'none';
        });
    }

    function renderDirections() {
        const container = document.getElementById('view-directions');
        container.innerHTML = `
            <div class="directions-container">
                <h3>Welcome to the Spiritual Gifts Survey</h3>
                <p>This is a tool for self-discovery, not a test—there are no right or wrong answers. The survey consists of 80 statements—some reflect concrete actions, some are descriptive traits, and others are statements of belief.</p>
                <p><strong>To get the most accurate results:</strong></p>
                <ul>
                    <li><strong>Be honest with yourself.</strong> Select the response that you feel best characterizes you.</li>
                    <li><strong>Trust your first instinct.</strong> Don't spend too much time on any one item. Usually, your immediate response is best.</li>
                    <li><strong>Work independently.</strong> To ensure the results reflect your own gifts, do not ask others how they are answering or how they think you should answer.</li>
                    <li><strong>Go at your own pace.</strong> Take the time you need, but try not to overthink the questions.</li>
                </ul>
                <button id="start-survey-btn">Start Survey</button>
            </div>
        `;
        document.getElementById('start-survey-btn').addEventListener('click', () => {
            switchView('survey');
            renderQuestion();
        });
    }

    renderDirections();
    switchView('directions');

    function renderInfo() {
        const container = document.getElementById('view-info');
        let html = `<h3>Understanding Your Gifts</h3><div class="gift-list">`;
        for (const [gift, desc] of Object.entries(GIFT_DESCRIPTIONS)) {
            html += `<div class="gift-item"><strong>${gift}</strong>: ${desc}</div>`;
        }
        html += `</div><div class="navigation"><button id="back-to-results-btn">Back to Results</button></div>`;
        container.innerHTML = html;
        document.getElementById('back-to-results-btn').addEventListener('click', () => switchView('results'));
    }

    function renderQuestion() {

        const question = questions[currentQuestionIndex];
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

        document.getElementById('view-survey').innerHTML = `
            <div class="survey-container">
                <div class="progress-wrapper">
                    <label>Question ${currentQuestionIndex + 1} of ${questions.length}</label>
                    <progress value="${progress}" max="100"></progress>
                </div>

                <div class="question-block">
                    <h3>${question}</h3>
                    <fieldset>
                        <legend>How much do you agree with this statement?</legend>
                        <div class="grid">
                            <label>
                                <input type="radio" name="answer" value="1" ${responses[currentQuestionIndex] === 1 ? 'checked' : ''}>
                                1 - Not at all true for me
                            </label>
                            <label>
                                <input type="radio" name="answer" value="2" ${responses[currentQuestionIndex] === 2 ? 'checked' : ''}>
                                2 - Occasionally true (about 25%)
                            </label>
                            <label>
                                <input type="radio" name="answer" value="3" ${responses[currentQuestionIndex] === 3 ? 'checked' : ''}>
                                3 - Sometimes true (about 50%)
                            </label>
                            <label>
                                <input type="radio" name="answer" value="4" ${responses[currentQuestionIndex] === 4 ? 'checked' : ''}>
                                4 - Most of the time true
                            </label>
                            <label>
                                <input type="radio" name="answer" value="5" ${responses[currentQuestionIndex] === 5 ? 'checked' : ''}>
                                5 - Definitely true for me
                            </label>
                        </div>
                    </fieldset>
                </div>

                <div class="navigation">
                    <button id="prev-btn" class="outline" ${currentQuestionIndex === 0 ? 'disabled' : ''}>Previous</button>
                    <button id="next-btn">${currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}</button>
                </div>
            </div>
        `;

        document.getElementById('prev-btn').addEventListener('click', handlePrevious);
        document.getElementById('next-btn').addEventListener('click', handleNext);

        // Handle automatic transition on radio selection (optional but often preferred)
        // To strictly follow "Implement handleAnswer() to save the response and automatically move to the next question",
        // I'll add event listeners to the radio buttons.
        document.querySelectorAll('input[name="answer"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                handleAnswer(parseInt(e.target.value));
            });
        });
    }

    function handleAnswer(value) {
        responses[currentQuestionIndex] = value;
        // Auto-move to next if not on the last question
        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                currentQuestionIndex++;
                renderQuestion();
            }, 300); // Slight delay for better UX
        }
    }

    function handlePrevious() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuestion();
        }
    }

    function handleNext() {
        const selected = document.querySelector('input[name="answer"]:checked');
        if (!selected) {
            alert('Please select an answer before proceeding.');
            return;
        }

        const value = parseInt(selected.value);
        responses[currentQuestionIndex] = value;

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            renderQuestion();
        } else {
            finishSurvey();
        }
    }

    function restartQuiz() {
        responses = {}; // Clear answers
        currentQuestionIndex = 0; // Reset index
        switchView('directions');
        renderDirections();
    }

    async function finishSurvey() {
        switchView('results');
        document.getElementById('view-results').innerHTML = `
            <div class="results-placeholder">
                <h3>Assessment Complete!</h3>
                <p>Thank you for completing the survey. Your results are being calculated...</p>
                <div class="spinner"></div>
            </div>
        `;

        try {
            const response = await fetch('/api/score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ responses }),
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            renderResults(data);
        } catch (error) {
            console.error('Error submitting survey:', error);
            document.getElementById('view-results').innerHTML = `
                <div class="error-container">
                    <h3>Submission Error</h3>
                    <p>Sorry, there was a problem calculating your results: ${error.message}</p>
                    <button id="retry-btn">Retry Submission</button>
                </div>
            `;
            document.getElementById('retry-btn').addEventListener('click', finishSurvey);
        }
    }

    function renderResults(data) {
        document.getElementById('view-results').innerHTML = `
            <div class="results-container">
                <h3>Your Spiritual Gifts Profile</h3>
                <p>Below are the scores for each of the 16 spiritual gifts. Higher scores indicate a stronger alignment with that gift.</p>
                <div style="position: relative; height:60vh; width:100%">
                    <canvas id="resultsChart"></canvas>
                </div>
                <div class="navigation">
                    <button id="view-info-btn">View Gift Descriptions</button>
                    <button id="restart-btn" class="outline">Restart Survey</button>
                </div>
            </div>
        `;

        const ctx = document.getElementById('resultsChart').getContext('2d');

        // Extract labels and values from the results data
        const labels = Object.keys(data.scores);
        const values = Object.values(data.scores);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Score',
                    data: values,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 25,
                        title: {
                            display: true,
                            text: 'Score (0-25)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Spiritual Gifts'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        document.getElementById('view-info-btn').addEventListener('click', () => {
            switchView('info');
            renderInfo();
        });

        document.getElementById('restart-btn').addEventListener('click', restartQuiz);
    }

});
