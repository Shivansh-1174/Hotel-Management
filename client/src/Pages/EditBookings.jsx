import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const Main = styled.div`
background:url("https://pixabay.com/get/g021c94f520a0f7aba7e8ddf320a91bf6be642b26cf243ab8594f3d6ed026257ef060261b73c256720e1d6909681a81ab.jpg");
  background-size:cover;
  height:100vh;
  overflow:hidden;

`
const TopContainer = styled.div`
    height : 50px;
    background-color : black;

    display:flex;
   align-items : left-center;
   justify-content : center;


`;
const Glass = styled.div`
    position: relative;
    z-index: 1;
    width: 500px;
    margin-top:15px;
    margin-left:35%;
    height: 670px;
    box-shadow: 20px 20px 50px rgba(0,0,0,0.5);
    border-radius: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5) ;
    background:rgba(255, 255, 255, 0.1) ;
    backdrop-filter: blur(5px);
    overflow: hidden;
`
const Text = styled.h1`
flex : 1;
height : 100%;
margin: 0px 10px;
   display:flex;
   color:white;
   align-items : center;
   justify-content : center;
`;
const A = styled.h3`
flex : 1;
height : 100%;
margin: 0px 10px;
   display:flex;
   color:white;
   align-items : center;
   justify-content : center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top:-100px;
  label {
    margin-top: 10px;
  }

  input[type="email"],
  input[type="text"],
  input[type="datetime-local"] {
    margin-bottom: 20px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    width: 300px;
  }

  input[type="submit"] {
    padding: 10px 20px;
    background-color: #00593F;
    color: white;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

export default function EditBookings() {

  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [price, setPrice] = useState('');

  // const typeA = 2;
  // const typeB = 3;
  // const typeC = 5;
  const { id } = useParams();

  const Navigate = useNavigate();

  const typeArray = [{
    type: 'A',
    price: 100,
    availRooms: 2

  }, {
    type: 'B',
    price: 80,
    availRooms: 3

  }, {
    type: 'C',
    price: 50,
    availRooms: 5
  }]

  useEffect(() => {

    fetch('http://localhost:4000/fetch/' + id)
      .then(response => {
        response.json().then(info => {
          setEmail(info.email);
          setType(info.type);
          setCheckIn(info.checkIn);
          setCheckOut(info.checkOut);
          setPrice(info.price);
        });
      });
  }, []);


  async function find(ev) {
    ev.preventDefault();
    console.log(checkIn);
    const response = await fetch('http://localhost:4000/checker', {
      method: 'POST',
      body: JSON.stringify({ email, type, checkIn, checkOut, price }),
      headers: { 'Content-Type': 'application/json' },
    });
    response.json().then(res => {
      const firstdata = res.filter(e => e.type === type)
      return firstdata;

    }).then(third => {
      const thirdData = third.filter(e => checkIn < e.checkOut && checkOut > e.checkIn)
      const t = typeArray.filter(e => e.type === type)
      if (thirdData.length < t[0].availRooms) {
        setPrice(t[0].price);
        editBooking()
      }
      else {
        alert("ROOM UNAVAILABLE")
      }
    })
  }



  async function editBooking() {
    // ev.preventDefault();
    const response = await fetch('http://localhost:4000/edit/' + id, {
      method: 'POST',
      body: JSON.stringify({ email, type, checkIn, checkOut, price }),
      headers: { 'Content-Type': 'application/json' },
    });
    alert("Successfully Update")
    Navigate('/viewList')

  }


  return (
    <>
      <Main>
        <TopContainer>
          <Text>BOOK A ROOM HERE</Text>
          <Link to="/"><A>HOME</A></Link>
          <Link to="/viewList"><A>VIEW LIST</A></Link>


        </TopContainer>
        <Glass>
          <Container>
            <Form className='book' onSubmit={find}>
              <label HTMLfor="email">Email:</label>
              <input type="email" placeholder="Enter Your Email" id="email" name="email" value={email}
                onChange={ev => setEmail(ev.target.value)}
                required /><br />

              <label for="room-type">Room Type:</label>
              <input type="text" id="room-type" name="room_type" placeholder="Enter Room Type" value={type}
                onChange={ev => setType(ev.target.value)}
                required /><br />

              <label for="start-time">Check-in Time:</label>
              <input type="datetime-local" id="start-time" name="start_time" placeholder='Check-in Time' required value={checkIn}
                onChange={ev => setCheckIn(ev.target.value)} />
              <br />

              <label for="end-time">Check-out Time:</label>
              <input type="datetime-local" id="end-time" name="end_time" placeholder='Check-out Time' required value={checkOut}
                onChange={ev => setCheckOut(ev.target.value)} />
              <br />







              <input type="submit" value="Confirm" />
            </Form>

          </Container>
        </Glass>
      </Main>
    </>



  )
}
