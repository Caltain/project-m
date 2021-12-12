import * as request from './requester';

const baseUrl = 'http://localhost:3030/data';

export const getAll = () => request.get(`${baseUrl}/furniture`);

export const getMyListings = (ownerId) => {
    let query = encodeURIComponent(`_ownerId="${ownerId}"`);

    return request.get(`${baseUrl}/furniture?where=${query}`);
};

export const create = async (furnitureData, token) => {
    let response = await fetch(`${baseUrl}/furniture`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({...furnitureData, likes: []})
    });

    let result = await response.json();

    return result;
};

export const update = (furnitureId, furnitureData) => request.put(`${baseUrl}/furniture/${furnitureId}`, furnitureData);

export const getOne = async (furnitureId) => {
    let response = await fetch(`${baseUrl}/furniture/${furnitureId}`)
       
    let result = await response.json();
    return result;

};

export const destroy = (furnitureId, token) => {
    return fetch(`${baseUrl}/furniture/${furnitureId}`, {
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