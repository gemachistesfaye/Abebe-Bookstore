# 🤝 Contributing to Abebe Bookstore

First off, thanks for taking the time to contribute! 🎉

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Getting Started](#-getting-started)
- [How to Contribute](#-how-to-contribute)
- [Development Setup](#-development-setup)
- [Pull Request Process](#-pull-request-process)
- [Style Guidelines](#-style-guidelines)
- [Reporting Bugs](#-reporting-bugs)
- [Suggesting Features](#-suggesting-features)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by our
[Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to
uphold this code. Please report unacceptable behavior to **gemachistesfaye36@gmail.com**.

---

## 🚀 Getting Started

### Prerequisites 📦

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Git**

### Fork & Clone 🔀

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Abebe-Bookstore.git
   cd Abebe-Bookstore
   ```
3. **Add upstream** remote:
   ```bash
   git remote add upstream https://github.com/gemachistesfaye/Abebe-Bookstore.git
   ```

---

## 🛠️ Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:5173](http://localhost:5173) in your browser

---

## 🎯 How to Contribute

### 🐛 Bug Reports

If you find a bug, please create an issue with:

- 📝 **Clear title** describing the bug
- 📝 **Steps to reproduce** the issue
- 📝 **Expected behavior** vs actual behavior
- 📝 **Screenshots** if applicable
- 📝 **Environment info** (browser, OS, device)

### 💡 Feature Suggestions

Have an idea? Create an issue with:

- 💡 **Feature description**
- 💡 **Use case** - why is this needed?
- 💡 **Mockups** or examples if applicable

### 🔧 Code Contributions

1. **Find an issue** to work on, or create one
2. **Comment** on the issue to let others know you're working on it
3. **Create a branch** from `main`
4. **Make your changes**
5. **Test** your changes thoroughly
6. **Submit a pull request**

---

## 🔄 Pull Request Process

### 1. Prepare Your Changes 📦

```bash
# Make sure you're up to date
git fetch upstream
git checkout main
git merge upstream/main

# Create your feature branch
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes ✏️

- Write clean, readable code
- Follow the existing code style
- Add comments if necessary
- Update documentation if needed

### 3. Test Your Changes ✅

```bash
# Run linting
npm run lint

# Run type checking
npm run typecheck

# Run tests
npm run test
```

### 4. Commit Your Changes 💾

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```bash
# Format: <type>(<scope>): <description>

# Examples:
git add .
git commit -m "feat(products): add book search functionality"
git commit -m "fix(contact): resolve form submission error"
git commit -m "docs(readme): update installation instructions"
git commit -m "style(footer): improve responsive design"
```

#### Commit Types 📝

| Type     | Description                                      |
| -------- | ------------------------------------------------ |
| 🚀 feat     | A new feature                                    |
| 🐛 fix      | A bug fix                                        |
| 📝 docs     | Documentation only changes                       |
| 💄 style    | Code style changes (formatting, missing semi)    |
| ♻️ refactor | Code change that neither fixes a bug nor adds    |
| ⚡ perf     | A code change that improves performance          |
| ✅ test     | Adding missing tests or correcting existing      |
| 🔧 chore    | Changes to build process or auxiliary tools      |
| ⏪ revert   | Reverts a previous commit                        |

### 5. Push & Create PR 🚀

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:

- 📝 **Clear title** describing the change
- 📝 **Description** of what was changed and why
- 📝 **Screenshots** for UI changes
- 📝 **Related issues** linked (e.g., "Closes #12")

---

## 🎨 Style Guidelines

### TypeScript 📐

- Use **TypeScript** for all new components
- Define proper **types** and **interfaces**
- Avoid using `any` type
- Use meaningful **variable** and **function** names

### React ⚛️

- Use **functional components** with hooks
- Keep components **small** and **focused**
- Use **proper prop types**
- Follow the existing component structure

### CSS 🎨

- Use **Tailwind CSS** utility classes
- Follow the existing **color scheme** (amber, slate, stone)
- Keep designs **responsive** (mobile-first)
- Use **meaningful class names**

### File Naming 📁

```
src/
├── components/
│   ├── ComponentName.tsx      # PascalCase for components
│   ├── ComponentName.test.tsx # Tests next to components
├── data/
│   ├── data-file.json         # kebab-case for data
│   ├── data-file.ts
├── types/
│   ├── type-name.ts           # kebab-case for types
```

---

## 🐞 Reporting Bugs

### Before Reporting 📋

- 🔍 Check existing issues to avoid duplicates
- 🔍 Try to reproduce the bug with latest code
- 🔍 Check if it's a browser-specific issue

### Bug Report Template 📝

```markdown
**🐛 Bug Description**
A clear description of what the bug is.

**🔄 Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**✅ Expected Behavior**
What you expected to happen.

**❌ Actual Behavior**
What actually happened.

**📸 Screenshots**
If applicable, add screenshots.

**🖥️ Environment**
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Device: [e.g., Desktop, iPhone 15]
```

---

## 💡 Suggesting Features

### Feature Request Template 📝

```markdown
**💡 Feature Description**
A clear description of the feature you'd like.

**🎯 Use Case**
Why is this feature needed? What problem does it solve?

**🎨 Proposed Solution**
How do you think this should work?

**📸 Mockups**
If applicable, add mockups or examples.

**🔄 Alternatives Considered**
Other solutions you've considered.
```

---

## ❓ Questions?

Feel free to create an issue with the `question` label, or reach out directly:

- 📧 **Email:** gemachistesfaye36@gmail.com
- 💬 **Telegram:** [GemachisTesfaye](https://t.me/GemachisTesfaye)
- 🐙 **GitHub:** [gemachistesfaye](https://github.com/gemachistesfaye)

---

## 🙏 Thank You!

Thanks for contributing to Abebe Bookstore! Every contribution helps make this
project better for the Ethiopian book community. 🇪🇹📚
