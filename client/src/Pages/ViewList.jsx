import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Main = styled.div`
  background:url("https://rare-gallery.com/uploads/posts/535025-accommodation.jpg");
  background-size:cover;
  height:110vh;

`
const Glass = styled.div`
  position: relative;
  z-index: 1;
  width: 900px;
  margin:auto;
  height: 600px;
  box-shadow: 20px 20px 50px rgba(0,0,0,0.5);
  border-radius: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5) ;
  background:rgba(255, 255, 255, 0.1) ;
  backdrop-filter: blur(5px);
  overflow: hidden;
`
const Container = styled.div`
  height: 50px;
  background-color: #E6D5A9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.h1`
  flex: 1;
  height: 100%;
  margin: 0px 20px;
  display: flex;
  color: #2A2F33;
  align-items: center;
  justify-content: center;
`;

const A = styled.h3`
  flex: 1;
  height: 100%;
  margin: 0px 20px;
  display: flex;
  color: #2A2F33;
  align-items: left;
  justify-content: center;
`;

const ViewListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin:-1rem 2rem;
`;

const Heading = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #2E3D34;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin:auto;
  max-width: 800px;
`;

const TableHead = styled.thead`
  margin-top:10px;
`;

const TableRow = styled.tr`
  border-bottom: 1px  #ddd;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TableHeadCell = styled.th`
  padding: 0.5rem;
  text-align: left;
`;

const TableBodyCell = styled.td`
  padding: 0.5rem;
  font-size:20px;
  text-align: left;
`;
const EditButton = styled.img`
height: 20px; width: 20px; cursor: pointer
` ;

const CancelButton = styled.img`
height: 20px; cursor: pointer;
`;
//List of bookings
const ViewList = () => {

  const [bookings, setBookings] = useState([]);
  function compare(aa, bb) {
    if (aa.type > bb.type)
      return 1;
    else if (aa.type === bb.type) {
      if (aa.checkOut > bb.checkOut)
        return 1
      else
        return -1;

    }
    else
      return -1;
  }




  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = () => {
    fetch('http://localhost:4000/viewList').then(res => {
      console.log(res);
      return res.json()

    }).then(({ data }) => {
      console.log(data);

      data.sort(compare);
      setBookings(data);
    })
      .catch(err => {
        console.log(err);
      });
  }



  const deleteItem = (id, check) => {

    const curr = new Date();

    const date1 = new Date(curr);
    const date2 = new Date(check);

    const diffInMs = date2 - date1;
    const diff = Math.floor(diffInMs / 3600000);

    if (diff > 48)
      alert("100% Refund")
    else if (diff <= 48 && diff > 24)
      alert("50% refund")
    else
      alert("0% refund")

    contiDelete(id);
  }

  const contiDelete = (id) => {

    fetch("http://localhost:4000/delete/" + id).then(response => {
      alert("Booking Cancelled");
      fetchData();
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <>
      <Main>
        <Container>
          <Link to="/" style={{ textDecoration: "none" }}><A>GO TO HOME PAGE</A></Link>

          <Text>BOOKINGS LIST</Text>

          <Link to="/booking" style={{ textDecoration: "none" }}><A>BOOK A NEW ROOM</A></Link>

        </Container>
        <ViewListContainer>
          <Heading>ROOM BOOKINGS</Heading>
          <Glass>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>User Email</TableHeadCell>
                  <TableHeadCell>Room Type</TableHeadCell>
                  <TableHeadCell>Start Time</TableHeadCell>
                  <TableHeadCell>End Time</TableHeadCell>
                  <TableHeadCell>Price</TableHeadCell>
                  <TableHeadCell>Edit</TableHeadCell>
                  <TableHeadCell>Cancel</TableHeadCell>
                </TableRow>
              </TableHead>
              <tbody>
                {bookings.map(booking => (
                  <TableRow key={booking._id}>
                    <TableBodyCell>{booking.email}</TableBodyCell>
                    <TableBodyCell>{booking.type}</TableBodyCell>
                    <TableBodyCell>{booking.checkIn}</TableBodyCell>
                    <TableBodyCell>{booking.checkOut}</TableBodyCell>
                    <TableBodyCell>{booking.price}</TableBodyCell>
                    <TableBodyCell>
                      <Link to={`/editBooking/${booking._id}`}> <EditButton
                        src="https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-edit-icon-png-image_4013714.jpg"
                        alt="edit icon"
                      /></Link>
                    </TableBodyCell>
                    <TableBodyCell>
                      <CancelButton onClick={() => deleteItem(booking._id, booking.checkIn)}
                        src="https://cdn.pixabay.com/photo/2021/02/19/14/44/delete-button-6030454_960_720.png"
                        alt="cancel icon"
                      />
                    </TableBodyCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </Glass>
        </ViewListContainer>
      </Main>
    </>
  );
};

export default ViewList;