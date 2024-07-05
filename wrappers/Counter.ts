import { Contract, ContractProvider, Sender, Address, Cell, contractAddress, beginCell } from "@ton/core";

export default class Counter implements Contract {
    static createForDeploy(code: Cell, initialCounterValue: number) {
        const data = beginCell()
                        .storeUint(initialCounterValue, 64)
                        .endCell();

        const workChain = 0;
        const address = contractAddress(workChain, { code, data });

        return new Counter(address, { code, data });
    }

    constructor(readonly address: Address, readonly init?: { code: Cell, data: Cell }) {}

    async sendDeploy(provider: ContractProvider, via: Sender) {
        await provider.internal(via, {
            value: "0.01",
            bounce: false
        });
    }
}