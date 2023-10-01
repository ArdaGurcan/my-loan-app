# LoanSmart

## Try it yourself

```sh
npm install
npx hardhat compile
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
npm start
```


## Inspiration

After watching _The Big Short_ (a movie about the 2008 financial crisis), I realized just how much of an effect the banks have on loans despite supposedly being just a middleman. 
I thought if we turned loans into immutable, objective, yet flexible contracts, we would have a much easier time.

## What it does

1. Initially, a loan in the form of a smart contract is deployed by the lender,specifying the borrower, the principal amount, annual interest rate, loan term, and collateral.
2. Next, the borrower has to pay the collateral. The payment can be completed over any number of transfers.
3. Then the lender needs to put down the initially specified sum of money.
4. The borrower either manages to pay the loan back over time, or the loan defaults.
5. If the loan is paid in time, the lender gets the money, and the collateral is returned to the borrower. Otherwise, the lender keeps the collateral and any additional payments

- Smart contracts offer immutability and transparency, ensuring that these loans are secure, tamper-proof, and executed precisely as agreed, minimizing fraud and enhancing trust among parties.
- Automated execution of the contract and reduction in intermediaries and manual interventions lead to significant time and cost savings, making processes more efficient and streamlined.
- Smart contracts allow for tailored agreements and conditions, and the tokenization of assets can facilitate fractional ownership and investment

## How I built it

I built the contract using the Solidity language and performed extensive tests on Remix to make sure edge cases were covered. The frontend was build using JavaScript and React.JS and it allows the borrower and the lender to interact with the contract.

## Challenges I ran into

I realized despite their simple appearance, the loans had quite complex functionalites as they had to check for many edge cases and sequential action on both parties' sides. Afterwards, integrating the Solidity smart contract into a React frontend was pretty difficult at time.

## Accomplishments that I'm proud of

This was a relatively short hackathon and I'm proud that I was able to start and finish my project within before the submission deadline

## What I learned

I learned a lot about Solidity, React, and most importantly loans.

## What's next for LoanSmart

I'll implement more complex loan functionality to give users more flexibility over the contracts.