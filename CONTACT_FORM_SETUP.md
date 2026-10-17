# Contact form delivery

The contact form posts only to the server-side Worker at `POST /api/contact`.
The Worker validates the request, ignores its hidden bot field, then sends the
message through Resend. The browser never receives the Resend API key.

## Details you need to provide

1. A Resend API key with permission to send email.
2. Verification of `witunimelb.org.au` in Resend. The Worker sends from
   `Women in Tech <info@witunimelb.org.au>`.
3. The inbox that receives contact messages.
4. A Cloudflare account with permission to deploy the supplied Worker.

## Local development

1. Copy `.dev.vars.example` to `.dev.vars` and fill in the Resend key and contact inbox.
2. Copy `.env.example` to `.env.local` and set `VITE_CONTACT_API_URL` to
   `http://localhost:8787/api/contact`.
3. Start the Worker with `npx wrangler dev`, then start the site with `npm run dev`.

## Deployment

1. Sign in to Cloudflare with `npx wrangler login`.
2. Set the Worker secrets with `npx wrangler secret put` for `RESEND_API_KEY`
   and `CONTACT_TO_EMAIL`.
3. Deploy with `npx wrangler deploy`.
4. The deployed endpoint is `https://wit-contact-api.women-in-ict-unimelb.workers.dev/api/contact`.
   It is the default in the site code; `VITE_CONTACT_API_URL` can override it later.

Do not commit `.dev.vars`, `.env`, or `.env.local`.
