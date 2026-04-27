 var qData = [
    
    { q: "Select the most appropriate SYNONYM of the word: 'ABANDON'", a: "Forsake", opts: ["Adopt", "Forsake", "Retain", "Uphold"] },
    { q: "Select the most appropriate SYNONYM of the word: 'PRUDENT'", a: "Wise", opts: ["Reckless", "Hasty", "Wise", "Foolish"] },
    
    
    { q: "Select the most appropriate ANTONYM of the word: 'BENEVOLENT'", a: "Malevolent", opts: ["Kind", "Generous", "Friendly", "Malevolent"] },
    { q: "Select the most appropriate ANTONYM of the word: 'AMBIGUOUS'", a: "Clear", opts: ["Vague", "Clear", "Obscure", "Uncertain"] },

    
    { q: "A person who is unable to pay his debts.", a: "Insolvent", opts: ["Solvent", "Lender", "Insolvent", "Borrower"] },
    { q: "A place where bees are kept.", a: "Apiary", opts: ["Aviary", "Aquarium", "Kennel", "Apiary"] },

  
    { q: "Meaning of the idiom: 'To spill the beans'", a: "To reveal a secret", opts: ["To reveal a secret", "To cook beans", "To waste food", "To be clumsy"] },
    { q: "Meaning of the idiom: 'At the eleventh hour'", a: "At the last moment", opts: ["At 11:00 AM", "Too early", "At the last moment", "Suddenly"] },

   
    { q: "Identify the segment that contains a grammatical error: 'Neither the mouse nor the lions (A) / was caught (B) / in the net (C).'", a: "was caught", opts: ["Neither the mouse", "nor the lions", "was caught", "in the net"] },
    { q: "Identify the segment that contains a grammatical error: 'He is (A) / more taller (B) / than his brother (C).'", a: "more taller", opts: ["He is", "more taller", "than his", "brother"] },

    
    { q: "Improve the bracketed part: 'Hardly had he reached the station (than) the train started.'", a: "when", opts: ["then", "when", "that", "No improvement"] },
    { q: "Improve the bracketed part: 'The furniture in this room (are) very old.'", a: "is", opts: ["is", "were", "have been", "No improvement"] },

   
    { q: "The committee ____ divided in their opinion regarding the new policy.", a: "were", opts: ["was", "were", "is", "has"] },
    { q: "She is proficient ____ English and French.", a: "in", opts: ["at", "with", "in", "for"] },

    
    { q: "Change into Passive Voice: 'The boy killed the snake.'", a: "The snake was killed by the boy.", opts: ["The snake is killed by the boy.", "The snake was killed by the boy.", "The snake had been killed.", "The snake killed by boy."] },
    { q: "Change into Active Voice: 'A letter was being written by her.'", a: "She was writing a letter.", opts: ["She wrote a letter.", "She is writing a letter.", "She was writing a letter.", "She has written a letter."] },

    
    { q: "Change into Indirect Speech: 'He said, \"I am busy.\"'", a: "He said that he was busy.", opts: ["He said that he is busy.", "He said that he was busy.", "He says he is busy.", "He told he was busy."] },
    { q: "Change into Direct Speech: 'She asked me where I lived.'", a: "She said to me, \"Where do you live?\"", opts: ["She said, \"Where do you live?\"", "She said to me, \"Where do you live?\"", "She told, \"Where I live?\"", "She said, \"Where live you?\""] },

    
    { q: "Select the CORRECTLY spelt word:", a: "Committee", opts: ["Comittee", "Committee", "Comitee", "Commitee"] },
    { q: "Select the INCORRECTLY spelt word:", a: "Occured", opts: ["Occurrence", "Occur", "Occurring", "Occured"] },

   
    { q: "Cloze Test 1: Education is the ____ tool for personal growth.", a: "essential", opts: ["bad", "essential", "minor", "heavy"] },
    { q: "Cloze Test 2: It helps individuals to ____ knowledge and skills.", a: "acquire", opts: ["lose", "forget", "acquire", "ignore"] },
    { q: "Cloze Test 3: Without education, one ____ face many challenges.", a: "might", opts: ["might", "did", "never", "should not"] },
    { q: "Cloze Test 4: Teachers play a ____ role in shaping students.", a: "pivotal", opts: ["useless", "pivotal", "small", "negative"] },
    { q: "Cloze Test 5: Literacy rates are ____ improving across the globe.", a: "gradually", opts: ["suddenly", "gradually", "never", "badly"] }
];

var curQ = 0, correctCount = 0, wrongCount = 0, qTimer, secLeft = 30;

function beginQuizNow() {
    document.getElementById("start-area").style.display = "none";
    document.getElementById("quiz-main-container").style.display = "block";
    displayNextQuestion();
}

function runTimer() {
    secLeft = 30;
    document.getElementById("timer-box").innerHTML = secLeft;
    clearInterval(qTimer);
    qTimer = setInterval(function() {
        secLeft--;
        document.getElementById("timer-box").innerHTML = secLeft;
        if(secLeft <= 0) { 
            clearInterval(qTimer); 
            wrongCount++; 
            revealCorrectAns(); 
        }
    }, 1000);
}

function displayNextQuestion() {
    if (curQ >= qData.length) { 
        showFinalSummary(); 
        return; 
    }
    runTimer();
    var currentData = qData[curQ];
    document.getElementById("quiz-progress").innerHTML = "প্রশ্ন: " + (curQ + 1) + " / " + qData.length;
    document.getElementById("main-q-text").innerHTML = (curQ + 1) + ". " + currentData.q;
    
    var optContainer = document.getElementById("main-opt-container");
    optContainer.innerHTML = "";
    
    currentData.opts.forEach(function(val) {
        var b = document.createElement("button");
        b.className = "opt-btn"; 
        b.innerHTML = val;
        b.onclick = function() { validateUserChoice(b, val); };
        optContainer.appendChild(b);
    });
}

function validateUserChoice(btn, selected) {
    clearInterval(qTimer);
    var allButtons = document.querySelectorAll(".opt-btn");
    allButtons.forEach(function(item) { item.disabled = true; });

    if (selected === qData[curQ].a) {
        btn.classList.add("correct-ans");
        correctCount++;
       
        document.getElementById("score-val").innerHTML = correctCount;
    } else {
        btn.classList.add("wrong-ans");
        wrongCount++;
        allButtons.forEach(function(item) { 
            if(item.innerHTML === qData[curQ].a) item.classList.add("correct-ans"); 
        });
    }
    setTimeout(moveForward, 1200);
}

function revealCorrectAns() {
    var allButtons = document.querySelectorAll(".opt-btn");
    allButtons.forEach(function(item) {
        if(item.innerHTML === qData[curQ].a) item.classList.add("correct-ans");
        item.disabled = true;
    });
    setTimeout(moveForward, 1200);
}

function moveForward() {
    curQ++;
    displayNextQuestion();
}

function showFinalSummary() {
    document.getElementById("question-area").style.display = "none";
    document.getElementById("quiz-progress").style.display = "none";
    document.getElementById("timer-box").style.display = "none";
    
    var penalty = Math.floor(wrongCount / 3);
    var finalScore = correctCount - penalty;
    if(finalScore < 0) finalScore = 0;

    var resPanel = document.getElementById("result-area");
    resPanel.style.display = "block";
    
    var feedback = "";
    var feedbackClass = "";

    if(finalScore >= 20) {
        feedback = "Outstanding! You are a genius.";
        feedbackClass = "res-outstanding";
    } else if(finalScore >= 15) {
        feedback = "Very Good! Keep it up.";
        feedbackClass = "res-vgood";
    } else if(finalScore >= 12) {
        feedback = "Good Performance.";
        feedbackClass = "res-good";
    } else {
        feedback = "Good try, more practice needed.";
        feedbackClass = "res-try";
    }

    
    resPanel.innerHTML = `
        <div class="final-card ${feedbackClass}">
            <h2 style="color: inherit;">Quize End!</h2>
            <hr style="opacity: 0.2;">
            <p>Right Answer: <b>${correctCount}</b></p>
            <p>Wrong Answer: <b>${wrongCount}</b></p>
            <p>Negative Marking: <b>-${penalty}</b></p>
            <div class="final-score-box">
                Your Total Score: <span style="color: #e67e22; font-weight: bold;">${finalScore} / ${qData.length}</span>
            </div>
            <h3 class="feedback-text" style="color: inherit;">${feedback}</h3>
            <button onclick="location.reload()" class="retry-btn">Try Again</button>
        </div>
    `;
}
