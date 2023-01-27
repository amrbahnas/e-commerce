import React from "react";

function Pagination({ postsPerPage, totalPosts, setCurrentPage, currentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex justify-center mt-10">
      {totalPosts !== 0 && (
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">
            <li className="page-item">
              <button
                className="page-link cursor-pointer relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none"
                onClick={(e) => {
                  setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
                }}
              >
                Previous
              </button>
            </li>
            {pageNumbers.map((number) => {
              return (
                <li key={number} className="page-item cursor-pointer">
                  <button
                    className={`${
                      currentPage === number ? "bg-gray-200 text-gray-800" : ""
                    }page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none`}
                    onClick={(e) => setCurrentPage(number)}
                  >
                    {number}
                  </button>
                </li>
              );
            })}
            <li className="page-item">
              <button
                className="page-link cursor-pointer relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800  focus:shadow-none"
                onClick={(e) =>
                  setCurrentPage((prev) =>
                    prev !== pageNumbers.length ? prev + 1 : prev
                  )
                }
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
export default Pagination;
