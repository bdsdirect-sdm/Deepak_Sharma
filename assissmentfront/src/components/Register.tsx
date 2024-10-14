import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import InputFeild from './InputFeild';
import { useQuery } from '@tanstack/react-query';
import { createValidationSchema } from '../utilities/validators';
import { useResisterContext } from '../services/operations/userAPI';


// set Form Initail Data
const initialFromData = {
  firstName: '',
  lastName: '',
  email: "",
  profile_image: null,
  phoneNo: '',
  gender: "male",
  hobbies: [],
  user_type: "Job_Seeker",
  agency: "",
  resume: null
};

const Register: React.FC = () => {
  const [agencyData, setAgency] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4400/api/v1/getAllAgency");
      setAgency(response.data.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const {  isLoading } = useQuery({
    queryKey: ["getAgencies"],
    queryFn: fetchData,
    staleTime:1000*60
  });
  const {mutate} = useResisterContext(navigate);

  if (isLoading) {
    return (<div className="flex justify-center items-center h-screen">Loading...</div>);
  }

  return (
    <div className=" bg-gradient-to-r from-slate-100 to-slate-400 bg-gray-100 min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-xl transform skew-y-3 sm:skew-y-0 sm:-rotate-6 rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-gradient-to-r from-slate-100 to-slate-400 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="text-center text-3xl font-bold text-gray-900 mb-5">Register Form</div>

            <Formik
              initialValues={initialFromData}
              validationSchema={createValidationSchema}
              onSubmit={async (values) => {
                try {
                  const formData: any = new FormData();
                  Object.keys(values).forEach((key) => formData.append(key, (values as any)[key]));

                  // for (let [key, value] of formData) {
                  //   console.log(key, value);
                  // }
                  

                   await mutate(formData);
                } catch (error) {
                  toast.error("Unable to upload data");
                }
              }}
            >
              {({ values, isSubmitting, isValid, setFieldValue, setValues }) => (
                <Form className="space-y-6">
                  <InputFeild fieldName="firstName" label="First Name" placeHolder="Enter your First Name" />
                  {values.user_type === 'Job_Seeker' && <InputFeild fieldName="lastName" label="Last Name" placeHolder="Enter your Last Name" />}

                  <InputFeild fieldName="email" label="Email" placeHolder="Enter your Email" />
                  <InputFeild fieldName="phoneNo" label="Phone Number" placeHolder="Enter Your Phone No" />

                  <div className="flex items-center space-x-4">
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                    <div className="flex items-center">
                      <label htmlFor="male" className="mr-2">Male</label>
                      <Field type="radio" id="male" name="gender" value="male" className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                    </div>
                    <div className="flex items-center">
                      <label htmlFor="female" className="mr-2">Female</label>
                      <Field type="radio" id="female" name="gender" value="female" className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                    </div>
                    <div className="flex items-center">
                      <label htmlFor="other" className="mr-2">Other</label>
                      <Field type="radio" id="other" name="gender" value="other" className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                    </div>
                  </div>

                  <div id="checkbox-group" className="block text-sm font-medium text-gray-700">Hobbies</div>
                  <div role="group" aria-labelledby="checkbox-group" className="space-y-2">
                    {['Singing', 'Traviling', 'Reading', 'Playing'].map((hobby) => (
                      <div key={hobby} className="flex items-center">
                        <Field type="checkbox" id={hobby} name="hobbies" value={hobby} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const checked = e.target.checked;
                            const currentHobbies = values.hobbies;
                            if (checked) {
                              setFieldValue("hobbies", [...currentHobbies, hobby])
                            }
                            else {
                              setFieldValue("hobbies", (currentHobbies.filter((hobbies: string) => hobbies !== hobby)))
                            }

                          }}
                        />
                        <label htmlFor={hobby} className="ml-2 text-sm text-gray-700">{hobby}</label>
                      </div>
                    ))}
                    <ErrorMessage  name="hobbies" component="span" className="ml-2 text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="user_type" className="block text-sm font-medium text-gray-700">User Type</label>
                    <Field as="select" name="user_type" className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option value="Job_Seeker">Job Seeker</option>
                      <option value="Agency">Agency</option>
                    </Field>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <label htmlFor="profile_image" className="block text-sm font-medium text-gray-700">Profile Image</label>
                    <input
                      id="profile_image"
                      name="profile_image"
                      type="file"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const file = event.target.files?.[0] || null;
                        setFieldValue('profile_image', file);
                      }}
                    />
                    <ErrorMessage name="profile_image" component="div" className="text-red-500 text-sm" />
                  </div>

                  {values.user_type === 'Job_Seeker' && (
                    <>
                      <div className="flex flex-col space-y-3">
                        <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume</label>
                        <input
                          id="resume"
                          name="resume"
                          type="file"
                          placeholder='jpeg and png  only'
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const file = event.target.files?.[0] || null;
                            setFieldValue('resume', file);
                          }}
                        />
                        <ErrorMessage name="resume" component="div" className="text-red-500 text-sm" />
                      </div>

                      <div>
                        <label htmlFor="agency" className="block text-sm font-medium text-gray-700">Agency</label>
                        <Field as="select" name="agency" className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <option value="">Select Agency</option>
                          {agencyData?.map((agency: any) => (
                            <option key={agency.firstName} value={agency.firstName}>{agency.firstName}</option>
                          ))}
                        </Field>
                        <ErrorMessage  name="agency" component="div" className="text-red-500 text-sm" />

                      </div>
                    </>
                  )}

                  <div className="flex space-x-4">
                    <button type="submit"  className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors">Signup</button>
                    <button type="button" className="w-full bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors"
                      onClick={() => {setValues(initialFromData)}}>Reset</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
