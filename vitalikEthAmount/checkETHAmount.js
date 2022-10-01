import { ethers } from 'ethers'
const provider = ethers.getDefaultProvider()
const main = async () => {
    let showBalance = []
    const getBalanceOnChain = async (name) => {
        const balance = await provider.getBalance(name)
        showBalance.push({ name: name, balance: balance })
    }
    await getBalanceOnChain(`vitalik.eth`)
    for (const ele of showBalance) {
        console.log(
            `ETH Balance of ${ele.name}: ${ethers.utils.formatEther(
                ele.balance
            )} ETH`
        )
    }
}

main()
