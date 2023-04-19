import styled from "styled-components";
import BookRoom from "../Pages/BookRoom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const CenteredContainer = styled.div`
  top:80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background:url("https://pixabay.com/get/g021c94f520a0f7aba7e8ddf320a91bf6be642b26cf243ab8594f3d6ed026257ef060261b73c256720e1d6909681a81ab.jpg");
  background-size:cover;
  justify-content: center;
  height: 89.3vh;
`;
const MainCenter = styled.div`
    position: relative;
    z-index: 1;
    width: 400px;
    top: 19px;
    margin: auto;
    height: 500px;
    margin-top: 100px;
    box-shadow: 20px 20px 50px rgba(0,0,0,0.5);
    border-radius: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5) ;
    background:rgba(255, 255, 255, 0.1) ;
    backdrop-filter: blur(5px);
    overflow: hidden;
`
const ImageContain = styled.div`
position : absolute;
`;

const Image = styled.img`
  opacity : 0.5;
  object-fit: cover;
  overflow: hidden;
  height : 100%;
  width :100%;

`;

const AdminText = styled.h1`
  font-size: 32px;
  color: #fff;
  text-align: center;
  margin-top:120px;
  position : relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const Button = styled.button`
  background-color: #00593F;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 8px;
`;




export default function Admin() {
  return (
    <>
      <CenteredContainer>

        <MainCenter>
          <AdminText>HELLO <br />ADMIN !</AdminText>
          <ButtonContainer>

            <Link to="/booking" style={{ textDecoration: "none", color: "black" }}><Button>Book a Room</Button></Link>

            <Link to="/viewList" style={{ textDecoration: "none", color: "black" }}><Button>View Bookings List</Button></Link>
          </ButtonContainer>
        </MainCenter>
      </CenteredContainer>
    </>
  )
}