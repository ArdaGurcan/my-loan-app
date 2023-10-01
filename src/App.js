import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import logo from './logo.png';
// Replace with your contract's ABI
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_borrower",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_principal",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_interestRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_durationInDays",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_collateral",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "LogLoan",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "calculateInterest",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "depositCollateral",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBorrower",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getLender",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "hasDefaulted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isFinished",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isRepaid",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "liquidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "loan",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "repay",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]
// Replace with your contract's deployed address
const contractAddress = "0x09635F643e140090A9A8Dcd712eD6285858ceBef";

// function App() {
//     const [provider, setProvider] = useState(null);
//     const [contract, setContract] = useState(null);

//     useEffect(() => {
//         if (window.ethereum) {
//             const provider = new ethers.providers.Web3Provider(window.ethereum);
//             setProvider(provider);
//             const contract = new ethers.Contract(contractAddress, contractABI, provider);
//             setContract(contract);
//         } else {
//             console.warn("No wallet detected!");
//         }
//     }, []);

//     return (
//         <div className="App">
//             {contract && (
//                 <>
//                     <InterestCalculator contract={contract} />
//                     <Lender contract={contract} />
//                     <Borrower contract={contract} />
//                 </>
//             )}
//         </div>
//     );
// }

// function InterestCalculator({ contract }) {
//     const [interest, setInterest] = useState(0);

//     const calculateInterest = async () => {
//         try {
//             const interest = await contract.calculateInterest();
//             setInterest(interest.toString());
//         } catch (error) {
//             console.error("Error in calculating interest", error);
//         }
//     };

//     return (
//         <div>
//             <h2>Interest Calculator</h2>
//             <button onClick={calculateInterest}>Calculate Interest</button>
//             <p>Interest: {ethers.utils.formatEther(interest)} Ether</p>
//         </div>
//     );
// }

// function Lender({ contract }) {
//   const loan = async () => {
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner()                                     // signs

//       const contract = new ethers.Contract(contractAddress, contractABI, signer) // notice how it is "signer" for a change on the blockchain
//       // const transaction = await contract.setGreeting(greeting)
//       const tx = await contract.loan({ value: ethers.utils.parseEther("1.0") });

//       const receipt = await tx.wait();
//       console.log("Transaction Receipt:", receipt);

//     } catch (error) {
//       console.error("Error in Loan", error);
//     }

//   };
//   const liquidate = async () => {
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner()                                     // signs

//       const contract = new ethers.Contract(contractAddress, contractABI, signer)
//       const tx = await contract.liquidate();
//       await tx.wait();
//       console.log("Liquidation Successful");
//     } catch (error) {
//       console.error("Error in Liquidation", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Lender</h2>
//       <button onClick={loan}>Loan</button>
//       <button onClick={liquidate}>Liquidate</button>
//     </div>
//   );
// }

// function Borrower({ contract }) {
//   const depositCollateral = async () => {
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner()                                     // signs

//       const contract = new ethers.Contract(contractAddress, contractABI, signer)
//       const tx = await contract.depositCollateral({ value: ethers.utils.parseEther("1.0") }); // Adjust value as needed
//       await tx.wait();
//       console.log("Collateral Deposited Successfully");
//     } catch (error) {
//       console.error("Error in depositing Collateral", error);
//     }
//   };

//   const repay = async () => {
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner()                                     // signs

//       const contract = new ethers.Contract(contractAddress, contractABI, signer)
//       const tx = await contract.repay({ value: ethers.utils.parseEther("1.0") }); // Adjust value as needed
//       await tx.wait();
//       console.log("Repay Successful");
//     } catch (error) {
//       console.error("Error in Repay", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Borrower</h2>
//       <button onClick={depositCollateral}>Deposit Collateral</button>
//       <button onClick={repay}>Repay</button>
//     </div>
//   );
// }

// export default App;





function App() {
  const [account, setAccount] = useState('');
  const [loanContract, setLoanContract] = useState(null);
  const [repayAmount, setRepayAmount] = useState('');
  const [collateralDepositAmount, setCollateralDepositAmount] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [borrower, setBorrower] = useState('')
  const [lender, setLender] = useState('')
  const [principal, setPrincipal] = useState('')
  const [balance, setBalance] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [repayBy, setRepayBy] = useState('')
  const [collateral, setCollateral] = useState('')
  const [collateralBalance, setCollateralBalance] = useState('')
  const [done, setDone] = useState(0)
  const regex = /reverted with reason string '([^']+)'"/;


  // // Replace with your contract address and ABI
  // const contractAddress = 'YOUR_CONTRACT_ADDRESS';
  // const contractABI = [/* Your Contract ABI */];

  useEffect(() => {
    getInfo()
    getBorrower()
    getLender()
    const loadBlockchainData = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setLoanContract(contract);

        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

          setAccount(accounts[0]);
        } catch (err) {
          console.error("User denied account access:", err);
        }
      } else {
        console.error("Ethereum browser not detected. Consider installing MetaMask!");
      }
    };

    loadBlockchainData();
  }, [contractAddress, contractABI]);

  const handleLoan = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()                                     // signs

      const contract = new ethers.Contract(contractAddress, contractABI, signer)
      const transaction = await loanContract.loan({ value: ethers.utils.parseEther(loanAmount) });
      await transaction.wait();
      getInfo();
    } catch (error) {
      console.log(done)
      format(error)
    }
  };

  const handleRepay = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()                                     // signs

      const contract = new ethers.Contract(contractAddress, contractABI, signer)
      const transaction = await loanContract.repay({ value: ethers.utils.parseEther(repayAmount) });
      await transaction.wait();
      getInfo();
    } catch (error) {
      format(error)
    }
  };

  const handleDepositCollateral = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()                                     // signs

      const contract = new ethers.Contract(contractAddress, contractABI, signer)
      const transaction = await loanContract.depositCollateral({ value: ethers.utils.parseEther(collateralDepositAmount) });
      await transaction.wait();
      getInfo();
    } catch (error) {
      format(error)
    }
  };

  const handleLiquidate = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()                                     // signs

    const contract = new ethers.Contract(contractAddress, contractABI, signer)
    try {
      const transaction = await loanContract.liquidate();
      await transaction.wait();
      getInfo();
      checkDone();
    } catch (e) {
      format(e)
    }
  };

  const checkDone = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(contractAddress, contractABI, provider)
    try {
      const done = await contract.isFinished();
      setDone(done.toString());

    } catch (e) {
      format(e)
    }
  }
  const format = (e) => {
    const startStr = "reverted with reason string '";
    const endStr = "'\"";
    let errorString = e.toString()
    const startIndex = errorString.indexOf(startStr);

    if (startIndex !== -1) {
      const substring = errorString.substring(startIndex + startStr.length);
      const endIndex = substring.indexOf(endStr);

      if (endIndex !== -1) {
        const result = substring.substring(0, endIndex);
        alert(result); // Should print: Loan hasn't been repaid yet
      } else {
        console.error(e);
      }
    } else {
      console.log(e);
    }
  }
  const getInfo = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(contractAddress, contractABI, provider)
    try {
      const [principal, balance, interestRate, repayBy, collateral, collateralBalance] = await contract.getInfo();
      setPrincipal((principal * (10 ** (-18))));
      setBalance(balance.toString() * (10 ** (-18)));
      setInterestRate((interestRate / 100).toString());
      setRepayBy(timeConverter(repayBy));
      setCollateral(collateral * (10 ** (-18)));
      setCollateralBalance(collateralBalance * (10 ** (-18)));

    } catch (e) {
      format(e)
    }
  };
  const getBorrower = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(contractAddress, contractABI, provider)
    try {
      const borrower = await contract.getBorrower();
      setBorrower(borrower);
    } catch (e) {
      format(e)
    }
  };
  const getLender = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(contractAddress, contractABI, provider)
    try {
      const lender = await contract.getLender();
      setLender(lender);
    } catch (e) {
      format(e)
    }
  };
  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year;
    return time;
  }

  console.log("acc: " + account);
  console.log("borr: " + borrower);
  console.log("lend: " + lender);
  console.log(done)
  if (done === 0) {
    if (account.toLowerCase() == lender.toLowerCase()) {
      return (
        <div>
          <img src={logo}></img>
          <h1>Lender</h1>
          <p><b>Principal Amount:</b> {principal} ETH</p>
          <p><b>Money Owed:</b> {balance} ETH</p>
          <p><b>Annual Interest Rate:</b> {interestRate}%</p>
          <p><b>Repay By:</b> {repayBy}</p>
          <p><b>Collateral</b>: {collateralBalance} ETH paid / {collateral} ETH Total</p>
          <input type="text" placeholder="Loan Amount" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
          <button onClick={handleLoan}><b>Give Loan</b></button>
          <br />
          <br />
          <button onClick={handleLiquidate}><b>Liquidate</b></button>
          <br />
          <br />


        </div>)
    } else if (account.toLowerCase() == borrower.toLowerCase()) {
      return (
        <div>
          <img src={logo}></img>
          <h1>Borrower</h1>

          <p><b>Principal Amount:</b> {principal} ETH</p>
          <p><b>Money Owed:</b> {balance} ETH</p>
          <p><b>Annual Interest Rate:</b> {interestRate}%</p>
          <p><b>Repay By:</b> {repayBy}</p>
          <p><b>Collateral:</b> {collateralBalance} ETH paid / {collateral} ETH Total</p>
          <input type="text" placeholder="Collateral Amount" value={collateralDepositAmount} onChange={(e) => setCollateralDepositAmount(e.target.value)} />
          <button onClick={handleDepositCollateral}><b>Deposit Collateral</b></button>
          <br />
          <br />
          <input type="text" placeholder="Repay Amount" value={repayAmount} onChange={(e) => setRepayAmount(e.target.value)} />
          <button onClick={handleRepay}><b>Repay Loan</b></button>
          <br />
          <br />
        </div>

      );
    } else {
      return (
        <div>
          <img src={logo}></img>
          <h1>No access</h1>
        </div>
      )
    }
  } else {


    return (
      <div>
        <h2>Loan completed. Please create a new contract</h2>
      </div>
    )
  }
}

export default App;