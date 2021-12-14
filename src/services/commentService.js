import * as request from './requester';

const baseUrl = 'http://localhost:3030/data';

export const getAllComments = () => request.get(`${baseUrl}/comments`);


export const comment = async (commentData, token) => {
    let response = await fetch(`${baseUrl}/comments`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({...commentData})
    });

    let result = await response.json();

    return result;
};
