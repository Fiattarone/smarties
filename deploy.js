const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
    "bid love near power little menu crucial rug engage open ill tragic",
    "https://rinkeby.infura.io/v3/1aa2df792dba44b4ad731c794ff9601e"
);
const web3 = new Web3(provider); // Creates Web3 instance using the provider

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    const contractAddy = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ gas: "1000000", from: accounts[0] });

    console.log("Contract deployed to", contractAddy.options.address);
    provider.engine.stop();
};
deploy();