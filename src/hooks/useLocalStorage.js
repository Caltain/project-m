import { useState } from "react";


const useLocalStorage = (key,initialValue) =>{
    const [state,setState] = useState(()=>{
        try {
            let item = localStorage.getItem(key)
            return item
            ? JSON.parse(item)
            : initialValue
        }catch(err){
            console.log(err);
            return initialValue
        }
    });
    const setItem = (value) =>{
        try{
            localStorage.setItem(key,JSON.stringify(value))
        }catch(err){
            console.log(err);
        }
    }

return[state,setState]

}
export default useLocalStorage