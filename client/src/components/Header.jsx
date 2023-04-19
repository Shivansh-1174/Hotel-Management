import styled from 'styled-components';

const Container = styled.div`
    height : 80px;
    background-color : black;

    display:flex;
   align-items : center;
   justify-content : center;


`;

const Logo = styled.img`
width : 50px;
height : 50px;
border-radius:50%;
`;

const Text = styled.h1`
flex : 1;
height : 100%;
margin: 0px 10px;
   display:flex;
   color:white;
   align-items : center;
   justify-content : center;
`;




function Header() {
  return (
    <Container>
      <Logo src="https://img.etimg.com/thumb/msid-98651337,width-650,height-488,imgsize-2188,,resizemode-75/scaler.jpg"></Logo>
      <Text>SCALER HOTEL MANAGEMENT ADMIN PORTAL</Text>


    </Container>
  )
}

export default Header;