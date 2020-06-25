// Open Trivia
// https://opentdb.com/api_config.php

// Instrucciones
// 1. Muestra al usuario las distintas categorias entre las cuáles puede elegir para
// las preguntas
// 2. Le das al usuario la opción de elegir entre preguntas de opción múltiple o preguntas de
// verdadero o falso
// 3. Mostramos 10 preguntas aplicando los filtros anteriores junto con las respuestas posibles

// 3.1 El usuario selecciona las respuestas
// 4. Le indicas al usuario cuántos aciertos tuvo y cuántos errores tuvo

// const endpoint = 'https://opentdb.com/api.php?amount=10&category=32&type=multiple'
const endpointCategories = "https://opentdb.com/api_category.php";
let endpointQuestions = "https://opentdb.com/api.php?amount=10";

// Esta función se encargará de obtener todas las categorías disponibles
function getCategories() {
  fetch(endpointCategories)
    .then((response) => response.json())
    .then((dataJson) => {
      console.log(dataJson);
      printCategories(dataJson.trivia_categories);
    })
    .catch((error) => {
      console.error(error);
    });
}
// 1. Obtengo el elemento donde quiero imprimir las categorías
// 2. Genero el HTML
// 3. Imprimo las categorías
function printCategories(categories) {
  const selectCategories = document.getElementById("select-categories");

  let htmlCategories = "";
  categories.forEach((category) => {
    htmlCategories += `<option value="${category.id}">${category.name}</option>`;
  });

  // value="${category.id}"
  selectCategories.innerHTML = htmlCategories;
}

// Función que imprimirá los tipos de preguntas
function printTypeQuestions() {
  // Se elige el elemento donde se va a imprimir el HTML.
  const selectTypeQuestions = document.getElementById("select-type");
  //   Se arma el HTML con las opciones que queremos en la variable htmlTypeQuestions.
  const htmlTypeQuestions = `
                            <option value="multiple">Multiple Choice</option>
                            <option value="boolean">True / False</option>
                            `;
  // Esta línea permite insertar el HTMl creado en el elemento seleccionado por la primera variable.
  selectTypeQuestions.innerHTML = htmlTypeQuestions;
}
printTypeQuestions();

function getQuestions() {
  const endpointWithFilters = selectCategoryType()
  fetch(endpointWithFilters)
    .then((response) => response.json())
    .then((dataJson) => {
      console.log(dataJson);
      printQuestions(dataJson.results);
      getCorrectAnswers(dataJson.results)
      // getResults()
    })
    .catch((error) => {
      console.error("error");
    });
}

// Esta url debe convertirse a dinámica https://opentdb.com/api.php?amount=10&category=9&type=multiple
// Sí la categoría es X hacer match con esa categoría en la api
// Sí el tipo de pregunta es multiple o V/F hacer match entre el value del tipo de pregunta creado y el tipo de pregunta en la api
// Imprimir las preguntas pasando estos filtros

// Función que modificará la URL para imprimir las preguntas por categoría y tipo
function selectCategoryType() {
  // Se elige el valor del elemento que contiene el ID de la Categoría
  const categoryID = document.getElementById("select-categories").value;
  // Se toma el valor nuevamente, esta vez del tipo de pregunta
  const typeOfQuestion = document.getElementById("select-type").value;
  // Se concatena  el valor obtenido a la URL de endpointQuestions (Generado por la API)
  let questionsLink = "https://opentdb.com/api.php?amount=10" + `&category=${categoryID}` + `&type=${typeOfQuestion}`;
  console.log(questionsLink)
  // Se declaran los condicionales para saber qué concatenar a la URL generada por la API
  // Sí el tipo de pregunta es "Multiple Choice" se ejecuta el if
  // if (typeOfQuestion === "multiple") {
  //   endpointQuestions = questionsLink + "&type=multiple";
  //   console.log(endpointQuestions);
    
  //   // Sí el tipo de pregunta es "True / False" se ejecuta el else if
  // } else {
  //   endpointQuestions = questionsLink + "&type=boolean";
  //   console.log(endpointQuestions)
  // }
  return questionsLink
}
// selectCategoryType();


function printQuestions(questions) {
  // Se elige el elemento donde se va a imprimir el HTML.
  const selectQuestions = document.getElementById("questions");
  let htmlQuestions = questions.map((question, index) => {
    if (question.type === "multiple") {
      return `
              <div class="col-md-3 mb-4">
                <div class="card h-100 text-black mb-3" style="max-width: 18rem;">
                  <div class="card-header bg-primary text-white font-weight-bold">Question ${index+1}</div>
                  <div class="card-body">
                    <h5 class="card-title ">${question.question}</h5>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="answer${index}" id="answer${index}${index + 1}" value="${question.correct_answer}" required>
                      <label class="form-check-label" for="answer${index}${index + 1}">${question.correct_answer}</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="answer${index}" id="answer${index}${index + 2}" value="${question.incorrect_answers[0]}" required>
                      <label class="form-check-label" for="answer${index}${index + 2}">${question.incorrect_answers[0]}</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="answer${index}" id="answer${index}${index + 3}" value="${question.incorrect_answers[1]}" required>
                      <label class="form-check-label" for="answer${index}${index + 3}">${question.incorrect_answers[1]}</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="answer${index}" id="answer${index}${index + 4}" value="${question.incorrect_answers[2]}" required>
                      <label class="form-check-label" for="answer${index}${index + 4}">${question.incorrect_answers[2]}</label>
                    </div>
                  </div>
                </div>
              </div>
             `;
    } else if (question.type === "boolean") {
      return `
              <div class="col-md-3 mb-4">
                <div class="card h-100 text-black mb-3" style="max-width: 18rem;">
                  <div class="card-header bg-primary text-white font-weight-bold">Question ${index+1}</div>
                  <div class="card-body">
                    <h5 class="card-title">${question.question}</h5>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="answer${index}" id="correctAnswer${index}" value="${question.correct_answer}" required>
                      <label class="form-check-label" for="correctAnswer${index}">${question.correct_answer}</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="answer${index}" id="incorrectAnswer${index}" value="${question.incorrect_answers[0]}" required>
                      <label class="form-check-label" for="incorrectAnswer${index}">${question.incorrect_answers[0]}</label>
                    </div>
                  </div>
                </div>  
              </div> 
             `;
    }
  });
  // value="${category.id}"
  const htmlQuestionsJoined = htmlQuestions.join("");
  selectQuestions.innerHTML = htmlQuestionsJoined;
}
// const CorrectAnswers = [1, 4, 5]
// const SA = [2, 4, 6]
// https://stackoverflow.com/questions/11599666/get-the-value-of-checked-checkbox
// document.querySelectorAll('#questions input:checked')
// cadaInput.value

function getCorrectAnswers(cAnswers){
  let correctAnswers = cAnswers.map((cAnswer) =>{
    correctAnswersData.push(cAnswer.correct_answer)
    // console.log(result.correct_answer)
  })
  console.log(correctAnswersData)
  return correctAnswersData
}
const correctAnswersData = []

function getSelectedAnswer(){
  const selectedAnswersData = []
  const selectedAnswers = document.querySelectorAll(`.form-check-input:checked`)
  for(let i=0; i<selectedAnswers.length;i++){
    
    selectedAnswersData.push(selectedAnswers[i].value)
  }
  return selectedAnswersData
  console.log(selectedAnswersData)
}
const abc = getSelectedAnswer


function getResults(selectedOnes){
  // respuestas seleccionadas
  const abc = selectedOnes()
  // const equal = abc[0] == correctAnswersData[0]
  abc.forEach((a, index) => {
    const equal = a == correctAnswersData[index]
    console.log(equal)
  })
  // console.log(equal)
}

getCategories();

// var radios = document.getElementsByName('rbtn');

// for (var i = 0, length = radios.length; i < length; i++) {
//     if (radios[i].checked) {
//         // do whatever you want with the checked radio
//         alert(radios[i].value);

//         // only one radio can be logically checked, don't check the rest
//         break;
//     }
// }