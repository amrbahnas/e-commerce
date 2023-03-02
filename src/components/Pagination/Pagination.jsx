import React, { useEffect } from "react";

function Pagination({ postsPerPage, totalPosts, setCurrentPage, currentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
  return (
    <div className="flex justify-center mt-10">
      {totalPosts !== 0 && (
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">
            <li className="page-item">
              <button
                className="page-link cursor-pointer relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 dark:text-darkPText hover:text-gray-800 focus:shadow-none"
                onClick={(e) => {
                  setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
                }}
              >
                Previous
              </button>
            </li>
            {pageNumbers.map((number) => {
              return (
                <li key={number} className="cursor-pointer page-item">
                  <button
                    className={`${
                      +currentPage === +number
                        ? "bg-gray-200  text-gray-800 dark:bg-darkBody"
                        : " bg-transparent"
                    } page-link relative block py-1.5 px-3 rounded border-0  outline-none transition-all duration-300  text-gray-800 dark:text-darkPText  hover:text-gray-800 hover:bg-gray-200 dark:hover:bg-darkBody  focus:shadow-none`}
                    onClick={(e) => setCurrentPage(number)}
                  >
                    {number}
                  </button>
                </li>
              );
            })}
            <li className="page-item">
              <button
                className="page-link cursor-pointer relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 dark:text-darkPText  focus:shadow-none"
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
