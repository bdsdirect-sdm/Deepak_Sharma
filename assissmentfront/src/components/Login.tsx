import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import React from 'react'
import * as Yup from "yup"
import  { useNavigate } from 'react-router-dom'

const createValidationSchem = () =>{
    Yup.object().shape({
        email: Yup.string().email()
          .required('Email Name is required'),
        
        password: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .required('Password is required') 
    })
}

const Login = () => {
    const navigate = useNavigate()
    const  {mutate,isPending,isError,error} = useMutation({
        mutationKey:["keykey"],
        mutationFn: async (val : any) => {
            return await axios.post(`http://localhost:4400/api/v1/login`, val)
        },
        onSuccess: (data) => {
            console.log(data.data)
            localStorage.setItem("token",data.data.token);
            localStorage.setItem("user_type",data.data.user.user_type);
            navigate("/dashboard",)
        }
    })
  return (
    <div>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={createValidationSchem()}
                    onSubmit={async (values, { setSubmitting }) => {
                        console.log(values);
                        try {
                            await mutate(values);
                        } catch (error) {
                            console.error("Login failed:", error);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <Field type="email" name="email" placeholder="Email" className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500" />
                                <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <Field type="password" name="password" placeholder="Enter the password" className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500" />
                                <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                            </div>

                            {isPending && <p className="text-blue-600">Loading...</p>}
                            {isError && <p className="text-red-600">Error: {error.message}</p>}

                            <button 
                                type='submit' 
                                disabled={isSubmitting} 
                                className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    </div>
  )
}
        

export default Login;