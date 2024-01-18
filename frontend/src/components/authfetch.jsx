const customFetch = (url, payload, customHeader = {},method="POST") => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem("token");
        console.log(token)
        if (!token) {
            const tokenError = new Error("Token not found")
            tokenError.name = "tokenError"
            reject(tokenError);
            return;
        }

        const headers = {
            ...customHeader,
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };

        fetch(url, {
            method: method,
            body: JSON.stringify(payload),
            headers: headers
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.status == "ok") {
                resolve(data); // Resolve with the data if status is "ok"
            } else {
                reject(new Error(data.message)); // Reject with an error if status is not "ok"
            }
        })
        .catch(err => {
            console.error(err);
            reject(err); // Reject with the caught error
        });
    });
};

export default customFetch;