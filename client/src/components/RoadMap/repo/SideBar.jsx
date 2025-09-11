const SideBar = ({ content, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      {content && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40"
          onClick={onClose} // Close on backdrop click
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#00000f] text-white shadow-xl border-l-2 border-[#CF1B1BFF] transform transition-transform duration-500 ease-in-out z-50
        ${content ? "translate-x-0" : "translate-x-full"}`}
        style={{
          boxShadow: "0 0 20px rgba(207, 27, 27, 0.5)",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click inside sidebar
      >
        {content && (
          <div className="p-5 flex flex-col gap-6 h-full">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#CF1B1BFF] drop-shadow-md animate-pulse">
                {content.label}
              </h2>
              <button
                onClick={onClose}
                className="text-white text-lg font-bold hover:text-[#CF1B1BFF] transform hover:scale-110 transition"
              >
                ✖
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-300 leading-relaxed">
              {content.content.desc}
            </p>
            <hr />

            {/* Resource Section */}
            <div className="flex justify-start mt-16">
              <a
                href={content.content.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-5 py-2 
               text-white text-sm font-medium rounded-full shadow-md 
               transition-all duration-300 ease-in-out 
               hover:scale-105 hover:shadow-red-500/50 hover:brightness-110
               before:absolute before:inset-0 before:rounded-full before:border before:border-red-300 before:opacity-30 hover:underline"
              >
                Read Article
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
