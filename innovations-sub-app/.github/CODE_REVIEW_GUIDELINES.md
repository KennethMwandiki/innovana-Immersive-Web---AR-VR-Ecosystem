# Code Review Guidelines

This document provides guidelines for conducting effective code reviews in the Innovana Immersive Web & AR/VR Ecosystem project.

## Philosophy

Code reviews are about:
- **Quality**: Ensuring code meets our standards
- **Knowledge Sharing**: Learning from each other
- **Collaboration**: Building better software together
- **Security**: Catching vulnerabilities early

Code reviews are NOT about:
- Personal criticism
- Nitpicking without constructive feedback
- Blocking progress unnecessarily

## What to Look For

### 🔒 Security

- [ ] No hardcoded credentials (API keys, passwords, tokens)
- [ ] Input validation is present
- [ ] Authentication/authorization checks are in place
- [ ] SQL injection risks are mitigated (if applicable)
- [ ] XSS vulnerabilities are prevented
- [ ] Sensitive data is not logged
- [ ] CORS is properly configured

### 🎯 Functionality

- [ ] Code does what it's supposed to do
- [ ] Edge cases are handled
- [ ] Error handling is appropriate
- [ ] No obvious bugs
- [ ] Business logic is correct

### 📖 Code Quality

- [ ] Code is readable and maintainable
- [ ] Variable/function names are descriptive
- [ ] Functions are reasonably sized
- [ ] Code follows DRY principle (Don't Repeat Yourself)
- [ ] Comments explain "why", not "what"
- [ ] No commented-out code

### 🚀 Performance

- [ ] No unnecessary re-renders (React)
- [ ] Database queries are optimized
- [ ] Large datasets are paginated
- [ ] Assets are properly sized/compressed
- [ ] No memory leaks

### 🧪 Testing

- [ ] Tests are present (if applicable)
- [ ] Tests cover edge cases
- [ ] Test names are descriptive
- [ ] Tests actually test the functionality

### 📱 Firebase/Deployment Specific

- [ ] Cloud Functions follow best practices
- [ ] Firebase rules are secure (if modified)
- [ ] Environment variables are documented in `.env.example`
- [ ] PWA manifest is valid (if changed)
- [ ] Service worker caching is appropriate

## How to Review

### 1. Understand the Context
- Read the PR description carefully
- Check linked issues
- Understand the "why" behind the changes

### 2. Start with the Big Picture
- Review architecture/design decisions first
- Check if the approach makes sense
- Suggest alternatives if needed

### 3. Dive into Details
- Review code line by line
- Look for bugs, security issues, and improvements
- Consider maintainability

### 4. Test Locally (if needed)
- Pull the branch
- Run the code
- Verify functionality

### 5. Provide Constructive Feedback

**Good Feedback Examples:**

✅ "Consider extracting this logic into a separate function for better reusability."

✅ "This could be simplified using array destructuring: `const [first, ...rest] = items`"

✅ "Great job handling the edge case here! 👍"

✅ "Could you add a comment explaining why we're using setTimeout here?"

**Bad Feedback Examples:**

❌ "This is wrong."

❌ "Why did you do it this way?"

❌ "I would never write it like this."

### 6. Use Conventional Comments

- **Nit**: Minor issue, not blocking
- **Question**: Seeking clarification
- **Suggestion**: Proposed improvement
- **Issue**: Something that needs to be fixed
- **Blocking**: Must be addressed before merge

Example:
```
Nit: Consider renaming `temp` to `processedData` for clarity
```

## Review Timelines

- **Minor changes** (< 50 lines): Review within 24 hours
- **Medium changes** (50-200 lines): Review within 48 hours
- **Large changes** (> 200 lines): Review within 3-5 days (consider breaking into smaller PRs)

## When to Approve

✅ Approve when:
- All critical issues are resolved
- Code meets quality standards
- You understand what the code does
- Tests pass
- No security concerns

⏸️ Request changes when:
- Security vulnerabilities exist
- Core functionality is broken
- Major refactoring is needed

💬 Comment (no approval/rejection) when:
- You have suggestions but they're not blocking
- You want to start a discussion
- You're not the final reviewer

## Reviewer Responsibilities

1. **Be Timely**: Review PRs promptly
2. **Be Thorough**: Don't rubber-stamp
3. **Be Respectful**: Critique code, not the person
4. **Be Clear**: Explain your reasoning
5. **Be Helpful**: Suggest solutions, not just problems

## Author Responsibilities

1. **Keep PRs Small**: Easier to review
2. **Write Good Descriptions**: Help reviewers understand
3. **Respond to Feedback**: Engage in discussion
4. **Don't Take it Personally**: Reviews improve code quality
5. **Mark Resolved Comments**: Keep the conversation organized

## Special Considerations

### Firebase Configuration Changes

When reviewing changes to `firebase.json`, `firestore.rules`, or Cloud Functions:

- [ ] Verify deployment won't break production
- [ ] Check for proper error handling
- [ ] Ensure billing implications are understood
- [ ] Confirm security rules are appropriate

### Environment Variables

When new environment variables are added:

- [ ] `.env.example` is updated
- [ ] Documentation explains the variable's purpose
- [ ] Default/dummy values are safe
- [ ] Variable is used securely in code

### Dependencies

When adding new dependencies:

- [ ] Dependency is necessary (not redundant)
- [ ] License is compatible
- [ ] Package is actively maintained
- [ ] Security vulnerabilities are checked

## Resources

- [How to review code effectively](https://google.github.io/eng-practices/review/)
- [Conventional Comments](https://conventionalcomments.org/)
- [The Art of Code Review](https://www.alexandra-hill.com/2018/06/25/the-art-of-giving-and-receiving-code-reviews/)
