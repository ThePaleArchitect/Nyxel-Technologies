// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Escrow {
    address public client;
    address public contractor;
    address public arbiter; // Multi-sig Safe address

    IERC20 public usdc;

    uint256 public totalAmount;
    uint256 public releasedAmount;
    bool public completed;

    struct Milestone {
        string description;
        uint256 amount;
        bool released;
    }

    Milestone[] public milestones;

    event MilestoneReleased(uint256 indexed milestoneId, uint256 amount);
    event EscrowCompleted(uint256 totalReleased);

    constructor(
        address _usdc,
        address _client,
        address _contractor,
        address _arbiter,
        uint256 _totalAmount
    ) {
        usdc = IERC20(_usdc);
        client = _client;
        contractor = _contractor;
        arbiter = _arbiter;
        totalAmount = _totalAmount;
    }

    function deposit() external {
        require(msg.sender == client, "Only client can deposit");
        require(
            usdc.transferFrom(msg.sender, address(this), totalAmount),
            "USDC transfer failed"
        );
    }

    function addMilestone(string memory description, uint256 amount) external {
        require(msg.sender == client || msg.sender == contractor, "Unauthorized");
        milestones.push(
            Milestone({description: description, amount: amount, released: false})
        );
    }

    function releaseMilestone(uint256 milestoneId) external {
        require(msg.sender == arbiter, "Only arbiter can release");
        require(milestoneId < milestones.length, "Invalid milestone");
        require(!milestones[milestoneId].released, "Already released");

        milestones[milestoneId].released = true;
        releasedAmount += milestones[milestoneId].amount;

        require(
            usdc.transfer(contractor, milestones[milestoneId].amount),
            "USDC transfer failed"
        );

        emit MilestoneReleased(milestoneId, milestones[milestoneId].amount);

        if (releasedAmount == totalAmount) {
            completed = true;
            emit EscrowCompleted(releasedAmount);
        }
    }

    function refund() external {
        require(msg.sender == client, "Only client can refund");
        require(!completed, "Already completed");
        uint256 balance = usdc.balanceOf(address(this));
        require(usdc.transfer(client, balance), "USDC refund failed");
    }

    function getBalance() external view returns (uint256) {
        return usdc.balanceOf(address(this));
    }
}
