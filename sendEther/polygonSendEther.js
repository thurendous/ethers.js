import pkg from 'ethers'
const { ethers } = pkg
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const privateKey = process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY : ''

// randomなwalletを作成
const randomWallet = new ethers.Wallet.createRandom()

// provider
const provider = new ethers.providers.JsonRpcProvider(process.env.polygon_url)
const network = await provider.getNetwork()
console.log(networkname.name)
// console.log(provider)
// プライベートキーからwalletを作る
const wallet1WithProvider = new ethers.Wallet(randomWallet.privateKey, provider)
const myWallet = new ethers.Wallet(privateKey, provider)
// mnemonic phraseから作成する場合
// const wallet3 = new ethers.Wallet.fromMnemonic(mnemonic.phrase)
// 以下の方法で暗号化されたjsonファイルを使ってwalletインスタンスを作成できる
// ethers.Wallet.fromEncryptedJson

const main = async () => {
    // wallet addressを表示させる
    const address1 = await randomWallet.getAddress()
    const address2 = await myWallet.getAddress()
    // const address3 = await wallet3.getAddress() // 获取地址
    console.log(`1. wallet addressを表示させる`)
    console.log(`钱包1地址: ${address1}`)
    console.log(`钱包2地址: ${address2}`)

    // mnemonic phraseを表示させる
    console.log(
        `ランダムなウォレットのnemonic phrase: ${randomWallet.mnemonic.phrase}`
    )
    const txCount1 = await wallet1WithProvider.getTransactionCount()
    const txCount2 = await myWallet.getTransactionCount()
    console.log(`randomなウォレットのトランザクションの回数: ${txCount1}`)
    console.log(`myWalletのトランザクションの回数: ${txCount2}`)

    // トランザクションを作成，パラメータ：toは受信アドレス，valueはETHの数量
    const tx = {
        to: '0x2b7a3e2e47ed1030a519d52806fc07b8810904f2',
        value: ethers.utils.parseEther('0.0005'),
        gasPrice: '34000000000',
    }

    //トランザクションを送る。レシートをもらう
    const receipt = await myWallet.sendTransaction(tx)
    await receipt.wait() // オンチェーンの確認を待つ
    console.log(receipt) // トランザクションの詳細をコンソールへ表示させる
}

main()
