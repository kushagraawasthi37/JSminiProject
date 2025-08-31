document.addEventListener("DOMContentLoaded", () => {
  let startBtn = document.getElementById("start-btn");
  let restartBtn = document.getElementById("restart-btn");
  let nextBtn = document.getElementById("next-btn");

  let questionContainer = document.getElementById("question-container");
  let questionText = document.getElementById("question-text");
  let choiceList = document.getElementById("choices-list");
  let resultContainer = document.getElementById("result-container");
  let scoreDisplay = document.getElementById("score");

  //Suppose we wan to have only few question not all quesion
  let noOfQuestion = 4;
  const quizData = [
    {
      question: "What is the capital of France?",
      choices: ["Berlin", "Paris", "Madrid", "Rome"],
      answer: "Paris",
      marks: 1,
    },
    {
      question: "Which programming language is used for web development?",
      choices: ["Python", "C++", "JavaScript", "Java"],
      answer: "JavaScript",
      marks: 2,
    },
    {
      question: "Who is known as the Father of Computers?",
      choices: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"],
      answer: "Charles Babbage",
      marks: 1,
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Earth", "Mars", "Venus", "Jupiter"],
      answer: "Mars",
      marks: 3,
    },
    {
      question: "What does HTML stand for?",
      choices: [
        "HyperText Markup Language",
        "HighText Machine Language",
        "HyperTransfer Markup Language",
        "Hyperlink Text Making Language",
      ],
      answer: "HyperText Markup Language",
      marks: 2,
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  let totalMarks = 0;
  let i = 0;
  quizData.forEach((que) => {
    if (i < noOfQuestion) {
      totalMarks += que.marks;
      i++;
    }
  });

  startBtn.addEventListener("click", startQuiz);

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    noOfQuestion--;

    if (currentQuestionIndex < quizData.length && noOfQuestion > 0) {
      showQuestion();
    } else {
      showResult();
    }
  });

  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  });

  function showResult() {
    resultContainer.classList.remove("hidden");
    questionContainer.classList.add("hidden");
    nextBtn.classList.add("hidden");
    scoreDisplay.textContent = `${score} out of ${totalMarks}`;
  }

  function startQuiz() {
    console.log("Button clicked");
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  function showQuestion() {
    nextBtn.classList.add("hidden");
    questionText.textContent = quizData[currentQuestionIndex].question;
    choiceList.innerHTML = ""; //Clear previous choices
    quizData[currentQuestionIndex].choices.forEach((choice) => {
      let li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => selectAnswer(choice));
      choiceList.appendChild(li);
    });
  }

  function selectAnswer(choice) {
    if (choice === quizData[currentQuestionIndex].answer) {
      score = score + quizData[currentQuestionIndex].marks;
    }
    nextBtn.classList.remove("hidden");
  }
});
