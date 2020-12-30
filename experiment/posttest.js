
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
      question: "The relationship between time period, wavelength and depth of water is given by",
      answers: {
        a: "L=gT<sup>2</sup>coth(kd)",
        b: "L=gT<sup>2</sup>tanh(kd)",
        c: "L=gT<sup>2</sup>cot(kd) ",
        d: "L=gT<sup>2</sup>tan(kd)"
      },
      correctAnswer: "b"
    },

    {
      question: "The density of seawater considered in the design of marine structures is ",
      answers: {
        a: "990-1000 kg/m<sup>3</sup>",
        b: "1010-1020 kg/m<sup>3</sup>",
        c: "1020-1030 kg/m<sup>3</sup>",
        d: "1030-1040 kg/m<sup>3</sup>"
      },
      correctAnswer: "c"
    },

    {
      question: "In REEF3D, as per relaxation beach method the typical wavelength of the dissipating relaxation zone should be",
      answers: {
        a: "d",
        b: "L",
        c: "2d",
        d: "2L"
      },
      correctAnswer: "d"
    },
    {
      question: "The mesh is described by ",
      answers: {
        a: "ctrl.txt",
        b: "control.txt",
        c: "reef3d",
        d: "DIVEMesh"
      },
      correctAnswer: "b"
    },
    {
      question: "In the REEF3D execution command “mpiexec -n 4 reef3d”, what does “4” signify?",
      answers: {
        a: "Number of processors",
        b: "Number of threads",
        c: "Number of data files",
        d: "Number of cores"
      },
      correctAnswer: "a"
    }
  ];

// ---------------------------- End -------------------------------

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
