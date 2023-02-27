import { useState, useEffect, useRef } from 'react';
import CardList from '../CardList/card-list';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import './index.css';
import SeachInfo from '../SeachInfo';
import Button from '../Button/button';
import api from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';
import { isLiked } from '../../utils/product';
import { Routes, Route } from 'react-router-dom';
import CardInfo from '../CardDetInfo/cardInfo';
import NotFound from '../NotFound/notFound';


function App() {
  const [sortName, setSortName] = useState('Сортировка')
  const [sortStatus, setSortStatus] = useState(false)
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null)
  const debounceSearchQuery = useDebounce(searchQuery, 300)
  const inputEl = useRef(null)

  const handleRequest = () => {
    api.search(debounceSearchQuery)
      .then((searchResult) => {
        setCards(searchResult)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
        setCurrentUser(userData)
        setCards(productsData.products)
        localStorage.setItem('defaultValue', JSON.stringify(productsData.products))
      })
      .catch(err => console.log(err))
  }, [])


  useEffect(() => {
    handleRequest()
    console.log("INPUT", debounceSearchQuery);
  }, [debounceSearchQuery])

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  }

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  }

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData)
      .then((newUserData) => {
        setCurrentUser(newUserData)
      })
  }

  function handleProductLike(product) {
    const liked = isLiked(product.likes, currentUser._id)
    api.changeLikeProduct(product._id, liked)
      .then((newCard) => {
        const newProducts = cards.map(cardState => {
          console.log('Карточка из стейта', cardState);
          console.log('Карточка c сервера', newCard);
          return cardState._id === newCard._id ? newCard : cardState
        })

        setCards(newProducts);
      })
  }
  const ASCSort = () => {
    const AscSortCard = cards.sort((a, b) => parseInt(a['price']) - parseInt(b['price']))
    setCards([...AscSortCard])
  }
  const DESCSort = () => {
    const DescSortCard = cards.sort((a, b) => parseInt(b['price']) - parseInt(a['price']))
    setCards([...DescSortCard])
  }

  const hadleSort = () => {
    setSortStatus(!sortStatus)
    if (!sortStatus) {
      // PriceASC
      ASCSort()
      setSortName('По возрастанию')
    } else {
      // PriceDESC
      DESCSort()
      setSortName('По убыванию')
    }
  }
  const hadleCancelSort = () => {
    setCards(JSON.parse(localStorage.getItem('defaultValue')))
    setSearchQuery('')
    inputEl.current.value = null
  }

  return (
    <>

      <Header user={currentUser} onUpdateUser={handleUpdateUser}>
        <>
          <Logo className="logo logo_place_header" href="/" />
        </>
      </Header>
      <main className='content container'>
        <Routes>
          <Route path='/' element={
            <>
              <SeachInfo searchCount={cards.length} searchText={searchQuery} />
              <Search ref={inputEl} onSubmit={handleFormSubmit} onInput={handleInputChange} />
              <Button onClick={hadleSort} type={'primary'}>{sortName}</Button>
              <Button onClick={hadleCancelSort} type={'primary'}>Сбросить фильтр</Button>
              <div className='content__cards'>
                <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser} />
              </div>
            </>} />
          <Route path='/info/:_id' element={<CardInfo goods={cards} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App;

