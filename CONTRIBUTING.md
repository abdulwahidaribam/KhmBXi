# Contributing to KhmBXi

Thanks for your interest in KhmBXi. The project is an early prototype, so please check the current implementation and roadmap before proposing a large change.

## Before you start

- Open an issue before substantial work so the intended behavior can be discussed.
- For a possible security vulnerability, follow [SECURITY.md](SECURITY.md). Do not report it in a public issue.
- Do not include `.env.local`, credentials, private site archives, or generated upload data in a pull request.

## Local setup

Follow the setup steps in [README.md](README.md). In short, install dependencies with `npm ci`, create `.env.local` from `.env.example`, add your own Clerk development keys, then run `npm run dev`.

Before opening a pull request, run the available checks when possible:

```powershell
npm run lint
npm run build
```

There is no automated test script configured yet. In your pull request, list the checks you ran and their results, or say why you could not run them.

## Pull requests

Please keep each change focused and include:

- A short explanation of the problem and proposed change.
- A link to a related issue, when there is one.
- Documentation updates when behavior or setup instructions change.
- Any relevant limitations or follow-up work.

Do not include credentials, private data, or unrelated formatting changes. Be respectful and follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Review

The project currently has one maintainer. Reviews are handled as time allows; no response or merge timeline is promised. A change may be declined or revised if it falls outside the confirmed project scope.
