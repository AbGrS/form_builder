import { createTextField, createRadioField, createCheckboxField } from './fieldTypes.js';
import { saveForm, loadForm, saveResponse, loadResponses } from './storage.js';
import { generateUniqueId } from './utils.js';

window.onload = function() {
    // Add event listeners for toolbar buttons
    document.getElementById('addTextField').addEventListener('click', function() {
        addField('text');
    });
    document.getElementById('addRadioField').addEventListener('click', function() {
        addField('radio');
    });
    document.getElementById('addCheckboxField').addEventListener('click', function() {
        addField('checkbox');
    });
    document.getElementById('saveFormBtn').addEventListener('click', submitForm);

    loadForms();
};

// Global variable to hold the form data
let currentForm = [];

function addField(type) {
    let label = prompt('Enter label for the field:') || '';
    let field;

    if (type === 'text') {
        field = createTextField(label);
    } else if (type === 'radio') {
        const options = prompt('Enter options separated by commas:')?.split(',') || [];
        field = createRadioField(label, options);
    } else if (type === 'checkbox') {
        const options = prompt('Enter options separated by commas:')?.split(',') || [];
        field = createCheckboxField(label, options);
    }

    currentForm.push(field);
    renderForm();
}

function renderForm() {
    const formPreview = document.getElementById('formPreview');
    formPreview.innerHTML = '';

    currentForm.forEach((field, index) => {
        const fieldElement = document.createElement('div');
        const fieldLabel = document.createElement('label');
        fieldLabel.textContent = field.label;
        
        if (field.type === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = field.value;
            input.addEventListener('input', function(e) {
                field.value = e.target.value;
            });
            fieldElement.appendChild(fieldLabel);
            fieldElement.appendChild(input);
        } else if (field.type === 'radio') {
            field.options.forEach(function(option) {
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `field-${index}`;
                input.value = option;
                input.checked = field.value === option;
                input.addEventListener('change', function(e) {
                    field.value = e.target.value;
                });
                
                const optionLabel = document.createElement('label');
                optionLabel.textContent = option;

                fieldElement.appendChild(input);
                fieldElement.appendChild(optionLabel);
            });
        } else if (field.type === 'checkbox') {
            field.options.forEach(function(option) {
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.value = option;
                input.checked = field.value.includes(option);
                input.addEventListener('change', function(e) {
                    if (input.checked) {
                        field.value.push(option);
                    } else {
                        field.value = field.value.filter(function(v) {
                            return v !== option;
                        });
                    }
                });
                
                const optionLabel = document.createElement('label');
                optionLabel.textContent = option;

                fieldElement.appendChild(input);
                fieldElement.appendChild(optionLabel);
            });
        }

        formPreview.appendChild(fieldElement);
    });
}

// Collect form data when the form is submitted
function submitForm() {
    const response = {};

    // Collect the form data from the fields
    currentForm.forEach((field, index) => {
        if (field.type === 'text') {
            response[`field-${index}`] = field.value;
        } else if (field.type === 'radio') {
            response[`field-${index}`] = field.value;
        } else if (field.type === 'checkbox') {
            response[`field-${index}`] = field.value;
        }
    });

    // Save the response to localStorage
    const formId = generateUniqueId();
    saveResponse(formId, response);

    // Reload responses to show the newly saved response
    loadForms();

    alert('Form submitted!');
}

// Load previously saved responses and render them
function loadForms() {
    const formList = document.getElementById('responseList');
    const responses = loadResponses();
    formList.innerHTML = '';
    
    responses.forEach(function(response, index) {
        const listItem = document.createElement('li');
        listItem.textContent = `Response #${index + 1}: ${JSON.stringify(response.response)}`;
        formList.appendChild(listItem);
    });
}
