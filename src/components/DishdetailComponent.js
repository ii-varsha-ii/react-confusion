import React from 'react';
import {Card, CardBody, CardTitle, CardImg, CardText, CardOverLay} from 'reactstrap';


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
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish = {props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.dish.comments} />
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