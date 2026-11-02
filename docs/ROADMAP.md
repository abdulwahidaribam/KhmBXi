# KhmBXi Roadmap

This is a proposed sequence of milestones, not a delivery promise. The project is at the repository-preparation stage; the roadmap will be revised after the existing source and intended scope are confirmed.

## 1. Establish the project baseline

- [x] Add initial licensing, contribution, security, and community documents to the local repository scaffold.
- [ ] Create the dedicated public repository and confirm repository settings.
- [ ] Review the existing project source and its provenance before bringing code into this repository.
- [ ] Choose the canonical source layout and toolchain based on the code that actually exists.
- [ ] Document and verify the local setup and checks against that source.

## 2. Define a narrow first release

- [ ] Identify the first user and the smallest website-deployment use case KhmBXi will support.
- [ ] Write down supported inputs, runtime limits, deployment lifecycle, and what is explicitly out of scope.
- [ ] Build one end-to-end deployment path in a controlled environment and make its status and failures understandable.
- [ ] Document the setup, limitations, and recovery or cleanup steps for that path.

## 3. Prepare for limited external use

- [ ] Review isolation, access control, secret handling, resource limits, and data cleanup for the chosen implementation.
- [ ] Add automated checks that match the real code and document how contributors run them.
- [ ] Publish a first version only after another person can follow the documented setup and verify the supported path.
- [ ] Use issues and feedback to prioritize fixes; describe adoption only when there is evidence for it.

## 4. Extend based on evidence

After the first supported path is reliable, consider additional deployment targets, custom domains, team workflows, or scaling work if user feedback and maintenance capacity justify them. These are possibilities, not committed features.
