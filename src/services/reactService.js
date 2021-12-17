import * as request from './requester';

const baseUrl = 'http://localhost:3030/data';

export const like = (userId, furnitureId) => request.post(`${baseUrl}/likes`, {userId, furnitureId});


export const getFurnitureLikes = (furnitureId) => {
  
    const query = encodeURIComponent(`furnitureId="${furnitureId}"`);

    return request.get(`${baseUrl}/likes?select=userId&where=${query}`)
        .then(res =>
           
             res.map(x => x.userId));
};

export const love = (userId, furnitureId) => request.post(`${baseUrl}/love`, {userId, furnitureId});


export const getFurnitureLove = (furnitureId) => {
    const query = encodeURIComponent(`furnitureId="${furnitureId}"`);

    return request.get(`${baseUrl}/love?select=userId&where=${query}`)
        .then(res => 
          
            res.map(x => x.userId));
};

export const reserve = (userId, furnitureId) => request.post(`${baseUrl}/reserve`, {userId, furnitureId,display:"show"});


export const getFurnitureReserve = (furnitureId) => {
    const query = encodeURIComponent(`furnitureId="${furnitureId}"`);

    return request.get(`${baseUrl}/reserve?select=userId&where=${query}`)
        .then(res => res.map(x => x.userId));
};