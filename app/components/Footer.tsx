// components/Footer.tsx
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-custom-primary1 py-8 ">
      <div className="container mx-auto px-6 flex flex-col items-center space-y-6">
        <div className="logo-container">
        <Link href="/" className="text-4xl font-bold text-custom-primary-text hover:text-custom-accent transition-colors">
            bunblebee
          </Link>
        </div>
        <nav className="flex flex-wrap justify-center space-x-4">
        <Link href="/" className="text-3xl text-custom-primary-text hover:text-custom-accent transition-colors">
              <button className="focus:outline-none">Home</button>
            </Link>
            <Link href="/products" className="text-3xl text-custom-primary-text hover:text-custom-accent transition-colors">
              <button className="focus:outline-none">Products</button>
            </Link>
            <Link href="/#about" className="text-3xl text-custom-primary-text hover:text-custom-accent transition-colors">
              <button className="focus:outline-none">About</button>
            </Link>
            <Link href="/#contact" className="text-3xl text-custom-primary-text hover:text-custom-accent transition-colors">
              <button className="focus:outline-none">Contact</button>
            </Link>
        </nav>
        <div className="text-center text-custom-primary-text">
          <span>© 2024 bunblebee, All Rights Reserved.</span>
        </div>
        <div className="flex space-x-4">
          <a href="https://twitter.com/bunblebee" className="text-custom-primary-text hover:text-custom-accent transition-colors">
            <svg viewBox="0 0 50 50" className="w-6 h-6 fill-current">
              <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
            </svg>
          </a>
          <a href="https://www.instagram.com/bunblebee/" className="text-custom-primary-text hover:text-custom-accent transition-colors">
            <svg viewBox="0 0 877.7142857142857 1024" className="w-6 h-6 fill-current">
              <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
            </svg>
          </a>
          <a href="https://www.facebook.com/bunblebee/" className="text-custom-primary-text hover:text-custom-accent transition-colors">
            <svg viewBox="0 0 602.2582857142856 1024" className="w-6 h-6 fill-current">
              <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
