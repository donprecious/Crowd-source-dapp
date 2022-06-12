const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/CampaignFactory.json');
const compiledCampaign = require('./build/Campaign.json');

const provider = new HDWalletProvider(
    'vault seminar impose dune antenna modify vague remain salad museum mercy enough',
    // remember to change this to your own phrase!
    'https://rinkeby.infura.io/v3/eaad63a21fda4d5dbfc12eec46d7b36b'
    // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: '1000000', from: accounts[0] });
 
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};
deploy();
 

//Contract deployed to 0x85D1E950390734CC98bEEed9C3418961e381ca48