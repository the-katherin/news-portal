const handleResponse = response => {
    if (response.ok ) {
        return response.json();
    }
    
    const errorText = response.statusText ||
        `Response status: ${response.status}. Status type: ${response.type}`;

    throw new Error(errorText);

};
 export default handleResponse;
