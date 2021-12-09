

const ChangeHandler = (e) => {
    let currentName = e.target.value;
    if (!Number(currentName)) {
      setErrors(state => ({...state, data: 'This field sould have only numbers'}))
    
    } else {
        setErrors(state => ({...state, data: false}))
    }
  };



export default ChangeHandler;
