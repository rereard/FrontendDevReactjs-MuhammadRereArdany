import { useEffect, useState } from "react";
import { useParams } from "react-router";

function Detail(){
  const { id } = useParams<{id: string}>()
  const safeId: string = id ?? ""

  async function testFetch() {
    const url = 'https://worldwide-restaurants.p.rapidapi.com/detail';
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_API_KEY,
        'x-rapidapi-host': 'worldwide-restaurants.p.rapidapi.com',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        currency: 'IDR',
        language: 'en_US',
        location_id: safeId
      })
    };
    const url2 = 'https://worldwide-restaurants.p.rapidapi.com/reviews';
    const options2 = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_API_KEY,
        'x-rapidapi-host': 'worldwide-restaurants.p.rapidapi.com',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        location_id: safeId,
        language: 'en_US',
        currency: 'IDR',
      })
    };

    try {
      setLoading(true)
      const [response1, response2] = await Promise.all([
        fetch(url, options),
        fetch(url2, options2)
      ])
      const [result1, result2] = await Promise.all([
        response1.json(),
        response2.json()
      ])
      console.log("fetching");
      console.log("detail", result1.results);
      console.log("5 reviews", result2.results.data.slice(0, 5));
      const slicedReviews = result2.results.data.slice(0, 5)
      setDetail(result1.results)
      setReviewtList(slicedReviews)
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  }

  useEffect(() => {
    if(Object.keys(detail).length === 0){
      testFetch()
    }
  }, []);

  const [detail, setDetail] = useState<Record<string, any>>({})
  const [reviewtList, setReviewtList] = useState<Record<string, any>[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("list", detail);
  }, [detail]);

  if(loading){
    return(
      <div className='h-screen w-screen flex justify-center items-center'>
        <h1 className='text-xl md:text-2xl italic text-gray-400 font-bold'>Loading Data...</h1>
      </div>
    )
  } else return(
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center break-words justify-center md:mb-0">
        <div className="md:mr-6 md:w-fit flex justify-center">
          <img className="rounded-lg w-96 md:w-full" src={Object.keys(detail).length !== 0 ? detail?.photo?.images?.original?.url : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"} alt="restaurant img" />
        </div>
        <div className="md:w-11/12 mt-2 md:h-full">
          <span className="text-sm">{detail?.cuisine?.[0]?.name}, {detail?.cuisine?.[1]?.name}, {detail?.cuisine?.[2]?.name}</span>
          <h1 className="text-xl md:text-2xl font-bold">{detail?.name}</h1>
          <div className="flex space-x-1 items-center">
            {Array.from({ length: 5 }, (_, index) => {
              const fillPercentage = Math.max(0, Math.min(1, detail?.rating - index)) * 100;
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
            <span className='ml-2'>{detail?.rating}</span>
          </div>
          {detail?.description !== "" ? (
            <p className="mt-2">{detail?.description}</p>
          ) : (
            <p className="mt-2 italic text-gray-400">No Description</p>
          )}
          {/* <p className="mt-2">{detail?.description}</p> */}
        </div>
      </div>
      <div className="mt-5 md:w-1/2">
        <h1 className="text-xl md:text-2xl mb-5">Reviews</h1>
        {reviewtList.map(review => (
          <Review
            key={review?.id} 
            rating={Number(review?.rating)}
            photos={review?.photos}
            userName={review?.user?.username}
            text={review?.text}
          />
        ))}
      </div>
    </div>
  )
}

export default Detail

interface ReviewProps{
  rating: number;
  photos: Array<any>;
  userName: string;
  text: string
}

function Review({ rating, photos, userName, text}: ReviewProps){
  return(
    <div className="mb-6">
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
                style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }} // Dynamic fill
              >
                <path
                  d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l7.1-1.01L12 2z"
                />
              </svg>
            </div>
          );
        })}
        <span className='ml-2 text-sm md:text-base'>{rating}</span>
      </div>
      <span className="font-bold text-sm md:text-base">{userName}</span>
      <div className="my-1 flex gap-2">
        {photos?.map((item,i) => (
          <img key={i} className="w-20 h-20 rounded object-cover" src={item?.images?.small?.url} alt="restaurant img" />
        ))}
      </div>
      <p className="text-sm md:text-base">{text}</p>
    </div>
  )
}