// ethersをインポート
import { ethers } from 'ethers'
// providerを定義する。こちらではdefaultなproviderを使った。これは読み込み専用のプロバイダー
// リクエストの数量に制限がかかっているので、本当はご自身のRPCを用意してたほうがいい
const provider = ethers.getDefaultProvider()
// 非同期的にイーサのバランスをとってきてくれる関数
const main = async () => {
    const balance = await provider.getBalance(`vitalik.eth`)
    // ターミナルに表示させる
    // `ethers.utils.formatEther`はweiをetherにするための方法
    console.log(
        `ETH Balance of vitalik: ${ethers.utils.formatEther(balance)} ETH`
    )
}

main()
