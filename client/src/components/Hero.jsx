import React from 'react'
import { motion } from "framer-motion";
import { MdSearch } from "react-icons/md";


const Hero = () => {
  return (
    <>
    <div className="z-50 w-full max-w-2xl px-6 py-24 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 text-3xl md:text-4xl font-black text-white text-center leading-tight drop-shadow-2xl font-display tracking-tight"
        >
          Discover Your Learning Path
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="mb-10 text-sm md:text-md font-semibold text-blue-200 text-center max-w-md mx-auto"
        >
          Search thousands of curated courses for your next skill.
        </motion.h2>
        <motion.form
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
  className="relative w-full max-w-xl flex items-center rounded-full bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 py-2 px-4 
             focus-within:border-orange-400 focus-within:ring-0.5 focus-within:ring-orange-400"
  autoComplete="off"
  onSubmit={(e) => e.preventDefault()}
>
  <label htmlFor="search" className="sr-only">Search for a course</label>
  <MdSearch className="ml-2 w-7 h-7 text-orange-400" />
  <input
    id="search"
    type="text"
    placeholder="Search for a path2learn..."
    className="flex-grow ml-3 py-2 px-2 bg-transparent border-none focus:outline-none text-white"
  />
</motion.form>

      </div></>
  )
}

export default Hero