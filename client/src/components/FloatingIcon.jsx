import { motion } from "framer-motion";
import Icons from "./Icon";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const randomRange = (min, max) => Math.random() * (max - min) + min;

const getEdgePosition = (edge, index, countOnEdge) => {
  // distribute evenly, avoid touching screen edges
  const spacing = 100 / (countOnEdge + 1);
  const percent = spacing * (index + 1);

  switch (edge) {
    case "top":
      return { top: "10%", left: `${percent}%` };
    case "bottom":
      return { top: "85%", left: `${percent}%` };
    case "left":
      return { top: `${percent}%`, left: "10%" };
    case "right":
      return { top: `${percent}%`, left: "85%" };
    default:
      return { top: "50%", left: "50%" };
  }
};

const FloatingIcon = () => {
  const iconConfigs = useMemo(() => {
    const edges = ["top", "bottom", "left", "right"];
    const total = Icons.length;

    // split icons evenly across edges
    const perEdge = Math.ceil(total / edges.length);

    return Icons.map(({ Icon, color, route, label }, i) => {
      const size = randomRange(55, 75);
      const opacity = randomRange(0.7, 0.95);
      const duration = randomRange(12, 20);

      const edge = edges[i % edges.length];
      const indexOnEdge = Math.floor(i / edges.length);

      const position = getEdgePosition(edge, indexOnEdge, perEdge);

      const floatPath = {
        x: [0, randomRange(-50, 50), randomRange(-80, 80), randomRange(-50, 50), 0],
        y: [0, randomRange(-40, 40), randomRange(-70, 70), randomRange(-40, 40), 0],
      };

      return { Icon, color, route, label, size, opacity, duration, floatPath, ...position };
    });
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {iconConfigs.map(({ Icon, color, route, label, top, left, size, opacity, floatPath, duration }, i) => (
        <motion.div
          key={i}
          className="absolute flex flex-col items-center group"
          style={{ top, left, fontSize: size, color, opacity, pointerEvents: "none" }}
          animate={floatPath}
          transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        >
          <Link
            to={route}
            aria-label={label}
            tabIndex={0}
            className="rounded-full shadow-md transition-all ring-1 ring-transparent 
                       hover:ring-orange-400 bg-black/20 backdrop-blur-sm"
            style={{
              width: size,
              height: size,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "auto",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.15, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
            >
              <Icon className="drop-shadow-lg" style={{ color }} />
            </motion.div>
          </Link>

          {/* Tooltip */}
          <span className="mt-2 absolute left-1/2 -translate-x-1/2 px-2 py-1 
                           rounded text-xs bg-blackish text-orange
                           opacity-0 group-hover:opacity-100 
                           transition-all whitespace-nowrap -bottom-7 shadow-sm">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcon;
