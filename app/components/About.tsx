import Image from 'next/image';
import Link from 'next/link';

// AboutSection Component
const AboutSection = () => {
  return (
    <div className="bg-custom-background2 py-16" id="about">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-apple text-center mb-8 text-custom-primary-text">About Us</h1>
        <p className="text-lg text-left text-custom-secondary-text max-w-2xl mx-auto">
          Bunblebee is your go-to destination for freshly baked buns and pastries, all made with the finest ingredients.
          Inspired by the sweetness of honey and the warmth of freshly baked goods, our treats are designed to bring a smile to your face.
        </p>
        {/* Team Section */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-custom-primary-text">Meet Our Sweet Baker</h2>
            <span className="text-lg text-custom-secondary-text">This is me</span>
          </div>
          <div className="flex justify-center">
            <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="group relative">
                <img
                  className="w-full object-cover"
                  src="/images/team/head-baker1.jpg"
                />
                <div
                  className="absolute bottom-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-white bg-opacity-30 backdrop-blur-lg rounded drop-shadow-lg opacity-0 group-hover:h-full group-hover:opacity-100 duration-500 group-hover:translate-y-0 translate-y-full"
                >
                  <div className="p-6">
                    <h6 className="text-xl font-bold text-custom-primary-text">John Dough</h6>
                    <span className="text-custom-secondary-text">Head Baker</span>
                    <div className="flex space-x-4 mt-4">
                      <Link href="https://www.facebook.com/#">
                        <i className="bi bi-facebook text-xl text-gray-700 hover:text-yellow-500"></i>
                      </Link>
                      <Link href="https://www.twitter.com/#">
                        <i className="bi bi-twitter text-xl text-gray-700 hover:text-yellow-500"></i>
                      </Link>
                      <Link href="https://www.instagram.com/#">
                        <i className="bi bi-instagram text-xl text-gray-700 hover:text-yellow-500"></i>
                      </Link>
                      <Link href="https://www.youtube.com/#">
                        <i className="bi bi-youtube text-xl text-gray-700 hover:text-yellow-500"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutSection;
