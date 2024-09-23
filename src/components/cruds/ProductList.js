import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching the products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Product List</h2>
      <div style={styles.productList}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} style={styles.productCard}>
              <div style={styles.imageContainer}>
                {product.images && product.images.length > 0 ? (
                  <img
                    src={`http://localhost:8080/${product.images[0]}`}
                    alt={product.productName}
                    style={styles.productImage}
                  />
                ) : (
                  <div style={styles.noImage}>No Image</div>
                )}
              </div>
              <div style={styles.productInfo}>
                <h3 style={styles.productName}>{product.productName}</h3>
                <p style={styles.reference}>Reference: {product.reference}</p>
                <p style={styles.price}>Price: {product.prix} TND</p>
                <p style={styles.description}>{product.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

// Styles for the ProductList
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
  productList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "transform 0.2s ease",
  },
  productCardHover: {
    transform: "scale(1.05)",
  },
  imageContainer: {
    width: "100%",
    height: "200px",
    backgroundColor: "#f0f0f0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "cover",
  },
  noImage: {
    color: "#aaa",
    fontSize: "1rem",
  },
  productInfo: {
    padding: "15px",
  },
  productName: {
    fontSize: "1.25rem",
    marginBottom: "10px",
    color: "#333",
  },
  reference: {
    fontSize: "1rem",
    color: "#777",
  },
  price: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#28a745",
    marginTop: "10px",
  },
  description: {
    fontSize: "0.9rem",
    color: "#555",
    marginTop: "10px",
    lineHeight: "1.4",
  },
};

export default ProductList;
