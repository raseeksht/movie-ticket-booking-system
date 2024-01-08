import { Alert } from 'flowbite-react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useEffect } from 'react';

function ShowAlert(props) {
    const authContext = useContext(AuthContext)
    useEffect(() => {
      setTimeout(()=>{
        authContext.setAlert(null)
      },5000)
      
    }, [authContext.alert])
  return (
    <>
    {authContext.alert ? 
        <Alert className='md:w-1/4 w-1/2 fixed bottom-10 right-10' color={authContext.alert.type} onDismiss={()=>authContext.setAlert(null)}>
      {authContext.alert.message}
    </Alert>
    :
        ''
    }
    </>
    
  );
}

export default ShowAlert