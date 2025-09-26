# Create Incognito Action
Source: https://docs.world.org/api-reference/create-incognito-action

openapi/world-miniapps.json post /api/v2/create-action/{app_id}
Create an incognito action for your app.



# Get Prices
Source: https://docs.world.org/api-reference/get-prices

openapi/world-miniapps.json get /public/v1/miniapps/prices
Query latest prices of tokens in various fiat currencies.



# Get Transaction
Source: https://docs.world.org/api-reference/get-transaction

openapi/world-miniapps.json get /api/v2/minikit/transaction/{transaction_id}
Query transactions for their current status.



# Get Transaction Debug URL
Source: https://docs.world.org/api-reference/get-transaction-debug-url

openapi/world-miniapps.json get /api/v2/minikit/transaction/debug
Debug transactions that failed during the prepare stage. Returns Tenderly URLs when applicable.



# Get User Grant Cycle
Source: https://docs.world.org/api-reference/get-user-grant-cycle

openapi/world-miniapps.json get /api/v2/minikit/user-grant-cycle
Retrieve next grant claim date for a user of your mini app.



# Send Notification
Source: https://docs.world.org/api-reference/send-notification

openapi/world-miniapps.json post /api/v2/minikit/send-notification
Send notifications to users of your mini app.



# Verify Proof
Source: https://docs.world.org/api-reference/verify-proof

openapi/world-miniapps.json post /api/v2/verify/{app_id}
Verify a World ID proof for a Cloud action.



# World Developer Docs
Source: https://docs.world.org/index



<div className="mb-6">
  <a href="https://luma.com/ae974ghl" target="_blank" rel="noopener noreferrer" className="block w-full rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900 hover:bg-blue-100 hover:no-underline focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100 dark:hover:bg-blue-900 dark:focus:ring-blue-600" aria-label="World Build 2: Hybrid Hackathon & Program Application">
    <div className="flex items-center gap-3">
      <span>🚀</span>

      <span className="font-medium">
        World Build 2: Hybrid Hackathon — Apply now
      </span>

      <span className="ml-auto text-blue-700 underline dark:text-blue-300">Register</span>
    </div>
  </a>
</div>

<Warning>**Deprecation Notice**: Sign in with World ID v1 has been deprecated and will be shut down on **December 12, 2025**. Read more in the [announcement](/world-id/sign-in/deprecation).</Warning>

Choose your integration path:

* **Mini Apps** – Build native-like applications that run inside World App with the most distribution, leveraging World ID and the wallet.
* **External Integrations** – Add World ID's proof-of-personhood verification to your existing platform.
* **World Chain** – Build directly on our blockchain infrastructure.

***

<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
  <div className="group relative flex flex-col rounded-xl border overflow-hidden hover:shadow-md transition">
    <a href="/mini-apps" className="absolute inset-0 z-10 no-underline hover:no-underline border-0" aria-label="Mini Apps" />

    <img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps-cover.png?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=5992a903992c158e7fadd564e70bba65" alt="Mini Apps" className="w-full h-40 object-cover pointer-events-none select-none" draggable={false} data-og-width="1600" width="1600" data-og-height="899" height="899" data-path="images/docs/mini-apps-cover.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps-cover.png?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=e0abad716b09aadafe402752e8a1e4a3 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps-cover.png?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=38d5ba07382af87ca6e98ab3aec44c04 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps-cover.png?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=c23957b7206e7894dff12cbd15bd91a0 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps-cover.png?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=c854692cb37f43d7adf36c8996ece188 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps-cover.png?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=0b5ad0b19e20b73b6dfed2f4f09d145b 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps-cover.png?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=9e4b062a78e6916d121de4d37b2daca9 2500w" />

    <div className="flex-1 p-3 flex flex-col">
      <h3 className="font-semibold m-0">Create a Mini App</h3>
      <p className="text-sm text-gray-600 mt-auto">Native like applications integrated in World App</p>
    </div>
  </div>

  <div className="group relative flex flex-col rounded-xl border overflow-hidden hover:shadow-md transition">
    <a href="/world-id" className="absolute inset-0 z-10 no-underline hover:no-underline border-0" aria-label="External integrations" />

    <img src="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/world-id-cover.png?fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=ae6a4d725a148c5ea81ed2718fce0726" alt="External Integrations" className="w-full h-40 object-cover pointer-events-none select-none" draggable={false} data-og-width="1600" width="1600" data-og-height="899" height="899" data-path="images/docs/world-id-cover.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/world-id-cover.png?w=280&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=f24a9fea0cb6b564fbe47e04747486ea 280w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/world-id-cover.png?w=560&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=45e74efa016524c5426bb260cadfd87e 560w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/world-id-cover.png?w=840&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=80ee1380025beae360f0fd8963096ca9 840w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/world-id-cover.png?w=1100&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=2d45ec1650bad2ce9b0000e61aee2710 1100w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/world-id-cover.png?w=1650&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=940f57336ffdfb661fd4311d171c55ef 1650w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/world-id-cover.png?w=2500&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=b1d4c7ba22b200617080fdeaaaffbc10 2500w" />

    <div className="flex-1 p-3 flex flex-col">
      <h3 className="font-semibold m-0">External integrations</h3>

      <p className="text-sm text-gray-600 mt-auto">
        Add World ID verification to your existing platform
      </p>
    </div>
  </div>

  <div className="group relative flex flex-col rounded-xl border overflow-hidden hover:shadow-md transition">
    <a href="/world-chain/index" className="absolute inset-0 z-10 no-underline hover:no-underline border-0" aria-label="World Chain" />

    <img src="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/worldchain-cover.png?fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=78190b9849b84f5e5fa002b7c7a82525" alt="World Chain" className="w-full h-40 object-cover pointer-events-none select-none" draggable={false} data-og-width="1600" width="1600" data-og-height="899" height="899" data-path="images/docs/worldchain-cover.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/worldchain-cover.png?w=280&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=757621b41ac94ff8138a1ddd68b06fdd 280w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/worldchain-cover.png?w=560&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=941710023d0b5508fdc3cb9369eabc07 560w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/worldchain-cover.png?w=840&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=d9c379d49860b0d71fc83551ca0a9cd4 840w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/worldchain-cover.png?w=1100&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=5531ed4ebae0b21ca80a6bf85239bf27 1100w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/worldchain-cover.png?w=1650&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=bce3021ef26b9c03f7d3bafbe5ffd2b1 1650w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/worldchain-cover.png?w=2500&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=17de4cf482c2c1717ddce29efe1d94b6 2500w" />

    <div className="flex-1 p-3 flex flex-col">
      <h3 className="font-semibold m-0">Integrate World Chain</h3>
      <p className="text-sm text-gray-600 mt-auto">A chain designed for real humans.</p>
    </div>
  </div>
</div>


# Get Permissions
Source: https://docs.world.org/mini-apps/commands/get-permissions



This command lets you check the status of permissions a user has granted to your mini app.

## Using the command

Currently this command currently supports contacts, notifications, and microphone.

<Tabs>
  <Tab title="Async handlers">
    ### Sending the command and handling the response

    ```tsx
    import { MiniKit, GetPermissionsPayload, Permission } from '@worldcoin/minikit-js'

    // Example function of how to use the command
    const getPermissions = useCallback(
        async () => {
            const payload = await MiniKit.commandsAsync.getPermissions();
            // Handle the response
        },
        []
    );
    ```
  </Tab>

  <Tab title="Event listeners">
    ### Sending the command

    ```tsx
    // Example function of how to use the command
    const getPermissions = useCallback(
        () => {
            const payload = MiniKit.commands.getPermissions();
            },
        []
    );
    ```

    ### Handling the response

    ```tsx app/page.tsx
    import { MiniKit, ResponseEvent } from '@worldcoin/minikit-js'
        // ...
        useEffect(() => {
            if (!MiniKit.isInstalled()) {
                console.error("MiniKit is not installed");
                return;
            }

            MiniKit.subscribe(
                ResponseEvent.MiniAppGetPermissions,
                async (response: MiniAppGetPermissionsPayload) => {
                    if (response.status == "success") {
                        const response = await res.json();
                        // Handle the response
                    }
                }
            );

            return () => {
                MiniKit.unsubscribe(ResponseEvent.MiniAppGetPermissions);
            };
        }, []);
    ```
  </Tab>
</Tabs>

## Response type

### Success response payload

```ts
type MiniAppGetPermissionsSuccessPayload = {
    status: 'success';
    permissions: Permission[];
    version: number;    // same version that was received from MiniKit
};
```

```json
{
  "permissions": {
    "notifications": false
  },
  "status": "success",
  "timestamp": "2025-03-11T18:21:49.741-07:00",
  "version": 1
}
```

### Error response payload

```ts
type MiniAppGetPermissionsErrorPayload = {
	status: 'error'
	error_code: GetPermissionsErrorCodes
	version: number
}
```

The possible error codes are:

* `generic_error` - Request failed for unknown reason


# Send Notifications
Source: https://docs.world.org/mini-apps/commands/how-to-send-notifications



Please take a minute to read the [Features & Guidelines](/mini-apps/guidelines/features-and-guidelines).
It's important to follow these, otherwise we may disable your ability to send notifications.

To send notifications to users you need to:

* Request permission in the Developer Portal Advanced settings, for your mini app,
* Request permission to send notifications from the user, via MiniKit (see [Request Permission](/mini-apps/commands/request-permission)),
* Actually send the notification using our API or the Developer Portal.

Notifications are queued on our servers, users may not receive them immediately.

## Manually sending notifications from Developer Portal

<Note type="info">
  This form doesn't support localized notifications yet. To take advantage of
  localizations, use the API.
</Note>

You can send notifications to multiple wallet addresses (up to 1000) directly from the Developer Portal.

<div className="flex justify-center">
  <img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/notifications-dev-portal.png?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=cd33cdf7e9b7f2a6c2524bbdda99ca74" alt="Notification Interface in the Developer Portal" className="m-auto block" width="300" data-og-width="1080" data-og-height="1344" data-path="images/docs/mini-apps/commands/notifications-dev-portal.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/notifications-dev-portal.png?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=d6a6e4ef40a61c34a18791b346cdea6c 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/notifications-dev-portal.png?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=9ec154fd522420ebe7542769a4e020fd 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/notifications-dev-portal.png?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=eed510c14a140c8c18898dabad75576f 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/notifications-dev-portal.png?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=04de3d1d2978398a676d0e3a80ca77e6 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/notifications-dev-portal.png?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=b1afff2d9dd6d76df1d7e8c76209266b 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/notifications-dev-portal.png?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=07c7d28039e6be4a3e83db9cc18ad4d7 2500w" />
</div>

Use the form to input addresses, and content details. Once you click the `Send` button and get a success response, your notifications will be queued for delivery.

## Calling the send-notification endpoint

The API endpoint provides capabilities for sending notifications programmatically. These notifications can be localized,
which ensures you reach users in their preferred language. This results in a dramatically higher engagement rate.

### Localization made simple

```javascript
const response = await fetch(
  "https://developer.worldcoin.org/api/v2/minikit/send-notification",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      app_id: "your_app_id",
      wallet_addresses: ["0x123...", "0x456..."],
      localisations: [
        {
          language: "en",
          title: "🎉 Rewards Available",
          message: "Hey ${username}, your daily rewards are ready!",
        },
        {
          language: "es",
          title: "🎉 Recompensas Disponibles",
          message: "Hola ${username}, tus recompensas diarias están listas!",
        },
        {
          language: "fr",
          title: "🎉 Récompenses Disponibles",
          message:
            "Salut ${username}, vos récompenses quotidiennes sont prêtes!",
        },
      ],
      mini_app_path: "worldapp://mini-app?app_id=your_app_id&path=/rewards",
    }),
  }
);
```

Each user automatically receives the notification in their preferred language.
If their language isn't included in your localizations, you'll receive a specific `reason` in the response.

For complete API documentation including all supported languages and response formats, see the [API Reference](/mini-apps/reference/api#send-notification).

## Testing

We currently have a limit of 40 notifications per 4 hours for unverified apps. This is to help you test your notification implementations.
Currently you will need to create a new app if your app is verified as it will default to the verified app's metadata. In addition, you need
to enable notifications for your mini app inside of World App to receive them.

## Useful links

* [Features & Guidelines](/mini-apps/guidelines/features-and-guidelines)
* [How To Request Notification Permissions](/mini-apps/commands/request-permission)
* [How To Get Notification Permissions](/mini-apps/commands/get-permissions)
* [Send Notification API Reference](/mini-apps/reference/api#send-notification)


# Pay
Source: https://docs.world.org/mini-apps/commands/pay



This command is essential for applications that need to facilitate payments directly within the app,
enabling seamless transactions for users. At launch, WLD and USDC will be supported.

**Example:** Enabling an e-commerce platform to allow users to purchase digital goods using cryptocurrencies,
providing a smooth checkout experience.

Payments are easy to use and only have three simple steps.

1. Creating the transaction
2. Sending the command
3. Verifying the payment

<Warning>For legal reasons, payments are not available in Indonesia and Philippines.</Warning>

## Setup

Payments are executed on-chain, so you'll need an [Ethereum compatible wallet](https://metamask.io/).
Next, whitelist the address in the [Developer Portal](https://developer.worldcoin.org/).
Whitelisting adds security to your mini app to prevent payments from being sent to an unauthorized addresses. Optionally you can
disable this check in the Developer Portal.

<img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/whitelist.png?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=899fbdfac7f3bdd3b25072d52c19adfe" alt="Whitelist an Address" data-og-width="668" width="668" data-og-height="341" height="341" data-path="images/docs/mini-apps/commands/whitelist.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/whitelist.png?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=9217931e140f78822ba90ed49ab556b7 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/whitelist.png?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=8f5d67be1d814ec8b60cbc7c5037ee7b 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/whitelist.png?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=ef673329070fba418bfa0d6f6989a8dc 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/whitelist.png?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=f5e27fab6b5307516e7e41f7b20cec46 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/whitelist.png?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=a419bab4aebd83c59393daa7b1a137ab 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/whitelist.png?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=353406d4fc20d4633f99a5875b5b4d26 2500w" />

## Initiating the payment

For security, it's important you initialize and store your payment operation in the backend.

```tsx app/api/initiate-pay/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const uuid = crypto.randomUUID().replace(/-/g, '')

	// TODO: Store the ID field in your database so you can verify the payment later

	return NextResponse.json({ id: uuid })
}
```

## Using the command

<Tabs>
  <Tab title="Async handlers">
    ### Sending the command & handling the response

    We currently support WLD and USDC payments on Worldchain. Below is the expected input for the Pay command.
    Since World App sponsors the gas fee, there is a minimum transfer amount of \$0.1 for all tokens.

    ```tsx PayCommandInput
    // Represents tokens you allow the user to pay with and amount for each
    export type TokensPayload = {
      symbol: Tokens;
      token_amount: string;
    };

    export type PayCommandInput = {
      reference: string;
      to: string;
      tokens: TokensPayload[];
      network?: Network; // Optional
      description: string;
    };
    ```

    For convenience, we offer a public endpoint to query the current price of WLD in various currencies detailed [here](/mini-apps/reference/api#get-prices).

    ```tsx app/page.tsx
    import { MiniKit, tokenToDecimals, Tokens, PayCommandInput } from '@worldcoin/minikit-js'

    const sendPayment = async () => {
      const res = await fetch('/api/initiate-payment', {
        method: 'POST',
      })
      const { id } = await res.json()

      const payload: PayCommandInput = {
        reference: id,
        to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // Test address
        tokens: [
          {
            symbol: Tokens.WLD,
            token_amount: tokenToDecimals(1, Tokens.WLD).toString(),
          },
          {
            symbol: Tokens.USDC,
            token_amount: tokenToDecimals(3, Tokens.USDC).toString(),
          },
        ],
        description: 'Test example payment for minikit',
      }

      if (!MiniKit.isInstalled()) {
        return
      }

      const { finalPayload } = await MiniKit.commandsAsync.pay(payload)

      if (finalPayload.status == 'success') {
        const res = await fetch(`/api/confirm-payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalPayload),
        })
        const payment = await res.json()
        if (payment.success) {
          // Congrats your payment was successful!
        }
      }
    }
    ```
  </Tab>

  <Tab title="Event listeners">
    ### Sending the command

    We currently support WLD and USDC payments on Worldchain. Below is the expected input for the Pay command.
    Since World App sponsors the gas fee, there is a minimum transfer amount of \$0.1 for all tokens.

    ```tsx PayCommandInput
    // Represents tokens you allow the user to pay with and amount for each
    export type TokensPayload = {
      symbol: Tokens;
      token_amount: string;
    };

    export type PayCommandInput = {
      reference: string;
      to: string;
      tokens: TokensPayload[];
      network?: Network; // Optional
      description: string;
    };
    ```

    For convenience, we offer a public endpoint to query the current price of WLD in various currencies detailed [here](/mini-apps/reference/api#get-prices).

    ```tsx app/page.tsx
    import { MiniKit, tokenToDecimals, Tokens, PayCommandInput } from '@worldcoin/minikit-js'
        // ...
        const sendPayment = async () => {
          const res = await fetch('/api/initiate-payment', {
            method: 'POST'
          });
          const { id } = await res.json();

          const payload: PayCommandInput = {
            reference: id,
            to: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", // Test address
            tokens: [
              {
                symbol: Tokens.WLD,
                token_amount: tokenToDecimals(1, Tokens.WLD).toString(),
              },
              {
                symbol: Tokens.USDC,
                token_amount: tokenToDecimals(3, Tokens.USDC).toString(),
              },
            ],
            description: "Test example payment for minikit",
          };

          if (MiniKit.isInstalled()) {
            MiniKit.commands.pay(payload);
          }
        };
    ```

    ### Handling the response

    Once World App receives the command, the user will be prompted to confirm the payment via a drawer. After that the app will send the payment to our relayer to be submitted on-chain.
    The response does not wait until the transaction is mined. **Thus, it's critical to confirm the payment in your backend.**

    ```tsx app/page.tsx
    import { MiniKit, tokenToDecimals, Tokens, PayCommandInput, ResponseEvent } from '@worldcoin/minikit-js'
      useEffect(() => {
        if (!MiniKit.isInstalled()) {
          console.error("MiniKit is not installed");
          return;
        }

        MiniKit.subscribe(
          ResponseEvent.MiniAppPayment,
          async (response: MiniAppPaymentPayload) => {
            if (response.status == "success") {
              const res = await fetch(`/api/confirm-payment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response),
              });
              const payment = await res.json();
              if (payment.success) {
                // Congrats your payment was successful!
              }
            }
          }
        );

        return () => {
          MiniKit.unsubscribe(ResponseEvent.MiniAppPayment);
        };
      }, []);
    ```
  </Tab>
</Tabs>

## Verifying the payment

<Warning>
  You should always verify the payment in your backend. Users can manipulate information in the frontend, so the
  response must be verified in a trusted environment.
</Warning>

**Web2** applications can call our Developer Portal API to get the current status of the transaction. Since payments are executed on-chain, it can take up to a few minutes to confirm.
You can choose to optimistically accept the payments once they've landed on-chain, or poll the endpoint to wait until it's successful mined.

**Web3** applications can choose to search the on-chain event logs temselves via the `TransferReference` event emitted on-chain.
Note for reference ID the value on chain will be the keccak256 hash of the reference ID.

```solidity TransferReference
event TransferReference(
    address sender,
    address indexed recipient,
    uint256 amount,
    address token,
    string indexed referenceId,
    bool indexed success
);
```

In this example, we will show querying via Developer Portal API.

```tsx app/confirm-payment/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { MiniAppPaymentSuccessPayload } from '@worldcoin/minikit-js'

interface IRequestPayload {
	payload: MiniAppPaymentSuccessPayload
}

export async function POST(req: NextRequest) {
	const { payload } = (await req.json()) as IRequestPayload

	// IMPORTANT: Here we should fetch the reference you created in /initiate-payment to ensure the transaction we are verifying is the same one we initiated
	const reference = getReferenceFromDB()

	// 1. Check that the transaction we received from the mini app is the same one we sent
	if (payload.reference === reference) {
		const response = await fetch(
			`https://developer.worldcoin.org/api/v2/minikit/transaction/${payload.transaction_id}?app_id=${process.env.APP_ID}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${process.env.DEV_PORTAL_API_KEY}`,
				},
			}
		)
		const transaction = await response.json()

		// 2. Here we optimistically confirm the transaction.
		// Otherwise, you can poll until the status == mined
		if (transaction.reference == reference && transaction.status != 'failed') {
			return NextResponse.json({ success: true })
		} else {
			return NextResponse.json({ success: false })
		}
	}
}
```

## Success Result on World App

If implemented correctly, the user will see the following drawer on World App.

<div className="grid justify-items-center text-center">
  <video className="m-auto" width="300" autoPlay muted loop playsInline>
    <source src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/pay-command.mp4?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=bba487c3697212d449b136c27b2df511" type="video/mp4" data-path="images/docs/mini-apps/commands/pay-command.mp4" />

    Your browser does not support the video tag.
  </video>
</div>


# Request Permission
Source: https://docs.world.org/mini-apps/commands/request-permission



This command lets you request permissions to the user's device. This currently includes notifications and microphone.

## Using the command

This command only supports requesting one permission at a time. Additionally, it will only show the user the modal once. If a user rejects it, you will need to direct them to settings in order to re-enable the permission.

<Info>
  If a user removes your mini app from their World App home screen, you will need to request the permission again.
</Info>

```
worldcoin.org/settings/miniapps
```

Permission Types:

```tsx
// Types of permissions you can request. You can only request one at a time.
export enum Permission {
  Notifications = 'notifications',
  Microphone = 'microphone',
}
```

<Tabs>
  <Tab title="Async handlers">
    ### Sending the command and handling the response

    ```tsx
    import { MiniKit, RequestPermissionPayload, Permission } from '@worldcoin/minikit-js'

    // Example function of how to use the command
    const requestPermission = useCallback(
        async () => {
            const requestPermissionPayload: RequestPermissionPayload = {
                permission: Permission.Notifications,
            };
            const payload = await MiniKit.commandsAsync.requestPermission(requestPermissionPayload);
            // Handle the response
        }, []);
    ```
  </Tab>

  <Tab title="Event listeners">
    ### Sending the command

    ```tsx
    // Example function of how to use the command
    const requestPermission = useCallback(
        () => {
            const requestPermissionPayload: RequestPermissionPayload = {
                permission: Permission.Notifications,
            };
            const payload = MiniKit.commands.requestPermission(requestPermissionPayload);
            },
        []
    );
    ```

    ### Handling the response

    ```tsx app/page.tsx
    import { MiniKit, tokenToDecimals, Tokens, PayCommandInput, ResponseEvent } from '@worldcoin/minikit-js'
        // ...
        useEffect(() => {
            if (!MiniKit.isInstalled()) {
                console.error("MiniKit is not installed");
                return;
            }

            MiniKit.subscribe(
                ResponseEvent.MiniAppRequestPermission,
                async (response: MiniAppRequestPermissionPayload) => {
                    if (response.status == "success") {
                        const response = await res.json();
                        // Handle the response
                    }
                }
            );

            return () => {
                MiniKit.unsubscribe(ResponseEvent.MiniAppRequestPermission);
            };
        }, []);
    ```
  </Tab>
</Tabs>

## Response type

### Success response payload

```ts
type MiniAppRequestPermissionSuccessPayload = {
    status: 'success';
    permission: 'notifications';
    timestamp: string;  // ISO-8601
    version: number;    // same version that was received from MiniKit
};
```

### Error response payload

```ts
type MiniAppRequestPermissionErrorPayload = {
    status: 'error';
    error_code: RequestPermissionErrorCodes;
    version: number;
}
```

The possible error codes are:

* `user_rejected` - User declined permission request
* `generic_error` - Request failed for unknown reason
* `already_requested` - User has already declined turning on notifications once
* `permission_disabled` - User has notification disabled for World App
* `already_granted` - User has already granted this mini app permission
* `unsupported_permission` - Permission is not supported yet
* `world_app_permission_not_enabled` - User has not granted permission to World App. This means you need to prompt the user to enable microphone for World App first.

## Success Result on World App

If implemented correctly, the user will see the following drawer on World App.

<div className="grid justify-items-center text-center">
  <video className="m-auto" width="300" autoPlay muted loop playsInline>
    <source src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/notifications-command.mp4?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=c1a6bea0442277b2e30bc52a98d06166" type="video/mp4" data-path="images/docs/mini-apps/commands/notifications-command.mp4" />

    Your browser does not support the video tag.
  </video>
</div>


# Send Haptic Feedback
Source: https://docs.world.org/mini-apps/commands/send-haptic-feedback



Send Haptic Feedback is our command that lets you create more immersive experiences, by providing tactile feedback to users.
This command is available from minikit 1.7.1 and World App 2.8.7602 onwards.
Haptic feedback can improve the user experience by:

* **Enhancing Responsiveness**: Immediate tactile feedback makes interactions feel faster and more satisfying.
* **Improving Accessibility**: Haptics can help users with visual impairments by providing an additional layer of feedback.
* **Increasing Engagement**: Users are more likely to enjoy and continue using apps that feel interactive and responsive.

## Available payloads

| hapticsType        | style     | description                                                                       |
| ------------------ | --------- | --------------------------------------------------------------------------------- |
| `impact`           | `light`   | Collision between small UI elements.                                              |
| `impact`           | `medium`  | Collision between medium UI elements.                                             |
| `impact`           | `heavy`   | Collision between big UI elements.                                                |
|                    |           |                                                                                   |
| `notification`     | `success` | Indicates that an action was successful.                                          |
| `notification`     | `warning` | Indicates that something is not right and user should take notice.                |
| `notification`     | `error`   | Indicates that an action has failed.                                              |
|                    |           |                                                                                   |
| `selectionChanged` | ---       | Informs the user that a selection has changed, for example a checkbox was clicked |

## Creating the payload

```tsx app/page.tsx
export type SendHapticFeedbackInput = {
	hapticsType: 'impact'
	style: 'light'
}
```

## Using the command

There's no response from this command.

```tsx app/page.tsx
import { MiniKit } from '@worldcoin/minikit-js'

const sendHapticFeedbackCommand = () =>
	MiniKit.commands.sendHapticFeedback({
		hapticsType: 'impact',
		style: 'light',
	})

const ImportantPage = () => {
	const handleClick = () => {
		// ...
		sendHapticFeedbackCommand()
	}
	return <button onClick={handleClick}>Click me</button>
}

export default ImportantPage
```


# Send Transaction
Source: https://docs.world.org/mini-apps/commands/send-transaction



The "Send Transaction" feature allows you to interact with arbitrary smart contracts.
One important caveat is that approvals are not permitted.
To transfer funds, you must either use Permit2 [Signature Transfer](https://docs.uniswap.org/contracts/permit2/reference/signature-transfer) or directly call the asset's transfer function.

Ensure you specify the contracts and tokens you are interacting with in the Developer Portal (under Configuration → Advanced) ; otherwise, the backend will block the transaction.
Gas fees are covered on World Chain; however, there is a limit of 300 transactions per user per day.

Users can sign and send multiple transactions in parallel. Sequential execution is not enforced for miniapp transactions, unless those transactions are placed in the transaction array and sent as a single sendTransaction command.

## Creating a transaction

This command accepts an array of transactions, allowing you to specify multiple actions that will be executed atomically in a single multicall.
We default to formatting the payload to avoid validation errors, but if you are experiencing issues, you can set `formatPayload` to `false`.

```ts
export type SendTransactionInput = {
	transaction: Transaction[]
	permit2?: Permit2[] // Optional
  formatPayload?: boolean // Optional, default is true. If this is causing errors, you can set this to false.
}

export type Transaction = {
	address: string // Contract address you're interacting with
	abi: Abi | readonly unknown[] // It's recommended to only include the functions you're using.
	functionName: ContractFunctionName<Abi | readonly unknown[], 'payable' | 'nonpayable'>
	value?: string // Hex string representation of the value to send with the function call
	args: ContractFunctionArgs<
		Abi | readonly unknown[],
		'payable' | 'nonpayable',
		ContractFunctionName<Abi | readonly unknown[], 'payable' | 'nonpayable'>
	>
}
```

<Tabs>
  <Tab title="Send Transaction">
    ```tsx app/page.tsx
    import SimpleABI from '../../abi/SimpleABI.json'
    import { MiniKit } from '@worldcoin/minikit-js'

    const sendTransaction = async () => {
      const {commandPayload, finalPayload} = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: '0x9Cf4F011F55Add3ECC1B1B497A3e9bd32183D6e8',
            abi: SimpleABI,
            functionName: 'mintToken',
            args: ['0x126f7998Eb44Dd2d097A8AB2eBcb28dEA1646AC8'],
          },
        ],
      })
    }
    ```

    ### Confirming the transaction

    Once the transaction is sent, you will receive a `transaction_id`. You can use this ID to check the transaction status and retrieve the transaction hash after confirmation.
    In this flow, we will use the useWaitForTransactionReceipt hook to monitor the transaction status.

    ```tsx app/page.tsx
    // Make sure you have the @worldcoin/minikit-react package installed
    import { useWaitForTransactionReceipt } from '@worldcoin/minikit-react'

    const [transactionId, setTransactionId] = useState<string>('')

    const client = createPublicClient({
      chain: worldchain,
      transport: http('https://worldchain-mainnet.g.alchemy.com/public'),
    })

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
      client: client,
      appConfig: {
        app_id: '<app_id>',
      },
      transactionId: transactionId,
    })

    const sendTransaction = async () => {
      const {commandPayload, finalPayload} = await MiniKit.commandsAsync.sendTransaction({
        // ...
      })

      if (payload.status === 'error') {
        console.error('Error sending transaction', payload)
      } else {
        setTransactionId(payload.transaction_id)
      }
    }
    ```
  </Tab>

  <Tab title="ABI">
    ```tsx abi/SimpleAbi.json
    [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
           ],
          "name": "mintToken",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
    ]

    ```
  </Tab>
</Tabs>

## With permit2

This example demonstrates how to send a transaction using Permit2. You must specify additional configuration options in the Developer Portal (under Configuration → Advanced) to enable a particular token.

Note that Permit2 requires a signature. Our backend automatically replaces the placeholder with the correct signature; you simply need to indicate this using `PERMIT2_SIGNATURE_PLACEHOLDER_{index}`.
The index corresponds to the position of the Permit2 value within the permit2 array.

```ts
export type Permit2 = {
	permitted: {
		token: string
		amount: string | unknown
	}
	spender: string
	nonce: string | unknown
	deadline: string | unknown
}
```

<Tabs>
  <Tab title="Send Transaction (Permit2)">
    ### Sending the transaction & receiving the response

    ```tsx app/page.tsx
    import Permit2 from '../../abi/Permit2.json'
    import { MiniKit } from '@worldcoin/minikit-js'

    const onClickUsePermit2 = async () => {
      // Permit2 is valid for max 1 hour
      const permitTransfer = {
        permitted: {
          token: "0x..." // The token I'm sending
          amount: (0.5 * 10 ** 18).toString(),
        },
        nonce: Date.now().toString(),
        deadline: Math.floor((Date.now() + 30 * 60 * 1000) / 1000).toString(),
      };

      const transferDetails = {
        to: address,
        requestedAmount: (0.5 * 10 ** 18).toString(),
      };

      try {
        const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
          transaction: [
            {
              address: "0xF0882554ee924278806d708396F1a7975b732522",
              abi: Permit2,
              functionName: 'signatureTransfer',
              args: [
                [
                  [
                    permitTransfer.permitted.token,
                    permitTransfer.permitted.amount,
                  ],
                  permitTransfer.nonce,
                  permitTransfer.deadline,
                ],
                [transferDetails.to, transferDetails.requestedAmount],
                'PERMIT2_SIGNATURE_PLACEHOLDER_0', // Placeholders will automatically be replaced with the correct signature. 
              ],
            },
          ],
          permit2: [
            {
              ...permitTransfer,
              spender: myContractToken,
            }, // If you have more than one permit2 you can add more values here.
          ],
        });
      }
    }
    ```

    ### Confirming the transaction

    Once the transaction is sent you will receive back a transaction id. You can use this to check the status of the transaction and will also be able to get the transaction hash
    once the transaction is confirmed.

    This requires installing the `@worldcoin/minikit-react` package.

    ```tsx app/page.tsx
    import { useWaitForTransactionReceipt } from '@worldcoin/minikit-react'

    const [transactionId, setTransactionId] = useState<string>('')

    const client = createPublicClient({
      chain: worldchain,
      transport: http('https://worldchain-mainnet.g.alchemy.com/public'),
    })

    // You can use isSuccess to check if the transaction is mined
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
      client: client,
      appConfig: {
        app_id: '<app_id>',
      },
      transactionId: transactionId,
    })

    const sendTransaction = async () => {
      const {commandPayload, finalPayload} = await MiniKit.commandsAsync.sendTransaction({
        // ...
      })

      if (payload.status === 'error') {
        console.error('Error sending transaction', payload)
      } else {
        setTransactionId(payload.transaction_id)
      }
    }
    ```
  </Tab>

  <Tab title="ABI">
    ```tsx abi/Permit2.json
    [
        {
        "inputs": [
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct ISignatureTransfer.TokenPermissions",
                "name": "permitted",
                "type": "tuple"
              },
              {
                "internalType": "uint256",
                "name": "nonce",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              }
            ],
            "internalType": "struct ISignatureTransfer.PermitTransferFrom",
            "name": "permitTransferFrom",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "requestedAmount",
                "type": "uint256"
              }
            ],
            "internalType": "struct ISignatureTransfer.SignatureTransferDetails",
            "name": "transferDetails",
            "type": "tuple"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "name": "signatureTransfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
    ]

    ```
  </Tab>
</Tabs>

## Success Result on World App

If implemented correctly, the user will see the following drawer on World App.

<div className="grid justify-items-center text-center">
  <video className="m-auto" width="300" autoPlay muted loop playsInline>
    <source src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/send-transaction.mp4?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=a9467132c8ed77a20a4679408a4e9749" type="video/mp4" data-path="images/docs/mini-apps/commands/send-transaction.mp4" />

    Your browser does not support the video tag.
  </video>
</div>

## Debugging

Sending transactions can be tricky. If you encounter a simulation\_failed error, you will receive a debug\_url that allows you to inspect the error in Tenderly.
However, when using Permit2, the debug\_url won't be available until your Permit2 signature expires. Therefore, it's recommended to set a shorter deadline during testing.
For details on other types of [errors](/mini-apps/reference/errors#transactions)

To get precise debug information, you can fetch debug URLs (Tenderly) using the [Get Transaction Debug URL](/mini-apps/reference/api#get-transaction-debug-url) endpoint.

## Alternative: Verifying the transaction

If you don't want to use our hook you can choose to query for the hash yourself using this endpoint. Make sure to specify `type=transaction` in the query string.

Transactions are sent via our relayer currently and so we provide you an internal id rather than a hash in the original response above.

```tsx app/confirm-transaction/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { MiniAppSendTransactionSuccessPayload } from '@worldcoin/minikit-js'

interface IRequestPayload {
	payload: MiniAppSendTransactionSuccessPayload
}

export async function POST(req: NextRequest) {
	const { payload } = (await req.json()) as IRequestPayload

	const response = await fetch(
		`https://developer.worldcoin.org/api/v2/minikit/transaction/${payload.transaction_id}?app_id=${process.env.APP_ID}&type=transaction`,
		{
			method: 'GET',
		}
	)
	const transaction = await response.json()

	return NextResponse.json(transaction)
}
```

Example response from api call.

```tsx
{
    "transactionId": "0xa5b02107433da9e2a450c433560be1db01963a9146c14eed076cbf2c61837d60",
    "transactionHash": "0xa8388148b630b49a3d5a739eaad9e98b5766235cdb21a5ec8d3f89053d982a71",
    "transactionStatus": "failed",
    "miniappId": "app_staging_5748c49d2e6c68849479e0b321bc5257",
    "updatedAt": "2024-09-09T15:18:25.320Z",
    "network": "worldchain",
    "fromWalletAddress": "0x2321401e6a175a7236498ab66f25cd1db4b17558",
    "toContractAddress": "0x2321401e6a175a7236498ab66f25cd1db4b17558"
}
```

## Using ETH

<Info>This functionality is available from minikit-js 1.6.0 onwards.</Info>
Send transaction supports sending to payable functions. Make sure you have ETH in your wallet. For ease of use, we have a
simple contract that lets you send ETH by forwarding the value. [Forward.sol](https://worldscan.org/address/0x087d5449a126e4e439495fcBc62A853eB3257936#code)

```tsx
// Sending eth via Forward.sol
const sendTransaction = async () => {
	const payload = await MiniKit.commandsAsync.sendTransaction({
		transaction: [
			{
				address: '0x087d5449a126e4e439495fcBc62A853eB3257936', // Forward.sol
				abi: ForwardABI,
				functionName: 'pay',
				args: ['0x377da9cab87c04a1d6f19d8b4be9aef8df26fcdd'], // To Whom
				value: '0x9184E72A000', // Send 0.00001 ETH hex encoded
			},
		],
	})
}
```

## Why Approvals are not supported

Approvals are not supported in order to create a better user experience. Any user transfer of funds will
only show one confirmation modal. This is to help cater towards users who are less familiar with the user patterns
of crypto.


# Share
Source: https://docs.world.org/mini-apps/commands/share



Share will be the primary way to access the browsers native share drawer.
This command will let you prompt users to share content, files, and links with other users through
any of the communication apps installed on their device. This command will also support downloading media to their device from your mini app.

This command will be available from MiniKit 2.0.0 and World App 2.8.84 onwards.

## Creating the payload

```tsx app/page.tsx

export type SharePayload = {
  files: File[];
  title?: string;
  text?: string;
  url?: string;
};
```

## Using the command

There's no response from this command.

```tsx app/page.tsx
import { MiniKit } from '@worldcoin/minikit-js'

const shareCommand = async () => {
	await MiniKit.commandsAsync.share({
		title: 'Invite Link', // Preview used in share drawer
		text: 'Use this invite code to join my mini app', // Text sent in shared message
		url: 'https://worldcoin.org', // URL to share
	})
}


const ImportantPage = () => {
	const handleClick = () => {
		// ...
		await shareCommand()
	}
	return <button onClick={handleClick}>Invite Friends</button>
}

```

On Android, we use the native share sheet which does alert the user to the success or failure of the share, however on iOS, we use the native web share sheet which has no response.

If you want to know if the share was successful, you can use the `share` event.

```tsx app/page.tsx
MiniKit.subscribe(ResponseEvent.MiniAppShare, (payload) => {
	// Do nothing here to simply handle the error response
	console.log('Share Response', payload);
});
```

### Example in World App

Here's what the share drawer looks like in World App.

<div className="grid justify-items-center text-center">
  <video className="m-auto" width="300" autoPlay muted loop playsInline>
    <source src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/share.mp4?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=27d7280cd4c0bdba1d403d23648296e6" type="video/mp4" data-path="images/docs/mini-apps/commands/share.mp4" />

    Your browser does not support the video tag.
  </video>
</div>


# Share Contacts
Source: https://docs.world.org/mini-apps/commands/share-contacts



Sharing contacts is a command that allows you to request users to share contacts in their phone in a privacy preserving way.
This command will be available from v1.4.0 of minikit and v2.8.72 of World App.

## Crafting the payload

```ts
export type ShareContactsInput = {
	isMultiSelectEnabled: boolean
	inviteMessage?: string
}
```

* `isMultiSelectEnabled` is a boolean that determines if the user can select multiple contacts, by default you can only select one contact in the modal.
* `inviteMessage` is an optional custom message that will be displayed to the user when the user invites a non world app user while inside of your mini app.

## Using the command

Here is an example of how to use the shareContacts command.

<Tabs>
  <Tab title="Async handlers">
    ### Sending the command and handling the response

    ```tsx
    // Example function of how to use the command
    const shareContacts = useCallback(
        async (isMultiSelectEnabled: boolean = false, inviteMessage?: string) => {
            const shareContactsPayload: ShareContactsPayload = {
                isMultiSelectEnabled,
                inviteMessage,
            };
            const payload = await MiniKit.commandsAsync.shareContacts(shareContactsPayload);
            // Handle the response
        },
        []
    );
    ```
  </Tab>

  <Tab title="Event listeners">
    ### Sending the command

    ```tsx
    // Example function of how to use the command
    const shareContacts = useCallback(
        (isMultiSelectEnabled: boolean = false, inviteMessage?: string) => {
            const shareContactsPayload: ShareContactsPayload = {
                isMultiSelectEnabled,
                inviteMessage,
            };
            const payload = MiniKit.commands.shareContacts(shareContactsPayload);
            },
        []
    );
    ```

    ### Handling the response

    The user will then see a modal of their contacts as well as be able to search for other users.

    ```tsx app/page.tsx
    import { MiniKit, tokenToDecimals, Tokens, PayCommandInput, ResponseEvent } from '@worldcoin/minikit-js'
        // ...
        useEffect(() => {
            if (!MiniKit.isInstalled()) {
                console.error("MiniKit is not installed");
                return;
            }

            MiniKit.subscribe(
                ResponseEvent.MiniAppShareContacts,
                async (response: MiniAppShareContactsPayload) => {
                    if (response.status == "success") {
                        const contacts = await res.json();
                        // Handle the response
                    }
                }
            );

            return () => {
                MiniKit.unsubscribe(ResponseEvent.MiniAppShareContacts);
            };
        }, []);
    ```
  </Tab>
</Tabs>

## Response type

The response will contain an array of contacts that the user has selected.

### Success response payload

```ts
type MiniAppShareContactsSuccessPayload = {
    status: 'success';
    contacts: Array<{
        username: string;
        walletAddress: string;
        profilePictureUrl: string | null;
    }>;
    timestamp: string;
    version: number;
};
```

### Error response payload

```ts
type MiniAppShareContactsErrorPayload = {
    status: 'error';
    error_code: ShareContactsErrorCodes;
    version: number;
}
```

The possible error codes are:

* `user_rejected` - The user rejected the request
* `generic_error` - An unknown error occurred

## Success Result on World App

If implemented correctly, the user will see the following drawer on World App.

<div className="grid justify-items-center text-center">
  <video className="m-auto" width="300" autoPlay muted loop playsInline>
    <source src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/contacts-command.mp4?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=1b8bea8f658dfdee32c7cb7a4da02fae" type="video/mp4" data-path="images/docs/mini-apps/commands/contacts-command.mp4" />

    Your browser does not support the video tag.
  </video>
</div>


# Sign Message
Source: https://docs.world.org/mini-apps/commands/sign-message



Sign message lets you create an [EIP-191](https://eips.ethereum.org/EIPS/eip-191).
You should verify the signature.

**Use Case:** This command is useful for applications that need to sign messages for verification purposes,
ensuring that the message was indeed created by the owner of the wallet.

**Example:** A voting app that requires users to sign a message to prove ownership
of their wallet before allowing them to vote.

## Using the command

<Tabs>
  <Tab title="Async handlers">
    ### Sending the command & handling the response

    The response will include a signature compliant with EIP-191.
    You should verify the signature.

    ```ts
    type MiniAppSignMessageSuccessPayload = {
      status: "success";
      signature: string;
      address: string;
      version: number;
    };
    ```

    ```tsx app/page.tsx
    import { MiniKit, SignMessageInput } from '@worldcoin/minikit-js'

    const signAndVerifyMessage = async () => {
      const signMessagePayload: SignMessageInput = {
        message: "Hello world",
      };

      const {finalPayload} = await MiniKit.commandsAsync.signMessage(signMessagePayload);

      if (finalPayload.status === "success") {
        const messageHash = hashSafeMessage(messageToSign);

        const isValid = await (
          await Safe.init({
            provider:
              "https://worldchain-mainnet.g.alchemy.com/v2/your-api-key",
            safeAddress: finalPayload.address,
          })
        ).isValidSignature(messageHash, finalPayload.signature);

        // Checks functionally if the signature is correct
        if (isValid) {
          console.log("Signature is valid");
        }
      }
    };
    ```

    Your message is verified!
  </Tab>

  <Tab title="Event listeners">
    ### Sending the command

    ```ts
    export type SignMessageInput = {
      message: string;
    };
    ```

    ```tsx app/page.tsx
    import { MiniKit, SignMessageInput } from '@worldcoin/minikit-js'

      const onSignMessage = () => {
        if (!MiniKit.isInstalled()) {
          return
        }
        const signMessagePayload: SignMessageInput = {
          message: "Hello world",
        };

        MiniKit.commands.signMessage(signMessagePayload);
      };
    ```

    ### Receiving the response

    The response will include a signature compliant with [EIP-191](https://eips.ethereum.org/EIPS/eip-191).
    You should verify the signature.

    ```ts
    export type SignMessageInput = {
      message: string;
    };
    ```

    ```ts
    type MiniAppSignMessageSuccessPayload = {
      status: "success";
      signature: string;
      address: string;
      version: number;
    };
    ```

    ```tsx app/page.tsx
    import { MiniKit, ResponseEvent } from '@worldcoin/minikit-js'
    import Safe, { hashSafeMessage } from "@safe-global/protocol-kit";

    MiniKit.subscribe(ResponseEvent.MiniAppSignMessage, async (payload) => {
          if (payload.status === "success") {
            const messageHash = hashSafeMessage(messageToSign);

            const isValid = await (
              await Safe.init({
                provider:
                  "https://opt-mainnet.g.alchemy.com/v2/your-api-key",
                safeAddress: payload.address,
              })
            ).isValidSignature(messageHash, payload.signature);

            // Checks functionally if the signature is correct
            if (isValid) {
              console.log("Signature is valid");
            }
          }

        return () => {
          MiniKit.unsubscribe(ResponseEvent.MiniAppSignMessage);
        };
      }, []);

    ```

    Your message is verified!
  </Tab>
</Tabs>


# Sign Typed Data
Source: https://docs.world.org/mini-apps/commands/sign-typed-data



Sign Typed Data lets you create an [EIP-712 signature](https://eips.ethereum.org/EIPS/eip-712).

**Use Case:** This command is essential for applications that require structured data to be signed.

**Example:** An insurance platform that requires users to sign typed data to confirm the terms of their insurance policy.

> Note: The `EIP712Domain` must always include `chainId`.
>
> On **Worldchain**, only custom typed data is permitted.
>
> * SafeTx and Permit/Permit2 types are not allowed.
>
> On **all other chains**, any valid EIP-712 structure is supported, including SafeTx and Permit types.

```ts
{
  types: {
    YourTypes: [
      { type: 'bytes', name: 'data' },
      { type: 'uint8', name: 'operation' },
    ],
    EIP712Domain: [
      { type: 'uint256', name: 'chainId' },
      { type: 'address', name: 'verifyingContract' },
    ],
  },
  domain: {
    chainId: 480,
    verifyingContract: "0x1234...",
  },
  primaryType: 'YourTypes',
  message:{ data: '0xffffffff', operation: 15}
}
```

## Using the command

<Tabs>
  <Tab title="Async handlers">
    ### Sending the command & handling the response

    ```tsx
    import type { TypedData, TypedDataDomain } from 'abitype'

    export type SignTypedDataInput = {
      types: TypedData
      primaryType: string
      message: Record<string, unknown>
      domain: TypedDataDomain
    }
    ```

    ```tsx
    type MiniAppSignTypedDataSuccessPayload = {
      status: 'success'
      signature: string
      address: string
      version: number
    }
    ```

    ```tsx app/page.tsx
    import { MiniKit, SignTypedDataInput } from '@worldcoin/minikit-js'

      const signAndVerifyTypedData = async () => {
        if (!MiniKit.isInstalled()) {
          return
        }

        const {finalPayload} = await MiniKit.commandsAsync.signTypedData(
          somePayloadforEIP712 as SignTypedDataInput;
        );

        if (payload.status === 'success') {
          const messageHash = hashSafeMessage(signTypedDataPayload)

          const isValid = await (
            await Safe.init({
              provider: 'https://worldchain-mainnet.g.alchemy.com/v2/your-api-key',
              safeAddress: payload.address,
            })
          ).isValidSignature(messageHash, payload.signature)

          // Checks functionally if the signature is correct
          if (isValid) {
            console.log('Signature is valid')
          }
        }
      };
    ```
  </Tab>

  <Tab title="Event listeners">
    ### Sending the command

    ```tsx
    import type { TypedData, TypedDataDomain } from 'abitype'

    export type SignTypedDataInput = {
      types: TypedData
      primaryType: string
      message: Record<string, unknown>
      domain: TypedDataDomain
    }
    ```

    ```tsx app/page.tsx
    import { MiniKit, SignTypedDataInput } from '@worldcoin/minikit-js'

      const onSignTypedData = () => {
        const payload = MiniKit.commands.signTypedData(
          somePayloadforEIP712 as SignTypedDataInput;
        );
      };
    ```

    ### Receiving the response

    Verifying the signature. Note permit2 payloads and safe operations are not permitted in this command.

    ```tsx
    type MiniAppSignTypedDataSuccessPayload = {
      status: 'success'
      signature: string
      address: string
      version: number
    }
    ```

    ```tsx app/page.tsx
    import { MiniKit, ResponseEvent } from '@worldcoin/minikit-js'
    useEffect(() => {
      if (!MiniKit.isInstalled()) {
        return
      }

      MiniKit.subscribe(ResponseEvent.MiniAppSignTypedData, async (payload: MiniAppSignTypedDataPayload) => {
        if (payload.status === 'success') {
          const messageHash = hashSafeMessage(signTypedDataPayload)

          const isValid = await (
            await Safe.init({
              provider: 'https://worldchain-mainnet.g.alchemy.com/v2/your-api-key',
              safeAddress: payload.address,
            })
          ).isValidSignature(messageHash, payload.signature)

          // Checks functionally if the signature is correct
          if (isValid) {
            console.log('Signature is valid')
          }
        }
      })
    }, [])
    ```
  </Tab>
</Tabs>


# Verify
Source: https://docs.world.org/mini-apps/commands/verify



The verify command lets you use [incognito actions](/world-id/id/cloud) inside of your mini app. Incognito actions are a primitive of World ID and allow you to gate functionality behind a unique human check.

To use incognito actions, first create one in the [Developer Portal](https://developer.worldcoin.org/).

**Use Case:** This command is crucial for applications that require user verification to access certain features,
ensuring that only verified humans can perform actions. You can set up the incognito action limiting the number of times a user can perform an action.

**Example:** An game that requires users to verify their identity before playing to have a bot free experience.

## Using the command

<Tabs>
  <Tab title="Async handlers">
    ### Sending the command & handling the response

    MiniKit uses a slightly different input payload than IDKit. We do not need to pass in the `app_id`.

    ```tsx
    export type VerifyCommandInput = {
    	action: string
    	signal?: string
    	verification_level?: VerificationLevel // Default: Orb
    }
    ```

    ```ts
    type MiniAppVerifyActionSuccessPayload = {
    	status: 'success'
    	proof: string
    	merkle_root: string
    	nullifier_hash: string
    	verification_level: VerificationLevel
    	version: number
    }
    ```

    ```tsx app/page.tsx
    import { MiniKit, VerifyCommandInput, VerificationLevel, ISuccessResult } from '@worldcoin/minikit-js'

    const verifyPayload: VerifyCommandInput = {
    	action: 'voting-action', // This is your action ID from the Developer Portal
    	signal: '0x12312', // Optional additional data
    	verification_level: VerificationLevel.Orb, // Orb | Device
    }

    const handleVerify = async () => {
    	if (!MiniKit.isInstalled()) {
    		return
    	}
    	// World App will open a drawer prompting the user to confirm the operation, promise is resolved once user confirms or cancels
    	const {finalPayload} = await MiniKit.commandsAsync.verify(verifyPayload)
    		if (finalPayload.status === 'error') {
    			return console.log('Error payload', finalPayload)
    		}

    		// Verify the proof in the backend
    		const verifyResponse = await fetch('/api/verify', {
    			method: 'POST',
    			headers: {
    				'Content-Type': 'application/json',
    			},
    			body: JSON.stringify({
    			payload: finalPayload as ISuccessResult, // Parses only the fields we need to verify
    			action: 'voting-action',
    			signal: '0x12312', // Optional
    		}),
    	})

    	// TODO: Handle Success!
    	const verifyResponseJson = await verifyResponse.json()
    	if (verifyResponseJson.status === 200) {
    		console.log('Verification success!')
    	}
    }
    ```
  </Tab>

  <Tab title="Event listeners">
    ### Sending the command

    MiniKit uses a slightly different input payload than IDKit. We do not need to pass in the `app_id`.

    ```tsx
    export type VerifyCommandInput = {
    	action: string
    	signal?: string
    	verification_level?: VerificationLevel // Default: Orb
    }
    ```

    Using the `verify` command:

    ```tsx app/page.tsx
    import { MiniKit, VerifyCommandInput, VerificationLevel } from '@worldcoin/minikit-js'

    const verifyPayload: VerifyCommandInput = {
    	action: 'voting-action', // This is your action ID from the Developer Portal
    	signal: '0x12312', // Optional additional data
    	verification_level: VerificationLevel.Orb, // Orb | Device
    }

    const payload = MiniKit.commands.verify(verifyPayload)
    ```

    ### Listening for the response

    Upon receiving the command from your mini app, World App will open a drawer prompting the user to confirm the operation.

    ```tsx app/page.tsx
    import { MiniKit, ResponseEvent, ISuccessResult, MiniAppVerifyActionPayload } from '@worldcoin/minikit-js'

    // ...
    useEffect(() => {
    	if (!MiniKit.isInstalled()) {
    		return
    	}

    	MiniKit.subscribe(ResponseEvent.MiniAppVerifyAction, async (response: MiniAppVerifyActionPayload) => {
    		if (response.status === 'error') {
    			return console.log('Error payload', response)
    		}

    		// Verify the proof in the backend
    		const verifyResponse = await fetch('/api/verify', {
    			method: 'POST',
    			headers: {
    				'Content-Type': 'application/json',
    			},
    			body: JSON.stringify({
    				payload: response as ISuccessResult, // Parses only the fields we need to verify
    				action: 'voting-action',
    				signal: '0x12312', // Optional
    			}),
    		})

    		// TODO: Handle Success!
    		const verifyResponseJson = await verifyResponse.json()
    		if (verifyResponseJson.status === 200) {
    			console.log('Verification success!')
    		}
    	})

    	return () => {
    		MiniKit.unsubscribe(ResponseEvent.MiniAppVerifyAction)
    	}
    }, [])
    ```
  </Tab>
</Tabs>

## Verifying the proof

<Warning>
  You should pass the proof to your backend when verifying proofs via the API. Users can manipulate information in the
  frontend, so the proof must be verified in a trusted environment.
</Warning>

Successful responses will return a `MiniAppVerifyActionSuccessPayload`.

```ts
type MiniAppVerifyActionSuccessPayload = {
	status: 'success'
	proof: string
	merkle_root: string
	nullifier_hash: string
	verification_level: VerificationLevel
	version: number
}
```

To verify the proof, you will need to make a backend route.

```ts app/api/verify/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyCloudProof, IVerifyResponse, ISuccessResult } from '@worldcoin/minikit-js'

interface IRequestPayload {
	payload: ISuccessResult
	action: string
	signal: string | undefined
}

export async function POST(req: NextRequest) {
	const { payload, action, signal } = (await req.json()) as IRequestPayload
	const app_id = process.env.APP_ID as `app_${string}`
	const verifyRes = (await verifyCloudProof(payload, app_id, action, signal)) as IVerifyResponse // Wrapper on this

	if (verifyRes.success) {
		// This is where you should perform backend actions if the verification succeeds
		// Such as, setting a user as "verified" in a database
		return NextResponse.json({ verifyRes, status: 200 })
	} else {
		// This is where you should handle errors from the World ID /verify endpoint.
		// Usually these errors are due to a user having already verified.
		return NextResponse.json({ verifyRes, status: 400 })
	}
}
```

## Success Result on World App

If implemented correctly, the user will see the following drawer on World App.

<div className="grid justify-items-center text-center">
  <video className="m-auto" width="300" autoPlay muted loop playsInline>
    <source src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/verify-command.mp4?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=0ba2707f8334750e798e0400a4a72d94" type="video/mp4" data-path="images/docs/mini-apps/commands/verify-command.mp4" />

    Your browser does not support the video tag.
  </video>
</div>


# Wallet Authentication
Source: https://docs.world.org/mini-apps/commands/wallet-auth



<Note type="warning">
  Use Wallet Authentication as the primary auth flow. Do not use the Verify
  command for login purposes.
</Note>

Wallet Authentication provides native support for [SIWE](https://eips.ethereum.org/EIPS/eip-4361) and it's the recommended way to authenticate users in your mini app.
This provides your app with access to a User object that contains the user's wallet address, username, and other information.

```tsx
export type User = {
  walletAddress?: string;
  username?: string;
  profilePictureUrl?: string;
  permissions?: {
    notifications: boolean;
    contacts: boolean;
  };
  optedIntoOptionalAnalytics?: boolean;
  worldAppVersion?: number;
  deviceOS?: string;
};
```

In addition we have two helper functions to make it easier to get User information.

```tsx
MiniKit.getUserByAddress(address: string): Promise<User>
MiniKit.getUserByUsername(username: string): Promise<User>

// Returns
return {
    walletAddress: '0x...',
    username: 'John Doe',
    profilePictureUrl: 'https://example.com/profile.png',
};
```

## How it works

Using [NextAuth](https://authjs.dev/getting-started) you can easily create and manage sessions for your app. The starter template is already set up with NextAuth.
To extend this to other wallet providers, you simply need to trigger the wallet auth command and verify the response with [verifySiweMessage](https://github.com/worldcoin/minikit-js/blob/c3aff19f80d07fe1635e68541f91205862500baa/demo/next-15-template/src/auth/index.ts#L41-L74).

<Note>
  Starting from World App 2.8.79 and higher, we support the standard SIWE
  verification library.
</Note>

## Creating the nonce

Since the user can modify the client, it's important to create the nonce in the backend. **The nonce must be at least 8 alphanumeric characters in length.**

```ts app/api/nonce.ts
import {cookies} from "next/headers"; import {(NextRequest, NextResponse)} from "next/server";

export function GET(req: NextRequest) {
  // Expects only alphanumeric characters
  const nonce = crypto.randomUUID().replace(/-/g, "");

// The nonce should be stored somewhere that is not tamperable by the client
// Optionally you can HMAC the nonce with a secret key stored in your environment
cookies().set("siwe", nonce, { secure: true });
return NextResponse.json({ nonce });
}

```

## Using the command

<Tabs>
  <Tab title="Async handlers">
    ### Sending & handling the command response

    Below is the expected input for `walletAuth`.

    ```ts
    interface WalletAuthInput {
    	nonce: string
    	expirationTime?: Date
    	statement?: string
    	requestId?: string
    	notBefore?: Date
    }
    ```

    Using the async `walletAuth` command.

    ```tsx app/page.tsx
    import { MiniKit, WalletAuthInput } from '@worldcoin/minikit-js'
    // ...
    const signInWithWallet = async () => {
    	if (!MiniKit.isInstalled()) {
    		return
    	}
    	const res = await fetch(`/api/nonce`)
    	const { nonce } = await res.json()

    	const {commandPayload: generateMessageResult, finalPayload} = await MiniKit.commandsAsync.walletAuth({
    		nonce: nonce,
    		requestId: '0', // Optional
    		expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    		notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    		statement: 'This is my statement and here is a link https://worldcoin.com/apps',
    	})
    	// ...
    ```

    The returned message (in final payload) will include a signature compliant with [ERC-191](https://eips.ethereum.org/EIPS/eip-191).
    You're welcome to use any third party libraries to verify the payloads for SIWE.

    ```tsx
    type MiniAppWalletAuthSuccessPayload = {
    	status: 'success'
    	message: string
    	signature: string
    	address: string
    	version: number
    }
    ```

    ```tsx app/page.tsx
    const signInWithWallet = async () => {
    	if (!MiniKit.isInstalled()) {
    		return
    	}

    	const res = await fetch(`/api/nonce`)
    	const { nonce } = await res.json()

    	const { commandPayload: generateMessageResult, finalPayload } = await MiniKit.commandsAsync.walletAuth({
    		nonce: nonce,
    		requestId: '0', // Optional
    		expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    		notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    		statement: 'This is my statement and here is a link https://worldcoin.com/apps',
    	})

    	if (finalPayload.status === 'error') {
    		return
    	} else {
    		const response = await fetch('/api/complete-siwe', {
    			method: 'POST',
    			headers: {
    				'Content-Type': 'application/json',
    			},
    			body: JSON.stringify({
    				payload: finalPayload,
    				nonce,
    			}),
    		})
    	}
    }
    ```

    You can now additionally access the user's wallet address from the minikit object.

    ```tsx
    const walletAddress = MiniKit.walletAddress
    // or
    const walletAddress = window.MiniKit?.walletAddress
    ```
  </Tab>

  <Tab title="Event listeners">
    ### Sending the command

    Below is the expected input for `walletAuth`.

    ```ts
    interface WalletAuthInput {
    	nonce: string
    	expirationTime?: Date
    	statement?: string
    	requestId?: string
    	notBefore?: Date
    }
    ```

    Using the `walletAuth` command.

    ```tsx app/page.tsx
    import { MiniKit, WalletAuthInput } from '@worldcoin/minikit-js'
    // ...
    const signInWithWallet = async () => {
    	const res = await fetch(`/api/nonce`)
    	const { nonce } = await res.json()

    	const generateMessageResult = MiniKit.commands.walletAuth({
    		nonce: nonce,
    		requestId: '0', // Optional
    		expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    		notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    		statement: 'This is my statement and here is a link https://worldcoin.com/apps',
    	})
    }
    ```

    ### Receiving the response

    The returned message will include a signature compliant with [ERC-191](https://eips.ethereum.org/EIPS/eip-4361).

    ```tsx
    type MiniAppWalletAuthSuccessPayload = {
    	status: 'success'
    	message: string
    	signature: string
    	address: string
    	version: number
    }
    ```

    ```tsx app/page.tsx
    import { ResponseEvent } from '@worldcoin/minikit-js'
    // ...
    useEffect(() => {
    	if (!MiniKit.isInstalled()) {
    		return
    	}

    	MiniKit.subscribe(ResponseEvent.MiniAppWalletAuth, async payload => {
    		if (payload.status === 'error') {
    			return
    		} else {
    			const response = await fetch('/api/complete-siwe', {
    				method: 'POST',
    				headers: {
    					'Content-Type': 'application/json',
    				},
    				body: JSON.stringify({
    					payload: payload,
    					nonce,
    				}),
    			})
    		}
    	})

    	return () => {
    		MiniKit.unsubscribe(ResponseEvent.MiniAppWalletAuth)
    	}
    }, [])
    ```

    You can now additionally access the user's wallet address from the minikit object.

    ```tsx
    const walletAddress = MiniKit.walletAddress
    // or
    const walletAddress = window.MiniKit?.walletAddress
    ```
  </Tab>
</Tabs>

## Verifying the Login

Finally, complete the sign in by verifying the response from World App in your backend. Here we check the nonce matches the one we created earlier, and
then verify the signature.

```ts app/api/complete-siwe.ts
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  MiniAppWalletAuthSuccessPayload,
  verifySiweMessage,
} from "@worldcoin/minikit-js";

interface IRequestPayload {
  payload: MiniAppWalletAuthSuccessPayload;
  nonce: string;
}

export const POST = async (req: NextRequest) => {
  const { payload, nonce } = (await req.json()) as IRequestPayload;
  if (nonce != cookies().get("siwe")?.value) {
    return NextResponse.json({
      status: "error",
      isValid: false,
      message: "Invalid nonce",
    });
  }
  try {
    const validMessage = await verifySiweMessage(payload, nonce);
    return NextResponse.json({
      status: "success",
      isValid: validMessage.isValid,
    });
  } catch (error: any) {
    // Handle errors in validation or processing
    return NextResponse.json({
      status: "error",
      isValid: false,
      message: error.message,
    });
  }
};
```

## Success Result on World App

If implemented correctly, the user will see the following drawer on World App.

<div className="grid justify-items-center text-center">
  <video className="m-auto" width="300" autoPlay muted loop playsInline>
    <source src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/wallet-auth-command.mp4?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=25fa5fd258d8f94f02517a405d4ddccc" type="video/mp4" data-path="images/docs/mini-apps/commands/wallet-auth-command.mp4" />

    Your browser does not support the video tag.
  </video>
</div>

## SIWE Implementations

* **Privy**: You can find a complete integration guide at [Worldcoin Mini App SIWE with Privy](https://docs.privy.io/recipes/react/worldcoin-siwe-guide)

## Alternative Authentication Methods

* **OAuth** (Google, Apple, etc.): These providers are supported but it's recommended to trigger this outside of the World App and then redirect back to your mini app with the access token `worldapp://mini-app?app_id=appId&path=/handle-oauth?accessToken=...`.
* **Sign in with World ID**: Not recommended as it doesn't provide the user's wallet address.


# Data & Analytics
Source: https://docs.world.org/mini-apps/growth/analytics



Track only what answers **critical product questions**—nothing more.\
This page shows you **what to measure, why, and how to start in one sprint**.

## 1 · Mental Model *Q → M → E*

> **Question → Metric → Event**

1. **Question** you want answered
2. **Metric** that quantifies it
3. **Event** (or two) that feed that metric

| Product Question             | Metric (M)                    | Minimal Events (E)               |
| ---------------------------- | ----------------------------- | -------------------------------- |
| Do users see value on day 0? | **Conversion to First Value** | `signup`, `first_value`          |
| Do they come back?           | **D1 / D7 Retention**         | `app_open`                       |
| Will growth be organic?      | **Invite Acceptance Rate**    | `invite_sent`, `invite_accepted` |
| Can we re‑engage them?       | **Push Open Rate**            | `notification_open`              |

If an event doesn't roll up to a key question, skip it.

## 2 · Core Event Set (6 Lines of Code)

```ts
track('app_open') // every launch
track('signup', { method: 'id' })
track('first_value', { action: '🎉' })
track('invite_sent')
track('invite_accepted')
track('notification_open')
```

That is enough to build funnels, retention, and viral metrics.

## 3 · Action Plan

**Focus on these 4 metrics weekly until they're all green:**

* **Signup → First Value %** (target: ≥40%) - Are users getting value immediately?
* **D1 Retention** (target: ≥25%) - Are they coming back the next day?
* **Invite Acceptance %** (target: ≥15%) - Is word-of-mouth working?
* **Push Open %** (target: ≥15%) - Can we re-engage users?

**Next steps:** Pick the lowest metric and spend 1-2 sprints fixing it. Don't touch anything else until all four are hitting targets.

## 4 · Common Pitfalls to Dodge

* **Event sprawl** – >10 events = analysis paralysis.
* **Vanity charts** – page views ≠ value.
* **No cohorts** – averages hide churn.
* **Premature segmentation** – wait for 1k users.
* **Ignoring retention** – acquisition is useless without it.

Analytics should light the path, not become the journey. Keep it lean, learn fast, and build what moves the needle.


# Gamification
Source: https://docs.world.org/mini-apps/growth/gamification



Gamification isn't about turning your app into a game—it's about using proven psychological principles to make routine actions more engaging and rewarding.

## Why It Works

Game mechanics tap into fundamental human psychology: our need for achievement, progress, and social comparison. Duolingo saw retention jump from 12% D1 to 55% after implementing streak mechanics. The key is choosing mechanics that align with your core user behavior, not just adding badges everywhere.

## Core Mechanics by Impact & Effort

| Mechanic            | Effort | Why It Works                                            | Quick Implementation                                         |
| ------------------- | ------ | ------------------------------------------------------- | ------------------------------------------------------------ |
| **Daily Streaks**   | ★★☆☆☆  | Creates habit formation; users hate breaking chains     | Track daily actions, show streak count, celebrate milestones |
| **Progress Bars**   | ★☆☆☆☆  | Visual momentum; users hate seeing 80% incomplete       | CSS progress indicators for any goal completion              |
| **Badges & Levels** | ★★☆☆☆  | Collectibles trigger completion bias                    | Emoji icons + achievement unlocks                            |
| **Leaderboards**    | ★★☆☆☆  | Social comparison drives engagement                     | Simple top 10 list, refresh weekly                           |
| **Mystery Rewards** | ★★☆☆☆  | Variable rewards release dopamine (slot machine effect) | Daily random reward from small pool                          |

## Strategic Implementation

### 1. Daily Streaks

**Why this first**: Highest retention impact with moderate effort. Creates powerful daily habit loops.

**Core concept**: Track consecutive days of user activity, celebrate milestones, make breaking streaks feel costly.

**Implementation strategy**:

* Store `currentStreak`, `longestStreak`, `lastActiveDate` per user
* Check daily: consecutive day = +1, gap = reset to 1
* Celebrate at days 3, 7, 14, 30 with visual rewards
* Show streak prominently in app header

```typescript
// Simple streak logic
const updateStreak = (lastActive: string) => {
	const daysSinceLastActive = getDaysDifference(lastActive, today)
	return daysSinceLastActive === 1 ? streak + 1 : 1
}
```

### 2. Progress Bars & Visual Momentum

Users hate leaving things 80% complete. Visual progress creates urgency to finish.

**Where to use**:

* **Profile completion:** 2/5 steps remaining
* **Daily/weekly goals:** 7/10 tasks done
* **Social milestones:** 3/5 friends invited
* **Skill progression**: Level 4: 80% to Level 5

**Key principle**: Always show progress toward the next achievable milestone, not distant end goals.

### 3. Achievement Badges

**Strategy**: Create collectible moments that trigger completion bias and provide social proof.

**Badge categories that work**:

* **Onboarding**: "First Steps" (welcome badge), "Explorer" (tried 3 features)
* **Social**: "Social Butterfly" (first share), "Connector" (5 friends invited)
* **Engagement**: "Week Warrior" (7-day streak), "Power User" (daily active for 30 days)
* **Milestones**: "High Achiever" (reached level 10), "Completionist" (100% profile)

**Design tips**:

* Make early badges easy to get within first session
* Create clear progression: Common → Rare → Epic
* Show badge collection in user profile for social proof

### 4. Social Leaderboards

**When to use**: Best for apps with clear scoring metrics (points, levels, achievements completed).

**Types that work**:

* **Weekly leaderboards**: Reset regularly so everyone has a chance
* **Friend leaderboards**: Compare with people you know (higher engagement)
* **Category leaderboards**: "Top Streaks", "Most Social", "Fastest Completion"

**Key strategies**:

* Keep it simple: Top 10 list with current user highlighted
* Refresh weekly to prevent permanent dominance
* Only show verified users to prevent gaming

**World App advantage**: World ID ensures fair competition with one-person-one-account guarantee.

### 5. Variable Reward Systems

**Psychology**: Variable rewards trigger dopamine more than predictable ones (slot machine effect).

**Implementation ideas**:

* **Daily mystery box**: Random reward from a small pool (coins, badges, features)
* **Streak bonuses**: Random multiplier for milestone completions
* **Surprise rewards**: Occasional "lucky day" bonuses for regular actions
* **Loot boxes**: Earned through achievements, contain random useful items

**Reward pool strategy**:

* 70% common rewards (small coin amounts, basic items)
* 25% rare rewards (larger bonuses, temporary premium features)
* 5% epic rewards (exclusive badges, significant bonuses)

**Key principle**: Make the anticipation of opening more exciting than the reward itself.

## Design Principles

### 1. One Core Loop

Pick one primary habit loop and nail it before adding more.
**Example flow**: Daily check-in → earn streak → unlock reward → share achievement → invite friends

### 2. Early Wins

Users should earn their first badge/reward within 30 seconds of first use. This creates immediate positive reinforcement and sets expectations for future rewards.

### 3. Surface Progress Everywhere

* Show current streak in app header/navigation
* Display progress bars for any incomplete goals
* Badge count in user profile for social proof
* Preview next achievable reward/milestone

### 4. Measure & Optimize

Track key events: `streak_extended`, `badge_earned`, `leaderboard_viewed`, `reward_claimed`

**Golden rule**: If a mechanic doesn't improve D7 retention after 2 weeks, remove it.

## Common Pitfalls

1. **Over-gamification**: Don't add badges for every tiny action—dilutes achievement value
2. **Participation trophies**: Make early badges easy but later ones meaningful
3. **Pay-to-win mechanics**: Keep purchases separate from core progression
4. **Feature creep**: Start with one mechanic, prove it works, then expand

## Your Next Steps

1. **Start simple**: Implement daily streaks first—highest impact for effort invested
2. **Add visual progress**: One progress bar or completion indicator
3. **Create 3-5 early badges**: Tied directly to your core user actions
4. **Measure ruthlessly**: Track D7 retention before/after each mechanic
5. **Expand gradually**: Only add new mechanics after current ones prove effective

The goal isn't to build a game —it's to make your core experience more engaging and habit-forming.


# Overview
Source: https://docs.world.org/mini-apps/growth/index



A focused, step-by-step guide to growing your mini app within the World ecosystem. Everything is scoped to what an indie hacker or small team can realistically ship in a few weeks.

## Overview & Philosophy

Building a successful mini app requires more than great features—you need users to discover, engage with, and stick around. This growth playbook focuses on four key areas that drive sustainable growth:

1. **[Invites & Viral Loops](/mini-apps/growth/invites-viral)** - Turn your users into advocates
2. **[Gamification](/mini-apps/growth/gamification)** - Build engagement through game mechanics
3. **[Retention via Notifications](/mini-apps/growth/notifications)** - Keep users coming back
4. **[Data & Analytics](/mini-apps/growth/analytics)** - Measure what matters

## Real-World Results

The strategies in this playbook are based on proven case studies:

* **PayPal's referral program**: 7-10% daily growth
* **Dropbox's two-sided rewards**: 3900% growth in 15 months
* **Duolingo's streak mechanics**: Retention jumped from 12% to 55%


# Invites & Viral Loops
Source: https://docs.world.org/mini-apps/growth/invites-viral



## Why It Works

Referral programs are proven growth drivers because they leverage trust. People are 4x more likely to try something recommended by a friend versus discovering it through ads. PayPal's $20/$20 referral program produced 7-10% daily growth, while Dropbox's free storage rewards drove 3900% growth in 15 months.

## Step-by-Step Implementation

### 1. Set Up Universal Links

Create server-side invite pages that work across all platforms:

```typescript
// pages/invite.tsx
export default function InvitePage({ code }: { code: string }) {
	useEffect(() => {
		// Redirect to mini app
		window.location.href = `https://world.org/mini-app?app_id=${YOUR_APP_ID}&path=/invite?code=${code}`
	}, [code])

	return <div>Redirecting to mini app...</div>
}
```

Universal-link format

`https://world.org/mini-app?app_id={app_id}&path={path}`

Deep-link (opens World App directly if installed)

`worldapp://mini-app?app_id={app_id}&path={path}`

To force opening in the device browser instead of the native webview, append `open_out_of_window=true` to the URL (works for both universal and deep links).

### 2. Generate Share Links

Create a shareable link that includes the referral information:

```typescript
function generateInviteLink(userId: string): string {
  const baseUrl = "https://world.org/mini-app";
  const appId = "your_app_id";
  const path = encodeURIComponent(`/invite?code=${userId}`);

  return `${baseUrl}?app_id=${appId}&path=${path}`;
}
```

### 3. Implement Share Functionality

Add share buttons at key moments in your user journey:

```typescript
import { MiniKit } from "@worldcoin/minikit-js";

async function shareInvite() {
  const inviteLink = generateInviteLink(currentUser.id);

  try {
    await MiniKit.commandsAsync.share({
      title: "Join me on [Your App Name]!",
      text: `I'm using this amazing mini app. Join me and we both get rewards! 🎁`,
      url: inviteLink,
    });

    // Track the share event
    trackEvent("invite_link_created", {
      user_id: currentUser.id,
      share_method: "native",
    });
  } catch (error) {
    console.error("Share failed:", error);
  }
}
```

### 4. Handle Incoming Referrals

Process referral codes when new users sign up:

```typescript
// On app initialization
function handleReferral() {
  const urlParams = new URLSearchParams(window.location.search);
  const refCode = urlParams.get("ref");

  if (refCode && !currentUser.referredBy) {
    // Credit the referrer
    fetch("/api/process-referral", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        newUserId: currentUser.id,
        referrerCode: refCode,
      }),
    });
  }
}
```

### 5. Reward System

Implement two-sided rewards that benefit both parties:

```typescript
// api/process-referral.ts
export async function processReferral(data: {
  newUserId: string;
  referrerCode: string;
}) {
  const referrer = await getUserByCode(data.referrerCode);
  if (!referrer) {
    return { success: false, reason: "invalid_referrer" };
  }

  // Credit both users
  await Promise.all([
    creditUser(referrer.id, {
      type: "referral_bonus",
      amount: 100,
      reason: "Friend joined via your invite",
    }),
    creditUser(data.newUserId, {
      type: "signup_bonus",
      amount: 50,
      reason: "Welcome bonus for joining via invite",
    }),
  ]);

  return { success: true };
}
```

### 6 · Support Deferred Deep Links (Android)

```
https://play.google.com/store/apps/details?id=com.worldcoin&referrer=app_id%3D{app_id}%26path%3D{path}
```

World App prompts the install and then automatically forwards the user to your specified path.

### Optimising Social-Share Previews

Specify a meta-tag image in the developer portal. If unset, the first showcase image is used. Localised versions are supported so you can translate on-image text.

### Inside World App Discovery

* **Quick Actions**: Mini apps can hand off context to one another. Split distinct flows into focused apps that trigger each other with Quick Actions.

* **Widget**: Your mini app can live on the phone's home screen. Prompt the user to add the mini app as a widget in the home screen.

<div className="flex justify-center">
  <img src="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/virality/widget.jpg?fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=a218caf7c3c56916ace928e9d83fe564" alt="Widget" className="m-auto block" width="260" style={{ maxWidth: "260px", height: "auto" }} data-og-width="1179" data-og-height="2556" data-path="images/docs/mini-apps/virality/widget.jpg" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/virality/widget.jpg?w=280&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=73905781faac3d04769f80f84005962b 280w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/virality/widget.jpg?w=560&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=5e18889924dd43e82c1f7cf58cdac076 560w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/virality/widget.jpg?w=840&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=c2b15da2a3ae2b71e5d98ee17a2c5da1 840w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/virality/widget.jpg?w=1100&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=13211441c327893c84f446beb214359a 1100w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/virality/widget.jpg?w=1650&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=d2ce8450c6e414881f7998091fca2a4a 1650w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/virality/widget.jpg?w=2500&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=46d1e6a09906707fb43a25180c986037 2500w" />
</div>

Widget on iOS

## Design Best Practices

### Placement Strategy

* **After first value delivery**: When user completes their first meaningful action
* **Post-achievement**: Right after earning a badge, completing a level, or winning
* **Onboarding finale**: As the last step of user setup

### Copy That Converts

* **Personal benefit first**: "Get 100 coins for each friend who joins"
* **Mutual benefit**: "You both get rewards when they sign up"
* **Social proof**: "Join 10,000+ users already earning rewards"

### Visual Design

* Use prominent, action-oriented buttons ("Invite Friends", "Share & Earn")
* Show potential rewards clearly with icons or progress bars
* Include preview of what the shared content looks like

## Metrics to Track

Monitor these key events to measure your viral loop performance:

```typescript
// Essential tracking events
const events = {
  invite_link_created: { user_id, share_method },
  invite_link_clicked: { ref_code, source },
  signup_source_invite: { ref_code, new_user_id },
  referral_reward_granted: { referrer_id, new_user_id, reward_amount },
};
```

### Key Metrics Dashboard

* **Invite Conversion Rate**: (Signups from invites) / (Total invite links clicked)
* **K-Factor**: (New users from invites) / (Total active users)
* **Viral Cycle Time**: Average time from invite sent to new user activated
* **Reward Cost per Acquisition**: Total rewards paid / New users acquired

## Quick A/B Test Ideas

Test these variables to optimize your viral loop:

1. **Reward Amount**: Test 50 vs 100 vs 200 coin rewards
2. **Timing**: Share prompt after first win vs after onboarding
3. **Copy**: Personal benefit vs mutual benefit messaging
4. **Incentive Type**: Coins vs premium features vs exclusive content

<Warning>
  Start with small reward amounts and scale up based on unit economics. Cap
  total lifetime rewards per user to control costs.
</Warning>

## Next Steps

1. Implement universal links for your invite flow
2. Add share buttons after key user achievements
3. Set up two-sided rewards with World ID verification
4. Track invite metrics and run small A/B tests
5. Scale successful invite mechanics across more touchpoints


# Retention via Notifications
Source: https://docs.world.org/mini-apps/growth/notifications



Thoughtful, behavior‑based notifications keep users engaged long after they close your Mini App. Done right, they lift retention and even earn you a coveted **home‑screen badge** in World App.

### 1 · Why They Matter

| Benefit              | Details                                                              |
| -------------------- | -------------------------------------------------------------------- |
| **Retention boost**  | Targeted pushes can 2–3× day‑7 retention.                            |
| **Free visibility**  | ≥ 15 % open rate unlocks a persistent badge on your app icon.        |
| **Strict standards** | \< 10 % open = delivery paused for 7 days—quality is non‑negotiable. |

### 2 · Quality Thresholds

| Open‑Rate (7‑day) | Platform Action   | Your Next Step                    |
| ----------------- | ----------------- | --------------------------------- |
| **\< 10%**        | Paused for 1 week | Audit triggers & copy immediately |
| **10%+**          | Badge displayed   | Maintain & iterate                |
| **25%+**          | "Excellent" tier  | Scale what works, test new ideas  |

### 3 · Core Principles

1. **Trigger‑based > Broadcasts** – React to *user actions* (wins, risks) instead of fixed schedules.
2. **Personalize** – Use `${username}` placeholder to personalize notifications with usernames.
3. **Copy rules** – ≤ 30‑char title, 1–2 emojis, clear value + curiosity gap.

### 4 · Trigger Library

| Trigger          | Why It Works          | Sample Title                      |
| ---------------- | --------------------- | --------------------------------- |
| **Achievement**  | Users love quick wins | `🎉 Level 2 unlocked!`            |
| **Streak Risk**  | Loss aversion         | `🔥 Keep your 5‑day streak alive` |
| **Social**       | FOMO / competition    | `👀 Maya just beat your score`    |
| **Limited‑time** | Urgency               | `⏰ Double rewards end in 2 h`     |
| **Re‑engage**    | Gentle nudge          | `🚀 Welcome back bonus ready`     |

### 5 · Frequency & Control

* **Start** at **≤ 1 push/day**; add more only if retention rises.
* Present a clear **opt‑out** path; trust drives long‑term engagement.

### 6 · Copy Cheatsheet

* **Lead with benefit**: "Earn 50 coins" beats "Check the app".
* **Curiosity**: "Something new awaits …".
* **Concrete numbers**: "30 s left" > "Hurry up".
* **Avoid** vague, generic, or feature‑only blasts.

### 7 · Test & Improve

| Variable       | What to Try           |
| -------------- | --------------------- |
| Emoji          | 🔥 vs ⚡               |
| Timing         | Instant vs +2 h       |
| CTA            | "Claim" vs "Open now" |
| Content length | Short vs rich preview |

### 8 · Integrations

* **Gamification** – Push on badge earned, streak day, leaderboard change.
* **Virality** – Notify referrer when invitee signs up or hits milestones.
* **Core value** – Release drops, new content, feature unlocks.

### 9 · Home‑Screen Badge

<div className="flex justify-center">
  <img src="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/notifications/notification-badges.jpg?fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=439b5fab2474bd1cd8203ba41690ad11" alt="Notification badges on home screen" className="m-auto block" width="260" style={{ maxWidth: "260px", height: "auto" }} data-og-width="591" data-og-height="1280" data-path="images/docs/mini-apps/notifications/notification-badges.jpg" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/notifications/notification-badges.jpg?w=280&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=82cce7d2c7cc8003fc085283e50bdfa9 280w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/notifications/notification-badges.jpg?w=560&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=0e9f6e1ad2de5bed874258761f1560a0 560w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/notifications/notification-badges.jpg?w=840&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=5c691b9951f5b506afacc6f9f4349099 840w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/notifications/notification-badges.jpg?w=1100&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=bd91c5d1d694de8e2c79de5784807701 1100w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/notifications/notification-badges.jpg?w=1650&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=e8cf3391547722ba215499cf96b27b84 1650w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/notifications/notification-badges.jpg?w=2500&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=3a2a12054919044144a9b08bd2aa62a8 2500w" />
</div>

Maintain ≥ 15 % opens to display this permanent badge—top‑of‑mind visibility every time users open World App.

### 10 · Implementation Checklist

* [ ] Ask permission **after** first value delivered
* [ ] Use `${username}` in every push
* [ ] Include `mini_app_path` deep link
* [ ] Limit to ≤ 1 notification/day at launch
* [ ] Monitor 7‑day open rate weekly
* [ ] A/B test copy monthly
* [ ] Iterate triggers; retire low performers


# App Guidelines
Source: https://docs.world.org/mini-apps/guidelines/app-guidelines



## Mobile First

Mini apps are inherently accessed via mobile, so your application UI should look and feel like a mobile app.

### Key considerations for a mobile-first experience:

* Use tab navigation to simplify movement within the app.
* Implement snap-to text boxes for easy user input.
* Avoid footers, sidebars, and excessive scrolling.
* Provide clear and direct navigation without hamburger menus.
* Ensure smooth transitions between different screens or sections.
* Use consistent background colors for a cohesive visual experience.
* Provide clear navigation cues to help users understand where they are and how to proceed.
* Ensure all UI elements are responsive and adapt well to different screen sizes.
* Use fonts that are optimized for readability on mobile devices.
* Include a splash page for sign-in if needed.

<div className="grid grid-cols-2">
  <div className="grid justify-items-center text-center">
    <video className="m-auto" width="300" autoPlay muted loop playsInline>
      <source src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/guidelines/bad-compressed.mp4?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=7f75177201cbc9b01c0b3c2c13d3a01d" type="video/mp4" data-path="images/docs/mini-apps/guidelines/bad-compressed.mp4" />

      Your browser does not support the video tag.
    </video>

    ❌ Bad Example <br /> Footer and long scrolling
  </div>

  <div className="grid justify-items-center text-center">
    <video className="m-auto" width="300" autoPlay muted loop playsInline>
      <source src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/guidelines/good-compressed.mp4?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=68a720b38de70fad972a2176c9078dd3" type="video/mp4" data-path="images/docs/mini-apps/guidelines/good-compressed.mp4" />

      Your browser does not support the video tag.
    </video>

    ✅ Good Example <br /> Bottom tab navigation and anchored buttons
  </div>
</div>

## Scroll Bounce on IOS.

We recommend you avoid scroll bounce error on iOS devices. Try disabling autoscroll & maybe fixed position elements or using 100dvh instead of 100vh.

If you are not using a bottom navigation bar, you can use the following CSS to disable the scroll bounce error:

```css
html,
body {
  width: 100vw;
  height: 100vh;
  overscroll-behavior: none;
  overflow: hidden;
}
```

Alternatively, you can try this approach which allows scrolling while still preventing the bounce effect:

```css
html,
body {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: none;
  overflow: scroll;
}
```

## Design Patterns

Here are some design patterns that we recommend you follow:

1. When a user is authenticated through their wallet, always show their username instead of the wallet address
2. Use the "Verify" command to confirm important actions or identity verification.
3. When dealing with wallet addresses, use an address book to link them to recognizable usernames or other identifiers

## App Icon

Your app icon should be a **square** image with a non white background.

## Load times

For mini apps, 2-3 seconds max for initial load and under 1 second for subsequent actions should be your target.
However, always test for real-world scenarios and provide visual feedback during loading to maintain user trust.

## Branding & Identity

Do not use the term "official" in your app name, description, or interface. Mini apps are third-party applications and should not create the impression that they are officially endorsed by or affiliated with World.
Mini apps should maintain their own distinct brand identity while integrating with the World ecosystem

Additionally, do not use the **World logo** or any modified version of it in your app.

## Chance based

We recommend developers to avoid building chance based games, as these games have a very low likelihood of being approved.

**Chance based** = prize awarded based on chance, not skill. This means you are using a RNG to determine a winner.
You can still have prizes but they need to be awarded based on skill. Not randomness. So winning a game where I get a prize is skill based.

## Memberships & Yield

Selling memberships or subscriptions that grant users access to increased yield, higher returns, or enhanced earning rates is strictly prohibited. Apps must not offer paid access to features or tiers that boost financial returns.

## No Token Pre-sales

Token pre-sales are strictly prohibited. Mini Apps must not offer, promote, or facilitate token pre-sales in any form.

## NFTs on iOS

Mini Apps may allow users to view their own NFTs, provided that NFT ownership does not unlock features or functionality within the app.
Mini Apps may allow users to browse NFT collections owned by others, provided that the mini apps may not include buttons, external links, or other calls to action that direct customers to purchasing mechanisms other than in-app purchase.

## Localization

Many of our users are located around the world. Apps that are localised for each region will perform significantly better.
You can recognize the user's locale by using the [Accept-Language](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language) header

For next.js apps, you can use [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization) to localize your app.

These languages are particularly important given our users:

1. English
2. Spanish
3. Thai
4. Japanese
5. Korean
6. Portuguese

## Usernames

You should never display the user's wallet address, always use their username.
If you use Sign in with World ID you should not be doing any transactions with the user's wallet address, instead you should be using the username.
Sign in with World ID and Verify offer the same World ID guarantees, but Verify is more reliable.

## Using the Address Book

World ID inherently allows anonymity between applications. We generally encourage
developers to use their own Verify Command and verify the proof. However, we also offer a World ID
address book. This contract stores a mapping `addressVerifiedUntil` you can query to see if a World App
address is World ID Orb verified.

## UI Kit

The Mini Apps UI Kit is a React-based design system for accelerating the development of mini apps. It provides pre-built, reusable UI components that align with World's design guidelines for consistency and high-quality UX.

### Get Started

Install the UI Kit via NPM:

```bash
npm install @worldcoin/mini-apps-ui-kit-react
```

Learn more in the package README and Storybook:

* [Package README](https://www.npmjs.com/package/@worldcoin/mini-apps-ui-kit-react?activeTab=readme)
  href="[https://www.npmjs.com/package/@worldcoin/mini-apps-ui-kit-react?activeTab=readme](https://www.npmjs.com/package/@worldcoin/mini-apps-ui-kit-react?activeTab=readme)"
  target="\_blank"
  > Package README
* [UI Kit Storybook](https://mini-apps-ui-kit.world.org)


# Design Guidelines
Source: https://docs.world.org/mini-apps/guidelines/design-guidelines



This page gives you quick, visual rules to meet a high design standard for mini apps. Each image shows the intended pattern and a short usage note so you can apply it fast.

## Grid and spacing

**Usage**

Padding is set to a default of 24px, providing ample breathing room around elements while maintaining a clean and structured appearance.
<img src="https://mintcdn.com/tfh/a1EEcbcaLLd6WDD5/images/docs/mini-apps/guidelines/base-unit.png?fit=max&auto=format&n=a1EEcbcaLLd6WDD5&q=85&s=a0513fd9ac63eebd91a14ce0796eae80" alt="Base unit" data-og-width="3408" width="3408" data-og-height="2232" height="2232" data-path="images/docs/mini-apps/guidelines/base-unit.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/a1EEcbcaLLd6WDD5/images/docs/mini-apps/guidelines/base-unit.png?w=280&fit=max&auto=format&n=a1EEcbcaLLd6WDD5&q=85&s=91600fd44bdc30a837fbd73c5fafe50c 280w, https://mintcdn.com/tfh/a1EEcbcaLLd6WDD5/images/docs/mini-apps/guidelines/base-unit.png?w=560&fit=max&auto=format&n=a1EEcbcaLLd6WDD5&q=85&s=7a140c8b5e3f853f2adf8d306631da6c 560w, https://mintcdn.com/tfh/a1EEcbcaLLd6WDD5/images/docs/mini-apps/guidelines/base-unit.png?w=840&fit=max&auto=format&n=a1EEcbcaLLd6WDD5&q=85&s=35d5ed2a8204acee29d4f4b01d0b2277 840w, https://mintcdn.com/tfh/a1EEcbcaLLd6WDD5/images/docs/mini-apps/guidelines/base-unit.png?w=1100&fit=max&auto=format&n=a1EEcbcaLLd6WDD5&q=85&s=1c2f432fbd11338cc48ef583b467a7d3 1100w, https://mintcdn.com/tfh/a1EEcbcaLLd6WDD5/images/docs/mini-apps/guidelines/base-unit.png?w=1650&fit=max&auto=format&n=a1EEcbcaLLd6WDD5&q=85&s=428b5067249a4e278bfe2e1e18d1e6e3 1650w, https://mintcdn.com/tfh/a1EEcbcaLLd6WDD5/images/docs/mini-apps/guidelines/base-unit.png?w=2500&fit=max&auto=format&n=a1EEcbcaLLd6WDD5&q=85&s=e7c2a868644d6101149b2f045db5729b 2500w" />

## Paddings

**Usage**

Padding is set to a default of 24px, providing ample breathing room around elements while maintaining a clean and structured appearance.
<img src="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/paddings.png?fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=f7142d97fb8a1b059b56cbc8791d5cae" alt="Paddings" data-og-width="1840" width="1840" data-og-height="1944" height="1944" data-path="images/docs/mini-apps/guidelines/paddings.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/paddings.png?w=280&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=c1c927cd140c42bec9d15120b38d7e2e 280w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/paddings.png?w=560&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=9bb516943c79f9e002f0a8ac291b16c2 560w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/paddings.png?w=840&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=3aed473ce428c84a14e7ef2b461ccf24 840w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/paddings.png?w=1100&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=16a40728d0d01011764932c1a9d06aba 1100w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/paddings.png?w=1650&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=4e505dcdb29d3a6b293c16c2522b58d6 1650w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/paddings.png?w=2500&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=baa254b95a9136e26a519a76838ceb09 2500w" />

## Navigation bar

**Usage**

Except for the control components of Mini Apps in the upper-right corner, all the other contents can be configured for custom designs. If interactive elements need to be set near the control components of Mini Apps, the developer shall note that whether the interaction area will conflict with the control components, and whether the operation is easy.
<img src="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/navigation-bar.png?fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=682863bb1af3484f94f65bffb608486d" alt="Navigation bar" data-og-width="1840" width="1840" data-og-height="1944" height="1944" data-path="images/docs/mini-apps/guidelines/navigation-bar.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/navigation-bar.png?w=280&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=16157f607721f2c23db2e99a99f26895 280w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/navigation-bar.png?w=560&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=d7552ee8dfcd7fcf8c503805cc273f49 560w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/navigation-bar.png?w=840&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=5c5f52f4d6e85ed6f56a29c3b873946d 840w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/navigation-bar.png?w=1100&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=c7fd10046d778038f3660eadbc1582c5 1100w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/navigation-bar.png?w=1650&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=c7e8a0a0c0b1a43026233d09c8559a1d 1650w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/navigation-bar.png?w=2500&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=7ceb12a76673bfd9edccb5d66a44fdb4 2500w" />

## Main pages

<div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
  <div>
    <img src="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-1.png?fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=08a1949650a2398b606a35fa4faebf11" alt="One clear task per page" data-og-width="1840" width="1840" data-og-height="1944" height="1944" data-path="images/docs/mini-apps/guidelines/main-pages-1.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-1.png?w=280&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=0b192a3acc7bf3b0981b53857291064f 280w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-1.png?w=560&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=4cb5729733117db6a0dd06ec335a73cc 560w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-1.png?w=840&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=927b4b9771c69545efee9b1134809e60 840w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-1.png?w=1100&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=a423b66d16e4b038d5b367cb3f9253a6 1100w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-1.png?w=1650&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=966563b2c702a8318e38fcfa78f110fd 1650w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-1.png?w=2500&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=353eecd23d8b2ac83e0d8e34add09db9 2500w" />

    <p className="text-muted-foreground mt-2 text-sm">
      The default space between a header and its associated content is 16px, and
      the same 16px spacing applies between elements within a section. This
      consistent use of spacing helps create a clean visual structure and
      predictable rhythm across the UI.
    </p>
  </div>

  <div>
    <img src="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-2.png?fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=93a760853eb499867f8415276f9f8456" alt="Keep CTAs visible" data-og-width="1840" width="1840" data-og-height="1944" height="1944" data-path="images/docs/mini-apps/guidelines/main-pages-2.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-2.png?w=280&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=aae926db144139cbb171360c65ba1b7c 280w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-2.png?w=560&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=734f7dc3ed7e2fe632f002750d77bf42 560w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-2.png?w=840&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=38ea11469cffb20a5745ef04079ad525 840w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-2.png?w=1100&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=ca77cabb97f9faac1c44aa3def0362e3 1100w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-2.png?w=1650&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=6c8971534a3349063dfbadba100d36e7 1650w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-2.png?w=2500&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=a61fbc29769dd2cc3f979280e095ed32 2500w" />

    <p className="text-muted-foreground mt-2 text-sm">
      The default space between sections is set to 32px, helping to create clear
      separation between distinct areas of content. The space between the search
      bar and the content below is 24px, while the space between a sub-headline
      and its associated content is 16px.
    </p>
  </div>

  <div>
    <img src="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-4.png?fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=1bb942b53b7c9cd756a7e2ed7497d733" alt="Minimize unnecessary scrolling" data-og-width="1840" width="1840" data-og-height="1944" height="1944" data-path="images/docs/mini-apps/guidelines/main-pages-4.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-4.png?w=280&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=352e7c8bb673de0620bd5e5d3967b888 280w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-4.png?w=560&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=9a89117d04aa415f55509c52f3bdd942 560w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-4.png?w=840&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=7ae6d5bc5e765ffb9f0d7a48c37b245e 840w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-4.png?w=1100&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=4a2de9e16d0c2d9af9b6c25d5bfce57e 1100w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-4.png?w=1650&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=e66d348f96751873b6c4d2e207467f13 1650w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-4.png?w=2500&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=d54be92e1dfdc38816d1264f5af2952d 2500w" />

    <p className="text-muted-foreground mt-2 text-sm">
      The default space between header and a section that starts with a sub
      headline is set to 24px.
    </p>
  </div>

  <div>
    <img src="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-5.png?fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=3ca52483d771e6996c4bebb689b3274c" alt="Prioritize primary actions" data-og-width="1840" width="1840" data-og-height="1944" height="1944" data-path="images/docs/mini-apps/guidelines/main-pages-5.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-5.png?w=280&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=752fd2d6fa5f2e20a788f96228555fb2 280w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-5.png?w=560&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=e1693c22fa325866ac1595fcad3b96b0 560w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-5.png?w=840&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=3b185a9ae1fdc770372f7113920352b8 840w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-5.png?w=1100&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=d9ba75dbe71d80d1c024dc1d26f164e0 1100w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-5.png?w=1650&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=62ab4dbe0230dea3afb2442189b8bdcb 1650w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/main-pages-5.png?w=2500&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=75980f7760b2c82a1c53ec46e19634c1 2500w" />

    <p className="text-muted-foreground mt-2 text-sm">
      The default space between last item inside the scrollable area if a bottom
      bar is presented is 32px.
    </p>
  </div>
</div>

## Secondary pages

**Usage**

The default space between a header and its associated content is 24px, while the space between a header and a secondary title is 32px. The space between secondary title and description should be 12px.

<div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
  <img src="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/secondary-pages-1.png?fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=eea026c9f599db7f6b733d33c569ee01" alt="Secondary 1" className="mx-auto w-full max-w-[840px]" data-og-width="2480" width="2480" data-og-height="1944" height="1944" data-path="images/docs/mini-apps/guidelines/secondary-pages-1.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/secondary-pages-1.png?w=280&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=c88ff10d1ad8e4b64ca03d499eb0c7ea 280w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/secondary-pages-1.png?w=560&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=dca8158aacc366cd26dd9721ef9300d5 560w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/secondary-pages-1.png?w=840&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=adc8e507d09f2ea1dde91b7ded4eeaab 840w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/secondary-pages-1.png?w=1100&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=aa835826846d529bd5c2837c15427d44 1100w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/secondary-pages-1.png?w=1650&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=cd7c6a77a9f023190286d155e8f0e6fe 1650w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/secondary-pages-1.png?w=2500&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=0f2bf89a8909dee1e62cddc5b66b2a1e 2500w" />

  <img src="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/secondary-pages-2.png?fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=c021586ce1c9bb53017bdb607f9261c0" alt="Secondary 2" className="mx-auto w-full max-w-[840px]" data-og-width="2480" width="2480" data-og-height="1944" height="1944" data-path="images/docs/mini-apps/guidelines/secondary-pages-2.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/secondary-pages-2.png?w=280&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=085f3bfc3a4eff3cd37e1b5e209c0302 280w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/secondary-pages-2.png?w=560&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=93bea448a143dacb9d7433123c45c146 560w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/secondary-pages-2.png?w=840&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=4828634e75fb0673adb82b7fca5de313 840w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/secondary-pages-2.png?w=1100&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=8d7d38161c2db720e934fca4c74ac055 1100w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/secondary-pages-2.png?w=1650&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=ce4c4302b84a74baf25466810d645f77 1650w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/secondary-pages-2.png?w=2500&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=d268b4c6e60079d3ba4215e225e2c898 2500w" />
</div>

## Tab bar (Android vs iOS)

**Usage**

Navigation bar is positioned with a 12px space from the iOS & Android bottom bar, ensuring optimal accessibility and a comfortable tap area.

<div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
  <div>
    <img src="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/tab-bar-android.png?fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=e3da95feb207e7a7d4eb1276a979c473" alt="Tab bar Android" className="mx-auto w-full max-w-[840px]" data-og-width="2480" width="2480" data-og-height="1944" height="1944" data-path="images/docs/mini-apps/guidelines/tab-bar-android.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/tab-bar-android.png?w=280&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=b85ff5e63979657e318d5a4a71969a59 280w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/tab-bar-android.png?w=560&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=ff062b446b6c8eb6fff818015c5fbb1d 560w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/tab-bar-android.png?w=840&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=81ca00dbb58f3b6a194318f57919a3df 840w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/tab-bar-android.png?w=1100&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=3f669791176c806f065ede4027021dc1 1100w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/tab-bar-android.png?w=1650&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=7f5b49aa762c326ee17309e30b6ebe5a 1650w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/tab-bar-android.png?w=2500&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=9a7bb317f1252635e6365eadb77f888f 2500w" />
  </div>

  <div>
    <img src="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/tab-bar-ios.png?fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=fdf8fba366cba5a13bc2dc86b4c4cb70" alt="Tab bar iOS" className="mx-auto w-full max-w-[840px]" data-og-width="2480" width="2480" data-og-height="1944" height="1944" data-path="images/docs/mini-apps/guidelines/tab-bar-ios.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/tab-bar-ios.png?w=280&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=3baa32173a550794c1a19b4ade79d941 280w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/tab-bar-ios.png?w=560&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=2e442a198db02b9965f499473cb2f02b 560w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/tab-bar-ios.png?w=840&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=4389c7001b2cd5b80f48b81d0ccc2291 840w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/tab-bar-ios.png?w=1100&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=f47ee9a125496c18e850c3ebff66eed4 1100w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/tab-bar-ios.png?w=1650&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=950127da43996cb82fc5b2ff9d3ee0b4 1650w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/tab-bar-ios.png?w=2500&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=3fe5af22e3c4aeb290aa18693b02c52b 2500w" />
  </div>
</div>

## Drawers / sheets (Android vs iOS)

**Usage**

Drawer is positioned with a 12px space from the iOS & Android bottom bar, ensuring optimal accessibility and a comfortable tap area.

<div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
  <div>
    <img src="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/drawers-android.png?fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=e14173c4fa3fa042a6a5654dd7b3876c" alt="Drawers Android" className="mx-auto w-full max-w-[840px]" data-og-width="2480" width="2480" data-og-height="1944" height="1944" data-path="images/docs/mini-apps/guidelines/drawers-android.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/drawers-android.png?w=280&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=eb51a9aad086fd035f8c9ad6d5a58092 280w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/drawers-android.png?w=560&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=cfb66b8a4d565f0f80666b599bcacc4d 560w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/drawers-android.png?w=840&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=612becb56a068c76cf100e1f7711b47f 840w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/drawers-android.png?w=1100&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=a8ca85dca7baf79b4a48186522a3c744 1100w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/drawers-android.png?w=1650&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=c3026c47cb0c6e04406110a4a603fc30 1650w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/drawers-android.png?w=2500&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=2ce349c6a8ee6f338b166be6a0e5684c 2500w" />
  </div>

  <div>
    <img src="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/drawers-ios.png?fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=b806b691e0b3e0079af6553354d0cfaa" alt="Drawers iOS" className="mx-auto w-full max-w-[840px]" data-og-width="2480" width="2480" data-og-height="1944" height="1944" data-path="images/docs/mini-apps/guidelines/drawers-ios.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/drawers-ios.png?w=280&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=64487835c4bac6d4946da697eb3db35a 280w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/drawers-ios.png?w=560&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=6ef5711d60686cabc87944975db99973 560w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/drawers-ios.png?w=840&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=fe56347bf9a799f86a6a3a3d3ee39508 840w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/drawers-ios.png?w=1100&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=b5c830e0a263b31026a4af14eb08308c 1100w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/drawers-ios.png?w=1650&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=6d2715970244a5a2fe3166c52a79ac1c 1650w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/drawers-ios.png?w=2500&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=520de0fa5b2371da3090db7162521f88 2500w" />
  </div>
</div>

## Toasts (Android vs iOS)

**Usage**

The toast message should be horizontally centered and positioned directly below the header to ensure visibility without disrupting user interaction.

<div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
  <div>
    <img src="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/toast-android.png?fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=68e487afb4f9978575fe66b1ec592918" alt="Toast Android" className="mx-auto w-full max-w-[840px]" data-og-width="1840" width="1840" data-og-height="1944" height="1944" data-path="images/docs/mini-apps/guidelines/toast-android.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/toast-android.png?w=280&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=ae7585ef0db065f80eeda3e81aba436e 280w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/toast-android.png?w=560&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=5828f37f3ff0c892153e832792f47a0a 560w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/toast-android.png?w=840&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=96ecada5c50e6688caca575aaa1ea46c 840w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/toast-android.png?w=1100&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=2f4deef76cea0023fb963ce6b298824b 1100w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/toast-android.png?w=1650&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=15d1c386fd68879be293c37d2f4a0070 1650w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/toast-android.png?w=2500&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=23272bb60b6f2441e3522c49490925b1 2500w" />
  </div>

  <div>
    <img src="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/toast-ios.png?fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=ed94c21236d63bd302c004ac5bff4a6a" alt="Toast iOS" className="mx-auto w-full max-w-[840px]" data-og-width="1840" width="1840" data-og-height="1944" height="1944" data-path="images/docs/mini-apps/guidelines/toast-ios.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/toast-ios.png?w=280&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=578eee1a84ee631b47e335a4a01057c1 280w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/toast-ios.png?w=560&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=8ca91d9d76d13dd3d53594805ec28b80 560w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/toast-ios.png?w=840&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=c72e6ef733b26cdaed787a1a4f714f2b 840w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/toast-ios.png?w=1100&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=8d39f7266c15226dbac09a8ac84b5683 1100w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/toast-ios.png?w=1650&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=e6fa6e8b11b10866e931ced57259f016 1650w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/toast-ios.png?w=2500&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=079380ec60d0633d4bf561a687456f66 2500w" />
  </div>
</div>

## Keyboard handling (Android vs iOS)

**Usage**

Buttons are placed 24px above the active keyboard. This spacing ensures that buttons remain easily accessible and visually distinct, even when the keyboard is active, preventing accidental taps or overlap.

<div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
  <div>
    <img src="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/keyboard-android.png?fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=24187fc461c7c0147f2cd94b725ce2fe" alt="Keyboard Android" className="mx-auto w-full max-w-[840px]" data-og-width="1840" width="1840" data-og-height="1944" height="1944" data-path="images/docs/mini-apps/guidelines/keyboard-android.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/keyboard-android.png?w=280&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=ce4f0303afadff01d6ccefdcbd7c864e 280w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/keyboard-android.png?w=560&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=2c32beb2b2d8575823bc5e2b60c5a714 560w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/keyboard-android.png?w=840&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=b7157bddace553cb70f10ecbf8bb6d16 840w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/keyboard-android.png?w=1100&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=2a8fa0cbed72bf7be603ee1ee815772a 1100w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/keyboard-android.png?w=1650&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=850ee3479308cbb8b0a3c99eed332269 1650w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/keyboard-android.png?w=2500&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=b4bd240cf7b00a07d0dfa6e96e667a73 2500w" />
  </div>

  <div>
    <img src="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/keyboard-ios.png?fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=8b7806d2363737cb635827192b588744" alt="Keyboard iOS" className="mx-auto w-full max-w-[840px]" data-og-width="1840" width="1840" data-og-height="1944" height="1944" data-path="images/docs/mini-apps/guidelines/keyboard-ios.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/keyboard-ios.png?w=280&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=603af0a93483f7239f44d67f496edfcb 280w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/keyboard-ios.png?w=560&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=64c475a881b957523f9e9cd941afc63b 560w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/keyboard-ios.png?w=840&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=b08b2e05f846535bdebcdb061a340e2b 840w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/keyboard-ios.png?w=1100&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=211bbb9daf89e371c83d0bde83527c96 1100w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/keyboard-ios.png?w=1650&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=65faacf3ec4d70ae12969bb7e01b5bbb 1650w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/keyboard-ios.png?w=2500&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=6019bfcf133ab2f03c2b5a5717eaba39 2500w" />
  </div>
</div>

## Bottom safe area space (Android vs iOS)

**Usage**

Buttons are positioned with a 24px space from the iOS bottom bar, ensuring optimal accessibility and a comfortable tap area.

<div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
  <div>
    <img src="https://mintcdn.com/tfh/VqXXvgQ8G-9iljWm/images/docs/mini-apps/guidelines/bottom-space-android.png?fit=max&auto=format&n=VqXXvgQ8G-9iljWm&q=85&s=1ee0d4c63b3f173bebf5e3f9421eab2f" alt="Bottom space Android" className="mx-auto w-full max-w-[840px]" data-og-width="2480" width="2480" data-og-height="1944" height="1944" data-path="images/docs/mini-apps/guidelines/bottom-space-android.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/VqXXvgQ8G-9iljWm/images/docs/mini-apps/guidelines/bottom-space-android.png?w=280&fit=max&auto=format&n=VqXXvgQ8G-9iljWm&q=85&s=44f90f25d6d2f412a047b105641d9e4c 280w, https://mintcdn.com/tfh/VqXXvgQ8G-9iljWm/images/docs/mini-apps/guidelines/bottom-space-android.png?w=560&fit=max&auto=format&n=VqXXvgQ8G-9iljWm&q=85&s=b6ac05c6f74601ffe508bf6ed0d07210 560w, https://mintcdn.com/tfh/VqXXvgQ8G-9iljWm/images/docs/mini-apps/guidelines/bottom-space-android.png?w=840&fit=max&auto=format&n=VqXXvgQ8G-9iljWm&q=85&s=3849523e226d7b7d599ce9032ef2bec7 840w, https://mintcdn.com/tfh/VqXXvgQ8G-9iljWm/images/docs/mini-apps/guidelines/bottom-space-android.png?w=1100&fit=max&auto=format&n=VqXXvgQ8G-9iljWm&q=85&s=a91ea79850252d8c9be9dd69ce5cb801 1100w, https://mintcdn.com/tfh/VqXXvgQ8G-9iljWm/images/docs/mini-apps/guidelines/bottom-space-android.png?w=1650&fit=max&auto=format&n=VqXXvgQ8G-9iljWm&q=85&s=8a1be14e8229f03edc6a9cc03ed3d1fb 1650w, https://mintcdn.com/tfh/VqXXvgQ8G-9iljWm/images/docs/mini-apps/guidelines/bottom-space-android.png?w=2500&fit=max&auto=format&n=VqXXvgQ8G-9iljWm&q=85&s=5fec55725ac17f600964af9d8619c5f9 2500w" />
  </div>

  <div>
    <img src="https://mintcdn.com/tfh/VqXXvgQ8G-9iljWm/images/docs/mini-apps/guidelines/bottom-space-ios.png?fit=max&auto=format&n=VqXXvgQ8G-9iljWm&q=85&s=973c75310cdcc2b0dff0f0ee327415aa" alt="Bottom space iOS" className="mx-auto w-full max-w-[840px]" data-og-width="2480" width="2480" data-og-height="1944" height="1944" data-path="images/docs/mini-apps/guidelines/bottom-space-ios.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/VqXXvgQ8G-9iljWm/images/docs/mini-apps/guidelines/bottom-space-ios.png?w=280&fit=max&auto=format&n=VqXXvgQ8G-9iljWm&q=85&s=8e0fc3638c9ce31af5389729b8ee2396 280w, https://mintcdn.com/tfh/VqXXvgQ8G-9iljWm/images/docs/mini-apps/guidelines/bottom-space-ios.png?w=560&fit=max&auto=format&n=VqXXvgQ8G-9iljWm&q=85&s=a63516365ab3534fa8df738a9ed0c161 560w, https://mintcdn.com/tfh/VqXXvgQ8G-9iljWm/images/docs/mini-apps/guidelines/bottom-space-ios.png?w=840&fit=max&auto=format&n=VqXXvgQ8G-9iljWm&q=85&s=1427a8eddcf631fce3babfdacaebe59f 840w, https://mintcdn.com/tfh/VqXXvgQ8G-9iljWm/images/docs/mini-apps/guidelines/bottom-space-ios.png?w=1100&fit=max&auto=format&n=VqXXvgQ8G-9iljWm&q=85&s=da8be70c308a1fd295a26cafb2f14ecf 1100w, https://mintcdn.com/tfh/VqXXvgQ8G-9iljWm/images/docs/mini-apps/guidelines/bottom-space-ios.png?w=1650&fit=max&auto=format&n=VqXXvgQ8G-9iljWm&q=85&s=acf42b6ddafe3dc3e091cd81fcb0f9b3 1650w, https://mintcdn.com/tfh/VqXXvgQ8G-9iljWm/images/docs/mini-apps/guidelines/bottom-space-ios.png?w=2500&fit=max&auto=format&n=VqXXvgQ8G-9iljWm&q=85&s=248b8473c5ba7921877456b2f28a3672 2500w" />
  </div>
</div>

## States

**Usage**

Middle alignment ensures consistency across various screen sizes and component states, making the interface feel polished and intentional. This alignment strategy is especially effective for empty states, loading indicators, or other transient states, providing a seamless and cohesive user experience.
<img src="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/states.png?fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=4375c72af514428b688db039ec02eff5" alt="Common states" data-og-width="2480" width="2480" data-og-height="1944" height="1944" data-path="images/docs/mini-apps/guidelines/states.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/states.png?w=280&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=eba87987cb8f6bc265e18139de39d7ad 280w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/states.png?w=560&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=666ea06689ac8e783ddc4ac8d548ef36 560w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/states.png?w=840&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=2ed12cfb57ef16c752a09197dd147887 840w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/states.png?w=1100&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=024efb09e46b685c06a572e9a3cf2ab0 1100w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/states.png?w=1650&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=8d48d059d5c2cfed0ef406c79bb56d58 1650w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/guidelines/states.png?w=2500&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=69d1ffd74fd1668eb6113439797b0435 2500w" />


# Notification Guidelines
Source: https://docs.world.org/mini-apps/guidelines/features-and-guidelines



## Guidelines

To maintain high-quality notifications, please adhere to the following guidelines:

* Notifications should be purely functional, not marketing-related.
* Notifications must be directly related to the mini app.
* Notifications must be relevant to the user.

## Username Substitution

It's extremely easy to personalize your notifications, by using usernames.
Use the special string `${username}` in your notification message, and it will substitute in
the recipient's username.

<CodeGroup>
  ```bash cURL
  curl -X POST "https://developer.worldcoin.org/api/v2/minikit/send-notification" \
      -H "Authorization: Bearer {api_key}" \
      -H "Content-Type: application/json" \
      -d '{
            "app_id": "app_id", 
            "wallet_addresses": ["0x123", "0x456"], 
            "localisations": [
              {
                "language": "en",
                "title": "title",
                "message": "🧑‍🍳 We're cooking something special for you ${username}"
              }
            ],
            "mini_app_path": "worldapp://mini-app?app_id=[app_id]&path=[path]"
          }'
  ```
</CodeGroup>

when sent to users, the message becomes:\
`🧑‍🍳 We're cooking something special for you mistico`\
`🧑‍🍳 We're cooking something special for you tute`\
`🧑‍🍳 We're cooking something special for you struck`\
and so on.

<div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
  <div>
    ## Notification Badges

    If a user has pending notifications for your miniapp, and you maintain
    a 7 day rolling average open rate of 15% or higher, we'll show a badge on the user's home screen,
    next to your miniapp's icon.

    It's cleared once the miniapp is opened.

    Notification badges increase your miniapp's visibility on the home screen, leading to higher user engagement and traffic.
  </div>

  <div className="flex justify-center">
    <img src="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/notifications/notification-badges.jpg?fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=439b5fab2474bd1cd8203ba41690ad11" alt="Notification Interface in the Developer Portal" className="m-auto block" width="300" data-og-width="591" data-og-height="1280" data-path="images/docs/mini-apps/notifications/notification-badges.jpg" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/notifications/notification-badges.jpg?w=280&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=82cce7d2c7cc8003fc085283e50bdfa9 280w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/notifications/notification-badges.jpg?w=560&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=0e9f6e1ad2de5bed874258761f1560a0 560w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/notifications/notification-badges.jpg?w=840&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=5c691b9951f5b506afacc6f9f4349099 840w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/notifications/notification-badges.jpg?w=1100&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=bd91c5d1d694de8e2c79de5784807701 1100w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/notifications/notification-badges.jpg?w=1650&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=e8cf3391547722ba215499cf96b27b84 1650w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/notifications/notification-badges.jpg?w=2500&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=3a2a12054919044144a9b08bd2aa62a8 2500w" />
  </div>
</div>

## Notification Quality Enforcement

Given that notifications can be disruptive and reflect negatively on the entire miniapp ecosystem,
we enforce additional rules based on open rates. If your miniapp's notification permissions are enabled,
we evaluate your notification open rates weekly (from May 5th 2025 on).

If your miniapp's 7 day rolling average is less than 10%, we will pause any further notifications for a week.
This is a signal for you to rethink your strategy. After the pause, your permissions will be resumed,
and up for reevaluation the following week.

## Open Rate Goal

An excellent goal to aim for is a 25% open rate. This % means your notifications drive strong traffic to the miniapp.
You can see this stat in your dashboard in Developer Portal.

## Use Emoji & Curiosity in Titles

Increases visual salience and emotion.\
Examples:\
`🔥 You're missing out on rewards`\
`🕹️ A new level just unlocked`\
`🤔 What's waiting inside the vault today?`

## Useful links

* [How To Send Notifications](/mini-apps/commands/how-to-send-notifications)
* [How To Request Notification Permissions](/mini-apps/commands/request-permission)
* [How To Get Notification Permissions](/mini-apps/commands/get-permissions)
* [Send Notification API Reference](/mini-apps/reference/api#send-notification)


# App Review Guidelines
Source: https://docs.world.org/mini-apps/guidelines/policy



World App seeks to foster a diverse and flourishing ecosystem of applications while at the same time ensuring users stay safe, and privacy is maximized. These applications are displayed to users within World App, but users interact with these applications either within a web browser or as a platform native application. World App has sole discretion of determining how apps are presented to users within its platform.

These guidelines dictate the rules for apps which seek to be displayed to users from within World App.

## MiniKit Integration

Integrate MiniKit to supercharge your web app with exclusive features like World ID and Wallet access, making your mini app more engaging and valuable to users.

To get your mini app approved, it's essential to use the MiniKit SDK commands effectively to enhance the user experience.
We're looking for meaningful integrations, whether through *World ID* and *Wallet access* , or other creative uses that add real value.

## Safety

The following content is not permitted for apps:

* **Objectionable Content:**
  * Defamatory, discriminatory, or mean-spirited content, including references or commentary about religion, race, sexual orientation, gender, national/ethnic origin, or other targeted groups
  * Realistic portrayals of people or animals being killed, maimed, tortured, or abused, or content that encourages violence.
  * Depictions that encourage illegal or reckless use of weapons and dangerous objects, or facilitate the purchase of firearms or ammunition.
  * Overtly sexual or pornographic material, defined as "explicit descriptions or displays of sexual organs or activities intended to stimulate erotic rather than aesthetic or emotional feelings."
  * NSFW (Not Safe For Work) content of any kind, including bots or AI generators that can produce, distribute, or facilitate access to NSFW content.
  * Inflammatory religious commentary or inaccurate or misleading quotations of religious texts.
  * False information and features, including inaccurate device data or trick/joke functionality, such as fake location trackers.
  * Harmful concepts which capitalize or seek to profit on recent or current events, such as violent conflicts, terrorist attacks, and epidemics.
  * Impersonating TFH or Worldcoin.
* **Physical Harm**
  * If your app behaves in a way that risks physical harm, we may reject it.
  * Apps that encourage consumption of tobacco and vape products, illegal drugs, or excessive amounts of alcohol are not permitted.

## Naming

Apps must comply with the below naming and description guidelines.

* **App naming:**
  * Keep names short and memorable for optimal recall and display.
  * Don't use "World" in the name.
  * Don't use descriptions as Mini App names.
  * Don't use generic functional terms like "Earn", "Swap", etc. as your Mini App name.
  * Don't try to mimic the name of a popular app, as this can lead to confusion. Apps may be rejected or penalized if their names mimic popular brands by simply swapping numbers or case.
  * Do not include trademarked words, names of other apps, or explicit content.
  * Exclude the use of special characters, or emojis.
  * Ensure the name works well in your primary languages, and isn't offensive in other major markets.
* **App description:**
  * Use plain, approachable language that clearly explains what the Mini App does.
  * Describe the benefit or purpose in a straightforward way.
  * Avoid spammy or misleading descriptions.
  * Keep the tone aligned with World's voice: simple, human, and trustworthy. Avoid exaggerated, tech-heavy, or overly promotional phrasing.
  * Write descriptions that are respectful, globally understandable, and free from language that might be offensive in other regions.
  * Don't list functionality like "Earn", "Swap", or "Send" as standalone descriptions. Instead, explain how the app helps the user in their everyday life.
  * Aim for one or two short sentences (under 25 words total) that communicate the app's value quickly. Users should understand the purpose at a glance e.g. Join real local meetups. No accounts, no spam, just one human per invite.

## Legal

Apps must comply with all legal requirements to be listed within World App. This includes the following:

* **Privacy:**
  * **Consent**: All apps that collect and store data from the user must request access and gain approval from the user before doing so
  * **Data Minimization:** Apps should only request access to data that is relevant to how the app functions
* **Regulatory Compliance:** The application itself is responsible for maintaining regulatory compliance in all jurisdictions where it selects to be shown to users. Although the burden of compliance rests on the submitted application, if TFH determines that an application is non-compliant with jurisdiction(s) it has a right to take down the application and ask for it to be re-submitted in jurisdictions where it is compliant

## App Submission

Applications must be submitted for review on the developer platform. Before submission, please ensure the following:

* Test your app for bugs
* Ensure that your app contains a live integration with a Worldcoin SDK, either IDkit or MiniKit
* Ensure that all app information in your dev portal submission is complete and accurate
* Ensure your contact information is updated so the review team can contact you
* Ensure your app can be accessed by the review team for testing
* Ensure your app complies with laws and regulations in the jurisdictions where it is shown to users.
* Check whether your app follows the [app guidelines](/mini-apps/guidelines/app-guidelines)
* Check whether your app follows the [smart contract development guidelines](/mini-apps/guidelines/smart-contract-development-guidelines) (if applicable)
* Check whether your app follows the [notification guidelines](/mini-apps/guidelines/features-and-guidelines) (if applicable)

Ensure your app does not violate any of these guidelines, otherwise your app will be rejected.

## App Review

The review team has sole discretion of approving applications for Mini Apps.

Apps will be reviewed as quickly as possible, though if the app is complex or difficult to test it may take some time. You will receive an email if the review status of your app changes, and you can view updates in the developer portal as well.

Tools for Humanity will approve all submitted apps if it deems the following are true:

* The data submitted in the form is complete and accurate
* The app is complete and contains all necessary copy and functionality to fulfil it’s purpose outlined in the submission
* The app is a final version, and is not a demo, trial or beta version
* The app contains a live integration with IDkit or MiniKit that functioned properly when tested
* The app abides by the safety and legal guidelines

The review team will provide a rationale for any rejections, to which the developer can re-submit after remediating any concerns. If the application continuously fails review for the same reason, it may take longer for subsequent reviews to occur.

Additionally, World App provides users the ability to report apps. If an app is in violation of the safety and legal guidelines or the review team deems the app should be removed for other reasons, the team has the sole discretion to remove an app from the platform. If an app is removed from the platform or an investigation is in progress, the development team will be alerted.

## Technical Requirements

* On Android and iOS, the World App Mini App should support operation under poor internet connections and handle temporary disconnections properly.
* The World App Mini App must be reliable, with no infinite loading during non-standard user actions.
* The World App Mini App must comply with the rules of both the Android and iOS app stores.
* The World App Mini App must not contain features that are unavailable on certain platforms.
* User progress must synchronize seamlessly between different platform versions.

## User Support

* Developers must provide a valid email address for user support and ensure accessible means of communication for resolving any issues that arise.


# What are Mini Apps?
Source: https://docs.world.org/mini-apps/index



<img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps-cover.png?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=5992a903992c158e7fadd564e70bba65" alt="Mini Apps" data-og-width="1600" width="1600" data-og-height="899" height="899" data-path="images/docs/mini-apps-cover.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps-cover.png?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=e0abad716b09aadafe402752e8a1e4a3 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps-cover.png?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=38d5ba07382af87ca6e98ab3aec44c04 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps-cover.png?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=c23957b7206e7894dff12cbd15bd91a0 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps-cover.png?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=c854692cb37f43d7adf36c8996ece188 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps-cover.png?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=0b5ad0b19e20b73b6dfed2f4f09d145b 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps-cover.png?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=9e4b062a78e6916d121de4d37b2daca9 2500w" />

Mini apps enable third-party developers to create native-like applications within World App.
Building a mini app will provide access to our rapidly growing user network and monetization opportunities via WLD and USDC.
In addition, mini apps introduce smart contract support natively inside of World App.

## How it Works

Mini apps are simply web applications opened via webview inside of World App. Using the MiniKit SDK, these applications can become
native-like and interact with the World ecosystem.

## Quick links

<CardGroup cols={2}>
  <Card title="Mini Apps Statistics" icon="chart-simple" href="https://www.miniapps.world/">
    Statistics about the Mini Apps ecosystem.
  </Card>

  <Card title="World App Status" icon="signal" href="https://status.worldcoin.org/">
    Check the current status of World App.
  </Card>
</CardGroup>


# Community Tools & Perks
Source: https://docs.world.org/mini-apps/more/community-tools-perks



Special perks and integrations from trusted providers supporting the World Mini App ecosystem.

<CardGroup cols={2}>
  <Card title="Developer Rewards Pilot" icon="cube" href="https://docs.google.com/forms/d/e/1FAIpQLSfgjLhpcUlocct1KwXapL326CDUQ1zOCEudyF5WO4RAD-wn7A/viewform">
    Pilot program rewarding qualifying Mini App developers based on verified
    human usage. \$300K USD equivalent in WLD over three months.
  </Card>

  <Card title="Grants" icon="cube" href="https://world.org/grants">
    Foundation Grants supporting the World Network and novel mini apps (50M WLD
    dedicated). [Learn more](https://world.org/grants)
  </Card>

  <Card title="Alchemy" icon="flask" href="https://www.alchemy.com/blog/world-mini-app-builder-program">
    4 months free for Enterprise, 3 months free for PAYG, $500–$2000 in bonus
    incentives, plus co-marketing and onsite opportunities
  </Card>

  <Card title="Cloudflare" icon="cloud" href="https://www.cloudflare.com/forstartups/">
    Apply for Cloudflare for Startups program. Use 'World Mini App' as your
    partner when applying.
  </Card>

  <Card title="Lazo" icon="rocket" href="https://www.lazo.us/">
    15% discount on any Lazo product, plus 6 months free of Lazo One (Data Room

    * AI for fundraising).
  </Card>

  <Card title="ThirdWeb" icon="cube" href="https://www.thirdweb.com/">
    30 day free trial for all builders on World Chain. Use code: TW-WORLDCHAIN
  </Card>
</CardGroup>


# FAQ
Source: https://docs.world.org/mini-apps/more/faq



## Who covers gas fees for transactions?

World App sponsors gas fees for most transactions on Worldchain, subject to transaction minimums and restrictions.
When someone verifies their identity with World ID and uses the World App, their transactions on Worldchain are automatically covered by the network.
This means users don't need to hold or spend ETH to interact with mini apps, send tokens, or perform on-chain actions.
The sponsorship is handled behind the scenes with a paymaster contract that pays the gas fees whenever a verified user initiates a transaction.

## Do I need approval to launch a Mini App?

Yes. After development, submit your Mini App for review through the [Developer Portal](https://developer.worldcoin.org/). Approval is required before it's publicly listed.

## How does Send transaction command work?

The [Send Transaction command](/mini-apps/commands/send-transaction) is designed to execute on-chain transactions from the Mini App. When developers invoke this command,
they supply the target contract address, the encoded function call (calldata), and transaction parameters such as value.
For security, World App requires that any smart contract or token interactions are pre-approved (whitelisted) in the Developer Portal to prevent unauthorized transfers.
In cases where ERC-20 tokens are involved, instead of directly calling the approve function (which could expose the contract to front-running or manipulation), permits like Permit2 are used.
Permit2 enables users to sign a transaction off-chain that allows a specific allowance without sending an approval transaction, reducing friction and gas costs while providing a secure, non-custodial mechanism for token transfers.

## How does Sign Message command work?

The [Sign Message command](/mini-apps/commands/sign-message) prompts the user to cryptographically sign an arbitrary message using
their wallet's private key. When you call the command (e.g., MiniKit.commands.signMessage()), World App generates a standardized payload that may include a nonce, timestamp, and other context to prevent replay attacks.
The user's wallet then signs this message using ECDSA, producing a signature that proves the user controls the wallet, all without exposing the private key.
This signed message can be sent back to your backend for verification, ensuring the integrity of user actions and serving as secure off-chain authorization for various operations.

## Can I use the simulator to test transactions on mini apps?

No, mini app needs to be developed on mainnet (we don't support testnet). Gas is covered in the World App, so there's only deployment costs for you to develop on mainnet. Deploy "test" contracts to mainnet, and then redeploy "prod" mainnet contracts.

## How do I debug send transaction failed simulation?

Use the [Get Transaction Debug URL endpoint](/mini-apps/reference/api#get-transaction-debug-url) to get the debug URL for the transaction.

## How do I check how commands work and it's implementation?

Check the [Prod QA App](https://world.org/ecosystem/app_dfbe55706a640c82dce839bb0ecae74d) to check commands and the [minikit-js](https://github.com/worldcoin/minikit-js) repository.

## How do I test my mini app on mobile?

Remember that minikit ONLY works inside World App, so in order to test your mini app commands you must open it in World App

To test your Mini App directly on your phone, expose your app publicly using ngrok or any other tunneling service. After the URL is generated, go to the [Developer Portal](https://developer.worldcoin.org/) to configure it.

Example:

```bash
ngrok http http://localhost:3000
```

## Why does my command fail when triggered immediately on page load?

This happens due to a race condition where MiniKit hasn't finished installing when you try to call a command. Since MiniKit uses a client-side component to install the provider onto the Window object, triggering a command in a separate useEffect hook right after page load can fail.

Solution: Include any commands you want to trigger on initialization inside the same useEffect hook where you install MiniKit:

```tsx
"use client";

import { useEffect, ReactNode } from "react";
import { MiniKit } from "@worldcoin/minikit-js";

export const MiniKitProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    MiniKit.install();

    // Add any commands you wish to trigger on start here to prevent race conditions
    MiniKit.commands.walletAuth({
      // ...
    });
  }, []);

  return <>{children}</>;
};
```

## What security considerations should I keep in mind when building Mini Apps?

MiniKit is purely a communication channel between the client and the app. Your application should never trust any payloads it receives on the client side by default.

All Verify, Pay, and Wallet Auth operations should be verified on your backend. Never rely solely on client-side validation for sensitive operations, as client-side data can be manipulated.
Always implement server-side verification to ensure the integrity and authenticity of user actions.


# Changelog
Source: https://docs.world.org/mini-apps/more/releases

Weekly updates for Mini Apps, Minikit, Dev Portal, and Docs.

<Update label="May 19, 2025">
  ### Mobile

  * \[Android] Multi-file selection added
  * \[iOS] Improved microphone permissions
  * \[Both] Notification badges for the home screen
  * \[Both] Refactored Mini App impressions work
  * \[Both] Transaction failure messages improved

  ### Dev Portal

  * Notification opt-in rate added to the dashboard
  * Updated draft Mini App logic and notifications
  * Sharing and deferred linking

  ### Minikit 1.9.5

  * Added transaction parallelism
  * Updated signed typed data
  * Fixed versioning issues blocking wallet-auth

  ### Docs

  * Updated Send Transaction implementation guide
  * Updated Sign Typed Data implementation guide
  * New integrations for Worldchain
  * Added Oracles to Worldchain
  * Sharing and deferred linking implementation guidelines
</Update>

<Update label="April 30, 2025">
  ### Mobile

  * \[iOS] Enhanced keyboard interaction within the App Store search
  * \[iOS] Fixes for UI issues, including layering and scrolling behavior
  * \[Both] World App 4.0 update: comprehensive updates for Mini Apps
  * \[Both] Updated App Store
  * \[Both] Fixes on deeplinking both internal and from external apps
  * \[Both] Wallet Auth v2 improvements
  * \[Both] The Contacts tab has been moved into Mini App for streamlined navigation
  * \[Both] Updated settings menu and UI/UX enhancements
  * \[Both] Mini App state management enhancements
  * \[Both] New haptic feedback command implemented for Mini Apps
  * \[Both] Spotlight Search now supported for Mini Apps
  * \[Both] Widgets are now customizable with reordering support
  * \[Both] Add the category ranking of the app to the app store detail page
  * \[Both] Get Started page for new users

  ### Minikit

  * New Web3 template
  * New template `npx @worldcoin/create-mini-app my-first-mini-app`
  * Prod QA Mini App for testing commands

  ### Dev Portal

  * Improved reporting link structure for easier tracking
  * Added metatag images for sharing Mini Apps

  ### Docs

  * Virality section
  * Authentication section
  * New templates (community and official) on docs
  * Developer rewards pilot
  * `llms-full.txt` added on getting started
  * Get transaction debug URL
</Update>

<Update label="March 17, 2025">
  ### Mobile

  * \[Both] Search has gotten much faster in the Mini Apps
  * \[Both] Mini Apps deeplinking fixes
  * \[Both] World Mini Apps widget
  * \[Android] Added `safeTxHash` and `userOpHash` in response from Send Transaction
  * \[Android] Added contacts to Get Permissions command
  * \[Android] Show settings in the pop-up menu on long press

  ### Minikit

  * Added NFC ID support to Minikit. You can now receive a more detailed `verification_level` response

  ### Dev Portal

  * Notification sending from developer portal
  * Import wallets as CSV

  ### Docs

  * New Quick Actions: PUF, World Companies Finder, One Pay, Orbital X
  * Added Send Transaction and Wallet Auth GIFs
  * NSFW prohibition
</Update>

<Update label="March 10, 2025" description="Minikit 1.7.1">
  ### Mobile

  * \[iOS] Notification paths bugs: Fixed
  * \[iOS] Contacts modal bugs: Fixed
  * \[iOS] Added safeTxHash and userOpHash in response from send transaction
  * \[iOS + Android] Include Mini App ID in Transaction Response Payload
  * \[iOS + Android] Added Haptic Feedback
  * \[Android] World Chat Bugs Fixed
  * \[iOS + Android] Mini App rearrange
  * \[iOS + Android] Spotlight Search Fixed
  * \[iOS + Android] Mini App Widget

  ### Minikit

  * Transaction improvements
    * Support for booleans in Send Transaction
    * Auto-formatting of content (no need to stringify manually)
  * Haptics support
  * Get Permissions: command to get notification permission status without requesting first

  ### Docs

  * World Chat Quick Actions Added
    * Pay
    * Request Payment
    * Draft Message
  * Google & Apple Pay Implementation guides
  * Haptic Feedback implementation guide
</Update>


# Webview Specifications
Source: https://docs.world.org/mini-apps/more/webview-spec



The widget is opened within the World App via a WebView. This means providers can tailor their solutions by considering the specific features and restrictions of these platforms.

### **Capabilities:**

* **WebView Engine:**
  * **Android:** Uses Android's native WebView implementation.
  * **iOS:** Uses **WKWebView**, the recommended web rendering engine on iOS, offering enhanced security and performance.
* **File System and Camera Access:**
  * Access to the camera and file system (e.g., for file uploads) is possible if the user grants permission.
* **Cookies and DOM Storage:**
  * Supported on both platforms with explicit activation for Android and default behavior for iOS.
* **Location:**
  * Location is supported on both platforms.
  ```javascript
  navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
  });
  ```

### **Restrictions:**

* **New Windows:**
  * Opening new browser windows is prohibited. All navigation remains within the current WebView instance.
* **Zooming:**
  * **Android:** Not restricted by default.
  * **iOS:** Disabled.
* **Alert Dialogs:**
  * Alert Dialogs are not supported on iOS


# Mini App Store
Source: https://docs.world.org/mini-apps/quick-start/app-store



To ensure a consistent user experience, apps will be rejected unless they follow our [guidelines](/mini-apps/guidelines/app-guidelines).

Once your mini app is ready to be published, you can submit it for review inside of the Developer Portal.
Once approved, your mini app will be available to all World App users to discover in the Mini Apps.

<img src="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-start/submit-app.png?fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=0184ff97ed14893f1f116e9dbb4eb830" alt="Submit an App" data-og-width="3538" width="3538" data-og-height="1864" height="1864" data-path="images/docs/mini-apps/quick-start/submit-app.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-start/submit-app.png?w=280&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=e6d9e954cf17c67390a86c7e9d281d8d 280w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-start/submit-app.png?w=560&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=cd46c30b85f612fcc83e6f09b2b51d8e 560w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-start/submit-app.png?w=840&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=5d92e7da205a7a3b714b0a640190f9f7 840w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-start/submit-app.png?w=1100&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=84598a048bb59f18f1368ede80b6c86c 1100w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-start/submit-app.png?w=1650&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=618b27ecc850df0ba03f836ade7710c1 1650w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-start/submit-app.png?w=2500&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=7e0ff5ef5ea7c1e063a07a376d9c5c83 2500w" />

If your app was rejected please reach out to @MateoSauton on Telegram for more information.


# Commands
Source: https://docs.world.org/mini-apps/quick-start/commands



export const QRCodeGenerator = props => {
  const {appId: initialAppId = "", hideInput = false, baseUrl = "https://worldcoin.org/mini-app", hideDetails = false} = props || ({});
  const [appId, setAppId] = useState(initialAppId);
  const trimmed = useMemo(() => appId.trim(), [appId]);
  const isValid = useMemo(() => (/^app_[a-f0-9]+$/).test(trimmed), [trimmed]);
  const payload = useMemo(() => {
    if (!trimmed || !isValid) return "";
    return `${baseUrl}?app_id=${trimmed}`;
  }, [trimmed, isValid, baseUrl]);
  const qrSrc = useMemo(() => {
    const size = "200x200";
    const data = encodeURIComponent(payload);
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${data}`;
  }, [payload]);
  const containerGridClass = hideDetails ? "" : "grid gap-4 md:grid-cols-[200px_1fr] items-start";
  return <div className="not-prose p-4 border rounded-xl space-y-4">
      {!hideInput && <label className="block text-sm font-medium">
          App ID
          <input type="text" placeholder="Enter App Id (eg. app_f88bb2a....)" value={appId} onChange={e => setAppId(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" aria-label="App ID" />
        </label>}

      {trimmed && !isValid && <p className="text-sm text-red-600">
          Invalid App Id. Eg. app_xxxxxxxxxxx
        </p>}

      <div className={containerGridClass}>
        <div className="flex items-center justify-center border rounded-xl p-2 bg-white">
          {isValid && payload ? <img src={qrSrc} alt={`QR for ${payload}`} width="200" height="200" loading="eager" /> : <div className="w-[200px] h-[200px] grid place-items-center text-sm text-gray-500">
              {hideInput ? "Provide an App ID via props" : "Enter a valid App ID"}
            </div>}
        </div>

        {!hideDetails && <div className="space-y-2 text-sm">
            <div className="text-gray-700">
              Encoded value:
              <code className="ml-2 px-2 py-1 rounded bg-gray-100">
                {payload || "(empty)"}
              </code>
            </div>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Enter your App ID {hideInput ? "via props" : "above"}.</li>
              <li>Scan the QR with your phone’s camera.</li>
              <li>Confirm the prompt in World App.</li>
            </ol>
          </div>}
      </div>
    </div>;
};

Commands are defined actions your mini app can perform in World App. Every command is available as either:

* a synchronous function that dispatches an event, the result of which has to be listened for,
* an async function, that can be awaited, resolves with the result.

To quickly get a sense of how commands work, you can scan the QR code below with your phone (you must have World App installed).

<div className="flex justify-center my-4">
  <QRCodeGenerator hideInput={true} hideDetails={true} appId="app_dfbe55706a640c82dce839bb0ecae74d" baseUrl="https://world.org/mini-app" />
</div>

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Command</th>
      <th className="p-2 text-left align-middle">Description</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="flex items-center p-2">Verify</td>
      <td className="p-2 align-middle">Verify an action with World ID.</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Pay</td>
      <td className="p-2 align-middle">Initiate a payment request.</td>
    </tr>

    <tr>
      <td className="flex items-center p-2">Wallet Auth</td>

      <td className="p-2 align-middle">
        Authenticate via Sign in with Ethereum
      </td>
    </tr>

    <tr>
      <td className="flex items-center p-2">Send Transaction</td>
      <td className="p-2 align-middle">Write to smart contracts</td>
    </tr>

    <tr>
      <td className="flex items-center p-2">Sign Message</td>

      <td className="p-2 align-middle">
        Sign personal messages with your wallet
      </td>
    </tr>

    <tr>
      <td className="flex items-center p-2">Sign Typed Data</td>

      <td className="p-2 align-middle">
        Sign EIP-712 payloads with your wallet
      </td>
    </tr>

    <tr>
      <td className="flex items-center p-2">Share Contacts</td>

      <td className="p-2 align-middle">
        Share your contacts in a privacy preserving way with apps
      </td>
    </tr>

    <tr>
      <td className="flex items-center p-2">Notifications</td>
      <td className="p-2 align-middle">Send notifications to users</td>
    </tr>

    <tr>
      <td className="flex items-center p-2">Quick Actions</td>
      <td className="p-2 align-middle">Use other mini app feature</td>
    </tr>

    <tr>
      <td className="flex items-center p-2">Get Permissions</td>
      <td className="p-2 align-middle">Get user permissions</td>
    </tr>

    <tr>
      <td className="flex items-center p-2">Send Haptic Feedback</td>

      <td className="p-2 align-middle">
        Send haptic feedback to user's device
      </td>
    </tr>

    <tr>
      <td className="flex items-center p-2">Share</td>
      <td className="p-2 align-middle">Share content</td>
    </tr>
  </tbody>
</table>


# Getting Started
Source: https://docs.world.org/mini-apps/quick-start/installing



[MiniKit-JS](https://github.com/worldcoin/minikit-js) is our official SDK for creating mini apps that work with World App. It provides handy functions and types to make development a breeze.

## Quick Start

The fastest way to get started is by using our template next-15 repository.
Run the following command and follow the instructions to create a new mini app. For cleanliness we recommend using `pnpm` as your package manager.

```bash
npx @worldcoin/create-mini-app@latest my-first-mini-app
```

<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  <img
    src="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-start/template.png?fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=e070c2e012dc9f13aaa1b619e64c1213"
    alt="Template"
    className="m-auto block img-miniapps-template"
    width="220"
    style={{
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  }}
    data-og-width="1179"
    data-og-height="2556"
    data-path="images/docs/mini-apps/quick-start/template.png"
    data-optimize="true"
    data-opv="2"
    srcset="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-start/template.png?w=280&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=dddb4138ee27c25cbbb9c4a2aedcfde1 280w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-start/template.png?w=560&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=240815682c9031aaed000ba32d9c6001 560w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-start/template.png?w=840&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=8f5904f046bbb354ea4b266bf985b8da 840w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-start/template.png?w=1100&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=a3c58a41bf498704f45e866a36d0eb20 1100w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-start/template.png?w=1650&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=6c6d75826a9f7e532370108be55e6f62 1650w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-start/template.png?w=2500&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=d83da4ad041f8f64af03f3ed23febe09 2500w"
  />

  <p style={{ fontStyle: "italic", marginTop: "0.5rem" }}>
    Correctly running template should look like this
  </p>
</div>

## Manual Installation

[MiniKit-JS](https://www.npmjs.com/package/@worldcoin/minikit-js) is the core lib, framework agnostic,

[MiniKit-React](https://www.npmjs.com/package/@worldcoin/minikit-react) provides hooks that make it easy to interact with the MiniKit SDK.

<CodeGroup>
  ```bash minikit-js
  pnpm install @worldcoin/minikit-js
  ```

  ```bash minikit-react
  pnpm install @worldcoin/minikit-react
  ```
</CodeGroup>

Or use a CDN like [jsdelivr](https://www.jsdelivr.com/package/npm/@worldcoin/minikit-js), for inline HTML, make sure to fill in the version.

<CodeGroup>
  ```html minikit-js
  <script type="module">
    import { MiniKit } from "https://cdn.jsdelivr.net/npm/@worldcoin/minikit-js@[version]/+esm";
  </script>
  ```
</CodeGroup>

## Usage

1. Wrap your root with the MiniKitProvider component.This provides the MiniKit object to your app.

```tsx src/index.tsx
import { MiniKitProvider } from "@worldcoin/minikit-js/minikit-provider";
export default async function Root({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MiniKitProvider>
        <body className={inter.className}>{children}</body>
      </MiniKitProvider>
    </html>
  );
}
```

2. Check if MiniKit is installed and ready to use

`MiniKit.isInstalled()` will only return true if the app is opened and properly initialized inside the World App. This is useful to distinguish between a user opening your app in the browser or in the World App.

```tsx
// ...
console.log(MiniKit.isInstalled());
```

## Build with AI

We have generated a [llms-full.txt](https://docs.world.org/llms-full.txt) file that converts all our documentation into a single markdown document following the [https://llmstxt.org/](https://llmstxt.org/) standard.

## Template Repositories

The following template repositories are also available:

* [Vanilla JS (using a CDN) template (featuring a simple backend for verifications)](https://github.com/new?template_name=minikit-js-template\&template_owner=worldcoin),
* [Community example - Wallet Auth using JWT](https://github.com/wlding-blocks/wld-mini-apps-101).
* [Community example - Wallet Auth using NextAuth](https://github.com/supercorp-ai/minikit-wallet-auth-next-auth).

Otherwise, continue below with the installation instructions.

<Note>
  Watch a video tutorial [here](https://www.youtube.com/watch?v=QJ0htHP6lb0).
</Note>


# Responses
Source: https://docs.world.org/mini-apps/quick-start/responses



World App will return responses to your mini app based on the command sent. You can define custom logic to handle these responses with MiniKit.

There are two ways to handle responses:

1. **Async Handling**: The most common use case is to use async handlers. These let you simply await the commands. The response is returned in the `finalPayload` object.

```tsx Async handlers
import { MiniKit } from '@worldcoin/minikit-js'
// ...

const handleVerify = async () => {
	// ...

	// The async versions of commands, return an object that contains the final payload, which is the response from World App,
	// as well as commandPayload, which is the object that is returned after calling the command.
	const { finalPayload } = await MiniKit.verifyAsync({
		//...
	})

	if (finalPayload.status === 'error') {
		return console.log('Error payload', finalPayload)
	}

	// Verify the proof in the backend
	const verifyResponse = await fetch('/api/verify', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: {
			// ...
		},
	})
}
```

2. **Synchronous Handling**: Synchronous require you to subscribe to the event.

```tsx Event listeners
import { MiniKit, ResponseEvent } from '@worldcoin/minikit-js'

export function ReactComponent() {
	// ...
	useEffect(() => {
		MiniKit.subscribe(ResponseEvent.MiniAppVerifyAction, async payload => {
			if (payload.status === 'error') {
				return console.log('Error payload', payload)
			}

			// Verify the proof in the backend
			const verifyResponse = await fetch('/api/verify', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: {
					//...
				},
			})
		})

		return () => {
			// Clean up on unmount
			MiniKit.unsubscribe(ResponseEvent.MiniAppVerifyAction)
		}
	}, [])
}
```


# Testing your mini app
Source: https://docs.world.org/mini-apps/quick-start/testing

Enter your App ID and scan the generated QR code to test your mini app.

export const QRCodeGenerator = props => {
  const {appId: initialAppId = "", hideInput = false, baseUrl = "https://worldcoin.org/mini-app", hideDetails = false} = props || ({});
  const [appId, setAppId] = useState(initialAppId);
  const trimmed = useMemo(() => appId.trim(), [appId]);
  const isValid = useMemo(() => (/^app_[a-f0-9]+$/).test(trimmed), [trimmed]);
  const payload = useMemo(() => {
    if (!trimmed || !isValid) return "";
    return `${baseUrl}?app_id=${trimmed}`;
  }, [trimmed, isValid, baseUrl]);
  const qrSrc = useMemo(() => {
    const size = "200x200";
    const data = encodeURIComponent(payload);
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${data}`;
  }, [payload]);
  const containerGridClass = hideDetails ? "" : "grid gap-4 md:grid-cols-[200px_1fr] items-start";
  return <div className="not-prose p-4 border rounded-xl space-y-4">
      {!hideInput && <label className="block text-sm font-medium">
          App ID
          <input type="text" placeholder="Enter App Id (eg. app_f88bb2a....)" value={appId} onChange={e => setAppId(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" aria-label="App ID" />
        </label>}

      {trimmed && !isValid && <p className="text-sm text-red-600">
          Invalid App Id. Eg. app_xxxxxxxxxxx
        </p>}

      <div className={containerGridClass}>
        <div className="flex items-center justify-center border rounded-xl p-2 bg-white">
          {isValid && payload ? <img src={qrSrc} alt={`QR for ${payload}`} width="200" height="200" loading="eager" /> : <div className="w-[200px] h-[200px] grid place-items-center text-sm text-gray-500">
              {hideInput ? "Provide an App ID via props" : "Enter a valid App ID"}
            </div>}
        </div>

        {!hideDetails && <div className="space-y-2 text-sm">
            <div className="text-gray-700">
              Encoded value:
              <code className="ml-2 px-2 py-1 rounded bg-gray-100">
                {payload || "(empty)"}
              </code>
            </div>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Enter your App ID {hideInput ? "via props" : "above"}.</li>
              <li>Scan the QR with your phone’s camera.</li>
              <li>Confirm the prompt in World App.</li>
            </ol>
          </div>}
      </div>
    </div>;
};

# Testing

### Testing your mini app

Enter your app id in the text box below and scan the QR code generated with your phone's camera.
Your app id is in the developer portal in the format `app_xxxxxxxxxx`.

<QRCodeGenerator />

### Tips

1. You can use [Ngrok](https://ngrok.com/), [zrok](https://zrok.io/) or [tunnelmole](https://tunnelmole.com/) for local testing.
2. [Eruda](https://github.com/liriliri/eruda) is helpful for showing logs on mobile.
3. You can use the [L2 Faucet](https://www.l2faucet.com/world) to get testnet WLD on Sepolia.


# Address Book
Source: https://docs.world.org/mini-apps/reference/address-book



The Address Book is a contract that stores verified World ID addresses. You can check if a user's address and associated ENS name (if available) is Orb verified using the `getIsUserVerified` helper function.

## Considerations

* Default RPC is `https://worldchain-mainnet.g.alchemy.com/public`
* Contract Address is [0x57b930D551e677CC36e2fA036Ae2fe8FdaE0330D](https://worldscan.org/address/0x57b930D551e677CC36e2fA036Ae2fe8FdaE0330D#readContract).

## Implementation

The helper function connects to the World Chain and checks if a given wallet address is verified by querying the Address Book contract.

## Example Usage

```typescript
import { getIsUserVerified } from "@worldcoin/minikit-js"

const userWalletAddress = "0x000000000000000000000000000000000000dEaD"
const isUserVerified = await getIsUserVerified(userWalletAddress) // optionally you can provide your rpc url as a second argument to the function
```

* Returns `true` if the address is verified
* Returns `false` if the address is not verified
* Throws an error if the verification check fails

## React Bindings

For React applications, we provide a hook `useIsUserVerified` that handles the verification check and loading state.


# API Reference
Source: https://docs.world.org/mini-apps/reference/api

Mini Apps API endpoints and playground (OpenAPI-backed)

<Note>
  This section now uses an OpenAPI spec to power endpoint pages and the
  playground. Prefer the endpoint pages in the sidebar for the latest
  parameters, responses, and live requests. Spec:{" "}
  <code>/openapi/world-miniapps.json</code>.
</Note>

## Endpoints

* POST /api/v2/create-action/{app_id}
* POST /api/v2/minikit/send-notification
* POST /api/v2/verify/{app_id}
* GET /api/v2/minikit/transaction/{transaction_id}
* GET /api/v2/minikit/transaction/debug
* GET /api/v2/minikit/user-grant-cycle
* GET /public/v1/miniapps/prices

Below content was removed to avoid duplication. Use the endpoint pages in the sidebar.

## Send Notification

<ParamField path="method" type="POST">
  [https://developer.worldcoin.org/api/v2/minikit/send-notification](https://developer.worldcoin.org/api/v2/minikit/send-notification)
</ParamField>

This endpoint lets you send localized notifications to users of your mini app and requires an `api_key`.

### How do localizations work?

The user's language is available to you when they access your mini app
(via [Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language)).

All you need to do is provide localizations. Our backend will automatically infer which language is preferred by the user.
Currently we support only a subset of languages, with plans to expand. Find the entire list [here](/mini-apps/reference/api#supported-languages).
You can only specify languages that we support.

* If a user prefers a language that we don't currently support, we will deliver the notification in English.
* If you don't specify a localization for the user's preferred language, the notification will not be delivered.
  The response will include a specific `reason` to inform you of this.

### Body Params

You are required to either specify both `title` and `message` OR `localisations`.

<ParamField body="wallet_addresses" type="string[]" required>
  The `wallet_addresses` is an array of wallet addresses to send the
  notification to. Users must have opted in to notifications for your app. Max
  1000 users per call.
</ParamField>

<ParamField body="localisations" type="object[]">
  `localisations` is an array of objects with properties:

  * `language` (string, required): The language of the notification.
  * `title` (string, required): The localized title of the notification.
  * `message` (string, required): The localized message of the notification.

  It's required to provide at least the `en` language.
</ParamField>

<ParamField body="title" type="string">
  Note: This will not localize your notifications. The `title` is the title of
  the notification. It should be 30 characters or less. May contain emojis.
</ParamField>

<ParamField body="message" type="string">
  Note: This will not localize your notifications. The `message` is the message
  of the notification. It should be 200 characters or less. You can include the
  special variable `${username}` in your message, which will be replaced with
  the actual username of the recipient when the notification is delivered.
</ParamField>

<ParamField body="mini_app_path" type="string" required>
  The `mini_app_path` is the url encoded path of the mini app where your
  notification should link to when the user clicks on it. Should be of the
  format `worldapp://mini-app?app_id=[app_id]&path=[path]` (path is optional).
</ParamField>

<ParamField body="app_id" type="string" required>
  The `app_id` is the identifier of the app initiating the transaction.
</ParamField>

### Request Headers

<ParamField header="Authorization" type="string" required>
  The `Authorization` header should be the `api_key` for your app from the
  Developer Portal. Make sure to prefix it with `Bearer {api_key}`.
</ParamField>

<CodeGroup title="Request">
  ```bash cURL
  curl -X POST "https://developer.worldcoin.org/api/v2/minikit/send-notification" \
      -H "Authorization: Bearer {api_key}" \
      -H "Content-Type: application/json" \
      -d '{"app_id": "app_id", "wallet_addresses": ["0x123", "0x456"], "title": "title", "message": "Hello ${username}, your transaction is complete!", "mini_app_path": "mini_app_path"}'
  ```

  ```javascript
  fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: "Bearer {api_key}",
    },
    body: JSON.stringify({
      app_id: "app_id",
      wallet_addresses: ["0x123", "0x456"],
      title: "title",
      message: "Hello ${username}, your transaction is complete!",
      mini_app_path: "mini_app_path",
    }),
  });
  ```
</CodeGroup>

### Response

<ResponseField name="success" type="boolean">
  Indicates if the API request was successful.
</ResponseField>

<ResponseField name="status" type="number">
  The HTTP status code of the response.
</ResponseField>

<ResponseField name="result" type="array">
  An array of notification delivery results for each wallet address, where each
  item contains: - `walletAddress` (string): The wallet address that the
  notification was attempted to be sent to - `sent` (boolean): Whether the
  notification was successfully sent to this wallet address - `reason` (string,
  optional): If the notification failed to send, this field contains the reason
</ResponseField>

<CodeGroup title="Response">
  ```json
  {
      "success": true,
      "status": 200,
      "result": [
          {
              "walletAddress": "0x377da9cab87c04a1d6f19d8b4be9aef8df26fcdd",
              "sent": true
          },
          {
              "walletAddress": "0x444da9cab87c04a1d6f19d8b4be9aef8df26fcdd",
              "sent": false,
              "reason": "User has notification disabled for World App"
          }
      ]
  }
  ```
</CodeGroup>

### Supported Languages

| Language                     | Code     |
| ---------------------------- | -------- |
| English                      | `en`     |
| Catalan                      | `ca`     |
| Chinese Simplified           | `zh_CN`  |
| French                       | `fr`     |
| German                       | `de`     |
| Hindi                        | `hi`     |
| Indonesian                   | `id`     |
| Japanese                     | `ja`     |
| Korean                       | `ko`     |
| Malay                        | `ms`     |
| Polish                       | `pl`     |
| Portuguese                   | `pt`     |
| Spanish                      | `es`     |
| Spanish (Latin America)      | `es_419` |
| Thai                         | `th`     |
| Traditional Chinese (Taiwan) | `zh_TW`  |

***

## Get Transaction

<ParamField path="method" type="GET">
  [https://developer.worldcoin.org/api/v2/minikit/transaction/\{transaction\_id}](https://developer.worldcoin.org/api/v2/minikit/transaction/\{transaction_id})
  ?app\_id=\&type=
</ParamField>

This endpoint lets you query your apps transactions for their current status. You will only be able to query for transactions of apps where you possess the `api_key`.

### Query Params

<ParamField query="app_id" type="string" required>
  The `app_id` corresponding to the transaction that is being queried.
</ParamField>

<ParamField query="type" type="string" required>
  The `type` is either payment (pay) or transaction (sendTransaction) depending
  on the command you used.
</ParamField>

<CodeGroup title="Request">
  ```bash cURL
  curl -X GET "https://developer.worldcoin.org/api/v2/minikit/transaction/{transaction_id}"
  ```

  ```javascript
  fetch(apiUrl, {
    method: "GET",
  });
  ```
</CodeGroup>

### Response

<ResponseField name="reference" type="string">
  The `reference` is your specified unique identifier for the transaction.
</ResponseField>

<ResponseField name="transaction_hash" type="string">
  The `transaction_hash` is the hash of the transaction on the blockchain.
</ResponseField>

<ResponseField name="transaction_status" type="string">
  The current `transaction_status`, can be either 'pending', 'mined', or
  'failed'.
</ResponseField>

<ResponseField name="from" type="string">
  The `from` is the address of the sender.
</ResponseField>

<ResponseField name="chain" type="string">
  The `chain` is the name of the blockchain network.
</ResponseField>

<ResponseField name="timestamp" type="string">
  The `timestamp` is the time when the transaction was created, in ISO 8601
  format.
</ResponseField>

<ResponseField name="token_amount" type="string">
  The `token_amount` is the amount of tokens transferred, in BigInt with 6
  decimals.
</ResponseField>

<ResponseField name="token" type="string">
  The `token` is the type of token transferred.
</ResponseField>

<ResponseField name="to" type="string">
  The `to` is the address of the receiver.
</ResponseField>

<ResponseField name="app_id" type="string">
  The `app_id` is the identifier of the app initiating the transaction.
</ResponseField>

<CodeGroup title="Response">
  ```json Payment
  {
      "reference": "1fa38f30-8ee1-4e4b-9988-0517a774f96c",
      "transaction_hash": "0xfb25cb74b13d51deeb1a91460619c3d86a7637d40dd29831aa38dd6cbb05e880",
      "transaction_status": "pending | mined | failed",
      "from": "0x0c892815f0B058E69987920A23FBb33c834289cf",
      "chain": "worldchain",
      "timestamp": "2024-01-01T00:00:00.000Z", // ISO 8601
      "token_amount": "100000000", // amount in BigInt with 6 decimals
      "token": "USDC",
      "to": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      "app_id": "app_9a73963d73efdf2e7d9472593dc9dffd"
  }
  ```

  ```json Transaction
  {
    "transactionId": "0xa5b02107433da9e2a450c433560be1db01963a9146c14eed076cbf2c61837d60",
    "transactionHash": "0xa8388148b630b49a3d5a739eaad9e98b5766235cdb21a5ec8d3f89053d982a71",
    "transactionStatus": "failed",
    "miniappId": "app_staging_5748c49d2e6c68849479e0b321bc5257",
    "updatedAt": "2024-09-09T15:18:25.320Z",
    "network": "worldchain",
    "fromWalletAddress": "0x2321401e6a175a7236498ab66f25cd1db4b17558",
    "toContractAddress": "0x2321401e6a175a7236498ab66f25cd1db4b17558"
  }
  ```
</CodeGroup>

***

## Get Transaction Debug URL

<ParamField path="method" type="GET">
  [https://developer.worldcoin.org/api/v2/minikit/transaction/debug?app\_id=](https://developer.worldcoin.org/api/v2/minikit/transaction/debug?app_id=)
</ParamField>

This endpoint lets you debug transactions that failed during the prepare stage. It provides Tenderly URLs for permit2 operations with expired permits. You will only be able to query for transactions of apps where you possess the `api_key`.

The debug URL is only available once the permit2 expires. So for development it will be better to set a shorter expiry time so you can get the debug URL quicker.

### Query Params

<ParamField query="app_id" type="string" required>
  The `app_id` corresponding to the transaction that is being queried.
</ParamField>

### Request Headers

<ParamField header="Authorization" type="string" required>
  The `Authorization` header should be the `api_key` for your app from the
  Developer Portal. Make sure to prefix it with `Bearer {api_key}`.
</ParamField>

<CodeGroup title="Request">
  ```bash cURL
  curl -X GET "https://developer.worldcoin.org/api/v2/minikit/transaction/debug?app_id={app_id}" \
      -H "Authorization: Bearer {api_key}"
  ```

  ```javascript
  fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: "Bearer {api_key}",
    },
  });
  ```
</CodeGroup>

### Response

<ResponseField name="transactions" type="array">
  An array of transaction debug information, where each item contains: -
  `debugUrl` (string): The Tenderly URL for debugging the transaction -
  `createdAt` (string): The timestamp when the transaction was created, in ISO
  8601 format - `block` (number): The block number where the transaction was
  attempted - `simulationRequestId` (string): The ID of the simulation request -
  `simulationError` (string): The error message from the simulation, if any -
  `walletAddress` (string): The wallet address associated with the transaction
</ResponseField>

<CodeGroup title="Response">
  ```json
  {
      "transactions": [
          {
              "debugUrl": "https://dashboard.tenderly.co/tx/...",
              "createdAt": "2024-03-21T10:30:00.000Z",
              "block": 12345678,
              "simulationRequestId": "sim_abc123def456",
              "simulationError": "Permit signature expired",
              "walletAddress": "0x1234..."
          }
      ]
  }
  ```
</CodeGroup>

***

## Get Prices

<ParamField path="method" type="GET">
  [https://app-backend.worldcoin.dev/public/v1/miniapps/prices?cryptoCurrencies=WLD,USDC\&fiatCurrencies=](https://app-backend.worldcoin.dev/public/v1/miniapps/prices?cryptoCurrencies=WLD,USDC\&fiatCurrencies=)
</ParamField>

This endpoint lets you query the latest prices of the Worldcoin token in various fiat currencies. We offer this as a service to make it easier to use WLD as a currency.

### Query Params

<ParamField query="fiatCurrencies" type="string" required>
  The `fiatCurrencies` is a comma-separated list of fiat currencies following
  ISO4217 currency code. eg. `USD,EUR,JPY,ARS`
</ParamField>

<ParamField query="cryptoCurrencies" type="string" required>
  The `cryptoCurrencies` is a comma-separated list of currencies we support. eg.
  `USDC,WLD`
</ParamField>

<CodeGroup title="Request">
  ```bash cURL
  curl -X GET "https://app-backend.worldcoin.dev/public/v1/miniapps/prices?cryptoCurrencies=WLD&fiatCurrencies=USD"
  ```

  ```javascript
  fetch(apiUrl, {
    method: "GET",
  });
  ```
</CodeGroup>

### Response (abridged)

Detailed are a just a few values in the return that could be confusing. See the response object in the bottom right column for the full list of fields

<ResponseField name="prices" type="string">
  The `prices` is an object where each key is the respective currency code
</ResponseField>

<ResponseField name="amount" type="string">
  The `amount` represents the non converted value for the price of 1 WLD for a
  given currency
</ResponseField>

<ResponseField name="decimals" type="string">
  The current `decimals`, should be used to calculate the converted price. ie an
  amount of 1000000 with 6 decimals would mean a price of \$1.00 via, 1000000 \*
  10^-6
</ResponseField>

<CodeGroup title="Response">
  ```json
  {
      "result": {
          "prices": {
              "WLD": {
                  "USD": {
                      "asset": "USD",
                      "amount": "1510763",
                      "decimals": 6,
                      "symbol": "USD"
                  },
              },
              "USDC": {
                  "USD": {
                      "asset": "USD",
                      "amount": "1000058",
                      "decimals": 6,
                      "symbol": "USD"
                  },
              }
          }
      }
  }
  ```
</CodeGroup>


# Errors
Source: https://docs.world.org/mini-apps/reference/errors



This page is a reference to error codes returned by MiniKit.

## Verify

Below are the error codes you could receive with the `Verify` command

| Code                        | Description                                                                                                                     | How to fix?                                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `verification_rejected`     | User rejected the World ID request in World App.                                                                                | If this was a mistake, trigger the verify command again.                                                                                      |
| `max_verifications_reached` | This person has already verified for this particular action the maximum number of times allowed.                                | Nothing to do. User cannot verify for this action again.                                                                                      |
| `credential_unavailable`    | This user does not have the requested credential.                                                                               | The user must verify at the Orb or verify their unique device in World App to receive the credential required.                                |
| `malformed_request`         | The request payload couldn't be decrypted or did not conform to the standard.                                                   | Ensure MiniKit is configured properly and all parameters are valid.                                                                           |
| `invalid_network`           | The application is configured for a different environment than the verifying user's client.                                     | Ensure you use the [Worldcoin Simulator](https://simulator.worldcoin.org) for Staging applications and World App for Production applications. |
| `inclusion_proof_failed`    | The sequencer returned an unexpected error when retrieving the inclusion proof.                                                 | Ask the user to try again. This may be due to a temporary network issue, or a bug with World App or the Signup Sequencer.                     |
| `inclusion_proof_pending`   | The user might have the requested credential, but it is not available on-chain yet. It might be available for API verification. | Ask the user to verify again in approximately one hour.                                                                                       |
| `unexpected_response`       | There was a problem with the response obtained from the WLD app.                                                                | Try again, though in most cases these will require contacting us to report the bug.                                                           |
| `generic_error`             | An unhandled exception occurred.                                                                                                | Try again, though in most cases these will require contacting us to report the bug.                                                           |

## Pay

Below are the error codes you could receive with the `Pay` command

| Code                   | Description                                                                       | How to fix?                                                                         |
| ---------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `input_error`          | There was a problem with this request. Please try again or contact the app owner. | Ensure the request is properly formed and try again.                                |
| `payment_rejected`     | You've cancelled the payment in World App.                                        | If this was a mistake, initiate the payment again.                                  |
| `invalid_receiver`     | The receiver address is invalid. Please contact the app owner.                    | You don't have this address whitelisted inside the Developer Portal.                |
| `insufficient_balance` | You do not have enough balance to complete this transaction.                      | Add more funds to your wallet                                                       |
| `transaction_failed`   | The transaction failed. Please try again.                                         | Try the transaction again. Something failed on-chain.                               |
| `generic_error`        | Something unexpected went wrong. Please try again.                                | Try again, though in most cases these will require contacting us to report the bug. |

## Wallet Auth

Below are the error codes you could receive with the `walletAuth` command

| Code                | Description                                     | How to fix?                                                                                          |
| ------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `malformed_request` | Provided parameters in the request are invalid. | Ensure the request is properly formed and try again. If the problem persists, contact the app owner. |
| `user_rejected`     | User rejected the request.                      | If this was a mistake, initiate the request again.                                                   |
| `generic_error`     | Something unexpected went wrong.                | Try the request again. If the problem persists, contact the app owner.                               |

## Transactions

Below are the error codes you could receive with the `Transaction` command

| Code                                | Description                                                                               | How to fix?                                                                                                                                                 |
| ----------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invalid_operation`                 | Transaction included an operation that was invalid                                        | Your app tried using a disallowed operation. These include approve, setAllowance, setApprovalForAll, or setApprovalForAll.                                  |
| `invalid_contract`                  | App must whitelist the contract you're calling in the Developer Portal                    | Go to the Developer Portal and whitelist the contract you're calling                                                                                        |
| `user_rejected`                     | User declined the transaction modal                                                       | User closed the transaction modal.                                                                                                                          |
| `input_error`                       | Payload received does not conform to specified type                                       | Ensure the request is properly formed and try again. Note all args must be string. Payload has max size of 8kb so your ABI should just be for your function |
| `simulation_failed`                 | Simulation provider transaction simulation failed (this can include insufficient balance) | Txn simulation failed see the debugUrl returned to understand why                                                                                           |
| `transaction_failed`                | Transaction failed please try again later                                                 | Try again later. Could be blob fees too high or network congestion                                                                                          |
| `generic_error`                     | Request failed for unknown reason                                                         | Try the request again. If the problem persists, contact the app owner.                                                                                      |
| `daily_tx_limit_reached`            | Daily transaction limit reached                                                           | Max 100 transactions per day. Wait until the next day.                                                                                                      |
| `disallowed_operation`              | Transaction included an operation that was disallowed                                     | Make sure you are not calling functions on the user's safe, doing approvals, calling safe admin functions, etc.                                             |
| `permitted_amount_exceeds_slippage` | Permitted amount exceeds slippage                                                         | You must spend at least 90% of the permitted amount                                                                                                         |
| `permitted_amount_not_found`        | Permitted amount not found                                                                | Permitted amount not found in permit2 payload                                                                                                               |

Other helpful things

1. If you get a GS026 error, it means the signature is not valid. Most likely there's something switched in your args vs your permit. Double check each argument usually this is the nonce and timestamp getting mixed up.


# Init
Source: https://docs.world.org/mini-apps/reference/init



Upon opening a mini app, World App will set a window\.WorldApp object. This object contains useful metadata about the device, user, and commands that can be used to customize the mini app.

```json
{
  "pending_notifications": "number",
  "supported_commands": [
    {
      "name": "string",
      "supported_versions": ["number"]
    }
  ],
  "world_app_version": "number",
  "safe_area_insets": {
    "top": "number",
    "right": "number",
    "bottom": "number",
    "left": "number"
  },
  "device_os": "string",
  "is_optional_analytics": "boolean"
}
```

For simplicity we make it easy to access these values in Minikit.

```tsx
interface MiniKit {
  deviceProperties: {
    safeAreaInsets: { // The safe area insets of the device.
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
    deviceOS: string;
    worldAppVersion: number; // 
  };
  user: {
    optedIntoOptionalAnalytics: boolean; // If this is false, you should not collect any analytics for this user.
  };
}
```


# Microphone
Source: https://docs.world.org/mini-apps/reference/microphone



<Note>
  Microphone is only available from World App 2.8.85 and MiniKit 1.9.6.
</Note>

Microphone uses the standard web api [Navigator.mediaDevices](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/mediaDevices).
These two conditions must be met in order to use the microphone:

* The user must grant permission to your mini app to use the microphone.
* The user must grant permission to World App to use the microphone.

## Using the microphone

Request permission from the user to enable microphone for your mini app with the [request permission command](/mini-apps/commands/request-permission).

* If you receive a `world_app_permission_not_enabled` or `permission_disabled` error code, you must prompt the user to enable microphone for World App first.
  This can be done by simply trying to start recording.
* The microphone will automatically be turned off if the user closes your mini app or World App.

```tsx
  const [isMicOn, setIsMicOn] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  // ...
  const toggleMicrophone = useCallback(async () => {
    if (isMicOn) {
      // Stop microphone access
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      setIsMicOn(false);
    } else {
      // Start microphone access
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setStream(newStream);
        setIsMicOn(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    }
  }, [isMicOn, stream]);
```

## Debugging

* If you receive a `DomException Error`, it's most likely because the user hasn't granted permission to your mini app to use the microphone.
* If the microphone turns off after a few seconds it's because the user has not granted permission to your mini app to use the microphone.


# Payment Methods
Source: https://docs.world.org/mini-apps/reference/payment-methods



Integrate Apple Pay and Google Pay into your mini-app

<Note>
  Both Apple Pay and Google Pay run directly in the WebView environment of your
  mini-app, using their respective JavaScript APIs.
</Note>

## Environment Setup

First, ensure your mini-app has a secure HTTPS environment, as both Apple Pay and Google Pay require it.

<Tabs>
  <Tab title="Apple Pay">
    For Apple Pay, you must: - Register for an Apple Developer account -
    Configure your merchant ID - Register your domain with Apple - Set up
    merchant validation on your server [Complete setup guide on Apple's
    website](https://applepaydemo.apple.com/)
  </Tab>

  <Tab title="Google Pay">
    For Google Pay, you must: - Set up a Google Pay merchant account - Configure
    your Google Pay API in the Google Pay Business Console - Obtain your
    merchant ID [Complete setup guide on Google's
    website](https://developers.google.com/pay/api/web/guides/resources/demos)
  </Tab>
</Tabs>

### Testing

Test your integration thoroughly using test cards and sandbox environments.

<Tabs>
  <Tab title="Apple Pay">
    **Development Environment:** - Use Apple Pay's sandbox environment - Test
    with Apple's test cards **Test Cards:** - You can use any valid card number
    in the sandbox - No actual charges will be processed **Testing Checklist:**

    * Verify merchant validation works - Test on both iOS devices and Safari on
      macOS - Check error handling - Verify payment completion flows

    <video controls className="m-auto" width="300">
      <source src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/apple-pay.mp4?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=2e44c5412e4ffb931d9bda6d990284ca" type="video/mp4" data-path="images/docs/mini-apps/commands/apple-pay.mp4" />

      Your browser does not support the video tag.
    </video>

    Apple Pay integration demo
  </Tab>

  <Tab title="Google Pay">
    **Development Environment:** - Use Google Pay's TEST environment - Test with
    Google's test cards **Test Cards:** - Use test PAN: 4111 1111 1111 1111 -
    Expiration: Any future date - CVV: Any 3 digits **Testing Checklist:** -
    Verify button displays correctly - Test on Android devices - Check error
    handling - Verify payment completion flows

    <img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/google-pay-demo.jpg?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=1b95631683f195f139151da35a3f8688" alt="Google Pay integration example" className="m-auto block" width="300" data-og-width="1080" data-og-height="2220" data-path="images/docs/mini-apps/commands/google-pay-demo.jpg" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/google-pay-demo.jpg?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=a87245dba17e2c15d8fbe249d77a8884 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/google-pay-demo.jpg?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=07a92010abc2168f52be38c40b94beca 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/google-pay-demo.jpg?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=fb9e8be4191568681b6a8ee3d334f307 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/google-pay-demo.jpg?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=d918a35a018b226ee47532c1bf6527cf 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/google-pay-demo.jpg?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=78e3446355ef31033d3b3663c8b27013 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/google-pay-demo.jpg?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=e9ead5f234d84f80205bdafab0d5774a 2500w" />

    Google Pay integration example
  </Tab>
</Tabs>

## Limitations and Considerations

* **Platform Restrictions**: Apple Pay only works on iOS/macOS devices with Safari, while Google Pay is primarily for Android
* **Device Support**: Users must have devices that support these payment methods
* **WebView Context**: Some features might behave differently in the mini-app WebView compared to a standard browser

<Warning>
  For Apple Pay merchant validation, your server needs to be accessible via
  HTTPS and properly configured with Apple's developer portal.
</Warning>

## Additional Resources

* [Apple Pay Demo and Documentation](https://applepaydemo.apple.com/)
* [Google Pay API Documentation](https://developers.google.com/pay/api/web/guides/resources/demos)
* [Apple Pay Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/apple-pay/overview/)
* [Google Pay Web Integration Guide](https://developers.google.com/pay/api/web/guides/tutorial)


# Status Page
Source: https://docs.world.org/mini-apps/reference/status-page



You can check the current status of World services at [status.worldcoin.org](https://status.worldcoin.org).

<Note>
  The Networks section is not up to date yet.
</Note>

For transactions, status is determined by:

* **Disruption**: Transactions taking longer than 45 seconds
* **Outage**: Transactions taking longer than 5 minutes

## Get Status

<ParamField path="method" type="GET">
  [https://status.worldcoin.org/api/services](https://status.worldcoin.org/api/services)
</ParamField>

This endpoint returns the current status of all World services.

### Query Params

<ParamField query="logs" type="boolean">
  Include `logs=true` to get historical status logs for each service.
</ParamField>

<CodeGroup title="Request">
  ```bash cURL
  curl -X GET "https://status.worldcoin.org/api/services?logs=true"
  ```

  ```javascript
  fetch('https://status.worldcoin.org/api/services?logs=true')
  ```
</CodeGroup>

### Response

<ResponseField name="services" type="array">
  Array of service status objects, each containing:
</ResponseField>

<ResponseField name="name" type="string">
  Service name (e.g., "Mini Apps", "World ID Verifications")
</ResponseField>

<ResponseField name="id" type="string">
  Service identifier
</ResponseField>

<ResponseField name="description" type="string">
  Description of the service
</ResponseField>

<ResponseField name="categoryId" type="string">
  Category the service belongs to (e.g., "mini-apps", "world-id", "finance")
</ResponseField>

<ResponseField name="status" type="string">
  Current service status: "ok", "warning", or "error"
</ResponseField>

<ResponseField name="logs" type="array">
  Historical status changes, containing:

  * `datetime`: Unix timestamp
  * `status`: Status at that time
  * `name`: Event name
  * `description`: Event description
  * `downtime`: Duration in seconds (if applicable)
</ResponseField>

<ResponseField name="uptimeRatio" type="object">
  Uptime percentages for different time periods:

  * `1`: Last 24 hours
  * `7`: Last 7 days
  * `30`: Last 30 days
  * `90`: Last 90 days
</ResponseField>

<CodeGroup title="Response">
  ```json
  {
      "services": [
          {
              "name": "Crypto Transactions",
              "id": "crypto-transactions",
              "description": "",
              "categoryId": "mini-apps",
              "status": "ok",
              "logs": [
                  {
                      "datetime": 1739546233,
                      "status": "ok",
                      "name": "Running again",
                      "description": "Service outage"
                  }
              ],
              "uptimeRatio": {
                  "1": 99.7,
                  "7": 100,
                  "30": 100,
                  "90": 100
              }
          }
      ],
      "categories": [
          {
              "id": "mini-apps",
              "name": "Mini Apps",
              "status": "ok"
          }
      ],
      "uptimeRatio": {
          "1": 98,
          "7": 98.7,
          "30": 99.6,
          "90": 99.9
      },
      "status": "ok"
  }
  ```
</CodeGroup>


# Usernames
Source: https://docs.world.org/mini-apps/reference/usernames



## Introduction

Usernames are ENS-compatible identifiers for every World App user, ensuring consistency and easy recognition.
For example, when displaying transaction history, show the username instead of the wallet address to make it more user-friendly and private.

The usernames service is public, docs can be found [here](https://usernames.worldcoin.org/docs). This will be mostly useful for more advanced use cases.

## How to get it

To get the user's username you can either complete Wallet Auth and access the username/profile picture url from MiniKit directly:

```tsx
const username = MiniKit.user.username
```

Or you can request it manually, using the `getUserByAddress` method on MiniKit:

```tsx
const worldIdUser = await MiniKit.getUserByAddress(userAddress)
```

Other ways involve querying the [usernames service](https://usernames.worldcoin.org/docs).


# Add Money
Source: https://docs.world.org/mini-apps/sharing/add-money-qa



Add money to your World Wallet directly from exchanges like Binance and Coinbase. Deposit, withdraw, and swap tokens across multiple exchanges and chains effortlessly.

<div
  style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
}}
>
  <div style={{ flex: 1 }}>
    <h3>Parameters</h3>

    <ParamField path="app_id" type="string" required>
      Unique ID for the Add Money mini app.
    </ParamField>

    <ParamField path="path" type="string" required>
      URL-encoded path to the bridge interface (typically `%2Fbridge`).
    </ParamField>

    <ParamField path="toAddress" type="string" required>
      Address of the recipient World Wallet user.
    </ParamField>

    <ParamField path="toToken" type="string" required>
      Token contract address to deposit (supports USDC or WLD).
    </ParamField>

    <ParamField path="amountUsd" type="string">
      USD amount to deposit. If omitted, the user selects the amount in-app.
    </ParamField>

    <ParamField path="sourceAppId" type="string">
      App ID of the source app for quick navigation back.
    </ParamField>

    <ParamField path="sourceAppName" type="string">
      Name of the source app displayed in the "Go Back" button.
    </ParamField>

    <ParamField path="sourceDeeplinkPath" type="string">
      Path within the source app to deeplink back to (URL-encoded).
    </ParamField>
  </div>

  <div style={{ marginLeft: "20px" }}>
    <img src="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/add-money-qa.png?fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=90a743f456ea8d9610cbe130b552666c" alt="Add Money Screen" className="m-auto block" width="260" style={{ maxWidth: "260px", height: "auto" }} data-og-width="393" data-og-height="852" data-path="images/docs/mini-apps/quick-actions/add-money-qa.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/add-money-qa.png?w=280&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=b86c913fd93f47345ab3716260f17bcc 280w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/add-money-qa.png?w=560&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=6084800b5f8983a18e9275aff456739e 560w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/add-money-qa.png?w=840&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=8a4c76a07c334bddc00484cbcebfc11f 840w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/add-money-qa.png?w=1100&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=f929d4bbbb445a8819d29b1e9e1e56fe 1100w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/add-money-qa.png?w=1650&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=c2ad581e9ae395d5bc00152f0f60f037 1650w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/add-money-qa.png?w=2500&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=8cb2a42c5c5852a9a58fc7f723a2fbf5 2500w" />
  </div>
</div>

Url follows the schema below. Navigate there to use this Quick Action.

```
https://worldcoin.org/mini-app?app_id=app_e7d27c5ce2234e00558776f227f791ef
&path={%2Fbridge}
&toAddress={0xRecipientAddressHere}
&toToken={0xUSDCOrWLDAddress}
&amountUsd={100}
&sourceAppId={app_source1234567890abcdef}
&sourceAppName={My%20App}
&sourceDeeplinkPath={%2Fdashboard}
```


# DNA Send & Swap
Source: https://docs.world.org/mini-apps/sharing/dna-qa



Generate deep links to the DNA app for quick actions like Swap and Send.

[DNA](https://worldcoin.org/ecosystem/app_8e407cfbae7ae51c19b07faff837aeeb) now supports a **Quick Action** to deeplink directly
into the wallet interface, allowing users to perform specific actions like sending tokens or swapping assets with predefined parameters.

<div className="flex justify-between items-start">
  <div className="flex-1">
    <h3>Parameters</h3>

    <ParamField path="tab" type="string" required>
      Supports deep linking to the `swap` and `send` tabs.
    </ParamField>

    <ParamField path="fromToken" type="string">
      The contract address of the token being sent (`fromToken`).
    </ParamField>

    <ParamField path="toToken" type="string">
      The contract address of the token being received (`toToken`). This is used
      in **swap** actions.
    </ParamField>

    <ParamField path="recipientAddress or username" type="string">
      The recipient's wallet address or username for sending tokens.
    </ParamField>

    <ParamField path="amount" type="string">
      The amount of the `fromToken` to be sent, specified in its **base unit** .
    </ParamField>

    <ParamField path="sourceAppId" type="string">
      The application ID of the source app initiating the deeplink.
    </ParamField>

    <ParamField path="sourceDeeplinkPath" type="string">
      A deeplink path from the source application, which will be
      **URL-encoded**.
    </ParamField>
  </div>

  <Tabs>
    <Tab title="Send">
      <img src="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/dna-qa-send.png?fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=da6a0d57d54de7331c1956f4f981d9e2" alt="Send Screen" className="m-auto block" width="260" style={{ maxWidth: "260px", height: "auto" }} data-og-width="830" data-og-height="1600" data-path="images/docs/mini-apps/quick-actions/dna-qa-send.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/dna-qa-send.png?w=280&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=4e1f3af225955d8d7069f538709acb2a 280w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/dna-qa-send.png?w=560&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=ae7b50b00d1d36056502b0977f1463a7 560w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/dna-qa-send.png?w=840&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=cf717245acc33522123342ab4ca71d2c 840w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/dna-qa-send.png?w=1100&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=da5b7470eec8e072f90251a17ff6fef2 1100w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/dna-qa-send.png?w=1650&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=c53cee71235052d9432d7c3475646d6e 1650w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/dna-qa-send.png?w=2500&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=674d496e7f96a5b3af185fad9f44803a 2500w" />
    </Tab>

    <Tab title="Swap">
      <img src="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/dna-qa-swap.png?fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=b590b3df3589bcebff653dd783ec32e7" alt="Swap Screen" className="m-auto block" width="260" style={{ maxWidth: "260px", height: "auto" }} data-og-width="832" data-og-height="1600" data-path="images/docs/mini-apps/quick-actions/dna-qa-swap.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/dna-qa-swap.png?w=280&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=faf3459a7305debd070d08cd8b4d1f7f 280w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/dna-qa-swap.png?w=560&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=91703f45311e29f38e4eac7a3002ffbd 560w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/dna-qa-swap.png?w=840&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=2c25ff7f6e305f3165933707e6ab7828 840w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/dna-qa-swap.png?w=1100&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=5c408eb463ff7e5cc6bc79edaa5194ac 1100w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/dna-qa-swap.png?w=1650&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=1cffed8b2897e46a8723d0c27cf0d7bb 1650w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/dna-qa-swap.png?w=2500&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=373a13ffd5fcfdae8d77babe9e1a895c 2500w" />
    </Tab>
  </Tabs>
</div>

## Helper Function

```tsx
const DNA_APP_ID = "app_8e407cfbae7ae51c19b07faff837aeeb";

function getDNADeeplinkUrl({
  tab,
  fromToken,
  toToken,
  recipientAddress,
  amount,
  sourceAppId,
  sourceDeeplinkPath,
}: {
  tab: "swap" | "send";
  fromToken?: string;
  toToken?: string;
  recipientAddress?: string;
  amount?: string;
  sourceAppId?: string;
  sourceDeeplinkPath?: string;
}) {
  let path = `/wallet?tab=${tab}`;

  if (fromToken) {
    path += `&fromToken=${fromToken}`;
    if (amount) {
      path += `&amount=${amount}`;
    }
  }

  if (toToken) {
    path += `&toToken=${toToken}`;
  }

  if (recipientAddress) {
    path += `&recipientAddress=${recipientAddress}`;
  }

  if (sourceAppId) {
    path += `&sourceAppId=${sourceAppId}`;
  }

  if (sourceDeeplinkPath) {
    path += `&sourceDeeplinkPath=${encodeURIComponent(sourceDeeplinkPath)}`;
  }

  const encodedPath = encodeURIComponent(path);
  return `https://worldcoin.org/mini-app?app_id=${DNA_APP_ID}&path=${encodedPath}`;
}
```

## **Returns**

A string representing the complete deeplink URL to the DNA application with the specified parameters.

## **Example Usage**

```typescript
const deeplinkUrl = getDNADeeplinkUrl({
  fromToken: "0x79A02482A880bCE3F13e09Da970dC34db4CD24d1",
  toToken: "0x4200000000000000000000000000000000000006",
  recipientAddress: "0xRecipientAddressHere",
  amount: "1235",
  sourceAppId: "app_a4f7f3e62c1de0b9490a5260cb390b56",
  sourceDeeplinkPath: "/path",
});
console.log(deeplinkUrl);
```

## **Generated Deeplink URL:**

```bash
https://worldcoin.org/mini-app?app_id=app_8e407cfbae7ae51c19b07faff837aeeb&path=%2Fwallet%3Ftab%3Dsend%26fromToken%3D0x79A02482A880bCE3F13e09Da970dC34db4CD24d1%26amount%3D1234500%26toToken%3D0x4200000000000000000000000000000000000006%26recipientAddress%3D0xRecipientAddressHere%26sourceAppId%3Dapp_a4f7f3e62c1de0b9490a5260cb390b56%26sourceDeeplinkPath%3D%252Fsome%252Fpath
```

## **Note**

* Ensure that the **amount** is specified in the unit of the fromToken (e.g., wei for Ethereum-based tokens).
* The **sourceDeeplinkPath** is URL-encoded to ensure it is correctly interpreted when the deeplink is accessed.
* The **DNA\_APP\_ID** should be defined in your environment to match the application ID assigned to your DNA instance.
* If the tab is **Send**, it is necessary/recommended to provide **fromToken**, **amount**, and **the recipient's address or username** *(toToken is not required)*.
* If the tab is **Swap**, it is necessary/recommended to provide **fromToken**, **toToken**, and **amount** *(in base unit)*.

This function facilitates the creation of deeplink URLs that can be used to direct users seamlessly into specific actions within the DNA application, enhancing the user experience by pre-filling transaction details.


# Earn WLD Pool
Source: https://docs.world.org/mini-apps/sharing/earn-wld-qa



Earn high yields with your WLD token. Put your WLD to work by adding liquidity to the markets and earning large rewards from other traders.
Earn WLD now supports a Quick Action to deeplink directly to their staking screen.

<div className="flex justify-between items-start">
  <div className="flex-1">
    <h3>Parameters</h3>

    <ParamField path="app_id" type="string" required>
      Unique ID for the Earn WLD mini app.
    </ParamField>
  </div>

  <div className="ml-5">
    <img src="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/earn-wld-qa.png?fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=977aff067f044c30b10305e0244e0dc8" alt="Liquidity Pool Screen" className="m-auto block" width="260" style={{ maxWidth: "260px", height: "auto" }} data-og-width="332" data-og-height="720" data-path="images/docs/mini-apps/quick-actions/earn-wld-qa.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/earn-wld-qa.png?w=280&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=65f90d633339563e6d8da955c2840acd 280w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/earn-wld-qa.png?w=560&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=ab83c95fd827cde8bed0656bb47f93fb 560w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/earn-wld-qa.png?w=840&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=ccc5557f205e89b3351003f8bfcb6f50 840w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/earn-wld-qa.png?w=1100&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=1bdf1493361956714c37533c181e78e3 1100w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/earn-wld-qa.png?w=1650&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=87313f732ae353ade61aa45c98358958 1650w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/earn-wld-qa.png?w=2500&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=abd122ff35fb2a389141ce2021915fea 2500w" />
  </div>
</div>

Url follows the schema below. Navigate there to use this Quick Action.

```
http://worldcoin.org/mini-app?app_id=app_b0d01dd8f2bdfbff06c9e123de487eb8
```


# Holdstation Buy
Source: https://docs.world.org/mini-apps/sharing/holdstation-buy-qa



[Holdstation Wallet](https://worldcoin.org/ecosystem/app_0d4b759921490adc1f2bd569fda9b53a) is a simple, secure token wallet that allows you to buy, sell, swap, or send tokens.

<div
  style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
}}
>
  <div>
    <ParamField path="address" type="string" required>
      The token address the user wants to buy.
    </ParamField>

    <ParamField path="from" type="string" required>
      The token address the user will use to pay (payment token).
    </ParamField>

    <ParamField path="amount" type="string" required>
      The dollar amount the user wants to buy.
    </ParamField>

    <ParamField path="app_id" type="string" required>
      The unique ID for the Holdstation mini app.
    </ParamField>

    <ParamField path="path" type="string" required>
      URL-encoded path to the buy token screen with parameters.
    </ParamField>
  </div>

  <div className="ml-5">
    <img src="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/quick-actions/holdstation-buy-qa.png?fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=92a0590ec6e38d1d1356a8a62ae5531b" alt="Buy WLD Screen" className="m-auto block" width="260" style={{ maxWidth: "260px", height: "auto" }} data-og-width="1290" data-og-height="2796" data-path="images/docs/mini-apps/quick-actions/holdstation-buy-qa.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/quick-actions/holdstation-buy-qa.png?w=280&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=e3459bd494b0ca74561485aa7e965145 280w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/quick-actions/holdstation-buy-qa.png?w=560&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=8b250997730ae9c04e048dcc7dcad093 560w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/quick-actions/holdstation-buy-qa.png?w=840&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=866642954215773967f5debe743da1b2 840w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/quick-actions/holdstation-buy-qa.png?w=1100&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=fcc9e745a732188039b0b2423e9f1c7f 1100w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/quick-actions/holdstation-buy-qa.png?w=1650&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=e653581499cd9c8ebe202c99712ef092 1650w, https://mintcdn.com/tfh/Cx1nS-GdNBErhlkt/images/docs/mini-apps/quick-actions/holdstation-buy-qa.png?w=2500&fit=max&auto=format&n=Cx1nS-GdNBErhlkt&q=85&s=6c4ac09ded2f518f149794d2c444c7b6 2500w" />
  </div>
</div>

## Helper function

```tsx
const HOLDSTATION_APP_ID = "app_0d4b759921490adc1f2bd569fda9b53a";

function getHoldstationDeeplinkUrl({
  address,
  from,
  amount,
}: {
  address: string;
  from: string;
  amount: string;
}) {
  const path = `/token/buy?address=${address}&from=${from}&amount=${amount}`;
  const encodedPath = encodeURIComponent(path);
  return `https://worldcoin.org/mini-app?app_id=${HOLDSTATION_APP_ID}&path=${encodedPath}`;
}

// Buy $1 worth of WLD using USDC
console.log(
  getHoldstationDeeplinkUrl({
    address: "0x2cFc85d8E48F8EAB294be644d9E25C3030863003", // WLD token address
    from: "0x79A02482A880bCE3F13e09Da970dC34db4CD24d1", // USDC token address
    amount: "1",
  })
);
```

### Example output link : Buy \$1 worth of WLD using USDC

```
https://worldcoin.org/mini-app?app_id=app_0d4b759921490adc1f2bd569fda9b53a&path=%2Ftoken%2Fbuy%3Faddress%3D0x2cFc85d8E48F8EAB294be644d9E25C3030863003%26from%3D0x79A02482A880bCE3F13e09Da970dC34db4CD24d1%26amount%3D1
```


# OnePay
Source: https://docs.world.org/mini-apps/sharing/one-pay-qa



The easiest way to pay with tokens

OnePay allows users to easily spend and accept crypto payments. This Quick Action enables direct links to payment screens for seamless crypto transactions.

<div className="flex justify-between items-start">
  <div className="flex-1">
    <h3>Parameters</h3>

    <ParamField path="paymentId" type="string">
      A unique ID to be used for the payment. This can be generated by the
      caller.
    </ParamField>

    <ParamField path="recipient" type="string">
      The address of the merchant's wallet that will receive the payment.
    </ParamField>

    <ParamField path="amount" type="string">
      The amount of USDC to be charged by the payment.
    </ParamField>
  </div>

  <div className="ml-5">
    <img src="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/onepay-qa.png?fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=7bc1450b7d6743a05ddb94f6f17f894a" alt="OnePay Payment Screen" className="m-auto block" width="260" style={{ maxWidth: "260px", height: "auto" }} data-og-width="588" data-og-height="1280" data-path="images/docs/mini-apps/quick-actions/onepay-qa.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/onepay-qa.png?w=280&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=916fd9efc2eed0012a8d2f0c2cc2bc8f 280w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/onepay-qa.png?w=560&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=28047a5d112c50ebfdd89de5624b9f31 560w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/onepay-qa.png?w=840&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=f9f77805371e7326f0aacff0069eacc5 840w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/onepay-qa.png?w=1100&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=457462d0e5acbcd962e60052697d4805 1100w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/onepay-qa.png?w=1650&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=2c3e006796b152a9b4ba8e6f19dfa59d 1650w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/onepay-qa.png?w=2500&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=769f84a179c90cbabbb2e9b4cba96ac6 2500w" />
  </div>
</div>

Url follows the schema below. Navigate there to use this Quick Action.

```
https://worldcoin.org/mini-app?app_id=app_d9589ab005e18dcf362d2ea26aef669e&path=/pay
```


# ORBITAL-X
Source: https://docs.world.org/mini-apps/sharing/orbital-x-qa



Digital withdrawals in Latin America

Orbital-X allows users to make digital withdrawals. This Quick Action enables direct access to their platform where users can connect Colombian bank accounts to send and receive money.

<div className="flex justify-between items-start">
  <div className="flex-1">
    <h3>Parameters</h3>

    <ParamField path="No parameters" type="none">
      This Quick Action does not require any parameters. Simply navigate to the
      URL to access the Orbital-X app directly.
    </ParamField>
  </div>

  <div className="ml-5">
    <img src="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/orbital-qa.png?fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=e237fb3ee99dcc73bb8962c644a7139e" alt="Orbital-X Withdrawal Screen" className="m-auto block" width="260" style={{ maxWidth: "260px", height: "auto" }} data-og-width="1080" data-og-height="2172" data-path="images/docs/mini-apps/quick-actions/orbital-qa.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/orbital-qa.png?w=280&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=77242ef692ae975757b255c608814021 280w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/orbital-qa.png?w=560&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=25a196302aaf0db9e0fa3eb9b11c3802 560w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/orbital-qa.png?w=840&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=aad5d4fd37f35ca6c8d1c818c029ca19 840w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/orbital-qa.png?w=1100&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=522e3c08a5f9f5190c308d4cc861355f 1100w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/orbital-qa.png?w=1650&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=52ee1a983230f06107b601beb500c18b 1650w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/orbital-qa.png?w=2500&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=aea0fbd4f215e0903d8b0268272cc659 2500w" />
  </div>
</div>

Url follows the schema below. Navigate there to use this Quick Action.

```
https://worldcoin.org/mini-app?app_id=app_2248679d8f07eb1b7eacd922f9a26a1e
```


# PUF
Source: https://docs.world.org/mini-apps/sharing/puf-qa



Create & Trade coins on World Chain

PUF enables users to create and launch their own memecoins on World Chain, powered by Worldcoin's Proof of Personhood. This Quick Action provides direct links to token information or creation screens.

<div className="flex justify-between items-start">
  <div className="flex-1">
    <h3>Parameters</h3>

    <ParamField path="path" type="string">
      The path to navigate to within PUF. Format: "app/token/(tokenAddress)"
      where tokenAddress is the contract address of a memecoin.
    </ParamField>
  </div>

  <div className="ml-5">
    <img src="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/puf-qa.png?fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=d8bf353ab4ae02d318109e226e824844" alt="PUF Token Screen" className="m-auto block" width="260" style={{ maxWidth: "260px", height: "auto" }} data-og-width="944" data-og-height="2048" data-path="images/docs/mini-apps/quick-actions/puf-qa.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/puf-qa.png?w=280&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=9078e689efea9593798cb8794288d0a8 280w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/puf-qa.png?w=560&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=14ca07571747e10cae6770300ab90668 560w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/puf-qa.png?w=840&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=b8509278df34066d987073531841c02c 840w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/puf-qa.png?w=1100&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=9abf6e919bc1f2c8a91233eb5aff78cb 1100w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/puf-qa.png?w=1650&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=e6c8b1e8a59a88d7c77b3e91afbb054c 1650w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/puf-qa.png?w=2500&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=6dfb7da5c558a09cf7dc71d913a5ed90 2500w" />
  </div>
</div>

Url follows the schema below. Navigate there to use this Quick Action.

```
https://worldcoin.org/mini-app?app_id=app_15daccf5b7d4ec9b7dbba044a8fdeab5&path=app/token/0x57268aFa4E496684611aAFB1E20D2116283C487e
```


# Quick Actions
Source: https://docs.world.org/mini-apps/sharing/quick-actions



### **What Are Quick Actions?**

A Quick Action is a universal deeplink defined by a schema that navigates to a specific path inside your app. It's meant to be used between mini apps, enabling one app (App A) to use a feature or action of another app (App B) seamlessly.
In short, you should create a quick action to link to another mini app.

<Note>
  If a user clicks on your link and has World App installed, it will automatically open the mini app inside of World
  App to the specified path. Otherwise, it will direct them to the app store and prompt them to install World App.
</Note>

### **Benefits of Quick Actions**

1. **Leverage Expertise**: Use other mini apps already working specific features.
2. **Resource & Time Optimization**: Focus on your apps core functionalities while outsourcing supplementary features.
3. **Community Growth**: Integrating another apps functionality opens opportunities for co-marketing.

### **How to Make a Quick Action**

1. **Create a Universal Link Schema**: Define a schema with a custom path that aligns with the functionality you want to provide.

2. **Publish it in our docs for all devs to use**: Fill this [form](https://forms.gle/UBcKMrnxtyxqX4dq6) for our team to test and publish your quick action on this page.

Urls will follow the schema below.

```
https://world.org/mini-app?app_id={app_id}&path={path}
```

### Parameters

<ParamField path="app_id" type="string" required>
  The `app_id` corresponding to your mini app.
</ParamField>

<ParamField path="path" type="string">
  Should be the url encoded path where you want to link to inside of your mini app
</ParamField>


# Sage Support
Source: https://docs.world.org/mini-apps/sharing/sage-qa



[Sage](https://worldcoin.org/ecosystem/app_5dee2f19cd6eef599eb6ab275a0a7523) is an AI chatbot that lets users ask questions and get answers.

Sage Support enables developers to integrate Sage chats seamlessly into their World Mini Apps. Developers get a white label version of Sage that acts as a support assistant for their Mini App using the context they give it.

## Key Features

* **Seamless Integration**: Easily embed Sage chats within any World Mini App.
* **Custom Context Parameters**: Tailor Sage's responses based on Mini App specific data.
* **Logs and Analytics**: Track and understand what types of questions your users are asking.

<div className="flex gap-4 justify-center">
  <img src="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/sage1-qa.png?fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=3634464b6081573f98f5a263c0543178" alt="Sage Developer Dashboard Analytics" className="block" width="300" data-og-width="3840" data-og-height="2160" data-path="images/docs/mini-apps/quick-actions/sage1-qa.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/sage1-qa.png?w=280&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=ca6fbbeb52350b78c57eb38f9ca9c19a 280w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/sage1-qa.png?w=560&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=3526cd5a0b44996350926d496d60fc78 560w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/sage1-qa.png?w=840&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=49d4ba336240c35f1d74e08babba6cb2 840w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/sage1-qa.png?w=1100&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=88eb47b8efd84750ad0f7d1f8962b3f9 1100w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/sage1-qa.png?w=1650&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=24596327c09f0704a213ceef8add5906 1650w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/sage1-qa.png?w=2500&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=daed6f52aacb6321fa77f2f22019636d 2500w" />

  <img src="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/sage2-qa.png?fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=c0a24d088da8ccb817b7c9489b693d76" alt="Sage Developer Dashboard Settings" className="block" width="300" data-og-width="2596" data-og-height="1460" data-path="images/docs/mini-apps/quick-actions/sage2-qa.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/sage2-qa.png?w=280&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=9addb8e9f65a08004e05c6e3ea7912bf 280w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/sage2-qa.png?w=560&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=5088d86d8c31d6b6253a21a9f8b29ccc 560w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/sage2-qa.png?w=840&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=a314cf462f94e7ddd5211dd04f0d42e8 840w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/sage2-qa.png?w=1100&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=d55395c1a36618fb4ff0c74b073390fa 1100w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/sage2-qa.png?w=1650&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=d47898c3a0f3834c879d4108c240996d 1650w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/sage2-qa.png?w=2500&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=a5c4b26ea07a02ebbdf4a400572030b8 2500w" />
</div>

***

## Getting Started

### 1. Create a Sage Developer project

Go to the [Sage Developer dashboard](https://dev-dashboard-gamma.vercel.app) and sign in. Create a new project.

### 2. Customizing Sage to fit your app

With a project created, head over to the project's settings, this page is accessible by going into: **Apps > Your App > Settings**. (Navigation is available through the menu bar on the top right or the top left breadcrumbs)

In this page you can find parameters to fine tune Sage to best interact with your users in the context of your app, a comprehensive description of these parameters is present [below](#app-settings).

### 3. Integrating Sage Support in your app

The final step to integrating Sage Support into your React application is to install and make use of the `SageSupport` component.

Add the npm package with the command:

```bash
npm install sage-support
```

Once the dependency installed, the simplest way to integrate Sage Support is:

```tsx
import { SageSupport } from "sage-support";

<SageSupport projectId={YOUR_APP_ID} />;
```

Where `YOUR_APP_ID` is the App ID (number) you can find in the [Sage Developer Dashboard](https://dev-dashboard-gamma.vercel.app) (top right).

More configuration options for the component are available [below](#sage-support-component).

### 4. Sage Support Link

Generate your app's Support Link using the [Support Link wizard](#support-link-generator) and use it as the Support URL under **Worldcoin Developer > Mini App > Configuration > App Store > Support > Link**.

### Analytics

Once you've started using Sage Support in your Mini App, analytics are also available in the [Sage Developer Dashboard](https://dev-dashboard-gamma.vercel.app), allowing you to identify the usage of Sage Support in your app and understand how users are using it. You can find more information about analytics [below](#app-analytics).

<Note>
  This is all you need to get Sage Support working. If you wish to customize it
  further, or better understand the various parameters continue reading below.
</Note>

***

## App Settings

Located at **Apps > Your App > Settings**, the Settings page allows you to fine tune the Sage Support assistant to meet the needs and context of your Mini App.

### `App Name`

This name only lives in the [Sage Developer dashboard](https://dev-dashboard-gamma.vercel.app) universe and serves the purpose of differentiating between multiple Sage Support integrations, it's recommended that this field is set accordingly.

### `App ID`

Uniquely identifies your Sage Developer App and is used to link your `SageSupport` component to the [Sage Developer dashboard](https://dev-dashboard-gamma.vercel.app). This field is automatically generated and cannot be changed.

### `Introduction Message`

Defines the first message to be sent by the Sage assistant once a new chat is created/open by a user. This field is also capable of encompassing a custom variable (`%USER%`) which Sage will replace by the user's username.

### `App Description`

Provide a solid description about your app and what it focuses on, this field is processed by Sage as an additional context parameter, and is useful to keep the assistant behavior and subject within the landscape of your Mini App.

***

## App Analytics

Located at **Apps > Your App > Analytics**, the Analytics page allows you to view statistics and analytic data about the usage of Sage Support within your Mini App.

### `Messages`

See how many messages were sent to Sage Support chats from your Mini App in each of the last 7 days.

### `Users`

See how many users interacted with Sage Support chats from your Mini App in each of the last 7 days.

### `Keywords`

Currently not available.

### `Next Step`

Currently not available.

### `Logs`

See how users chat with Sage Support inside your app, this data is shown anonymously and provides the developer with a more in-depth tool to explore the interactions between users and Sage Support.

***

## `SageSupport` Component

### Installation

To use the Sage Support React component you must first install it using npm (or your package manager of choice).

```bash
npm install sage-support
```

### Basic Usage

From the get go you can use Sage Support by using the basic implementation, the only mandatory parameter to be passed to the component is the `projectId`. This ID (App ID) is retrieve from the Settings page in the [Sage Developer dashboard](https://dev-dashboard-gamma.vercel.app).

```tsx
import { SageSupport } from "sage-support";

<SageSupport projectId={YOUR_APP_ID} />;
```

### Props & Personalisation

Other props allow you to customize both the aesthetic and behavior of the Sage Support Chat.

<ParamField path="projectId" type="number" required>
  Links your component to your Sage Developer project, used for analytics and
  behavior.
</ParamField>

<ParamField path="returnURI" type="string">
  Allows you to make use of the return button on the top left of the Sage
  Support chat window. The value to be passed to this prop is a [quick action
  URL](https://docs.world.org/mini-apps/sharing/quick-actions).
</ParamField>

<ParamField path="className" type="string">
  Allows you to pass custom CSS classes to affect the fallback default button.
</ParamField>

<ParamField path="children" type="React.ReactNode">
  Allows you to pass a custom React element to replace the default button.
</ParamField>

***

## Support Link

You can also integrate Sage Support directly into your World Mini App by using a Support Link. This allows your users to access Sage's AI-powered support without requiring you to install any additional packages or components.

The Support Link is a quick action URL that opens the Sage Support chat interface directly within the World App. When users click on this link, they'll be able to ask questions and get support related to your Mini App.

This link is particularly useful for developers to use Sage as their Mini App's native Support link, available under **Worldcoin Developer > Mini App > Configuration > App Store > Support > Link**

### Base URL & Parameters

The base URL to access a support chat is:

`https://worldcoin.org/mini-app?app_id=app_5dee2f19cd6eef599eb6ab275a0a7523&path=/support-chat`

This support link, akin to the [`SageSupport` component](#sage-support-component), accepts and requires some parameters to be passed, in this case URL Query Parameters, for the Support Chat to work like expected.

<ParamField path="devProjectId" type="number" required>
  Links your Support Link to your Sage Developer project, used for analytics and behavior.
</ParamField>

<ParamField path="devReturnURI" type="string">
  Allows you to make use of the return button on the top left of the Sage Support chat window by passing a Mini App quick atcion URI/URL. Due to some encoding functionalities and implementation caveats, the value to be passed to this parameter has to be formatted accordingly beforehand:

  1. The URL must be submitted to a [UTF-8 encoding](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent).

  2. All ampersand characters (such as the one in `&path`) have to be replaced with the sequence `(amps)`.

  To make this process easier, you can make use of the generator below or inside the [Sage Developer Dashboard](https://dev-dashboard-gamma.vercel.app). Any URIs outside of the `worldcoin.org/mini-app` space are not allowed.
</ParamField>

### Support Link Generator

<Note>
  The Support Link Generator component would be inserted here in the actual
  implementation.
</Note>


# UNO Swap
Source: https://docs.world.org/mini-apps/sharing/uno-qa



[UNO](https://worldcoin.org/ecosystem/app_a4f7f3e62c1de0b9490a5260cb390b56) is your simple, secure token wallet.
View your token balances and check prices all in one place. Buy, Sell, Swap, or Send tokens in a fun and simple interface.

Uno now supports a Quick Action to deeplink directly to the swap tab, with a specific swap ready to be executed.

<div
  style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
}}
>
  <div style={{ flex: 1 }}>
    <h3>Parameters</h3>

    <ParamField path="tab" type="string" required>
      Currently only supports "swap"; this allows deep linking to the swap tab.
    </ParamField>

    <ParamField path="fromToken" type="string">
      Token address for the from token.
    </ParamField>

    <ParamField path="amount" type="string">
      Base units amount of the from token.
    </ParamField>

    <ParamField path="toToken" type="string">
      Token address for the to token.
    </ParamField>

    <ParamField path="referrerAppId" type="string">
      World Miniapp App id of the referring World Miniapp. When provided, a "Go
      Back" deeplink button will appear in the top left of the header that takes
      the user back to the referring Miniapp.
    </ParamField>

    <ParamField path="referrerDeeplinkPath" type="string">
      Deeplink path for referring World Miniapp Quick Actions. When provided,
      this path will be added to the "Go Back" deeplink button so that the
      referring Miniapp can execute a Quick Action when the user taps "Go Back"
      in Uno.
    </ParamField>
  </div>

  <div style={{ marginLeft: "20px" }}>
    <img src="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/uno-qa.png?fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=8563b743ac2491d220686e7e377a85f7" alt="Swap Screen" className="m-auto block" width="300" data-og-width="236" data-og-height="512" data-path="images/docs/mini-apps/quick-actions/uno-qa.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/uno-qa.png?w=280&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=e8c1f7aeb264b65361930173f739a6b1 280w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/uno-qa.png?w=560&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=27d7aaf5f4cbfd2c29402d6d205afc38 560w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/uno-qa.png?w=840&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=bdb2d5f1dcd0fe00632b56cf511d4325 840w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/uno-qa.png?w=1100&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=d26c29e2db0a08bf72eddbb40f8680ab 1100w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/uno-qa.png?w=1650&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=dece6bc632af74bca397911dcc39e8e0 1650w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/uno-qa.png?w=2500&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=e576ed8291861dd03377fbd808769e07 2500w" />
  </div>
</div>

## Helper function

```tsx
const UNO_APP_ID = "app_a4f7f3e62c1de0b9490a5260cb390b56";

function getUnoDeeplinkUrl({
  fromToken,
  toToken,
  amount,
  referrerAppId,
  referrerDeeplinkPath,
}: {
  fromToken?: string;
  toToken?: string;
  amount?: string;
  referrerAppId?: string;
  referrerDeeplinkPath?: string;
}) {
  let path = `?tab=swap`;
  if (fromToken) {
    path += `&fromToken=${fromToken}`;
    if (amount) {
      path += `&amount=${amount}`;
    }
  }
  if (toToken) {
    path += `&toToken=${toToken}`;
  }
  if (referrerAppId) {
    path += `&referrerAppId=${referrerAppId}`;
  }
  if (referrerDeeplinkPath) {
    path += `&referrerDeeplinkPath=${encodeURIComponent(referrerDeeplinkPath)}`;
  }
  const encodedPath = encodeURIComponent(path);
  return `https://worldcoin.org/mini-app?app_id=${UNO_APP_ID}&path=${encodedPath}`;
}

// create a trade for 1.2345 USDC to WETH
console.log(
  getUnoDeeplinkUrl({
    fromToken: "0x79A02482A880bCE3F13e09Da970dC34db4CD24d1",
    amount: "1234500",
    toToken: "0x4200000000000000000000000000000000000006",
  })
);
```

### Example output link

```
https://worldcoin.org/mini-app?app_id=app_a4f7f3e62c1de0b9490a5260cb390b56&path=%3Ftab%3Dswap%26fromToken%3D0x79A02482A880bCE3F13e09Da970dC34db4CD24d1%26amount%3D1234500%26toToken%3D0x4200000000000000000000000000000000000006
```

### Appendix

**Terminology**

* **fromToken** - token that is being swapped away for another token. Other names for this parameter are "sell token", or "input token".
* **toToken** - token that is being swapped into for another token. Other names for this parameter are "buy token", or "output token".
* **referrer** - In the cases that the UNO Quick Action link is used from a different Miniapp, the referrer is the Miniapp where that link was used.
  Specifying the referrerAppId allows UNO to provide a "Go back" to the Miniapp that provided the link to the UNO Quick Action.

**Caveats/Warnings** Swap will not work if not taken into consideration.

* If the user does not have the fromToken (sell token).
* Amount should be in the base units of the fromToken.


# VUNI
Source: https://docs.world.org/mini-apps/sharing/vuni-qa



Decentralized investment fund powered by a smart contract that securely manages user funds. A trading bot automatically executes trades on Uniswap based on real-time alerts from TradingView, optimizing investment strategies without manual intervention.

<div className="flex justify-between items-start">
  <div className="flex-1">
    <h3>Parameters</h3>

    <ParamField path="app_id" type="string" required>
      Unique ID for the VUNI mini app.
    </ParamField>

    <ParamField path="path" type="string">
      URL encoded path to specific sections of the app.
    </ParamField>

    <ParamField path="ref" type="string">
      Referral code for tracking purposes.
    </ParamField>

    <h3>Available Routes</h3>

    <h4>1. /pool</h4>

    <ParamField path="tab" type="string">
      Active tab on page load. Values: "stats" | "tokens" | "trades" | "top-investors". Default: "stats"
    </ParamField>

    <h4>2. /investor/\${'{'}address{'}'}</h4>

    <ParamField path="tab" type="string">
      Active tab on page load. Values: "tokens" | "deposits" | "withdrawals" | "referrals". Default: "tokens"
    </ParamField>

    <h4>3. /sign-in</h4>
    <p>Access the sign-in page.</p>

    <h3>Localization</h3>
    <p>All routes support an optional locale prefix (e.g., /en/) for localization.</p>
  </div>

  <div className="ml-5">
    <img src="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/vuni-qa.png?fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=c7ac89ccc501c56f426774cfb59b2373" alt="VUNI Interface" className="m-auto block" width="260" style={{ maxWidth: "260px", height: "auto" }} data-og-width="590" data-og-height="1200" data-path="images/docs/mini-apps/quick-actions/vuni-qa.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/vuni-qa.png?w=280&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=f39d9c2254b6286f7e457d1336974e4b 280w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/vuni-qa.png?w=560&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=5d74239b46c8b3e6a12d06f2807af927 560w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/vuni-qa.png?w=840&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=8faa876b1d0ef14383a6e8de8ab3615f 840w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/vuni-qa.png?w=1100&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=6f3c7684faed28bc96e7e9a1bbc2a2f1 1100w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/vuni-qa.png?w=1650&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=17d1fc623a19e8bb5b9e55c942103f11 1650w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/vuni-qa.png?w=2500&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=78354960cd4f7ceb2f47881b449f9528 2500w" />
  </div>
</div>

Example URLs:

```
# Access pools with trades tab
https://worldcoin.org/mini-app?app_id=app_10ca32093aa9ad0e52bc812d63daf818&path=%2Fpool%3Ftab%3Dtrades

# View investor info with referrals tab
https://worldcoin.org/mini-app?app_id=app_10ca32093aa9ad0e52bc812d63daf818&path=%2Finvestor%2F0x6917A2418aBDc514E1745207200bFbA75E1dfd6E%3Ftab%3Dreferrals

# Access with referral code
https://worldcoin.org/mini-app?app_id=app_10ca32093aa9ad0e52bc812d63daf818&path=%3Fref%3DGD9WWI

# Access pools with stats tab (localized)
https://worldcoin.org/mini-app?app_id=app_10ca32093aa9ad0e52bc812d63daf818&path=%2Fen%2Fpool%3Ftab%3Dstats
```


# World Companies Finder
Source: https://docs.world.org/mini-apps/sharing/world-companies-finder-qa



Find businesses accepting World cryptocurrency as payment

World Companies Finder provides an interactive map that showcases businesses around the globe accepting World cryptocurrency. This Quick Action allows you to deeplink directly to the map interface.

<div className="flex justify-between items-start">
  <div className="flex-1">
    <h3>Parameters</h3>

    <ParamField path="id" type="string">
      Links to a specific business listing. If provided, it will go to the
      business detail page.
    </ParamField>

    <ParamField path="path" type="string">
      If set to "new", allows users to add a new business to the map.
    </ParamField>
  </div>

  <div className="ml-5">
    <img src="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/wcf-qa.png?fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=a6d04457df24317d582962a6b02a36f2" alt="World Companies Finder Map" className="m-auto block" width="260" style={{ maxWidth: "260px", height: "auto" }} data-og-width="613" data-og-height="1280" data-path="images/docs/mini-apps/quick-actions/wcf-qa.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/wcf-qa.png?w=280&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=17463a310a46ca69c3b06f8e85774e34 280w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/wcf-qa.png?w=560&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=9de72e51757def75c6cd26bee7327c0c 560w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/wcf-qa.png?w=840&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=855132fc42244697de7a941fe08b01dd 840w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/wcf-qa.png?w=1100&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=99ac1ce8312fdb7bd2cb3539768b74ce 1100w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/wcf-qa.png?w=1650&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=7dd8cc2386d2125fcef78b24fd553fa5 1650w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/mini-apps/quick-actions/wcf-qa.png?w=2500&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=c71d3ed16b7e3c54c181da44a8f295d8 2500w" />
  </div>
</div>

Url follows the schema below. Navigate there to use this Quick Action.

```
https://worldcoin.org/mini-app?app_id=app_a11be267c4baa35bca6d18b3cdd6a23c&path=new
```


# Deploy Smart Contracts
Source: https://docs.world.org/world-chain/developers/deploy



In this tutorial, we will use the [Solidity programming language](https://docs.soliditylang.org/en/v0.8.28/) to write the `HelloWorldChain` smart contract for World Chain.
Solidity is a programming language that can compile to EVM (Ethereum Virtual Machine) bytecode which can be executed on the World Chain EVM.
We will also be using the [Foundry CLI](https://book.getfoundry.sh/) toolkit, which has a lot of tools to help build, test and interact with Solidity programs.

## Download development tools

First, we need to install the Foundry CLI toolkit and the Solidity compiler. Solidity comes with a compiler called `solc` which we will use to compile the `HelloWorldChain` contract. The Foundry CLI
will automatically download the right version of the Solidity compiler for you during the compilation process using `forge build`.

<CodeGroup>
  `bash Install Foundry curl -L https://foundry.paradigm.xyz | bash `
</CodeGroup>

## Create a Foundry project

Open your terminal of choice, navigate to a directory where you want to create your project, and run the following command to create a new Foundry project:

<CodeGroup>
  ````bash Create a new Foundry project forge init hello-world-chain && cd
  hello-world-chain ```
  </CodeGroup>

  Now that you have created a new Foundry project, you can start writing your smart contract. All smart contracts in Foundry projects are stored in the `src` directory.
  If you are using VSCode, it should look something like this:

  ![Foundry 1](/images/docs/world-chain/foundry-1.png)

  ## Write the HelloWorldChain contract

  First, delete the template file called Counter.sol in the /src directory:

  <CodeGroup>```bash Delete Template rm src/Counter.sol ```</CodeGroup>

  Next, create a new file called HelloWorldChain.sol in the /src directory and add the following code to it:

  <CodeGroup>
  ```solidity HelloWorldChain.sol
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.28;

  contract HelloWorldChain {
  string private word;

    // Constructor that sets the initial word to "Hello World Chain!"
    constructor() {
        word = "Hello World Chain!";
    }

    // Setter function to update the word
    function setWord(string memory newWord) public {
        word = newWord;
    }

    // Getter function to return the current word
    function getWord() public view returns (string memory) {
        return word;
    }

  }

  ````
</CodeGroup>

This contract has a `word` variable that stores a string and two functions: `setWord` to update the word and `getWord` to return the current word.

## Update Scripts and Tests

Since we deleted `Counter.sol`, we need to update or remove the scripts and tests that reference it to prevent compilation errors.

**Delete the `script` directory**

The script directory contains scripts that import `Counter.sol`. Since we no longer have `Counter.sol`, we can delete the entire script directory to avoid any compilation issues:

<CodeGroup>
  ```bash Delete Script Directory
  rm -rf script
  ```
</CodeGroup>

**Replace** `Counter.t.sol` with `HelloWorldChain.t.sol`

In the test directory, delete the existing `Counter.t.sol` and create a new test file called `HelloWorldChain.t.sol` and add the following simple tests:

<CodeGroup>
  ```solidity HelloWorldChain.t.sol
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.28;

  import "forge-std/Test.sol";
  import "../src/HelloWorldChain.sol";

  contract HelloWorldChainTest is Test {
  HelloWorldChain helloWorldChain;

      function setUp() public {
          helloWorldChain = new HelloWorldChain();
      }

      function testInitialWord() public view {
          string memory expected = "Hello World Chain!";
          string memory actual = helloWorldChain.getWord();
          assertEq(actual, expected);
      }

      function testSetWord() public {
          string memory newWord = "Hello Foundry!";
          helloWorldChain.setWord(newWord);
          string memory actual = helloWorldChain.getWord();
          assertEq(actual, newWord);
      }

  }

  ```
</CodeGroup>

**Now You can Run tests:**

<CodeGroup>
  ```bash Test the contract
  forge test
  ```
</CodeGroup>

## Compile the contract

To compile the `HelloWorldChain` contract, run the following command:

<CodeGroup>`bash Compile the contract forge build `</CodeGroup>

The `forge build` command will compile the contract using the Solidity compiler and generate the necessary artifacts in the `artifacts` directory.

## Generate a wallet

To deploy the `HelloWorldChain` contract to World Chain Sepolia, you will need a wallet with some World Chain Sepolia ETH. An easy way to generate a
wallet using the Foundry CLI is to run the following command:

<CodeGroup>`bash Generate a wallet cast wallet new `</CodeGroup>

`cast` is a versatile set of utility functions and commands for Solidity development. In this case, we are using one of its many built-in features to generate a wallet with one account.

<Note>
  Never share your private key with anyone and always make sure that you don't
  upload them to code versioning tools like Git and hosting platforms like
  GitHub. Research best practices for private key management in order to avoid
  loss of funds.
</Note>

The output of the command will look something like this:

````
Successfully created new keypair.
Address:     0xB815A0c4bC23930119324d4359dB65e27A846A2d
Private key: 0xcc1b30a6af68ea9a9917f1dda20c927704c5cdb2bbe0076901a8a0e40bf997c5
```

## Fund your wallet

Now that you have a wallet, you need to fund it with some World Chain Sepolia ETH. You can get some World Chain Sepolia ETH from the [World Chain Sepolia faucet](https://www.alchemy.com/faucets/world-chain-sepolia) operated by Alchemy.
In the form on the faucet page, enter the address of your wallet which you generated above and click the "Send me ETH" button. If you have any issues please send us a message in the developer
group chat on [Telegram](https://t.me/worldcoindevelopers) or [Discord](https://world.org/discord).

## Deploy the contract

Now that you have a wallet and you funded it with World Chain Sepolia ETH, you can deploy the `HelloWorldChain` contract to World Chain Sepolia using the following `forge create` command:

<CodeGroup>
  ```bash Deploy the contract forge create
  src/HelloWorldChain.sol:HelloWorldChain --rpc-url
  https://worldchain-sepolia.g.alchemy.com/public --private-key
  0xcc1b30a6af68ea9a9917f1dda20c927704c5cdb2bbe0076901a8a0e40bf997c5 ```
</CodeGroup>

Here, we are using the `<path>:<contractname>` format to specify the contract. This tells Foundry where to find the contract file (src/HelloWorldChain.sol) and which contract within the file (HelloWorldChain) to deploy.
We also use the `--rpc-url` flag to specify the RPC URL of the World Chain Sepolia network and the `--private-key` flag to specify the private key of the wallet we generated earlier.
On top of this we can also provide other flags like `-vvvvv` to get more verbose output from the deployment process, `--verify` to verify the contract on [Worldscan](https://worldscan.org) or [Blockscout](https://worldchain-sepolia.explorer.alchemy.com/) (alongside with an `--etherscan-api-key` flag) and
several other flags to toggle different features that you can find more about in the [Foundry documentation](https://book.getfoundry.sh/).

And that's it! You have successfully deployed a smart contract to World Chain Sepolia. You can interact with the contract using `forge script` scripts, using a block explorer or any other EVM library like [ethers.js](https://docs.ethers.io/v5/), [alloy-rs](https://github.com/alloy-rs/alloy/), and many others.
````


# EVM Equivalence
Source: https://docs.world.org/world-chain/developers/evm-equivalence



World Chain is EVM-equivalent because it utilizes the [OP Stack](https://docs.optimism.io/stack/getting-started), a modular framework developed by Optimism,
which ensures compatibility with the [Ethereum Virtual Machine (EVM)](https://ethereum.org/en/developers/docs/evm/). By leveraging the OP Stack,
World Chain can execute smart contracts and interact with decentralized applications designed for Ethereum
without any modifications. This equivalency enables seamless interoperability with Ethereum's ecosystem of applications and protocols.
The OP Stack's modularity also allows World Chain to implement scaling solutions and other customizations while maintaining the fundamental EVM equivalence,
ensuring a flexible yet consistent environment for developers and users alike.

## Differences between World Chain, OP Mainnet and Ethereum

Though the EVM remains unchanged across OP Stack (Superchain) chains compared to the Ethereum layer 1, there are some configurations of the execution clients that
do differ.

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Parameter</th>
      <th className="p-2 text-left align-middle">World Chain</th>
      <th className="p-2 text-left align-middle">OP Mainnet</th>
      <th className="p-2 text-left align-middle">Ethereum</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">Block time in seconds</td>
      <td className="p-2 align-middle">2</td>
      <td className="p-2 align-middle">2</td>
      <td className="p-2 align-middle">12</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Block gas limit</td>
      <td className="p-2 align-middle">30,000,000</td>
      <td className="p-2 align-middle">30,000,000</td>
      <td className="p-2 align-middle">30,000,000</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Block gas target</td>
      <td className="p-2 align-middle">10,000,000</td>
      <td className="p-2 align-middle">5,000,000</td>
      <td className="p-2 align-middle">15,000,000</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">EIP-1559 elasticity multiplier</td>
      <td className="p-2 align-middle">6</td>
      <td className="p-2 align-middle">6</td>
      <td className="p-2 align-middle">2</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">EIP-1559 denominator</td>
      <td className="p-2 align-middle">250</td>
      <td className="p-2 align-middle">250</td>
      <td className="p-2 align-middle">8</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Maximum base fee increase (per block)</td>
      <td className="p-2 align-middle">0.8%</td>
      <td className="p-2 align-middle">2%</td>
      <td className="p-2 align-middle">12.5%</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Maximum base fee decrease (per block)</td>
      <td className="p-2 align-middle">0.4%</td>
      <td className="p-2 align-middle">0.4%</td>
      <td className="p-2 align-middle">12.5%</td>
    </tr>
  </tbody>
</table>

For more information check out the [OP Stack docs](https://docs.optimism.io/stack/getting-started).


# Transaction Fees
Source: https://docs.world.org/world-chain/developers/fees



Every World Chain transaction consists of two costs: an L2 (execution) fee and an L1 (security) fee. The L2 fee is the cost to execute your transaction on the L2, while the L1 fee covers the estimated cost of publishing the transaction on the L1. Typically, the L1 security fee is higher than the L2 execution fee.

The L1 fee fluctuates depending on the volume of transactions on the L1. If your transaction timing is flexible, you can save on costs by submitting during periods of lower gas fees on the L1 (for example, weekends) or using products like [GasHawk](https://gashawk.io/) which schedule transactions during periods of low demand.

Similarly, the L2 fee can vary based on the number of transactions submitted to the L2. This dynamic adjustment works similarly to the L1; you can learn more about it [here](https://blog.thirdweb.com/eip-1559-ethereum-gas-fees/).

For additional details about fee calculation on World Chain, please refer to the relevant [op-stack developer documentation](https://docs.optimism.io/stack/transactions/fees).


# Grants Program
Source: https://docs.world.org/world-chain/developers/grants



The [Worldcoin Foundation](https://worldcoin.foundation) runs the [Human Collective Grants](https://world.org/community-grants) program
which gives grants to builders that help accelerate the [Worldcoin Tech Tree](https://world.org/tech-tree) and [related RFPs](https://world.org/rfp).
The grants program switched from a quarterly waves format to a continuous format where builders can apply for a grant at any point in time. For more information
you can read the [Continuous Grants program announcement blogpost](https://world.org/blog/announcements/worldcoin-foundation-introduces-new-continuous-grants-program-spur-innovation).

## Areas of interest for applications

* Rustification of the [OP Stack](https://docs.optimism.io/stack/getting-started)
* Futhering [the gigagas roadmap](https://www.google.com/url?q=https://www.paradigm.xyz/2024/04/reth-perf\&sa=D\&source=editors\&ust=1726507097184499\&usg=AOvVaw34fUyrLcoigheJlrfbIDM2)
* ZK-ifying the OP Stack (efforts like [OP Succinct](https://blog.succinct.xyz/op-succinct/), [Zeth from Risc0](https://risczero.com/blog/zeth-release) and [Mina's ZK fault proof RFP]())
* Scalability research and engineering (can be Ethereum core as well)
* Embedding priority blockspace for humans into the OP Stack derivation pipeline + fault proof program (open R\&D)
* Separate eip1559 fee market for humans on OP Stack
* L2 Execution client development (especially [reth](https://github.com/paradigmxyz/reth)) and benchmarking
* Improving UX and interoperability
* Chain-level experiments with digital identity and the OP Stack (things like [human priority blockspace](/world-chain/quick-start/features#priority-blockspace-for-humans) and [free gas allowances](/world-chain/quick-start/features#gas-allowance-for-humans) for unique humans)
* Interesting applications on World Chain (past examples include proof aggregators like [Nebra](https://nebra.one/), storage proofs like [Herodotus](https://herodotus.dev/) and [Axiom](https://www.axiom.xyz/), Passkeys module for Safe, and others)
* and more...

### If you are interested [apply here](https://airtable.com/appftNMpv819abvTc/pag0uKCtjQAPJgaEB/form) or send us an email to [grants@worldcoin.org](mailto:grants@worldcoin.org)!


# Deploy a World ID Template App
Source: https://docs.world.org/world-chain/developers/template



In this tutorial we are going to deploy a [World ID template app](https://github.com/worldcoin/world-id-onchain-template) on a World Chain Sepolia local fork using anvil.
This app will be a simple web application that allows users to create a World ID proof of personhood and verify it.
The app will be deployed on World Chain Sepolia and will interact with the `WorldIDRouter` smart contract
to verify the ZK proofs of personhood.

## Prerequisites

Before we start, make sure you have the following tools installed:

* [Git](https://git-scm.com/) (usually pre-installed on most systems)
* [Node.js](https://nodejs.org/en/)
* [pnpm](https://yarnpkg.com/) (or equivalent like npm, yarn or bun)
* [Foundry CLI](https://book.getfoundry.sh/)

## Clone template

First, clone the World ID template app repository from GitHub:

```bash
git clone https://github.com/worldcoin/world-id-onchain-template.git && cd world-id-onchain-template
```

## Install dependencies

Next, install the dependencies for the World ID template app:

```bash
pnpm install
```

## Build the smart contracts

Next we are going to compile the smart contracts for the World ID template app:

```bash
cd contracts && forge build
```

## Understanding World ID

Before we deploy the World ID template app, let's take a look at the smart contracts that are part of the app:

<CodeGroup>
  ```solidity contracts/src/Contract.sol
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.13;

  import { ByteHasher } from "./helpers/ByteHasher.sol";
  import { IWorldID } from "./interfaces/IWorldID.sol";

  contract Contract {
  using ByteHasher for bytes;

      ///////////////////////////////////////////////////////////////////////////////
      ///                                  ERRORS                                ///
      //////////////////////////////////////////////////////////////////////////////

      /// @notice Thrown when attempting to reuse a nullifier
      error DuplicateNullifier(uint256 nullifierHash);

      /// @dev The World ID instance that will be used for verifying proofs
      IWorldID internal immutable worldId;

      /// @dev The contract's external nullifier hash
      uint256 internal immutable externalNullifier;

      /// @dev The World ID group ID (always 1)
      uint256 internal immutable groupId = 1;

      /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
      mapping(uint256 => bool) internal nullifierHashes;

      /// @param nullifierHash The nullifier hash for the verified proof
      /// @dev A placeholder event that is emitted when a user successfully verifies with World ID
      event Verified(uint256 nullifierHash);

      /// @param _worldId The WorldID router that will verify the proofs
      /// @param _appId The World ID app ID
      /// @param _actionId The World ID action ID
      constructor(IWorldID _worldId, string memory _appId, string memory _actionId) {
      	worldId = _worldId;
      	externalNullifier = abi.encodePacked(abi.encodePacked(_appId).hashToField(), _actionId).hashToField();
      }

      /// @param signal An arbitrary input from the user, usually the user's wallet address (check README for further details)
      /// @param root The root of the Merkle tree (returned by the JS widget).
      /// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget).
      /// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the JS widget).
      /// @dev Feel free to rename this method however you want! We've used `claim`, `verify` or `execute` in the past.
      function verifyAndExecute(address signal, uint256 root, uint256 nullifierHash, uint256[8] calldata proof) public {
      	// First, we make sure this person hasn't done this before
      	if (nullifierHashes[nullifierHash]) revert DuplicateNullifier(nullifierHash);

      	// We now verify the provided proof is valid and the user is verified by World ID
      	worldId.verifyProof(
      		root,
      		groupId,
      		abi.encodePacked(signal).hashToField(),
      		nullifierHash,
      		externalNullifier,
      		proof
      	);

      	// We now record that the user has done this, so they can't do it again (proof of uniqueness)
      	nullifierHashes[nullifierHash] = true;

      	// Finally, execute your logic here, for example issue a token, NFT, etc...
      	// Make sure to emit some kind of event afterwards!

      	emit Verified(nullifierHash);
      }

  }

  ```
</CodeGroup>

This contract has all the necessary pieces that any app that wants to integrate World ID proofs of personhood will require.
The World ID docs have a [detailed explanation](https://docs.worldcoin.org/world-id) of how the World ID system works and how to integrate it into your app.
But we will go over the main parts of the contract here:

1. The `Contract` contract is the main contract that will be deployed to World Chain Sepolia. It has a constructor that
   takes the `IWorldID` interface, the app ID and the action ID as parameters. The `IWorldID` interface is the World ID router
   that will verify the proofs, the app ID is the ID of the app can be created by the developer using the
   [World ID Developer Portal](https://developer.worldcoin.org/login) and that the action ID is the ID of the action that the user
   is performing which will be generated automatically by the [IDKit SDK](https://docs.worldcoin.org/reference/idkit) and derived
   from `action` string defined in the Developer Portal.
2. The [`nullifierHashes` mapping](https://docs.worldcoin.org/reference/contracts#sybil-resistance) is used to keep track of
   the nullifier hashes that have been used already. This is used to guarantee that an action is only performed once by a single
   person in order to achieve sybil resistance.
3. The `verifyAndExecute` function is the main function that will be called by the user to verify their proof of personhood.
   It takes the user's wallet address, the root of the Merkle tree, the nullifier hash, and the proof as parameters.
4. The function first checks if the nullifier hash has been used already and reverts if it has.
5. It then verifies the proof using the `worldId.verifyProof` function which is part of the `IWorldID` interface.
6. If the proof is valid, the function records the nullifier hash and executes the logic of the app. In this case, it emits
   the `Verified` event.

If you want an example of a production application which uses the World ID protocol, you can check out the
[Worldcoin grants contracts](https://github.com/worldcoin/worldcoin-grants-contracts).
Specifically, the [`RecurringGrantDrop.sol`](https://github.com/worldcoin/worldcoin-grants-contracts/blob/main/src/RecurringGrantDrop.sol)
contract which uses the World ID protocol to verify that the user is a unique human before they can claim a grant.

## Deploy template app

First, you have to go to a node provider that supports World Chain Sepolia. You can use [Alchemy](https://www.alchemy.com/)
or any of the other providers listed in the [World Chain documentation](/world-chain/providers/nodes). Once you have a node provider
account, you need to get an RPC URL for the World Chain Sepolia network. For a simple deployment, the public RPC URL is sufficient.
However, for doing a fork deployment, you will need to run a local fork of World Chain Sepolia using anvil which requires higher
requirements on the RPC provider for forking the network.

First, we will fork the World Chain Sepolia network using anvil:

```bash
# Substitute the RPC_URL with the RPC URL of the World Chain Sepolia network
anvil -f $RPC_URL
```

We also need to set three important environment variables that are required for the deployment of the World ID template app:

* `WORLD_ID_ROUTER`: The address of the World ID router contract that will verify the proofs (can be found in the [World ID documentation](https://docs.worldcoin.org/world-chain/reference/useful-contracts))
* `NEXT_PUBLIC_APP_ID`: The app ID that was generated in the [Developer Portal](https://developer.worldcoin.org/login)
* `NEXT_PUBLIC_ACTION`: The action ID as configured in the [Developer Portal](https://developer.worldcoin.org/login)

Once the fork is running, you can deploy the World ID template app to the World Chain Sepolia network using the Foundry CLI:

```bash
# cd into the contracts directory
cd contracts
forge create --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/Contract.sol:Contract --constructor-args $WORLD_ID_ROUTER $NEXT_PUBLIC_APP_ID $NEXT_PUBLIC_ACTION
```

This command will deploy the `Contract` contract to the World Chain Sepolia network using the provided RPC URL and private key.

## Local Web Setup

Set up your environment variables in the `.env` file. You will need to set the following variables:

* `NEXT_PUBLIC_APP_ID`: The app ID as configured in the [Worldcoin Developer Portal](https://developer.worldcoin.org).
* `NEXT_PUBLIC_ACTION`: The action ID as configured in the Worldcoin Developer Portal.
* `NEXT_PUBLIC_WALLETCONNECT_ID`: Your WalletConnect ID.
* `NEXT_PUBLIC_CONTRACT_ADDRESS`: The address of the contract deployed in the previous step.

Back in the root directory of the World ID template app, you can start the local web server:

```bash
pnpm dev
```

The Contract ABI will be automatically re-generated and saved to `src/abi/ContractAbi.json` on each run of `pnpm dev`.

## Iterating

After making changes to the contract, you should:

* re-run the `forge create` command from above
* replace the `NEXT_PUBLIC_CONTRACT_ADDRESS` environment variable with the new contract address
* if your contract ABI has changed, restart the local web server

## Testing

You'll need to import the private keys on the local testnet into your wallet used for local development. The default development seed phrase is `test test test test test test test test test test test junk`.

<Note>
  This is only for local development. Do not use this seed phrase on mainnet or
  any public testnet.
</Note>

When connecting your wallet to the local development environment, you will be prompted to add the network to your wallet.

Use the [Worldcoin Simulator](https://simulator.worldcoin.org) in place of World App to scan the IDKit QR codes and generate the zero-knowledge proofs.

## Further resources

If you want to learn more about the World ID protocol, you can check out the [World ID documentation](/world-id). If you want to build an application
that uses World ID and targets existing World App users, check out [miniapps](/mini-apps)!


# World Chain Contracts
Source: https://docs.world.org/world-chain/developers/world-chain-contracts



## World Chain Mainnet

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Name</th>
      <th className="p-2 text-left align-middle">Address</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">L2ToL1MessagePasser</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000016`](https://worldscan.org/address/0x4200000000000000000000000000000000000016)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">L2CrossDomainMessenger</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000007`](https://worldscan.org/address/0x4200000000000000000000000000000000000007)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">L2StandardBridge</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000010`](https://worldscan.org/address/0x4200000000000000000000000000000000000010)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">L2ERC721Bridge</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000014`](https://worldscan.org/address/0x4200000000000000000000000000000000000014)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">SequencerFeeVault</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000011`](https://worldscan.org/address/0x4200000000000000000000000000000000000011)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">OptimismMintableERC20Factory</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000012`](https://worldscan.org/address/0x4200000000000000000000000000000000000012)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">OptimismMintableERC721Factory</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000017`](https://worldscan.org/address/0x4200000000000000000000000000000000000017)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">L1Block</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000015`](https://worldscan.org/address/0x4200000000000000000000000000000000000015)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">GasPriceOracle</td>
      <td className="p-2 align-middle">[`0x420000000000000000000000000000000000000F`](https://worldscan.org/address/0x420000000000000000000000000000000000000F)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">ProxyAdmin</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000018`](https://worldscan.org/address/0x4200000000000000000000000000000000000018)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">BaseFeeVault</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000019`](https://worldscan.org/address/0x4200000000000000000000000000000000000019)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">L1FeeVault</td>
      <td className="p-2 align-middle">[`0x420000000000000000000000000000000000001A`](https://worldscan.org/address/0x420000000000000000000000000000000000001A)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">GovernanceToken</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000042`](https://worldscan.org/address/0x4200000000000000000000000000000000000042)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">SchemaRegistry</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000020`](https://worldscan.org/address/0x4200000000000000000000000000000000000020)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">EAS</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000021`](https://worldscan.org/address/0x4200000000000000000000000000000000000021)</td>
    </tr>
  </tbody>
</table>

## Ethereum Mainnet

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Name</th>
      <th className="p-2 text-left align-middle">Address</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">AnchorStateRegistryProxy</td>
      <td className="p-2 align-middle">[`0xD4D7A57DCC563756DeD99e224E144A6Bf0327099`](https://etherscan.io/address/0xD4D7A57DCC563756DeD99e224E144A6Bf0327099)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Batch Submitter</td>
      <td className="p-2 align-middle">[`0xdBBE3D8c2d2b22A2611c5A94A9a12C2fCD49Eb29`](https://etherscan.io/address/0xdBBE3D8c2d2b22A2611c5A94A9a12C2fCD49Eb29)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Challenger</td>
      <td className="p-2 align-middle">[`0xA4fB12D15Eb85dc9284a7df0AdBC8B696EdbbF1d`](https://etherscan.io/address/0xA4fB12D15Eb85dc9284a7df0AdBC8B696EdbbF1d)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">DelayedWETHProxy</td>
      <td className="p-2 align-middle">[`0xF9adF7c9502C5C60352C20a4d22683422DbD061F`](https://etherscan.io/address/0xF9adF7c9502C5C60352C20a4d22683422DbD061F)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">DisputeGameFactoryProxy</td>
      <td className="p-2 align-middle">[`0x069c4c579671f8c120b1327a73217D01Ea2EC5ea`](https://etherscan.io/address/0x069c4c579671f8c120b1327a73217D01Ea2EC5ea)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">L1CrossDomainMessengerProxy</td>
      <td className="p-2 align-middle">[`0xf931a81D18B1766d15695ffc7c1920a62b7e710a`](https://etherscan.io/address/0xf931a81D18B1766d15695ffc7c1920a62b7e710a)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">L1ERC721BridgeProxy</td>
      <td className="p-2 align-middle">[`0x1Df436AfDb2fBB40F1fE8bEd4Fc89A0D0990a8E9`](https://etherscan.io/address/0x1Df436AfDb2fBB40F1fE8bEd4Fc89A0D0990a8E9)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">L1StandardBridgeProxy</td>
      <td className="p-2 align-middle">[`0x470458C91978D2d929704489Ad730DC3E3001113`](https://etherscan.io/address/0x470458C91978D2d929704489Ad730DC3E3001113)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">L2OutputOracleProxy</td>
      <td className="p-2 align-middle">[`0x19A6d1E9034596196295CF148509796978343c5D`](https://etherscan.io/address/0x19A6d1E9034596196295CF148509796978343c5D)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">MIPS</td>
      <td className="p-2 align-middle">[`0x16e83cE5Ce29BF90AD9Da06D2fE6a15d5f344ce4`](https://etherscan.io/address/0x16e83cE5Ce29BF90AD9Da06D2fE6a15d5f344ce4)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">OptimismMintableERC20FactoryProxy</td>
      <td className="p-2 align-middle">[`0x82Cb528466cF22412d89bdBE9bCF04856790dD0e`](https://etherscan.io/address/0x82Cb528466cF22412d89bdBE9bCF04856790dD0e)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">OptimismPortalProxy</td>
      <td className="p-2 align-middle">[`0xd5ec14a83B7d95BE1E2Ac12523e2dEE12Cbeea6C`](https://etherscan.io/address/0xd5ec14a83B7d95BE1E2Ac12523e2dEE12Cbeea6C)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">PermissionedDisputeGame</td>
      <td className="p-2 align-middle">[`0x48cf980849a7eEA03180f7dea4E21C112097b03E`](https://etherscan.io/address/0x48cf980849a7eEA03180f7dea4E21C112097b03E)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">PreimageOracle</td>
      <td className="p-2 align-middle">[`0x9c065e11870B891D214Bc2Da7EF1f9DDFA1BE277`](https://etherscan.io/address/0x9c065e11870B891D214Bc2Da7EF1f9DDFA1BE277)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">ProtocolVersionsProxy</td>
      <td className="p-2 align-middle">[`0x8eeF04eef96fef1050702453f75F0Fc4f8F70973`](https://etherscan.io/address/0x8eeF04eef96fef1050702453f75F0Fc4f8F70973)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">ProxyAdmin</td>
      <td className="p-2 align-middle">[`0xd7405BE7f3e63b094Af6C7C23D5eE33Fd82F872D`](https://etherscan.io/address/0xd7405BE7f3e63b094Af6C7C23D5eE33Fd82F872D)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">SafeProxyFactory</td>
      <td className="p-2 align-middle">[`0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2`](https://etherscan.io/address/0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">SuperchainConfigProxy</td>
      <td className="p-2 align-middle">[`0x95703e0982140D16f8ebA6d158FccEde42f04a4C`](https://etherscan.io/address/0x95703e0982140D16f8ebA6d158FccEde42f04a4C)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">SystemConfigProxy</td>
      <td className="p-2 align-middle">[`0x6ab0777fD0e609CE58F939a7F70Fe41F5Aa6300A`](https://etherscan.io/address/0x6ab0777fD0e609CE58F939a7F70Fe41F5Aa6300A)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">OpUSDCBridgeAdapter</td>
      <td className="p-2 align-middle">[`0x153A69e4bb6fEDBbAaF463CB982416316c84B2dB`](https://etherscan.io/address/0x153A69e4bb6fEDBbAaF463CB982416316c84B2dB)</td>
    </tr>
  </tbody>
</table>

## World Chain Sepolia Testnet

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Name</th>
      <th className="p-2 text-left align-middle">Address</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">L2ToL1MessagePasser</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000016`](https://worldchain-sepolia.explorer.alchemy.com/address/0x4200000000000000000000000000000000000016)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">L2CrossDomainMessenger</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000007`](https://worldchain-sepolia.explorer.alchemy.com/address/0x4200000000000000000000000000000000000007)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">L2StandardBridge</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000010`](https://worldchain-sepolia.explorer.alchemy.com/address/0x4200000000000000000000000000000000000010)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">L2ERC721Bridge</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000014`](https://worldchain-sepolia.explorer.alchemy.com/address/0x4200000000000000000000000000000000000014)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">SequencerFeeVault</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000011`](https://worldchain-sepolia.explorer.alchemy.com/address/0x4200000000000000000000000000000000000011)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">OptimismMintableERC20Factory</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000012`](https://worldchain-sepolia.explorer.alchemy.com/address/0x4200000000000000000000000000000000000012)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">OptimismMintableERC721Factory</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000017`](https://worldchain-sepolia.explorer.alchemy.com/address/0x4200000000000000000000000000000000000017)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">L1Block</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000015`](https://worldchain-sepolia.explorer.alchemy.com/address/0x4200000000000000000000000000000000000015)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">GasPriceOracle</td>
      <td className="p-2 align-middle">[`0x420000000000000000000000000000000000000F`](https://worldchain-sepolia.explorer.alchemy.com/address/0x420000000000000000000000000000000000000F)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">ProxyAdmin</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000018`](https://worldchain-sepolia.explorer.alchemy.com/address/0x4200000000000000000000000000000000000018)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">BaseFeeVault</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000019`](https://worldchain-sepolia.explorer.alchemy.com/address/0x4200000000000000000000000000000000000019)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">L1FeeVault</td>
      <td className="p-2 align-middle">[`0x420000000000000000000000000000000000001A`](https://worldchain-sepolia.explorer.alchemy.com/address/0x420000000000000000000000000000000000001A)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">GovernanceToken</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000042`](https://worldchain-sepolia.explorer.alchemy.com/address/0x4200000000000000000000000000000000000042)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">SchemaRegistry</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000020`](https://worldchain-sepolia.explorer.alchemy.com/address/0x4200000000000000000000000000000000000020)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">EAS</td>
      <td className="p-2 align-middle">[`0x4200000000000000000000000000000000000021`](https://worldchain-sepolia.explorer.alchemy.com/address/0x4200000000000000000000000000000000000021)</td>
    </tr>
  </tbody>
</table>

## Ethereum Sepolia Testnet

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Name</th>
      <th className="p-2 text-left align-middle">Address</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">AnchorStateRegistryProxy</td>
      <td className="p-2 align-middle">[`0x1333d5E5201D760444A399E77b3D337eBDB0DD07`](https://sepolia.etherscan.io/address/0x1333d5E5201D760444A399E77b3D337eBDB0DD07)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Batch Submitter</td>
      <td className="p-2 align-middle">[`0x0f3ff4731D7a10B89ED79AD1Fd97844d7F66B96d`](https://sepolia.etherscan.io/address/0x0f3ff4731D7a10B89ED79AD1Fd97844d7F66B96d)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Challenger</td>
      <td className="p-2 align-middle">[`0x945185C01fb641bA3E63a9bdF66575e35a407837`](https://sepolia.etherscan.io/address/0x945185C01fb641bA3E63a9bdF66575e35a407837)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">DelayedWETHProxy</td>
      <td className="p-2 align-middle">[`0x4F4B8Adf1af4b61bb62F68b7aF1c37f8A6311663`](https://sepolia.etherscan.io/address/0x4F4B8Adf1af4b61bb62F68b7aF1c37f8A6311663)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">DisputeGameFactoryProxy</td>
      <td className="p-2 align-middle">[`0x8Ec1111f67Dad6b6A93B3F42DfBC92D81c98449A`](https://sepolia.etherscan.io/address/0x8Ec1111f67Dad6b6A93B3F42DfBC92D81c98449A)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">L1CrossDomainMessengerProxy</td>
      <td className="p-2 align-middle">[`0x7768c821200554d8F359A8902905Ba9eDe5659a9`](https://sepolia.etherscan.io/address/0x7768c821200554d8F359A8902905Ba9eDe5659a9)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">L1ERC721BridgeProxy</td>
      <td className="p-2 align-middle">[`0x3580505c56f8560E3777E92Fb27f70fD20c5B493`](https://sepolia.etherscan.io/address/0x3580505c56f8560E3777E92Fb27f70fD20c5B493)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">L1StandardBridgeProxy</td>
      <td className="p-2 align-middle">[`0xd7DF54b3989855eb66497301a4aAEc33Dbb3F8DE`](https://sepolia.etherscan.io/address/0xd7DF54b3989855eb66497301a4aAEc33Dbb3F8DE)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">L2OutputOracleProxy</td>
      <td className="p-2 align-middle">[`0xc8886f8BAb6Eaeb215aDB5f1c686BF699248300e`](https://sepolia.etherscan.io/address/0xc8886f8BAb6Eaeb215aDB5f1c686BF699248300e)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">MIPS</td>
      <td className="p-2 align-middle">[`0x69470D6970Cd2A006b84B1d4d70179c892cFCE01`](https://sepolia.etherscan.io/address/0x69470D6970Cd2A006b84B1d4d70179c892cFCE01)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">OptimismMintableERC20FactoryProxy</td>
      <td className="p-2 align-middle">[`0x2D272eF54Ee8EF5c2Ff3523559186580b158cd57`](https://sepolia.etherscan.io/address/0x2D272eF54Ee8EF5c2Ff3523559186580b158cd57)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">OptimismPortalProxy</td>
      <td className="p-2 align-middle">[`0xFf6EBa109271fe6d4237EeeD4bAb1dD9A77dD1A4`](https://sepolia.etherscan.io/address/0xFf6EBa109271fe6d4237EeeD4bAb1dD9A77dD1A4)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">PermissionedDisputeGame</td>
      <td className="p-2 align-middle">[`0x552334Bf0B124bD89BFF744f33Ca7e49d44a80Ac`](https://sepolia.etherscan.io/address/0x552334Bf0B124bD89BFF744f33Ca7e49d44a80Ac)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">PreimageOracle</td>
      <td className="p-2 align-middle">[`0x92240135b46fc1142dA181f550aE8f595B858854`](https://sepolia.etherscan.io/address/0x92240135b46fc1142dA181f550aE8f595B858854)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">ProtocolVersionsProxy</td>
      <td className="p-2 align-middle">[`0x01DBC9aBe8e59f021d47Cf79143DE830820CbA29`](https://sepolia.etherscan.io/address/0x01DBC9aBe8e59f021d47Cf79143DE830820CbA29)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">ProxyAdmin</td>
      <td className="p-2 align-middle">[`0x3a987FE1cb587B0A1808cf9bB7Cbe0E341838319`](https://sepolia.etherscan.io/address/0x3a987FE1cb587B0A1808cf9bB7Cbe0E341838319)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">SafeProxyFactory</td>
      <td className="p-2 align-middle">[`0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2`](https://sepolia.etherscan.io/address/0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">SuperchainConfigProxy</td>
      <td className="p-2 align-middle">[`0xC2Be75506d5724086DEB7245bd260Cc9753911Be`](https://sepolia.etherscan.io/address/0xC2Be75506d5724086DEB7245bd260Cc9753911Be)</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">SystemConfigProxy</td>
      <td className="p-2 align-middle">[`0x166F9406e79A656f12F05247fb8F5DfA6155bCBF`](https://sepolia.etherscan.io/address/0x166F9406e79A656f12F05247fb8F5DfA6155bCBF)</td>
    </tr>
  </tbody>
</table>


# World Chain Overview
Source: https://docs.world.org/world-chain/index



<img src="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/worldchain-cover.png?fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=78190b9849b84f5e5fa002b7c7a82525" alt="World Chain" data-og-width="1600" width="1600" data-og-height="899" height="899" data-path="images/docs/worldchain-cover.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/worldchain-cover.png?w=280&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=757621b41ac94ff8138a1ddd68b06fdd 280w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/worldchain-cover.png?w=560&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=941710023d0b5508fdc3cb9369eabc07 560w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/worldchain-cover.png?w=840&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=d9c379d49860b0d71fc83551ca0a9cd4 840w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/worldchain-cover.png?w=1100&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=5531ed4ebae0b21ca80a6bf85239bf27 1100w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/worldchain-cover.png?w=1650&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=bce3021ef26b9c03f7d3bafbe5ffd2b1 1650w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/docs/worldchain-cover.png?w=2500&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=17de4cf482c2c1717ddce29efe1d94b6 2500w" />

World Chain is a blockchain for humans. World chain offers several unique primitives:

* Free gas fees for all verified humans
* Native mobile distribution to all World App users through [mini-apps](/mini-apps)
* Simplified crypto transactions [through mini apps](/mini-apps/commands/verify)
* Sybil resistance for developers via [World ID](/world-id)
* Airdrop of WLD tokens to all verified humans

These primitives enable World Chain builders to build never before possible applications and reach a global audience.

World Chain is built on the [Superchain](https://docs.optimism.io/superchain/superchain-explainer).

To learn more about what is World Chain, watch our presentation from the [A New World](https://www.youtube.com/watch?v=_RWvsCZ17x8\&ab_channel=World) event: <br />
[A New World: World Chain and Priority Blockspace for Humans ft. Liam Horne](https://www.youtube.com/watch?v=NSxyKsSwjsc\&ab_channel=World) on our [YouTube channel](https://www.youtube.com/@worldnetworkofficial).

<Note>
  Is anything missing in the documentation? Please reach out on our [Telegram
  for World Chain developers](https://t.me/worldcoindevelopers)
</Note>


# Bridges
Source: https://docs.world.org/world-chain/providers/bridges



## Superchain Bridges

The Superchain bridge is the native bridge for World Chain as it comes with the OP Stack smart contracts which power the network. There are several interface providers for this bridge and it allows users to bridge assets from Ethereum mainnet and onto World Chain and vice versa.

### Superbridge Core

[Superbridge.app](https://superbridge.app/world-chain) is a blockchain bridging platform that enables users to transfer Ethereum (ETH) and ERC20 tokens between different blockchain networks, primarily focusing on OP Stack Layer 2 rollups chains including the World Chain network.

### Alchemy Bridge

The [native bridge interface for World Chain mainnet](https://worldchain-mainnet.bridge.alchemy.com/) provided by [Alchemy](https://alchemy.com/) is the rollup as a service (RaaS) provider for World Chain. As part of this service it also provides a World Chain bridge interface for users to deposit to and withdraw assets from the network. There is also a [testnet bridge](https://worldchain-sepolia.bridge.alchemy.com/) available for developers and users to bridge assets to the World Chain Sepolia testnet.

## Third-party bridges

<Note>
  Across is the recommended provider for bridging WLD between World Chain and other networks.
</Note>

### Across

[Across](https://app.across.to/bridge?) is an intent-based cross-chain bridging protocol that allows users to transfer tokens between different blockchain networks, particularly focusing on Layer 2 solutions and Ethereum-compatible chains.

### Brid.gg

[Brid.gg](https://brid.gg/) facilitates cross-chain transactions and aims to improve interoperability between different blockchain networks. It primarily connects Ethereum Mainnet to OP Chains including World Chain, allowing for transfers of digital assets across various blockchains.

### Superbridge fast

[Superbridge Fast](https://superbridge.app/fast) is a service offered by Superbridge that allows users to deposit and withdraw assets to and from World Chain quickly using third party bridges like [Synapse](/world-chain/providers/bridges#synapse), [Across](/world-chain/providers/bridges#across), and [Hyperlane](/world-chain/providers/bridges#hyperlane) which are directly integrated with the Superchain bridge interface. This is the fastest way to bridge assets to and from World Chain.
The next best method is to use the native Superchain bridge for which both Alchemy and Superbridge Core provide interfaces.

### Synapse

[Synapse](https://synapseprotocol.com/) is a cross-chain communication protocol that enables seamless asset transfers and messaging across different blockchain networks. It provides a secure and efficient infrastructure for interoperability, allowing users to move tokens and data between various chains without the need for centralized intermediaries.

### Hyperlane

[Hyperlane](https://hyperlane.xyz/) is an innovative interoperability protocol designed to facilitate seamless cross-chain communication and enable the development of interchain applications.

Hyperlane provides permissionless infrastructure for sending arbitrary data between blockchains, allowing developers to create applications that can be accessed from any connected chain.
It supports general asset transfers and custom cross-chain messaging, enabling users to interact with assets and applications across different networks including World Chain.

### LayerZero

[LayerZero](https://layerzero.network/) is an omnichain interoperability protocol that enables seamless communication between different blockchains.

### Chainlink CCIP

[Chainlink CCIP](https://chain.link/cross-chain) is a blockchain interoperability protocol that enables developers to build secure applications that can transfer tokens, messages (data), or both tokens and messages across chains.
You can see World Chain-specific documentation for CCIP [here](https://docs.chain.link/ccip/directory/mainnet/chain/ethereum-mainnet-worldchain-1).

### Thirdweb Universal Bridge

Thirdweb's [Universal Bridge](https://portal.thirdweb.com/connect/pay/overview) is a comprehensive Web3 payment solution that allows your users to onramp, bridge, and swap on any EVM chain — with any EVM token or fiat — thanks to its automatic cross-chain routing.

## Liquidity Layers

### Cortex Protocol

[Cortex Protocol](https://cortexprotocol.com/) is a decentralized, non-custodial liquidity protocol built on Ethereum that enables users to lend and borrow crypto assets. The protocol is designed to provide a secure and efficient platform for decentralized finance (DeFi) activities.


# Data Indexing and Analytics
Source: https://docs.world.org/world-chain/providers/data



Data indexing solutions and other APIs streamline access to blockchain data, enabling efficient querying and real-time analysis of on-chain events. This is crucial for decentralized applications built on World Chain, as it reduces the cost of processing, and presenting data. APIs also facilitate
third-party integration, enhancing developer experiences and expanding the ecosystem with more accessible, decentralized apps (dApps) and services.

## Allium

[Allium](https://allium.so/) is an enterprise blockchain data platform designed to provide accurate, fast, and simple access to blockchain data across over 70 blockchains and more than 1,000 enriched schemas. It offers tools for developers and analysts to build real-time applications and perform cross-chain data exploration with low-latency APIs and customizable workflows.

Allium features:

* Low-Latency APIs
* Data Freshness
* Real-Time Data Streams
* Decoded logs and traces

### Supported networks

* World Chain

## Dune

[Dune Analytics](https://dune.com/) is a blockchain data platform that enables users to query, visualize, and share insights from on-chain data.
It provides a powerful interface for querying blockchain information using SQL-like queries, allowing users
to create custom dashboards and visualizations.

Dune's enhanced data accessibility and insights will give developers and non-developers on World Chain the
ability to:

* Explore metrics related to real humans interacting on the chain
* Track the performance of DeFi protocols and DEXes
* Explore onchain data of any public blockchain project

With Dune's comprehensive dataset and web-based app, anyone (with a little SQL knowledge) may quickly query World Chain data and create insightful dashboards.

For more data on [World](https://world.org/) and [World Chain](https://world.org/world-chain), visit the World Data Dashboards on Dune:

* [World Chain](https://dune.com/blockchains/worldchain)
* [World](https://dune.com/world/world)

### Supported networks

* World Chain

## Zerion API

[The Zerion API](https://zerion.io/api) can be used to build feature-rich web3 apps, wallets, and protocols with ease.
Across all major blockchains, you can access wallets, assets, and chain data for web3 portfolios.

### Supported networks

* World Chain

## GoldSky Subgraphs

GoldSky Subgraphs is a data indexing service designed to simplify querying blockchain data. It provides developers with scalable, customizable subgraphs for
efficiently indexing and retrieving on-chain data from various blockchain networks. GoldSky streamlines data access for decentralized applications (dApps),
offering a user-friendly interface and advanced APIs that help developers query blockchain data faster and more accurately.

### Supported networks

* World Chain

## Alchemy Subgraphs

[Alchemy Subgraphs](https://docs.alchemy.com/reference/subgraphs-quickstart) provide fast, reliable blockchain indexing and community APIs.

### Supported networks

* World Chain
* World Chain Sepolia

## QuickNode

Build real-time data processing pipelines with QuickNode Streams. Get instant access to World Chain data feeds with custom webhooks, filtering, and automatic retries. Backfill historical blockchain data in minutes with our ETL tools. Perfect for indexers, analytics platforms, and data-intensive applications.

### Supported Resources

* [Streams](https://www.quicknode.com/streams)
* [Backfills](https://www.quicknode.com/streams/backfills)

### Supported networks

* World Chain
* World Chain Sepolia

## Noves

[Noves](https://www.noves.fi/) provides easy-to-use APIs for a variety of data on World Chain. You can find documentation for Noves APIs [here](https://docs.noves.fi/reference/api-overview).

### Supported networks

* World Chain
* World Chain Sepolia


# Developer Tooling
Source: https://docs.world.org/world-chain/providers/developer-tooling



## Alchemy

Alchemy provides a suite of data tools to make it easy to build on World Chain:

* [APIs](https://docs.alchemy.com/reference/token-api-quickstart) provide out-of-the-box solutions to retrieve fungible token balances, metadata, and historical transaction activity.
* [Webhooks](https://docs.alchemy.com/reference/notify-api-quickstart) allow you to configure real-time push notifications for on-chain activity.
* [Subgraphs](https://docs.alchemy.com/reference/subgraphs-quickstart) provide fast, reliable blockchain indexing and community APIs.
* [Account Kit](https://accountkit.alchemy.com/) provides smart wallets to grow your app. Securely onboard and activate users with no seed phrase or gas fees with easy-to-use, enterprise-grade wallets.

### Supported networks

* World Chain
* World Chain Sepolia

## Blocknative

[Blocknative's Gas Price API](https://docs.blocknative.com/gas-prediction/gas-platform) predicts next-block gas prices.

### Supported networks

* World Chain

## QuickNode

Access comprehensive developer tools built for World Chain:

* [RPC API](https://www.quicknode.com/core-api)
* [Streams](https://www.quicknode.com/streams)
* [Functions](https://www.quicknode.com/functions)
* [Dedicated Clusters](https://www.quicknode.com/clusters)
* [Rollup Deployer](https://www.quicknode.com/rollup)

Each tool is designed for production-grade applications with enterprise-level support and documentation.

### Supported networks

* World Chain
* World Chain Sepolia

## Tenderly

[Tenderly](https://tenderly.co/) is a blockchain development platform that provides tools for building, monitoring,
and managing smart contracts on Ethereum and other EVM-compatible chains.
It offers features like real-time transaction monitoring, debugging, and advanced analytics
to help developers optimize and maintain their decentralized applications (dApps).

### Supported networks

* World Chain
* World Chain Sepolia

## Thirdweb

[Thirdweb](https://thirdweb.com/) is a comprehensive web3 development platform that provides a full-stack, open-source toolkit for building decentralized applications on EVM-compatible chains. It offers frontend SDKs for connecting users to web3, backend APIs for scalable smart contract interactions, and a suite of pre-built, audited smart contracts. Thirdweb's platform simplifies the development process by providing tools for wallet integration, NFT minting, payment processing, and user onboarding, allowing developers to create sophisticated web3 applications with ease across various verticals including gaming, creator platforms, and enterprise solutions.

### Supported networks

* World Chain
* World Chain Sepolia

## Worldscan (Etherscan)

[Worldscan](https://worldscan.org/) (provided by [Etherscan](https://etherscan.io/)) provides several valuable features for developers working with the Ethereum blockchain.
Here are some key developer-focused features offered by Etherscan:

* API access to the World Chain Blockchain explorer
* Smart contract verification
* Smart contract analytics
* Gas Tracking

### Supported networks

* [World Chain](https://worldscan.org/)
* [World Chain Sepolia](https://sepolia.worldscan.org/)


# Block Explorers
Source: https://docs.world.org/world-chain/providers/explorers



## Blockscout

A [Blockscout](https://blockscout.com/) explorer is available for [World Chain](https://worldchain-mainnet.explorer.alchemy.com/) provided by Alchemy.

Blockscout is a comprehensive, open-source blockchain explorer designed for inspecting and analyzing EVM (Ethereum Virtual Machine) based blockchains.

A testnet explorer is also available for [World Chain Sepolia](https://worldchain-sepolia.explorer.alchemy.com/).

## Dora

[Dora](https://www.ondora.xyz/network/worldchain/interactions) is an advanced multi-chain block explorer and unified search engine designed for the evolving blockchain ecosystem.
It offers users the ability to search and interact with data across more than 10 different networks, including World Chain.

It is an innovative blockchain explorer and search engine designed for the multichain and multi-VM world.

## Worldscan (Etherscan)

[Worldscan](https://worldscan.org) (provided by [Etherscan](https://etherscan.io)) is a comprehensive blockchain explorer and analytics platform specifically designed for the World Chain network.
It allows users to search, verify, and analyze transactions, addresses, smart contracts, and tokens on the World Chain blockchain. [World Chain Sepolia](https://sepolia.worldscan.org/) is also supported.

Worldscan provides tools to help you view transaction data and debug smart contracts:

* Search by address, transaction hash, batch, or token
* View, verify, and interact with smart contract source code
* View detailed transaction information
* View L1-to-L2 and L2-to-L1 transactions


# Nodes
Source: https://docs.world.org/world-chain/providers/nodes



## Alchemy

[Alchemy](https://alchemy.com/) is a leading blockchain development platform that provides robust node provisioning services for Web3 applications on World Chain.
Alchemy's node infrastructure services simplify the process of building, deploying, and scaling
blockchain applications by providing developers with access to a network of nodes on an on-demand basis.

For access to a World Chain node, check out the [World Chain Alchemy page](https://www.alchemy.com/world-chain).

### Supported networks

* World Chain
* World Chain Sepolia

## Blast API

Blast API offers standardized blockchain API services for Web3 development, allowing users to generate dedicated endpoints (RPC/WSS/REST) for supported blockchain networks. The platform employs geographically distributed third-party nodes to ensure reliability, low latency, and decentralization.

### Supported networks

* World Chain

## QuickNode

Enterprise-grade infrastructure for World Chain development with global edge delivery. Build with high-performance RPC APIs, real-time data streaming/ETL capabilities, decentralized storage via IPFS, and extensive developer tools through our marketplace. Ideal for teams building production-grade applications on World Chain.

QuickNode offers several benefits for developers building on World Chain, read more [here](https://quicknode.notion.site/QuickNode-Benefits-for-WorldChain-Developers-14b15a82e84c807ba912cc1a6a8a5c4a)!

### Supported networks

* [World Chain](https://www.quicknode.com/chains/worldchain)
* [World Chain Sepolia](https://www.quicknode.com/chains/worldchain)
* [Documentation](https://www.quicknode.com/chains/worldchain)

## Tenderly RPC

[Tenderly](https://tenderly.co/) is a blockchain development platform that provides tools for building, monitoring, and managing smart contracts on Ethereum and other EVM-compatible chains. They also provide node infrastructure services for World Chain.

### Supported networks

* World Chain
* World Chain Sepolia


# Onramps
Source: https://docs.world.org/world-chain/providers/onramps



## Ramp Network

[Ramp Network](https://ramp.network/) is a fintech company that provides a seamless, non-custodial fiat-to-crypto and crypto-to-fiat onramp solution for decentralized applications, wallets, and platforms. It enables users to buy, sell, and trade cryptocurrencies directly through integrated services without leaving the app they are using. Ramp focuses on simplifying the process for users by handling complex regulatory compliance, identity verification (KYC), and liquidity provisioning,
making it easier for businesses to integrate crypto transactions into their services.
Their API is widely used by developers to onboard users into the crypto ecosystem with minimal friction.

## Alfred pay

[Alfred Pay](https://www.alfredpay.io/) is a fintech company focused on bridging the gap between traditional financial systems and digital assets, specifically across Latin America. It offers a fiat-to-crypto and crypto-to-fiat gateway service, enabling users and businesses to easily move between digital currencies and local fiat currencies.

## Moonpay

[MoonPay](https://www.moonpay.com/) is a global fintech platform that simplifies the process of buying and selling cryptocurrencies. It provides a seamless fiat-to-crypto and crypto-to-fiat service, allowing users to purchase digital assets like Bitcoin and Ethereum using traditional payment methods such as credit cards, bank transfers, and mobile payment options. MoonPay also offers APIs and SDKs for developers to integrate crypto transactions into their applications.


# Oracles
Source: https://docs.world.org/world-chain/providers/oracles



Blockchain oracles are essential middleware that allow smart contracts to access external data and systems that exist outside the blockchain. They act as a secure bridge between blockchains and external sources, enabling smart contracts to use data that primarily exists off-chain.

## Api3

[Api3](https://api3.org/) provides 200+ push-based data feeds on World Chain.

You can enable any of Api3's data feeds on World Chain using the [Api3 Market](https://market.api3.org/world). Find the Api3 Market documentation [here](https://docs.api3.org/dapps/integration/).

### Supported networks

* World Chain

## Chainlink Data Streams

[Chainlink Data Streams](https://chain.link/) delivers low-latency market data offchain, which you can verify onchain.

You can find documentation for Chainlink Data Streams Direct [here](https://docs.chain.link/data-streams/streams-direct).

### Supported networks

* World Chain

## Pyth

[Pyth](https://www.pyth.network/) provides 1300+ pull-based price feeds on World Chain.

You can find documentation for Pyth Price Feeds [here](https://docs.pyth.network/price-feeds).

### Supported networks

* World Chain
* World Chain Sepolia

## RedStone

[RedStone](https://www.redstone.finance/)'s Pull Model provides price data for 200+ assets that can be verified on World Chain.

You can find documentation for RedStone's Pull Model [here](https://docs.redstone.finance/docs/dapps/redstone-pull/).

### Supported networks

* World Chain

## WitNet

[WitNet](https://witnet.io/) provides 6 price feeds on World Chain with Wit/Price Feeds, in addition to secure random data with Wit/Randomness and securely retrieving arbitrary data via HTTP from within smart contracts using Wit/Oracle.

Documentation for these products can be found below:

* [Wit/Price Feeds Documentation](https://docs.witnet.io/intro/tutorials/data-feeds-tutorial)
* [Wit/Randomness Documentation](https://docs.witnet.io/intro/tutorials/randomness)
* [Wit/Oracle Documentation](https://docs.witnet.io/intro/tutorials/apis-and-http-get-post)

### Supported networks

* World Chain
* World Chain Sepolia


# Paymasters
Source: https://docs.world.org/world-chain/providers/paymasters



## Alchemy

[Alchemy Paymasters](https://www.alchemy.com/overviews/what-is-a-paymaster) are smart contracts that enable decentralized applications (dApps) to implement flexible gas policies, including:

* Sponsoring gas fees for users
* Accepting gas payments in ERC-20 tokens instead of native blockchain currency

### Supported Networks

* World Chain
* World Chain Sepolia

## Pimlico

[Pimlico](https://pimlico.io/) provides account abstraction infrastructure including [paymasters](https://docs.pimlico.io/infra/paymaster) and [bundlers](https://docs.pimlico.io/infra/bundler). They offer two types of paymasters to abstract away gas fees for users in the ERC-4337 ecosystem.
A verifying paymaster allows developers to sponsor on-chain gas fees for users, it utilizes an off-chain Pimlico balance loaded through a dashboard and an ERC-20 paymaster which is a permissionless on-chain smart contract that enables users to pay gas fees using their ERC-20 tokens and operates without requiring developer intervention.

Pimlico's paymasters can be seamlessly integrated with [permissionless.js](https://docs.pimlico.io/permissionless), a TypeScript library built on [viem](https://github.com/wevm/viem/) for ERC-4337 development .

### Supported Networks

* World Chain
* World Chain Sepolia

## Thirdweb

Not only does [Thirdweb](https://thirdweb.com/) provide developer tools, but they also have [ERC-4337 compliant smart contract accounts](https://portal.thirdweb.com/contracts/build/base-contracts/erc-4337) with role-based permission control. They offer two main types: Simple and Managed smart accounts.

### Supported Networks

* World Chain
* World Chain Sepolia


# World Chain Data Dashboards
Source: https://docs.world.org/world-chain/quick-start/data



Worldcoin has partnered with several [data providers](/world-chain/providers/data) which have indexed World Chain data and serve it to
developers and data analysts through their APIs. As part of our ongoing efforts for transparency and accountability through open-sourcing
our technologies like the orb hardware, orb firmware, biometrics pipeline, World ID protocol and most other components of the Worldcoin ecosystem,
we believe that having open-source data and dashboards that showcase the progress of the Worldcoin project is essential.

You can find all of the main dashboards that track World Chain, World App and Worldcoin metrics in the [World Dune dashboard](https://dune.com/world/world).
If you want to see Dune dashboards that are specific to World Chain, check out [this Dune page](https://dune.com/blockchains/worldchain).

Another very important dashboard is the [L2BEAT World Chain dashboard](https://l2beat.com/scaling/projects/world) which shows all the metrics related to the OP Stack which includes a security,
decentralization and scalability assessment, risk analysis table and a TVL dashboard.


# Unique Features
Source: https://docs.world.org/world-chain/quick-start/features



World Chain is built on the OP Stack and is part of the Superchain, it uses the EVM for execution and Ethereum for data availability and finality.
These are standard properties of all Superchain networks, however, there are several features that make World Chain unique. World Chain is a network
built for unique humans and its features reflect that.

## Priority Blockspace for Humans

While it's open for everyone, World Chain was designed to prioritize anonymously verified human interactions over bots and AI through direct protocol integrations
with [World ID](https://world.org/world-id) for proof-of-human verification. One of the initial protocol integrations being worked on is Priority Blockspace for Humans (PBH).
PBH enables verified users to execute transactions guaranteeing top of block inclusion, enabling a more frictionless user experience.
PBH ensures that ordinary users aren't unfairly disadvantaged by automated systems, greatly mitigates the impact of [MEV](https://ethereum.org/en/developers/docs/mev/) attacks and exploits,
and reduces the need to pay significant gas fees to be included in a block. PBH also enables future flexibility, allowing for a separate EIP-1559-style
market for human transactions.

If you want to learn the details of how Priority Blockspace for Humans will work, please read the [World Blog PBH article](https://world.org/blog/engineering/introducing-pbh-priority-blockspace-for-humans).

If you are interested in PBH, how it works or if you would like to apply for a grant to help contribute to the roadmap, check out the [Human Collective Grants section](/world-chain/developers/grants)
or send us a message to [grants@worldcoin.org](mailto:grants@worldcoin.org).

## Gas Allowance for Humans

Not only do humans get priority inclusion on World Chain through PBH, but they also will have a gas stipend to transact on World Chain for free.
Initially the stipend to fund this gas allowance will be provided by the [World Foundation](https://worldcoin.foundation) with the goal of progressive
decentralization allowing World governance to set it.

There are two main approaches to implement the gas allowance, one option is on the app/wallet level through the use of account abstraction and the other one
is to set it at the OP Stack level through sequencer reimbursements or separate fee markets for unique humans where unique humans are not charged or their fees are paid for
by non-human transactions in the mempool which are executed by the sequencer. The simplest one is to implement a World ID gatekept [EIP4337](https://www.erc4337.io/) [paymaster](https://www.alchemy.com/overviews/what-is-a-paymaster)
where each `userOp` or group of `userOps` per user requires a World ID proof. More details on gas allowance for humans coming soon.


# Funding a Wallet
Source: https://docs.world.org/world-chain/quick-start/fund-wallet

Learn how to fund your wallet on World Chain

<Note>
  Make sure that whatever assets you are bridging to and from World Chain are always supported by your wallet and the exchange you are using.
  Depositing an unsupported asset on an unsupported chain to an unsupported wallet or exchange will result in loss of funds.
</Note>

In order to use World Chain you will need an [EVM-compatible wallet](https://ethereum.org/en/wallets/) such as MetaMask, Rabby, or any other wallet where you can add custom EVM networks.
If you are a user of World App then you can use the built-in wallet to interact with World Chain as well as the existing onramps and offramps which are integrated into the app.
The [Ethereum.org website](https://ethereum.org/en/) has [a great explainer on wallets](https://ethereum.org/en/wallets/) which goes into more detail on how to choose a wallet that is right for you.

## Bridging from Ethereum

If you are coming from Ethereum, you can bridge your assets to World Chain using the bridge interface provided by [Alchemy](https://worldchain-mainnet.bridge.alchemy.com/) which is an interface to the native OP Stack bridge contract that allows you to move assets between Ethereum and World Chain natively.
Since World Chain is an optimistic rollup, built on the [OP Stack](https://docs.optimism.io/stack/getting-started) and part of the [Superchain](https://docs.optimism.io/superchain/superchain-explainer) it takes about 7 days to withdraw from World Chain back to Ethereum through the native bridge as
the OP Stack needs to wait for [the fault proof period](https://docs.optimism.io/stack/fault-proofs/explainer) to expire before the L2 finalizes and the assets can be withdrawn back to Ethereum.

## Superchain interop (coming soon)

If you are coming from another OP Stack L2 which is part of the Superchain, you will soon be able to migrate assets seamlessly between the L2s using the Superchain bridge interface which is currently under development and is estimated to come by end of year.
If you want to learn more you can read the [interoperability explainer in the OP Stack documentation](https://docs.optimism.io/stack/interop/explainer).

## Bridging from another network

There are several other bridges live between different L2s that are provided by multiple third parties that leverage different bridging mechanisms. The World Chain documentation has a [bridge section](/world-chain/providers/bridges) that lists several bridges that support the network.

## Bridging from an exchange or onramp provider

If you are coming from an exchange or [onramp provider](/world-chain/providers/onramps) that supports World Chain and you already have a wallet that supports the network then you can deposit your assets directly to your wallet.


# Getting Started
Source: https://docs.world.org/world-chain/quick-start/index



In order to start using World Chain, you need to add the World Chain network to your wallet of choice. Either by clicking the button below:

<div className="flex gap-4 flex-wrap">
  <a href="https://chainlist.org/chain/480" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-80 text-gray-900 bg-white border border-gray-900 hover:bg-gray-100 rounded-lg font-medium px-4 py-4 text-center no-underline">
    Add World Chain
  </a>

  <a href="https://chainlist.org/chain/4801" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-80 text-gray-900 bg-white border border-gray-900 hover:bg-gray-100 rounded-lg font-medium px-4 py-4 text-center no-underline">
    Add World Chain Sepolia
  </a>
</div>

Or by manually adding the information available in the [World Chain network section below](/world-chain/quick-start/info).


# Network Information
Source: https://docs.world.org/world-chain/quick-start/info

World Chain network configuration and technical details

## World Chain Mainnet

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Property</th>
      <th className="p-2 text-left align-middle">Value</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">Framework</td>

      <td className="p-2 align-middle">
        <a href="https://docs.optimism.io/">OP Stack</a>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Chain ID</td>

      <td className="p-2 align-middle">
        <a href="https://chainlist.org/?search=World+Chain&testnets=false">
          ID480 (<code>0x1e0</code>)
        </a>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">EIP-3770 Short Name</td>

      <td className="p-2 align-middle">
        <code>wc</code>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Settlement layer</td>
      <td className="p-2 align-middle">Ethereum</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Data availability</td>
      <td className="p-2 align-middle">Ethereum</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Gas Limit</td>
      <td className="p-2 align-middle">30M</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Gas Target</td>
      <td className="p-2 align-middle">15M</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Block Time</td>
      <td className="p-2 align-middle">2s</td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Important Links</th>
      <th className="p-2 text-left align-middle">URLs</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">Bridge</td>

      <td className="p-2 align-middle">
        <a href="https://worldchain-mainnet.bridge.alchemy.com">
          worldchain-mainnet.bridge.alchemy.com
        </a>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Block Explorer</td>

      <td className="p-2 align-middle">
        <a href="https://worldscan.org">worldscan.org</a>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Status Page</td>

      <td className="p-2 align-middle">
        <a href="https://worldchain-mainnet-status.alchemy.com">
          worldchain-mainnet-status.alchemy.com
        </a>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">RPC</td>

      <td className="p-2 align-middle">
        <a href="https://worldchain-mainnet.g.alchemy.com/public">
          worldchain-mainnet.g.alchemy.com/public
        </a>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Developer Telegram</td>

      <td className="p-2 align-middle">
        <a href="https://t.me/worldcoindevelopers">@worldcoindevelopers</a>
      </td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Hardfork</th>
      <th className="p-2 text-left align-middle">Timestamp</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">Fjord</td>

      <td className="p-2 align-middle">
        1721826000 (Wed 24 Jul 2024 13:00:00 UTC)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Granite</td>

      <td className="p-2 align-middle">
        1727780400 (Tue 1 Oct 2024 11:00:00 UTC)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Holocene</td>

      <td className="p-2 align-middle">
        1738238400 (Thu 30 Jan 2025 12:00:00 UTC)
      </td>
    </tr>
  </tbody>
</table>

## World Chain Sepolia Testnet

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Property</th>
      <th className="p-2 text-left align-middle">Value</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">Framework</td>

      <td className="p-2 align-middle">
        <a href="https://docs.optimism.io/">OP Stack</a>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Chain ID</td>

      <td className="p-2 align-middle">
        <a href="https://chainlist.org/?search=World+Chain&testnets=true">
          ID4801 (<code>0x12C1</code>)
        </a>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">EIP-3770 Short Name</td>

      <td className="p-2 align-middle">
        <code>wcsep</code>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Settlement layer</td>
      <td className="p-2 align-middle">Ethereum Sepolia</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Data availability</td>
      <td className="p-2 align-middle">Ethereum Sepolia</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Gas Limit</td>
      <td className="p-2 align-middle">30M</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Gas Target</td>
      <td className="p-2 align-middle">15M</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Block Time</td>
      <td className="p-2 align-middle">2s</td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Important Links</th>
      <th className="p-2 text-left align-middle">URLs</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">Bridge</td>

      <td className="p-2 align-middle">
        <a href="https://worldchain-sepolia.bridge.alchemy.com">
          worldchain-sepolia.bridge.alchemy.com
        </a>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Block Explorer</td>

      <td className="p-2 align-middle">
        <a href="https://worldchain-sepolia.explorer.alchemy.com">
          worldchain-sepolia.explorer.alchemy.com
        </a>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Status Page</td>

      <td className="p-2 align-middle">
        <a href="https://worldchain-sepolia-status.alchemy.com">
          worldchain-sepolia-status.alchemy.com
        </a>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Faucet</td>

      <td className="p-2 align-middle">
        <a href="https://www.alchemy.com/faucets/world-chain-sepolia">
          worldchain-sepolia.g.alchemy.com/public
        </a>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">RPC</td>

      <td className="p-2 align-middle">
        <a href="https://worldchain-sepolia.g.alchemy.com/public">
          worldchain-sepolia.g.alchemy.com/public
        </a>
      </td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Hardfork</th>
      <th className="p-2 text-left align-middle">Timestamp</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">Fjord</td>

      <td className="p-2 align-middle">
        1721739600 (Tue 23 Jul 2024 13:00:00 UTC)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Granite</td>

      <td className="p-2 align-middle">
        1726570800 (Tue 17 Sep 2024 11:00:00 UTC)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Holocene</td>

      <td className="p-2 align-middle">
        1737633600 (Thu 23 Jan 2025 12:00:00 UTC)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Pectra Blob Fix</td>

      <td className="p-2 align-middle">
        1742486400 (Thu 20 Mar 2025 16:00:00 UTC)
      </td>
    </tr>
  </tbody>
</table>


# Why World Chain?
Source: https://docs.world.org/world-chain/quick-start/why



The [World App](https://world.org/world-app) has undergone several transitions and it has lived on multiple chains over time.
First it was [Hubble](https://github.com/worldcoin/hubble-commander), an open-source optimismtic rollup with [BLS signature aggregation](https://hackmd.io/@benjaminion/bls12-381) of ERC20 transfers,
then it was [Polygon PoS](https://polygon.technology/polygon-pos), recently [OP mainnet](https://www.optimism.io/) and now [World Chain](https://world.org/world-chain). There were several motivating
factors for all of these changes.

<img src="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/world-chain/onchain-evolution.png?fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=1564767e25ee445e5c0187d17b614d61" alt="Onchain Evolution of World App" data-og-width="1556" width="1556" data-og-height="866" height="866" data-path="images/world-chain/onchain-evolution.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/world-chain/onchain-evolution.png?w=280&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=2a87bcb6195b444a54130d3efbbaf555 280w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/world-chain/onchain-evolution.png?w=560&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=3ad2b932c503b6c0f16c88c86ea4b17d 560w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/world-chain/onchain-evolution.png?w=840&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=1aca9846a37013540eb81aab130be2bc 840w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/world-chain/onchain-evolution.png?w=1100&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=ab12e4e3c85495a28a5396c45e750dbc 1100w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/world-chain/onchain-evolution.png?w=1650&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=109b7503fca141ef3978708708d597da 1650w, https://mintcdn.com/tfh/vNgKkjbn9HQ46Vw7/images/world-chain/onchain-evolution.png?w=2500&fit=max&auto=format&n=vNgKkjbn9HQ46Vw7&q=85&s=8e44daee2151a9f759cd6ef030cd8546 2500w" />

## Onchain evolution

Originally, the main target use case of World App was payments and WLD grants (pre-launch beta version), but as we required other applications such as DeFi and identity,
World App was migrated to Polygon PoS as it provided full EVM programmability and access to tools, infrastructure and applications like
[Safe smart contract wallets](https://world.org/blog/announcements/introducing-world-chain) DEXes and liquidity like [Uniswap](https://app.uniswap.org/),
and plenty of others that directly provided utility to World App, [World ID](https://world.org/world-id), their users and the wider
World ecosystem of applications and integrations. Another big motivating factor is cost, security,
decentralization and ecosystem network effects which were the main motivators behind the switch from Polygon PoS
to OP mainnet.

As the rollup-centric roadmap became the foundation of Ethereum scalability, solutions became adopted enough and reached a
certain point of maturity, it made sense to migrate World App over as it benefits a lot from all of the other
integrations, applications and infrastructure that were and are available on OP mainnet. We migrated over ahead of
our launch on July 24th 2023 and over the upcoming year World App reached a peak of [60% of OP mainnet blockspace consumption](https://dune.com/queries/491942/932394) (over a 30 day period).

As World App starts demanding more and more blockspace in order to support the goal of the largest digital identity and financial network with over a billion unique humans,
it will require further scaling the network it operates under. Which is why World Chain exists, it has pristine blockspace for the World App and the World ID ecosystem of applications. For more details on
World Chain you can read our [Introducing World Chain blogpost](https://world.org/blog/announcements/introducing-world-chain).

World Chain will allow World App, World ID and their ecosystems to scale throughput, increase gas limits, data availability and its overall scalability as the OP Stack improves with better execution clients, higher Ethereum blob counts and sizes (more DA) and plenty
of other technological improvements.

## What is different about World Chain?

The main differentiating properties of World Chain compared to other L2s or other Superchain members are that World Chain is a blockchain made for humans, where the transactions of unique humans have priority and where they also have a free allowance, just for being
a World ID verified unique human using proof of personhood. More on these features in the [Priority Blockspace for Humans and Free Gas Allowance sections](/world-chain/quick-start/features) Compared to other L2s one other very big differentiator is the number of unique users that World App brings with it,
and the possibilities for use cases and applications used by millions of unique humans will bring.

## Further resources

If you want to learn more about World Chain, OP Stack and the Superchain, you can take a look at the resources below:

* [A New World: World Chain and Priority Blockspace for Humans ft. Liam Horne](https://www.youtube.com/watch?v=NSxyKsSwjsc\&ab_channel=World)
* [Encode x World Educate Series: World Chain and the OP Stack](https://www.youtube.com/watch?v=7pt8c5fy-xg\&ab_channel=EncodeClub)
* [OP Mainnet docs](https://docs.optimism.io/app-developers/building-apps)
* [OP Stack docs](https://docs.optimism.io/stack/getting-started)
* [Superchain docs](https://docs.optimism.io/superchain/superchain-explainer)


# How to Set Up a World Chain Node
Source: https://docs.world.org/world-chain/reference/node-setup



Follow this guide to set up your own World Chain node.

## Overview

World Chain mainnet and testnet run on the OP Stack as part of the Superchain. We provide a simple Docker Compose configuration for running World Chain nodes, [simple-worldchain-node](https://github.com/worldcoin-foundation/simple-worldchain-node). If you're interested in building a node from source, see the [documentation from Optimism](https://docs.optimism.io/operators/node-operators/tutorials/node-from-source).

## Using `simple-worldchain-node`

`simple-worldchain-node` supports World Chain Mainnet and Sepolia, full nodes and archive nodes, and two execution clients: [op-geth](https://github.com/ethereum-optimism/op-geth) and [op-reth](https://github.com/paradigmxyz/reth).

<Note>
  World Chain node snapshots for `op-geth` are available from Bware Labs [here](https://bwarelabs.com/snapshots/worldchain).
</Note>

### Installation

First, download [`simple-worldchain-node`](https://github.com/worldcoin-foundation/simple-worldchain-node) and create your `.env` file.

<CodeGroup>
  ```bash Download simple-worldchain-node
  git clone https://github.com/worldcoin-foundation/simple-worldchain-node.git
  cd simple-worldchain-node
  cp .env.example .env
  ```
</CodeGroup>

Ensure you have installed Docker and Docker Compose by following [this guide](https://docs.docker.com/compose/install/#scenario-three-install-the-docker-compose-standalone).

### Configuration

Open your `.env` file in an editor of your choice. The following values must be configured before starting your node.

<ParamField body="NETWORK_NAME" type="worldchain-mainnet | worldchain-sepolia" required>
  Used to select which network the node connects to, either `worldchain-mainnet` or `worldchain-sepolia`.
</ParamField>

<ParamField body="COMPOSE_PROFILES" type="geth | reth" required>
  Used to select your execution client, either `geth` (default) or `reth` (experimental).
</ParamField>

<ParamField body="GETH_NODE_TYPE" type="full | archive" required>
  When using `op-geth`, determines which type of node to run. Either `full` (less storage, but only recent history) or `archive` (more storage, all history).
</ParamField>

<ParamField body="L1_RPC_ENDPOINT" type="URL" required>
  An L1 (Ethereum) RPC endpoint. We recommend using [Alchemy](https://www.alchemy.com/) or [QuickNode](https://www.quicknode.com), but any Ethereum RPC provider or archive node will work.
</ParamField>

<ParamField body="L1_BEACON_RPC_ENDPOINT" type="URL" required>
  An L1 Beacon Archive RPC endpoint. Note that this is not the same as a standard RPC endpoint, as this is used to retrieve Blobs from the Ethereum Beacon Chain. We recommend using [QuickNode](https://www.quicknode.com/).
</ParamField>

<ParamField body="L1_RPC_TYPE" type="string" required>
  Selects which RPC provider is set in `OP_NODE__RPC_ENDPOINT`. This allows for more efficient syncing given different RPC capabilities. Choose from `alchemy`, `quicknode`, `erigon`, or `basic` for other RPC providers.
</ParamField>

For details on optional settings, see the `simple-worldchain-node` [README](https://github.com/worldcoin-foundation/simple-worldchain-node?tab=readme-ov-file#optional-configurations).

### Running your node

To start your node in the background, run the following command from the `simple-worldchain-node` folder:

```bash
docker compose up -d --build
```

To view logs for your node, run the following command:

```bash
docker compose logs -f --tail 10
```

To shut down your node:

```bash
docker compose down
```

### Monitoring your node

A Grafana dashboard is included to monitor your node. Access it by visiting [http://localhost:3000](http://localhost:3000) and logging in with these credentials:

* Username: `admin`
* Password: `worldchain`

### Upgrading your Node

When new versions of `op-geth`, `op-reth`, or `op-node` are released, we will update the `simple-worldchain-node` repository to use these new versions. You can then update your node to use these versions with the following commands:

```bash
git pull
docker compose pull
docker compose up -d --build
```


# Useful Contract Deployments
Source: https://docs.world.org/world-chain/reference/useful-contracts



## Tokens

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Contract</th>

      <th className="p-2 text-left align-middle">
        World Chain Mainnet Address
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">WLD</td>

      <td className="p-2 align-middle">
        [`0x2cfc85d8e48f8eab294be644d9e25c3030863003`](https://worldscan.org/address/0x2cFc85d8E48F8EAB294be644d9E25C3030863003)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">WBTC</td>

      <td className="p-2 align-middle">
        [`0x03c7054bcb39f7b2e5b2c7acb37583e32d70cfa3`](https://worldscan.org/address/0x03c7054bcb39f7b2e5b2c7acb37583e32d70cfa3)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">SDAI</td>

      <td className="p-2 align-middle">
        [`0x859dbe24b90c9f2f7742083d3cf59ca41f55be5d`](https://worldscan.org/address/0x859dbe24b90c9f2f7742083d3cf59ca41f55be5d)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">WETH</td>

      <td className="p-2 align-middle">
        [`0x4200000000000000000000000000000000000006`](https://worldscan.org/address/0x4200000000000000000000000000000000000006)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">USDC</td>

      <td className="p-2 align-middle">
        [`0x79A02482A880bCE3F13e09Da970dC34db4CD24d1`](https://worldscan.org/address/0x79A02482A880bCE3F13e09Da970dC34db4CD24d1)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        L1 OpUSDCBridgeAdapter (Ethereum mainnet)
      </td>

      <td className="p-2 align-middle">
        [`0x153A69e4bb6fEDBbAaF463CB982416316c84B2dB`](https://etherscan.io/address/0x153A69e4bb6fEDBbAaF463CB982416316c84B2dB)
      </td>
    </tr>
  </tbody>
</table>

## World ID

You can find the World ID Address Book for all chains [here](https://docs.world.org/world-id/reference/address-book).

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Contract</th>

      <th className="p-2 text-left align-middle">
        World Chain Mainnet Address
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">WorldIDAddressBook</td>

      <td className="p-2 align-middle">
        [`0x57b930D551e677CC36e2fA036Ae2fe8FdaE0330D`](https://worldscan.org/address/0x57b930D551e677CC36e2fA036Ae2fe8FdaE0330D)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">WorldIDRouter</td>

      <td className="p-2 align-middle">
        [`0x17B354dD2595411ff79041f930e491A4Df39A278`](https://worldscan.org/address/0x17B354dD2595411ff79041f930e491A4Df39A278)
      </td>
    </tr>
  </tbody>
</table>

## Gnosis Safe 1.3.0

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Contract</th>

      <th className="p-2 text-left align-middle">
        World Chain Mainnet Address
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">HelperBatch Contract</td>

      <td className="p-2 align-middle">
        [`0x8d98006269238CAEd033b2d94661B29312AD09b7`](https://worldscan.org/address/0x8d98006269238CAEd033b2d94661B29312AD09b7)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">SafeL2Singleton</td>

      <td className="p-2 align-middle">
        [`0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552`](https://worldscan.org/address/0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">SafeProxyFactory</td>

      <td className="p-2 align-middle">
        [`0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2`](https://worldscan.org/address/0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2)
      </td>
    </tr>
  </tbody>
</table>

## Gnosis Safe 1.4.1

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Contract</th>

      <th className="p-2 text-left align-middle">
        World Chain Mainnet Address
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">HelperBatch Contract</td>

      <td className="p-2 align-middle">
        [`0x866087c23a7eE1fD5498ef84D59aF742f3d4b322`](https://worldscan.org/address/0x866087c23a7eE1fD5498ef84D59aF742f3d4b322)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">SafeL2Singleton</td>

      <td className="p-2 align-middle">
        [`0x29fcB43b46531BcA003ddC8FCB67FFE91900C762`](https://worldscan.org/address/0x29fcB43b46531BcA003ddC8FCB67FFE91900C762)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">SafeProxyFactory</td>

      <td className="p-2 align-middle">
        [`0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67`](https://worldscan.org/address/0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67)
      </td>
    </tr>
  </tbody>
</table>

## Gnosis Modules

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Contract</th>

      <th className="p-2 text-left align-middle">
        World Chain Mainnet Address
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">TimeBasedAllowance Module</td>

      <td className="p-2 align-middle">
        [`0xa9bcF56d9FCc0178414EF27a3d893C9469e437B7`](https://worldscan.org/address/0xa9bcF56d9FCc0178414EF27a3d893C9469e437B7)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">4337 Module</td>

      <td className="p-2 align-middle">
        [`0x75cf11467937ce3F2f357CE24ffc3DBF8fD5c226`](https://worldscan.org/address/0x75cf11467937ce3F2f357CE24ffc3DBF8fD5c226)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">AddModules Helper</td>

      <td className="p-2 align-middle">
        [`0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67`](https://worldscan.org/address/0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67)
      </td>
    </tr>
  </tbody>
</table>

## Uniswap

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Contract</th>

      <th className="p-2 text-left align-middle">
        World Chain Mainnet Address
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">ApprovalSwap</td>

      <td className="p-2 align-middle">
        [`0xf4305dd6256dc2b0d07caaf2953688defbc86e9d`](https://worldscan.org/address/0xf4305dd6256dc2b0d07caaf2953688defbc86e9d)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">v3CoreFactoryAddress</td>

      <td className="p-2 align-middle">
        [`0x7a5028BDa40e7B173C278C5342087826455ea25a`](https://worldscan.org/address/0x7a5028BDa40e7B173C278C5342087826455ea25a)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">AddModules Helper</td>

      <td className="p-2 align-middle">
        [`0x091AD9e2e6e5eD44c1c66dB50e49A601F9f36cF6`](https://worldscan.org/address/0x091AD9e2e6e5eD44c1c66dB50e49A601F9f36cF6)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Multicall2Address</td>

      <td className="p-2 align-middle">
        [`0x0a22c04215c97E3F532F4eF30e0aD9458792dAB9`](https://worldscan.org/address/0x0a22c04215c97E3F532F4eF30e0aD9458792dAB9)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">ProxyAdminAddress</td>

      <td className="p-2 align-middle">
        [`0x8B52DaCB7B5d9A959CDcD5419061c0eDD1296c29`](https://worldscan.org/address/0x8B52DaCB7B5d9A959CDcD5419061c0eDD1296c29)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">TickLensAddress</td>

      <td className="p-2 align-middle">
        [`0xE61df0CaC9d85876aCE5E3037005D80943570623`](https://worldscan.org/address/0xE61df0CaC9d85876aCE5E3037005D80943570623)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">NftDescriptorLibraryAddressV1\_3\_0</td>

      <td className="p-2 align-middle">
        [`0x38c68A1D60C47973EcE5bc1725B65D8Bec438192`](https://worldscan.org/address/0x38c68A1D60C47973EcE5bc1725B65D8Bec438192)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        NonfungibleTokenPositionDescriptorAddressV1\_3\_0
      </td>

      <td className="p-2 align-middle">
        [`0x70410a302c4a5c52C659b780941c947Abd437FeB`](https://worldscan.org/address/0x70410a302c4a5c52C659b780941c947Abd437FeB)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">DescriptorProxyAddress</td>

      <td className="p-2 align-middle">
        [`0xe6FcB4952b2d3Fab6DA4BC165831f5575e093feC`](https://worldscan.org/address/0xe6FcB4952b2d3Fab6DA4BC165831f5575e093feC)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        NonfungibleTokenPositionManagerAddress
      </td>

      <td className="p-2 align-middle">
        [`0xec12a9F9a09f50550686363766Cc153D03c27b5e`](https://worldscan.org/address/0xec12a9F9a09f50550686363766Cc153D03c27b5e)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">V3MigratorAddress</td>

      <td className="p-2 align-middle">
        [`0x9EBDdCBa71C9027E1eB45135672a30bcFEec9de3`](https://worldscan.org/address/0x9EBDdCBa71C9027E1eB45135672a30bcFEec9de3)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">V3StakerAddress</td>

      <td className="p-2 align-middle">
        [`0x053956ab1618EcaCc135Ebc18Fd7564979aD4295`](https://worldscan.org/address/0x053956ab1618EcaCc135Ebc18Fd7564979aD4295)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">QuoterV2Address</td>

      <td className="p-2 align-middle">
        [`0x10158D43e6cc414deE1Bd1eB0EfC6a5cBCfF244c`](https://worldscan.org/address/0x10158D43e6cc414deE1Bd1eB0EfC6a5cBCfF244c)
      </td>
    </tr>
  </tbody>
</table>

## Grants

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Contract</th>

      <th className="p-2 text-left align-middle">
        World Chain Mainnet Address
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">WLDGrant</td>

      <td className="p-2 align-middle">
        [`0x7DD5B6B5A574EFd452AC0cfE3e1B69384a03C6f9`](https://worldscan.org/address/0x7DD5B6B5A574EFd452AC0cfE3e1B69384a03C6f9?tab=contract)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">RecurringGrantDrop</td>

      <td className="p-2 align-middle">
        [`0x2c1Ca1FBbD5f28e5492Cc6bF8C4e8c57354eb162`](https://worldscan.org/address/0x2c1Ca1FBbD5f28e5492Cc6bF8C4e8c57354eb162?tab=contract)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">WLDGrantReservations</td>

      <td className="p-2 align-middle">
        [`0x3a00fe3254c94c4689cb5163c91ee501d942e710`](https://worldscan.org/address/0x3a00fE3254c94C4689CB5163c91Ee501D942E710?tab=contract)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">RecurringGrantDropReservations</td>

      <td className="p-2 align-middle">
        [`0xc2D270651cEF0AA3734c9A7fEaCd3b3B39e36e18`](https://worldscan.org/address/0xc2D270651cEF0AA3734c9A7fEaCd3b3B39e36e18?tab=contract)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Grants4FirstBatch</td>

      <td className="p-2 align-middle">
        [`0xae3f204c75e46c27f66c843bc9f3bbd04a6374c5`](https://worldscan.org/address/0xaE3f204c75E46C27f66C843bC9F3Bbd04a6374c5?tab=contract)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">WLDVault</td>

      <td className="p-2 align-middle">
        [`0x14a028cC500108307947dca4a1Aa35029FB66CE0`](https://worldscan.org/address/0x14a028cC500108307947dca4a1Aa35029FB66CE0?tab=contract)
      </td>
    </tr>
  </tbody>
</table>

## MiniKit

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Contract</th>

      <th className="p-2 text-left align-middle">
        World Chain Mainnet Address
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">MinikitTransfer</td>

      <td className="p-2 align-middle">
        [`0x9CC547e0Ca60dC249Eea2d91Ba12F00C4ca12787`](https://worldscan.org/address/0x9CC547e0Ca60dC249Eea2d91Ba12F00C4ca12787?tab=contract)
      </td>
    </tr>
  </tbody>
</table>

## Account Abstraction

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Contract</th>

      <th className="p-2 text-left align-middle">
        World Chain Mainnet Address
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">Entrypoint v0.7</td>

      <td className="p-2 align-middle">
        [`0x0000000071727De22E5E9d8BAf0edAc6f37da032`](https://worldscan.org/address/0x0000000071727De22E5E9d8BAf0edAc6f37da032#code)
      </td>
    </tr>
  </tbody>
</table>

## Oracles

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Contract</th>

      <th className="p-2 text-left align-middle">
        World Chain Mainnet Address
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">WLD/USD</td>

      <td className="p-2 align-middle">
        [`0x8Bb2943AB030E3eE05a58d9832525B4f60A97FA0`](https://worldscan.org/address/0x8Bb2943AB030E3eE05a58d9832525B4f60A97FA0)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">ETH/USD</td>

      <td className="p-2 align-middle">
        [`0xe1d72a719171DceAB9499757EB9d5AEb9e8D64A6`](https://worldscan.org/address/0xe1d72a719171DceAB9499757EB9d5AEb9e8D64A6)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">BTC/USD</td>

      <td className="p-2 align-middle">
        [`0xdD91675235C37a47597c053807d61Da27Ae1AE6C`](https://worldscan.org/address/0xdD91675235C37a47597c053807d61Da27Ae1AE6C)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">USDC/USD</td>

      <td className="p-2 align-middle">
        [`0xF4301686AfF4eE36d70c718a9e62309b53862BE8`](https://worldscan.org/address/0xF4301686AfF4eE36d70c718a9e62309b53862BE8)
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">ezETH/USD</td>

      <td className="p-2 align-middle">
        [`0x78ce3664d1582e14270092ea9817f111ac53524b`](https://worldscan.org/address/0x78ce3664d1582e14270092ea9817f111ac53524b#code)
      </td>
    </tr>
  </tbody>
</table>


# Resources
Source: https://docs.world.org/world-chain/resources



# World Chain Resources

## Status Links

* [World Chain Mainnet Status](https://worldchain-mainnet-status.alchemy.com/)
* [World Chain Sepolia Status](https://worldchain-sepolia-status.alchemy.com/)

## Documentation

* [Brand Kit](https://world.org/press)
* [World Whitepaper](https://whitepaper.world.org/)

## Legal

* [Terms of Service](https://vault.pactsafe.io/s/8a18d792-fd76-44db-9b92-b0bb7981c248/legal.html#contract-byutjvtyt)
* [Privacy Policy](https://vault.pactsafe.io/s/8a18d792-fd76-44db-9b92-b0bb7981c248/legal.html#contract-s1ytru6kk)


# Token Bridging Guide
Source: https://docs.world.org/world-chain/tokens/bridging



## 1. Deploy your token on World Chain

Choose your preferred bridging framework and use it to deploy an ERC-20 for your token on World Chain.
We recommend using the framework provided by World Chain's [standard bridge contracts](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/bridges.md),
and deploying your token with the [OptimismMintableERC20Factory](/world-chain/developers/world-chain-contracts).
This deployment method offers guarantees that will streamline the approval process. If you opt for a different bridging framework,
it must be compatible with the standard bridge interface, or we may have difficulty supporting it.

## 2. Submit details for your token

Follow the instructions in the [GitHub repository](https://github.com/ethereum-optimism/ethereum-optimism.github.io) and submit a PR with the required details for your token.
You must specify a section for `worldchain-sepolia` and/or `worldchain` in your token's data.json file.
The submission is straightforward if your token is already listed on the Superchain token list.

## 3. Await final approval

The World team regularly reviews submissions, and you should receive a response within 24-72 hours, depending on whether the PR is submitted on a weekday, weekend, or holiday.


# Superchain Token Bridging (Coming Soon)
Source: https://docs.world.org/world-chain/tokens/superchain-token



<Note>
  The SuperchainERC20 standard will become the default standard for issuing tokens on the Superchain once the OP Stack Interop features are live on mainnet.
  Currently the [Superchain token bridging standard](https://github.com/ethereum-optimism/specs/blob/main/specs/interop/token-bridging.md) documentation is a work in progress, so please stay tuned.
</Note>

The [Superchain token bridging standard](https://github.com/ethereum-optimism/specs/blob/main/specs/interop/token-bridging.md) (`SuperchainERC20`) is a set of properties and an interface designed to enable ERC20 tokens
to be fungible across the Superchain using the official `SuperchainERC20Bridge`. This standard builds
upon the existing [ERC20 token standard](https://docs.openzeppelin.com/contracts/4.x/erc20) and implements the `ICrosschainERC20` interface, which includes
two key properties: only allowing the `SuperchainERC20Bridge` to call `crosschainMint` and `crosschainBurn` functions,
and ensuring the token is deployed at the same address on every chain in the Superchain.

The `SuperchainERC20Bridge` is a predeploy that works as an abstraction on top of the `L2ToL2CrossDomainMessenger` for token bridging.
It includes two main functions: `sendERC20`, which initiates a cross-chain transfer by burning tokens locally and sending a message
to the target chain, and `relayERC20`, which processes incoming messages and mints the corresponding amount of tokens on the destination
chain. This bridge utilizes the `L2ToL2CrossDomainMessenger` for replay protection, domain binding, and access to additional message information.

By implementing the `SuperchainERC20` standard, tokens can achieve fungibility across the Superchain while maintaining a trust-minimized bridging
solution. The standard's design ensures liquidity availability, which is fundamental to achieving fungibility, and removes the need for cross-chain
access control lists. Additionally, the standard allows for potential future enhancements, such as cross-chain transferFrom functionality and concatenated
actions for more complex cross-chain operations.


# USDC Quick Start
Source: https://docs.world.org/world-chain/tokens/usdc



USDC is a digital dollar issued by Circle, also known as a stablecoin, designed to represent US dollars on the internet and operate seamlessly across many of the world's leading blockchains, including World Chain. Backed 100% by highly liquid cash and cash-equivalent assets, USDC is always redeemable 1:1 for USD. Circle provides monthly attestation reports for USDC reserve holdings on its [Transparency page](https://www.circle.com/en/transparency).

On World Chain, USDC can be transferred using its token contract, enabling fast, secure, and programmable digital dollar transactions. This guide will walk you through building a simple script to perform your first USDC transaction on World Chain.

## Prerequisites

* Node.js (v16 or higher)
* npm or yarn

## Part 1: Setup up your project

### Step 1: Create a new project directory:

```bash
mkdir usdc-world-transfer
cd usdc-world-transfer
npm init -y
```

### Step 2: Enable ES module support:

In your `package.json`, add the following line:

```json
{
  "type": "module"
}
```

This allows you to use the modern ES module syntax (`import/export`) in your script.

**Tip:** Alternatively, you can use the following command to set `"type": "module"` directly:

### Step 3: Install required dependencies:

```bash
npm install viem @inquirer/prompts
```

### Step 4: Create your script file:

Create a new file called `index.js`:

```bash
touch index.js
```

## Part 2: Build the script

Open `index.js` and complete the following sections:

### Step 1: Import Dependencies

```javascript
import { createWalletClient, http, formatEther, createPublicClient } from 'viem';
import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts';
import { worldchainSepolia } from 'viem/chains';
import { input } from '@inquirer/prompts';
import fs from 'fs';
import path from 'path';
```

These imports include:

* `viem` for blockchain interactions
* `@inquirer/prompts` for interactive CLI prompts
* `fs` and `path` for saving private key backups

### Step 2: Define Constants

```javascript
// USDC contract address on World Chain Sepolia
const USDC_CONTRACT = '0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88';
const USDC_DECIMALS = 6;
```

* `USDC_CONTRACT` is the address of the USDC token on World Chain Sepolia
* `USDC_DECIMALS` is the number of decimals used in USDC calculations

```javascript
// USDC ABI (minimal for transfer)
const USDC_ABI = [
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }]
  }
];
```

The above ABI defines the minimum required functions for:

* Transferring USDC
* Checking USDC balance
* Getting USDC decimals

### Step 3: Add Helper Functions

```javascript
async function generateWallet() {
  const privateKey = generatePrivateKey();
  const account = privateKeyToAccount(privateKey);
  return { privateKey, address: account.address };
}
```

```javascript
async function savePrivateKeyBackup(sourceWallet, destinationWallet) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(process.cwd(), 'backups');

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }

  const backupFile = path.join(backupDir, `wallet-backup-${timestamp}.txt`);
  const content = `Wallet Backup (${timestamp})

Source Wallet:
Address: ${sourceWallet.address}
Private Key: ${sourceWallet.privateKey}

Destination Wallet:
Address: ${destinationWallet.address}
Private Key: ${destinationWallet.privateKey}

⚠️ IMPORTANT: Keep this file secure and delete it after use.
`;

  fs.writeFileSync(backupFile, content);
  return backupFile;
}
```

These functions:

* Generate new wallets
* Save them as JSON files for backup

### Step 4: Add Main Function

```javascript
async function main() {
  try {
    console.log('\n1. Creating source wallet...');
    await input({ message: 'Press Enter to generate source wallet...' });
    const sourceWallet = await generateWallet();
    console.log('Source Address:', sourceWallet.address);
    await input({ message: 'Press Enter to continue...' });

    console.log('\n2. Creating destination wallet...');
    await input({ message: 'Press Enter to generate destination wallet...' });
    const destinationWallet = await generateWallet();
    console.log('Destination Address:', destinationWallet.address);
    await input({ message: 'Press Enter to continue...' });

    console.log('\n3. Saving wallet information...');
    const backupFile = await savePrivateKeyBackup(sourceWallet, destinationWallet);
    console.log('Backup saved to:', backupFile);

    console.log('\n4. Fund your source wallet:');
    console.log('Get testnet ETH from: https://www.alchemy.com/faucets/world-chain-sepolia');
    console.log('Get testnet USDC from: https://faucet.circle.com');
    console.log('Source Wallet Address:', sourceWallet.address);
    
    await input({ message: 'Press Enter after funding your wallet...' });

    console.log('\n5. Checking wallet balances...');
    const publicClient = createPublicClient({
      chain: worldchainSepolia,
      transport: http()
    });

    let ethBalance, usdcBalance;
    let isFunded = false;

    while (!isFunded) {
      ethBalance = await publicClient.getBalance({ address: sourceWallet.address });
      usdcBalance = await publicClient.readContract({
        address: USDC_CONTRACT,
        abi: USDC_ABI,
        functionName: 'balanceOf',
        args: [sourceWallet.address]
      });

      console.log('ETH Balance:', formatEther(ethBalance), 'ETH');
      console.log('USDC Balance:', Number(usdcBalance) / 10 ** USDC_DECIMALS, 'USDC');

      if (ethBalance === 0n || usdcBalance === 0n) {
        console.log('\nPlease fund your wallet with testnet ETH and USDC before proceeding.');
        await input({ message: 'Press Enter after funding your wallet...' });
      } else {
        isFunded = true;
      }
    }

    console.log('\n6. Ready to transfer USDC to Destination Address:', destinationWallet.address);
    const amount = await input({
      message: 'Enter amount of USDC to transfer:',
      validate: (value) => {
        const num = Number(value);
        if (isNaN(num) || num <= 0) return 'Please enter a valid positive number';
        if (num > Number(usdcBalance) / 10 ** USDC_DECIMALS) return 'Insufficient USDC balance';
        return true;
      }
    });

    const amountInDecimals = BigInt(Math.floor(Number(amount) * 10 ** USDC_DECIMALS));
    
    const walletClient = createWalletClient({
      account: privateKeyToAccount(sourceWallet.privateKey),
      chain: worldchainSepolia,
      transport: http()
    });

    console.log('\nExecuting transfer...');
    const hash = await walletClient.writeContract({
      address: USDC_CONTRACT,
      abi: USDC_ABI,
      functionName: 'transfer',
      args: [destinationWallet.address, amountInDecimals]
    });

    console.log('\nTransfer successful!');
    console.log('Transaction Hash:', hash);
    console.log('View on Explorer:', `https://sepolia.worldscan.org/tx/${hash}`);

  } catch (error) {
    console.error('\nError:', error.message);
  }
}

main();
```

This function drives the full flow to:

* Create wallets
* Back up credentials
* Prompt you to fund the source wallet
* Send USDC to the destination
* Print the transaction hash

## Part 3: Run the Script

Enter the following command:

```bash
node index.js
```

Follow the prompts in your terminal.

## What This Script Does

1. Creates source and destination wallets
2. Saves wallet information securely
3. Prompts you to fund the source wallet
4. Transfers USDC between wallets
5. Displays the transaction hash and link to the explorer

## Important Notes

* Keep your private keys secure
* Delete backup files after use
* Always test with small amounts first
* This script uses World Chain Sepolia testnet, not mainnet


# Core Concepts
Source: https://docs.world.org/world-id/concepts



World ID is built for easy integration, but here are a few core concepts that are helpful to understand before you start.

## Proof of Personhood

"Proof of Personhood" is distinct from many existing identity systems. It is a way to prove that a person is unique, without revealing any personal information. World ID is not KYC, and it does not disclose your identity or previous actions to anyone.

World ID supports multiple "Verification Levels" to prove that a person is a unique human. These levels provide different degrees of humanness assurance, accessibility, and protection against fraud.

| Verification Level                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | <span className="whitespace-nowrap">Humanness Level</span> | Description                                                                                                                                                 |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <div className="flex items-center gap-2"><img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-face.svg?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=b90f7700ae9be1dfcde8facdc51a44cc" alt="Orb+" className="w-6 h-6" data-og-width="24" width="24" data-og-height="24" height="24" data-path="icons/credential-face.svg" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-face.svg?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=35a0389b58cde83e148a51161e2fac9a 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-face.svg?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=d194228072aaa8000580c5e53d49c706 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-face.svg?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=2c0442bc4cb8f249062a56e091b93afc 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-face.svg?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=daf72bb1bc527b790aa03d5ed35badf6 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-face.svg?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=23e571fcaf9fb2255ebde127be62925b 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-face.svg?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=f3f4800d53e5006b1bb59047bae0bcb6 2500w" /><span className="font-semibold">Orb+</span></div>                                                                                       | Very Strong                                                | \[Coming soon] Orb verification, plus authentication which verifies the person using World ID is the legitimate holder.                                     |
| <div className="flex items-center gap-2"><img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-orb.svg?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=b8ecb0046ab6f82d918335b9895101c3" alt="Orb" className="w-6 h-6" data-og-width="24" width="24" data-og-height="24" height="24" data-path="icons/credential-orb.svg" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-orb.svg?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=643ac7a27428cd891e9eae55cb0a51ae 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-orb.svg?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=c81926bbd1f58ce2ee85346d623fdce5 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-orb.svg?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=ad07f7b4fcb0f5d5f0b72d833d7ca9e4 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-orb.svg?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=ab2452d45bff9b0f0cef680802f27a60 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-orb.svg?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=fa1c3a33cda932fef7c070d40975de73 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-orb.svg?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=237987258174f9e250f485ad48a91c4c 2500w" /><span className="font-semibold">Orb</span></div>                                                                                                 | Strong                                                     | Biometric verification, uniqueness through iris ([details](https://world.org/blog/engineering/opening-orb-look-inside-worldcoin-biometric-imaging-device)). |
| <div className="flex items-center gap-2"><img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-passport-nfc.svg?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=a1cc256acec4f97a63151a57c159e8b2" alt="Secure Document" className="w-6 h-6" data-og-width="24" width="24" data-og-height="34" height="34" data-path="icons/credential-passport-nfc.svg" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-passport-nfc.svg?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=016683c58d0a999708e76bce9b5b5183 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-passport-nfc.svg?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=5f338fbd56a6877402b4a3a3683ddffb 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-passport-nfc.svg?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=92dd1360be65ecf68e4e88829dbf7a81 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-passport-nfc.svg?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=279e5a4e101bab321046b92736c36ade 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-passport-nfc.svg?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=ecf6e963109aacdf52cc2345438443ba 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-passport-nfc.svg?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=96efb325ff962c9dddfe0aae26db86c3 2500w" /><span className="font-semibold">Secure Document</span></div> | High                                                       | Document verification eg. Passport with security chip verification                                                                                          |
| <div className="flex items-center gap-2"><img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-passport.svg?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=43ab65eb8b9eb10a4a98fe69a029b47a" alt="Document" className="w-6 h-6" data-og-width="24" width="24" data-og-height="34" height="34" data-path="icons/credential-passport.svg" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-passport.svg?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=f1ec76ca12e007a58037c5f62b4b49a4 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-passport.svg?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=95bb2472ccf4c14289e4a99999646fa4 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-passport.svg?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=cf218605f875b95b1f4c00348cc4a52a 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-passport.svg?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=134f8a2a7f40cd7fc03007557611e5ac 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-passport.svg?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=fb5b6ac8bfab9370e923e0bd74832d49 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-passport.svg?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=1c4a489adb8cb5cd4345f754fb6c5cdd 2500w" /><span className="font-semibold">Document</span></div>                                               | High                                                       | Document verification eg. Passport                                                                                                                          |
| <div className="flex items-center gap-2"><img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-phone.svg?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=df997940922e44b77647778d6e68b38a" alt="Device" className="w-6 h-6" data-og-width="24" width="24" data-og-height="24" height="24" data-path="icons/credential-phone.svg" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-phone.svg?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=213115fa602b336a57a1490493e6e6c7 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-phone.svg?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=8465e5c5980895827f77a82888af2591 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-phone.svg?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=48d63504e9fdceeb3acf5761a4e506fb 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-phone.svg?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=85668a6f93a64b266e355967e026f15b 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-phone.svg?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=1b1be54da8991bd3b3e15ecd7aa6fdd3 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/credential-phone.svg?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=b90c592fe7d63f3b548aad55ca25914d 2500w" /><span className="font-semibold">Device</span></div>                                                                           | Medium                                                     | Unique mobile device check.                                                                                                                                 |

## Vocabulary

Some terms are used throughout the World ID documentation. Here are a few of the most important ones:

* **World ID**: A user's self-custodial identity, as well as the name of the protocol.
* **App ID**: The ID of your app that is assigned in our [Developer Portal](https://developer.worldcoin.org/).
* **Action**: A developer-facing primitive that lets you put any app operation behind a unique-human gate. An app can have one or more actions depending on your use case.
* **Zero-Knowledge Proof (ZKP)**: A cryptographic method to prove that a statement is true without revealing any information about the statement itself. World ID uses ZKPs to prove that a user is verified without revealing the user's identity.
* **Nullifier Hash**: A component of the World ID ZKP; a unique identifier for a combination of a user, `app_id`, and `action`.
* **Signal**: A component of the World ID ZKP; data attached to the proof that cannot be tampered with. An example may be a user's choice for an election.
* **Merkle Root**: A component of the World ID ZKP; The root of the [Merkle Tree](https://en.wikipedia.org/wiki/Merkle_tree) that identity commitments are inserted to.

It's important to note the difference between the two types of verification, depending on the context:

* **Orb/Passport Verification**: A user's identity can be verified through either an Orb, Device or Passport and their identity commitment is then recorded on the blockchain.
* **Proof Verification**: The process of validating a user's Zero-Knowledge Proof (ZKP) either off-chain via a REST endpoint we host or on-chain using our Smart Contracts.


# Cloud Verification
Source: https://docs.world.org/world-id/id/cloud



After receiving the user's proof from IDKit, you must verify it in your backend. Cloud Verification is a solution hosted in our Developer Portal to make this easier for you.

## Optional: Hashing the signal

In you backend you need to hash the signal passed in the IDKit. If you want to implement the hashing yourself you need to use `keccak256` hash function and 64 minimum padding. Take a look at how we implemented it [here](https://github.com/worldcoin/idkit-js/blob/main/packages/core/src/lib/hashing.ts).

```javascript title="IDKit Core"
import { hashToField } from "@worldcoin/idkit-core/hashing";

const signalHash = hashToField("my_signal");
```

## Rest Endpoint

Find the full API reference [here](/world-id/reference/api#verify-proof).

```bash title="cURL"
curl -X POST "/api/v2/verify/{app_id}" \
    -H "Content-Type: application/json" \
    -d '{
        "nullifier_hash": "0x2bf8406809dcefb1486dadc96c0a897db9bab002053054cf64272db512c6fbd8",
        "merkle_root": "0x2264a66d162d7893e12ea8e3c072c51e785bc085ad655f64c10c1a61e00f0bc2",
        "proof": "0x1aa8b8f3b2d2de5ff452c0e1a83e29d6bf46fb83ef35dc5957121ff3d3698a1119090fb...",
        "verification_level": "orb",
        "action": "my_action",
        "signal_hash": "hashed_signal" // optional: only add this parameter if you added a custom signal
    }'
```


# Design Guidelines
Source: https://docs.world.org/world-id/id/design-guidelines



# Design Guidelines

## Figma Library

<a href="https://www.figma.com/design/XmNRhspQ3Gfsze5WRjV1PB/ID-Kit-Library?node-id=1-213&t=73AKSDqCV4ZXrGRH-1" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 mt-4 mb-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg no-underline">
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L2 17L12 22L22 17V7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <path d="M12 12V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <path d="M12 12L22 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <path d="M12 12L2 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>

    <div>
      <h3 className="m-0 text-lg font-semibold text-gray-900">
        ID Kit Figma Library
      </h3>

      <p className="m-0 text-sm text-gray-600">
        Access design components and templates for World ID integration
      </p>
    </div>
  </div>

  <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 20 20">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 10l4 4 4-4" transform="rotate(-90 10 10)" />
  </svg>
</a>

## **Core structure:**

* **World ID logo**
* **Partner logo** (Optional)
* **Title:** "Connect your World ID"
* **Description:** "Scan the QR code to connect your World ID"
* **QR code container** (central and prominent)
* **Footer:** "Terms & Privacy" link
* **Dismiss (X)** icon for closing the modal or window

**Note:** The QR code is dynamically generated and time-limited. Always ensure it's up to date.

## Customization Guidelines

**✅ Partners may:**

* Adjust **typography** to match brand styles, but retain clear hierarchy (title > body)
* Modify **corners or shadows** to match their brand
* Modify **colors**, so long as contrast and accessibility are preserved
* Customize **container shape** (e.g., rounded corners) and **shadow**
* Add a **light/dark mode** toggle or theme-matching behavior
* Localize the **copy if needed** (preferably keeping semantic structure)
* Add their **brand logo** above the title

**❌ Partners must not:**

* Remove or replace the **World ID logo**
* Alter or obscure the **QR code**
* Change the **copy** in a way that misrepresents World ID
* Make the QR code **too small**

## Size & Spacing

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Element</th>
      <th className="p-2 text-left align-middle">Recommendation</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">QR Code</td>
      <td className="p-2 align-middle">Minimum 160 x 160px</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Padding</td>
      <td className="p-2 align-middle">Min. 24px all sides</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Logo size</td>
      <td className="p-2 align-middle">32-48px width</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Font (title)</td>
      <td className="p-2 align-middle">Minimum 16px</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Font (description)</td>
      <td className="p-2 align-middle">Minimum 14px</td>
    </tr>
  </tbody>
</table>

### **Accessibility checklist:**

* QR code must meet minimum sizing for easy scanning
* All text must meet WCAG AA contrast
* Modal should be **keyboard-navigable** and screen-reader friendly
* "Terms & Privacy" must be a focusable link

### Behavior checklist

* Modal should open centered and dim the background
* Auto-refresh or invalidate QR code after a set time (e.g., 5 mins)
* Optional callback/event on QR scan success
* X button should close the modal gracefully

## States

**Default** Waiting for user to scan the QR code

<img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/main.png?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=0562126ca8a98b1018206b73342ef6ee" alt="Default state - Waiting for user to scan the QR code" width="600" height="400" className="w-full h-auto max-w-[600px]" data-og-width="1320" data-og-height="1560" data-path="images/docs/id/design-guidelines/main.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/main.png?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=1925e65ebab44ab9c9b70bec3ed13e98 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/main.png?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=d6ec03f05bcca6086c80e4050e8d75de 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/main.png?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=320e71b9c42fd2265f03ffa0d615f3e1 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/main.png?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=94d7075c7ec6511b9cccae3d40c11d8c 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/main.png?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=7a6625566faa8d5c69e70931d6b40b9c 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/main.png?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=5615d9cb403ab14f837f70a659a97fe2 2500w" />

**Success** - Successful connection

<img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/success.png?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=b7b6fd9e0e6d1a597aeea8c52d420653" alt="Success - Successful connection" width="600" height="400" className="w-full h-auto max-w-[600px]" data-og-width="1320" data-og-height="1560" data-path="images/docs/id/design-guidelines/success.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/success.png?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=2fe9a4d5c421552e69370e84a1c9686a 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/success.png?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=e9529aa54b3eae048d5783fd5d2e8c91 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/success.png?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=595c542d943f32811a8db6b9f5c13f25 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/success.png?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=cd0c952f2f49c102c0e30a42d71d0cac 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/success.png?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=dc8f15e11a2d2e944bcd67ae17e394c8 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/success.png?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=c9f8c3ff25afc20939760a22a7056e40 2500w" />

**Request canceled** - User manually canceled request in World App

<img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/cancel.png?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=d5dfdacff965cad0dbd776f50baba459" alt="Request canceled - User manually canceled request in World App" width="600" height="400" className="w-full h-auto max-w-[600px]" data-og-width="1320" data-og-height="1560" data-path="images/docs/id/design-guidelines/cancel.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/cancel.png?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=1e4251bc650240e1a492bbce10f2f09b 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/cancel.png?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=2fd7821114748b551a3a21cf53928b4a 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/cancel.png?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=81279573eea7b9032ad56507efdefd28 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/cancel.png?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=4070878a2d60609874d614253c303501 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/cancel.png?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=c0914a92de7fb3dfa15cf0311c0e964b 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/cancel.png?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=aa78ba12f55f6b02a375014b26f1ea99 2500w" />

**Connection lost** - Lost connection to server or user offline

<img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/lost.png?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=dbf82bb2159dd80c6b62d53e6b0a93a8" alt="Connection lost - Lost connection to server or user offline" width="600" height="400" className="w-full h-auto max-w-[600px]" data-og-width="1320" data-og-height="1560" data-path="images/docs/id/design-guidelines/lost.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/lost.png?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=fb5f153c5f5ff28077277a24055076a4 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/lost.png?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=3e71efc409085b2d220483f151b30698 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/lost.png?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=ebd8b015917486f0db4fd23651175717 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/lost.png?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=e295d46a1979c26d77faa3a9728212a4 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/lost.png?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=a932bc1504da607174df6fa9ae332221 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/lost.png?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=edb922edd77ba01f9536698ce4d920ed 2500w" />

**Error** - Generic technical error or proof failure

<img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/error.png?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=33cb5669f1d540d4f6d2dca2a574728d" alt="Error - Generic technical error or proof failure" width="600" height="400" className="w-full h-auto max-w-[600px]" data-og-width="1320" data-og-height="1560" data-path="images/docs/id/design-guidelines/error.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/error.png?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=80bd1471645bceec2d660ea0920d7797 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/error.png?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=8bdc5990a267bb2ed819bc28aca9d27f 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/error.png?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=b7daaf0be7cef1a51b12a3c50f0365fc 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/error.png?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=7e465b28dd2eb28429190ccf70421d45 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/error.png?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=baa7276a22808b26a16817eb89fad1ea 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/error.png?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=99ca3b35a9bb02bfdf9346de9422b239 2500w" />

### Partnership example

<img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/partner.png?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=1d73918ae9716813f29c79def9feae9f" alt="Partnership example" width="600" height="400" className="w-full h-auto max-w-[600px]" data-og-width="1320" data-og-height="1560" data-path="images/docs/id/design-guidelines/partner.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/partner.png?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=ab2d5d1aa845de227fcba869f171bd50 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/partner.png?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=cfffe36640481fbff317165dcbe37164 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/partner.png?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=d630802e010bebce5d8516807c03fd14 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/partner.png?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=4075f557ae67af192b0d3821d96fcdbb 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/partner.png?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=de7925e55707c7dcccd0b8483de9b396 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/partner.png?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=d5fb8b20ec7fc90c4648ea55a721923a 2500w" />

## Verified Human Badge

The **Human Verified Badge** signals that an account or user has been verified as a unique human via **World ID**. It builds trust, improves authenticity, and can be embedded into products across industries (social, gaming, commerce, identity, etc.).

<a href="https://www.figma.com/design/XmNRhspQ3Gfsze5WRjV1PB/ID-Kit-Library?node-id=1-216" target="_blank" rel="noopener noreferrer" className="group block max-w-sm mt-6 mb-3 mx-auto bg-white rounded-2xl border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-xl transition-all overflow-hidden no-underline">
  <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100">
    <img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/human_badge.png?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=805de17b63df22c43e492b1420e3adab" alt="Human Verified Badge" width="200" height="80" className="mx-auto w-full h-auto max-w-[200px]" data-og-width="2526" data-og-height="1043" data-path="images/docs/id/design-guidelines/human_badge.png" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/human_badge.png?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=60f42f437394f7c33338432c9ff58654 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/human_badge.png?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=3f5a9547032476b31aa380c9bd4e2fc5 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/human_badge.png?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=aade80cbc1d056572cc6e6d86c698ad1 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/human_badge.png?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=fac828b09cb7cbafcd94e014d43b31d1 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/human_badge.png?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=0f9d920febde962d89812725d273f1fe 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/design-guidelines/human_badge.png?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=0ad6fcc01dbf99e5470bbe5d97ebf81e 2500w" />
  </div>

  <div className="p-4">
    <h3 className="m-0 text-lg p-0 font-bold text-gray-900 group-hover:text-black transition-colors">
      Human Badge Figma Assets
    </h3>

    <p className="m-0 text-sm text-gray-600">
      Access all badge variants, sizes, and implementation guidelines for the
      Human Verified Badge
    </p>

    <div className="flex items-center text-sm font-medium text-primary">
      Open in Figma

      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h14m-4-4l4 4-4 4" />
      </svg>
    </div>
  </div>
</a>

***

## Badge design

* Symbol: World icon
* Label: human in lowercase, optionally styled in pill or badge form

### **Variants:**

* **Icon-only:** For dense UI like leaderboards or tooltips
* **Icon + label:** Preferred for public profiles, social posts, and player cards

### Do:

* Keep badge **small, clear, unobtrusive**
* Always pair with or near a user identity (e.g. username, avatar)
* Use consistent shape and padding

### Don't:

* Overstyle or animate
* Replace or remix copy ("real human", "verified user", etc.)
* Add misleading hierarchy (e.g. badge > blue check)

***

## Placement guidelines

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Content</th>
      <th className="p-2 text-left align-middle">Placement</th>
      <th className="p-2 text-left align-middle">Format</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">Social profiles</td>
      <td className="p-2 align-middle">Below or beside username / bio</td>
      <td className="p-2 align-middle">Icon + label</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Gaming profiles</td>
      <td className="p-2 align-middle">Under character name or stats</td>
      <td className="p-2 align-middle">Icon + label</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Leaderboards</td>
      <td className="p-2 align-middle">Right of username</td>
      <td className="p-2 align-middle">Icon + label</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Messaging/chat</td>
      <td className="p-2 align-middle">Right of username</td>
      <td className="p-2 align-middle">Icon + label</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Account dashboards</td>

      <td className="p-2 align-middle">
        Near user ID, next to login method, etc.
      </td>

      <td className="p-2 align-middle">Icon + label</td>
    </tr>
  </tbody>
</table>

## Theming & Branding

**✅ Partners may:**

* Adapt badge color to suit **light/dark mode**

**❌ Partners must not:**

* Remove or replace the word human
* Use verification outside of actual World ID-verified users
* Make it look like a World ID badge gives higher permissions than intended
* Change the logo shape

## Rules checklist

### **Layout and Visual**

* Correct badge asset used
* Logo is not distorted, recolored or modified
* Minimum height is respected

### Placement

* Placed directly next to or below user, display name, or avatar
* Badge is not visually grouped with unrelated badges
* Badge does not imply special privileges unless defined


# Getting Started
Source: https://docs.world.org/world-id/id/getting-started



We created the IDKit libraries, to help you integrate World ID into your app in 3 simple steps:

1. Create an application in our [Developer Portal](http://developer.worldcoin.org/)
2. Retrieve user's verification proof using an IDkit library
3. Verify the proof

# Step 1: Create an application in the Developer Portal

When you create your application you'll choose **External** as the integration type. External apps use IDKit to collect proofs from your end-users and return them to your backend for verification.

### Decide upfront

1. **Environment**\
   • **Production** – Real Human World IDs.\
   • **Staging / Development** – internal testing against the test identities.

2. **Verification target**\
   • **Cloud** – verify proofs via a REST endpoint.\
   • **On-chain** – verify proofs directly inside a smart contract.

Once you create the application you'll need to create an incognito action.

# Step 2: Retrieve a proof with IDKit

IDKit is available for multiple runtimes so you can collect proofs wherever your users are:

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Platform</th>
      <th className="p-2 text-left align-middle">Docs</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">Web (React)</td>

      <td className="p-2 align-middle">
        <a href="./web-react">Integrate on the web</a>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Web (Vanilla)</td>

      <td className="p-2 align-middle">
        <a href="./web-vanilla">Integrate on the web</a>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Mobile (React Native, Swift, Kotlin)</td>

      <td className="p-2 align-middle">
        <a href="./mobile">Integrate on mobile</a>
      </td>
    </tr>
  </tbody>
</table>

<Note>Find a full list of supported SDKs [here](./libraries)</Note>

Regardless of the platform the flow is the same:

1. Initiate a verification session with a minimum `verification_level`
2. User will be redirect or prompted to use the World App
3. When the user succeeds you receive a **proof object** containing `merkle_root`, `nullifier_hash`, `proof`, and the user's `verification_level`.

```json title="ISuccessResult"
{
  "merkle_root": "0x1f38b57f3bdf96f05ea62fa68814871bf0ca8ce4dbe073d8497d5a6b0a53e5e0",
  "nullifier_hash": "0x0339861e70a9bdb6b01a88c7534a3332db915d3d06511b79a5724221a6958fbe",
  "proof": "0x063942fd7ea1616f17787d2e3374c1826ebcd2d41d2394...",
  "verification_level": "orb"
}
```

<Warning>
  Retrieving the proof is not enough. You must verify the proof in Step 3 to
  prevent replay attacks. Without verification, your application could be
  vulnerable to malicious actors reusing old proofs.
</Warning>

# Step 3: Verify the proof

Choose where you want to verify proofs:

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Target</th>
      <th className="p-2 text-left align-middle">Recommended when</th>
      <th className="p-2 text-left align-middle">Docs</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">Cloud verifier</td>

      <td className="p-2 align-middle">
        You already maintain a backend server and prefer a simple REST call
      </td>

      <td className="p-2 align-middle">
        <a href="./cloud">Verify via REST</a>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">On-chain verifier</td>

      <td className="p-2 align-middle">
        You need trust-minimized verification inside a smart contract
      </td>

      <td className="p-2 align-middle">
        <a href="./on-chain">Verify on-chain</a>
      </td>
    </tr>
  </tbody>
</table>

<Note>
  Cloud verifications from the Developer portal automatically handle
  sybil-resistance for you, ensuring that a user cannot perform the same action
  more than a set amount. If you want to verify proofs on-chain you need to
  handle this, more details [here](./on-chain)
</Note>


# Libraries
Source: https://docs.world.org/world-id/id/libraries



World ID is available on a variety of platforms. Below is a list of native libraries we currently support.

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Library</th>
      <th className="p-2 text-left align-middle">Description</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">
        <a href="https://www.npmjs.com/package/@worldcoin/idkit">React</a>
      </td>

      <td className="p-2 align-middle">
        Our most popular library. Integrate easily into any React app
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <a href="https://www.npmjs.com/package/@worldcoin/idkit-standalone">
          JS
        </a>
      </td>

      <td className="p-2 align-middle">
        Standalone version for vanilla javascript.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <a href="https://www.npmjs.com/package/@worldcoin/idkit-react-native">
          React Native
        </a>
      </td>

      <td className="p-2 align-middle">React Native library.</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <a href="https://swiftpackageindex.com/worldcoin/idkit-swift">Swift</a>
      </td>

      <td className="p-2 align-middle">Native Swift library for IOS apps.</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <a href="https://crates.io/crates/idkit">Rust</a>
      </td>

      <td className="p-2 align-middle">
        Rust library. Use this to compile other native binaries, eg. Kotlin.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <a href="https://github.com/worldcoin/idkit-kotlin/packages/2232016">
          Kotlin
        </a>
      </td>

      <td className="p-2 align-middle">
        Native Kotlin library for Android apps
      </td>
    </tr>
  </tbody>
</table>


# Integrate on mobile
Source: https://docs.world.org/world-id/id/mobile



All of the mobile SDKs follow the same logic:

1. Initiate a session
2. Redirect the user using the session url
3. Poll the session
4. Verify the proof in your Backend

Choose the SDK you want to use:

* [Swift](https://swiftpackageindex.com/worldcoin/idkit-swift)
* [Kotlin](https://github.com/worldcoin/idkit-kotlin/packages/2232016)
* [React Native](https://www.npmjs.com/package/@worldcoin/idkit-react-native)

## Initiating a Session

<CodeGroup>
  ```javascript title="React Native"
  const session = await new Session().create('app_id', 'your-action', {
  	bridge_url: undefined, // Optional: URL to a custom bridge
  	verification_level: VerificationLevel.Orb, // Optional: Minimum verification level
  })
  ```

  ```kotlin title="Kotlin"
  val session = Session.create(
      appID = AppID("app_id"),
      action = "your-action"
  )
  ```

  ```swift title="Swift"
  let session = try await Session(AppID("app_id"), action: "your-action")
  ```
</CodeGroup>

# Redirect user

Use the session url to redirect the user to the World App.

<Note>
  You can add a `return_to` query param to the session url, to redirect the user back to your app. Make sure you handle the deeplink correctly when the user get's redirect back to the app.
</Note>

<CodeGroup>
  ```javascript title="React Native"
  const sessionUrl = session.sessionURI
  ```

  ```kotlin title="Kotlin"
  val sessionUrl = session.connectUrl
  ```

  ```swift title="Swift"
  let session_url = session.connect_url
  ```
</CodeGroup>

## Poll session status

<CodeGroup>
  ```javascript title="React Native"
  const checkStatus = async () => {
  	const status = await session.status()

  	if (status.state === VerificationState.Confirmed) {
  		console.log('Verification successful:', status.result)
  	} else if (status.state === VerificationState.Failed) {
  		console.log('Verification failed:', status.errorCode)
  	}
  }

  // Poll every second
  setTimeout(checkStatus, 1000)
  ```

  ```kotlin title="Kotlin"
  session.status().collect { status ->
          when (status) {
              is Status.WaitingForConnection -> {
                  println("Waiting for the user to scan the QR Code")
              }
              is Status.AwaitingConfirmation -> {
                  println("Awaiting user confirmation")
              }
              is Status.Confirmed -> {
                  println("Got proof: ${status.proof}")
              }
              is Status.Failed -> {
                  println("Got error: ${status.error.message}")
              }
          }
      }
  ```

  ```swift title="Swift"
  for try await status in session.status() {
  	switch status {
  		case .waitingForConnection:
  			print("Waiting for the user to scan the QR Code")
  		case .awaitingConfirmation:
  			print("Awaiting user confirmation")
  		case let .confirmed(proof):
  			print("Got proof: \(proof)")
  		case let .failed(error):
  			print("Got error: \(error.localizedDescription)")
  	}
  }
  ```
</CodeGroup>

## Verify the proof

If the session was successful, you will get the proof result:

```json title="Result"
{
	"merkle_root": "0x1f38b57f3bdf96f05ea62fa68814871bf0ca8ce4dbe073d8497d5a6b0a53e5e0",
	"nullifier_hash": "0x0339861e70a9bdb6b01a88c7534a3332db915d3d06511b79a5724221a6958fbe",
	"proof": "0x063942fd7ea1616f17787d2e3374c1826ebcd2d41d2394...",
	"verification_level": "orb"
}
```

<Warning>
  Retrieving a successful proof doesn't mean the user is verified you need to validate this proof in a backend server.
</Warning>

Depending on your needs you can verify the proof:

* In the [cloud](./cloud) using Developer Portal API (Easiest)
* On [chain](./on-chain) using our Solidity SDK


# On-Chain Verification
Source: https://docs.world.org/world-id/id/on-chain



World ID proofs can be fully verified on-chain. After all, the source of truth for the decentralized protocol is on-chain. To verify a World ID proof, your smart contract will embed a call to the `verifyProof` method of the World ID contract, and then execute the rest of its logic as usual.

The [smart contract starter kit](https://github.com/worldcoin/world-id-onchain-template) and the [frontend & on-chain monorepo template](https://github.com/worldcoin/world-id-onchain-template) are great resources to help you get started with World ID.
Using one of these repositories is strongly recommended to get started with World ID on-chain.

The following examples demonstrate the most common use case: verifying proofs from only Orb-verified users, for a single action, with a user's wallet address as the signal, while also enabling sybil-resistance.

This setup is recommended for most users, as it is the most gas-efficient. For more information on use cases that require more complex setups (such as multiple actions or other types of signals), see the [Advanced On-Chain Verification](/world-id/id/on-chain) page.

<Note>
  At the core of the World ID Protocol is the use of
  [Semaphore](https://docs.semaphore.pse.dev/). Semaphore is a zk-SNARK based
  privacy protocol that allows for the creation of anonymous credential systems
  developed by the Ethereum Foundation. Read more about [The
  Protocol](https://whitepaper.world.org/#world-network-protocol) and
  [Semaphore](https://docs.semaphore.pse.dev/).
</Note>

## IDKit Configuration

When verifying proofs on-chain, there are a few changes you have to make to your IDKit configuration. You must ensure that the app created in the Developer Portal is configured as an on-chain app, and you should only accept Orb credentials in IDKit, as World ID Device is not currently supported on-chain.

```tsx
import { IDKitWidget } from '@worldcoin/idkit'

const { address } = useAddress() // get the user's wallet address

<IDKitWidget
    app_id="app_GBkZ1KlVUdFTjeMXKlVUdFT" // must be an app set to on-chain in Developer Portal
    action="claim_nft"
    signal={address} // proof will only verify if the signal is unchanged, this prevents tampering
    onSuccess={onSuccess} // use onSuccess to call your smart contract
    // no use for handleVerify, so it is removed
    // use default verification_level (orb-only), as device credentials are not supported on-chain
>
    {({ open }) => <button onClick={open}>Verify with World ID</button>}
</IDKitWidget>
```

## Contract Addresses

The World ID Router contract is what you should use to verify proofs. It is deployed on multiple chains, and you can find the addresses for each chain in our contracts [Address Book](/world-id/reference/contract-deployments).

## `hashToField` Helper Function

Our contracts use a custom hash function that returns a `uint256` that is guaranteed to be in the field of the elliptic curve we use. This is necessary to ensure that the `uint256` returned by the hash function can be used in our zero-knowledge proofs.

```solidity
library ByteHasher {
	/// @dev Creates a keccak256 hash of a bytestring.
	/// @param value The bytestring to hash
	/// @return The hash of the specified value
	/// @dev `>> 8` makes sure that the result is included in our field
	function hashToField(bytes memory value) internal pure returns (uint256) {
		return uint256(keccak256(abi.encodePacked(value))) >> 8;
	}
}
```

To use this function, simply import the `ByteHasher` library and call `hashToField` on your bytestring.

```solidity
import { ByteHasher } from './helpers/ByteHasher.sol';

contract HelloWorld {
	using ByteHasher for bytes;
	// {...}
	abi.encodePacked('hello world').hashToField(); // returns the keccak256 hash of 'hello world' as a uint256
	// {...}
```

## Constructor

The `externalNullifier` is the unique identifier of the action performed in Semaphore, and its keccak256 hash (named `externalNullifierHash`) is what is passed to the World ID Router contract. It is a combination of the app ID and the action.
You should typically set it in the constructor to save gas (as is done in this example), as it will not change if all users are performing the same action.

We additionally set the `groupId` to `1`, which limits this example to Orb-verified users only. World ID Device is currently not supported on-chain.

```solidity
/// @dev This allows us to use our hashToField function on bytes
using ByteHasher for bytes;

/// @notice Thrown when attempting to reuse a nullifier
error InvalidNullifier();

/// @dev The address of the World ID Router contract that will be used for verifying proofs
IWorldID internal immutable worldId;

/// @dev The keccak256 hash of the externalNullifier (unique identifier of the action performed), combination of appId and action
uint256 internal immutable externalNullifierHash;

/// @dev The World ID group ID (1 for Orb-verified)
uint256 internal immutable groupId = 1;

/// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
mapping(uint256 => bool) internal nullifierHashes;

/// @param _worldId The address of the WorldIDRouter that will verify the proofs
/// @param _appId The World ID App ID (from Developer Portal)
/// @param _actionId The World ID Action (from Developer Portal)
constructor(
    IWorldID _worldId,
    string memory _appId,
    string memory _action
) {
    worldId = _worldId;
    externalNullifierHash = abi
        .encodePacked(abi.encodePacked(_appId).hashToField(), _action)
        .hashToField();
}
```

<Note>
  On-chain verification will succeed for **7 days** after a proof is created.
</Note>

## verifyProof

The `verifyProof` method reverts if the proof is invalid, meaning you can just call it as part of your smart contract's logic and execute the rest of your logic after as usual.

<Warning>
  Note that calling the `verifyProof` function by itself does not provide
  sybil-resistance, or prevent proof reuse -- it just verifies that the proof is
  valid. However, this example **does** implement sybil-resistance by checking
  that the `nullifierHash` has not been verified before.
</Warning>

The `verifyProof` method takes the arguments below.

* `root` - The World ID root to verify against. This is obtained from the IDKit widget, and should be passed as-is.
* `groupId` - This must be `1` for Orb-verified users. World ID Device is currently not supported on-chain.
* `signalHash` - The keccak256 hash of the signal to verify.
* `nullifierHash` - Anonymous user ID for this action. This is obtained from the IDKit widget, and should just be passed as-is.
* `externalNullifierHash` - The externalNullifierHash, which identifies which app and action the user is verifying for.
* `proof` - The proof to verify. This is obtained from the IDKit widget.

```solidity
/// @param signal An arbitrary input from the user that cannot be tampered with. In this case, it is the user's wallet address.
/// @param root The root (returned by the IDKit widget).
/// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the IDKit widget).
/// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the IDKit widget).
/// @param externalNullifierHash The externalNullifierHash, which identifies which app and action the user is verifying for.
function verifyAndExecute(
    address signal,
    uint256 root,
    uint256 nullifierHash,
    uint256[8] calldata proof
) public {
    // First, we make sure this person hasn't done this before
    if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

    // We now verify the provided proof is valid and the user is verified by World ID
    worldId.verifyProof(
        root,
        groupId, // set to "1" in the constructor
        abi.encodePacked(signal).hashToField(),
        nullifierHash,
        externalNullifierHash,
        proof
    );

    // We now record the user has done this, so they can't do it again (sybil-resistance)
    nullifierHashes[nullifierHash] = true;

    // Finally, execute your logic here, knowing the user is verified
}
```

<Note>
  All arguments are of type `uint256`, with the exception of `proof`, which is of type `uint256[8]`. Depending on how you're calling your smart contract, you might be required to unpack it into a `uint256[8]` before passing it to the verifyProof method. To unpack it, use the following code:

  <CodeGroup>
    ```ts viem
    import { decodeAbiParameters } from 'viem'

    const unpackedProof = decodeAbiParameters([{ type: 'uint256[8]' }], proof)[0]

    ```

    ```ts ethers.js
    import { defaultAbiCoder as abi } from '@ethers/utils'

    const unpackedProof = abi.decode(['uint256[8]'], proof)[0]
    ```
  </CodeGroup>
</Note>


# Common Pitfalls
Source: https://docs.world.org/world-id/id/pitfalls



# Incognito Actions Common Pitfalls

<br />

## Not Verifying Proofs

When using Incognito Actions, it's important to **always verify the proof received from IDKit.** This proof is a *claim* that the user has been verified by World ID, and verifying that proof with our API or smart contracts is the only way to ensure that the claim is true.

## Improper Signal (Proof fails verification)

If you specify a signal as an input to IDKit, ensure you include the same signal when verifying the proof with our API or smart contracts. Otherwise, the proof will not verify.

## Compilation/Runtime Errors

IDKit must be run client-side. Ensure that your frontend framework isn't attempting to render IDKit server-side.


# Testing
Source: https://docs.world.org/world-id/id/testing



To test your integration, we provide the [Worldcoin Simulator](https://simulator.worldcoin.org) to simulate a user using World App in a staging environment.

You can use the simulator from another browser tab and copy the QR code from IDKit with a single click:

<div align="center">
  <video className="m-auto" width="320" height="240" autoPlay muted loop playsInline>
    <source src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/introduction/qr-copy.mp4?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=356d8c21af4f5e8dad10255b65855fbd" type="video/mp4" data-path="images/docs/introduction/qr-copy.mp4" />

    Your browser does not support the video tag.
  </video>
</div>

And then paste the QR code data into the simulator:

<div align="center">
  <video className="m-auto" width="320" height="240" autoPlay muted loop playsInline>
    <source src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/introduction/qr-paste.mp4?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=b0e9976f50d80a8c633e7ed9da93a1cc" type="video/mp4" data-path="images/docs/introduction/qr-paste.mp4" />

    Your browser does not support the video tag.
  </video>
</div>

You should see a successful outcome in IDKit!

<div align="center">
  <video className="m-auto" width="320" height="240" autoPlay muted loop playsInline>
    <source src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/introduction/idkit-success.mp4?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=ca1f480051dd916502156b3135a4c698" type="video/mp4" data-path="images/docs/introduction/idkit-success.mp4" />

    Your browser does not support the video tag.
  </video>
</div>

### Verifying the Proof in the Backend

After receiving the proof from IDKit, it's crucial to verify it on your backend to ensure its authenticity. This step is often overlooked but is essential for security. Make sure to implement the verification logic in your server-side code to validate the proof before proceeding with any user actions.


# Integrate on web (React)
Source: https://docs.world.org/world-id/id/web-react



For react integrations, we support 2 paths:

* [**Widget**](#idkitwidget): A plug-and-play widget that handles UI/State management for you. Find an example [here](https://github.com/worldcoin/idkit-js/tree/main/examples/with-next)
* [**Session API**](#session-hook): A react hook that gives you total control of the user journey and UI/State management. Find an example [here](https://github.com/worldcoin/idkit-js/tree/main/examples/with-session).

## Install

<CodeGroup>
  ```bash npm
  npm i @worldcoin/idkit
  ```

  ```bash pnpm
  pnpm i @worldcoin/idkit
  ```

  ```bash yarn
  yarn add @worldcoin/idkit
  ```
</CodeGroup>

## IDKitWidget

First, add the `IDKitWidget` component to your site. The values for the `app_id` and `action` props were obtained from the Developer Portal in [Getting Started](/world-id/id/getting-started). We'll define the `handleVerify` and `onSuccess` callbacks next.

```tsx title="/verify.tsx"
'use client' // for Next.js app router
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit'

// ...
;<IDKitWidget
	app_id="your app id" // obtained from the Developer Portal
	action="your action id" // obtained from the Developer Portal
	onSuccess={onSuccess} // callback when the modal is closed
	handleVerify={handleVerify} // callback when the proof is received
	verification_level={VerificationLevel.Orb}
>
	{({ open }) => (
		// This is the button that will open the IDKit modal
		<button onClick={open}>Verify with World ID</button>
	)}
</IDKitWidget>
```

### handleVerify

The `handleVerify` callback is called when the user's proof is received. This will send the proof to your backend for verification:

```tsx title="/verify.tsx"
const handleVerify = async (proof: ISuccessResult) => {
	const res = await fetch('/api/verify', {
		// route to your backend will depend on implementation
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(proof),
	})
	if (!res.ok) {
		throw new Error('Verification failed.') // IDKit will display the error message to the user in the modal
	}
}
```

### Verifying the proof

The `handleVerify` callback sends the proof to your backend for verification. In the backend handler should verify the proof with the Developer Portal API:

<Warning>
  The call to the Developer Portal API must be made server-side to avoid [man in the middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).
</Warning>

```tsx title="/api/verify.ts"
import { type IVerifyResponse, verifyCloudProof } from '@worldcoin/idkit-core'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const proof = req.body
	const app_id = process.env.APP_ID
	const action = process.env.ACTION_ID
	const verifyRes = (await verifyCloudProof(proof, app_id, action)) as IVerifyResponse

	if (verifyRes.success) {
		// This is where you should perform backend actions if the verification succeeds
		// Such as, setting a user as "verified" in a database
		res.status(200).send(verifyRes)
	} else {
		// This is where you should handle errors from the World ID /verify endpoint.
		// Usually these errors are due to a user having already verified.
		res.status(400).send(verifyRes)
	}
}
```

<Note>
  If you want to verify the proof onchain read more about it [here](./on-chain).
</Note>

### onSuccess

The `onSuccess` callback is called when the user closes the modal. This is where you can perform any necessary actions, such as redirecting the user to a new page.

```tsx title="/verify.tsx"
const onSuccess = () => {
	// This is where you should perform any actions after the modal is closed
	// Such as redirecting the user to a new page
	window.location.href = '/success'
}
```

## Session Hook

First, setup the session hook with your configuration:

```tsx title="/verify.tsx"
const { status, sessionURI, result, errorCode } = useSession({
	app_id: 'your app id',
	action: 'your action id',
})
```

After that you need to handle the following possible statuses:

* **WaitingForConnection**: Display the `sessionURI` to the user eg. with a QR code
* **Confirmed**: Session ended successfully, now you **must** verify the `result` proof in your backend.
* **Failed**: Session failed, check `errorCode`


# Integrate on web (Vanilla)
Source: https://docs.world.org/world-id/id/web-vanilla



For standalone web integrations, we support 2 paths:

* [**Widget**](#idkitwidget): A plug-and-play widget that handles UI/State management for you.
* [**Session API**](#session-api): An API that gives you total control of the user journey and UI/State management.

For full examples check out this [repo](https://github.com/worldcoin/idkit-js/tree/main/examples/with-html).

## Install

<CodeGroup>
  ```bash npm
  npm i @worldcoin/idkit-standalone
  ```

  ```bash pnpm
  pnpm i @worldcoin/idkit-standalone
  ```

  ```bash yarn
  yarn add @worldcoin/idkit-standalone
  ```
</CodeGroup>

## IDKitWidget

A plug-and-play widget that handles UI and state management automatically. Initialize once, then call `open()` to show the verification modal.

```javascript
import '@worldcoin/idkit-standalone'

// Initialize the widget
IDKit.init({
	app_id: 'app_ce4cb73cb75fc3b73b71ffb4de178410',
	action: 'test-action',
	signal: 'user_12345',
	action_description: 'Verify your World ID',
	verification_level: 'orb',
	handleVerify: async response => {
		// Verify the proof on your backend
		const verifyRes = await fetch('/api/verify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(response),
		})
		if (!verifyRes.ok) throw new Error('Verification failed')
	},
	onSuccess: response => {
		console.log('Verification successful:', response)
	},
})

// Trigger verification
await IDKit.open()
```

## Session API

For custom UIs and full control over the verification flow. Create a session, display the QR code, and poll for status updates.

```javascript
import '@worldcoin/idkit-standalone'

// Create a session
await IDKitSession.create({
	app_id: 'app_ce4cb73cb75fc3b73b71ffb4de178410',
	action: 'test-action',
	signal: 'user_12345',
	action_description: 'Verify your World ID',
	verification_level: 'orb',
})

// Get QR code URI
const sessionURI = IDKitSession.getURI()
// Display QR code using your preferred method

// Poll for updates
const status = await IDKitSession.pollStatus()
console.log('State:', status.state) // 'awaiting_connection', 'confirmed', 'failed'

if (status.state === 'confirmed' && status.result) {
	// Verify the proof on your backend
	const verifyRes = await fetch('/api/verify', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(status.result),
	})

	if (verifyRes.ok) {
		console.log('Verification successful!')
	} else {
		console.error('Verification failed')
	}
}

// Clean up when done
IDKitSession.destroy()
```

## Backend Verification

**Critical:** You must verify all proofs on your backend. Never trust client-side verification alone.

Your `/api/verify` endpoint should validate the World ID proof:

```javascript
// Example Node.js/Express endpoint
app.post('/api/verify', async (req, res) => {
	const { proof, merkle_root, nullifier_hash, verification_level } = req.body

	try {
		const verifyRes = await fetch('https://developer.worldcoin.org/api/v1/verify/app_your_app_id', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				nullifier_hash,
				merkle_root,
				proof,
				verification_level,
				action: 'your-action',
				signal: 'your-signal', // Optional: must match frontend
			}),
		})

		if (verifyRes.ok) {
			const { verified } = await verifyRes.json()
			if (verified) {
				// Store nullifier_hash to prevent reuse
				// Grant access to user
				res.json({ success: true })
			} else {
				res.status(400).json({ error: 'Invalid proof' })
			}
		} else {
			res.status(400).json({ error: 'Verification failed' })
		}
	} catch (error) {
		res.status(500).json({ error: 'Verification error' })
	}
})
```

### **Important considerations:**

* Store `nullifier_hash` to prevent proof reuse
* Match `action` and `signal` values between frontend and backend


# API Reference
Source: https://docs.world.org/world-id/reference/api



The Worldcoin Developer Portal offers an API to enable easy verification of World IDs and relevant credentials.

### Base URL

```
https://developer.worldcoin.org
```

<Note>
  All requests to the Developer Portal API must include a `Content-Type:
    application/json` header, a `User-Agent` header, and a valid JSON body.
</Note>

## Verify Proof

<ParamField path="method" type="POST">
  [https://developer.worldcoin.org/api/v2/verify/\{app\_id}](https://developer.worldcoin.org/api/v2/verify/\{app_id})
</ParamField>

Enables you to verify a World ID proof for a **Cloud action.** To ensure sybil-resistance, by default, a single person can only verify once for every action. The number of allowed verifications for a single user can be configured in the Developer Portal.

<Note>
  This endpoint is now on **version 2**. The previous version at
  `/api/v1/verify/{app_id}` will be unavailable after June 30, 2024.
</Note>

### Request Body

<ParamField body="nullifier_hash" type="string" required>
  The unique user identifier (called the nullifier hash in the ZKP), as provided
  by IDKit. See [IDKit response](/world-id/reference/idkit#types) for details.
</ParamField>

<ParamField body="proof" type="string" required>
  The zero-knowledge proof, as provided by IDKit. See [IDKit
  response](/world-id/reference/idkit#types) for details.
</ParamField>

<ParamField body="merkle_root" type="string" required>
  Part of the ZKP, the hash of the Merkle root that proves membership to the set
  of credentials. As provided by IDKit. See [IDKit
  response](/world-id/reference/idkit#types) for details.
</ParamField>

<ParamField body="verification_level" type="string" required>
  The verification level, as provided by IDKit. See [IDKit
  response](/world-id/reference/idkit#types) for details.
</ParamField>

<ParamField body="action" type="string" required>
  Same action identifier as passed to IDKit.
</ParamField>

<ParamField body="signal_hash" type="string" default="hashToField('').digest">
  The hash of the signal that was used to generate the proof. Defaults to the
  hash of an empty string.
</ParamField>

<ParamField body="max_age" type="number" default={7200}>
  The maximum age of the root in seconds. This parameter controls how old the
  Merkle root used in the proof can be. Minimum value is 3600 (1 hour) and
  maximum value is 604800 (7 days). Defaults to 7200 (2 hours).
</ParamField>

<CodeGroup title="Request">
  ```bash cURL
  curl -X POST "https://developer.worldcoin.org/api/v2/verify/{app_id}" \
      -H "Content-Type: application/json" \
      -d '{
          "nullifier_hash": "0x2bf8406809dcefb1486dadc96c0a897db9bab002053054cf64272db512c6fbd8",
          "merkle_root": "0x2264a66d162d7893e12ea8e3c072c51e785bc085ad655f64c10c1a61e00f0bc2",
          "proof": "0x1aa8b8f3b2d2de5ff452c0e1a83e29d6bf46fb83ef35dc5957121ff3d3698a1119090fb...",
          "verification_level": "orb",
          "action": "my_action",
          "signal_hash": "0x00c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4"
      }'
  ```

  ```javascript
  fetch("https://developer.worldcoin.org/api/v2/verify/{app_id}", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nullifier_hash:
        "0x2bf8406809dcefb1486dadc96c0a897db9bab002053054cf64272db512c6fbd8",
      merkle_root:
        "0x2264a66d162d7893e12ea8e3c072c51e785bc085ad655f64c10c1a61e00f0bc2",
      proof:
        "0x1aa8b8f3b2d2de5ff452c0e1a83e29d6bf46fb83ef35dc5957121ff3d3698a1119090fb...",
      verification_level: "orb",
      action: "my_action",
      signal_hash:
        "0x00c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4",
    }),
  });
  ```
</CodeGroup>

### Possible Responses

* `200 OK` - The proof was successfully verified.
* `400 Bad Request` - The proof was invalid or the user has already verified for this action.

### Response Examples

<Tabs>
  <Tab title="200 OK">
    ```json
    {
      "success": true,
      "action": "my_action",
      "nullifier_hash": "0x2bf8406809dcefb1486dadc96c0a897db9bab002053054cf64272db512c6fbd8",
      "created_at": "2023-02-18T11:20:39.530041+00:00"
    }
    ```
  </Tab>

  <Tab title="400 Invalid Proof">
    ```json
    {
      "code": "invalid_proof",
      "detail": "The provided proof is invalid and it cannot be verified. Please check all inputs and try again.",
      "attribute": null
    }
    ```
  </Tab>

  <Tab title="400 Invalid Merkle Root">
    ```json
    {
      "code": "invalid_merkle_root",
      "detail": "The provided Merkle root is invalid. User appears to be unverified.",
      "attribute": null
    }
    ```
  </Tab>

  <Tab title="400 Invalid Credential Type">
    ```json
    {
      "code": "invalid",
      "detail": "Invalid credential type.",
      "attribute": "credential_type"
    }
    ```
  </Tab>

  <Tab title="400 User Exceeded Maximum Verifications">
    ```json
    {
      "code": "exceeded_max_verifications",
      "detail": "This user has exceeded the maximum number of verifications allowed for this proof.",
      "attribute": null
    }
    ```
  </Tab>

  <Tab title="400 User Already Verified">
    ```json
    {
      "code": "already_verified",
      "detail": "This person has already verified for this action.",
      "attribute": null
    }
    ```
  </Tab>
</Tabs>

## Get Action Metadata

<ParamField path="method" type="GET">
  [https://developer.worldcoin.org/api/v1/precheck/\{app\_id}](https://developer.worldcoin.org/api/v1/precheck/\{app_id})
</ParamField>

Enables fetching information about a particular app to determine eligibility for verification. This endpoint is also used by the World ID Kiosk, Sign in with World ID, and World App to show metadata about the action being verified. This endpoint will only return information for active actions.

<Note>Primarily intended for internal use.</Note>

### Request Body

<ParamField body="action" type="string" required default="">
  The action to check. This is the same action that was passed to IDKit.
  Defaults to an empty string for Sign in with World ID.
</ParamField>

<ParamField body="nullifier_hash" type="string" default="">
  The ZKP's nullifier hash, as provided by IDKit. See [IDKit
  response](/world-id/reference/api#response) for details. Defaults to an empty
  string.
</ParamField>

<ParamField body="external_nullifier" type="string" deprecated>
  **Deprecated.** The ZKP's external nullifier. This parameter is deprecated and
  will be removed in a future release, and should no longer be used. Instead,
  pass the `action` parameter.
</ParamField>

<CodeGroup>
  ```bash title="cURL"
  curl -X POST "/api/v1/precheck/{app_id}" \
       -H "Content-Type: application/json" \
       -d '{
               "action": "my_custom_action",
               "nullifier_hash": "0x2bf8406809dcefb1486dadc96c0a897db9bab002053054cf64272db512c6fbd8",
               "external_nullifier": "0x00949dd9a8c5b600304d010ce3a3cf012352070ae4b77504e17af77ee894cda"
           }'
  ```

  ```js title="JavaScript"
  fetch(`/api/v1/precheck/${appId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "my_custom_action",
      nullifier_hash:
        "0x2bf8406809dcefb1486dadc96c0a897db9bab002053054cf64272db512c6fbd8",
      external_nullifier:
        "0x00949dd9a8c5b600304d010ce3a3cf012352070ae4b77504e17af77ee894cda",
    }),
  });
  ```
</CodeGroup>

### Response

<ParamField body="__typename" type="string" default="app">
  Always returns `app`.
</ParamField>

<ParamField body="id" type="string">
  The `app_id` from the Developer Portal.
</ParamField>

<ParamField body="engine" type="'cloud' | 'on-chain'">
  Whether the app is configured for use with **Cloud** or **On-Chain** proof
  verifications.
</ParamField>

<ParamField body="is_staging" type="boolean">
  Whether the app is a staging app. If `true`, the [Worldcoin
  Simulator](https://simulator.worldcoin.org) must be used to verify.
</ParamField>

<ParamField body="is_verified" type="string">
  Whether the app has been verified by Worldcoin.
</ParamField>

<ParamField body="name" type="string">
  The app's name as configured in the Developer Portal.
</ParamField>

<ParamField body="verified_app_logo" type="string">
  The URL of the app's logo. Only returned if the app has been verified,
  otherwise returns an empty string.
</ParamField>

<ParamField body="is_sign_in" type="boolean">
  Whether the action request is for Sign in with World ID.
</ParamField>

<ParamField body="can_user_verify" type="'yes' | 'no' | 'on-chain' | 'undetermined'">
  If the user is eligible to verify for this action.

  <ul>
    <li>
      <code>"yes"</code>: The user has not reached the maximum number of
      verifications for this action based on the <code>nullifier\_hash</code>
      provided. Always returned when <code>is\_sign\_in</code> is
      <code>true</code>.
    </li>

    <li>
      <code>"no"</code>: The user has reached the maximum number of verifications
      for this action based on the <code>nullifier\_hash</code> provided.
    </li>

    <li>
      <code>"undetermined"</code>: A <code>nullifier\_hash</code> was not
      provided, so the user's eligibility cannot be determined.
    </li>

    <li>
      <code>"on-chain"</code>: The app is configured for <strong>On-Chain</strong>
      verifications, so the user's eligibility cannot be determined. Verification
      eligibility is determined solely by the application's smart contract.
    </li>
  </ul>
</ParamField>

<ParamField body="action" type="object">
  Information about the action being verified.

  <ul>
    <li>
      <code>name</code>: The action's human-readable name as configured in the
      Developer Portal.
    </li>

    <li>
      <code>action</code>: The action identifier as configured in the Developer
      Portal. Typically a slugified version of the action's name.
    </li>

    <li>
      <code>description</code>: The action's description as configured in the
      Developer Portal.
    </li>

    <li>
      <code>max\_verifications</code>: The maximum number of verifications
      allowed for this action. Will be <code>0</code> if the action is
      configured for unlimited verifications.
    </li>

    <li>
      <code>max\_accounts\_per\_user</code>: The maximum number of accounts allowed
      per user for Sign in with World ID. Will always be <code>1</code>.
    </li>

    <li>
      <code>external\_nullifier</code>: The action's external nullifier.
      <strong>Intended for internal use only.</strong>
    </li>

    <li>
      <code>status</code>: Will return <code>active</code> if the action is
      active, otherwise will return <code>inactive</code>.
    </li>

    <li>
      <code>\_\_typename</code>: Always returns <code>action</code>.
    </li>
  </ul>
</ParamField>

### Response Examples

<Tabs>
  <Tab title="200 OK">
    ```json
    {
      "id": "app_staging_4cfd049031b0da1e8b62084b09a9f430",
      "is_staging": true,
      "is_verified": false,
      "name": "Default App",
      "verified_app_logo": "",
      "engine": "cloud",
      "__typename": "app",
      "sign_in_with_world_id": true,
      "can_user_verify": "yes",
      "action": {
        "external_nullifier": "0x00949dd9a8c5b600304d010ce3a3cf012352070ae4b77504e17af77ee894cda",
        "name": "My action",
        "action": "my_custom_action",
        "description": "My action",
        "max_verifications": 0,
        "max_accounts_per_user": 1,
        "__typename": "action"
      }
    }
    ```
  </Tab>

  <Tab title="400 Required">
    ```json
    {
      "code": "required",
      "detail": "This attribute is required.",
      "attribute": "action"
    }
    ```
  </Tab>

  <Tab title="400 Action Inactive">
    ```json
    {
      "code": "action_inactive",
      "detail": "This action is inactive.",
      "attribute": "status"
    }
    ```
  </Tab>

  <Tab title="404 Not Found">
    ```json
    {
      "code": "not_found",
      "detail": "We couldn't find an app with this ID.",
      "attribute": null
    }
    ```
  </Tab>

  <Tab title="405 Method Not Allowed">
    ```json
    {
      "code": "method_not_allowed",
      "detail": "HTTP method POST is not allowed for this endpoint.",
      "attribute": null
    }
    ```
  </Tab>
</Tabs>

## Get JWK Keys

<ParamField path="method" type="GET">
  [https://developer.worldcoin.org/api/v1/jwks](https://developer.worldcoin.org/api/v1/jwks)
</ParamField>

This endpoint lets you retrieve the JWKs (public keys) used to verify the signature on JSON web tokens that authenticate a verification request from the Developer Portal. This verification method is only used if you are using the **Hosted page user interface.**

<CodeGroup>
  ```bash title="cURL"
  curl /api/v1/jwks
  ```

  ```js title="JavaScript"
  fetch("/api/v1/jwks");
  ```
</CodeGroup>

### Response

```json
{
  "keys": [
    {
      "e": "AQAB",
      "n": "09ETz2k4_9IbDBYK_Tcr6DzbDdJPeqIgvoeUvXNVjNU8mYzFbhdqh8jRH80FwtuoFqyw5oyuG9ILHxfGaG_SeutPWSxBsqulXhxTnTAx2i8HtF0i2toMuvsEtiAjQ3hD4_w2xInBVOO98WAGcNA_UgWAG2DlWpe2km_V5bv3iKteCsSTZtzT3RjEO6FeOlVr8rmx9EGwWITdPIvrEXm_3REFqvDOnQvLu2-Au8m1V3U_6404m4RV_wlWGPnhHfG57VTkkqjgrnFKGUDniG-VMJs-WFX4VIQRvy2z1A5nQsmYpobK_clGyV0D0i5P1A_lmWGDEXBLSjEW9zH_o0d2DQ",
      "kty": "RSA",
      "kid": "jwk_8934bcc47ec5b86dd490cc2a46f18a5e"
    }
  ]
}
```

## Authenticated Endpoints

<Note>
  You can generate API Keys on the **My Team** page of the Developer Portal.
</Note>

* API keys are intended for use by third-party applications and for server-to-server communication. They are long-lived and can be revoked at any time.
* API keys are scoped to a team and have full permissions for any actions as any user of the Developer Portal.
* Once you have an API key, use it as the value of the `Authorization` header in your requests. For example:

```
Authorization: Bearer $API_KEY
```

### GraphQL

<ParamField path="method" type="POST">
  [https://developer.worldcoin.org/api/v1/graphql](https://developer.worldcoin.org/api/v1/graphql)
</ParamField>

Interaction with the Developer Portal API is mostly done through a GraphQL endpoint, which enables retrieving information and interacting with any of the API objects. You can read more about [queries](https://hasura.io/docs/latest/graphql/core/api-reference/graphql-api/query/) and [mutations](https://hasura.io/docs/latest/graphql/core/api-reference/graphql-api/mutation/) for GraphQL to help you construct your query.

<CodeGroup>
  ```bash title="cURL"
  curl -X POST "/v1/graphql" \
       -H "Content-Type: application/json" \
       -H "Authorization: Bearer $WORLD_ID_TOKEN" \
       -d '{
             "query": "YOUR_GRAPHQL_QUERY_HERE"
           }'
  ```

  ```js title="JavaScript"
  fetch("/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${WORLD_ID_TOKEN}`,
    },
    body: JSON.stringify({
      query: "YOUR_GRAPHQL_QUERY_HERE",
    }),
  });
  ```
</CodeGroup>

#### Example Queries

<Tabs>
  <Tab title="Listing Apps">
    ```graphql
    query MyApps {
      app {
        id
        name
      }
    }
    ```
  </Tab>

  <Tab title="Listing nullifiers for action">
    ```graphql
    query ActionNullifiers($action_id: String) {
      action(where: { id: { _eq: $action_id }, status: { _eq: "active" } }) {
        id
        status
        max_accounts_per_user
        max_verifications
        nullifiers {
          nullifier_hash
        }
      }
    }
    ```
  </Tab>
</Tabs>


# Contract Deployments
Source: https://docs.world.org/world-id/reference/contract-deployments



Here you can find the address and associated ENS name (if available) for all of the World ID contracts. For verifying proofs, the only contract you need to interact with is the `WorldIdRouter` contract, which will properly route the call to the correct contract based on the `groupId` argument.

<Note>
  Only the Orb verification level is supported on-chain, so your `groupId`
  should always be `1`.
</Note>

## Ethereum

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Contract</th>
      <th className="p-2 text-left align-middle">Ethereum Mainnet</th>
      <th className="p-2 text-left align-middle">Ethereum Sepolia Testnet</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">World ID Router</td>

      <td className="p-2 align-middle">
        <a href="https://etherscan.io/address/0x163b09b4fe21177c455d850bd815b6d583732432#code">
          id.worldcoin.eth
        </a>
      </td>

      <td className="p-2 align-middle">
        <a href="https://sepolia.etherscan.io/address/0x469449f251692e0779667583026b5a1e99512157#code">
          0x469449f2…2157
        </a>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Identity Manager</td>

      <td className="p-2 align-middle">
        <a href="https://etherscan.io/address/0xf7134CE138832c1456F2a91D64621eE90c2bddEa#code">
          0xf7134CE1…ddEa
        </a>
      </td>

      <td className="p-2 align-middle">
        <a href="https://sepolia.etherscan.io/address/0xb2ead588f14e69266d1b87936b75325181377076#code">
          0xb2ead588…7076
        </a>
      </td>
    </tr>
  </tbody>
</table>

## World Chain

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Contract</th>
      <th className="p-2 text-left align-middle">World Chain</th>

      <th className="p-2 text-left align-middle">
        World Chain Sepolia Testnet
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">World ID Router</td>

      <td className="p-2 align-middle">
        <a href="https://worldscan.org/address/0x17B354dD2595411ff79041f930e491A4Df39A278">
          0x17B354dD…A278
        </a>
      </td>

      <td className="p-2 align-middle">
        <a href="https://sepolia.worldscan.org/address/0x57f928158C3EE7CDad1e4D8642503c4D0201f611">
          0x57f92815…f611
        </a>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Bridged World ID</td>

      <td className="p-2 align-middle">
        <a href="https://worldscan.org/address/0xdFCa0A882eF7793485B3d052142B60647E82009E#code">
          0xdFCa0A88…09E
        </a>
      </td>

      <td className="p-2 align-middle">
        <a href="https://sepolia.worldscan.org/address/0xE177F37AF0A862A02edFEa4F59C02668E9d0aAA4">
          0xE177F37A…0AA4
        </a>
      </td>
    </tr>
  </tbody>
</table>

## Optimism

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Contract</th>
      <th className="p-2 text-left align-middle">Optimism Mainnet</th>
      <th className="p-2 text-left align-middle">Optimism Sepolia Testnet</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">World ID Router</td>

      <td className="p-2 align-middle">
        <a href="https://optimistic.etherscan.io/address/0x57f928158C3EE7CDad1e4D8642503c4D0201f611#code">
          optimism.id.worldcoin.eth
        </a>
      </td>

      <td className="p-2 align-middle">
        <a href="https://sepolia-optimism.etherscan.io/address/0x11cA3127182f7583EfC416a8771BD4d11Fae4334#code">
          0x11cA3127…4334
        </a>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Bridged World ID</td>

      <td className="p-2 align-middle">
        <a href="https://optimistic.etherscan.io/address/0xB3E7771a6e2d7DD8C0666042B7a07C39b938eb7d#code">
          0xB3E7771a…eb7d
        </a>
      </td>

      <td className="p-2 align-middle">
        <a href="https://sepolia-optimism.etherscan.io/address/0xf07d3efadD82A1F0b4C5Cc3476806d9a170147Ba#code">
          0xf07d3efa…47Ba
        </a>
      </td>
    </tr>
  </tbody>
</table>

## Polygon

<Warning>
  World ID is currently unavailable on Polygon testnets. Support for [Polygon
  Amoy](https://polygon.technology/blog/introducing-the-amoy-testnet-for-polygon-pos)
  is coming soon.
</Warning>

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Contract</th>
      <th className="p-2 text-left align-middle">Polygon Mainnet</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">World ID Router</td>

      <td className="p-2 align-middle">
        <a href="https://polygonscan.com/address/0x515f06B36E6D3b707eAecBdeD18d8B384944c87f#code">
          polygon.id.worldcoin.eth
        </a>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Bridged World ID</td>

      <td className="p-2 align-middle">
        <a href="https://polygonscan.com/address/0xa6d85F3b3bE6Ff6DC52C3aaBe9A35d0ce252b79F#code">
          0xa6d85F3b…b79F
        </a>
      </td>
    </tr>
  </tbody>
</table>

## Base (Sepolia)

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Contract</th>
      <th className="p-2 text-left align-middle">Base Sepolia Testnet</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">World ID Router</td>

      <td className="p-2 align-middle">
        <a href="https://sepolia.basescan.org/address/0x42FF98C4E85212a5D31358ACbFe76a621b50fC02#code">
          0x42FF98C4…C02
        </a>
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">Bridged World ID</td>

      <td className="p-2 align-middle">
        <a href="https://sepolia.basescan.org/address/0x163b09b4fE21177c455D850BD815B6D583732432#code">
          0x163b09b4…2432
        </a>
      </td>
    </tr>
  </tbody>
</table>


# Smart Contracts
Source: https://docs.world.org/world-id/reference/contracts



All of our smart contracts are available on GitHub:

* [World ID Smart Contracts](https://github.com/worldcoin/world-id-contracts)
* [State Bridge Smart Contracts](https://github.com/worldcoin/world-id-state-bridge)

<Note>
  If you're interested in using World ID and verifying proofs on-chain, see our
  [On-Chain Verification guide](/world-id/id/on-chain).
</Note>

## Supported Chains

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Chain</th>
      <th className="p-2 text-left align-middle">Testnet</th>
      <th className="p-2 text-left align-middle">Role</th>
      <th className="p-2 text-left align-middle">Identity Availability</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">
        <img src="https://mintcdn.com/tfh/YUTPWL_uYoSCkRvL/logo/world-logo-no-text.svg?fit=max&auto=format&n=YUTPWL_uYoSCkRvL&q=85&s=96aba817ba50cd76c1eb12b8f8ff2bd5" alt="World Chain" className="inline-block w-7 h-7 mr-2 align-middle" data-og-width="1024" width="1024" data-og-height="1024" height="1024" data-path="logo/world-logo-no-text.svg" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/YUTPWL_uYoSCkRvL/logo/world-logo-no-text.svg?w=280&fit=max&auto=format&n=YUTPWL_uYoSCkRvL&q=85&s=02fb4d59f51b1fe5474ffdf6e5bf9231 280w, https://mintcdn.com/tfh/YUTPWL_uYoSCkRvL/logo/world-logo-no-text.svg?w=560&fit=max&auto=format&n=YUTPWL_uYoSCkRvL&q=85&s=2d3e46c5bc8573a8d0c3b0d100465996 560w, https://mintcdn.com/tfh/YUTPWL_uYoSCkRvL/logo/world-logo-no-text.svg?w=840&fit=max&auto=format&n=YUTPWL_uYoSCkRvL&q=85&s=61e6fe57671663cc671d27096fb7676e 840w, https://mintcdn.com/tfh/YUTPWL_uYoSCkRvL/logo/world-logo-no-text.svg?w=1100&fit=max&auto=format&n=YUTPWL_uYoSCkRvL&q=85&s=933cd1a521f3a3a000801ae6e614fde5 1100w, https://mintcdn.com/tfh/YUTPWL_uYoSCkRvL/logo/world-logo-no-text.svg?w=1650&fit=max&auto=format&n=YUTPWL_uYoSCkRvL&q=85&s=7950c9a32b84b0bd63a2204984ed99f0 1650w, https://mintcdn.com/tfh/YUTPWL_uYoSCkRvL/logo/world-logo-no-text.svg?w=2500&fit=max&auto=format&n=YUTPWL_uYoSCkRvL&q=85&s=123bb66a0ab6e02222228482d2705392 2500w" />

        <strong>World Chain</strong>
      </td>

      <td className="p-2 align-middle">World Chain</td>
      <td className="p-2 align-middle">Bridged</td>
      <td className="p-2 align-middle">\~5 Minutes after Ethereum</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/ethereum.svg?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=8a8b5950559fe47ea258980e0c376c97" alt="Ethereum" className="inline-block w-5 h-5 mr-2 align-middle" data-og-width="256" width="256" data-og-height="256" height="256" data-path="icons/ethereum.svg" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/ethereum.svg?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=23c3cbf342101f0b667ee756f9e74254 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/ethereum.svg?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=03fb5732d16893b5434816d39f8bec9b 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/ethereum.svg?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=63fb24ee1a0fb0c794dc735a7aeeac5d 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/ethereum.svg?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=b9fd3b7cbb563175b9100356fd8fadc2 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/ethereum.svg?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=6e1c7fcaf7ebe9a7c7a0dbbe75daf963 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/ethereum.svg?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=4e658e5e22ec39c9b5acaa27bf0ccb9b 2500w" />

        <strong>Ethereum</strong>
      </td>

      <td className="p-2 align-middle">Sepolia</td>
      <td className="p-2 align-middle">Canonical</td>
      <td className="p-2 align-middle">\~60 minutes after verification</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/optimism.svg?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=22268756a7deae99871076b5885038e9" alt="Optimism" className="inline-block w-5 h-5 mr-2 align-middle" data-og-width="256" width="256" data-og-height="256" height="256" data-path="icons/optimism.svg" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/optimism.svg?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=3e9dc39226d0fcaec243f4c46540081d 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/optimism.svg?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=45bdfedc8e39399747a50228e1229b91 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/optimism.svg?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=9a441119f7b91e807523067f7101971c 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/optimism.svg?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=0c00f2ed358a16dc060402ea5a7dfbc0 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/optimism.svg?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=28c517244a6b7e4cd39e0de2a4c4f6c2 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/optimism.svg?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=b1273494a3345afbf050c670f3f81c76 2500w" />

        <strong>Optimism</strong>
      </td>

      <td className="p-2 align-middle">Optimism Sepolia</td>
      <td className="p-2 align-middle">Bridged</td>
      <td className="p-2 align-middle">\~5 Minutes after Ethereum</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/polygon.svg?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=c153bcea6847907b6838dc24bfb6228e" alt="Polygon" className="inline-block w-5 h-5 mr-2 align-middle" data-og-width="256" width="256" data-og-height="256" height="256" data-path="icons/polygon.svg" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/polygon.svg?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=0f87d65d297b32df0c5d38ab53334e66 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/polygon.svg?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=bdbfb9d5386b2ac919ee4b9e3fbd2d98 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/polygon.svg?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=4cb3b812cf96929e2bc175730555da1c 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/polygon.svg?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=9f5e4aa704a3f67fed09a5f9c1135605 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/polygon.svg?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=f47d21d7ced0ea573e29608e6d3322c2 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/polygon.svg?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=e7daf6040918b4463bedf406d2bac694 2500w" />

        <strong>Polygon</strong>
      </td>

      <td className="p-2 align-middle">Polygon</td>
      <td className="p-2 align-middle">Bridged</td>
      <td className="p-2 align-middle">\~40 Minutes after Ethereum</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/base.svg?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=e6c59e54eba828f04cca8f7ce944f0dd" alt="Base" className="inline-block w-5 h-5 mr-2 align-middle" data-og-width="111" width="111" data-og-height="111" height="111" data-path="icons/base.svg" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/base.svg?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=de649ea9fc3111e93efbf447101144fb 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/base.svg?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=379b45c1788ce764418cf4b44a6177f6 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/base.svg?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=14b6c1040fe7c0653bf43800b9d17ebc 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/base.svg?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=df094a9b03f4ee41868dd5ecbbbad4a2 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/base.svg?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=428a691766b6cc11aeeec3de860b3970 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/icons/base.svg?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=b4aa8700f28111a367072b004e17e239 2500w" />

        <strong>Base (Testnet Only)</strong>
      </td>

      <td className="p-2 align-middle">Base Sepolia</td>
      <td className="p-2 align-middle">Bridged</td>
      <td className="p-2 align-middle">\~5 Minutes after Ethereum Sepolia</td>
    </tr>
  </tbody>
</table>

<Note>
  Find our smart contract [address book
  here](/world-id/reference/contract-deployments).
</Note>

## Architecture

This section offers a high-level overview of the various smart contracts that make up World ID. This structure (including state bridging) is replicated on testnets -- currently Sepolia, Optimism Sepolia, and Base Sepolia.

### Identity Managers: `WorldIdIdentityManager`

Identity Managers are only deployed on Ethereum. The Identity Manager contracts are responsible for managing the Semaphore instance. Worldcoin's signup sequencers call the Identity Manager contracts to add or remove identities from the merkle tree.

### State Bridges: `OpStateBridge`/`PolygonStateBridge`

One State Bridge contract is deployed on Ethereum for each bridged chain. It publishes the root of the merkle tree to its configured chain's World ID contract, allowing proofs to be verified on that chain.

### Bridged World ID: `OpWorldId`/`PolygonWorldId`

One World ID contract is deployed on each bridged chain, with an associated State Bridge contract on Ethereum. It is responsible for receiving merkle roots from its State Bridge contract, and verifying World ID proofs against those roots.

<Note>
  You can deploy your own State Bridge contract on Ethereum and Bridged World ID
  contract to any chain to bridge World ID to that chain permissionlessly.
</Note>

### World ID Router: `WorldIdRouter`

**This is the contract you should interact with.**

The World ID Router will route your call to the correct Identity Manager contract (Ethereum) or World ID contract (L2 Chains) based on the `groupId` argument. This contract is proxied, so you will not need to update your code if the underlying contracts are upgraded.

<Note>
  Only Orb credentials are supported on-chain, so the `groupId` must be `1`.
</Note>

## Usage

The `verifyProof` method of the **World ID Router** is used to verify proofs on-chain.

### Arguments

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Parameter</th>
      <th className="p-2 text-left align-middle">Type</th>
      <th className="p-2 text-left align-middle">Required</th>
      <th className="p-2 text-left align-middle">Description</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">
        <code>root</code>
      </td>

      <td className="p-2 align-middle">
        <code>uint256</code>
      </td>

      <td className="p-2 align-middle">
        <strong>Yes</strong>
      </td>

      <td className="p-2 align-middle">The World ID root to verify against.</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>groupId</code>
      </td>

      <td className="p-2 align-middle">
        <code>uint256</code>
      </td>

      <td className="p-2 align-middle">
        <strong>Yes</strong>
      </td>

      <td className="p-2 align-middle">
        Determines which Credential Type to verify against. As only Orb
        credentials are supported on-chain, this must be <code>1</code>.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>signalHash</code>
      </td>

      <td className="p-2 align-middle">
        <code>uint256</code>
      </td>

      <td className="p-2 align-middle">
        <strong>Yes</strong>
      </td>

      <td className="p-2 align-middle">
        The <code>keccak256</code> hash of the signal to verify.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>nullifierHash</code>
      </td>

      <td className="p-2 align-middle">
        <code>uint256</code>
      </td>

      <td className="p-2 align-middle">
        <strong>Yes</strong>
      </td>

      <td className="p-2 align-middle">
        The root of the merkle tree to verify against. This is obtained from the
        IDKit widget as a hex string <code>nullifier\_hash</code>, and must be
        converted to a <code>uint256</code> before passing it to the{" "}
        <code>verifyProof</code> method.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>externalNullifierHash</code>
      </td>

      <td className="p-2 align-middle">
        <code>uint256</code>
      </td>

      <td className="p-2 align-middle">
        <strong>Yes</strong>
      </td>

      <td className="p-2 align-middle">
        The <code>keccak256</code> hash of the <code>externalNullifier</code> to
        verify. The <code>externalNullifier</code> is computed from the{" "}
        <code>app\_id</code> and <code>action</code>.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>proof</code>
      </td>

      <td className="p-2 align-middle">
        <code>uint256\[8]</code>
      </td>

      <td className="p-2 align-middle">
        <strong>Yes</strong>
      </td>

      <td className="p-2 align-middle">
        The zero-knowledge proof to verify. This is obtained from the IDKit
        widget as a hex string <code>proof</code>, and must be converted to a{" "}
        <code>uint256\[8]</code> before passing it to the{" "}
        <code>verifyProof</code> method.
      </td>
    </tr>
  </tbody>
</table>

#### Example: groupId

```solidity title="Orb-Only groupId"
uint256 internal immutable groupId = 1;
```

#### Example: signalHash

```solidity title="signalHash"
abi.encodePacked(signal).hashToField();
```

#### Example: externalNullifierHash

```solidity title="externalNullifierHash"
externalNullifier = abi.encodePacked(abi.encodePacked(appId).hashToField(), action)
externalNullifierHash = externalNullifier.hashToField();
```

<Note>Read more about the External Nullifier in Protocol Internals.</Note>

#### Example: Unpacking Proof

<CodeGroup>
  ```ts title="viem"
  import { decodeAbiParameters } from 'viem'

  const unpackedProof = decodeAbiParameters([{ type: 'uint256[8]' }], proof)[0]

  ```

  ```ts title="ethers.js"
  import { defaultAbiCoder as abi } from '@ethers/utils'

  const unpackedProof = abi.decode(['uint256[8]'], proof)[0]
  ```
</CodeGroup>

### Sybil resistance

While the World ID protocol makes it very easy to make your contracts sybil resistant, this takes a little more than just calling the `verifyProof` function. To make your contract sybil-resistant, you'll need to do the following:

* Store the `nullifierHash` of each user that has successfully verified a proof.
* When a user attempts to verify a proof, check that the `nullifierHash` is not already in the list of used `nullifierHash`es.

Here's an example function doing the above. You can also use the [World ID starter kits](/world-id/id/on-chain) to get started with sybil resistance.

```solidity
/// @param root The root (returned by the IDKit widget).
/// @param groupId The group ID
/// @param signal An arbitrary input from the user, usually the user's wallet address
/// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the IDKit widget).
/// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the IDKit widget).
function verifyAndExecute(
    address signal,
    uint256 root,
    uint256 nullifierHash,
    uint256[8] calldata proof
) public {
    // First make sure this person hasn't done this before
    if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

    // Verify the provided proof is valid and the user is verified by World ID
    worldId.verifyProof(
        root,
        groupId,
        abi.encodePacked(signal).hashToField(),
        nullifierHash,
        externalNullifierHash,
        proof
    );

    // Record the user has done this, so they can't do it again (sybil-resistance)
    nullifierHashes[nullifierHash] = true;

    // Finally, execute your logic here, for example issue a token, NFT, etc...
}
```


# Errors
Source: https://docs.world.org/world-id/reference/errors



This page acts as a reference for the error codes returned by IDKit, the Developer Portal API, and the Wallet Bridge.

## IDKit

These error codes are returned in the `onError` callback. The source described if the error originates from within IDKit or the Wallet Bridge response.

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Code</th>
      <th className="p-2 text-left align-middle">Source</th>
      <th className="p-2 text-left align-middle">Description</th>
      <th className="p-2 text-left align-middle">How to fix?</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">
        <code>failed\_by\_host\_app</code>
      </td>

      <td className="p-2 align-middle">IDKit</td>

      <td className="p-2 align-middle">
        An error was thrown in the <code>handleVerify</code> callback.
      </td>

      <td className="p-2 align-middle">
        Assess the error thrown in your <code>handleVerify</code> callback and
        resolve the issue.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>connection\_failed</code>
      </td>

      <td className="p-2 align-middle">IDKit</td>

      <td className="p-2 align-middle">
        Could not establish a connection to World App.
      </td>

      <td className="p-2 align-middle">
        Ask the user to check their internet connection on both devices running
        your application and World App. Additionally, make sure the user has the
        latest version of World App.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>verification\_rejected</code>
      </td>

      <td className="p-2 align-middle">Wallet Bridge</td>

      <td className="p-2 align-middle">
        User rejected the World ID request in World App.
      </td>

      <td className="p-2 align-middle">
        If this was a mistake, ask the user to go through the flow again.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>max\_verifications\_reached</code>
      </td>

      <td className="p-2 align-middle">Wallet Bridge</td>

      <td className="p-2 align-middle">
        This person has already verified for this particular action the maximum
        number of times allowed.
      </td>

      <td className="p-2 align-middle">
        Nothing to do. User cannot verify for this action again.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>credential\_unavailable</code>
      </td>

      <td className="p-2 align-middle">Wallet Bridge</td>

      <td className="p-2 align-middle">
        This user does not have the requested credential.
      </td>

      <td className="p-2 align-middle">
        The user must verify at the Orb or verify their unique device in World
        App to receive the credential required.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>malformed\_request</code>
      </td>

      <td className="p-2 align-middle">Wallet Bridge</td>

      <td className="p-2 align-middle">
        The request payload couldn't be decrypted or did not conform to the
        standard.
      </td>

      <td className="p-2 align-middle">
        Ensure IDKit is configured properly and all parameters are valid. See
        above for configuration details.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>invalid\_network</code>
      </td>

      <td className="p-2 align-middle">Wallet Bridge</td>

      <td className="p-2 align-middle">
        The application is configured for a different environment than the
        verifying user's client.
      </td>

      <td className="p-2 align-middle">
        Ensure you use the Worldcoin Simulator for Staging applications and
        World App for Production applications.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>inclusion\_proof\_failed</code>
      </td>

      <td className="p-2 align-middle">Wallet Bridge</td>

      <td className="p-2 align-middle">
        The sequencer returned an unexpected error when retrieving the inclusion
        proof.
      </td>

      <td className="p-2 align-middle">
        Ask the user to try again. This may be due to a temporary network issue,
        or a bug with World App or the Signup Sequencer.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>inclusion\_proof\_pending</code>
      </td>

      <td className="p-2 align-middle">Wallet Bridge</td>

      <td className="p-2 align-middle">
        The user might have the requested credential, but it is not available
        on-chain yet. It might be available for API verification.
      </td>

      <td className="p-2 align-middle">
        Ask the user to verify again in approximately one hour.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>metadata\_failed</code>
      </td>

      <td className="p-2 align-middle">Wallet Bridge</td>

      <td className="p-2 align-middle">
        Unable to load metadata for the app from the Developer Portal.
      </td>

      <td className="p-2 align-middle">
        Ensure your <code>app\_id</code> is configured correctly in IDKit and
        exactly matches the <code>app\_id</code> from the Developer Portal.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>unexpected\_response</code>
      </td>

      <td className="p-2 align-middle">IDKit</td>

      <td className="p-2 align-middle">
        There was a problem with the response obtained from the WLD app.
      </td>

      <td className="p-2 align-middle">
        Check the JS console for further details, though in most cases these
        will require contacting us to report the bug.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>generic\_error</code>
      </td>

      <td className="p-2 align-middle">Wallet Bridge or IDKit</td>
      <td className="p-2 align-middle">An unhandled exception occurred.</td>

      <td className="p-2 align-middle">
        Check the JS console for further details, though in most cases these
        will require contacting us to report the bug.
      </td>
    </tr>
  </tbody>
</table>

## Developer Portal API

These error codes are returned in the `error` property of the response body.

<table>
  <thead>
    <tr>
      <th className="p-2 text-left align-middle">Code</th>
      <th className="p-2 text-left align-middle">Description</th>
      <th className="p-2 text-left align-middle">How to fix?</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td className="p-2 align-middle">
        <code>required</code>
      </td>

      <td className="p-2 align-middle">
        The attribute named in the <code>attribute</code> property is required,
        but was not included in the request.
      </td>

      <td className="p-2 align-middle">
        Provide the required attribute in your API request.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>invalid\_format</code>
      </td>

      <td className="p-2 align-middle">
        The attribute named in the <code>attribute</code> property was provided,
        but was in an unexpected format.
      </td>

      <td className="p-2 align-middle">
        See the error message for the proper format.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>unauthenticated</code>
      </td>

      <td className="p-2 align-middle">
        The credentials (if provided) were invalid.
      </td>

      <td className="p-2 align-middle">
        Provide the required credentials in your API request and ensure they are
        correct.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>permission\_denied</code>
      </td>

      <td className="p-2 align-middle">
        The credentials provided were valid, but you do not have the required
        permissions.
      </td>

      <td className="p-2 align-middle">
        Contact your Developer Portal team's owner to be granted permissions, or
        the Worldcoin team if you are unable to resolve the issue.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>max\_verifications\_reached</code>
      </td>

      <td className="p-2 align-middle">
        This person has already verified for this particular action the maximum
        number of times allowed.
      </td>

      <td className="p-2 align-middle">
        Nothing to do. User cannot verify for this action again.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>invalid\_proof</code>
      </td>

      <td className="p-2 align-middle">
        The provided proof is invalid and it cannot be verified.
      </td>

      <td className="p-2 align-middle">
        Ensure your <code>app\_id</code>, <code>action</code>,{" "}
        <code>signal</code>, and <code>verification\_level</code> are unchanged
        between the proof request and proof verification.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>invalid\_merkle\_root</code>
      </td>

      <td className="p-2 align-middle">
        The merkle root provided is not recognized.
      </td>

      <td className="p-2 align-middle">
        Ask the user to generate a new proof, the existing proof may be stale.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>invalid\_network</code>
      </td>

      <td className="p-2 align-middle">
        The application is configured for a different environment than the
        verifying user's client.
      </td>

      <td className="p-2 align-middle">
        Ensure you use the Worldcoin Simulator for Staging applications and
        World App for Production applications.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>invalid\_engine</code>
      </td>

      <td className="p-2 align-middle">
        The application is configured for on-chain verification and cannot be
        verified via API.
      </td>

      <td className="p-2 align-middle">
        Either verify the proof on-chain or create a new application configured
        for Cloud verifications.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>metadata\_failed</code>
      </td>

      <td className="p-2 align-middle">
        Unable to load metadata for the app from the Developer Portal.
      </td>

      <td className="p-2 align-middle">
        Ensure your <code>app\_id</code> is configured correctly in IDKit and
        exactly matches the <code>app\_id</code> from the Developer Portal.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>action\_inactive</code>
      </td>

      <td className="p-2 align-middle">
        The requested action is disabled in the Developer Portal.
      </td>

      <td className="p-2 align-middle">
        Enable the action or create a new action.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>verification\_error</code>
      </td>

      <td className="p-2 align-middle">
        The Developer Portal faced an internal error verifying the proof.
      </td>

      <td className="p-2 align-middle">Contact the Worldcoin team.</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>internal\_error</code>
      </td>

      <td className="p-2 align-middle">
        The Developer Portal faced an internal error verifying the proof.
      </td>

      <td className="p-2 align-middle">Contact the Worldcoin team.</td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>unexpected\_response</code>
      </td>

      <td className="p-2 align-middle">
        There was a problem with the response obtained from the WLD app.
      </td>

      <td className="p-2 align-middle">
        Check the JS console for further details, though in most cases these
        will require contacting us to report the bug.
      </td>
    </tr>

    <tr>
      <td className="p-2 align-middle">
        <code>generic\_error</code>
      </td>

      <td className="p-2 align-middle">An unhandled exception occurred.</td>

      <td className="p-2 align-middle">
        Check the JS console for further details, though in most cases these
        will require contacting us to report the bug.
      </td>
    </tr>
  </tbody>
</table>


# IDKit Reference
Source: https://docs.world.org/world-id/reference/idkit



<Note>
  IDKit is open source and accepts contributions! Head over to [GitHub](https://github.com/worldcoin/idkit-js) and submit a pull request.
</Note>

There are three packages available in the IDKit Monorepo: `@worldcoin/idkit`, `@worldcoin/idkit-standalone`, and `@worldcoin/idkit-core`. The `@worldcoin/idkit` package is the main package that should be used with the React JS framework. The `@worldcoin/idkit-standalone` package is a standalone package that can be used in vanilla JavaScript applications. The `@worldcoin/idkit-core` package is a core functionality package that is used by the other two packages, and should be used only when creating a new IDKit package.

## IDKit (React)

The `@worldcoin/idkit` package is the main package that should be used with the [React framework](https://react.dev/) or any other framework that supports React components, such as [Next.JS](https://nextjs.org/).

### Components

#### `IDKitWidget`

The `IDKitWidget` component is the main component that renders the World ID widget. It should be mounted in your React app and passed the relevant parameters. Accepts a function as a child that receives an `open` function to open the widget.

```jsx
import { IDKitWidget } from '@worldcoin/idkit'

<IDKitWidget
	app_id="app_GBkZ1KlVUdFTjeMXKlVUdFT" // obtained from the Developer Portal
	action="vote_1" // this is your action name from the Developer Portal
	signal="user_value" // any arbitrary value the user is committing to, e.g. a vote
	onSuccess={onSuccess}
	verification_level="device" // minimum verification level accepted, defaults to "orb"
>
	{({ open }) => <button onClick={open}>Verify with World ID</button>}
</IDKitWidget>
```

### Parameters

The following parameters can be passed as props to the `IDKitWidget` component:

<Properties>
  <Property name="app_id" type="string" required={true}>
    Unique identifier for the app verifying the action. This should be the App ID obtained from the [Developer Portal](https://developer.worldcoin.org).
  </Property>

  <Property name="action" type="string" required={true}>
    Identifier for the action the user is performing. This should be the action name set in the Developer Portal.
  </Property>

  <Property name="onSuccess" type="function(ISuccessResult)" required={true}>
    Function to trigger when verification is successful and the modal is closed. Should receive a single parameter of type `ISuccessResult` which contains [the proof details.](#response)
  </Property>

  <Property name="handleVerify" type="function(ISuccessResult)">
    Called after the proof is returned from the user's identity wallet (e.g. World App), but before showing the success screen. Should receive a single parameter of type `ISuccessResult` which contains [the proof details.](#response) Throwing an error in this screen will show the user a custom error.

    <Note>`handleVerify` should be used for API proof verifications to create the best user experience. This will show a pending state while the proof is verified and present any errors thrown in a user-readable fashion.</Note>
  </Property>

  <Property name="onError" type="function(IErrorState)">
    Called when IDKit is closed after an error. Should receive a single parameter of type `IErrorState` which contains [the error details.](#error-handling)
  </Property>

  <Property name="verification_level" type="string" defaultValue="orb">
    The minimum verification level accepted. Can be `orb` or `device`. Defaults to `orb`. **TypeScript apps can use the `VerificationLevel` enum.**
  </Property>

  <Property name="signal" type="string" defaultValue="&#x22;&#x22;">
    The signal to be included in the zero-knowledge proof. Typically used for on-chain actions, read more in [the On-chain section](/world-id/id/on-chain).
  </Property>

  <Property name="bridge_url" type="string" defaultValue="&#x22;https://bridge.worldcoin.org&#x22;">
    The URL of the [Wallet Bridge](https://github.com/worldcoin/wallet-bridge) to use for establishing a connection between IDKit and the user's World ID Wallet. Defaults to the bridge service hosted by Worldcoin. **Only change this if you are running your own bridge service.** Read more in Protocol Internals.

    <Note type="warning">World App will temporarily prevent users from connecting to a Wallet Bridge that is not hosted by Worldcoin or Tools for Humanity while security reviews are ongoing, so we **recommend using the default value** by leaving the `bridge_url` parameter undefined.</Note>
  </Property>

  <Property name="autoClose" type="boolean" defaultValue="true">
    Whether to automatically close the widget after completion. Defaults to `true`.
  </Property>

  <Property name="advanced" type="JSON">
    A JSON object containing advanced configuration options that may be unstable or subject to change. See [Advanced Configuration](#advanced-configuration) for more details.
  </Property>
</Properties>

### Hooks

#### `useIDKit`

The `useIDKit` hook allows you to programmatically open the IDKit widget without mounting any buttons on screen. Note that you still need to mount the component for this to work.

```jsx focus=1,3,6,11
import { IDKitWidget, useIDKit } from '@worldcoin/idkit'

const { open, setOpen } = useIDKit()

useEffect(() => {
	setOpen(true)
}, [])

return (
	<div>
		<IDKitWidget app_id="..." action="..." />
	</div>
)
```

#### `useSession`

The `useSession` hook provides a React-friendly way to handle World ID verification sessions with full control over the UI. It automatically manages session creation and polling for verification updates.

```jsx
import { useSession, VerificationState } from '@worldcoin/idkit'

const { status, sessionURI, result, errorCode, reset } = useSession({
	app_id: 'app_staging_12345',
	action: 'login',
	signal: 'user_123',
})

if (status === VerificationState.WaitingForConnection && sessionURI) {
	return <QRCodeSVG value={sessionURI} />
}

if (status === VerificationState.Confirmed && result) {
	return <div>Verification successful!</div>
}
```

**Parameters:**

<Properties>
  <Property name="config" type="UseSessionConfig" required={true}>
    Same configuration options as IDKitWidget
  </Property>
</Properties>

**Returns (UseSessionResult):**

<Properties>
  <Property name="status" type="VerificationState">
    Current verification state
  </Property>

  <Property name="sessionURI" type="string | null">
    QR code URI for users to scan
  </Property>

  <Property name="result" type="ISuccessResult | null">
    Verification result if successful
  </Property>

  <Property name="errorCode" type="AppErrorCodes | null">
    Error code if verification failed
  </Property>

  <Property name="reset" type="() => void">
    Function to reset the session and start over
  </Property>
</Properties>

**Verification States:**

<Properties>
  <Property name="PreparingClient" type="VerificationState">
    Initializing session
  </Property>

  <Property name="WaitingForConnection" type="VerificationState">
    Ready for QR code scan
  </Property>

  <Property name="WaitingForApp" type="VerificationState">
    Waiting for user to verify
  </Property>

  <Property name="Confirmed" type="VerificationState">
    Verification completed successfully
  </Property>

  <Property name="Failed" type="VerificationState">
    Verification failed
  </Property>
</Properties>

### Functions

#### `verifyCloudProof`

The `verifyCloudProof` function is used to verify a proof returned from the user's identity wallet (e.g. World App) against the Developer Portal API. This function is useful for verifying proofs on the server side.

<Properties>
  <Property name="proof" type="ISuccessResult" required={true}>
    The proof object returned from IDKit.
  </Property>

  <Property name="app_id" type="app_${string}" required={true}>
    The app\_id obtained from the Developer Portal.
  </Property>

  <Property name="action" type="string" required={true}>
    The action id from the Developer Portal.
  </Property>

  <Property name="signal" type="string" defaultValue="&#x22;&#x22;">
    The signal as input to IDKit.
  </Property>

  <Property name="endpoint" type="URL | string" defaultValue="https://developer.worldcoin.org/api/v2/verify/${app_id}">
    The endpoint to send the proof to for verification. Defaults to the Worldcoin Developer Portal.
  </Property>
</Properties>

```ts {{ title: 'verifyCloudProof' }}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { proof, action, signal } = req.body
    const app_id = process.env.APP_ID
	const response = (await verifyCloudProof(proof, app_id, action, signal)) as IVerifyResponse
	res.status(response.success ? 200 : 400).json(response)
}
```

### Types

#### `ISuccessResult`

<Properties>
  <Property name="merkle_root" type="string">
    This is the hash pointer to the root of the Merkle tree that proves membership of the user's identity in the
    list of identities verified by the Orb. ABI encoded.
  </Property>

  <Property name="nullifier_hash" type="string">
    Essentially the user's unique identifier for your app (and specific action if using Incognito Actions). ABI
    encoded.
  </Property>

  <Property name="proof" type="string">
    The Zero-knowledge proof of the verification. ABI encoded.
  </Property>

  <Property name="verification_level" type="&#x22;orb&#x22; | &#x22;device&#x22;">
    Either `orb` or `device`. Returns the verification level used to generate the proof.
  </Property>

  <Property name="credential_type" type="&#x22;orb&#x22; | &#x22;device&#x22;" deprecated={true}>
    Either `orb` or `device`. Will always return the strongest credential with which a user has been verified.

    <Note type="warning">This property is deprecated and will be removed in a future release. Use `verification_level` instead.</Note>
  </Property>
</Properties>

```json {{ title: 'ISuccessResult' }}
{
	"merkle_root": "0x1f38b57f3bdf96f05ea62fa68814871bf0ca8ce4dbe073d8497d5a6b0a53e5e0",
	"nullifier_hash": "0x0339861e70a9bdb6b01a88c7534a3332db915d3d06511b79a5724221a6958fbe",
	"proof": "0x063942fd7ea1616f17787d2e3374c1826ebcd2d41d2394...",
	"verification_level": "orb"
}
```

#### `IErrorState`

<Properties>
  <Property name="code" type="string">The error code.</Property>

  <Property name="detail" type="string">
    A human-readable description of the error.
  </Property>
</Properties>

```json {{ title: 'IErrorState' }}
{
	"code": "already_signed",
	"detail": "User has previously signed and submitted proof for this action."
}
```

#### `IVerifyResult`

<Properties>
  <Property name="success" type="boolean">If the proof verification succeeded.</Property>
  <Property name="code" type="string | undefined">The error code.</Property>

  <Property name="detail" type="string | undefined">
    A human-readable description of the error.
  </Property>

  <Property name="attribute" type="string | null | undefined">The attribute causing the error.</Property>
</Properties>

```json {{ title: 'IVerifyResult' }}
{
    "success": false,
	"code": "invalid_proof",
	"detail": "The provided proof is invalid and it cannot be verified. Please check all inputs and try again.",
    "attribute": null,
}
```

### Error Handling

An error in IDKit will generally be returned as the input to the `onError` callback. IDKit will display an error to the user and call the `onError` callback with an `IErrorState` object when the modal is closed.

<Note>View the [Errors Reference](/world-id/reference/errors) for assistance when troubleshooting.</Note>

## IDKit Standalone

The `@worldcoin/idkit-standalone` package is intended for vanilla JS applications. It is a standalone package that acts as a wrapper around the `@worldcoin/idkit` package.

### Methods

<Note>
  The `.init()` and `.update()` methods take the same parameters as the React package's IDKitWidget component. See [above](#parameters) for more details.
</Note>

#### .init()

The `.init()` method is the main initialization method used for vanilla JS apps. It should be called to start up IDKit and configure the widget.

```js
import { IDKit } from '@worldcoin/idkit-standalone'

const onSuccess = (result) => {
	// handle success
}

IDKit.init({
	app_id: 'app_lshSNnaJfdt6Sohu6YAA',
	action: 'my_action',
	onSuccess: onSuccess,
})
```

#### .update()

The `.update()` method reinitializes the widget with new parameters. It can only be called after the `.init()` method.

```js
IDKit.update({
	app_id: 'app_lshSNnaJfdt6Sohu6YAA',
	action: 'my_new_action',
	onSuccess: onSuccess,
})
```

#### .open()

The `.open()` method is used to open the widget. It can only be called after the `.init()` method, typically in response to a button click.

This method returns a Promise object that will resolve when the `onSuccess` callback is called, or reject when the `onError` callback is called.

```js
IDKit.open()
```

### Session API

#### `IDKitSession`

The `IDKitSession` object provides a session-based approach to World ID verification with full control over the verification flow. Unlike the widget approach, this gives you complete control over UI and state management.

```jsx
import { IDKitSession, VerificationState } from '@worldcoin/idkit'

// Create a session
await IDKitSession.create({
	app_id: 'app_staging_12345',
	action: 'login',
	signal: 'user_123',
})

// Get QR code URI
const sessionURI = IDKitSession.getURI()

// Poll for updates
const status = await IDKitSession.pollStatus()
if (status.state === VerificationState.Confirmed) {
	console.log('Verification successful!', status.result) // Verify the proof in your backend
}

// Clean up
IDKitSession.destroy()
```

#### `IDKitSession.create(config)`

Creates a new World ID verification session. If a session already exists, it will be destroyed and replaced.

<Properties>
  <Property name="config" type="IDKitConfig" required={true}>
    Same configuration options as IDKitWidget
  </Property>
</Properties>

**Returns:** Promise that resolves when session is created

#### `IDKitSession.getURI()`

Gets the current session URI for QR code generation.

**Returns:** `string | null` - The session URI or null if no active session

#### `IDKitSession.pollStatus()`

Polls for verification updates and returns current session status.

**Returns:** Promise with `SessionStatus` object

<Properties>
  <Property name="state" type="VerificationState">
    Current verification state
  </Property>

  <Property name="result" type="ISuccessResult | null">
    Verification result if successful
  </Property>

  <Property name="errorCode" type="AppErrorCodes | null">
    Error code if verification failed
  </Property>

  <Property name="sessionURI" type="string | null">
    Session URI for QR code generation
  </Property>
</Properties>

#### `IDKitSession.destroy()`

Destroys the current session and cleans up resources.

**Returns:** `void`

#### `IDKitSession.isActive`

Property that returns whether there's an active session.

**Returns:** `boolean`

```jsx
if (IDKitSession.isActive) {
	const status = await IDKitSession.pollStatus()
}
```

## Advanced configuration

This section outlines advanced configuration options that may be unstable or subject to change. These options are passed as a JSON object to the `advanced` prop of the `IDKitWidget` component.

### Self-Hosted Applications

Self-hosted applications bypass the Worldcoin Developer Portal entirely. The proof returned **can not be verified by the Developer Portal API.** Instead, you must verify the proof on-chain or with a custom prover service.

When using self-hosted mode, no `app_id` is required, and any value passed to IDKit will be ignored. The `action` you set must have sufficient uniqueness to avoid collisions with other applications. We recommend using a prefix that includes your application name, e.g. `your_app_name_vote_1`.

```jsx
import { IDKitWidget } from '@worldcoin/idkit'

<IDKitWidget
	// no app_id is set for self-hosted applications
	action="your_app_name_vote_1" // this is your action, set to whatever you'd like
	signal="user_value"
	onSuccess={onSuccess}
	verification_level="orb" // only orb verifications are supported for self-hosted applications
	advanced={{
		self_hosted: true // enable the self-hosted mode
	}}
>
	{({ open }) => <button onClick={open}>Verify with World ID</button>}
</IDKitWidget>
```


# Sign In Reference
Source: https://docs.world.org/world-id/reference/sign-in



<Warning>**Deprecation Notice**: Sign in with World ID v1 has been deprecated and will be shut down on **December 12, 2025**. Read more in the [announcement](/world-id/sign-in/deprecation).</Warning>

<Note>Sign in with World ID uses a different base API endpoint than the Developer Portal.</Note>

**Base domain**

```
https://id.worldcoin.org
```

<Note>
  This page primarily describes options that are OIDC-compliant. We additionally support using access tokens as described in the OAuth2 standards. No actions can be taken on behalf of a user with OAuth2 access tokens, but you may retrieve the same information about a user as would be contained in an `id_token`. [See below for details.](#oauth2)
</Note>

## OpenID Connect discovery

**GET** `/.well-known/openid-configuration`

Fetches the OpenID Connect discovery document.

### Common Errors

* `method_not_allowed`: HTTP method is not allowed. Only GET and OPTIONS may be used

```bash title="cURL"
curl https://id.worldcoin.org/.well-known/openid-configuration
```

```json title="Response"
{
    "issuer": "https://id.worldcoin.org",
    "authorization_endpoint": "https://id.worldcoin.org/authorize",
    "token_endpoint": "https://id.worldcoin.org/token",
    "userinfo_endpoint": "https://id.worldcoin.org/userinfo",
    "jwks_uri": "https://id.worldcoin.org/jwks",
    "scopes_supported": ["openid", "email", "profile"],
    "response_types_supported": ["code", "id_token", "id_token token", "code id_token"],
    "grant_types_supported": ["authorization_code", "implicit"],
    "subject_types_supported": ["pairwise"],
    "id_token_signing_alg_values_supported": ["RSA"]
}
```

## Authorize

**GET** `/authorize`

Redirect your users to this page to begin the sign-in flow.

### Required attributes

All attributes are formatted as URL query parameters.

| Parameter       | Type     | Description                                                                                                                                                                                                                           |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `response_type` | `string` | Must be `code` for authorization code flow, `id_token` for implicit flow, or a space-separated combination of `code`, `id_token`, and `token` for hybrid flow. We generally recommend using the authorization code or implicit flows. |
| `scope`         | `string` | Space-separated list of the requested OIDC scopes. Must include `openid`, and may optionally include `email` and `profile`.                                                                                                           |
| `client_id`     | `string` | The Client ID of your app. Get this from the Developer Portal.                                                                                                                                                                        |
| `redirect_uri`  | `string` | URL the user will be redirected to after authentication. Must match one of your app's configured `redirect_uris`.                                                                                                                     |

### Optional attributes

| Parameter       | Type     | Description                                                                                                                                                                                                                                                                       |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `state`         | `string` | An opaque value used to maintain state between the request and the callback.                                                                                                                                                                                                      |
| `nonce`         | `string` | **Required when using the implicit flow.** Used to prevent replay attacks. Should be randomly generated for each sign-in, and checked to ensure it's unchanged after the callback.                                                                                                |
| `response_mode` | `string` | Determines how the authorization code, ID token, and/or access token are returned. Must be one of `query`, `fragment`, or `form_post`. `query` is only supported for the authorization code flow. Defaults to `query` for authorization code flow, and `fragment` for all others. |

### Common Errors

* `required`: A necessary attribute was not set. Required attributes are: `response_type scope client_id redirect_uri`
* `invalid_redirect_uri`: The provided redirect URI is invalid. Ensure you've set the correct `redirect_uri` in the Developer Portal.

```http title="Request"
https://id.worldcoin.org/authorize?redirect_uri=https%3A%2F%2Fdocs.worldcoin.org%2Fworld-id%2Ftry-callback&response_type=code&scope=openid+profile+email&client_id=app_ce4cb73cb75fc3b73b71ffb4de178410
```

```http title="Response - Authorization Code"
https://example.app/api/auth/callback/worldcoin?code=e777d780f437330bbd79535b
```

```http title="Response - ID Token"
https://example.app/api/auth/callback/worldcoin#id_token=eyJhbGciOiJSUzI1NiIsInR5cCI6I...
```

## Exchange Code

**POST** `/token`

Exchanges an authorization code for an `id_token` for the given user.

### Required attributes

| Parameter      | Type     | Description                                                  |
| -------------- | -------- | ------------------------------------------------------------ |
| `code`         | `string` | The authorization code to exchange.                          |
| `grant_type`   | `string` | The type of grant to exchange. Must be `authorization_code`. |
| `redirect_uri` | `string` | The same redirect URI used in the `/authorize` request.      |

### Common Errors

* `method_not_allowed`: HTTP method is not allowed. Only POST and OPTIONS may be used
* `invalid_content_type`: The provided content type is invalid, only `application/x-www-form-urlencoded` is supported
* `unauthenticated`: The provided authorization token is invalid, try checking your credentials
* `invalid_grant_type`: The provided grant type is invalid, only `authorization_code` is supported
* `required`: A necessary attribute was not set. Required attributes are: `code`
* `invalid_grant`: The authorization code was invalid, and may be expired. Try generating a new code via `/authorize`

```shell title="cURL"
curl -X POST https://id.worldcoin.org/token \
     -H "Authorization: Basic YXBwXzU1MGU4MjkwODJmYzU1OGUxMTJlMDYyMGMxYzdhNT..." \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "code=23e5edda0f731dfdddace390&grant_type=authorization_code&redirect_uri=https%3A%2F%2Fdocs.worldcoin.org%2Fapi%2Fauth"
```

```js
const data = new URLSearchParams()
data.append('code', '23e5edda0f731dfdddace390')
data.append('grant_type', 'authorization_code')
data.append('redirect_uri', 'https://docs.worldcoin.org/api/auth')

fetch('https://id.worldcoin.org/token', {
	method: 'POST',
	headers: {
		Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	body: data,
})
```

```json title="Response"
{
	"access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6Imp3a1.ey8yZmVi.ZjY3MDc3N2UyY2NlNzY5YzUxOG...",
	"token_type": "Bearer",
	"expires_in": 3600,
	"scope": "openid",
	"id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6Imp3a1.ey8yZmVi.ZjY3MDc3N2UyY2NlNzY5YzUxOG..."
}
```

## OAuth2

If you selected `token` as one of your `response_types` for the `/authorize` endpoint, you'll receive an OAuth2 access token. Typically an access token would allow you to perform certain actions on a user's behalf, but there are no actions to perform for a user in this case.
You can retrieve the same information about a user with an access token as you'd receive in an ID token. While we support this functionality for broader compatibility, we generally recommend using the authorization code or implicit flows, rather than the hybrid flow.

The endpoints below are only used with an OAuth2 access token.

## Introspect

**POST** `/introspect`

Validates the given access token is active for the user.

<Note>
  For introspect, [Basic Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#basic_authentication_scheme) is used. The `Authorization` header contains the word "Basic ", followed by a base64 encoding of the "client\_id:client\_secret" values. You obtain your client\_id (also called app\_id) and client\_secret from the Developer Portal.
</Note>

### Required attributes

| Parameter | Type     | Description                   |
| --------- | -------- | ----------------------------- |
| `token`   | `string` | The access token to validate. |

### Common Errors

* `method_not_allowed`: HTTP method is not allowed. Only POST may be used
* `invalid_content_type`: The provided content type is invalid, only `application/x-www-form-urlencoded` is supported
* `required`: A necessary attribute was not set. Required attributes are: `token`
* `unauthenticated`: The authorization header is missing, please pass the Bearer authorization token
* `invalid_token`: The authorization token was invalid, and may be expired. Try generating a new token via `/token`

```shell title="cURL"
curl -X POST https://id.worldcoin.org/introspect \
  -H "Authorization: Basic YXBwXzU1MGU4MjkwODJmYzU1OGUxMTJlMDYyMGMxYzdhNT..." \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "token=eyJhbGciOiJSUzI1NiIsImtpZCI6Imp3a18yZmViZjY3MDc3N2UyY2NlNzY5YzUxOGM3MDNkNTNjMStN..."
```

```js
fetch('https://id.worldcoin.org/introspect', {
	method: 'POST',
	headers: {
		Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	body: new URLSearchParams({ token }),
})
```

```json title="Response"
{
	"active": true,
	"client_id": "app_staging_7550e829082fc558e112e0620c1c7a59",
	"exp": 1678330528,
	"sub": "0x2ae86d6d747702b3b2c81811cd2b39875e8fa6b780ee4a207bdc203a7860b535"
}
```

## Get User Info

**POST** `/userinfo`

Retrieves all user information, based on the approved scopes, with the given access token.

<Note>
  For userinfo, [Bearer Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#bearer_authentication_scheme) is used. The `Authorization` header contains the word "Bearer ", followed by the access token returned from the `/token` endpoint.
</Note>

### Common Errors

* `method_not_allowed`: HTTP method is not allowed. Only GET, POST, and OPTIONS may be used
* `unauthenticated`: The authorization header is missing, please pass the Bearer authorization token
* `invalid_token`: The authorization token was invalid, and may be expired. Try generating a new token via `/token`

```shell title="cURL"
curl -X POST https://id.worldcoin.org/userinfo \
-H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZ.eyCI6I.mp3a18yZmViZjY3MDc3N2UyY2NlN..."
```

```js
fetch('https://id.worldcoin.org/userinfo', {
	method: 'POST',
	headers: {
		Authorization: `Bearer ${access_token}`,
	},
})
```

```json title="Response"
{
	"sub": "0x2ae86d6d747702b3b2c81811cd2b39875e8fa6b780ee4a207bdc203a7860b535",
	"https://id.worldcoin.org/beta": { // deprecated, will be removed in the future
		"likely_human": "strong",
		"credential_type": "orb"
	},
  "https://id.worldcoin.org/v1": {
    "verification_level": "orb", // "orb" or "device"
  },
  // if `email` scope is included:
	"email": "0x2ae86d6d747702b3b2c81811cd2b39875e8fa6b780ee4a207bdc203a7860b535@id.worldcoin.org", 
  // if `profile` scope is included:
	"name": "World ID User",
	"given_name": "World ID",
	"family_name": "User"
}
```


# OIDC Explainer
Source: https://docs.world.org/world-id/sign-in/oidc



<Warning>**Deprecation Notice**: Sign in with World ID v1 has been deprecated and will be shut down on **December 12, 2025**. Read more in the [announcement](/world-id/sign-in/deprecation).</Warning>

The following diagram outlines the general authentication flow for an integrating app:

<img src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/sign-in.svg?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=20969bffdd6d16737a081bd092c72224" alt="A diagram showcasing the main authentication flow" data-og-width="684" width="684" data-og-height="655" height="655" data-path="images/docs/id/sign-in.svg" data-optimize="true" data-opv="2" srcset="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/sign-in.svg?w=280&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=0c4dcb71e9330085b3a1308598c07b21 280w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/sign-in.svg?w=560&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=ec6cb53ffc82bc8d858ef282bb193da3 560w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/sign-in.svg?w=840&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=48bcaa4897ea97ae54762f3b38cfb7e4 840w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/sign-in.svg?w=1100&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=33b7c65d3ce509f9fb79a0d43ae0368f 1100w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/sign-in.svg?w=1650&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=e437236b532ead818a8eb9595be3f5a3 1650w, https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/id/sign-in.svg?w=2500&fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=4fa72aca75109b2252e9e1af5f16d885 2500w" />

## Registration

Before OIDC authentication can take place, developers must register their applications with Worldcoin. This is a one-time action. You can create a new application on the [Developer Portal](https://developer.worldcoin.org).

During registration, you will need to provide the following values:

* Redirect URIs: **Required**, list of approved websites the user can be redirected to after successful authentication.
* App name (also called client name): **Optional**, the name of the application that's displayed to users

<Note>
  All redirect URIs must be over HTTPS, and contain no port numbers or URL fragments. For example, `https://app.example.com/login` is valid, but `https://app.example.com:3000/login` is not. Similarly, `https://app.example.com/login#foo` is not valid, but `https://app.example.com/login?foo=bar` is.
</Note>

After registration is complete, you will have a valid `app_id` that will be needed for every other step in the authentication process. This value is equivalent to `client_id` from the [OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest)

## Flows

World ID supports the [authorization code](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth), [implicit](https://openid.net/specs/openid-connect-core-1_0.html#ImplicitFlowAuth), and [hybrid](https://openid.net/specs/openid-connect-core-1_0.html#HybridFlowAuth) flows from the OIDC spec. Applications can use any one of these flows to authenticate users.

*Generally*, applications should implement the authorization code flow, as it is more secure than the implicit flow. Applications without backend servers (that may be running purely client-side) are more suited to implicit authentication.

## Authentication

Authentication begins with a request to the `/authorize` endpoint.

When using the native Sign in with World ID page, most of the OIDC process is handled for you. You can begin the authentication cycle by redirecting your users to:

```
https://id.worldcoin.org/authorize?client_id={app_id}&response_type={code|token|id_token}&redirect_uri={encoded_redirect_url}&scope={scope}&state={state_value}&nonce={nonce_value}
```

Example values could be:

* `client_id`: obtained from the Developer Portal (example: `app_lshSNnaJfdt6Sohu6YAA`).
* `response_type`: response type as specified in OIDC spec, remember to URL encode (example: `code%20id_token`).
* `redirect_uri`: where the user is redirected upon successful authentication. Must be on the approved redirect URI list which can always be updated in the Developer Portal (example: `https%3A%2F%2Fapp.example.com%2Flogin`).
* `scope`: space-separated list of scopes to request. Defaults to `openid` if not provided. (example: `openid%20profile%20email`).
* `state`: unique value used to track a user's session (example: `session_102030405060708090`).
* `nonce`: random value to prevent replay attacks (example: `z-dkEmoy_ujfk7B8uTiQpp`). Required when using the `id_token` response type.

The user will then authenticate with their World ID via the World app. Once successfully authorized, the user is redirected back to your application. The redirect URL will contain a number of values, depending on the flow you are using.

### Redirect Responses

If using the default authorization code flow, the redirect URL will contain the following params:

* `code`: An authorization code that can be exchanged for an ID token
* `state`: The optional state value passed to the `/authorize` endpoint

If you received a response containing an *authorization code*, you must exchange it for an ID token on the `/token` endpoint. Request details can be [seen here](/world-id/reference/sign-in#exchange-code).

If using implicit flow, the redirect URL will contain the following params:

* `id_token`: A signed JWT identifying the user, and any requested scope information

<Warning>ID tokens must always be verified, and should not be blindly accepted! Additionally, you must validate that the `nonce` within the ID token matches the nonce you provided.</Warning>

To verify an ID token, fetch the public key from the `/jwks` endpoint. You can read more about this process at the [Auth0 blog](https://auth0.com/blog/navigating-rs256-and-jwks/) or [JWT.io](https://jwt.io/), but one example method could be:

```ts
import * as jose from 'jose'

const verifyJwt = (token: string) => {
	const JWKS = jose.createRemoteJWKSet(new URL('https://id.worldcoin.org/jwks.json'))

	const { payload, header } = await jose.jwtVerify(token, JWKS, {
		issuer: 'https://id.worldcoin.org',
		aud: 'app_lshSNnaJfdt6Sohu6YAA',
	})

	return payload
}

verifyJwt('eyJhbGciOiJSUzI1NiIsInR5cCI6Ikp.eyAs.XVCJ9...')
```


