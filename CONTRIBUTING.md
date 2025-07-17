# 🤝 Contributing to Pokémon-Style GitHub Profile Cards

Thank you for your interest in contributing! This project is open source and we welcome contributions from the community.

## 🎯 How to Contribute

### 🐛 Reporting Issues

**Before creating an issue:**
- Check if the issue already exists
- Try the latest version of the project
- Provide clear steps to reproduce the problem

**When creating an issue:**
- Use a clear, descriptive title
- Include your GitHub username and type used
- Describe the expected vs actual behavior
- Add screenshots if relevant

### 💡 Suggesting Features

We welcome feature suggestions! When suggesting:
- Explain the use case clearly
- Consider if it benefits the broader community
- Think about implementation complexity
- Provide examples if possible

### 🔧 Code Contributions

#### Setting Up Development

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/Leorev01/pokemon-profile-card.git
   cd pokrmeo
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   node test-server.js
   ```

#### Making Changes

1. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make your changes**
3. **Test your changes:**
   - Test the API endpoint locally
   - Check that the frontend works
   - Verify different types and usernames
4. **Commit your changes:**
   ```bash
   git commit -m "feat: add new feature description"
   ```
5. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request**

#### Code Style Guidelines

- **JavaScript:** Use modern ES6+ syntax
- **Comments:** Add comments for complex logic
- **Error Handling:** Always handle potential errors
- **Testing:** Test with different usernames and types

## 🎨 Adding New Pokémon Types

Want to add a new type? Here's how:

### 1. Add Type Data

In `src/api/card.js`, add to the `typeMap`:

```javascript
newType: {
  bgStops: ['#color1 60%', '#color2 100%'],
  shadowColor: '#color244',
  iconSvg: '<path ... />' // SVG path data
}
```

### 2. Add SVG Icon

Create the SVG icon file in `src/assets/types/newType.svg`

### 3. Update Documentation

- Add to the type table in README.md
- Add screenshot to assets/screenshots/
- Update the visual examples section

### 4. Test Your Type

- Test with different usernames
- Verify the gradient looks good
- Check that the icon displays properly

## 📝 Documentation Contributions

### Improving README

- Add better examples
- Include more screenshots
- Clarify instructions
- Add troubleshooting tips

### Adding Translations

- Create language-specific README files
- Translate error messages
- Add language-specific examples

## 🚀 Deployment & Testing

### Local Testing

1. **Test the API:**
   ```bash
   curl "http://localhost:3001/api/card?username=octocat&type=fire"
   ```

2. **Test the frontend:**
   - Visit `http://localhost:3000/?username=octocat&type=fire`
   - Try different types and usernames

3. **Test error handling:**
   - Try invalid usernames
   - Test rate limit scenarios
   - Check invalid type parameters

### Deployment Testing

- Test on Vercel deployment
- Verify API endpoints work
- Check CORS headers
- Test with real GitHub data

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] Code follows the project's style
- [ ] Changes are tested locally
- [ ] Documentation is updated
- [ ] No breaking changes (unless discussed)
- [ ] Commit messages are clear

### PR Description

Include:
- **What** the change does
- **Why** the change is needed
- **How** to test the changes
- **Screenshots** if UI changes

## 🏷️ Commit Message Format

Use conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## 🎉 Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Given credit in the project

## 📞 Getting Help

- **Discussions:** Use GitHub Discussions
- **Issues:** Open an issue for bugs/features
- **Questions:** Ask in issues or discussions

## 🚀 Quick Start for Contributors

1. **Fork & Clone**
2. **Install dependencies:** `npm install`
3. **Start server:** `node test-server.js`
4. **Make changes**
5. **Test thoroughly**
6. **Submit PR**

---

**Thank you for contributing to the GitHub community! 🌟**
