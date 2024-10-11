// src/components/SignupOrEditForm.tsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { assert } from 'console';
import InputFeild from './InputFeild';


interface SignupOrEditFormValues {
  firstName: string;
  lastName: string;
  email: string;
  profile_image: File | null;
  companyAddress: string;
  companyCity: string;
  companyState: string;
  companyZip: number | null;
  homeAddress: string;
  homeCity: string;
  homeState: string;
  homeZip: number | null;
  appointment_letter: File | null
}

const initialFromData = {
  firstName: '',
  lastName: '',
  email: '',
  profile_image: '',
  companyAddress: '',
  companyCity: '',
  companyState: '',
  companyZip: '',
  homeAddress: '',
  homeCity: '',
  homeState: '',
  homeZip:"",
  appointment_letter:''
}


// Validation Schema Function
const createValidationSchema = () =>
  Yup.object().shape({
    firstName: Yup.string().required("Please enter your first name"),
        lastName: Yup.string().required("Please enter your last name"),
        email: Yup.string().email("Please enter the correct email").required("Please enter your email"),
        profile_image: Yup.mixed().required("Please enter your profile photo"),
        companyAddress: Yup.string().required("Please enter your company's address"),
        companyCity: Yup.string().required("Please enter your company's city"),
        companyState: Yup.string().required("Please enter your company's state"),
        companyZip: Yup.string().required("Please enter your company's zip code").matches(/^[1-9][0-9]{5}/, "Must be only digits  and 6 in length"),
        homeAddress: Yup.string().required("Please enter your home's address"),
        homeCity: Yup.string().required("Please enter your home's city"),
        homeState: Yup.string().required("Please enter your home's state"),
        homeZip: Yup.string().required("Please enter your home's zip code").matches(/^[1-9][0-9]{5}/, "Must be only digits  and 6 in length"),
        appointment_letter: Yup.mixed().required("Please enter your appointment letter"),
  });

const SignupOrEditForm: React.FC<any> = ({mode}) => {   

  const navigate =  useNavigate(); 
//   console.log(initialValues);

  return (
    <div className=" bg-slate-300 font-serif w-full h-lvh">
      <div className=' bg-gray-800 h-9'></div>
      <div className=' text-gray-800 font-semibold text-5xl '>Add Data</div>
      <Formik
        initialValues={initialFromData}
        validationSchema={createValidationSchema}
        
        onSubmit={async(values) => {
          try{
              console.log("press the submit button")
            console.log(values)
              const formData:any = new FormData();

              Object.keys(values).forEach((key) =>{
                formData.append(key, (values as any)[key]);
              })

              for(let [key,value] of formData){
                console.log(key,value)
              }

              const response : any  = await axios.post("http://localhost:3001/user/signup",formData,{
                headers:{
                  'Content-Type': 'multipart/form-data'
                }
              })

              console.log(response.data);

              navigate(`/profile/${response?.data?.userDetail?.id}`)
              toast.success("successfully data added")
          }catch(error){
            toast.error("Unble to upload data");
          }


        }}
      >
        {({values, isSubmitting , isValid, validateForm,setFieldValue, setValues}) => (
          <Form className='bg-gray-400 w-[80%] mx-auto rounded-xl py-3 my-3'>
            <InputFeild fieldName='lastName'  label='First Name' placeHolder='Enter your First Name' />

            <InputFeild fieldName='lastName'  label='Last Name' placeHolder='Enter your Last Name' />

            <InputFeild fieldName='email'  label='Email' placeHolder='Enter your Email' />

            <InputFeild fieldName='companyAddress'  label='Company Address' placeHolder='Enter Your Companty Address' />

            <InputFeild fieldName='companyCity'  label='Company City' placeHolder='Enter your company city' />

            <InputFeild fieldName='companyState'  label='Company State' placeHolder='Enter your company state' />

            <InputFeild fieldName='companyZip'  label='Company Zip' placeHolder='Enter your company zip' />

            <InputFeild fieldName='homeAddress'  label='Home Address' placeHolder='Enter your home address' />

            <InputFeild fieldName='homeCity'  label='Home City' placeHolder='Enter your home city' />

            <InputFeild fieldName='homeState'  label='Home State' placeHolder='Enter your home state' />

            <InputFeild fieldName='homeZip'  label='Home Zip' placeHolder='Enter your home Zip' />

            <div className='input_main_div flex-col flex mx-6'>
                  <label htmlFor='profile_image' className="input_label">Profile Image</label>
                  <input
                      id='profile_image'
                      name='profile_image'
                      type="file"
                      className="input_field bg-slate-200 px-2 py-1 rounded-lg"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          const file = event.target.files?.[0] || null;
                          setFieldValue('profile_image', file);
                      }}
                  />
                  <ErrorMessage name='profile_image' component="div" className='field_error' />
            </div>
            <button type='submit' className='w-[70%] bg-gray-800 text-white font-semibold text-2xl my-1 rounded-xl  py-1 hover:scale-90 transition-all duration-100'
                >
                  Signup
            </button>
            <button type='button' className='w-[40%] bg-gray-800 text-white font-semibold text-2xl my-1 rounded-xl  py-1 hover:scale-90 transition-all duration-100'
                onClick={() =>{
                        console.log(values  )
                        // setValues(initialFromData);
                        toast.success("Cancel Form");
                      }
                    }
                    >
                     Cancel 
               </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupOrEditForm;