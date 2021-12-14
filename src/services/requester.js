export const request = async (method, url, data) => {
    let result = null;

    if (method == 'GET') {
        result = fetch(url);
    } else {
        result = fetch(url, {
            method,
            headers: {
                'content-type': 'application/json',
                'X-Authorization': getToken()
            },
            body: JSON.stringify(data)
        });
    }
    
    return result.then(responseHandler);
};

async function responseHandler(res) {
    try {
        let jsonData = await res.json();
        if (res.ok) {
            return Object.values(jsonData);
        } 
    } catch (error) {
        console.log(error);
    }
    
};

function getToken() {
    try {
        let userItem = localStorage.getItem('user');

        if (!userItem) {
            console.log('You must be authenticated')
            return
        }

        let user = JSON.parse(userItem);

        return user.accessToken;
    } catch(err) {
        console.log(err);
    }
}

export const get = request.bind(null, 'GET');
export const put = request.bind(null, 'PUT');
export const post = request.bind(null, 'POST');