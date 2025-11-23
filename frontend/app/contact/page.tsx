'use client';
import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after success
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white pt-20">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="bg-green-900/20 border border-green-800 rounded-2xl p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
            <p className="text-gray-300">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <p className="text-gray-300 mb-6">
              Interested in our UAV systems? Contact our team to discuss your requirements and how VyomGarud can support your missions.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-300">contact@vyomgarud.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <p className="text-gray-300">
                    Defense Innovation District<br />
                    Bangalore, Karnataka 560001<br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder=" "
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="peer w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none transition"
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 top-3 -translate-y-1/2 bg-gray-900 px-1 text-gray-400 text-sm pointer-events-none transition-all
                             peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                             peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange-400"
                >
                  Your Name
                </label>
              </div>
              
              <div className="relative">
                <input 
                  id="email"
                  name="email"
                  type="email" 
                  placeholder=" "
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="peer w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-3 -translate-y-1/2 bg-gray-900 px-1 text-gray-400 text-sm pointer-events-none transition-all
                             peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                             peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange-400"
                >
                  Your Email
                </label>
              </div>
              
              <div className="relative">
                <input 
                  id="subject"
                  name="subject"
                  type="text" 
                  placeholder=" "
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="peer w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none"
                />
                <label
                  htmlFor="subject"
                  className="absolute left-4 top-3 -translate-y-1/2 bg-gray-900 px-1 text-gray-400 text-sm pointer-events-none transition-all
                             peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                             peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange-400"
                >
                  Subject
                </label>
              </div>
              
              <div className="relative">
                <textarea 
                  id="message"
                  name="message"
                  placeholder=" "
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="peer w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none"
                ></textarea>
                <label
                  htmlFor="message"
                  className="absolute left-4 top-3 -translate-y-1/2 bg-gray-900 px-1 text-gray-400 text-sm pointer-events-none transition-all
                             peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                             peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange-400"
                >
                  Your Message
                </label>
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}