import { Address, toNano } from '@ton/core';
import { CoinToss } from '../wrappers/CoinToss';
import { NetworkProvider } from '@ton/blueprint';

const CONTRACT_ADDRESS: string = "kQA84cELj9hDE0AZoTfIl3gWVgksVNNko9OoX1zsR3bN2XvL";

export async function run(provider: NetworkProvider) {
    const Contract = provider.open(CoinToss.createFromAddress(Address.parse(CONTRACT_ADDRESS)));
    await Contract.sendWithdraw(provider.sender(), 
        toNano("0.01")
    )
}
