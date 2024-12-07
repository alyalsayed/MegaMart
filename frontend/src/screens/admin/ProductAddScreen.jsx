import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";

const ProductAddScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !price || !brand || !category || !countInStock || !description) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createProduct({
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap();

      

      toast.success("Product added successfully");

      navigate("/admin/productlist");
    } catch (err) {
      console.log({
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      });
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size exceeds 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully");
      setImage(res.image); 
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Add Product</h1>
        {loadingCreate && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              min={0}
              onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.Control
              label="Choose File"
              onChange={uploadFileHandler}
              type="file"
            ></Form.Control>
            {loadingUpload && <Loader />}
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter stock count"
              value={countInStock}
              min={0}
              onChange={(e) => setCountInStock(parseInt(e.target.value, 10) || 0)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" style={{ marginTop: "1rem" }}>
            Add Product
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductAddScreen;
