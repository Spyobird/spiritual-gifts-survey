document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app');
    const questionsDataElement = document.getElementById('questions-data');

    if (!questionsDataElement) {
        appContainer.innerHTML = '<p>Error: Questions data not found.</p>';
        return;
    }

    const questions = JSON.parse(questionsDataElement.textContent);
    let currentQuestionIndex = 0;
    const responses = {};

    function renderQuestion() {
        const question = questions[currentQuestionIndex];
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

        appContainer.innerHTML = `
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
                                1 - Strongly Disagree
                            </label>
                            <label>
                                <input type="radio" name="answer" value="2" ${responses[currentQuestionIndex] === 2 ? 'checked' : ''}>
                                2 - Disagree
                            </label>
                            <label>
                                <input type="radio" name="answer" value="3" ${responses[currentQuestionIndex] === 3 ? 'checked' : ''}>
                                3 - Neutral
                            </label>
                            <label>
                                <input type="radio" name="answer" value="4" ${responses[currentQuestionIndex] === 4 ? 'checked' : ''}>
                                4 - Agree
                            </label>
                            <label>
                                <input type="radio" name="answer" value="5" ${responses[currentQuestionIndex] === 5 ? 'checked' : ''}>
                                5 - Strongly Agree
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

    function finishSurvey() {
        console.log('Survey Finished. Responses:', responses);
        appContainer.innerHTML = `
            <div class="results-placeholder">
                <h3>Assessment Complete!</h3>
                <p>Thank you for completing the survey. Your results are being calculated...</p>
                <p><i>(Results visualization will be implemented in the next task)</i></p>
            </div>
        `;
    }

    renderQuestion();
});
