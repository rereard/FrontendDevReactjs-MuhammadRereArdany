function Detail(){
  return(
    <div className="p-8">
      <div className="flex flex-col md:flex-row items-center break-words justify-center md:mb-0">
        <div className="md:mr-6 w-fit">
          <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="restaurant img" />
        </div>
        <div className="md:w-11/12 mt-2 md:h-full">
          <span className="text-sm">Categories</span>
          <h1 className="text-xl md:text-2xl font-bold">Restaurant's Name</h1>
          <div className="flex space-x-1 items-center">
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
            <span className='ml-2'>3.6</span>
          </div>
          <p className="mt-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit, tempore. Veritatis iste velit sapiente magnam deleniti et quas dolor dicta quisquam. Nesciunt modi praesentium accusamus saepe tempora? Porro nisi doloremque vitae sunt vero animi cum, voluptas assumenda illo nihil nobis doloribus recusandae exercitationem sed accusantium provident sit asperiores beatae? Natus?</p>
        </div>
      </div>
      <div className="mt-5 md:w-1/2">
        <h1 className="text-2xl mb-5">Reviews</h1>
        <Review/>
        <Review/>
        <Review/>
      </div>
    </div>
  )
}

export default Detail

function Review(){
  return(
    <div className="mb-6">
      <div className="flex space-x-1 items-center">
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
        <span className='ml-2'>3.6</span>
      </div>
      <span className="font-bold">User's Name</span>
      <div className="my-1 flex gap-2">
        <img className="w-20 h-20 rounded object-cover" src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="restaurant img" />
        <img className="w-20 h-20 rounded object-cover" src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="restaurant img" />
        <img className="w-20 h-20 rounded object-cover" src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="restaurant img" />
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, dolorem? Consectetur tenetur, nostrum doloremque asperiores deserunt consequuntur tempora tempore officiis.</p>
    </div>
  )
}