// SPDX-License-Identifier: CC-BY-1.0
pragma solidity ^0.8.17;

import { AxelarExecutable  } from "@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";
import { IAxelarGateway    } from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
import { IAxelarGasService } from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";
import { AccessControl     } from "@openzeppelin/contracts/access/AccessControl.sol";
import { IERC20            } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {
    AuroraSdk,
    Codec,
    NEAR,
    PromiseCreateArgs,
    PromiseResultStatus,
    PromiseWithCallback
} from "./CustomAuroraSdk.sol";

// The amount of NEAR gas attached to each call
uint64 constant SET_NEAR_GAS = 50_000_000_000_000;
uint64 constant SET_CALLBACK_NEAR_GAS = 10_000_000_000_000;

// We use the Open Zeppelin access control feature for security
contract NearlyIntergalactic is AccessControl, AxelarExecutable {
    using AuroraSdk for NEAR;
    using AuroraSdk for PromiseCreateArgs;
    using AuroraSdk for PromiseWithCallback;
    using Codec for bytes;

    struct Params {
        address senderAddress;
        uint128 attachedNear;
        bytes data;
    }

    bool public visitedAuroraStamp;

    IAxelarGasService public immutable gasService;

    bytes32 public constant CREATOR_ROLE  = keccak256("CREATOR_ROLE");
    bytes32 public constant CALLBACK_ROLE = keccak256("CALLBACK_ROLE");

    IERC20 public wNEAR;
    string public socialdbAccountId;
    NEAR public near;

    // Initialize NEARly Intergalactic Axelar Contract
    constructor(string memory _socialdbAccountId, IERC20 _wNEAR, address gateway_, address gasReceiver_) AxelarExecutable(gateway_) {
        gasService = IAxelarGasService(gasReceiver_);

        socialdbAccountId = _socialdbAccountId;
        near = AuroraSdk.initNear(_wNEAR);
        wNEAR = _wNEAR;

        _grantRole(CREATOR_ROLE, msg.sender);
        _grantRole(CALLBACK_ROLE, AuroraSdk.nearRepresentitiveImplicitAddress(address(this)));
    }

    // Pass along the message to a native NEAR blockchain application, Near Social
    function nearGMP(Params memory params) internal {
        // Prepare call chain
        PromiseCreateArgs memory callSet =
            near.call(socialdbAccountId, "set", params.data, params.attachedNear, SET_NEAR_GAS);
        PromiseCreateArgs memory callback =
            near.auroraCall(address(this), abi.encodePacked(this.setCallback.selector), 0, SET_CALLBACK_NEAR_GAS);

        // Make XCC call through NEAR blockchain
        callSet.then(callback).transact();
    }

    // First approve this contract with the wNEAR ERC-20, then call fund
    function fund(uint128 amount) public {
        wNEAR.transferFrom(msg.sender, address(this), amount);
    }

    // Handle Axelar GMP receipt
    function _execute(
        string calldata sourceChain_,
        string calldata sourceAddress_,
        bytes calldata payload_
    ) internal override {
        string memory sourceChain = sourceChain_;
        string memory sourceAddress = sourceAddress_;
        Params memory params = abi.decode(payload_, (Params));

        // Stamp Intergalactic Passport
        visitedAuroraStamp = true;

        // Extend General Message Passing to NEAR blockchain!
        nearGMP(params);
    }

    // Handle callback from NEAR
    function setCallback() public onlyRole(CALLBACK_ROLE) {
        if (AuroraSdk.promiseResult(0).status != PromiseResultStatus.Successful) {
            revert("Call to set failed");
        }
    }
}