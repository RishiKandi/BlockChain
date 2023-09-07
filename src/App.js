import {useEffect, useState} from 'react';
import './App.css';
import { Card, Form, Container, Row, Col, Button } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import { init, contractFunction, Supplier,Product, User,newowner } from './Web3Client';

function App() {
  const [formData, setFormData] = useState({
    Mname: "",
    Memailid: "",
    Maddress: "",
    mDate:Date.now(),
    
  });

  const [supplier, setSupplier] = useState({
    Sname: "",
    Semailid: "",
    Saddress: "",
    SDate:Date.now(),
    
  });

  const [product, setproduct] = useState({
   
    Pname: "",
    Pprice: "",
    Pquantity: "",
    manufacturerIndex:"",
    supplierIndex:"",
  });

  const [user, setuser] = useState({
    Uname: "",
    Uaddress: "",
    Uemail: "",
    Uregisterdate:Date.now(),
    
  });
  const [productDetails, setProductDetails] = useState([]);
  
  const [owner, setowner] = useState({
    ID: "",
    Owner: "", 
  });


  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const suppilerChange = (event) => {
    const { name, value } = event.target;
    setSupplier({
      ...supplier,
      [name]: value,
    });
  };


  const productChange = (event) => {
    const { name, value } = event.target;
    setproduct({
      ...product,
      [name]: value,
    });
  };

  const userChange = (event) => {
    const { name, value } = event.target;
    setuser({
      ...user,
      [name]: value,
    });
  };

  const ownerChange = (event) => {
    const { name, value } = event.target;
    setowner({
      ...owner,
      [name]: value,
    });
  };
  
  const createManufacturer = async () => {
    if ( !formData.Mname || !formData.Memailid || !formData.Maddress) {
      alert('Please fill out all required fields.');
      return;
    }
    //check if email is valid
    if (!isValidEmail(formData.Memailid)) {
      alert('Please enter a valid email address.');
      return;
    }
    console.log("Values: ", formData);
    let response = await contractFunction(formData)
    console.log("Transaction Hash", response)
   
  };


  const createSupplier = async () => {

    if (!supplier.Saddress || !supplier.SDate || !supplier.Semailid || !supplier.Sname ) {
      alert('Please fill out all required fields.');
      return;
    }
    //check if email is valid
    if (!isValidEmail(supplier.Semailid)) {
      alert('Please enter a valid email address.');
      return;
    }
    console.log("Values: ", supplier);
    
    let response = await Supplier(supplier)
    console.log("Transaction Hash", response)
  };

  const createproduct = async () => {
    if (!product.Pquantity || !product.Pname || !product.manufacturerIndex|| !product.Pprice || !product.supplierIndex) {
      alert('Please fill out all required fields.');
      return;
    }
    console.log("Values: ", product);
    
    let response = await Product(product)
    console.log("Transaction Hash", response)
  };

  const createuser = async () => {
    if (!user.Uemail || !user.Uaddress || user.Uname){
      alert('Please fill out all required fields.');
      return;
    }
    console.log("Values: ", user);
    let response = await User(user)
    console.log("Transaction Hash", response)
   
  };


  const createowner = async () => {
    if(!owner.ID || !owner.Owner){
      alert('Please fill out all required fields.');
      return;
    }
    console.log("Values: ", owner);
    let response, resp = await newowner(owner);
    setProductDetails(resp);
    console.log("Buy Product: ", resp)
   
  };



  return (
    <>
      <Container fluid className="pl-0 pr-0">
        <Row>
          <Col md="12">
            <Card style={{ marginBottom: '0px' }}>
              <Card.Header
                style={{
                  backgroundColor: '#6F4E37', // Use the specific color value you want
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h5"
                  color="common.white"
                  style={{ fontWeight: '600', fontSize: '22px' }}
                >
                  Manufacturer Component
                </Typography>
              </Card.Header>
              <Card.Body style={{ paddingTop: '10px', paddingBottom: '5px' }}>
                <Form>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Manufacturer Name
                        </label>
                        <Form.Control
                          type="text"
                          name="Mname"
                          value={formData.Mname}
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>
                          Manufacturer Email
                        </label>
                        <Form.Control
                         type="text"
                        name="Memailid"
                        value={formData.Memailid}
                        onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>
                          Manufacturer Address
                        </label>
                        <Form.Control
                        type="text"
                        name="Maddress"
                        value={formData.Maddress}
                        onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row
                    className="justify-content-end"
                    style={{ paddingRight: '9px' }}
                  >                    
                    <Col
                      className="pr-1"
                      md="2"
                      lg="1"
                      sm="3"
                      style={{ padding: '2px' }}
                    >
                      <Button onClick={createManufacturer}>Create Manufacturer</Button>
                    </Col>                    
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card style={{ marginBottom: '0px' }}>
              <Card.Header
                style={{
                  backgroundColor: '#0A3161',
                  color: '#FFFFF',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h5"
                  color="common.white"
                  style={{ fontWeight: '600', fontSize: '22px' }}
                >
                  Supplier Component
                </Typography>
              </Card.Header>
              <Card.Body style={{ paddingTop: '10px', paddingBottom: '5px' }}>
                <Form>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Supplier Name
                        </label>
                        <Form.Control
                          type="text"
                          name="Sname"
                          value={supplier.Sname}
                          onChange={suppilerChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>
                          Supplier Email
                        </label>
                        <Form.Control
                         type="text"
                        name="Semailid"
                        value={supplier.Semailid}
                        onChange={suppilerChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>
                          Supplier Address
                        </label>
                        <Form.Control
                        type="text"
                        name="Saddress"
                        value={supplier.Saddress}
                        onChange={suppilerChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row
                    className="justify-content-end"
                    style={{ paddingRight: '9px' }}
                  >                    
                    <Col
                      className="pr-1"
                      md="2"
                      lg="1"
                      sm="3"
                      style={{ padding: '2px' }}
                    >
                      <Button onClick={createSupplier}>Create Supplier</Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card style={{ marginBottom: '0px' }}>
              <Card.Header
                style={{
                  backgroundColor: '#0A3161',
                  color: '#FFFFF',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h5"
                  color="common.white"
                  style={{ fontWeight: '600', fontSize: '22px' }}
                >
                  product Component
                </Typography>
              </Card.Header>
              <Card.Body style={{ paddingTop: '10px', paddingBottom: '5px' }}>
                <Form>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          product Name
                        </label>
                        <Form.Control
                          type="text"
                          name="Pname"
                          value={product.Pname}
                          onChange={productChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>
                          product price
                        </label>
                        <Form.Control
                         type="text"
                        name="Pprice"
                        value={product.Pprice}
                        onChange={productChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>
                          product Quantity
                        </label>
                        <Form.Control
                        type="text"
                        name="Pquantity"
                        value={product.Pquantity}
                        onChange={productChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>
                        Manufacturer Index
                        </label>
                        <Form.Control
                        type="text"
                        name="manufacturerIndex"
                        value={product.manufacturerIndex}
                        onChange={productChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>
                        Supplier Index
                        </label>
                        <Form.Control
                        type="text"
                        name="supplierIndex"
                        value={product.supplierIndex}
                        onChange={productChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row
                    className="justify-content-end"
                    style={{ paddingRight: '9px' }}
                  >                    
                    <Col
                      className="pr-1"
                      md="2"
                      lg="1"
                      sm="3"
                      style={{ padding: '2px' }}
                    >
                      <Button onClick={createproduct}>Create product</Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card style={{ marginBottom: '0px' }}>
              <Card.Header
                style={{
                  backgroundColor: '#0A3161',
                  color: '#FFFFF',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h5"
                  color="common.white"
                  style={{ fontWeight: '600', fontSize: '22px' }}
                >
                  User Component
                </Typography>
              </Card.Header>
              <Card.Body style={{ paddingTop: '10px', paddingBottom: '5px' }}>
                <Form>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          user Name
                        </label>
                        <Form.Control
                          type="text"
                          name="Uname"
                          value={user.Uname}
                          onChange={userChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>
                          user Email
                        </label>
                        <Form.Control
                         type="text"
                        name="Uemail"
                        value={user.Uemail}
                        onChange={userChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>
                          user Address
                        </label>
                        <Form.Control
                        type="text"
                        name="Uaddress"
                        value={user.Uaddress}
                        onChange={userChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row
                    className="justify-content-end"
                    style={{ paddingRight: '9px' }}
                  >                    
                    <Col
                      className="pr-1"
                      md="2"
                      lg="1"
                      sm="3"
                      style={{ padding: '2px' }}
                    >
                      <Button onClick={createuser}>Create user</Button>
                    </Col>
                    
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card style={{ marginBottom: '0px' }}>
              <Card.Header
                style={{
                  backgroundColor: '#0A3161',
                  color: '#FFFFF',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h5"
                  color="common.white"
                  style={{ fontWeight: '600', fontSize: '22px' }}
                >
                 Buy Product
                </Typography>
              </Card.Header>
              <Card.Body style={{ paddingTop: '10px', paddingBottom: '5px' }}>
                <Form>
                  <Row>
                    
                  <Col md="6">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                         Product ID
                        </label>
                        <Form.Control
                          type="text"
                          name="ID"
                          value={owner.ID}
                          onChange={ownerChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          New Owner Wallet
                        </label>
                        <Form.Control
                          type="text"
                          name="Owner"
                          value={owner.Owner}
                          onChange={ownerChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row
                    className="justify-content-end"
                    style={{ paddingRight: '9px' }}
                  >                    
                    <Col
                      className="pr-1"
                      md="2"
                      lg="1"
                      sm="3"
                      style={{ padding: '2px' }}
                    >
                      <Button onClick={createowner}>Buy Product</Button>
                    </Col>
                    <Col>
                    {productDetails.length !== 0 && ( 
                      <div> <h2> Product Purchased: </h2> 
                      <p>Product Name: {productDetails[2]}</p> 
                      <p>Supplier Name: {parseInt(productDetails[1])}</p>
                       <p>Manufacturer Name: {parseInt(productDetails[0])}</p> 
                       <p>Product Cost: {parseInt(productDetails[3])}</p>  
                       </div> 
                    )}
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>


      </Container>
    </>
  );
}

export default App;
