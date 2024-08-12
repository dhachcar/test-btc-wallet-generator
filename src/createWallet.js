const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// definição da rede do bitcoin
const network = bitcoin.networks.testnet

// 1-0-0 (1 = testnet, 0 = mainnet)
const path = `m/49'/1'/0'/0`

// criação do seed da carteira, utilizando mnemonics
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// definição da raiz da carteira HD (Hierarchical Deterministic Wallet)
let root = bip32.fromSeed(seed, network)

// criação da conta na rede testnet do bitcoin (par de private e public keys) - carteira raiz
let account = root.derivePath(path)

// carteira nó (filha da raiz)
let node = account.derive(0).derive(0)

// wallet
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
})

console.log('Carteira gerada!')
console.log('Endereço:', btcAddress.address)
console.log('Chave privada:', node.toWIF())
console.log('Seed:', mnemonic)
