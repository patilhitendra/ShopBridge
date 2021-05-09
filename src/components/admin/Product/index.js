import React, { Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTrashAlt, faPenAlt
} from '@fortawesome/free-solid-svg-icons'
import SweetAlert from 'react-bootstrap-sweetalert';
import {isEmptyOrNull} from  '../../../utils/validation';
import { getAllProducts, AddProduct, updateProduct, deleteProduct, getProductById } from "./Action";
import { Table, Container, Button, Row, Col } from 'react-bootstrap';
import AddProductComponent from './AddProduct';
import { CATEGORY } from '../../../utils/constants';

class InventoryList extends Component {

  constructor(props){
    super(props);
    this.state = {
      isModalShow : false,
      product:{},
      isShow: false,
      productId: null,
      errors : {}
    };
  }

  componentDidMount(){
    // this.props.getAllProducts();
  }

  // static getDerivedStateFromProps(newProps,prevState){
  //   console.log("prevState.product",newProps.productsData.singleProduct)
  //   console.log("newProps.productsData.singleProduct",newProps.productsData.singleProduct)
  //   if (prevState.product !== newProps.productsData.singleProduct) {
  //     return { ...prevState, product: newProps.productsData.singleProduct } 
  //   }else{
  //     // alert()
  //     return { ...prevState, product: {} }
  //   }
  // }

  // shouldComponentUpdate(nextProps, nextState){
  //   if ( this.state.product !== nextProps.productsData.singleProduct) {
  //     this.setState({product: nextProps.productsData.singleProduct}) 
  //   }
  //   return true;
  // }

  componentWillReceiveProps(nextProps){
    if ( this.state.product !== nextProps.productsData.singleProduct) {
      this.setState({product: nextProps.productsData.singleProduct}) 
    }else{
      this.setState({product: {} })
    }
  }

  handleInputChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    this.setState({product:{ ...this.state.product,[name]:value}})
  }

  getCategoryName = (id) =>{
    const category = CATEGORY.filter(category => category.categoryId == id);
    return category.length > 0 ? category[0]["categoryName"] : "";
  }
  
  getProductById = ({productId}) =>{
    this.props.getProductById(productId);
    this.openModal()
  }

  deleteProduct = ({productId}) =>{
    this.setState({isShow:true,productId})
  }

  onConfirm = () =>{
    this.props.deleteProduct(this.state.productId);
    this.setState({isShow:false,productId:null})
  }

  handlesubmit = () =>{
    const { product} = this.state;
    if(this.validateInput()) {
      if(product.productId){
        this.props.updateProduct(product);
      }else{
        this.props.AddProduct(product);
      }
      this.closeModal()
    }
  }

  validateInput = () =>{
    let errors = {};
    const { productName, price, description, categoryId} = this.state.product;
    isEmptyOrNull(productName, errors, 'productName', 'Product name is required');
    isEmptyOrNull(price, errors, 'price', 'Price is required');
    isEmptyOrNull(description, errors, 'description', 'Description is required');
    isEmptyOrNull(categoryId, errors, 'categoryId', 'Please select category');
    this.setState({ errors })
    return Object.keys(errors).length === 0;
  }

  openModal = () =>{
    this.setState({ isModalShow:true })
  }

  closeModal = () =>{
    this.setState({ isModalShow:false })
    this.setState({ product: {} })
    this.setState({ errors: {} })
  }
  render() {
    const { productsData: { products } } = this.props;
    const { isModalShow, product, errors} = this.state;

    return (
      <div className="mt-60">
          <Row className="mb-20">
            <Col sm={10}>
              <h2>Products Management </h2>
            </Col>
            <Col sm={2}>
              <Button variant="primary" onClick={this.openModal}>
                Add Product
              </Button>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              {isModalShow && <AddProductComponent 
                                  title={product && product.productId ? "Update Product":"Add Product"}
                                  show={isModalShow} 
                                  handleInputChange={this.handleInputChange} 
                                  onHide={this.closeModal} 
                                  product={product}
                                  errors={errors}
                                  onSubmit={this.handlesubmit}
                                  submitText={product && product.productId ? "Update":"Add"}
                                />}
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products && Array.isArray(products) && products.length > 0 ?
                      products.map((product, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{product.productName}</td>
                            <td>{this.getCategoryName(product.categoryId)}</td>
                            <td width="30%">{product.description}</td>
                            <td>{product.price}</td>
                            <td style={{whiteSpace: "pre"}}>
                            <Button variant="primary"  onClick={() => this.getProductById(product)} style={{marginRight: "20px"}}>
                              <FontAwesomeIcon icon={faPenAlt} />
                            </Button>
                            <Button variant="danger" onClick={() => this.deleteProduct(product)}>
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </Button>
                            </td>
                          </tr>
                        )
                      }) : null
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
          <SweetAlert
            warning
            showCancel
            show={this.state.isShow}
            confirmBtnText="YES"
            confirmBtnBsStyle="danger"
            title="Are you sure you want to delete ?"
            onConfirm={this.onConfirm}
            onCancel={()=>this.setState({isShow:false})}
            focusCancelBtn
          >
        </SweetAlert> 
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log("state.ProductReducer", state)

  return {
    productsData: state.ProductReducer,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  //Bind all the Actions which you want to dispatch in the container. 
  return bindActionCreators({
    getAllProducts,
    getProductById,
    AddProduct,
    updateProduct,
    deleteProduct,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryList);