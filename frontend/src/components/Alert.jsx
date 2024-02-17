import { Alert } from 'flowbite-react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useEffect } from 'react';

function ShowAlert() {
    const authContext = useContext(AuthContext)
    useEffect(() => {
      let temp;
      temp = setTimeout(()=>{
        authContext.setAlert(null)
      },5000)

      return ()=>{
        clearTimeout(temp)
      }      
    }, [authContext.alert])
  return (
    <>
    {authContext.alert ? 
        <Alert className='md:w-1/4 w-1/2 fixed bottom-10 right-10 z-10' color={authContext.alert.type} onDismiss={()=>authContext.setAlert(null)}>
      {authContext.alert.message}
    </Alert>
    :
        ''
    }
    </>
    
  );
}

export default ShowAlert