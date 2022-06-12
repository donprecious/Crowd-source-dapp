
import React, { useState } from 'react';


import { Button, Form, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/layout';

import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { useRouter } from 'next/router'


const CampaignNew = () => {
    const router = useRouter();
    const [state, setState] = useState({
        minimumContribution: "",
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
            const amount = Number(state.minimumContribution);
            console.log("state", state);
            console.log("amount", amount);
            await factory.methods.createCampaign(amount).send({
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

    return (<Layout>
        <h1> New Campaign</h1>
        <Form onSubmit={onSubmit} error={!!state.errorMessage}>
            <Form.Field>
                <label>Minimum Contribution</label>
                <Input label='Wei' labelPosition='right'
                    value={state.minimumContribution}
                    onChange={(e) =>
                        setState(state => {
                            return {
                                ...state,
                                minimumContribution: e.target.value
                            }
                        })
                      }
                />
            </Form.Field>

            <Message error header="Opps" content={state.errorMessage} />
            
            <Button primary loading={state.loading} > Create!</Button>
        </Form>
    </Layout>)
}

export default CampaignNew;