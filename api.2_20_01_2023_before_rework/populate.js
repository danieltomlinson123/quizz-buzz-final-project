const { connect, disconnect } = require("mongoose");
const { User, Question, GameCode } = require("./models");

connect("mongodb://127.0.0.1:27017/final-project")
  // .then(() => mongoose.connection.db.dropDatabase())
  .then(() =>
    Promise.all([
      User.deleteMany(),
      Question.deleteMany(),
      GameCode.deleteMany(),
    ])
  )
  .then(() => {
    const pepito = new User({
      name: "Pepito Grillo",
      email: "pepito@grillo.com",
      password: "123123123",
      favorites: [],
    });

    const wendy = new User({
      name: "Wendy Darling",
      email: "wendy@darling.com",
      password: "12312123",
      favorites: [],
    });

    const peter = new User({
      name: "Peter Pan",
      email: "peter@pan.com",
      password: "123123123",
      favorites: [],
    });

    const james = new User({
      name: "James Hook",
      email: "james@hook.com",
      password: "123123123",
      favorites: [],
    });

    /* const pepito2 = new User({
      name: "Pepito Grillo",
      email: "pepito2@grillo2.com",
      password: "123123123",
      favorites: [],
    });

    const wendy2 = new User({
      name: "Wendy Darling",
      email: "wendy2@darling2.com",
      password: "12312123",
      favorites: [],
    });

    const peter2 = new User({
      name: "Peter Pan",
      email: "peter2@pan2.com",
      password: "123123123",
      favorites: [],
    });

    const james2 = new User({
      name: "James Hook",
      email: "james2@hook2.com",
      password: "123123123",
      favorites: [],
    }); */

    debugger;

    return Promise.all([
      pepito.save(),
      wendy.save(),
      peter.save(),
      james.save(),
      /* pepito2.save(),
      wendy2.save(),
      peter2.save(),
      james2.save(), */
    ]);
  })
  /* .then((users) => {
    const [pepito, wendy, peter, james] = users;
  }) */
  .then(
    ([
      pepito,
      wendy,
      peter,
      james,
      // pepito2, wendy2, peter2, james2
    ]) => {
      const question1 = new Question({
        user: pepito.id,
        question: "What year was the first model of the iPhone released?",
        suggestedAnswer: "2007",
        visibility: "public",
        timeLimit: 30000,
        questionType: "written",
      });
      const question2 = new Question({
        user: wendy.id,
        question: "Is Java a type of OS?",
        suggestedAnswer: "No",
        visibility: "public",
        timeLimit: 30000,
        questionType: "written",
      });
      const question3 = new Question({
        user: peter.id,
        question: "Who discovered penicillin?",
        suggestedAnswer: "Alexander Flemming",
        visibility: "public",
        timeLimit: 30000,
        questionType: "written",
      });
      const question4 = new Question({
        user: james.id,
        question: "Who was the first woman to win a Nobel Prize(in 1903)?",
        suggestedAnswer: "Marie Curie",
        visibility: "public",
        timeLimit: 30000,
        questionType: "written",
      });
      const question5 = new Question({
        user: pepito.id,
        question: "Which part of the atom has no electric charge?",
        suggestedAnswer: "Neutron",
        visibility: "private",
        timeLimit: 30000,
        questionType: "written",
      });
      const question6 = new Question({
        user: wendy.id,
        question: "What is the symbol for potassium in the periodic table?",
        suggestedAnswer: "K",
        visibility: "private",
        timeLimit: 30000,
        questionType: "written",
      });
      const question7 = new Question({
        user: peter.id,
        question: "Which planet is the hottest in the solar system?",
        suggestedAnswer: "Venus",
        visibility: "public",
        timeLimit: 30000,
        questionType: "written",
      });
      const question8 = new Question({
        user: james.id,
        question: "What was superman's birthname?",
        suggestedAnswer: "Kal-El",
        visibility: "public",
        timeLimit: 30000,
        questionType: "written",
      });
      const question9 = new Question({
        user: pepito.id,
        question:
          "Which company owns Bugatti, Lamborghini, Audi, Porsche and Ducati?",
        suggestedAnswer: "",
        visibility: "public",
        timeLimit: 30000,
        questionType: "MCQ",
        answerA: ["Renault", "incorrect"],
        answerB: ["Nissan", "incorrect"],
        answerC: ["Mercedes", "incorrect"],
        answerD: ["Volkswagen", "correct"],
      });
      const question10 = new Question({
        user: wendy.id,
        question: "What is the longest-running Broadway show?",
        suggestedAnswer: "",
        visibility: "public",
        timeLimit: 30000,
        questionType: "MCQ",
        answerA: ["Phantom of the Opera", "correct"],
        answerB: ["Grease", "incorrect"],
        answerC: ["The Sound of Music", "incorrect"],
        answerD: ["Hamlet", "incorrect"],
      });
      const question11 = new Question({
        user: peter.id,
        question:
          "Who did Forbes name the youngest self-made billionaire in 2019?",
        suggestedAnswer: "",
        visibility: "public",
        timeLimit: 30000,
        questionType: "MCQ",
        answerA: ["Ryan Breslow", "incorrect"],
        answerB: ["Kylie Jenner", "correct"],
        answerC: ["Gary Wang", "incorrect"],
        answerD: ["Rihanna", "incorrect"],
      });
      const question12 = new Question({
        user: james.id,
        question:
          "In which year did Usain Bolt set his 100m in 9.58s world record?",
        suggestedAnswer: "",
        visibility: "public",
        timeLimit: 30000,
        questionType: "MCQ",
        answerA: ["2005", "incorrect"],
        answerB: ["2007", "incorrect"],
        answerC: ["2009", "correct"],
        answerD: ["2012", "incorrect"],
      });
      const question13 = new Question({
        user: pepito.id,
        question:
          "What is the name of the song that Queen Elsa sings as she builds her ice castle in Frozen?",
        suggestedAnswer: "",
        visibility: "public",
        timeLimit: 30000,
        questionType: "MCQ",
        answerA: ["Let it grow", "incorrect"],
        answerB: ["Let it show", "incorrect"],
        answerC: ["Let it snow", "incorrect"],
        answerD: ["Let it go", "correct"],
      });
      const question14 = new Question({
        user: wendy.id,
        question: "Which Indiana Jones movie was released in 1984?",
        suggestedAnswer: "",
        visibility: "public",
        timeLimit: 30000,
        questionType: "MCQ",
        answerA: ["Indiana Jones and the Temple of Doom", "correct"],
        answerB: ["Indiana Jones and the Raiders of the Lost Ark", "incorrect"],
        answerC: [
          "Indiana Jones and the Kingdom of the Crystal Skull",
          "incorrect",
        ],
        answerD: ["Indiana Jones and the Last Crusade", "incorrect"],
      });
      const question15 = new Question({
        user: peter.id,
        question: "What was the name of Batman's butler?",
        suggestedAnswer: "",
        visibility: "public",
        timeLimit: 30000,
        questionType: "MCQ",
        answerA: ["James", "incorrect"],
        answerB: ["Alfred", "correct"],
        answerC: ["Bruce", "incorrect"],
        answerD: ["Gordon", "incorrect"],
      });
      const question16 = new Question({
        user: james.id,
        question: "What was superman's birthname?",
        suggestedAnswer: "",
        visibility: "public",
        timeLimit: 30000,
        questionType: "MCQ",
        answerA: ["Kal-El", "correct"],
        answerB: ["Karl", "incorrect"],
        answerC: ["Clark", "incorrect"],
        answerD: ["Krypton", "incorrect"],
      });

      debugger;

      return Promise.all([
        question1.save(),
        question2.save(),
        question3.save(),
        question4.save(),
        question5.save(),
        question6.save(),
        question7.save(),
        question8.save(),
        question9.save(),
        question10.save(),
        question11.save(),
        question12.save(),
        question13.save(),
        question14.save(),
        question15.save(),
        question16.save(),
      ]);
    }
  )
  .catch((error) => {
    debugger;
  })
  .then(() => disconnect());
