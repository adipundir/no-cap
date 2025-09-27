# 🔑 Environment Setup Guide

## Required Environment Variables

Create a `.env.local` file in your project root with the following content:

```bash
# ===========================================
# NOCAP - World App Configuration
# ===========================================

# World App Configuration
NEXT_PUBLIC_WORLD_APP_ID=app_d05016525dcfdee7106146d8393399a7
NEXT_PUBLIC_ACTION_ID=humanhood

# ===========================================
# Configuration Details:
# 
# App ID: Your World App application identifier
# Action ID: "humanhood" - for World ID verification
# 
# These enable World ID proof generation and verification
# ===========================================
```

## 📝 Setup Steps

### 1. Create Environment File
```bash
# In your project root directory
touch .env.local
```

### 2. Add Configuration
Copy the environment variables above into your `.env.local` file.

### 3. Restart Development Server
```bash
# Stop your current dev server (Ctrl+C)
# Then restart it
npm run dev
```

## 🎯 What These Variables Enable

### **NEXT_PUBLIC_WORLD_APP_ID**
- **Purpose**: Identifies your NOCAP app in World App
- **Value**: `app_d05016525dcfdee7106146d8393399a7`
- **Used for**: World ID verification requests

### **NEXT_PUBLIC_ACTION_ID** 
- **Purpose**: Identifies the "humanhood" verification action
- **Value**: `humanhood`
- **Used for**: Proof of humanity verification

## ✅ Features Enabled

With these environment variables configured, users can:

1. **🌍 World ID Verification**: Prove their humanity using World ID
2. **🔐 Proof of Ownership**: Verify wallet ownership for secure interactions
3. **🛡️ Sybil Resistance**: Prevent fake accounts and spam
4. **⚡ Gas Sponsorship**: World App covers transaction fees
5. **🎯 Fact Verification**: Submit and verify facts with identity proofs

## 🚀 Testing

After setting up the environment variables:

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Open in World App**: Navigate to your local development URL in World App

3. **Test Wallet Connection**: Click "Connect Wallet" in the navbar

4. **Test World ID**: Go to `/world` page and try "Verify Your Humanity"

5. **Test Proof of Ownership**: Try to submit a fact at `/submit`

## 🔧 Troubleshooting

### Environment Variables Not Working?
- Ensure `.env.local` is in the project root (same level as `package.json`)
- Restart your development server after adding variables
- Check that variable names match exactly (case-sensitive)

### World ID Verification Failing?
- Verify your App ID is correct: `app_d05016525dcfdee7106146d8393399a7`
- Verify your Action ID is correct: `humanhood`
- Ensure you're testing in World App, not a regular browser

### Still Having Issues?
- Check browser console for error messages
- Verify World App is up to date
- Try clearing browser cache and localStorage

## 🎉 Ready to Go!

Once configured, your NOCAP app will have full World ID integration with proof of ownership for secure, authenticated interactions! 🌍
