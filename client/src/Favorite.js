import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "./Logo-Travelio.jpg";
import searchLogo from "./logo-search.jpg";
import noImages from "./no-images.jpg"
import axios from "axios";
import Rater from "react-rater";
import 'react-rater/lib/react-rater.css';

// styling
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  color: white;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  align-items: center;
  width: 50%;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
  width: 100%;
`;
const BookListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: space-evenly;
`;
const ButtonWishList = styled.button`
  border-radius: 10px;
  width: 150px;
  height: 50px;
  margin-left: 20px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
`
const BookContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 250px;
    box-shadow: 0 3px 10px 0 #aaa;
    cursor: pointer;
    margin: 50px;
`
const ThumbnailImage = styled.img`
    height: 200px;
    margin: 5px;
`
const BookTitle = styled.span`
    font-size: 18px;
    font-weight: 600;
    color: white;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 15px 0;
`;
const InfoColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const BookInfo = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: white;
    text-transform: capitalize;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`
const ButtonAddFavorite = styled.button`
    margin: 5px;
    font-weight: bold;
    font-size: 18px;
    background-color: red;
`
const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
  position:fixed;
  background-color: rgba(200, 200, 200);
  opacity: 95%;
`
const ModalContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 12px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px, 5px, 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  z-index: 1;
`

const TitleConfirmation = styled.div`
  display: inline-block;
  text-align: center;
  color: black;
  font-weight: bold;
  font-size: 16px;
`

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ButtonConfirm = styled.button`
  width: 75px;
  height: 30px;
  margin: 10px;
  border: none;
  background-color: ${props => props.color};
  font-size: 10px;
  font-weight: bold;
  cursor: pointer;
  color: white;
`
// Main function
function Favorite() {
  const [books, useBooks] = useState([]);
  const [modalAdd, useModalAdd] = useState(false);
  const [oneBook, useOneBook] = useState({});
  
  let navigate = useNavigate();

  useEffect(() => {
    GetAllFavoriteBooks();
  }, [])

  const GetAllFavoriteBooks = async() => {
    // get data yg di favorite in di mongo db
    const res = await axios.get(`/books`).catch(function(error) {
      if (error.response) {
        console.log(error.message);
      }
    });
    useBooks(res.data);
  }

  const ConfirmRemoveFavorite = async(event) => {
    // remove book to favorite
    await axios.delete(`/books/${oneBook._id}`).catch(function(error) {
        if (error.response) {
            console.log(error.message);
        }
    });
    useOneBook({});
    GetAllFavoriteBooks();
    useModalAdd(false);
  }

  const CancelAddFavorite = () => {
    useModalAdd(false);
    useOneBook({});
  }

  const OnClickRemoveFavorite = async(event, data) => {
    // add books to favorite
    useModalAdd(true);
    useOneBook(data);
  }

  return (
    <Container>
      <Header> 
        <AppName>
          <LogoImage src={logo} />
            <ButtonWishList onClick={() => {navigate("/")}}> Back </ButtonWishList>
        </AppName>
      </Header>
      <BookListContainer>
        {books?.length 
        ? books.map((book, index) => (
          <BookContainer key={index}> 
            <ThumbnailImage src={book?.thumbnail ? book.thumbnail : noImages}/>
            <BookTitle> {book.title} </BookTitle>
            <InfoColumn>
                <BookInfo> Author : {book?.author ? book.author : "Anonymous"}</BookInfo>
                <ButtonAddFavorite onClick={(event) => OnClickRemoveFavorite(event, book)}> Remove from Favorite </ButtonAddFavorite>
            </InfoColumn>
        </BookContainer>
          ))
          : <BookListContainer> 
          <h1>Favorite List is Empty</h1> 
        </BookListContainer>
        }
      </BookListContainer>
      {modalAdd && (
        <ModalBackground>
          <ModalContainer>
            <TitleConfirmation> Do you want to add this book to favorite list? </TitleConfirmation>
              <Footer>
                <ButtonConfirm color={'crimson'} onClick={() => CancelAddFavorite()}> cancel </ButtonConfirm>
                <ButtonConfirm color={'cornflowerblue'} onClick={(event) => ConfirmRemoveFavorite(event)}> confirm </ButtonConfirm>
              </Footer>
          </ModalContainer>
        </ModalBackground>
      )}
    </Container>
  );
}

export default Favorite;
