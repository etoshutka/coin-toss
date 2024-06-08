import { Address, toNano } from '@ton/core';
import { CoinToss } from '../wrappers/CoinToss';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const coinToss = provider.open(CoinToss.createFromConfig({
        available_balance : toNano("2"),
        service_balance: toNano("1"),
        admin_addr: provider.sender().address as Address,
        last_number: 1n,
        hash: 256n
    }, await compile('CoinToss')));

    await coinToss.sendDeploy(provider.sender(), toNano('1'));

    await provider.waitForDeploy(coinToss.address);

    // run methods on `coinToss`
}
