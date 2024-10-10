import { Form, Formik, Field, ErrorMessage } from 'formik'
import React from 'react'
import { PassThrough } from 'stream'
import * as Yup from "yup"

const createValidationSchem = () =>{
    Yup.object().shape({
        firstName: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('First Name is required'),
        
        password: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .required('Password is required') 
    })
}
const Login = () => {
  return (
    <div>
        <div>Login</div>
        <Formik
            initialValues={{emial:"", password:""}}
            validationSchema={createValidationSchem()}
            onSubmit={(values,) =>{

            }}
        >
            {({isSubmitting}) =>{
                return(
                    <Form>
                         <div>
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" placeholder = "Eail" />
                            <ErrorMessage name="email" component="div" />
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" placeholder = "Password"/>
                            <ErrorMessage name="password" component="div" />
                        </div>

                    </Form>
                )
            }}
        </Formik>
    </div>
  )
}

export default Login