"use client";
import Image from "next/image";
import aboutusimg from "@/src/assets/aboutus.jpg";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

export default function About() {
  return (
    <div className="container mx-auto px-8 light:bg-[#F9F9F9] dark:bg-[#1A1A1A] py-8">
      <h1 className="text-5xl font-bold text-center mb-12 dark:text-white">
        About Us
      </h1>

      <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
        <div>
          <Image
            src={aboutusimg}
            alt="Tech and Tips Community"
            width={500}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-6 dark:text-white">
            Our Mission
          </h2>
          <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
            At Tech and Tips Community, our mission is to empower individuals
            with the latest technology insights and practical tips. We foster a
            vibrant, inclusive space where tech enthusiasts of all levels can
            learn, share, and grow together.
          </p>
          <h2 className="text-3xl font-semibold mb-6 dark:text-white">
            Our Vision
          </h2>
          <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
            We envision a world where technology is accessible to everyone, and
            continuous learning and collaboration fuel innovation. We aim to be
            the go-to platform for expanding tech knowledge and skills.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
        <div className="mt-16">
          <h2 className="text-3xl font-semibold mb-8 dark:text-white">
            What We Offer
          </h2>
          <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 dark:text-gray-300">
            <li>Expert-led tutorials and workshops for all skill levels</li>
            <li>Interactive community forums for knowledge sharing</li>
            <li>Up-to-date tech news and industry trends</li>
            <li>Networking with like-minded tech enthusiasts</li>
            <li>Exclusive resources for both beginners and experts</li>
            <li>Access to premium content and in-depth courses</li>
          </ul>
        </div>
        <div>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQdnMu6JsE5xfA_QdoL9mvIhSAEzBewga7Pw&s"
            alt="Tech and Tips Community"
            width={500}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-semibold mb-12 text-center dark:text-white">
          Meet the Team
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              name: "Abdul Wahid",
              image:
                "https://car-rental-bd-frontend-c8rk.vercel.app/assets/wahid-6LtnIKMG.png",
              designation: "Founder & CEO",
              linkedin: "https://linkedin.com/in/johndoe",
              twitter: "https://twitter.com/johndoe",
              github: "https://github.com/johndoe",
            },
            {
              name: "Jane Smith",
              image: "https://randomuser.me/api/portraits/men/5.jpg",
              designation: "Chief Technology Officer",
              linkedin: "https://linkedin.com/in/janesmith",
              twitter: "https://twitter.com/janesmith",
              github: "https://github.com/janesmith",
            },
            {
              name: "Mike Johnson",
              image: "https://randomuser.me/api/portraits/men/10.jpg",
              designation: "Lead Developer",
              linkedin: "https://linkedin.com/in/mikejohnson",
              twitter: "https://twitter.com/mikejohnson",
              github: "https://github.com/mikejohnson",
            },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={150}
                height={150}
                className="rounded-full mx-auto mb-6"
              />
              <h3 className="text-2xl font-semibold mb-3 dark:text-white">
                {member.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {member.designation}
              </p>
              <div className="flex justify-center space-x-6">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="text-2xl text-blue-600 dark:text-blue-400" />
                </a>
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="text-2xl text-blue-400" />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="text-2xl text-gray-800 dark:text-gray-200" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-semibold mb-8 dark:text-white">
          Our Story
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Tech and Tips Community started as a small group of tech enthusiasts
          sharing tips on online forums. Today, we've grown into a global
          platform with thousands of members, from students to industry
          professionals. Our journey has always been driven by a passion for
          technology, innovation, and continuous learning.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Our community is at the heart of everything we do. Whether it's
          contributing to discussions, attending workshops, or networking with
          peers, every member helps us move forward.
        </p>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-semibold mb-8 dark:text-white">
          Join Our Journey
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Are you ready to explore the world of technology with us? Whether
          you're a beginner or an expert, there's a place for you at Tech and
          Tips Community. Sign up today and start learning, sharing, and
          growing!
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
          Sign Up Now
        </button>
      </div>
    </div>
  );
}
