# Pre-Commit Hooks Setup Guide

Pre-commit hooks help catch issues before they're committed to version control. This guide shows how to set up automated checks for the Innovana project.

## Why Use Pre-Commit Hooks?

- ✅ Catch sensitive data before it's committed
- ✅ Enforce code style automatically
- ✅ Run tests before committing
- ✅ Prevent broken code from entering the repository
- ✅ Save time in code reviews

## Quick Setup (Recommended)

### Option 1: Using Husky (Node.js)

1. **Install Husky**:
```bash
npm install --save-dev husky
npx husky init
```

2. **Create pre-commit hook**:
```bash
# Create the hook file
npx husky add .husky/pre-commit "npm run pre-commit"
```

3. **Add script to package.json**:
```json
{
  "scripts": {
    "pre-commit": "npm run lint && npm run check-secrets"
  }
}
```

### Option 2: Manual Git Hooks

Create `.git/hooks/pre-commit` file:

```bash
#!/bin/sh

echo "🔍 Running pre-commit checks..."

# Check for sensitive data
if git diff --cached --name-only | xargs grep -i "api[_-]key\|secret\|password\|token" 2>/dev/null; then
  echo "❌ ERROR: Potential sensitive data detected!"
  echo "Please review your changes and remove any API keys, secrets, or passwords."
  exit 1
fi

# Check for .env files
if git diff --cached --name-only | grep -E "\.env$" 2>/dev/null; then
  echo "❌ ERROR: .env file detected in commit!"
  echo "Please remove .env files. Only .env.example should be committed."
  exit 1
fi

# Check for large files (>5MB)
git diff --cached --name-only | while read file; do
  if [ -f "$file" ]; then
    size=$(wc -c <"$file")
    if [ $size -gt 5242880 ]; then
      echo "❌ ERROR: File $file is larger than 5MB!"
      echo "Please use Git LFS for large files or reduce file size."
      exit 1
    fi
  fi
done

echo "✅ Pre-commit checks passed!"
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

## Recommended Checks

### 1. Secret Detection

Install `detect-secrets`:
```bash
pip install detect-secrets
```

Add to pre-commit:
```bash
detect-secrets scan --baseline .secrets.baseline
```

### 2. Linting

For JavaScript/TypeScript:
```bash
npm run lint
```

### 3. Type Checking

For TypeScript projects:
```bash
npm run type-check
```

### 4. Format Checking

Using Prettier:
```bash
npm run format:check
```

### 5. Test Running (optional)

```bash
npm run test
```

## Complete Pre-Commit Script Example

```bash
#!/bin/sh

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "${YELLOW}🔍 Running pre-commit checks...${NC}"

# 1. Check for sensitive data patterns
echo "\n📋 Checking for sensitive data..."
if git diff --cached --name-only | xargs grep -rE "(api[_-]?key|secret|password|token|private[_-]?key)[\"']?\s*[=:]\s*[\"'][^\"']{8,}" 2>/dev/null; then
  echo "${RED}❌ ERROR: Potential sensitive data detected!${NC}"
  exit 1
fi

# 2. Check for .env files
echo "\n📁 Checking for .env files..."
if git diff --cached --name-only | grep -E "\.env$" 2>/dev/null; then
  echo "${RED}❌ ERROR: .env file in commit! Only .env.example allowed.${NC}"
  exit 1
fi

# 3. Check for node_modules
echo "\n📦 Checking for node_modules..."
if git diff --cached --name-only | grep "node_modules" 2>/dev/null; then
  echo "${RED}❌ ERROR: node_modules should not be committed!${NC}"
  exit 1
fi

# 4. Check for database files
echo "\n💾 Checking for database files..."
if git diff --cached --name-only | grep -E "\.(db|sqlite|sqlite3)$" 2>/dev/null; then
  echo "${RED}❌ ERROR: Database files should not be committed!${NC}"
  exit 1
fi

# 5. Check for large files
echo "\n📏 Checking for large files..."
max_size=5242880 # 5MB in bytes
git diff --cached --name-only | while read file; do
  if [ -f "$file" ]; then
    size=$(wc -c <"$file" 2>/dev/null || echo 0)
    if [ $size -gt $max_size ]; then
      echo "${RED}❌ ERROR: $file is larger than 5MB!${NC}"
      exit 1
    fi
  fi
done

# 6. Run linter (if available)
if command -v npm &> /dev/null; then
  if grep -q "\"lint\"" package.json 2>/dev/null; then
    echo "\n🔧 Running linter..."
    npm run lint
    if [ $? -ne 0 ]; then
      echo "${RED}❌ Linting failed!${NC}"
      exit 1
    fi
  fi
fi

echo "${GREEN}✅ All pre-commit checks passed!${NC}"
exit 0
```

## Bypassing Hooks (Use Sparingly!)

If you absolutely need to bypass hooks:
```bash
git commit --no-verify -m "Emergency fix"
```

⚠️ **Warning**: Only use this in emergencies!

## Shared Team Setup

To ensure all team members use the same hooks:

1. **Commit hooks to repository**:
   - Store hooks in `.github/hooks/`
   - Add setup script to `package.json`

2. **Auto-setup in package.json**:
```json
{
  "scripts": {
    "postinstall": "npm run setup-hooks",
    "setup-hooks": "cp .github/hooks/* .git/hooks/ && chmod +x .git/hooks/*"
  }
}
```

## IDE Integration

### VS Code

Install extensions:
- **ESLint**: Auto-fix on save
- **Prettier**: Format on save
- **GitLens**: Enhanced Git integration

Settings (`.vscode/settings.json`):
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

## Troubleshooting

### Hook not running
```bash
chmod +x .git/hooks/pre-commit
```

### Hook running but not stopping commits
Make sure script exits with non-zero code:
```bash
exit 1  # Stops the commit
```

### Different behavior on Windows
Use cross-platform tools like Husky instead of shell scripts.

## Additional Security Tools

### 1. git-secrets (AWS)
```bash
git secrets --install
git secrets --register-aws
```

### 2. truffleHog
```bash npm install -g trufflehog
trufflehog --regex --entropy=False .
```

### 3. gitleaks
```bash
gitleaks detect --source . --verbose
```

## Resources

- [Husky Documentation](https://typicode.github.io/husky/)
- [Git Hooks Documentation](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- [detect-secrets](https://github.com/Yelp/detect-secrets)
- [pre-commit framework](https://pre-commit.com/)
