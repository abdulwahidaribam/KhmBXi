# KhmBXi

KhmBXi is an early-stage prototype exploring a simpler website deployment workflow. The current code is a Next.js app with Clerk sign-in and an authenticated static-website ZIP upload flow.

## Current implementation

The code currently includes:

- Clerk sign-in and sign-up pages, with the workspace and upload endpoint protected by authentication.
- A workspace form that accepts a project name and a ZIP file intended to contain a root-level `index.html`.
- Server-side checks for the ZIP extension and signature, a 10 MB compressed file limit, up to 5,000 archive entries, a 100 MB uncompressed size limit, a root `index.html`, and basic unsafe-path checks.
- Local saving of accepted ZIP archives under `data/uploads/` using generated IDs.

**Uploading a ZIP does not deploy or serve the website.** The project list is browser-only placeholder state, there is no database or durable project record, and the deployment count is not connected to a deployment system. The uploaded archive is saved on the server's local disk and has no automatic cleanup yet.

This is a development prototype, not a production deployment service. The upload-size check currently happens after the multipart request is parsed, and storage quotas and retention cleanup are not implemented. Do not expose it to untrusted users or upload sensitive site data until those limits are addressed.

## Run locally

You need Node.js and npm. Authentication requires Clerk development keys.

1. Install dependencies:

   ```powershell
   npm ci
   ```

2. Copy the example environment file and add your own Clerk keys:

   ```powershell
   Copy-Item .env.example .env.local
   ```

   Set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` in `.env.local`. Keep that file private; it is ignored by Git.

3. Start the development server:

   ```powershell
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) and sign in through Clerk.

Available checks from `package.json`:

```powershell
npm run lint
npm run build
```

There is no automated test script yet. These commands are documented from the project configuration; they have not been run as part of this repository preparation.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the current setup and pull request guidance. Report security concerns using [SECURITY.md](SECURITY.md), not a public issue. The proposed development sequence is in [docs/ROADMAP.md](docs/ROADMAP.md).

## License

KhmBXi is licensed under the [MIT License](LICENSE). Third-party components and assets remain subject to their own licenses.
