
import { Button, Checkbox, Label, Modal, TextInput,Select } from 'flowbite-react';
import { useState } from 'react';
import {apiurl} from "./apiurl"

export default function LoginComponent(props) {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [messages,setMessages] = useState({loginerr:""})
  const [creds,setCreds] = useState({username:"",password:"",usertype:"normal"})

  const handleLogin = () => {
    fetch(apiurl+"/login/",{
        method:"POST",
        body: JSON.stringify(creds),
        headers:{"Content-Type":"application/json"}
    }).then(resp=>resp.json())
    .then(data=>{
        if (data.status == "ok"){
            localStorage.setItem("token",data.token)
            props.setIsLoggedIn(true)
        }
        else{
            props.setIsLoggedIn(false)
            setMessages({...messages,loginerr:data.message})
            setTimeout(()=>{
                setMessages({...messages,loginerr:""})
            },5000)
        }
    })
    .catch(err=>console.log("err",err))
  }

  return (
    <>
      <button onClick={() => setOpenLoginModal(true)} className='bg-red-500 px-3 py-1 rounded text-cyan-100'>Sign In</button>
      <Modal show={openLoginModal} size="md" popup onClose={() => setOpenLoginModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in</h3>
            {messages.loginerr &&
            <h3 className='bg-red-500 text-gray-100 p-2'>{messages.loginerr}</h3>
            }
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput id="email" placeholder="name@company.com" value={creds.username} onChange={(e)=>{setCreds({...creds,username:e.target.value})}} required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type="password" value={creds.password} onChange={(e)=>{setCreds({...creds,password:e.target.value})}} required />
            </div>
            <div>
                <Select value={creds.usertype} onChange={(e)=>{setCreds({...creds,usertype:e.target.value})}} id="userType" required>
                    <option disabled>Select Any</option>
                    <option value="normal">General User</option>
                    <option value="admin">Admin</option>
                </Select>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                Lost Password?
              </a>
            </div>
            <div className="w-full">
              <Button onClick={handleLogin}>Log in</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">
                Create account
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

