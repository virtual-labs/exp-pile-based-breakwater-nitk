
// Don't touch the below code

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");


// Don't touch the above code




// Write your MCQs here --- Start --- --------------------

  const myQuestions = [
    {
      question: "Increase in number of rows of pile results in ___________ of transmitted wave height. ",
      answers: {
        a: "Increase",
        b: "Decrease",
        c: "None of the above"
      },
      correctAnswer: "b"
    },

    {
      question: "The breaking criteria of waves in shallow water is (where H is wave height, d is the depth of water). ",
      answers: {
        a: "Hd &lt; 0.078 ",
        b: "Hd &lt; 0.087",
        c: "Hd &lt; 0.78 ",
        d: "Hd &lt; 0.87"
      },
      correctAnswer: "c"
    },

    {
      question: "In the equation (H<sub>i</sub>/gT<sup>2</sup>), H<sub>i</sub> is? ",
      answers: {
        a: "Final wave height",
        b: "Initial wave height",
        c: "None of the above"
      },
      correctAnswer: "b"
    },
    {
        question: "Wave length is the distance between two successive crest or trough.",
        answers: {
          a: "True",
          b: "False"
        },
        correctAnswer: "a"
      },
    {
        question: "Wave rider buoy and Pressure type wave gauge is used to measure wave height. ",
    answers: {
          a: "False",
          b: "True"
        },
        correctAnswer: "b"
      }
  ];




// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
