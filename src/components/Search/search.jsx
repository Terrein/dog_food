import './index.css';
import { forwardRef } from 'react';
import { ReactComponent as SearchIcon } from './ic-search.svg';
import { ReactComponent as CloseIcon } from './ic-close-input.svg';


const Search = forwardRef(({ onSubmit: propsOnSubmit, onInput }, ref) => {
  const handleInput = (e) => {
    onInput(e.target.value)
  }
  return (
    <form className="search" onSubmit={propsOnSubmit}>
      <input ref={ref} type="text" className='search__input' placeholder='Поиск' onInput={handleInput} />
      <button className='search__btn'>
        <SearchIcon />
        {false && <CloseIcon />}
      </button>
    </form>
  )
})

export default Search;
