import React, { useContext } from "react";
import { Navbar } from "./layouts/Navbar";
import { Form, Field, Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from '../App';
import { ErrFlash } from '../utils/index';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too short! Name cannot be fewer than two characters")
    .max(50, "Name cannot be longer than 50characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(2, "Too short! Name cannot be fewer than two characters")
    .max(50, "Name cannot be longer than 50characters")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Not a valid mail")
    .required("Email is required field"),
  password: Yup.string()
    .min(8, "Password is too short, minimum of 8 characters!")
    .required("Password cannot be empty")
    .matches(
      /^[ A-Za-z0-9_@./#&+-]*$/,
      "Password can only contain latin letters and special characters"
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  )
});

export const Signup = () => {
  let history = useHistory();
  const { state, dispatch } = useContext(AuthContext);
  const handleSubmit = async (values, { resetForm }) => {
    try {
      let response = await axios.post(
        "http://localhost:5003/api/v1/newauth",
        values,
        { headers: { Accept: "application/json" } }
      );
      console.log(response);
      resetForm();
      history.push("/auth");
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        dispatch({ type: "ERR", payload: `There was an issue signing you up. ${err.response.data}` })
        setTimeout(() => dispatch({ type: "default" }), 5000);
      }
    }
  };
  return (
    <div className="bg-gray-100 h-screen">
      <Navbar />
      {state.err ?
        (
          <ErrFlash err={state.err} />
        )
        : null}
      <div>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
          }}
          validationSchema={SignupSchema}
        >
          {({ errors, touched }) => (
            <Form className="w-3/5 bg-white mx-auto max-w-md p-8 my-12 rounded-lg shadow-lg">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className=" md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="Jacob"
                    className="h-12 w-full block border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                  {errors.firstName && touched.firstName ? (
                    <div className="text-red-400 text-sm">
                      {errors.firstName}
                    </div>
                  ) : null}
                </div>
                <div className=" md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Jude"
                    className="h-12 w-full block border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                  {errors.lastName && touched.lastName ? (
                    <div className="text-red-400 text-sm">
                      {errors.lastName}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 ">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <Field
                    type="text"
                    name="email"
                    placeholder=" jacobjude@gtbank.com"
                    className="h-12 w-full border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                  {errors.email && touched.email ? (
                    <div className="text-red-400 text-sm">{errors.email}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="e.g. **********"
                    autoComplete="new password"
                    className="h-12 w-full border border-gray-200  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                  {errors.password && touched.password ? (
                    <div className="text-red-500 text-sm">
                      {errors.password}
                    </div>
                  ) : null}
                </div>
                <div className="mb-4 md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="confirmPassword"
                  >
                    Confirm password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="e.g. **********"
                    autoComplete="new password"
                    className="h-12 w-full border border-gray-200  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </div>
                  ) : null}
                </div>
              </div>
              <button
                type="submit"
                className="w-full h-10 px-3 my-4 text-white font-semibold focus:outline-none hover:bg-orange-300 rounded-full bg-orange-500"
              >
                <i className="fas mr-2 fa-sign-in-alt text-white"></i>Signup
              </button>
              <div className="px-3 text-sm">
                Already have an account?{" "}
                <Link className="ml-2 text-purple-500" to="/">
                  Login instead!
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
