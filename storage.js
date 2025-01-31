export function saveResponse(formId, response) {
    const responses = JSON.parse(localStorage.getItem('formResponses') || '[]');
    responses.push({ formId: formId, response: response });
    localStorage.setItem('formResponses', JSON.stringify(responses));
}

export function loadResponses() {
    return JSON.parse(localStorage.getItem('formResponses') || '[]');
}
