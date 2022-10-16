import { ethers } from 'ethers'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import { abiWETH, abiJPYCToken, abiERC20 } from './abis.js'

const provider = new ethers.providers.JsonRpcProvider(process.env.polygon_url)

const network = await provider.getNetwork()
console.log(`Network now is: ${network.name}`)

const addressUSDT = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F'
const contractUSDT = new ethers.Contract(addressUSDT, abiERC20, provider)

const addressJPYC = '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB' // JPYC Contract
const contractJPYC = new ethers.Contract(addressJPYC, abiERC20, provider)

// 監視は一回だけ
// console.log(
//     '\n1. contract.once()を使って一回だけのTransferイベントをリスニング'
// )
// contractUSDT.once('Transfer', (from, to, value) => {
//     // 打印结果
//     console.log(
//         `${from} -> ${to} ${ethers.utils.formatUnits(
//             ethers.BigNumber.from(value),
//             18
//         )} JPYC`
//     )
// })

// JPYC継続監視
console.log('\n2. contract.on()を使ってイベントを継続してリスニング')
contractJPYC.on('Transfer', (from, to, value) => {
    let balance = ethers.utils.formatUnits(ethers.BigNumber.from(value), 18)
    if (Number(balance) > 3000)
        console.log(
            // 打印结果
            `${from} -> ${to} ${ethers.utils.formatUnits(
                ethers.BigNumber.from(value),
                18
            )} JPYC`
        )
})

// USDT継続監視
// console.log('\n2. contract.on()を使ってイベントを継続してリスニング')
// contractUSDT.on('Transfer', (from, to, value) => {
//     let balance = ethers.utils.formatUnits(ethers.BigNumber.from(value), 6)
//     if (Number(balance) > 3000)
//         console.log(
//             // 打印结果
//             `${from} -> ${to} ${ethers.utils.formatUnits(
//                 ethers.BigNumber.from(value),
//                 6
//             )}`
//         )
// })
