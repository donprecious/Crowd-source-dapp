import { Button, Form, Input, Message } from "semantic-ui-react"
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import React, { useState } from 'react';



const ContributionForm = (props) => {

    const [state, setState] = useState({
        value: "",
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
    
        try {
            const accounts = await web3.eth.getAccounts();
            const campaign = Campaign(props.address)

            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(state.value, 'ether')
            });
            // router.push('/');

            // Router.pushRoute('/');
        } catch (err) {
            console.error(err);
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

    return (<Form onSubmit={onSubmit} error={!!state.errorMessage}>
        <Form.Field >
            <label>Amount of contribution</label>
            <Input label="ETH" type="text" labelPosition="right"
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

        <Message error header="Opps" content={state.errorMessage} />
        <Button primary loading={state.loading} type="submit" >Contribute</Button>
    </Form>)
}


export default ContributionForm;