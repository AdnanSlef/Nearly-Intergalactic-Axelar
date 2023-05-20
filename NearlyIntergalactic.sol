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

// When making a call to another NEAR contract, you must specify how much NEAR gas
// will be attached to the call (this is simlar to the `gas` argument in the EVM `call` opcode).
// The typical unit of has on Near is the teragas (Tgas), where 1 Tgas = 10^12 gas.
// For example, the block gas limit on NEAR is 1000 Tgas, and the transaction gas limit is 300 Tgas.
uint64 constant SET_NEAR_GAS = 50_000_000_000_000;
uint64 constant SET_CALLBACK_NEAR_GAS = 10_000_000_000_000;

// We use the Open Zeppelin access control feature because the methods of this contract should
// not be open to arbitrary addresses.
contract NearlyIntergalactic is AccessControl, AxelarExecutable {
    using AuroraSdk for NEAR;
    using AuroraSdk for PromiseCreateArgs;
    using AuroraSdk for PromiseWithCallback;
    using Codec for bytes;

    string public sourceChain;
    string public sourceAddress;
    IAxelarGasService public immutable gasService;

    bytes32 public constant CREATOR_ROLE = keccak256("CREATOR_ROLE");
    bytes32 public constant CALLBACK_ROLE = keccak256("CALLBACK_ROLE");

    IERC20 public wNEAR;
    string public socialdbAccountId;
    NEAR public near;

    // Initialize NEARly Intergalactic Axelar Gateway Contract
    constructor(string memory _socialdbAccountId, IERC20 _wNEAR, address gateway_, address gasReceiver_) AxelarExecutable(gateway_) {
        gasService = IAxelarGasService(gasReceiver_);

        socialdbAccountId = _socialdbAccountId;
        near = AuroraSdk.initNear(_wNEAR);
        wNEAR = _wNEAR;

        _grantRole(CREATOR_ROLE, msg.sender);
        _grantRole(CALLBACK_ROLE, AuroraSdk.nearRepresentitiveImplicitAddress(address(this)));
    }

    // Call Near Social
    struct Params {
        address senderAddress;
        uint128 attachedNear;
        bytes data;
    }
    function set(Params memory params) internal {
        PromiseCreateArgs memory callSet =
            near.call(socialdbAccountId, "set", params.data, params.attachedNear, SET_NEAR_GAS);
        PromiseCreateArgs memory callback =
            near.auroraCall(address(this), abi.encodePacked(this.setCallback.selector), 0, SET_CALLBACK_NEAR_GAS);

        callSet.transact();
    }

    // First approve this contract with the wNEAR ERC-20, then call fund
    function fund(uint128 amount) public {
        wNEAR.transferFrom(msg.sender, address(this), amount);
        // TODO per-user funding
    }

    // Handle Axelar GMP receipt
    function _execute(
        string calldata sourceChain_,
        string calldata sourceAddress_,
        bytes calldata payload_
    ) internal override {
        sourceChain = sourceChain_;
        sourceAddress = sourceAddress_;
        Params memory params = abi.decode(payload_, (Params));

        set(params);
    }

    // DEBUG; delete
    function backdoor(
        string calldata sourceChain_,
        string calldata sourceAddress_,
        bytes calldata payload_
    ) public {
        sourceChain = sourceChain_;
        sourceAddress = sourceAddress_;
        Params memory params = abi.decode(payload_, (Params));

        set(params);
    }

    // Handle callback from NEAR
    function setCallback() public onlyRole(CALLBACK_ROLE) {
        if (AuroraSdk.promiseResult(0).status != PromiseResultStatus.Successful) {
            revert("Call to set failed");
        }
    }
}