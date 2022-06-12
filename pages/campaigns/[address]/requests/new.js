import Link from "next/link"
import Layout from "../../../../components/layout"


import React, { useState } from 'react';


import { Button, Form, Input, Message } from 'semantic-ui-react';

import web3 from '../../../../ethereum/web3';
import { useRouter } from 'next/router'
import Campaign from '../../../../ethereum/campaign';


const AddRequest = (props) => {

    const router = useRouter();
    const [state, setState] = useState({
        description: "",
        value: "",
        recipient:"",
        errorMessage: "",
        loading: false
    });

    const onSubmit = async (event) => {
        console.log('state', state)
        event.preventDefault();
        setState(state => {
            return {
                ...state,
                loading: true,
                errorMessage: ""
            }
        });
        // this.setState({ loading: true, errorMessage: "" })
        try {
            const accounts = await web3.eth.getAccounts();
            const campaign = Campaign(props.address);
            const summary = await campaign.methods.createRequest(state.description, web3.utils.toWei(state.value, "ether"), state.recipient).send({
                from: accounts[0]
            });  
            router.push('/');

            // Router.pushRoute('/');
        } catch (err) {
            setState(state => {
                return {
                    ...state,
                    errorMessage: err.message
                }
            });

            // this.setState({ errorMessage: err.message })
        }
        setState(state => {
            return {
                ...state,
                loading: false,
            }
        });
        // this.setState({ loading: false })
    }; 

    return <Layout>
        <h3>Add Request</h3>
        <Form onSubmit={onSubmit} error={!!state.errorMessage}>
            <Form.Field>
                <label>Description</label>
                <Input label='description' labelPosition='right'
                    value={state.description}
                    onChange={(e) =>
                        setState(state => {
                            return {
                                ...state,
                                description: e.target.value
                            }
                        })
                    }
                />
            </Form.Field>

            <Form.Field>
                <label>Value</label>
                <Input label='Wei' labelPosition='right'
                    value={state.value}
                    onChange={(e) =>
                        setState(state => {
                            return {
                                ...state,
                                value: e.target.value
                            }
                        })
                    }
                />
            </Form.Field>


            <Form.Field>
                <label>Recipient</label>
                <Input label='Recipient' labelPosition='right'
                    value={state.recipient}
                    onChange={(e) =>
                        setState(state => {
                            return {
                                ...state,
                                recipient: e.target.value
                            }
                        })
                    }
                />
            </Form.Field>
 
            <Message error header="Opps" content={state.errorMessage} />

            <Button primary loading={state.loading} > Create!</Button>
        </Form>
    </Layout>
}


AddRequest.getInitialProps = async (ctx) => {
    // const router = useRouter();
    const { address } = ctx.query;
console.log(ctx.query)

    return {
        address
    }
}
export default AddRequest