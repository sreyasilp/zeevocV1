import React, { Fragment, useState, useEffect } from "react";
import { getAllBlogPosts } from "../../api";
import LoadingSpinner from "../../component/spinner/LoadingSpinner";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const PostList = posts.slice(0, 6);

  return (
    <Fragment>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="row">
          {PostList.map((value, i) => (
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
      )}
    </Fragment>
  );
};

export default BlogList;
