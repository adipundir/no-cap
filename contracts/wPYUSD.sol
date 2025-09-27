// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title wPYUSD - Wrapped PYUSD on World Chain
 * @dev ERC20 token representing PYUSD locked on Ethereum mainnet
 */
contract wPYUSD is ERC20, ERC20Burnable, Ownable, Pausable {
    /// @notice Bridge contract address (only bridge can mint/burn)
    address public bridge;
    
    /// @notice Decimals for wPYUSD (same as PYUSD - 6 decimals)
    uint8 private constant DECIMALS = 6;
    
    /// @notice Events
    event BridgeUpdated(address indexed oldBridge, address indexed newBridge);
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);
    
    /// @notice Modifiers
    modifier onlyBridge() {
        require(msg.sender == bridge, "wPYUSD: Only bridge can call this function");
        _;
    }
    
    constructor() ERC20("Wrapped PYUSD", "wPYUSD") {
        // Bridge will be set after deployment
    }
    
    /**
     * @notice Set the bridge contract address
     * @param _bridge Address of the bridge contract
     */
    function setBridge(address _bridge) external onlyOwner {
        require(_bridge != address(0), "wPYUSD: Bridge cannot be zero address");
        address oldBridge = bridge;
        bridge = _bridge;
        emit BridgeUpdated(oldBridge, _bridge);
    }
    
    /**
     * @notice Mint wPYUSD tokens (only callable by bridge)
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) external onlyBridge whenNotPaused {
        require(to != address(0), "wPYUSD: Cannot mint to zero address");
        require(amount > 0, "wPYUSD: Amount must be greater than 0");
        
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }
    
    /**
     * @notice Burn wPYUSD tokens (only callable by bridge)
     * @param from Address to burn tokens from
     * @param amount Amount of tokens to burn
     */
    function burnFrom(address from, uint256 amount) public override onlyBridge whenNotPaused {
        require(from != address(0), "wPYUSD: Cannot burn from zero address");
        require(amount > 0, "wPYUSD: Amount must be greater than 0");
        
        super.burnFrom(from, amount);
        emit TokensBurned(from, amount);
    }
    
    /**
     * @notice Get token decimals
     */
    function decimals() public pure override returns (uint8) {
        return DECIMALS;
    }
    
    /**
     * @notice Pause the contract (emergency function)
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @notice Unpause the contract
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @notice Override transfer to add pause functionality
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
}
