# KhmBXi Roadmap

This is a proposed sequence of milestones, not a delivery promise. Checkboxes describe work present in the repository or still outstanding; they do not imply user adoption.

## 1. Establish the project baseline

- [x] Publish the initial public repository and enable private vulnerability reporting.
- [x] Review the existing Next.js source and import it without copying local secrets, dependencies, or build output.
- [x] Document the current implementation, local setup, and available lint/build commands from the project configuration.
- [ ] Verify setup and build from a clean checkout.
- [ ] Review the provenance and licensing of all source files and assets.

## 2. Complete a real first deployment path

- [x] Provide authenticated ZIP upload and basic archive validation in the prototype.
- [ ] Store project records persistently and associate them with the correct account.
- [ ] Safely process an accepted static website archive and make the site reachable at a preview URL.
- [ ] Show real upload, build, and deployment states instead of placeholder counts and browser-only project state.
- [ ] Document supported archive structure, limits, and recovery steps.

## 3. Prepare for limited external use

- [ ] Enforce request-size limits before multipart parsing and add storage quotas and automatic cleanup.
- [ ] Review isolation, access control, secret handling, and data deletion for the deployment design.
- [ ] Add automated checks and tests that match the implementation.
- [ ] Publish a first version only after another person can follow the documented setup and verify the supported path.
- [ ] Use issues and feedback to prioritize fixes; describe adoption only when there is evidence for it.

## 4. Extend based on evidence

After the first deployment path is reliable, consider additional deployment targets, custom domains, team workflows, or scaling work if user feedback and maintenance capacity justify them. These are possibilities, not committed features.
