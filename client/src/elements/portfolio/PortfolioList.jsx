// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { getAllProducts } from "../../api";

// const PortfolioList = ({ column, styevariation, item }) => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await getAllProducts();
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const productList = products.slice(0, item);

//   return (
//     <React.Fragment>
//       {productList.map((product, index) => (
//         <div className={`${column}`} key={index}>
//           <div className={`portfolio ${styevariation}`}>
//             <div className="thumbnail-inner">
//               <div className={`thumbnail ${product.image}`}></div>
//               <div className={`bg-blr-image ${product.image}`}></div>
//             </div>
//             <div className="content">
//               <div className="inner">
//                 <p>{product.category}</p>
//                 <h4>
//                   <Link to={`/product/${product._id}`}>{product.title}</Link>
//                 </h4>
//                 <div className="portfolio-button">
//                   <Link className="rn-btn" to={`/product/${product._id}`}>
//                     Buy Now
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <Link className="link-overlay" to={`/product/${product._id}`}></Link>
//           </div>
//         </div>
//       ))}
//     </React.Fragment>
//   );
// };

// export default PortfolioList;
