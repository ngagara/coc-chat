class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
    }

    getMessages = (limit) => {
        return fetch(`${this.baseUrl}/messages?skip=${0}&limit=${limit}`)
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
