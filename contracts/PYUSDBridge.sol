// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./wPYUSD.sol";

/**
 * @title PYUSDBridge - Bridge for PYUSD <-> wPYUSD
 * @dev Handles locking PYUSD on Ethereum and minting wPYUSD on World Chain
 */
contract PYUSDBridge is Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;
    
    /// @notice PYUSD token contract (on Ethereum)
    IERC20 public immutable pyusdToken;
    
    /// @notice wPYUSD token contract (on World Chain)
    wPYUSD public immutable wpyusdToken;
    
    /// @notice Minimum bridge amount (to prevent spam)
    uint256 public minBridgeAmount = 1e6; // 1 PYUSD (6 decimals)
    
    /// @notice Maximum bridge amount (for security)
    uint256 public maxBridgeAmount = 1000000e6; // 1M PYUSD
    
    /// @notice Bridge fee (in basis points, 100 = 1%)
    uint256 public bridgeFee = 10; // 0.1%
    
    /// @notice Fee recipient
    address public feeRecipient;
    
    /// @notice Nonce for cross-chain messages
    uint256 public nonce;
    
    /// @notice Mapping to track processed deposits from Ethereum
    mapping(bytes32 => bool) public processedDeposits;
    
    /// @notice Events
    event DepositInitiated(
        address indexed user,
        uint256 amount,
        uint256 fee,
        uint256 netAmount,
        uint256 indexed nonce,
        bytes32 indexed depositHash
    );
    
    event WithdrawalInitiated(
        address indexed user,
        uint256 amount,
        uint256 fee,
        uint256 netAmount,
        uint256 indexed nonce
    );
    
    event DepositCompleted(
        address indexed user,
        uint256 amount,
        bytes32 indexed depositHash
    );
    
    event WithdrawalCompleted(
        address indexed user,
        uint256 amount,
        uint256 indexed nonce
    );
    
    event BridgeConfigUpdated(
        uint256 minAmount,
        uint256 maxAmount,
        uint256 fee,
        address feeRecipient
    );
    
    constructor(
        address _pyusdToken,
        address _wpyusdToken,
        address _feeRecipient
    ) {
        require(_pyusdToken != address(0), "Bridge: Invalid PYUSD address");
        require(_wpyusdToken != address(0), "Bridge: Invalid wPYUSD address");
        require(_feeRecipient != address(0), "Bridge: Invalid fee recipient");
        
        pyusdToken = IERC20(_pyusdToken);
        wpyusdToken = wPYUSD(_wpyusdToken);
        feeRecipient = _feeRecipient;
    }
    
    /**
     * @notice Deposit PYUSD to bridge (Ethereum side)
     * @param amount Amount of PYUSD to bridge
     */
    function depositPYUSD(uint256 amount) external nonReentrant whenNotPaused {
        require(amount >= minBridgeAmount, "Bridge: Amount below minimum");
        require(amount <= maxBridgeAmount, "Bridge: Amount above maximum");
        
        // Calculate fee
        uint256 fee = (amount * bridgeFee) / 10000;
        uint256 netAmount = amount - fee;
        
        // Transfer PYUSD from user
        pyusdToken.safeTransferFrom(msg.sender, address(this), amount);
        
        // Transfer fee to fee recipient
        if (fee > 0) {
            pyusdToken.safeTransfer(feeRecipient, fee);
        }
        
        // Generate deposit hash
        bytes32 depositHash = keccak256(
            abi.encodePacked(
                msg.sender,
                amount,
                netAmount,
                nonce,
                block.timestamp,
                block.chainid
            )
        );
        
        emit DepositInitiated(msg.sender, amount, fee, netAmount, nonce, depositHash);
        nonce++;
    }
    
    /**
     * @notice Complete deposit by minting wPYUSD (World Chain side)
     * @param user User address
     * @param amount Net amount to mint
     * @param depositHash Hash of the original deposit
     */
    function completeDeposit(
        address user,
        uint256 amount,
        bytes32 depositHash
    ) external onlyOwner nonReentrant whenNotPaused {
        require(user != address(0), "Bridge: Invalid user address");
        require(amount > 0, "Bridge: Invalid amount");
        require(!processedDeposits[depositHash], "Bridge: Deposit already processed");
        
        // Mark deposit as processed
        processedDeposits[depositHash] = true;
        
        // Mint wPYUSD to user
        wpyusdToken.mint(user, amount);
        
        emit DepositCompleted(user, amount, depositHash);
    }
    
    /**
     * @notice Initiate withdrawal of wPYUSD (World Chain side)
     * @param amount Amount of wPYUSD to withdraw
     */
    function withdrawWPYUSD(uint256 amount) external nonReentrant whenNotPaused {
        require(amount >= minBridgeAmount, "Bridge: Amount below minimum");
        require(amount <= maxBridgeAmount, "Bridge: Amount above maximum");
        
        // Calculate fee
        uint256 fee = (amount * bridgeFee) / 10000;
        uint256 netAmount = amount - fee;
        
        // Burn wPYUSD from user
        wpyusdToken.burnFrom(msg.sender, amount);
        
        emit WithdrawalInitiated(msg.sender, amount, fee, netAmount, nonce);
        nonce++;
    }
    
    /**
     * @notice Complete withdrawal by releasing PYUSD (Ethereum side)
     * @param user User address
     * @param amount Net amount to release
     * @param withdrawalNonce Nonce of the withdrawal
     */
    function completeWithdrawal(
        address user,
        uint256 amount,
        uint256 withdrawalNonce
    ) external onlyOwner nonReentrant whenNotPaused {
        require(user != address(0), "Bridge: Invalid user address");
        require(amount > 0, "Bridge: Invalid amount");
        
        // Transfer PYUSD to user
        pyusdToken.safeTransfer(user, amount);
        
        emit WithdrawalCompleted(user, amount, withdrawalNonce);
    }
    
    /**
     * @notice Update bridge configuration
     */
    function updateBridgeConfig(
        uint256 _minAmount,
        uint256 _maxAmount,
        uint256 _fee,
        address _feeRecipient
    ) external onlyOwner {
        require(_minAmount > 0, "Bridge: Invalid min amount");
        require(_maxAmount > _minAmount, "Bridge: Invalid max amount");
        require(_fee <= 1000, "Bridge: Fee too high (max 10%)");
        require(_feeRecipient != address(0), "Bridge: Invalid fee recipient");
        
        minBridgeAmount = _minAmount;
        maxBridgeAmount = _maxAmount;
        bridgeFee = _fee;
        feeRecipient = _feeRecipient;
        
        emit BridgeConfigUpdated(_minAmount, _maxAmount, _fee, _feeRecipient);
    }
    
    /**
     * @notice Emergency withdraw (owner only)
     */
    function emergencyWithdraw(address token, uint256 amount) external onlyOwner {
        IERC20(token).safeTransfer(owner(), amount);
    }
    
    /**
     * @notice Pause the bridge
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @notice Unpause the bridge
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @notice Get bridge statistics
     */
    function getBridgeStats() external view returns (
        uint256 totalPYUSDLocked,
        uint256 totalWPYUSDSupply,
        uint256 currentNonce,
        bool isPaused
    ) {
        totalPYUSDLocked = pyusdToken.balanceOf(address(this));
        totalWPYUSDSupply = wpyusdToken.totalSupply();
        currentNonce = nonce;
        isPaused = paused();
    }
}
