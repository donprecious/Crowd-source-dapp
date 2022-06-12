import React from 'react'; 
import { useRouter } from 'next/router'
import Layout from '../../components/layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributionForm from '../../components/contributeForm'
import Link from 'next/link';


const showCards = (summary) => {

    console.log(summary)
    const items = [{
        header: summary.manager,
        meta: 'Address of  manager',
        description: 'Manager Creates this campagin and can request for withdrawals',
        style:{overflowWrap: 'break-word'}
    },
        {
            header: summary.approversCount,
            meta: 'Number of Approvals',
            description: 'No of people who have already donated',
            style: { overflowWrap: 'break-word' }
        },
        {
            header: web3.utils.fromWei(summary.balance) ,
            meta: 'Campaign Balance',
            description: 'The balance is how much money this campaign has to spend',
            style: { overflowWrap: 'break-word' }
        },
        {
            header: summary.requestCount,
            meta: 'Number of Requests',
            description: 'A request to spend money',
            style: { overflowWrap: 'break-word' }
        },
    ]

    return <Card.Group  items={items}/>

   
}

const ShowCampaign = (props) => {
    const router = useRouter();
    const { address } = router.query;

    return <Layout>
        <Grid>
            <Grid.Row>
                <Grid.Column width={10}>
                    {showCards(props.summary)}

                  
                </Grid.Column>
                <Grid.Column width={6}>
                    <ContributionForm address={address} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Link href={`/campaigns/${address}/requests`} >
                    <a >
                        <Button content="View Requests" icon="eye" primary floated='left' />
                    </a>
                </Link> 
             
            </Grid.Row>
           
           
        </Grid>
      
        
    </Layout>;
}

ShowCampaign.getInitialProps = async (ctx) => {
    // const router = useRouter();
const { address } = ctx.query;
 
    
    const campaign = Campaign(address); 
    const summary = await campaign.methods.getSummary().call();  
    const summaryRecord = {
        address: address,
        minimumContribution: summary[0],
        balance: summary[1],
        requestCount: summary[2],
        approversCount: summary[3],
        manager: summary[4]
    };
   
    return {
      summary:  summaryRecord, 
    }
}
export default ShowCampaign;