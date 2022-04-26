const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile")

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  // web3.eth.getAccounts()
  //   .then(fetchedAccounts => {
  //     console.log(fetchedAccounts);
  //   });

  //async await refactor
  accounts = await web3.eth.getAccounts();

  //then deploy contracts using one of the fetched accounts
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi There!"]
    })
    .send({
      from: accounts[0],
      gas: "1000000"
    })
});

describe("Inbox", () => {
  it("Deploys a Contract", () => {
    // console.log(inbox);
    assert.ok(inbox.options.address); // checks truthiness
  });

  it("Has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hi There!");
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("bye").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "bye");
  });
});
