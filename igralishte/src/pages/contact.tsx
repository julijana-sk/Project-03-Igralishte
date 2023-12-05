import Breadcrumbs from "@/components/Breadcrumbs";
import PageTitle from "@/components/PageTitle";
import PrimaryBtn from "@/components/PrimaryBtn";
import { ContactType } from "@/types/types";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React from "react";

interface Props {
  contactData: ContactType;
}

const ContactPage: NextPage<Props> = ({ contactData }) => {

    const breadcrumbs = [
      { name: 'Почетна', url: '/' },
      { name: 'Контакт', url: '/contact' },
    ];

return (
    <>
      <Head>
        <title>Igralishte - Contact</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
         
      <div className="col-11 mt-4 mr-auto ml-auto">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      <div className="d-flex flex-row align-items-center align-self-center my-3 justify-content-center">
        <PageTitle title={contactData.title}/>
        <img src="../pictures/icons/sparks-removebg.png" alt="spakrs" className="ml-2"/>
      </div>

      <div className="container">
          <div className="row d-flex flex-column justify-content-center mr-auto ml-auto">
            <div className="col-12">
              <div className="container p-0 mr-auto ml-auto">
                <div className="mb-5 text-center">
                  <img src={contactData.image} alt="about-banner" style={{width: "100%"}}/>
                  <h2 className="title mt-4 mb-2">Игралиште Дебар Маало</h2>
                  <p className="about-text">{contactData.content}</p>
                  <p className="address-text">{contactData.address}</p>
                  <div className="contact-text">
                    <p>Телефон за контакт:</p>
                    <p>{contactData.phone}</p>
                    <p>Работно Време:</p>
                    <p>{contactData.workingHours}</p>
                  </div>
                  <PrimaryBtn title="Кон продавницата" btnClass={"PrimaryBtn w-100 btn-gold btn-gold-text my-5"} backgroundColor={"btn-gold"} color='black' border='none' height="61px"/>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;

export const getStaticProps: GetStaticProps = async () => {

  const res = await fetch("http://localhost:5001/contact");
  const contactData: ContactType = await res.json();

  return {
    props: {
      contactData,
    },
  };

};
