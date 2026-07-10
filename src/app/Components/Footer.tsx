import Link from "next/link";
import { Leaf, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0E3B2E] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">

              <div className="bg-green-600 p-3 rounded-full">
                <Leaf className="w-6 h-6" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  Eco World
                </h2>

                <p className="text-green-300">
                  Handy Craft
                </p>
              </div>

            </div>

            <p className="mt-6 text-gray-300 leading-7">
              Discover beautifully handcrafted eco-friendly
              products made with love by talented artisans.
              Sustainable, natural and unique for every home.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-xl font-semibold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-300">

              <li>
                <Link href="/" className="hover:text-green-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/shop" className="hover:text-green-400 transition">
                  Shop
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-green-400 transition">
                  About
                </Link>
              </li>

              <li>
                <Link href="/blog" className="hover:text-green-400 transition">
                  Blog
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-green-400 transition">
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Categories */}
          <div>

            <h3 className="text-xl font-semibold mb-6">
              Categories
            </h3>

            <ul className="space-y-3 text-gray-300">

              <li>Bamboo Craft</li>

              <li>Jute Products</li>

              <li>Clay Pottery</li>

              <li>Wooden Decor</li>

              <li>Handmade Gifts</li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-xl font-semibold mb-6">
              Contact Us
            </h3>

            <div className="space-y-5">

              <div className="flex gap-3">

                <MapPin className="text-green-400 mt-1" size={20} />

                <p className="text-gray-300">
                  Mirpur, Dhaka, Bangladesh
                </p>

              </div>

              <div className="flex gap-3">

                <Phone className="text-green-400" size={20} />

                <p className="text-gray-300">
                  +880 1712-345678
                </p>

              </div>

              <div className="flex gap-3">

                <Mail className="text-green-400" size={20} />

                <p className="text-gray-300">
                  support@ecoworld.com
                </p>

              </div>

            </div>

            <div className="flex gap-3 mt-8">

              <Link
                href="/contact"
                className="bg-green-600 hover:bg-green-700 transition px-5 py-2 rounded-full"
              >
                Contact
              </Link>

              <Link
                href="/about"
                className="border border-green-500 hover:bg-green-700 transition px-5 py-2 rounded-full"
              >
                Learn More
              </Link>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-green-800 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-400 text-center">
            © 2026 Eco World Handy Craft. All Rights Reserved.
          </p>

          <div className="flex gap-6">

            <Link
              href="/privacy"
              className="text-gray-400 hover:text-green-400 transition"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-gray-400 hover:text-green-400 transition"
            >
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}