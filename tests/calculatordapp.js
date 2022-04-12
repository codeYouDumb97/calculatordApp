const anchor = require('@project-serum/anchor');
const {SystemProgram} = anchor.web3;

describe('Calculator dApp', () => {
  const provider = anchor.Provider.local();
  anchor.setProvider(provider);

  const calculator = anchor.web3.Keypair.generate();
  const program = anchor.workspace.Calculatordapp;
 

  it('Creates a calculator', async () => {
    await program.rpc.create("Welcome to Solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers:[calculator]
    });

    _calculator = calculator;
  });

  it("Adds two numbers", async function() {
    const calculator = _calculator;

    await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      }
    })
    const account = await program.account.calculator.fetch(calculator.publicKey);
    console.log(account.result)
  });

  it('Multiplies two numbers', async function() {
    const calculator = _calculator;

    await program.rpc.multiply(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      }
    })

    const account = await program.account.calculator.fetch(calculator.publicKey);
    console.log(account.result)
  })

  it('Subtracts two numbers', async function() {
    const calculator = _calculator;

    await program.rpc.subtract(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      }
    })

    const account = await program.account.calculator.fetch(calculator.publicKey);
    console.log(account.result)
  });

  it('Divides two numbers', async function() {
    const calculator = _calculator;
     
    await program.rpc.divide(new anchor.BN(10), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      }
    })

    const account = await program.account.calculator.fetch(calculator.publicKey);
    console.log(account.result, account.remainder)
  });
});