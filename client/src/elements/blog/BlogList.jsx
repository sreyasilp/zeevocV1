import React, { Fragment, useState, useEffect } from "react";
import { getAllBlogPosts } from "../../api";
import LoadingSpinner from "../../component/spinner/LoadingSpinner";
import Pagination from "react-js-pagination"; // Importing a pagination library

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    const fetchBlogList = async () => {
      try {
        const response = await getAllBlogPosts();
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchBlogList();
  }, []);

  // Calculate the posts to display on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Fragment>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="row">
            {currentPosts.map((value, i) => (
              <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={i}>
                <div className="blog blog-style--1">
                  <div className="thumbnail">
                    <a href={`/blog/${value.urlKey}`}>
                      <img
                        className="w-100"
                        src={`/assets/images/blog/blog-${value.images}.jpg`}
                        alt="Blog Images"
                      />
                    </a>
                  </div>
                  <div className="content">
                    <p className="blogtype">{value.category}</p>
                    <h4 className="title">
                      <a href={`/blog/${value.urlKey}`}>{value.title}</a>
                    </h4>
                    <div className="blog-btn">
                      <a className="rn-btn text-white" href={`/blog/${value.urlKey}`}>
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination-wrapper">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={postsPerPage}
              totalItemsCount={posts.length}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default BlogList;
