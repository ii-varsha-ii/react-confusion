import React, {Component} from 'react';
import {Card, CardBody, CardTitle, CardImg, CardText, CardOverLay, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >=len);

class CommentForm extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
    }

    render() {
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span>Submit Comment
                </Button>
                <Modal  isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody className="m-2">
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" id="rating"><strong>Rating</strong></Label>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" id="author"><strong>Your Name</strong></Label>
                                <Control.text model=".author" className="form-control" id="author" name="author" 
                                validators = {{ required, maxLength:maxLength(15), minLength:minLength(3) }}
                                ></Control.text>
                                <Errors model=".author" show="touched" className="text-danger" messages={{required:"Required. ", 
                                minLength:"Must be greater 2 characters", maxLength: "Must be less than 15 characters."}} />
                            </Row>
                            <Row>
                                <Label htmlFor="comments" id="comments"><strong>Comment</strong></Label>
                                <Control.textarea model=".comments" id="comments" name="comments" rows="6" className="form-control"></Control.textarea>
                            </Row>
                            <Row className="form-group">
                                <Button type="submit" className="bg-primary mt-2">Submit</Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
function RenderComments({comments}) {
    if (comments != null) {
        const commentsItems = comments.map((item) => {
            return (
                <div key={item.id}>
                    <div>
                        <ul className="list-unstyled">
                            <li>{item.comment}</li>
                            <li>--{item.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month:'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))}</li>
                        </ul>
                    </div>
                </div>                
            );
        });
        return (
            <div>
                <h4>Comments</h4>
                {commentsItems}
                <CommentForm />
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

function RenderDish({dish}) {
    if(dish!=null){
        return (
            <Card>
                <CardImg width="100%" object src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle heading>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }
    else {
        return(
            <div></div>
        );
    }
}

const Dishdetail = (props) => {
    if (props.dish != null) {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish = {props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.comments} />
                        </div>
                    </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}


export default Dishdetail;