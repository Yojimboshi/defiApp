import { ethers } from 'ethers';
import { useEffect } from 'react'; 
import numberGameAbi from '../../data/abi/numberGameAbi.json';
import { numberGameAddress } from '../../config/setting';
import { useWallet } from '../../context/walletContext';

export default function useNumberGame() {
    const { account } = useWallet();
    let contract;

    useEffect(() => {
        if (window.ethereum && account) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            contract = new ethers.Contract(numberGameAddress, numberGameAbi, signer);
        } else {
            console.error('MetaMask extension not found or account not connected.');
        }
    }, [account]);

    const joinGame = async (entryBet) => {
        try {
            const valueToSend = ethers.utils.parseEther(entryBet); 
            const tx = await contract.joinGame({ value: valueToSend, gasLimit: 100000 });
            await tx.wait();
        } catch(error) {
            alert(error);
        }
    };

    async function guess(betValue, playerGuess){
        try{
            const valueToSend = ethers.utils.parseEther(betValue); 
            const guessing = await contract
            .makeGuess(playerGuess, { value: valueToSend, from: defaultAccount, gasLimit: 120000})
            await guessing.wait();
        }catch(error){
            alert(error);
            }
        
    } 
    
    async function withdraw(){
        try{
            await contract.withdraw({from:defaultAccount, gasLimit: 100000});
        } catch(error){
            alert(error);
        }
    }
    return { joinGame, guess, withdraw };
}