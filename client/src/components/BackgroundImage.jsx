import styled from 'styled-components';

const Background = styled.div`
height:90vh;


 border: 1px solid #000;
    background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOb3VNVJDDJCeHsfqchPmNCvRF3o7HLxxRkQ&usqp=CAU');

     object-fit:cover;
     background-repeat: no-repeat;
  background-position: center;

   background-size: cover;
  width:100%
  height:100%;



`;

export default function BackgroundImage() {
  return (
    <>
      <Background></Background>


    </>
  )
}


