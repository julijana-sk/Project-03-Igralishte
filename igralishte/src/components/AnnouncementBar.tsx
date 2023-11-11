import React from 'react'


const AnnouncementBar = () => {

  return (
    <div className='container announcement-bar'>
      <div className='announcement-bar__message'>
          <p>Нова колекција</p>
          <img src="../pictures/icons/Star.png" alt="star" />
          <p style={{color: "#504E21"}}>Valentines Winter Collection 2023</p>
      </div>
    </div>
  );
}

export default AnnouncementBar;