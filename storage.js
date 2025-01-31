export function saveForm(formId, formData) {
    localStorage.setItem(`form-${formId}`, JSON.stringify(formData));
}

export function loadForm(formId) {
    const formData = localStorage.getItem(`form-${formId}`);
    return formData ? JSON.parse(formData) : null;
}

export function saveResponse(formId, response) {
    const responses = JSON.parse(localStorage.getItem('formResponses') || '[]');
    responses.push({ formId: formId, response: response });
    localStorage.setItem('formResponses', JSON.stringify(responses));
}

export function loadResponses() {
    return JSON.parse(localStorage.getItem('formResponses') || '[]');
}
