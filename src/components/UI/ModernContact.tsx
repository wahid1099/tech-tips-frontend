"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, Button, Input, Textarea } from "@nextui-org/react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaRocket,
  FaPaperPlane,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { toast } from "sonner";

const ModernContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(formData);
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-2xl text-blue-500" />,
      title: "Visit Us",
      details: ["123 Tech Street", "Silicon Valley, CA 94000"],
    },
    {
      icon: <FaPhone className="text-2xl text-green-500" />,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    },
    {
      icon: <FaEnvelope className="text-2xl text-purple-500" />,
      title: "Email Us",
      details: ["contact@techandtips.com", "support@techandtips.com"],
    },
    {
      icon: <FaClock className="text-2xl text-orange-500" />,
      title: "Office Hours",
      details: ["Mon-Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <HiSparkles className="text-4xl text-yellow-500" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Contact Us
              </h1>
              <HiSparkles className="text-4xl text-yellow-500" />
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Have questions, suggestions, or just want to say hello? We'd love
              to hear from you!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-0 shadow-2xl">
                <CardBody className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <FaPaperPlane className="text-2xl text-blue-500" />
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      Send us a Message
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Full Name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        variant="bordered"
                        size="lg"
                        classNames={{
                          input: "text-sm",
                          inputWrapper:
                            "border-gray-200 dark:border-gray-600 hover:border-blue-400 focus-within:border-blue-500",
                        }}
                        required
                      />
                      <Input
                        label="Email Address"
                        placeholder="Enter your email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        variant="bordered"
                        size="lg"
                        classNames={{
                          input: "text-sm",
                          inputWrapper:
                            "border-gray-200 dark:border-gray-600 hover:border-blue-400 focus-within:border-blue-500",
                        }}
                        required
                      />
                    </div>

                    <Input
                      label="Subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      variant="bordered"
                      size="lg"
                      classNames={{
                        input: "text-sm",
                        inputWrapper:
                          "border-gray-200 dark:border-gray-600 hover:border-blue-400 focus-within:border-blue-500",
                      }}
                      required
                    />

                    <Textarea
                      label="Message"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      variant="bordered"
                      minRows={6}
                      classNames={{
                        input: "text-sm",
                        inputWrapper:
                          "border-gray-200 dark:border-gray-600 hover:border-blue-400 focus-within:border-blue-500",
                      }}
                      required
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Get in Touch
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  We're here to help and answer any questions you might have. We
                  look forward to hearing from you!
                </p>
              </div>

              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardBody className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                            {info.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {info.title}
                            </h3>
                            {info.details.map((detail, idx) => (
                              <p
                                key={idx}
                                className="text-gray-600 dark:text-gray-400"
                              >
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-0 shadow-lg overflow-hidden">
                  <CardBody className="p-0">
                    <div className="relative h-64">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3592.7807651440958!2d88.89524817500765!3d25.777803977341748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sbn!2sbd!4v1728572756946!5m2!1sbn!2sbd"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        className="rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <FaRocket className="text-4xl" />
              <h2 className="text-4xl font-bold">Visit Our Tech Hub</h2>
            </div>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              We'd love to meet you in person! Our tech hub is open for
              community events, workshops, and casual meetups. Drop by during
              our open hours to connect with fellow tech enthusiasts and our
              team.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="text-xl font-semibold mb-2">Monday - Friday</h3>
                <p className="text-white/90">9:00 AM - 6:00 PM</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Saturday</h3>
                <p className="text-white/90">10:00 AM - 4:00 PM</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Sunday</h3>
                <p className="text-white/90">Closed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ModernContact;
