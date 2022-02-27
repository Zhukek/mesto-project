export function setValidation (form, config) {
  const inputList = Array.from(form.querySelectorAll(`.${config.inputElement}`));

  toggleButton(form, inputList, config);
  inputList.forEach(function(input) {
    input.addEventListener('input', function() {
      checkValidation(form, input, config);
      toggleButton(form, inputList, config);
    });
  }); /* Добавляет валидацию на инпуты */
}

function checkValidation (form, input, config) {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage, config);
  } else {
    hideError(form, input, config)
  };
} /* Проверяет валидацию инпута */

function showError (form, input, errorMessage, config) {
  const inputID = input.id;
  const errorItem = form.querySelector(`.${inputID}-error`);
  errorItem.classList.add(config.errorClass);
  errorItem.textContent = errorMessage;
  input.classList.add(config.inputErrorClass);
} /* Показать ошибку при заполнении инпута */

function hideError (form, input, config) {
  const inputID = input.id;
  const errorItem = form.querySelector(`.${inputID}-error`);
  errorItem.classList.remove(config.errorClass);
  errorItem.textContent = '';
  input.classList.remove(config.inputErrorClass);
} /* Спрятать ошибку при заполнении инпута */

function hasInvalidInput(inputList) {
  return inputList.some(function(input) {
    return !input.validity.valid;
  });
} /* Проверяет правильность формы */

function toggleButton(form, inputList, config) {
  const saveButton = form.querySelector(`.${config.submitButton}`)

  if (hasInvalidInput(inputList) === true) {
    saveButton.classList.add(config.submitButtonInactive);
    saveButton.setAttribute("disabled", "disabled");
  } else {
    saveButton.classList.remove(config.submitButtonInactive);
    saveButton.removeAttribute('disabled');
  };
} /* Активирует/блокирует кнопку сабмита */
