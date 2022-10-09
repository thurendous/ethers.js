import { ethers } from 'ethers'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import { abiWETH, abiERC20 } from './abis.js'

const provider = new ethers.providers.JsonRpcProvider(process.env.polygon_url)

const addressJPYC = '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB' // DAI Contract
const addressWETH = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619' // WETH Contract
const contractWETH = new ethers.Contract(addressWETH, abiWETH, provider)

// connect with polygon

const contractJPYC = new ethers.Contract(addressJPYC, abiERC20, provider)

const main = async () => {
    // 1. 读取WETH合约的链上信息（WETH abi）
    const nameWETH = await contractWETH.name()
    const symbolWETH = await contractWETH.symbol()
    const totalSupplyWETH = await contractWETH.totalSupply()
    console.log('\n1. WETHコントラクトの情報を読み込み中。。。')
    console.log(`コントラクトアドレス: ${addressWETH}`)
    console.log(`名前: ${nameWETH}`)
    console.log(`シンボル: ${symbolWETH}`)
    console.log(`総供給量: ${ethers.utils.formatEther(totalSupplyWETH)}`)
    let balanceOfHolder = await contractWETH.balanceOf(
        `0x41EfF4e547090fBD310099Fe13d18069C65dfe61`
    )
    console.log(
        `とあるホルダーが持つWETH：${ethers.utils.formatEther(balanceOfHolder)}`
    )

    // const balanceWETH = await contractWETH.balanceOf('vitalik.eth')
    // console.log(`Vitalik持仓: ${ethers.utils.formatEther(balanceWETH)}\n`)

    // 2. 读取DAI合约的链上信息（IERC20接口合约）
    const nameDAI = await contractJPYC.name()
    const symbolDAI = await contractJPYC.symbol()
    const totalSupplDAI = await contractJPYC.totalSupply()
    console.log('\n2. JPYCコントラクトの情報を読み込み中。。。')
    console.log(`コントラクトアドレス: ${addressJPYC}`)
    console.log(`名前: ${nameDAI}`)
    console.log(`シンボル: ${symbolDAI}`)
    console.log(`総供給量: ${ethers.utils.formatEther(totalSupplDAI)}`)
    balanceOfHolder = await contractJPYC.balanceOf(
        `0x41EfF4e547090fBD310099Fe13d18069C65dfe61`
    )
    console.log(
        `とあるホルダーが持つJPYC：${ethers.utils.formatEther(balanceOfHolder)}`
    )
    // const balanceDAI = await contractJPYC.balanceOf('vitalik.eth')
    // console.log(`Vitalik持仓: ${ethers.utils.formatEther(balanceDAI)}\n`)
}

main()
