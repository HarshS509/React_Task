import { useState } from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-200">
      <header className="pt-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Contact Us</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We'd love to hear from you! Reach out with any questions or feedback.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
                >
                  <option value="">Select a subject</option>
                  <option value="Support">Support</option>
                  <option value="Feedback">Feedback</option>
                  <option value="General Question">General Question</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={submitStatus === 'submitting'}
                  className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
                >
                  {submitStatus === 'submitting' ? 'Submitting...' : 'Submit'}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Clear Form
                </button>
              </div>
            </form>
            {submitStatus === 'success' && (
              <p className="mt-4 text-green-600 dark:text-green-400">Thank you for reaching out! We'll get back to you as soon as possible.</p>
            )}
            {submitStatus === 'error' && (
              <p className="mt-4 text-red-600 dark:text-red-400">There was an issue submitting your form. Please try again.</p>
            )}
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <MapPin className="text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">123 App Street, San Francisco, CA 94107</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">support@jsonplaceholder-app.com</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mt-8 mb-4 text-black dark:text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-200">
                <Facebook />
              </a>
              <a href="#" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-200">
                <Twitter />
              </a>
              <a href="#" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-200">
                <Instagram />
              </a>
              <a href="#" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-200">
                <Linkedin />
              </a>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Our Location</h3>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5730927341396!2d-122.41941708468212!3d37.77492797975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1620164138893!5m2!1sen!2sus"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Contact;

