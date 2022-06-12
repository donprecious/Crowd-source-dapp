import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xe52380Ae3f1bb48891D261663C97811407cd3F5F'
);

export default instance;