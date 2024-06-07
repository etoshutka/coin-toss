import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type CoinTossConfig = {
    owner: Address;
};

export function coinTossConfigToCell(config: CoinTossConfig): Cell {
    return beginCell().storeAddress(config.owner).endCell();
}

export class CoinToss implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new CoinToss(address);
    }

    static createFromConfig(config: CoinTossConfig, code: Cell, workchain = 0) {
        const data = coinTossConfigToCell(config);
        const init = { code, data };
        return new CoinToss(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

}
