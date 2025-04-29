import React from "react";

const Footer = () => (
  <footer className="bg-black text-gray-500">
    <div className="max-w-6xl mx-auto text-center p-4">
      © {new Date().getFullYear()} Booking System. All rights reserved.
    </div>
  </footer>
);

export default Footer;
