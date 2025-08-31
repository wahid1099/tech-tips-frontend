"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardBody, Button, Avatar, Chip } from "@nextui-org/react";
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaRocket,
  FaUsers,
  FaLightbulb,
  FaGlobe,
} from "react-icons/fa";
import { HiSparkles, HiAcademicCap, HiTrendingUp } from "react-icons/hi";
import aboutusimg from "@/src/assets/aboutus.jpg";

const ModernAbout = () => {
  const teamMembers = [
    {
      name: "Abdul Wahid",
      image:
        "https://car-rental-bd-frontend-c8rk.vercel.app/assets/wahid-6LtnIKMG.png",
      designation: "Founder & CEO",
      bio: "Passionate about democratizing tech education and building inclusive communities.",
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
      github: "https://github.com/johndoe",
    },
    {
      name: "Jane Smith",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      designation: "Chief Technology Officer",
      bio: "Leading innovation in educational technology and community platforms.",
      linkedin: "https://linkedin.com/in/janesmith",
      twitter: "https://twitter.com/janesmith",
      github: "https://github.com/janesmith",
    },
    {
      name: "Mike Johnson",
      image: "https://randomuser.me/api/portraits/men/10.jpg",
      designation: "Lead Developer",
      bio: "Building scalable solutions that empower millions of learners worldwide.",
      linkedin: "https://linkedin.com/in/mikejohnson",
      twitter: "https://twitter.com/mikejohnson",
      github: "https://github.com/mikejohnson",
    },
  ];

  const features = [
    {
      icon: <HiAcademicCap className="text-3xl text-blue-500" />,
      title: "Expert-Led Learning",
      description:
        "Learn from industry professionals with real-world experience",
    },
    {
      icon: <FaUsers className="text-3xl text-green-500" />,
      title: "Vibrant Community",
      description: "Connect with thousands of like-minded tech enthusiasts",
    },
    {
      icon: <HiTrendingUp className="text-3xl text-purple-500" />,
      title: "Latest Trends",
      description:
        "Stay updated with cutting-edge technology and industry insights",
    },
    {
      icon: <FaLightbulb className="text-3xl text-yellow-500" />,
      title: "Practical Tips",
      description: "Get actionable advice you can implement immediately",
    },
    {
      icon: <FaGlobe className="text-3xl text-indigo-500" />,
      title: "Global Network",
      description: "Join a worldwide community of tech professionals",
    },
    {
      icon: <HiSparkles className="text-3xl text-pink-500" />,
      title: "Premium Content",
      description: "Access exclusive resources and in-depth courses",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Members" },
    { number: "1000+", label: "Expert Articles" },
    { number: "500+", label: "Video Tutorials" },
    { number: "100+", label: "Industry Partners" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              About Us
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Empowering the next generation of tech innovators through
              knowledge, community, and cutting-edge insights.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-0 shadow-lg"
              >
                <CardBody className="text-center p-6">
                  <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </CardBody>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <Image
                  src={aboutusimg}
                  alt="Tech and Tips Community"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-2xl" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <FaRocket className="text-3xl text-blue-500" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Our Mission
                  </h2>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  At Tech and Tips Community, our mission is to empower
                  individuals with the latest technology insights and practical
                  tips. We foster a vibrant, inclusive space where tech
                  enthusiasts of all levels can learn, share, and grow together.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <FaLightbulb className="text-3xl text-yellow-500" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Our Vision
                  </h2>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  We envision a world where technology is accessible to
                  everyone, and continuous learning and collaboration fuel
                  innovation. We aim to be the go-to platform for expanding tech
                  knowledge and skills.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover the comprehensive resources and community support that
              make us unique
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardBody className="p-6 text-center">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The passionate individuals behind our mission to democratize tech
              education
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardBody className="p-8 text-center">
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 mx-auto mb-4 ring-4 ring-blue-500/20"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {member.name}
                    </h3>
                    <Chip color="primary" variant="flat" className="mb-4">
                      {member.designation}
                    </Chip>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                      {member.bio}
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button
                        isIconOnly
                        variant="flat"
                        color="primary"
                        as="a"
                        href={member.linkedin}
                        target="_blank"
                      >
                        <FaLinkedin />
                      </Button>
                      <Button
                        isIconOnly
                        variant="flat"
                        color="primary"
                        as="a"
                        href={member.twitter}
                        target="_blank"
                      >
                        <FaTwitter />
                      </Button>
                      <Button
                        isIconOnly
                        variant="flat"
                        color="default"
                        as="a"
                        href={member.github}
                        target="_blank"
                      >
                        <FaGithub />
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Join Our Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Whether you're a beginner or an expert, there's a place for you in
              our community. Start learning, sharing, and growing with us today!
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 font-semibold hover:bg-white/90 transition-all duration-200"
            >
              Join Our Community
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ModernAbout;
