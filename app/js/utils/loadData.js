const loadData = (url = '') => {
    const req = new Request(url);

    return fetch(req)
        .then(response => response.json())
        .catch(error => console.log(error));
};

export default loadData;