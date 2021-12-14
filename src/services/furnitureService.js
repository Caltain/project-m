import * as request from './requester';

const baseUrl = 'http://localhost:3030/data';

export const getAll = () => request.get(`${baseUrl}/furniture`);



export const getReservations = (reserverId) => {
    let query = encodeURIComponent(`userId="${reserverId}"`);
    return   request.get(`${baseUrl}/reserve?where=${query}`)

};



export const create = async (furnitureData, token) => {
    let response = await fetch(`${baseUrl}/furniture`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({...furnitureData, likes: [], love:[], reserve:[]})
    });

    let result = await response.json();

    return result;
};



export const update = (furnitureId, furnitureData) => request.put(`${baseUrl}/furniture/${furnitureId}`, furnitureData);

export const getOne = (furnitureId) => {
    console.log(furnitureId);
    return fetch(`${baseUrl}/furniture/${furnitureId}`)
        .then(res =>
                 res.json())
};


export const destroy = (furnitureId, token) => {
    return fetch(`${baseUrl}/furniture/${furnitureId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    }).then(res => res.json());
};
export const cancel = (furnitureId, token) => {
    return fetch(`${baseUrl}/reserve/${furnitureId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    }).then(res => res.json());
};


export const like = (furnitureId, furniture, token) => {
    return fetch(`${baseUrl}/furniture/${furnitureId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(furniture)
    }).then(res => res.json());
};