const handleResponse = response => {
    if (response.ok ) {
        return response.json();
    }
    
    const errorText = response.statusText ||
        `Response status: ${response.status}. Status type: ${response.type}`;

    import(/* webpackChunkName: "errorPopupInstance" */ '../errorPopupInstance').then(module => {
        const createErrorPopup = module.default;
        const errorPopup = createErrorPopup();
        errorPopup.init();
        errorPopup.render(errorText);
    });

};
 export default handleResponse;
