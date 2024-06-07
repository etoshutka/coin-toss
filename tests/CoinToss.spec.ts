import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { CoinToss } from '../wrappers/CoinToss';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('CoinToss', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('CoinToss');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let coinToss: SandboxContract<CoinToss>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        deployer = await blockchain.treasury('deployer');

        coinToss = blockchain.openContract(CoinToss.createFromConfig({
            owner: deployer.address
        }, code));


        const deployResult = await coinToss.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: coinToss.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and coinToss are ready to use
    });
});
