import { ethers } from 'ethers'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import { abiWETH, abiJPYCToken, abiERC20 } from './abis.js'

const provider = new ethers.providers.JsonRpcProvider(process.env.polygon_url)

const network = await provider.getNetwork()
console.log(`Networ now is: ${network.name}`)

const addressJPYC = '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB' // JPYC Contract

// WETH ABI，只包含我们关心的Transfer事件
// const abiWETH = [
//     'event Transfer(address indexed from, address indexed to, uint amount)',
// ]
// 声明合约实例
const contract = new ethers.Contract(addressJPYC, abiERC20, provider)

const main = async () => {
    // 获取过去10个区块内的Transfer事件
    console.log('\n1. 获取过去1800个区块内的Transfer事件，并打印出1个')
    // 得到当前block
    const block = await provider.getBlockNumber()
    console.log(`当前区块高度: ${block}`)
    console.log(`打印事件详情:`)
    const transferEvents = await contract.queryFilter(
        'Transfer',
        block - 90 * 200, // 過去h
        block
    )
    // 打印第1个Transfer事件

    console.log(transferEvents[0])

    let sum = ethers.BigNumber.from(0)
    // console.log(sum)
    // 解析Transfer事件的数据（变量在args中）
    console.log('\n2. 解析事件：')
    for (const ele of transferEvents) {
        const amount = ethers.utils.formatUnits(ele.args['value'], 'ether')
        console.log(
            `送金${amount} JPYC from アドレス ${ele.args['from']}  to アドレス${ele.args['to']}`
        )
        if (ele) {
            sum = sum.add(ethers.BigNumber.from(ele.args['value']))
        }
    }
    const totalValue = Math.floor(Number(ethers.utils.formatEther(sum)))
    console.log(`TOTAL AMOUNT OF JPYC TRANSFERRED: ${totalValue}`)
}

main()
