// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { AxelarExecutable  } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol';
import { IAxelarGateway    } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol';
import { IAxelarGasService } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol';
import { IERC20            } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol';

contract HomePlanet is AxelarExecutable {
    struct Params {
        address senderAddress;
        uint128 attachedNear;
        bytes data;
    }

    bool public visitedAvalancheStamp;
    bool public visitedAxelarStamp;

    IAxelarGasService public immutable gasService;

    // Initialize GMP Originator Contract
    constructor(address gateway_, address gasReceiver_) AxelarExecutable(gateway_) {
        gasService = IAxelarGasService(gasReceiver_);

        // Stamp Intergalactic Passport
        visitedAvalancheStamp = true;
    }

    // Make a cross-chain call using Axelar, all the way to the NEAR blockahin
    function travelToNear(
        string calldata destinationChain,
        string calldata destinationAddress,
        uint128 attachedNear,
        bytes memory data
    ) external payable {
        Params memory params = Params(msg.sender, attachedNear, data);
        bytes memory payload = abi.encode(params);

        // Pay for gas using attached value
        if (msg.value > 0) {
            gasService.payNativeGasForContractCall{ value: msg.value }(
                address(this),
                destinationChain,
                destinationAddress,
                payload,
                msg.sender
            );
        }

        // Perform cross-chain contract call
        gateway.callContract(destinationChain, destinationAddress, payload);

        // Stamp Intergalactic Passport
        visitedAxelarStamp = true;
    }
}