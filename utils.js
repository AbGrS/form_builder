export function generateUniqueId() {
    return 'form-' + Math.random().toString(36).substr(2, 9);
}
