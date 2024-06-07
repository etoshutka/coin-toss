import { Address, toNano } from '@ton/core';
import { CoinToss } from '../wrappers/CoinToss';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const coinToss = provider.open(CoinToss.createFromConfig({
        owner: Address.parse('UQDlyGIved5xvnBXLxTeUs0ZN2q-2UafjwYVr9dHz5ElURpi')
    }, await compile('CoinToss')));

    await coinToss.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(coinToss.address);

    // run methods on `coinToss`
}
