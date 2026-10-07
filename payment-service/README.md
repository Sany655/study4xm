# Study4XM payment service

This folder is a standalone Vercel project for AamarPay checkout, transaction verification, and referrals. It uses Firebase Authentication to authenticate API calls and Firebase Admin to read and update Firestore. Payment credentials and Firebase service-account credentials are server-side Vercel environment variables only.

## Deploy on Vercel

1. Import this repository in Vercel and set **Root Directory** to `payment-service`. Use the Node.js runtime (Node 20 or newer).
2. Add these environment variables in Vercel for Preview and Production:
   - `FIREBASE_PROJECT_ID`: the Firebase project ID.
   - `FIREBASE_CLIENT_EMAIL`: the service account client email.
   - `FIREBASE_PRIVATE_KEY`: the service account private key, including its PEM boundaries. In Vercel, paste the multiline key or use `\n` line breaks.
   - `AAMARPAY_STORE_ID`: the store ID issued for the selected AamarPay environment.
   - `AAMARPAY_SIGNATURE_KEY`: the matching signature key.
   - `AAMARPAY_MODE`: `sandbox` while testing; set to `live` only after live credentials have been issued.
   - `PUBLIC_APP_URL`: the public Study4XM site URL, for example `https://study4xm.web.app`.
   - `PAYMENT_SERVICE_URL`: the stable HTTPS origin of this Vercel deployment, for example `https://study4xm-payments.vercel.app` (no path).
3. Deploy, then set the frontend build variable `VITE_PAYMENT_CHECKOUT_API` to `https://<your-vercel-domain>/api/create` and rebuild/redeploy the frontend.
4. In sandbox, test checkout success, failure, cancellation, and status polling. Confirm that a user receives Premium only after server-side transaction verification.
5. Only after AamarPay approves the merchant, replace sandbox credentials with live credentials and set `AAMARPAY_MODE=live`.

The Vercel API routes are `/api/create`, `/api/status`, `/api/referrals`, and `/api/aamarpay/callback`. The callback URL must be publicly reachable. Never use sandbox credentials for real transactions or commit service-account/payment secrets.

This service intentionally does not enable checkout just because it is deployed: the frontend provider stays unavailable until its build includes `VITE_PAYMENT_CHECKOUT_API`.
