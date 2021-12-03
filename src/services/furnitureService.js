const baseUrl = 'http://localhost:3030/data'


export const getAll = async () =>{
    let response = await fetch(`${baseUrl}/furniture`)

    let furniture = await response.json()

    let result = Object.values(furniture)   

    return result 
}

export const create = async (furnitureData, token) =>{
    let response = await fetch(`${baseUrl}/pets`,{
        method:'POST',
        headers:{
            'content-type':'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({...furnitureData, likes:[]})
    });
        let result = await response.json()
    return result
}

export const getOne = (furnitureId) =>{
    return fetch(`${baseUrl}/furniture/${furnitureId}`)
    .then(res => res.json())
}


export const destroy = (furnitureId, token) =>{
    return fetch(`${baseUrl}/furniture/${furnitureId}`,{
        method:'DELETE',
        headers:{
            'X-Authorization': token
        }
    }).then(res=>res.json())
}