import { Link } from 'react-router';
import './App.css'
import { useState, useEffect, useRef } from 'react'

// JEPARA ID 1189712

function App() {

  async function testFetch() {
    const url = 'https://worldwide-restaurants.p.rapidapi.com/search';
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_API_KEY,
        'x-rapidapi-host': 'worldwide-restaurants.p.rapidapi.com',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        language: 'en_US',
        location_id: '1189712',
        currency: 'IDR'
      })
    };

    try {
      setLoading(true)
      const response = await fetch(url, options);
      const result = await response.json();
      console.log("fetching");
      setRestaurantList(result.results.data)
      const categories: string[] = result.results.data.map((item: { cuisine: any[]; })  => item.cuisine[0].name)
      console.log("categories",categories);
      setCategoriesOptions(categoriesOptions => [...new Set([...categoriesOptions, ...categories])])
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  }

  useEffect(() => {
    if(restaurantList.length === 0){
      testFetch()
    }
  }, []);

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isPriceOpen, setIsPriceOpen] = useState<boolean>(false);
  const [selectedPrice, setSelectedPrice] = useState<string>("Price");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string>("Categories");
  const [categoriesOptions, setCategoriesOptions] = useState<string[]>(['Categories'])
  const [restaurantList, setRestaurantList] = useState<Record<string, any>[]>([])
  const [filteredList, setFilteredList] = useState<Record<string, any>[]>([])
  const [isFilter, setIsFilter] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("list", restaurantList);
    console.log("price level",restaurantList[1]?.open_now_text);
    
  }, [restaurantList]);

  const priceOptions: string[] = ["Price", "Cheap", "Mid-range", "Expensive"];

  const handleSelectPrice = (option: string) => {
    if(option !== "Price"){
      setIsFilter(true)
    } else if(option === "Price" && selectedCategories === "Categories" && !isChecked){
      setIsFilter(false)
      setFilteredList([])
    }
    setSelectedPrice(option);
    setIsPriceOpen(false);
  };
  const handleSelectCategories = (option: string) => {
    if(option !== "Categories"){
      setIsFilter(true)  
    } else if(option === "Categories" && selectedPrice === "Price" && !isChecked){
      setIsFilter(false)
      setFilteredList([])
    }
    setSelectedCategories(option);
    setIsCategoriesOpen(false);
  };

  type filterOption = {
    isOpen?: boolean;
    price?: string;
    categories?: string
  }

  function filterRestaurant(items: Record<string, any>[], filters: filterOption){
    console.log("param item", items);
    const tes = items.filter(item => {
      const openMatch = filters.isOpen ? item?.open_now_text === "Open Now" : true
      const priceMatch = filters.price ? item?.price_level === filters.price : true
      const categoriesMatch = filters.categories ? item?.cuisine?.[0]?.name === filters.categories : true
      return openMatch && priceMatch && categoriesMatch
    })
    return tes
  }

  useEffect(() => {
    console.log("filter", isFilter);
    let filtered: Record<string, any>[] = []
    if(isFilter){
      filtered = filterRestaurant(restaurantList, { isOpen: isChecked, price: selectedPrice === "Cheap" ? "$" : selectedPrice === "Mid-range" ? "$$ - $$$" : selectedPrice === "Expensive" ? "$$$" : undefined, categories: selectedCategories !== "Categories" ? selectedCategories : undefined })
      setFilteredList(filtered)
    }
    console.log("filtered list", filtered);
  }, [isFilter, isChecked, selectedPrice, selectedCategories]);

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

      {loading ? (
        <div className='h-20 flex justify-center items-center'>
          <h1 className='text-xl md:text-2xl italic text-gray-400 font-bold'>Loading Data...</h1>
        </div>
      ) : (
        <>
          {/* Filter */}
          <div className='flex flex-col md:flex-row md:items-center md:justify-between border-y border-gray-400 py-4 lg:px-10 mb-5 text-sm md:text-base'>
            <div className='flex flex-col md:flex-row md:items-center'>
              <span className='mb-2 md:mb-0'>Filter by: </span>
              {/* Open Checkbox */}
              <label className="flex items-center w-fit cursor-pointer space-x-2 border-b-2 md:ml-7 py-1 mb-2 md:mb-0">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => {
                    setIsChecked(!isChecked)
                    if(e.target.checked){
                      setIsFilter(true)
                    } else if(selectedPrice === "Price" && selectedCategories === "Categories" && !e.target.checked){
                      setIsFilter(false)
                    }
                  }}
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
                  className="py-1 rounded-md focus:outline-none w-40 text-left flex items-center"
                >
                  {selectedPrice} <span className='flex-1 text-right text-sm text-gray-400'>{isPriceOpen ? "ʌ" : "v"}</span>
                </button>
                {isPriceOpen && (
                  <div className="absolute mt-2 bg-white border rounded-md shadow-lg">
                    <ul className="py-2 text-gray-700">
                      {priceOptions.map((option, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 w-40 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelectPrice(option)}
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
                    <ul className="py-2 text-gray-700 max-h-40 overflow-y-auto">
                      {categoriesOptions.map((option, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 w-44 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelectCategories(option)}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <button disabled={!isChecked && selectedPrice === "Price" && selectedCategories === "Categories" ? true : false} className='border-2 border-gray-500 disabled:border-gray-300 disabled:text-gray-400 font-semibold py-1 px-10' onClick={() => {setIsChecked(false); setSelectedPrice("Price"); setSelectedCategories("Categories"); setIsFilter(false); setFilteredList([])}}>
              CLEAR ALL
            </button>
          </div>

          <h1 className='text-xl md:text-2xl mb-5'>{isChecked || selectedPrice !== "Price" || selectedCategories !== "Categories" ? "Filter Result:" : "All Restaurants"}</h1>

          {/* Restaurant Lists */}
          <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-2 gap-y-10 mb-7'>
            {isFilter ? 
              filteredList.length !== 0 ? 
                filteredList?.map((restaurant, index) => (
                  <RestaurantCard
                    key={index}
                    id={restaurant?.location_id}
                    name={restaurant?.name}
                    rating={Number(restaurant?.rating)}
                    category={restaurant?.cuisine[0]?.name}
                    price={restaurant?.price_level}
                    isOpen={restaurant?.open_now_text}
                    imageUrl={restaurant?.photo?.images?.medium?.url}
                  />
                )) : (
                  <h1 className='text-lg md:text-xl italic text-gray-400'>Empty right now~</h1>
                )
            : restaurantList?.map((restaurant, index) => (
              <RestaurantCard
                key={index}
                id={restaurant?.location_id}
                name={restaurant?.name}
                rating={Number(restaurant?.rating)}
                category={restaurant?.cuisine[0]?.name}
                price={restaurant?.price_level}
                isOpen={restaurant?.open_now_text}
                imageUrl={restaurant?.photo?.images?.medium?.url}
              />
            ))}
          </div>
        </>
      )}
      
    </div>
  )
}

export default App

interface RestaurantCardProps{
  id: number;
  name: string;
  rating: number;
  category: string;
  price: string;
  isOpen: string;
  imageUrl: string
}

function RestaurantCard({id, name, rating, category, price, isOpen, imageUrl}: RestaurantCardProps){
  return(
    <div className='w-11/12 h-fit flex flex-col rounded-lg'>
      <img
        src={imageUrl}
        alt='Rest Image'
        className='rounded-lg object-contain h-32 md:w-[350px] md:h-[350px]'
      />
      <h1
        className="line-clamp-2 text-base md:text-xl font-semibold mt-2"
      >
        {name}
      </h1>
      <div className="flex md:space-x-1 items-center">
        {Array.from({ length: 5 }, (_, index) => {
          const fillPercentage = Math.max(0, Math.min(1, rating - index)) * 100;
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
                style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
              >
                <path
                  d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l7.1-1.01L12 2z"
                />
              </svg>
            </div>
          );
        })}
        <span className='ml-0.5 md:ml-2 text-sm md:text-base'>{rating}</span>
      </div>
      <div className='text-gray-500 text-xs md:text-sm mt-2 mb-2 flex flex-wrap justify-between items-center'>
        <div>
          <span>{category}</span>
          <span className={price?.length !== 0 ? 'mx-0.5 md:mx-1' : 'hidden'}>•</span>
          <span>{price}</span>
        </div>
        <div>
          <span className={isOpen?.length === 0 || isOpen?.length === undefined ? 'invisible text-lg' : `${isOpen === "Open Now" ? "text-green-500" : "text-red-500"} text-lg mr-0.5 md:mr-1`}>•</span>
          <span>{isOpen}</span>
        </div>
      </div>
      <Link to={`/restaurant/${id}`} className='bg-blue-950 text-white py-2 rounded flex justify-center text-xs md:text-base'>
        <span>LEARN MORE</span>
      </Link>
    </div>
  )
}
