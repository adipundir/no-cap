# World Mini App Setup Guide

This project includes a complete World Mini App implementation with World ID verification and payment functionality.

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   # or
   pnpm install --legacy-peer-deps
   ```
   
   Note: The `--legacy-peer-deps` flag is needed to resolve React version conflicts between dependencies.

2. **Configure Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your World App ID:
   ```env
   WORLD_APP_ID=your_world_app_id_here
   ```

3. **Get Your World App ID**
   - Visit the [World Developer Portal](https://developer.worldcoin.org/)
   - Create a new app or use an existing one
   - Copy your App ID from the dashboard

4. **Run the Development Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Access the Mini App**
   - Open [http://localhost:3000/world](http://localhost:3000/world) in your browser
   - For full functionality, open the app in World App

## 📱 Features Implemented

### ✅ World ID Verification
- **Component**: `WorldIDVerification`
- **Location**: `/components/world/world-id-verification.tsx`
- **Features**:
  - Orb and Device level verification
  - Custom action and signal support
  - On-chain proof generation (no backend required)
  - Error handling and status display

### ✅ World App Payments
- **Component**: `WorldPayment`
- **Location**: `/components/world/world-payment.tsx`
- **Features**:
  - Support for WLD, USDC, ETH tokens
  - Gas-sponsored transactions
  - Minimum amount validation ($0.1)
  - Transaction status tracking

### ✅ World App Status Detection
- **Component**: `WorldAppStatus`
- **Location**: `/components/world/world-app-status.tsx`
- **Features**:
  - Detects if running in World App vs browser
  - Visual status indicators
  - Feature availability notifications

### ✅ On-Chain Integration Ready
- **Proof Generation**: World ID proofs are generated client-side
- **Features**:
  - Zero-knowledge proof generation
  - Nullifier hash for replay protection
  - Merkle root for verification
  - Ready for smart contract integration

## 🏗️ Architecture

```
app/
├── world/                    # World Mini App page
│   └── page.tsx             # Main mini app interface
└── layout.tsx               # Root layout with MiniKitProvider

components/
└── world/                   # World-specific components
    ├── world-id-verification.tsx  # Generates proofs for on-chain verification
    ├── world-payment.tsx          # World App payments
    └── world-app-status.tsx       # App status detection
```

## 🔧 Configuration

### Environment Variables
```env
# Optional: Your World App ID from the Developer Portal (only needed for backend verification)
# Since we're doing on-chain verification, this is not required
# WORLD_APP_ID=app_staging_xxx

# Optional: Environment (staging or production)
WORLD_APP_ENV=staging
```

### MiniKit Provider Setup
The `MiniKitProvider` is configured in `app/layout.tsx` to provide World App functionality throughout the application.

## 🧪 Testing

### In Browser
- Visit `/world` to see the interface
- Components will show "Browser Mode" status
- Verification and payment buttons will show appropriate error messages

### In World App
1. Deploy your app or use ngrok for local testing
2. Create a mini app in the World Developer Portal
3. Set your app URL in the portal
4. Scan the QR code with World App
5. Test verification and payment flows

### Testing Commands
```bash
# Generate QR code for testing (replace with your app ID)
curl "https://worldcoin.org/mini-app?app_id=your_app_id&path=/world"
```

## 📚 Key Components

### WorldIDVerification
```tsx
<WorldIDVerification
  action="verify-human"
  signal="demo-signal-123"
  verificationLevel={VerificationLevel.Orb}
  onSuccess={(result) => console.log('Verified!', result)}
  onError={(error) => console.error('Failed:', error)}
/>
```

### WorldPayment
```tsx
<WorldPayment
  to="0x1234567890123456789012345678901234567890"
  token={Tokens.WLD}
  description="Demo payment"
  onSuccess={(result) => console.log('Payment sent!', result)}
  onError={(error) => console.error('Payment failed:', error)}
/>
```

## 🔐 Security Considerations

1. **Environment Variables**: Never commit your actual `WORLD_APP_ID` to version control
2. **Backend Verification**: Always verify proofs on the backend using the `/api/verify` endpoint
3. **Nullifier Hashes**: Store and check nullifier hashes to prevent replay attacks
4. **Input Validation**: Validate all user inputs before processing

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
Ensure your platform supports:
- Next.js 15+ with App Router
- Environment variables
- API routes

## 📖 Resources

- [World Developer Portal](https://developer.worldcoin.org/)
- [MiniKit Documentation](https://docs.world.org/mini-apps)
- [World ID Documentation](https://docs.world.org/world-id)
- [Worldchain Documentation](https://docs.worldchain.org/)

## 🐛 Troubleshooting

### Common Issues

1. **"Module not found: Can't resolve 'viem'" error**
   - Install viem dependency: `npm install viem --legacy-peer-deps`
   - The `--legacy-peer-deps` flag resolves React version conflicts
   - Restart your development server after installation

2. **"MiniKit is not installed" error**
   - Ensure you're testing in World App, not a regular browser
   - Check that MiniKitProvider is properly configured

3. **Verification fails**
   - Verify your `WORLD_APP_ID` is correct (if using backend verification)
   - Check that the action ID exists in your Developer Portal
   - For on-chain verification, ensure proof data is properly formatted

4. **Payment minimum amount error**
   - World App requires minimum $0.1 for sponsored transactions
   - Check token decimals are correctly calculated

5. **Environment variables not loading**
   - Ensure `.env.local` file exists and is properly formatted
   - Restart development server after adding variables

6. **React version conflicts during installation**
   - Use `--legacy-peer-deps` flag with npm/pnpm install
   - This resolves conflicts between React 19 and older peer dependencies

### Debug Mode
Enable debug logging by adding to your environment:
```env
DEBUG=minikit:*
```

## 🤝 Contributing

When contributing to the World Mini App functionality:

1. Follow the existing component patterns
2. Add proper TypeScript types
3. Include error handling
4. Test in both browser and World App environments
5. Update this documentation for any new features
