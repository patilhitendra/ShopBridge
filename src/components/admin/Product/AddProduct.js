import React from 'react'
import { Form, Button } from 'react-bootstrap';
import Modal from '../../common/Modal';
import { CATEGORY } from  '../../../utils/constants';

export default function AddProduct(props) {
    const { errors } = props;
    const { categoryId,productName,description,price } = props.product;
    return (
        <Modal title={props.title} submitText={props.submitText} onSubmit={props.onSubmit} show={props.show} onHide={()=>props.onHide()}>
            <Form>
                <Form.Group controlId="productName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" name="productName" value={productName} onChange={props.handleInputChange} placeholder="Enter product name" />
                    {errors.productName && <label htmlFor="categoryName" className="error">{errors.productName}</label>}
                </Form.Group>
                <Form.Group controlId="Email">
                    <Form.Label>Category</Form.Label>
                    <select
                        name="categoryId"
                        value={categoryId}
                        onChange={props.handleInputChange}
                        className="form-control"
                    >
                        <option value="">Select Category</option>
                        { CATEGORY && Array.isArray(CATEGORY) && CATEGORY.map(category => {
                        return (
                            <option key={category.categoryId} value={category.categoryId}>
                                {category.categoryName}
                            </option>
                        );
                        })}
                    </select>
                    {errors.categoryId && <label htmlFor="categoryName" className="error">{errors.categoryId}</label>}
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name="price" placeholder="Enter price" value={price} onChange={props.handleInputChange}/>
                    {errors.price && <label htmlFor="categoryName" className="error">{errors.price}</label>}
                </Form.Group>
                <Form.Group controlId="Description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" as="textarea" name="description" placeholder="Enter Description" value={description} onChange={props.handleInputChange}/>
                    {errors.description && <label htmlFor="categoryName" className="error">{errors.description}</label>}
                </Form.Group>
            </Form>
        </Modal>
    )
}
