import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import { MdSearch } from "react-icons/md";

const icons = [
  { Icon: FaReact, color: "#61DAFB", route: "/react", label: "React" },
  { Icon: FaHtml5, color: "#E34F26", route: "/html5", label: "HTML5" },
  { Icon: FaCss3Alt, color: "#1572B6", route: "/css3", label: "CSS3" },
  { Icon: FaJs, color: "#F7DF1E", route: "/javascript", label: "JavaScript" },
  { Icon: FaNodeJs, color: "#3C873A", route: "/nodejs", label: "Node.js" },
  { Icon: SiTailwindcss, color: "#38BDF8", route: "/tailwind", label: "Tailwind CSS" }
];

const randomRange = (min, max) => Math.random() * (max - min) + min;

const getIconConfig = (i) => {
  const seed = i * 91;
  const top = randomRange(10, 70) + (seed % 10);
  const left = randomRange(10, 75) + (seed % 12);
  const amplitude = randomRange(25, 55);
  const duration = randomRange(6, 10);
  const delay = randomRange(0, 2.5);
  const size = randomRange(60, 85);
  const opacity = randomRange(0.6, 0.9);
  return { top, left, amplitude, duration, delay, size, opacity };
};

export default function HeroSection() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-900">
      {/* Floating & clickable icons */}
      {/* Floating & clickable icons */}
<div className="absolute inset-0 z-10 pointer-events-none">
  {icons.map(({ Icon, color, route, label }, i) => {
    const { top, left, amplitude, duration, delay, size, opacity } = getIconConfig(i + 1);
    return (
      <motion.div
        key={i}
        className="absolute flex flex-col items-center group"
        style={{
          top: `${top}%`,
          left: `${left}%`,
          fontSize: size,
          color,
          opacity,
          pointerEvents: "none", // container ignores clicks
        }}
        animate={{
          y: [0, -amplitude, 0, amplitude / 3, 0],
          x: [0, amplitude / 2 * (i % 2 === 0 ? 1 : -1), 0, -amplitude / 4, 0],
          rotate: [0, 4, -4, 2, 0]
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }}
      >
        <Link
          to={route}
          aria-label={label}
          tabIndex={0}
          className="rounded-full bg-white/10 hover:bg-white/30 focus:bg-white/40 shadow-2xl
            transition-all ring-2 ring-transparent hover:ring-blue-400 peer"
          style={{
            width: size,
            height: size,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            outline: "none",
            pointerEvents: "auto", // only the button is clickable
          }}
        >
          <motion.div
            whileHover={{ scale: 1.15, y: -8, boxShadow: "0 12px 25px rgba(0,0,0,0.35)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            <Icon className="drop-shadow-lg" style={{ color }} />
          </motion.div>
        </Link>
        <span className="mt-2 absolute left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-white/80 backdrop-blur text-xs text-slate-900 opacity-0 group-hover:opacity-95 group-focus-within:opacity-100 pointer-events-none transition-all whitespace-nowrap -bottom-7 z-50 shadow-md select-none">
          {label}
        </span>
      </motion.div>
    );
  })}
  {/* Background overlays */}
  <div className="absolute inset-0 bg-gradient-to-b from-blue-700/10 via-transparent to-black/70 pointer-events-none" />
  <div className="absolute inset-0 bg-gradient-radial from-fuchsia-400/10 via-transparent to-transparent pointer-events-none" />
</div>

      {/* Hero content */}
      <div className="z-10 w-full max-w-2xl px-6 py-24 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 text-5xl md:text-7xl font-black text-white text-center leading-tight drop-shadow-2xl font-display tracking-tight"
        >
          Discover Your Learning Path
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="mb-10 text-lg md:text-2xl font-semibold text-blue-200 text-center max-w-md mx-auto"
        >
          Search thousands of curated courses for your next skill.
        </motion.h2>
        <motion.form
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-xl flex items-center rounded-full shadow-xl bg-white/90 ring-2 ring-blue-200 backdrop-blur-md py-2 px-4"
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="search" className="sr-only">Search for a course</label>
          <MdSearch className="ml-2 w-7 h-7 text-blue-400" />
          <input
            id="search"
            type="text"
            placeholder="Search for a course..."
            className="flex-grow ml-3 py-2 px-2 bg-transparent border-none focus:outline-none text-lg text-gray-800"
          />
          <button
            type="submit"
            className="ml-2 px-8 py-3 rounded-full bg-blue-700 shadow-xl text-white font-semibold hover:bg-fuchsia-600 transition"
          >
            Search
          </button>
        </motion.form>
      </div>
    </div>
  );
}
