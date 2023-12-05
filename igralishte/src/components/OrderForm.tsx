import Link from 'next/link';
import React, { useContext, useState } from 'react'
import PrimaryBtn from './PrimaryBtn';
import { UserContext } from '@/context/UserContext';

const OrderForm = () => {

    const { handleLogin } = useContext(UserContext);

    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phone, setPhone] = useState<string>("");


  return (
    <div>
        <form className="d-flex flex-column justify-content-center"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleLogin(username, password);
          }}>

          <div className='container-fluid mt-5 text-center'>
            <div className='row d-flex flex-column justify-content-center'>
              <div className='col-11 mr-auto ml-auto'>
                <img src="../pictures/icons/sparks-elements.png" alt="sparks"/>
                <h2 className='mt-3' style={{fontSize: '20px'}}>Ве молиме внесете ги потребните информации</h2>
                <div className="flex-row justify-content-start align-items-center pl-1 ml-2">
                    <p><input type='checkbox' className='my-4 mr-1'/>вметни ги информациите од мојот профил</p>
                </div>
              </div>
              <div className='mb-3 col-11 px-4 text-left mr-auto ml-auto'>
              <div className='d-flex flex-column justify-content-left mb-3'>
                <label htmlFor="name">Име</label>
                <input type="text" id="name" className="PrimaryBtn form-input" placeholder="Ивана" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setName(event.target.value);
                    }}/>
              </div>
              <div className='d-flex flex-column justify-content-left mb-3'>
                <label htmlFor="surname">Презиме</label>
                <input type="text" id="surname" className="PrimaryBtn form-input" placeholder="Голабоска" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setSurname(event.target.value);
                    }}/>
              </div>
              <div className='d-flex flex-column justify-content-left mb-3'>
                <label htmlFor="address">Адреса</label>
                <input type="text" id="address" className="PrimaryBtn form-input" placeholder="example@example.com" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setAddress(event.target.value);
                    }}/>
              </div>
              <div className='d-flex flex-column justify-content-left mb-3'>
                <label htmlFor="phone">Телефонски број</label>
                <input type="text" id="phone" className="PrimaryBtn form-input" placeholder="example@example.com" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPhone(event.target.value);
                    }}/>
              </div>
              <div className='d-flex flex-column justify-content-left mb-5'>
                <label htmlFor="username">Email адреса</label>
                <input type="email" id="username" className="PrimaryBtn form-input" placeholder="example@example.com" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUsername(event.target.value);
                  }}/>
              </div>
               <div className="input-group mt-3">
                  <div className="input-group-prepend d-flex justify-content-between align-items-center">
                    <div className="input-group-text border-0 bg-transparent px-1 mr-2">
                      <input type="checkbox" aria-label="Checkbox for following text input"/>
                    </div>
                    <div><p style={{fontSize: "10px", fontFamily: "Inter"}} className="p-0">сакам да добивам новости за идни попусти, нови колекции и промоции на мојата емаил адреса.</p></div>
                  </div>
                </div>
                <div className="flex-flex justify-content-start align-items-center my-5">
                <div className='col-11 p-0'>
                    <Link href={"/"}>
                    <PrimaryBtn title="Нарачај" btnClass={"PrimaryBtn w-75 mr-4 btn-gold btn-gold-text"} backgroundColor={"btn-gold"} color='black' border='none' height="51px"/></Link>
                    <Link href={"/order"} className='border-0 bg-transparent w-50'><u>Откажи</u></Link>
                </div>  
              </div>
            </div>
           </div>
         </div>
       </form>
    </div>
  )
}

export default OrderForm;