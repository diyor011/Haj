import React, { useState, useEffect } from 'react';
import Logo from "../assets/logo.png";
import { FaSearch, FaGlobe, FaUniversalAccess, FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { FaCamera, FaUpload } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

const Header = ({ setActiveTab }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSearch = () => {
    alert("Qidiruv ochildi!");
  };

  const handleLanguage = () => {
    alert("Til tanlash oynasi ochildi!");
  };

  const handleAccessibility = () => {
    alert("Imkoniyatlar paneli ochildi!");
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full bg-black backdrop-blur-3xl shadow-md shadow-amber-500 relative z-50">
      <div className="max-w-[1240px] mx-auto flex justify-between items-center px-4 py-3">

        <img src={Logo} alt="Logo" className="w-[120px]" />

        {/* Desktop menyu */}
        <ul className="hidden md:flex items-center gap-6 relative">
          <li>
            <button onClick={handleSearch} className="text-2xl hover:text-cyan-400 transition duration-300">
              <FaSearch className='text-white' />
            </button>
          </li>
          <li>
            <button onClick={handleLanguage} className="text-2xl hover:text-cyan-400 transition duration-300">
              <FaGlobe className='text-white' />
            </button>
          </li>
          <li>
            <button onClick={handleAccessibility} className="text-2xl hover:text-cyan-400 transition duration-300">
              <FaUniversalAccess className='text-white' />
            </button>
          </li>

          {/* Dropdown menyu */}
          <li className="relative group">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-green-800 rounded-md hover:bg-green-700 transition-all"
            >
              Xizmatlar
            </button>

            {/* Dropdown Items */}
            <div className={`absolute top-full mt-2 right-0 w-48 bg-black rounded-md shadow-lg overflow-hidden transform origin-top transition-all duration-300 ease-in-out
            ${dropdownOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>

              <Link to="/qrcode" onClick={() => { setActiveTab('qrcode'); setDropdownOpen(false); }} className="flex items-center gap-2 px-4 py-3 text-white hover:bg-green-700 transition-all">
                <FaUpload />
                <span>Rasm yuklash</span>
              </Link>

              <Link to="/scan" onClick={() => { setActiveTab('scan'); setDropdownOpen(false); }} className="flex items-center gap-2 px-4 py-3 text-white hover:bg-green-700 transition-all">
                <FaCamera />
                <span>Skaner qilish</span>
              </Link>

              <Link to="/register" onClick={() => { setActiveTab('register'); setDropdownOpen(false); }} className="flex items-center gap-2 px-4 py-3 text-white hover:bg-green-700 transition-all">
                <RiLoginBoxFill />
                <span>Registratsiya</span>
              </Link>

            </div>
          </li>

        </ul>

        {/* Mobile menyu tugmasi */}
        <div onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-3xl cursor-pointer transition-all z-50">
          {menuOpen ? <FaTimes className="hover:text-cyan-400" /> : <FaBars className="hover:text-cyan-400" />}
        </div>

        {/* Mobile menyu */}
        <ul className={`absolute top-[70px] right-4 bg-black p-6 rounded-lg flex flex-col gap-5 shadow-2xl w-[160px] items-center transition-all duration-500 ease-in-out transform ${menuOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"} z-50`}>
          <li>
            <button onClick={() => { handleSearch(); handleCloseMenu(); }} className="text-xl text-white hover:text-cyan-400 transition-all">
              <FaSearch />
            </button>
          </li>
          <li>
            <button onClick={() => { handleLanguage(); handleCloseMenu(); }} className="text-xl text-white hover:text-cyan-400 transition-all">
              <FaGlobe />
            </button>
          </li>
          <li>
            <button onClick={() => { handleAccessibility(); handleCloseMenu(); }} className="text-xl text-white hover:text-cyan-400 transition-all">
              <FaUniversalAccess />
            </button>
          </li>
          <li>
            <Link to="/qrcode" onClick={() => { setActiveTab('qrcode'); handleCloseMenu(); }} className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-purple-600 hover:to-blue-500 shadow-lg">
              <MdOutlineQrCodeScanner className="text-lg" />
            </Link>
          </li>
          <li>
            <Link to="/scan" onClick={() => { setActiveTab('scan'); handleCloseMenu(); }} className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-purple-600 hover:to-blue-500 shadow-lg">
              <FaCamera className="text-lg" />
            </Link>
          </li>
          <li>
            <Link to="/register" onClick={() => { setActiveTab('register'); handleCloseMenu(); }} className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-purple-600 hover:to-blue-500 shadow-lg">
              <RiLoginBoxFill className="text-lg" />
            </Link>
          </li>
        </ul>

      </div>
    </div>
  );
};

export default Header;
