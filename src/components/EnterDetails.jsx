import React, { useState, useEffect } from 'react';
import CustomPage from './CustomPage';
import Loader from './Loader';
import axios from 'axios';

const EnterDetails = () => {
  const [details, setDetails] = useState(null);
  const [detailsPresent, setDetailsPresent] = useState(false);

  // Image States
  const [imageSent, setImageSent] = useState(null);
  const [imageDesc, setImageDesc] = useState(null);

  //processing and loading states
  // const [loading, isLoading] = useState(false);
  const [getting, setGetting] = useState(false);
  const [processingDone, setProcessingDone] = useState(false);

  //description
  const [description, setDescription] = useState(null);
  const handleSubmit = (e) => {
    console.log(description);
    setGetting(true);
    const form = new FormData();
    form.append('response_as_dict', 'true');
    form.append('attributes_as_list', 'false');
    form.append('show_original_response', 'false');
    form.append('providers', 'google');
    form.append('file', imageSent);

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjdkZDAwMDgtYWJhMy00ZjJhLTkwMWQtYzM4NmRkMTFjZDZlIiwidHlwZSI6ImFwaV90b2tlbiJ9.15fraccWRxmPWDngbg169ji4Ksza2IeMA-f7KLge2rs',
      },
    };

    options.body = form;

    fetch('https://api.edenai.run/v2/image/object_detection', options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response?.google?.items[0].label);
        setImageDesc(response?.google?.items[0].label);
        setGetting(false);

        setImageSent(null);
      })
      .catch((err) => console.error(err));
    setProcessingDone(true);
    setDetailsPresent(true);
    // sendBackend();
    // const text = axios
    //   .post('http://localhost:4000/generate', {
    //     data: 'Sleek, Stylish',
    //   })
    //   .then((res) => console.log(res.data))
    //   .catch((err) => alert(err));
  };
  const handleChange = (e) => {
    console.log(description);
    setDescription(e.target.value);
  };
  //handle Backend

  return (
    <div className='h-[100vh]'>
      <div className='text-white'>Enter Your Product Details </div>
      <div className='flex flex-col'>
        <div className='flex flex-col items-center justify-center w-full'>
          <label
            htmlFor='dropzone-file'
            className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
          >
            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
              <svg
                aria-hidden='true'
                className='w-10 h-10 mb-3 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                ></path>
              </svg>
              <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                <span className='font-semibold'>Click to upload</span> or drag
                and drop
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id='dropzone-file'
              type='file'
              className='hidden'
              onChange={(e) => {
                console.log(e.target.files[0]);
                setImageSent(e.target.files[0]);
              }}
            />
          </label>
          <input
            type='text'
            className='mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
            // value='Enter input'
            placeholder='Enter Text'
            // disabled
            onChange={(e) => handleChange(e)}
          />
          <button
            onClick={() => {
              handleSubmit();
            }}
            className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 m-5'
          >
            MAGIC
          </button>
        </div>

        <label className='text-white'>{imageSent?.name}</label>
        {/* <label className='text-white'>{imageDesc}</label> */}
      </div>
      {getting && <Loader />}
      {detailsPresent && (
        <CustomPage imageDesc={imageDesc} description={description} />
      )}
    </div>
  );
};

export default EnterDetails;
