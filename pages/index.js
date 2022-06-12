import React, {Component} from 'react';
import { Button, Card } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/layout'
import Link from 'next/link'

const CampaignIndex = (props) => {
    

    const renderCampaign=()=> {
        const items =  props.campaigns.map(address => {
            return {
                header: address,
                description: <Link href={`/campaigns/${address}`} >  View Campaign</Link>,
                fluid: true

            }
        });
        return <Card.Group items={items} />
    }

    return <Layout>

         <div>
            <h3>Open Campaign</h3>
            <Link href='/campaigns/new' >
                    <a >
                    <Button content="Create Campaign" icon="add circle" primary floated='right' />
                    </a>
                </Link> 

            {renderCampaign()}
        </div>
    </Layout>
}

CampaignIndex.getInitialProps = async (ctx) => {

    const campaigns = await factory.methods.getDeployedCampaigns().call();
 
    return {
        campaigns
    }
 }


export default CampaignIndex