// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { AxelarExecutable  } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol';
import { IAxelarGateway    } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol';
import { IAxelarGasService } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol';
import { IERC20            } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol';

contract ExecutableSample is AxelarExecutable {
    struct Params {
        address senderAddress;
        uint128 attachedNear;
        bytes data;
    }

    IAxelarGasService public immutable gasService;

    constructor(address gateway_, address gasReceiver_) AxelarExecutable(gateway_) {
        gasService = IAxelarGasService(gasReceiver_);
    }

    // Call this function to update the value of this contract along with all its siblings'.
    function send(
        string calldata destinationChain,
        string calldata destinationAddress,
        uint128 attachedNear,
        bytes memory data
    ) external payable {
        Params memory params = Params(msg.sender, attachedNear, data);
        bytes memory payload = abi.encode(params);
        if (msg.value > 0) {
            gasService.payNativeGasForContractCall{ value: msg.value }(
                address(this),
                destinationChain,
                destinationAddress,
                payload,
                msg.sender
            );
        }
        gateway.callContract(destinationChain, destinationAddress, payload);
    }
}