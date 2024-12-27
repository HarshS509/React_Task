import { Link } from 'react-router-dom';
import { ArrowRight, User, FileText, Image, MessageCircle } from 'lucide-react';
import Accordion from '../components/common/Accordion';

function Home() {
  const features = [
    {
      title: 'Users API',
      description: 'Access user data with detailed profiles and contact information',
      icon: <User className="w-12 h-12 mb-4 text-gray-600 dark:text-gray-400" />,
      link: '/users'
    },
    {
      title: 'Posts API',
      description: 'Explore user posts and associated comments',
      icon: <FileText className="w-12 h-12 mb-4 text-gray-600 dark:text-gray-400" />,
      link: '/posts'
    },
    {
      title: 'Albums API',
      description: 'Browse photo albums with thumbnails and full-size images',
      icon: <Image className="w-12 h-12 mb-4 text-gray-600 dark:text-gray-400" />,
      link: '/albums'
    },
    {
      title: 'Comments API',
      description: 'Interact with post comments and user feedback',
      icon: <MessageCircle className="w-12 h-12 mb-4 text-gray-600 dark:text-gray-400" />,
      link: '/posts'
    }
  ];

  const faqItems = [
    {
      question: 'What is JSONPlaceholder?',
      answer: `JSONPlaceholder is a free online REST API that you can use whenever you need some fake data. It's great for tutorials, testing new libraries, sharing code examples, and more.`
    },
    {
      question: 'Is the data real?',
      answer: `No, the data provided by JSONPlaceholder is fake and meant for testing and prototyping. It should not be used in production environments.`
    },
    {
      question: 'Can I use JSONPlaceholder in my project?',
      answer: `JSONPlaceholder is free to use in your projects. However, keep in mind that it's designed for testing and prototyping, not for production use.`
    },
    {
      question: 'Are there any rate limits?',
      answer: `JSONPlaceholder doesn't have strict rate limits, but it's recommended to cache the results when making multiple requests to the same resources.`
    },
    {
      question: 'Can I contribute to JSONPlaceholder?',
      answer: 'Yes, JSONPlaceholder is an open-source project. You can contribute by submitting pull requests or opening issues on the GitHub repository.'
    }
  ];
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="pt-20 px-4 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
          JSONPlaceholder Demo App
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Explore our interactive demo showcasing the power of JSONPlaceholder API. 
          Build, test, and prototype with fake data that feels real.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/users"
            className="inline-flex items-center justify-center px-6 py-3 border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
          >
            View Users
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
          >
            Learn More
          </Link>
        </div>
        <div className="mt-16">
         
          <div className="mt-16">
  <img
    src="hero illustration.jpg"
    alt="Hero illustration"
    className="max-w-full h-auto mx-auto" 
  />
</div>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Available APIs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
              <Link 
                key={index}
                to={feature.link}
                className="group p-6 bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-200"
              >
                {feature.icon} {/* Render the icon here */}
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-12 h-12 flex items-center justify-center border border-black dark:border-white rounded-full mx-auto mb-4">
                <span className="text-xl font-semibold dark:text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Choose an API</h3>
              <p className="text-gray-600 dark:text-gray-400">Select from our various API endpoints for your testing needs</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 flex items-center justify-center border border-black dark:border-white rounded-full mx-auto mb-4">
                <span className="text-xl font-semibold dark:text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Make Requests</h3>
              <p className="text-gray-600 dark:text-gray-400">Send requests to our endpoints and receive structured JSON responses</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 flex items-center justify-center border border-black dark:border-white rounded-full mx-auto mb-4">
                <span className="text-xl font-semibold dark:text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Build Your App</h3>
              <p className="text-gray-600 dark:text-gray-400">Use the responses to build and test your application features</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Frequently Asked Questions</h2>
          <Accordion items={faqItems} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Explore our API endpoints and start building your next project with JSONPlaceholder
          </p>
          <Link
            to="/posts"
            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
          >
            View Posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;

