# Security Policy

## Supported versions

No application release has been published yet. Once releases are available, supported versions and their security update policy will be listed here.

## Current prototype limits

The app accepts ZIP uploads from signed-in users and saves accepted archives to local disk. It does not deploy or serve those sites, and it does not yet have storage quotas or automatic archive cleanup. The upload size check also happens after the multipart request has been parsed. Do not use this prototype for production traffic or sensitive site data until request limits and storage handling are hardened.

## Reporting a vulnerability

Please do not report suspected vulnerabilities in a public issue or pull request.

Private vulnerability reporting is enabled for the GitHub repository. Open the repository's **Security and quality** tab and choose **Report a vulnerability**. If that option is unavailable, contact the maintainer through a private contact method listed on the [maintainer's GitHub profile](https://github.com/abdulwahidaribam).

Include the affected commit or version, the impact, and clear reproduction steps where possible. Do not include live credentials, personal data, or secrets in a report. The maintainer will make a reasonable effort to review reports, but no response-time commitment is made at this early stage.
