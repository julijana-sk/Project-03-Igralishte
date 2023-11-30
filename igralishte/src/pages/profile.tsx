import React, { useContext, useState } from 'react';
import {UserContext} from '@/context/UserContext';
import Head from 'next/head';
import Link from 'next/link';
import PrimaryBtn from '@/components/PrimaryBtn';


type ActiveView = "profile" | "profile-new"; 


const ProfilePage = () => {

  const { handleLogIn } = useContext(UserContext);

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [biography, setBiography] = useState<string>("");


  const [view, setView] = useState<ActiveView>("profile");

  const handleChangeView = () => {
    setView(view === 'profile' ? 'profile-new' : 'profile');
  };


  return (
    <>
    <Head>
      <title>Igralishte - Profile Page</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    {view === "profile" ? 

      <form className="d-flex flex-column justify-content-center"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleLogIn(username, password);
          }}>

          <div className='container-fluid mt-5 text-center'>
            <div className='row d-flex flex-column justify-content-center'>
              <div className='col-12 mt-5'>
                <Link href={"/"}><img src="../pictures/icons/Logo Igralishte final version.png" alt="logo-igralishte" /></Link>
                <div className='col-12 mt-5 mb-3 text-center'>
                  <img src="../pictures/Profile-picture.png" alt="profile picture" />
                  </div>
                  <div className='col-12 mb-3 text-center'>
                  <button className='btnProfilePicture small p-0 px-2 border-0'>Одбери слика</button>
                </div>
              </div>
              <div className='mb-3 col-11 px-4 text-left mr-auto ml-auto'>
              <div className='d-flex flex-column justify-content-left'>
                <label htmlFor="name">Име</label>
                <input type="text" id="name" className="PrimaryBtn form-input" placeholder="Ивана" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setName(event.target.value);
                    }}/>
              </div>
              <div className='d-flex flex-column justify-content-left'>
                <label htmlFor="surname">Презиме</label>
                <input type="text" id="surname" className="PrimaryBtn form-input" placeholder="Голабоска" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setSurname(event.target.value);
                    }}/>
              </div>
              <div className='d-flex flex-column justify-content-left'>
                <label htmlFor="username">Email адреса</label>
                <input type="email" id="username" className="PrimaryBtn form-input" placeholder="example@example.com" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUsername(event.target.value);
                  }}/>
              </div>
              <div className='d-flex flex-column justify-content-left'>
              <label htmlFor="password">Лозинка</label>
              <input type="password" id="password" className="PrimaryBtn form-input" placeholder="********" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value);
                  }} /> 
              </div>
              <div className='d-flex flex-column justify-content-left'>
              <button onClick={handleChangeView} className='bg-transparent border-0 p-2 text-left'><p style={{color: "#8A8328", textDecoration: "underline"}} >Промени лозинката</p></button>

                <label htmlFor="address">Адреса</label>
                <input type="text" id="address" className="PrimaryBtn form-input" placeholder="example@example.com" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setAddress(event.target.value);
                    }}/>
              </div>
              <div className='d-flex flex-column justify-content-left'>
                <label htmlFor="phone">Телефонски број</label>
                <input type="text" id="phone" className="PrimaryBtn form-input" placeholder="example@example.com" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPhone(event.target.value);
                    }}/>
              </div>
              <div className='d-flex flex-column justify-content-left'>
                <label htmlFor="biography">Биографија</label>
                <input type="textarea" id="biography" className="PrimaryBtn w-100 p-3 text-left" style={{fontWeight: "lighter", height: "80px" }} placeholder="example@example.com" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setBiography(event.target.value);
                    }}/>
              </div>
               <div className="input-group my-3">
                  <div className="input-group-prepend d-flex justify-content-between align-items-center">
                    <div className="input-group-text border-0 bg-transparent px-1 mr-2">
                      <input type="checkbox" aria-label="Checkbox for following text input" checked/>
                    </div>
                    <div><p style={{fontSize: "10px", fontFamily: "Inter"}} className="p-0">Испраќај ми известувања за нови зделки и промоции.</p></div>
                  </div>
                </div>
                <Link href="/"><PrimaryBtn title="Зачувај" btnClass={"PrimaryBtn w-75"} backgroundColor={"black"} color='white' height={"40px"} border='none'/></Link>
                </div>
              </div>
            </div>
        </form>
         : null}

      {view === "profile-new" ? 
        
        <form className="flex-column justify-content-center"
          onSubmit={() => {handleLogIn(username, password)}} >
          <div className='container-fluid mt-5 text-center'>
            <div className='row flex-column justify-content-center'>
              <div className='col-11 mr-auto ml-auto mt-5'>
                <Link href={"/"}><img src="../pictures/icons/Logo Igralishte final version.png" alt="logo-igralishte" /></Link>
                <div className='text-left'>
                 <div className='flex-column justify-content-left mt-5 mb-2'>
                  <label htmlFor="old-password">Стара лозинка</label>
                  <input type="password" id="old-password" className="PrimaryBtn form-input" placeholder="********" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setPassword(event.target.value);
                      }} /> 
                  </div>
                  <div className='flex-column justify-content-left mb-2'>
                  <label htmlFor="new-password">Нова лозинка</label>
                  <input type="password" id="new-password" className="PrimaryBtn form-input" placeholder="********" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setPassword(event.target.value);
                      }} /> 
                  </div>
                  <div className='flex-column justify-content-left'>
                  <label htmlFor="conf-new-password">Повтори нова лозинка</label>
                  <input type="password" id="conf-new-password" className="PrimaryBtn form-input" placeholder="********" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setPassword(event.target.value);
                      }} /> 
                  </div>              
                 <PrimaryBtn  onClick={handleChangeView} title="Зачувај" btnClass={"PrimaryBtn w-75 mt-4"} backgroundColor={"black"} color='white' height={"40px"} border='none' />
                  </div>
              </div>
            </div>
          </div>
      </form> : null}
      </>
    );

}

export default ProfilePage;
