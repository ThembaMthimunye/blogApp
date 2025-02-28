import React from 'react'
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" }); // Reset form
    }
  };
  return (
    <div className='w-screen h-full flex justify-center items-center py-[15rem] text-gray-500'>
      <div className='flex '>
        <div className='space-y-4'>
          <h1 className='text-5xl font-semibold'>Contact Us</h1>
          <p className='max-w-[20rem]'>Email ,call or complete the form to learn how dev BLOG team can assit your problems</p>
          <p>infor@devblog.com</p>
          <p>078-649-0983</p>
          <p className='underline font-semibold '>Customer Support</p>
          <div className='flex space-x-10 pt-20'>
            <div className='space-y-2'>
              <p className='font-bold'>Customer Support</p>
              <p className='max-w-[15rem]'>Our support team is available around the clock to address any concerns or quiries you may have </p>
            </div>
            <div className='space-y-2'>
              <p className='font-bold'>Feedback and Suggestions </p>
              <p className='max-w-[15rem]'>We value your feedback and are continously working tom improve dev BLOG.Your input is crucial in shaping the future of dev BLOG</p>
            </div>
            <div className='space-y-2' >
              <p className='font-bold'>Media Inquiries</p>
              <p className='max-w-[15rem]'>For media-related questions or press inquiriews .please contact us at media@devblog.com </p>
            </div>
          </div>
        </div>
        <div>
        <form  className="space-y-6 w-[30rem] bg-white px-6 py-6 rounded-md  bg-violet-100">
          <div>
            {/* <label className="block text-gray-400">Your Name</label> */}
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 rounded-lg  text-gray-200 border border-gray-600 focus:ring focus:ring-gray-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

        
          <div>
            {/* <label className="block text-gray-400">Your Email</label> */}
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg  text-gray-200 border border-gray-600 focus:ring focus:ring-gray-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

        
          <div>
            {/* <label className="block text-gray-400">Your Message</label> */}
            <textarea
              placeholder="Write your message here..."
              className="w-full p-3 rounded-lg  text-gray-200 border border-gray-600 focus:ring focus:ring-gray-500 h-32"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>

         
          <button
            type="submit"
            className="w-full p-3 bg-gray-700 hover:bg-gray-500 text-white font-bold rounded-lg transition"
          >
            Send Message
          </button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
