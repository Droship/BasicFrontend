import React, { useState } from "react";
import axios from "axios";

const ProductForm = () => {
  const [productData, setProductData] = useState({
    productName: "",
    reference: "",
    prix: "",

    description: "",
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // Handle input change for text fields
  const handleInputChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);

    // Generate image previews
    const imagePreviews = selectedImages.map((file) => URL.createObjectURL(file));
    setPreviewImages(imagePreviews);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in productData) {
      formData.append(key, productData[key]);
    }

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      const response = await axios.post("http://localhost:8080/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Product created:", response.data);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Create a New Product</h2>
      <form onSubmit={handleSubmit} style={styles.form} encType="multipart/form-data">
        <div style={styles.formGroup}>
          <label>Product Name</label>
          <input
            type="text"
            name="productName"
            value={productData.productName}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Enter product name"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label>Reference</label>
          <input
            type="text"
            name="reference"
            value={productData.reference}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Enter reference"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label>Price</label>
          <input
            type="text"
            name="prix"
            value={productData.prix}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Enter price"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label>Quantity</label>
          <input
            type="text"
            name="quantity"
            value={productData.quantity}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Enter quantity"
          />
        </div>

        <div style={styles.formGroup}>
          <label>Short Description</label>
          <input
            type="text"
            name="shortdescription"
            value={productData.shortdescription}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Enter short description"
          />
        </div>

        <div style={styles.formGroup}>
          <label>Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            style={styles.textarea}
            placeholder="Enter detailed description"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label>Product Images</label>
          <input type="file" name="images" multiple onChange={handleImageChange} style={styles.fileInput} />
        </div>

        {/* Preview selected images */}
        <div style={styles.imagePreviewContainer}>
          {previewImages.map((image, index) => (
            <img key={index} src={image} alt={`Preview ${index}`} style={styles.previewImage} />
          ))}
        </div>

        <button type="submit" style={styles.submitButton}>Create Product</button>
      </form>
    </div>
  );
};

// Styles for the form
const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
    minHeight: "100px",
  },
  fileInput: {
    padding: "5px",
  },
  imagePreviewContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
    flexWrap: "wrap",
  },
  previewImage: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  submitButton: {
    padding: "12px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
    textAlign: "center",
  },
};

export default ProductForm;
