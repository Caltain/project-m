import * as request from './requester';

const baseUrl = 'http://localhost:3030/data';

export const like = (userId, furnitureId) => request.post(`${baseUrl}/likes`, {userId, furnitureId});
export const getFurnitureLikes = (furnitureId) => {
    const query = encodeURIComponent(`furnitureId="${furnitureId}"`);

    return request.get(`${baseUrl}/likes?select=userId&where=${query}`)
        .then(res => res.map(x => x.userId));
};