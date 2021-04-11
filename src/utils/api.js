class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
    }

    getMessages = (limit, skip) => {
        return fetch(`${this.baseUrl}/messages?skip=${skip}&limit=${limit}`)
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(`Ошибка:${res.status}. Запрос не выполнен.`);
                } else {
                    return res.json();
                }
            })
    };

};

const api = new Api({
    baseUrl: "https://api-23eqo.ondigitalocean.app/api",
});

export default api;
