import { Address, beginCell, toNano } from '@ton/core';
import { CoinToss } from '../wrappers/CoinToss';
import { NetworkProvider } from '@ton/blueprint';

const CONTRACT_ADDRESS: string = "kQA84cELj9hDE0AZoTfIl3gWVgksVNNko9OoX1zsR3bN2XvL";
const ADDRESS: string = "UQDlyGIved5xvnBXLxTeUs0ZN2q-2UafjwYVr9dHz5ElURpi";

export async function run(provider: NetworkProvider) {
    const Contract = provider.open(CoinToss.createFromAddress(Address.parse(CONTRACT_ADDRESS)));
    await Contract.sendMaintain(provider.sender(),
      Address.parse(ADDRESS)
    );
}
