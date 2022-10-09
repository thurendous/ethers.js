// ethersをimport
import { ethers } from 'ethers'
// providerを作成する、 デフォルトなproviderを利用
const provider = ethers.getDefaultProvider()
// 非同期的なmain関数にする
const main = async () => {
    // showBalanceという配列を作成
    let showBalance = []
    // getBalance
    const getBalanceOnChain = async (name) => {
        const balance = await provider.getBalance(name)
        showBalance.push({ name: name, balance: balance })
    }
    await getBalanceOnChain(`vitalik.eth`)
    await getBalanceOnChain(`hiro.eth`)
    for (const ele of showBalance) {
        console.log(
            `ETH Balance of ${ele.name}: ${ethers.utils.formatEther(
                ele.balance
            )} ETH`
        )
    }
}

main()
