import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form} from 'reactstrap';
import * as EmailValidator from 'email-validator'
import axios from 'axios'

export default class EmailModal extends React.Component{
    constructor(props) {
        // constructor sets the initial state of the component
        //points the gloval context of this keyword
        super(props);
        this.state = {
            emailValue: "",
            //initializing the state
        }
    }

    handleEmail = (event) => {
        //want to change the state and accept
        // console.log(event.target.value);
        this.setState({
            emailValue: event.target.value  
        })
    }


    handleSubmit = (event) => {
        event.preventDefault()
        // const data = this.props.data
        // // const persons = this.props.persons
        // const data2 = JSON.stringify(data)
        const validateEmail = EmailValidator.validate(this.state.emailValue)
        let selectedPerson = this.props.selectedPerson
        let emailData = []
        emailData.push("name ", selectedPerson.name, "items ")
        
        for (let i = 0; i < selectedPerson.items.length; i++) { 
            if (selectedPerson.items[i].quantity > 0) {
                emailData.push("{", selectedPerson.items[i].description, "qty: ", selectedPerson.items[i].quantity, "@ ", selectedPerson.items[i].price, "}")
            }
        }
        emailData.push("subtotal", selectedPerson.subtotal, "tax", selectedPerson.tax, "total", selectedPerson.total)
        let emailData2=JSON.stringify(emailData)
        // console.log("emaildata " +emailData2)
        // console.log("data "+data2)

        if (validateEmail){
               
            
            // having zapier hook in the front end is a bad idea since client side is exposed to public and CORS
            axios({
                method: 'get',
                // change this so that it turns into a post to the flask server
                url: 'https://hooks.zapier.com/hooks/catch/5311861/oyjxd9c',
                // change this so that it sends to the flask server
                params: {
                    "email": this.state.emailValue,
                    "subject": "Message From Splits",
                    "message": emailData2
                    // in message, want to input the breakdown of the bill, and how much each people owe.
                    /*
                    person 1: items: [
                        {"name": Chic Teri Omu "quantity":1 "price":15.09}
                        *exclude items that person has 0 quantity
                        "subtotal": X.XX "tax": X.XX "total": X.XX

                    User: Items: [

                    ]
                    */
                }
              })


            //   sending the data to the flask server
            // axios({
            //     method: 'POST',
            //     url: 'http://localhost:5000/api/v1/detect/upload',
            //     data: emaildata2,
            // need to also pass in email value
            //     headers: { 
            //       'content-type': 'multipart/form-data',
            //     }
            //   })


            
            // cant send to sendgrid from react
            // axios({
            //     method: 'post',
            //     url: 'https://api.sendgrid.com/v3/mail/send',
            //     headers: {
            //         'Authorization': 'Bearer key', 
            //         'content-type': 'application/json',
            //         'Access-Control-Allow-Origin': '*',
            //     },
            //     data: {
            //         personalizations: [{"to": [{"email": this.state.emailValue}]}],
            //         from: {"email": "sendeexampexample@example.com"},
            //         subject: "Hello, World!",
            //         content: [{"type": "text/plain", "value": "Heya!"}]
            //     }

            //   })

              .then(response => {
    
                const jwt = response.data.auth_token
                localStorage.setItem('jwt', jwt)
                localStorage.setItem('current_user', JSON.stringify(response.data.user))
    
                this.props.toggleEmailModal()
              })
              .catch(error => {
                if (error) {
                    this.setState({
                        isLoading: false
                    })
                }
              });
          }
        }
    

    render() {
        return (
            <>
                <Modal isOpen={this.props.emailModal} toggle={this.props.toggleEmailModal}>
                {/* isOpen is the emailModal property (basically passing down props from the navbar state: emailModal) same thing for toggle*/}

                    <ModalHeader toggle={this.props.toggleEmailModal}>Send Email</ModalHeader>
                    {/* why is this toggle needed in here?? */}

                    

                    <ModalBody> 

                        <Form onSubmit = {this.handleSubmit}>
                        {/* when the form is submitted, the handlesubmit function is called  */}

                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <input value = {this.state.emailValue} onChange = {this.handleEmail} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                            </div>


                            <Button type = 'submit' color="primary" >Send Email</Button>{' '}
                            <Button color="secondary" onClick={this.props.toggleEmailModal}>Cancel</Button>
                        </Form>
                    </ModalBody>

                    {/* <ModalFooter>
                    
                    </ModalFooter> */}
                </Modal>
                
            </>
        );
    }

}


