function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) this.score++;
    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if(quiz.isEnded()) showScores();
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your score: " + quiz.score 
                                + "/" + this.questions.length + "</h2>\n<h2 id='ans'>Correct Answers:</h2>";
    for(var i = 0; i < this.questions.length; i++) 
        gameOverHTML += "<h3 id='ans'>" + (i+1).toString() 
                                + ". " + this.questions[i].answer + "</h3>\n";
    document.getElementById("quiz").innerHTML = gameOverHTML;
};

// create questions here
var questions = [
    new Question("Which is the period of accounting year in Indian economics", ["April to March", "February to March ", "August to September", "December to January"], "April to March"),
    new Question("Who officially first tried to compute the National Income?", ["Dadabhai Naoroji", "Dr. V.K.R.V Rao", "P.C Mahalanobis", "NSO"], "P.C Mahalanobis"),
    new Question("Trade, Financial, Real state come under which sector under the economic survey?", ["Primary", "Secondary", "Tertiary", "None of them"], "Tertiary"),
    new Question("Factor cost = ?", ["Market price – Net Indirect taxes", "Indirect taxes - subsidies", "GDP - Depreciation", "NDP + NFIA"], " Market price – Net Indirect taxes "),
    new Question("Product method is also called…", ["Value added method", "Income method", "Distribution method", "Expenditure method"], " Value added method "),
    new Question("In which year did CSO merge with NSSO", ["2012", "2019", "2014", "2008"], "2019"),
    new Question("Which are NOT  the indices of Human development Report", ["MPI", "GDI", "GII", "None"], "None"),
    new Question("The index value of HDI varies between?", ["0 and 1", "2 and 3", "1 and 10", "None"], "0 and 1"),
    new Question("The Indian Heritage in Rajasthan", ["Jaipur city", "Rani ki Vav", "Humayun’s Tomb", "All"], "Jaipur city"),
    new Question("Which is NOT an indirect tax", ["Vat", "Service tax", "Custom tax", "Income tax"], "Income tax"),
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();