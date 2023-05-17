import styled from 'styled-components';

const Container = styled.div`
  height : 60px;
  background-color : #E6D5A9;
  display:flex;
  align-items : center;
  justify-content : center;
`;

const Text = styled.h1`
  flex : 1;
  height : 100%;
  margin: 0px 5px;
  display: flex;
  color: #2A2F33;
  align-items : center;
  justify-content : center;
`;

function Header() {
  return (
    <Container>
      <Text>HOTEL MANAGEMENT ADMIN PORTAL</Text>
    </Container>
  )
}

export default Header;