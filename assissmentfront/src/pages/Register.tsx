import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import InputFeild from '../components/common/InputFeild';
import { useQuery } from '@tanstack/react-query';
import { createValidationSchema } from '../validators';
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
      const response = await axios.get( process.env.REACT_APP_BASE_URL + "/getAllAgency");
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
    <div className="bg-gradient-to-r from-slate-100 to-slate-400 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl w-full space-y-8">
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg rounded-lg transform rotate-2"></div>
      <div className="relative bg-white p-10 rounded-lg shadow-md z-10">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">Registration Form</h2>

        <Formik
          initialValues={initialFromData}
          validationSchema={createValidationSchema}
          onSubmit={async (values) => {
            try {
              const formData : any = new FormData();
              Object.keys(values).forEach((key) => formData.append(key, (values as any)[key]));

              await mutate(formData);
            } catch (error:any) {
              toast.error(error.message);
            }
          }}
        >
          {({ values, setFieldValue, setValues,isValid }) => (
            <Form className="space-y-6">
              {/* Flex container for horizontal layout */}
              <div className="grid grid-cols-2 gap-x-8">
                {/* Column 1 */}
                <div className="space-y-4">
                  <InputFeild fieldName="firstName" label="First Name" placeHolder="Enter your First Name" />
                  {values.user_type === 'Job_Seeker' && (
                    <InputFeild fieldName="lastName" label="Last Name" placeHolder="Enter your Last Name" />
                  )}

                  <InputFeild fieldName="email" label="Email" placeHolder="Enter your Email" />
                  <InputFeild fieldName="phoneNo" label="Phone Number" placeHolder="Enter your Phone No" />

                  {/* Gender Radio Group */}
                  <div className="flex items-center space-x-4">
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                    <div className="flex items-center space-x-4">
                      {['male', 'female', 'other'].map((gender) => (
                        <label key={gender} className="flex items-center">
                          <Field type="radio" id={gender} name="gender" value={gender} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                          <span className="ml-2 capitalize">{gender}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  
                </div>

                {/* Column 2 */}
                <div className="space-y-4 text-start">

                  {/* Hobbies Checkboxes */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 text-start mt-2">Hobbies</label>
                    <div role="group" className="flex flex-wrap gap-2">
                      {['Singing', 'Travelling', 'Reading', 'Playing'].map((hobby) => (
                        <div key={hobby} className="flex items-center">
                          <Field type="checkbox" id={hobby} name="hobbies" value={hobby} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              const checked = e.target.checked;
                              const currentHobbies = values.hobbies;
                              setFieldValue("hobbies", checked ? [...currentHobbies, hobby] : currentHobbies.filter(h => h !== hobby));
                            }}
                          />
                          <label htmlFor={hobby} className="ml-2 text-sm">{hobby}</label>
                        </div>
                      ))}
                    </div>
                    <ErrorMessage name="hobbies" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  {/* User Type */}
                  <div>
                    <label htmlFor="user_type" className="block text-sm font-medium text-gray-700">User Type</label>
                    <Field as="select" name="user_type" className="mt-1 block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option value="Job_Seeker">Job Seeker</option>
                      <option value="Agency">Agency</option>
                    </Field>
                  </div>

                  {/* Profile Image */}
                  <div>
                    <label htmlFor="profile_image" className="block text-sm font-medium text-gray-700">Profile Image</label>
                    <input
                      id="profile_image"
                      name="profile_image"
                      type="file"
                      className="mt-1 block w-full text-sm text-gray-500 file:bg-blue-50 file:text-blue-700 file:font-semibold file:border-0 file:py-2 file:px-4 hover:file:bg-blue-100"
                      onChange={(e) => setFieldValue('profile_image', e.target.files?.[0] || null)}
                    />
                    <ErrorMessage name="profile_image" component="div" className="text-red-500 text-sm" />
                  </div>

                  {values.user_type === 'Job_Seeker' && (
                    <>
                      <div>
                        <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume</label>
                        <input
                          id="resume"
                          name="resume"
                          type="file"
                          className="mt-1 block w-full text-sm text-gray-500 file:bg-blue-50 file:text-blue-700 file:font-semibold file:border-0 file:py-2 file:px-4 hover:file:bg-blue-100"
                          onChange={(e) => setFieldValue('resume', e.target.files?.[0] || null)}
                        />
                        <ErrorMessage name="resume" component="div" className="text-red-500 text-sm" />
                      </div>

                      <div>
                        <label htmlFor="agency" className="block text-sm font-medium text-gray-700">Agency</label>
                        <Field as="select" name="agency" className="mt-1 block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <option value="">Select Agency</option>
                          {agencyData?.map((agency:any) => (
                            <option key={agency.firstName} value={agency.firstName}>{agency.firstName}</option>
                          ))}
                        </Field>
                        <ErrorMessage name="agency" component="div" className="text-red-500 text-sm" />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Submit and Reset Buttons */}
              <div className="flex space-x-4 justify-center">
                <button type="submit" className="w-1/3 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors">Signup</button>
                <button type="button" className="w-1/3 bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors" onClick={() => { setValues(initialFromData); toast.success("Form Reset")}}>Reset</button>
              </div>
              <div>
                <button type="button" className=" bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors w-[40%]" onClick={() => navigate("/login")}>Login</button>
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
