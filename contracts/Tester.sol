// SPDX-License-Identifier: CC-BY-1.0
pragma solidity ^0.8.17;

import { AxelarExecutable } from "@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";
import { IAxelarGateway } from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
import { IAxelarGasService } from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {
    AuroraSdk,
    Codec,
    NEAR,
    PromiseCreateArgs,
    PromiseResultStatus,
    PromiseWithCallback
} from "./aurora-sdk/AuroraSdk.sol";

import {NearlyIntergalactic} from "./Aurora_XCC.sol";

contract Tester {
    struct Params {
        address senderAddress;
        uint128 attachedNear;
        bytes data;
    }
    NearlyIntergalactic public target;

    constructor(address target_) {
        target = NearlyIntergalactic(target_);
    }

    function send(
        uint128 attachedNear, 
        bytes memory data
    ) external {
        Params memory params = Params(msg.sender, attachedNear, data);
        bytes memory payload = abi.encode(params);
        target.backdoor("aurora", "an-address-yeah", payload);
    }
}