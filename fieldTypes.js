export function createTextField(label) {
    return {
        type: 'text',
        label: label,
        value: ''
    };
}

export function createRadioField(label, options) {
    return {
        type: 'radio',
        label: label,
        options: options,
        value: ''
    };
}

export function createCheckboxField(label, options) {
    return {
        type: 'checkbox',
        label: label,
        options: options,
        value: []
    };
}
