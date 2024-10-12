// src/components/SignupOrEditForm.tsx
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import InputFeild from './InputFeild';
import { useQuery,useMutation } from '@tanstack/react-query';


const initialFromData = {
  firstName: '',
  lastName: '',
  email: "",
  profile_image:  null,
  phoneNo: '',
  gender: "male",
  hobbies: [],
  user_type:"Job_Seeker",
  agency:"",
  resume: null
}


// Validation Schema Function
const createValidationSchema = () =>
  Yup.object().shape({
    firstName: Yup.string().required("Please enter your first name"),
    // lastName: Yup.string().nullable().optional().required("Please enter your last name"),
    email: Yup.string().email("Please enter the correct email").required("Please enter your email"),
    profile_image: Yup.mixed().required("Please enter your profile photo"),
    phoneNo: Yup.string().required(";please Enter Your Mobile No.").matches(/^[1-9][0-9]{9}/, "Must be integer and 10 in length"),
    user_type: Yup.string().required("Please enter your role"),
    // agency: Yup.string().nullable().optional().required("agency is required"),
    // resume: Yup.mixed().required("Please enter your appointment letter"),
  });

const Register: React.FC = () => {   
  const [agencyData, setAgency] = useState([])

  const navigate =  useNavigate();
  const fetchData = async () =>{
    try{
        const response : any = await axios.get("http://localhost:4400/api/v1/getAllAgency")
        console.log(response,"responseseseseswe")
        setAgency(response.data.data);
        return response;
    } catch(error){
        console.log(error)
    }
  }
  const {data,isLoading} = useQuery({
    queryKey:["getAgencies"],
    queryFn: fetchData
  })

  const  mutation = useMutation({
    mutationKey: ["mutation"],
    mutationFn: async (data:any) => {
        return await axios.post("http://localhost:4400/api/v1/signup",data)
    },
    onSuccess:()=>{
      toast.success("successfully user added")
      navigate(`/login`)
    }
})


  if(isLoading){
    return(<div>Loading...</div>)
  }

  return (
    <div className=" bg-slate-300 font-serif w-full pb-2">
      <div className=' bg-gray-800 h-9'></div>
      <div className=' text-gray-800 font-semibold text-5xl '>Register Form</div>
      <Formik
        initialValues={initialFromData}
        validationSchema={createValidationSchema()}
        
        onSubmit={async(values) => {
          try{
              console.log("vauaevauae")
              const formData:any = new FormData();

              Object.keys(values).forEach((key) =>{
                formData.append(key, (values as any)[key]);
              })

              for(let [key,value] of formData){
                console.log(key,value)
              }

              const {data}:any = mutation.mutate(formData)
              
          }catch(error){
            toast.error("Unble to upload data");
          }
        }}
      >
        {({values, isSubmitting , isValid, validateForm,setFieldValue, setValues}) => (
          <Form className='bg-gray-400 w-[65%] mx-auto rounded-xl py-3 my-3'>
            <InputFeild fieldName='firstName'  label='First Name' placeHolder='Enter your First Name' />
            {
              values.user_type === 'Job_Seeker'  && (<InputFeild fieldName='lastName'  label='Last Name' placeHolder='Enter your Last Name' />
              )
            }


            <InputFeild fieldName='email'  label='Email' placeHolder='Enter your Email' />

            <InputFeild fieldName='phoneNo'  label='Phone Number' placeHolder='Enter Your Phone No' />

            <label htmlFor='gender'>
              Gender
              <label htmlFor='male'>Male
                <input type="radio" id="male" name="gender" value="male" />
              </label>
              <label htmlFor='female'>Female
                <input type="radio" id="female" name="gender" value="female" />
              </label>
              <label htmlFor='other'>other
                <input type='radio'  id='other' name='gender' value='other'/>
              </label>
            </label>

            <div id="checkbox-group">Hobbies</div>
          <div role="group" aria-labelledby="checkbox-group">
            <label>
              <Field type="checkbox" name="hobbies" value="Singing" />
              Singing
            </label>
            <label>
              <Field type="checkbox" name="hobbies" value="Traviling" />
              Traviling
            </label>
            <label>
              <Field type="checkbox" name="hobbies" value="Reading" />
              Reading
            </label>
            <label>
              <Field type="checkbox" name="hobbies" value="Playing" />
              Playing
            </label>
          </div>

            <div>
            <label htmlFor="userType">User Type</label>
             <  Field as="select" name="user_type">
                  <option value="Job_Seeker">Job Seeker</option>
                  <option value="Agency">Agency</option>
                </Field>
              </div>

            <div className='input_main_div flex-col flex mx-2'>
                  <label htmlFor='profile_image' className="input_label">Profile Image</label>
                  <input
                      id='profile_image'
                      name='profile_image'
                      type="file"
                      className="input_field bg-slate-200 px-1 py-1 rounded-lg"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          const file = event.target.files?.[0] || null;
                          setFieldValue('profile_image', file);
                      }}
                  />
                  <ErrorMessage name='profile_image' component="div" className='field_error' />
            </div>
            {
              values.user_type === 'Job_Seeker'  && (<>

                

                <div className='input_main_div flex-col flex mx-2'>
                    <label htmlFor='resume' className="input_label">Resume</label>
                    <input
                        id='resume'
                        name='resume'
                        type="file"
                        className="input_field bg-slate-200 px-1 py-1 rounded-lg"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const file = event.target.files?.[0] || null;
                            setFieldValue('resume', file);
                        }}
                    />
                    <ErrorMessage name='resume' component="div" className='field_error' />
                </div>
                    <div>
                      <Field as="select" name="agency">
                        {
                          agencyData?.map((agency:any) =>{
                            return(<option  value={agency.firstName}>{agency.firstName}</option>)
                          })
                        }
                      </Field>
                    </div>
              </>)
            }
            
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

export default Register;