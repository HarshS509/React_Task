import { User, Cpu, Palette } from 'lucide-react';
function About() {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Co-Founder',
      quote: 'Building tools that empower developers is my passion.',
      icon: <User className="w-32 h-32 mx-auto text-gray-600 dark:text-gray-400" />
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      quote: 'Technology should make life simpler, not complicated.',
      icon: <Cpu className="w-32 h-32 mx-auto text-gray-600 dark:text-gray-400" />
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      quote: 'Great design is invisible but impactful.',
      icon: <Palette className="w-32 h-32 mx-auto text-gray-600 dark:text-gray-400" />
    }
  ];


  const timeline = [
    { year: 2019, event: 'Company founded', icon: '🚀' },
    { year: 2020, event: 'First API release', icon: '🎯' },
    { year: 2021, event: 'Reached 1M users', icon: '👥' },
    { year: 2023, event: 'Global expansion', icon: '🌍' }
  ];

  const values = [
    { title: 'Innovation', description: 'We continuously strive for excellence and embrace new ideas.' },
    { title: 'Reliability', description: 'Our APIs are built to be dependable and consistent.' },
    { title: 'Simplicity', description: 'We believe in making complex things simple.' },
    { title: 'Community', description: 'We grow stronger together with our developer community.' }
  ];

  return (
    <div className="bg-white dark:bg-gray-950">
  

      {/* Mission Section */}
      <section className="pt-20 pb-8 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We aim to provide developers with reliable, easy-to-use APIs for testing and prototyping.
              Our mission is to make development workflows smoother and more efficient.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* Team Section */}
     <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  {/* Icon as placeholder for the team member's photo */}
                  <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mx-auto">
                    {member.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{member.role}</p>
                <p className="italic text-gray-600 dark:text-gray-400">"{member.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Journey Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-center mb-8 group">
                <div className="w-12 h-12 flex items-center justify-center border border-gray-200 dark:border-gray-800 group-hover:border-black dark:group-hover:border-white transition-colors duration-200">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="ml-6">
                  <span className="font-bold text-xl text-black dark:text-white">{item.year}</span>
                  <p className="text-gray-600 dark:text-gray-400">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-black dark:text-white">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-4xl font-bold text-black dark:text-white mb-2">3B+</h3>
              <p className="text-gray-600 dark:text-gray-400">Monthly Requests</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-black dark:text-white mb-2">100K+</h3>
              <p className="text-gray-600 dark:text-gray-400">Active Developers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-black dark:text-white mb-2">150+</h3>
              <p className="text-gray-600 dark:text-gray-400">Countries Reached</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;

