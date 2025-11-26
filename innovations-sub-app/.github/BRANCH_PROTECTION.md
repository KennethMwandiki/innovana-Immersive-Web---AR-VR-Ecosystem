# Branch Protection Guidelines

This document outlines the recommended branch protection rules for the Innovana Immersive Web & AR/VR Ecosystem repository.

## Main Branch Protection

The `main` branch should be protected with the following rules:

### ✅ Recommended Settings

1. **Require Pull Request Reviews**
   - Required number of approvals: 1
   - Dismiss stale approvals when new commits are pushed
   - Require review from Code Owners (enforces CODEOWNERS file)

2. **Require Status Checks**
   - Require branches to be up to date before merging
   - Status checks that should pass:
     - Build verification
     - Linting (if configured)
     - Firebase deployment preview

3. **Require Signed Commits** (Optional but recommended)
   - Ensures commit authenticity
   - Protects against commit spoofing

4. **Include Administrators**
   - Apply rules to administrators as well
   - Prevents accidental direct pushes

5. **Restrict Force Pushes**
   - Prevent force pushes to main
   - Preserves commit history integrity

6. **Require Linear History** (Optional)
   - Enforces rebase/squash merges
   - Keeps commit history clean

### 🔧 How to Apply These Settings

1. Go to your GitHub repository
2. Navigate to **Settings** → **Branches**
3. Click **Add rule** or edit existing rule for `main`
4. Configure the settings as outlined above
5. Save changes

## Development Branch Strategy

We recommend the following branching model:

```
main (protected)
  ↑
  └── develop (optional, for pre-release integration)
       ↑
       └── feature/* (feature branches)
       └── fix/* (bug fix branches)
       └── hotfix/* (urgent fixes)
```

### Branch Naming Conventions

- **Feature branches**: `feature/short-description`
- **Bug fixes**: `fix/issue-number-description`
- **Hotfixes**: `hotfix/critical-issue-description`
- **Release branches**: `release/v1.0.0`

## Pull Request Guidelines

### Before Creating a PR

- [ ] Code is tested locally
- [ ] All tests pass
- [ ] Code follows project style guidelines
- [ ] Commit messages are clear and descriptive
- [ ] No sensitive data (API keys, credentials) is committed

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing Done
- [ ] Tested locally
- [ ] Deployed to staging
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added where needed
- [ ] Documentation updated
- [ ] No new warnings generated
```

## Protected Files and Directories

The following files require extra scrutiny:

- `firebase.json` - Deployment configuration
- `.env.example` - Template for environment variables
- `functions/index.js` - Cloud Functions entry point
- `SECURITY.md` - Security policy
- All files in `.github/workflows/` - CI/CD configuration

## Emergency Procedures

### If Main Branch is Compromised

1. Immediately notify all team members
2. Lock the branch (disable all pushes)
3. Review recent commits for malicious changes
4. If needed, revert to last known good commit
5. Investigate how the breach occurred
6. Update security policies accordingly

### Rollback Process

```bash
# Create a revert commit
git revert <bad-commit-hash>

# Or reset to a specific commit (use with caution)
git reset --hard <good-commit-hash>
git push --force  # Only if absolutely necessary and coordinated
```

## Security Scanning

Consider integrating the following:

- **Dependabot**: Automated dependency updates
- **Code scanning**: GitHub Advanced Security
- **Secret scanning**: Detect leaked credentials
- **SAST tools**: Static application security testing

## Additional Resources

- [GitHub Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [Git Workflow Best Practices](https://www.atlassian.com/git/tutorials/comparing-workflows)
- [Conventional Commits](https://www.conventionalcommits.org/)
