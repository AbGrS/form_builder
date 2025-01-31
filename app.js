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
