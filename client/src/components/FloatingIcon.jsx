import { motion } from "framer-motion";
import Icons from "./Icon";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const randomRange = (min, max) => Math.random() * (max - min) + min;

const getEdgePosition = (edge, index, countOnEdge) => {
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
    const perEdge = Math.ceil(total / edges.length);

    return Icons.map(({ color, route, label }, i) => {
      const size = randomRange(70, 90);
      const opacity = randomRange(0.8, 0.95);
      const duration = randomRange(12, 20);

      const edge = edges[i % edges.length];
      const indexOnEdge = Math.floor(i / edges.length);

      const position = getEdgePosition(edge, indexOnEdge, perEdge);

      const floatPath = {
        x: [0, randomRange(-50, 50), randomRange(-80, 80), randomRange(-50, 50), 0],
        y: [0, randomRange(-40, 40), randomRange(-70, 70), randomRange(-40, 40), 0],
      };

      return { color, route, label, size, opacity, duration, floatPath, ...position };
    });
  }, []);

  return (
    <div className="absolute inset-0 z-30 pointer-events-none">
      {iconConfigs.map(({ color, route, label, top, left, size, opacity, floatPath, duration }, i) => (
        <motion.div
          key={i}
          className="absolute flex flex-col items-center"
          style={{ top, left, opacity }}
          animate={floatPath}
          transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        >
          <Link
            to={route}
            aria-label={label}
            tabIndex={0}
            className="pointer-events-auto cursor-pointer text-orange"
            style={{
              minWidth: size + 30,
              height: size,
              padding: "0 16px",
              fontSize: "14px",
              fontWeight: "600",
              // color,
              whiteSpace: "nowrap",
            }}
          >
            <motion.span
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="drop-shadow-lg"
            >
              {label}
            </motion.span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcon;
