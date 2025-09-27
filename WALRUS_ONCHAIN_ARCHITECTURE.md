# NOCAP: Walrus + On-Chain Hybrid Architecture

## 🏗️ **Hybrid Storage Strategy**

### **Data Storage Split:**
- **On-Chain (World Chain)**: Minimal metadata, voting data, user profiles, verification proofs
- **Off-Chain (Walrus)**: Full fact content, descriptions, sources, media, comments

### **Benefits:**
- ✅ **Cost Efficient**: Minimal on-chain storage costs
- ✅ **Scalable**: Unlimited content size on Walrus
- ✅ **Immutable**: Content integrity via Walrus blob IDs
- ✅ **Decentralized**: No centralized database dependency
- ✅ **Fast**: Quick on-chain queries for metadata

---

## 📊 **Schema Design**

### **On-Chain Contract Schema**

```solidity
// Minimal on-chain fact reference
struct FactReference {
    uint256 id;                    // Sequential fact ID
    address submitter;             // Who submitted this fact
    string walrusBlobId;           // Walrus blob ID containing full content
    bytes32 contentHash;           // SHA256 hash for integrity verification
    uint256 stakeAmount;           // ETH staked by submitter
    uint256 votesTrue;             // Count of TRUE votes
    uint256 votesFalse;            // Count of FALSE votes
    uint256 totalStaked;           // Total ETH staked on votes
    bool resolved;                 // Whether fact is resolved
    bool outcome;                  // Final outcome (true/false)
    uint256 createdAt;             // Creation timestamp
    uint256 deadline;              // Voting deadline
    uint256 rewardPool;            // Available rewards
    uint8 category;                // Fact category (0-255)
    uint8 priority;                // Priority level (0-255)
}

// Minimal vote record
struct Vote {
    address voter;                 // Who voted
    bool vote;                     // Their vote (true/false)
    uint256 stakeAmount;           // ETH staked on this vote
    uint256 timestamp;             // When they voted
}

// User profile (unchanged)
struct UserProfile {
    bool isVerified;
    uint256 reputation;
    uint256 factsSubmitted;
    uint256 factsVerified;
    uint256 factsFalse;
    uint256 votesCorrect;
    uint256 votesIncorrect;
    uint256 totalStaked;
    uint256 rewardsEarned;
    uint256 joinedAt;
    uint256 lastActive;
}
```

### **Walrus Storage Schema**

```typescript
// Full fact content stored on Walrus
interface WalrusFactContent {
  // Metadata
  factId: number;                  // Links to on-chain FactReference
  version: number;                 // Content version
  createdAt: string;               // ISO timestamp
  updatedAt: string;               // ISO timestamp
  
  // Content
  title: string;                   // Fact title (max 200 chars)
  description: string;             // Full description (unlimited)
  summary: string;                 // Short summary (max 500 chars)
  
  // Evidence
  sources: WalrusSource[];         // Supporting sources
  media: WalrusMedia[];            // Images, videos, documents
  tags: string[];                  // Categorization tags
  
  // Metadata
  language: string;                // Content language (ISO 639-1)
  contentType: 'text' | 'rich';   // Plain text or rich content
  
  // Integrity
  checksum: string;                // Content checksum
  signature?: string;              // Optional submitter signature
}

interface WalrusSource {
  url: string;                     // Source URL
  title: string;                   // Source title
  description?: string;            // Source description
  accessedAt: string;              // When source was accessed
  archived?: boolean;              // Whether source is archived
  archiveUrl?: string;             // Archive.org or similar URL
}

interface WalrusMedia {
  type: 'image' | 'video' | 'document' | 'audio';
  walrusBlobId: string;            // Walrus blob ID for media file
  filename: string;                // Original filename
  mimeType: string;                // MIME type
  size: number;                    // File size in bytes
  description?: string;            // Media description
  thumbnail?: string;              // Thumbnail Walrus blob ID
}

// Comments stored separately on Walrus
interface WalrusCommentThread {
  factId: number;                  // Links to fact
  comments: WalrusComment[];       // All comments for this fact
  totalComments: number;           // Comment count
  lastUpdated: string;             // Last update timestamp
}

interface WalrusComment {
  id: string;                      // Unique comment ID
  author: string;                  // Commenter address
  content: string;                 // Comment text
  timestamp: string;               // When posted
  parentId?: string;               // For threaded comments
  votes: {                         // Comment voting
    up: number;
    down: number;
  };
  edited?: boolean;                // Whether comment was edited
  editedAt?: string;               // Edit timestamp
}
```

---

## 🔄 **Data Flow Architecture**

### **Fact Submission Flow**

```typescript
// 1. Frontend: User submits fact
const factData: WalrusFactContent = {
  factId: 0, // Will be set after on-chain creation
  title: "Ethereum Cancun upgrade reduced gas fees",
  description: "The Ethereum Cancun upgrade, implemented in March 2024...",
  sources: [
    {
      url: "https://ethereum.org/en/history/#cancun",
      title: "Ethereum.org - Cancun Upgrade",
      accessedAt: new Date().toISOString()
    }
  ],
  // ... other fields
};

// 2. Store content on Walrus
const walrusBlobId = await walrus.store(factData);
const contentHash = sha256(JSON.stringify(factData));

// 3. Submit reference to contract
const tx = await contract.submitFactReference(
  walrusBlobId,
  contentHash,
  votingPeriodHours,
  category,
  { value: stakeAmount }
);

// 4. Update Walrus content with factId
factData.factId = tx.factId;
await walrus.update(walrusBlobId, factData);
```

### **Fact Retrieval Flow**

```typescript
// 1. Load fact references from contract
const factRefs = await contract.loadAllFactReferences();

// 2. Batch load content from Walrus
const factContents = await Promise.all(
  factRefs.map(ref => walrus.retrieve(ref.walrusBlobId))
);

// 3. Combine on-chain + off-chain data
const completeFacts = factRefs.map((ref, i) => ({
  ...ref,                    // On-chain metadata
  content: factContents[i]   // Walrus content
}));
```

### **Voting Flow**

```typescript
// 1. User votes (only on-chain transaction)
await contract.voteFact(factId, vote, { value: stakeAmount });

// 2. Comments stored separately on Walrus
if (comment) {
  const commentThread = await walrus.retrieve(commentThreadBlobId) || {
    factId,
    comments: [],
    totalComments: 0
  };
  
  commentThread.comments.push({
    id: generateId(),
    author: userAddress,
    content: comment,
    timestamp: new Date().toISOString()
  });
  
  await walrus.store(commentThread);
}
```

---

## 🔧 **Updated Smart Contract**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { IWorldID } from "@worldcoin/world-id-contracts/interfaces/IWorldID.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NOCAPWalrusHybrid is Ownable, ReentrancyGuard {
    using ByteHasher for bytes;

    IWorldID internal immutable worldId;
    uint256 internal immutable externalNullifierHash;
    mapping(uint256 => bool) internal nullifierHashes;
    mapping(address => UserProfile) public userProfiles;

    // Minimal on-chain fact reference
    struct FactReference {
        uint256 id;
        address submitter;
        string walrusBlobId;        // Key link to Walrus content
        bytes32 contentHash;        // Integrity verification
        uint256 stakeAmount;
        uint256 votesTrue;
        uint256 votesFalse;
        uint256 totalStaked;
        bool resolved;
        bool outcome;
        uint256 createdAt;
        uint256 deadline;
        uint256 rewardPool;
        uint8 category;             // 0=General, 1=Tech, 2=Politics, etc.
        uint8 priority;             // 0=Low, 1=Medium, 2=High, 3=Critical
    }

    struct Vote {
        address voter;
        bool vote;
        uint256 stakeAmount;
        uint256 timestamp;
    }

    struct UserProfile {
        bool isVerified;
        uint256 reputation;
        uint256 factsSubmitted;
        uint256 factsVerified;
        uint256 factsFalse;
        uint256 votesCorrect;
        uint256 votesIncorrect;
        uint256 totalStaked;
        uint256 rewardsEarned;
        uint256 joinedAt;
        uint256 lastActive;
    }

    FactReference[] public factReferences;
    mapping(uint256 => Vote[]) public factVotes;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    // Events
    event UserVerified(address indexed user, uint256 nullifierHash, uint256 timestamp);
    event FactReferenceSubmitted(
        uint256 indexed factId, 
        address indexed submitter, 
        string walrusBlobId, 
        bytes32 contentHash,
        uint256 stakeAmount,
        uint8 category
    );
    event VoteCast(uint256 indexed factId, address indexed voter, bool vote, uint256 stakeAmount);
    event FactResolved(uint256 indexed factId, bool outcome, uint256 totalRewards);

    modifier onlyVerifiedHuman() {
        require(userProfiles[msg.sender].isVerified, "Not verified");
        _;
        userProfiles[msg.sender].lastActive = block.timestamp;
    }

    constructor(address _worldIdAddress, string memory _appId, string memory _actionId) 
        Ownable(msg.sender) {
        worldId = IWorldID(_worldIdAddress);
        externalNullifierHash = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
            .hashToField();
    }

    /**
     * Submit fact reference with Walrus blob ID
     */
    function submitFactReference(
        string calldata walrusBlobId,
        bytes32 contentHash,
        uint256 votingPeriodHours,
        uint8 category
    ) external payable onlyVerifiedHuman nonReentrant returns (uint256 factId) {
        require(bytes(walrusBlobId).length > 0, "Invalid Walrus blob ID");
        require(votingPeriodHours >= 24 && votingPeriodHours <= 168, "Invalid voting period");
        require(category <= 10, "Invalid category"); // Max 10 categories

        factId = factReferences.length;
        uint256 deadline = block.timestamp + (votingPeriodHours * 1 hours);

        factReferences.push(FactReference({
            id: factId,
            submitter: msg.sender,
            walrusBlobId: walrusBlobId,
            contentHash: contentHash,
            stakeAmount: msg.value,
            votesTrue: 0,
            votesFalse: 0,
            totalStaked: msg.value,
            resolved: false,
            outcome: false,
            createdAt: block.timestamp,
            deadline: deadline,
            rewardPool: msg.value,
            category: category,
            priority: 1 // Default medium priority
        }));

        userProfiles[msg.sender].factsSubmitted++;
        if (msg.value > 0) {
            userProfiles[msg.sender].totalStaked += msg.value;
        }

        emit FactReferenceSubmitted(factId, msg.sender, walrusBlobId, contentHash, msg.value, category);
    }

    /**
     * Vote on fact reference
     */
    function voteFact(uint256 factId, bool vote) external payable onlyVerifiedHuman nonReentrant {
        require(factId < factReferences.length, "Fact not found");
        require(!factReferences[factId].resolved, "Fact resolved");
        require(block.timestamp < factReferences[factId].deadline, "Voting ended");
        require(!hasVoted[factId][msg.sender], "Already voted");

        factVotes[factId].push(Vote({
            voter: msg.sender,
            vote: vote,
            stakeAmount: msg.value,
            timestamp: block.timestamp
        }));

        if (vote) {
            factReferences[factId].votesTrue++;
        } else {
            factReferences[factId].votesFalse++;
        }

        factReferences[factId].totalStaked += msg.value;
        factReferences[factId].rewardPool += msg.value;
        hasVoted[factId][msg.sender] = true;

        if (msg.value > 0) {
            userProfiles[msg.sender].totalStaked += msg.value;
        }

        emit VoteCast(factId, msg.sender, vote, msg.value);

        // Auto-resolve if conditions met
        if ((factReferences[factId].votesTrue + factReferences[factId].votesFalse) >= 5 &&
            block.timestamp >= factReferences[factId].deadline) {
            _resolveFact(factId);
        }
    }

    /**
     * Get fact reference by ID
     */
    function getFactReference(uint256 factId) external view returns (FactReference memory) {
        require(factId < factReferences.length, "Fact not found");
        return factReferences[factId];
    }

    /**
     * Get facts by category
     */
    function getFactsByCategory(uint8 category) external view returns (uint256[] memory) {
        uint256[] memory categoryFacts = new uint256[](factReferences.length);
        uint256 count = 0;

        for (uint256 i = 0; i < factReferences.length; i++) {
            if (factReferences[i].category == category) {
                categoryFacts[count] = i;
                count++;
            }
        }

        // Resize array to actual count
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = categoryFacts[i];
        }

        return result;
    }

    /**
     * Get active facts (unresolved)
     */
    function getActiveFacts() external view returns (uint256[] memory) {
        uint256[] memory activeFacts = new uint256[](factReferences.length);
        uint256 count = 0;

        for (uint256 i = 0; i < factReferences.length; i++) {
            if (!factReferences[i].resolved && block.timestamp < factReferences[i].deadline) {
                activeFacts[count] = i;
                count++;
            }
        }

        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = activeFacts[i];
        }

        return result;
    }

    // ... (rest of the contract functions remain similar)
}
```

---

## 🛠️ **Frontend Integration**

### **Updated Service Layer**

```typescript
// lib/walrus-hybrid-service.ts
export class WalrusHybridService {
  
  /**
   * Submit fact with hybrid storage
   */
  static async submitFact(factData: WalrusFactContent, stakeAmount?: string) {
    // 1. Store content on Walrus
    const walrusBlobId = await WalrusService.store(factData);
    const contentHash = this.generateContentHash(factData);
    
    // 2. Submit reference to contract
    const stakeWei = stakeAmount ? parseEther(stakeAmount) : 0n;
    const tx = await contract.submitFactReference(
      walrusBlobId,
      contentHash,
      factData.votingPeriodHours || 48,
      factData.category || 0,
      { value: stakeWei }
    );
    
    // 3. Update Walrus content with factId
    factData.factId = tx.factId;
    await WalrusService.update(walrusBlobId, factData);
    
    return { txHash: tx.hash, walrusBlobId, factId: tx.factId };
  }

  /**
   * Load complete facts (on-chain + Walrus)
   */
  static async loadCompleteFacts(): Promise<CompleteFact[]> {
    // 1. Load references from contract
    const factRefs = await contract.getAllFactReferences();
    
    // 2. Batch load content from Walrus
    const contentPromises = factRefs.map(ref => 
      WalrusService.retrieve(ref.walrusBlobId)
    );
    const contents = await Promise.all(contentPromises);
    
    // 3. Combine data
    return factRefs.map((ref, i) => ({
      reference: ref,
      content: contents[i],
      id: ref.id,
      walrusBlobId: ref.walrusBlobId,
      // ... combined fields
    }));
  }

  /**
   * Load facts by category
   */
  static async loadFactsByCategory(category: number): Promise<CompleteFact[]> {
    const factIds = await contract.getFactsByCategory(category);
    return this.loadFactsByIds(factIds);
  }

  private static generateContentHash(content: WalrusFactContent): string {
    return keccak256(JSON.stringify(content));
  }
}
```

### **React Hook Updates**

```typescript
// hooks/use-walrus-hybrid.tsx
export function useWalrusHybrid() {
  const [facts, setFacts] = useState<CompleteFact[]>([]);
  const [loading, setLoading] = useState(false);

  const submitFact = useCallback(async (
    title: string,
    description: string,
    sources: WalrusSource[],
    category: number = 0,
    stakeAmount?: string
  ) => {
    const factData: WalrusFactContent = {
      factId: 0,
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title,
      description,
      summary: description.slice(0, 500),
      sources,
      media: [],
      tags: [],
      language: 'en',
      contentType: 'text',
      checksum: '',
      category
    };

    return await WalrusHybridService.submitFact(factData, stakeAmount);
  }, []);

  const loadFacts = useCallback(async (category?: number) => {
    setLoading(true);
    try {
      const completeFacts = category !== undefined 
        ? await WalrusHybridService.loadFactsByCategory(category)
        : await WalrusHybridService.loadCompleteFacts();
      
      setFacts(completeFacts);
    } catch (error) {
      console.error('Error loading facts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    facts,
    loading,
    submitFact,
    loadFacts,
    // ... other functions
  };
}
```

---

## 📊 **Benefits of This Architecture**

### **Cost Efficiency**
- **On-Chain**: ~200 bytes per fact reference vs ~2KB+ for full content
- **Walrus**: Unlimited content size at low cost
- **Total Savings**: 90%+ reduction in on-chain storage costs

### **Scalability**
- **Content**: No size limits for descriptions, sources, media
- **Performance**: Fast on-chain queries for metadata
- **Flexibility**: Easy to add new content fields without contract changes

### **Data Integrity**
- **Content Hash**: Ensures Walrus content hasn't been tampered with
- **Immutable References**: On-chain blob IDs are permanent
- **Version Control**: Content versioning on Walrus

### **User Experience**
- **Fast Loading**: Quick metadata queries
- **Rich Content**: Full descriptions, images, videos
- **Offline Capability**: Walrus content can be cached

---

## 🚀 **Implementation Priority**

1. **✅ HIGH**: Update smart contract to use FactReference
2. **✅ HIGH**: Implement Walrus storage service
3. **✅ MEDIUM**: Update frontend to use hybrid data
4. **✅ MEDIUM**: Add content integrity verification
5. **✅ LOW**: Implement advanced features (categories, search)

This architecture gives you the best of both worlds: the security and immutability of on-chain data with the flexibility and cost-effectiveness of Walrus storage!
