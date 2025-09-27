# Environment Configuration

Create a `.env.local` file in your project root with the following variables:

## Required Variables

```bash
# World ID Configuration
NEXT_PUBLIC_APP_ID=app_d05016525dcfdee7106146d8393399a7
NEXT_PUBLIC_ACTION_ID=humanhood
WLD_API_KEY=your_world_id_api_key_here

# Contract Configuration
NEXT_PUBLIC_NOCAP_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
```

## Optional Variables

```bash
# Custom RPC endpoints (optional)
NEXT_PUBLIC_WORLD_CHAIN_RPC=https://worldchain-mainnet.g.alchemy.com/public
```

## How to Get Your World ID API Key

1. Go to the [World ID Developer Portal](https://developer.worldcoin.org)
2. Sign in with your World ID
3. Create or select your app (`app_d05016525dcfdee7106146d8393399a7`)
4. Navigate to the API Keys section
5. Copy your API key and paste it as the `WLD_API_KEY` value

## Setting Up Actions

Make sure you have created the following actions in the Developer Portal:

1. **`humanhood`** - For fact creation verification
2. **`voting-action`** - For voting verification

## Contract Deployment

Once you deploy your contract:

1. Update `NEXT_PUBLIC_NOCAP_CONTRACT_ADDRESS` with your deployed contract address

## Security Notes

- Never commit `.env.local` to version control
- The `WLD_API_KEY` should be kept secret (server-side only)
- `NEXT_PUBLIC_*` variables are exposed to the client
- Contract will work immediately once deployed and address is updated
