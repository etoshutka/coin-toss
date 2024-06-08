import { Address, toNano } from '@ton/core';
import { CoinToss } from '../wrappers/CoinToss';
import { compile, NetworkProvider } from '@ton/blueprint';


const CONTRACT_ADDRESS: string = "kQA84cELj9hDE0AZoTfIl3gWVgksVNNko9OoX1zsR3bN2XvL"

export async function run(provider: NetworkProvider) {
    const coinToss = provider.open(CoinToss.createFromAddress(Address.parse(CONTRACT_ADDRESS)));
    const result = await coinToss.getInfo()    

    console.log("available_balance:", result[0]);
    console.log("service_balance:", result[1]);
    console.log("admin_addr:", result[2]);
    console.log("last_number:", result[3]);
    console.log("hash:", result[4]);

    // run methods on `coinToss`
}
