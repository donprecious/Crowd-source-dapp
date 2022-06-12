import Link from "next/link"
import Layout from "../../../components/layout"

import { Button, Table, Label } from 'semantic-ui-react';

import Campaign from "../../../ethereum/campaign";
import web3 from '../../../ethereum/web3';
const Requests =  (props) => {

    const renderRows =  () => {
        const approveRequest = async (e, id) => { 
            console.log(e);
          
            const campaign = Campaign(props.address);
            const accounts = await web3.eth.getAccounts();
            const requestCount = await campaign.methods.approveRequest(id).send({ from: accounts[0] });
        }

        const finializeRequest = async (e, id) => {
            console.log(e);
            
            const campaign = Campaign(props.address);
            const accounts = await web3.eth.getAccounts();
            const finializeRequest = await campaign.methods.finalizeRequest(id).send({ from: accounts[0] });
        }
        const rows = props.requests.map((a, index) => {
           
        
            const readyToFinialize = a.approvalCount > props.approvalCount/2;

            return (<Table.Row disabled={a.complete} positive ={readyToFinialize && !a.complete} >
                <Table.Cell>
                    <Label ribbon>{ index}</Label>
                </Table.Cell>
                <Table.Cell> <Label >{a.description}</Label></Table.Cell>
                <Table.Cell>{ web3.utils.fromWei(a.value, 'ether' )}</Table.Cell>
                <Table.Cell>{a.recipient}</Table.Cell>
                <Table.Cell>{a.approvalCount} / { props.approvalCount }</Table.Cell>
                <Table.Cell>{ a.complete ? null :  (<Button onClick={(e)=>approveRequest(e, index)} secondary> Approve</Button>) }</Table.Cell>
                <Table.Cell> {a.complete ? null : (<Button primary onClick={(e) => finializeRequest(e, index)}> Finialize</Button>)} </Table.Cell>
            </Table.Row>)
        })
        return rows;
    }

    return <Layout>
        <h3> Requests</h3> 
        <Link href={`/campaigns/${props.address}/requests/new`}>
        <a> <Button primary >Add request</Button></a>
        </Link>

        <h3>Pending Requests</h3> 

        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell>Recipient</Table.HeaderCell>
                    <Table.HeaderCell>Approval Count</Table.HeaderCell>
                    <Table.HeaderCell>Approve</Table.HeaderCell>
                    <Table.HeaderCell>Finialize</Table.HeaderCell>
                </Table.Row>  
                
            </Table.Header>

            <Table.Body>
                {renderRows()}
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='3'>
                        <h3>Found  {props.requestCount } requests </h3>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
  
    </Layout>
}


Requests.getInitialProps = async (ctx) => {
    // const router = useRouter();
    const { address } = ctx.query;
   
    const campaign =  Campaign(address); 
    const requestCount = await campaign.methods.getRequestCount().call();  

    const approvalCount = await campaign.methods.approversCount().call();  

    const requests = await Promise.all(
        Array(parseInt(requestCount)).fill().map((element, index) => {
            return campaign.methods.requests(index).call();
        })
    );
    // const request = await campaign.methods.requests(0).call();
    console.log(requests);
    return {
        address,
        requests, 
        requestCount,
        approvalCount
    }
}
export default Requests