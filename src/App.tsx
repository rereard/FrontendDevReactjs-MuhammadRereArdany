import { Link } from 'react-router';
import './App.css'
import { useState, useEffect, useRef } from 'react'

// JEPARA ID 1189712

function App() {

  // async function testFetch() {
  //   const url = 'https://worldwide-restaurants.p.rapidapi.com/typeahead';
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'x-rapidapi-key': 'f3d53eacfbmsh604938fe51b901ap158194jsnb0457b5b66d0',
  //       'x-rapidapi-host': 'worldwide-restaurants.p.rapidapi.com',
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     body: new URLSearchParams({
  //       q: 'jepara',
  //       language: 'en_US'
  //     })
  //   };
    
  //   try {
  //     const response = await fetch(url, options);
  //     const result = await response.json();
  //     console.log(result);
  //   } catch (error) {
  //     console.error(error);
  //   } 
  // }

  // useEffect(() => {
  //   testFetch()
  // }, []);

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isPriceOpen, setIsPriceOpen] = useState<boolean>(false);
  const [selectedPrice, setSelectedPrice] = useState<string>("Price");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string>("Categories");
  const [count, setCount] = useState<number>(12);

  const priceOptions: string[] = ["Price", "$", "$$", "$$$", '$$$$'];
  const categoriesOptions: string[] = ["Categories", "Indonesia", "Japanese", "Thai", 'Western'];

  const handleSelectPrice = (option: string) => {
    setSelectedPrice(option);
    setIsPriceOpen(false);
  };
  const handleSelectCategories = (option: string) => {
    setSelectedCategories(option);
    setIsCategoriesOpen(false);
  };

  const dropdownPriceRef = useRef<HTMLDivElement>(null);
  const dropdownCategoryRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownPriceRef.current && !dropdownPriceRef.current.contains(event.target as Node)) {
        setIsPriceOpen(false);
      } 
      if (dropdownCategoryRef.current && !dropdownCategoryRef.current.contains(event.target as Node)){
        setIsCategoriesOpen(false)
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className='p-8'>
      <h1 className='text-2xl md:text-4xl mb-5'>Restaurants</h1>
      <p className='text-base md:text-xl text-gray-500 mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat molestias minima perferendis dolorem praesentium error, fuga delectus enim assumenda dolores, exercitationem nobis quos, incidunt modi illo molestiae at inventore porro. Et laudantium labore atque eum ratione architecto quod modi ut, dolor ab voluptas minus. Ea laudantium explicabo consectetur earum modi.</p>

      {/* Filter */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between border-y border-gray-400 py-4 lg:px-10 mb-5 text-sm md:text-base'>
        <div className='flex flex-col md:flex-row md:items-center'>
          <span className='mb-2 md:mb-0'>Filter by: </span>
          {/* Open Checkbox */}
          <label className="flex items-center w-fit cursor-pointer space-x-2 border-b-2 md:ml-7 py-1 mb-2 md:mb-0">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="hidden"
            />
            <div className={`w-4 h-4 rounded-full border-2 border-gray-600 flex items-center justify-center ${isChecked ? "bg-gray-600" : "bg-white"}`}>
              {isChecked && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
            </div>
            <span>Open Now</span>
          </label>
          {/* Price Dropdown */}
          <div className='inline-block text-left w-fit md:ml-7 mb-2 md:mb-0 border-b-2' ref={dropdownPriceRef}>
            <button
              onClick={() => setIsPriceOpen(!isPriceOpen)}
              className="py-1 rounded-md focus:outline-none w-20 text-left flex items-center"
            >
              {selectedPrice} <span className='flex-1 text-right text-sm text-gray-400'>{isPriceOpen ? "ʌ" : "v"}</span>
            </button>
            {isPriceOpen && (
              <div className="absolute mt-2 bg-white border rounded-md shadow-lg">
                <ul className="py-2 text-gray-700">
                  {priceOptions.map((option, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 w-20 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectPrice(option)} // Handle selection
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Categories Dropdown */}
          <div className='inline-block text-left w-fit md:ml-7 mb-3 md:mb-0 border-b-2' ref={dropdownCategoryRef}>
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="py-1 rounded-md focus:outline-none w-44 text-left flex items-center"
            >
              {selectedCategories} <span className='flex-1 text-right text-sm text-gray-400'>{isCategoriesOpen ? "ʌ" : "v"}</span>
            </button>
            {isCategoriesOpen && (
              <div className="absolute mt-2 bg-white border rounded-md shadow-lg">
                <ul className="py-2 text-gray-700">
                  {categoriesOptions.map((option, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 w-44 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectCategories(option)} // Handle selection
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <button disabled={!isChecked && selectedPrice === "Price" && selectedCategories === "Categories" ? true : false} className='border-2 border-gray-500 disabled:border-gray-300 disabled:text-gray-400 font-semibold py-1 px-10' onClick={() => {setIsChecked(false); setSelectedPrice("Price"); setSelectedCategories("Categories")}}>
          CLEAR ALL
        </button>
      </div>

      <h1 className='text-xl md:text-2xl mb-5'>{isChecked || selectedPrice !== "Price" || selectedCategories !== "Categories" ? "Filter Result:" : "All Restaurants"}</h1>

      {/* Restaurant Lists */}
      <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-2 gap-y-10 mb-7'>
        {Array.from({ length: count }, (e,i) => {
          return(
            <RestaurantCard id={i} />
          )
        })}
      </div>
      <div className='flex justify-center'>
        <button className='text-sm md:text-base border-2 border-gray-600 md:w-1/4 w-11/12 py-2 font-semibold rounded-lg' onClick={() => setCount(count+12)}>
          LOAD MORE
        </button>
      </div>
    </div>
  )
}

export default App

interface RestaurantCardProps{
  id: number
}

function RestaurantCard({id}: RestaurantCardProps){
  return(
    <div className='w-11/12 h-fit flex flex-col rounded-lg'>
      <img
        src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
        alt='Rest Image'
        className='w-full rounded-lg'
      />
      <h1
        className="line-clamp-2 text-base md:text-xl font-semibold mt-2"
      >
        Restaurant's Name
      </h1>
      <div className="flex md:space-x-1 items-center">
        {Array.from({ length: 5 }, (_, index) => {
          const fillPercentage = Math.max(0, Math.min(1, 3.6 - index)) * 100;
          return (
            <div key={index} className="relative w-4 h-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="1"
                className="absolute w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l7.1-1.01L12 2z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                className="absolute w-full h-full"
                style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }} // Dynamic fill
              >
                <path
                  d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l7.1-1.01L12 2z"
                />
              </svg>
            </div>
          );
        })}
        <span className='ml-0.5 md:ml-2 text-sm md:text-base'>3.6</span>
      </div>
      <div className='text-gray-500 text-xs md:text-sm mt-2 flex flex-wrap justify-between items-center'>
        <div>
          <span>Categories</span>
          <span className='mx-0.5 md:mx-1'>•</span>
          <span>Price</span>
        </div>
        <div>
          <span className='text-green-500 text-lg mr-0.5 md:mr-1'>•</span>
          <span>Is Open?</span>
        </div>
      </div>
      <Link to={`/restaurant/${id}`} className='bg-blue-950 text-white mt-2 py-2 rounded flex justify-center text-xs md:text-base'>
        <span>LEARN MORE</span>
      </Link>
    </div>
  )
}
