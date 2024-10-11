"use client";
import { useState } from "react";
import Image from "next/image";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto px-4 py-12 light:bg-[#F9F9F9] dark:bg-[#1A1A1A]">
      <Image
        src="https://img.freepik.com/free-photo/contact-us-communication-support-service-assistance-concept_53876-128103.jpg?w=1380&t=st=1728573297~exp=1728573897~hmac=c61a25e546ca37464360c2ca0dc080e6ca690a1dd7fe64061b296b981071062a" // Ensure you replace with the correct banner image path
        alt="Contact Us Banner"
        width={1200}
        height={200}
        className="w-full rounded-lg mb-12"
      />
      <h1 className="text-5xl font-bold text-center mb-12 dark:text-white">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-semibold mb-6 dark:text-white">
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-semibold mb-6 dark:text-white">
            Our Location
          </h2>
          <div className="w-full h-64 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3592.7807651440958!2d88.89524817500765!3d25.777803977341748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sbn!2sbd!4v1728572756946!5m2!1sbn!2sbd"
              width="600"
              height={450}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-2xl text-blue-600" />
              <p className="text-lg dark:text-gray-300">
                123 Tech Street, Silicon Valley, CA 94000
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <FaPhone className="text-2xl text-blue-600" />
              <p className="text-lg dark:text-gray-300">+1 (555) 123-4567</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-2xl text-blue-600" />
              <p className="text-lg dark:text-gray-300">
                contact@techandtips.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-semibold mb-6 text-center dark:text-white">
          Visit Our Tech Hub
        </h2>
        <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-8">
          We'd love to meet you in person! Our tech hub is open for community
          events, workshops, and casual meetups. Drop by during our open hours
          to connect with fellow tech enthusiasts and our team.
        </p>
        <div className="text-center">
          <p className="text-xl font-semibold dark:text-white">Open Hours:</p>
          <p className="text-lg dark:text-gray-300">
            Monday - Friday: 9:00 AM - 6:00 PM
          </p>
          <p className="text-lg dark:text-gray-300">
            Saturday: 10:00 AM - 4:00 PM
          </p>
          <p className="text-lg dark:text-gray-300">Sunday: Closed</p>
        </div>
      </div>
    </div>
  );
}
