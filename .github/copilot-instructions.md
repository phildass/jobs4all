# GitHub Copilot Instructions for jobs4all

## Project Overview
jobs4all is a job seeking application specifically designed for job seekers in Bengaluru (Bangalore), India. The application helps users find and apply for jobs in the Bengaluru area.

## General Guidelines

### Code Style and Conventions
- Follow clean code principles with meaningful variable and function names
- Use consistent indentation (2 spaces for HTML/CSS/JS, 4 spaces for Python/Java)
- Write self-documenting code with comments only when necessary to explain complex logic
- Keep functions small and focused on a single responsibility
- Use descriptive commit messages that explain the "why" behind changes

### Documentation
- Update README.md when adding new features or changing setup procedures
- Document all public APIs and functions
- Include inline documentation for complex algorithms or business logic
- Keep documentation up-to-date with code changes

### Testing Requirements
- Write tests for new features before implementation (TDD approach when possible)
- Ensure existing tests pass before submitting changes
- Aim for meaningful test coverage, focusing on critical paths
- Include both unit tests and integration tests where appropriate
- Test edge cases and error handling

### Security Best Practices
- Never commit sensitive data (API keys, passwords, tokens) to the repository
- Validate and sanitize all user inputs
- Use environment variables for configuration and secrets
- Follow OWASP security guidelines for web applications
- Implement proper authentication and authorization

### Performance Considerations
- Optimize database queries to minimize response time
- Implement pagination for large data sets
- Use caching strategies where appropriate
- Minimize external API calls and handle rate limiting
- Consider mobile users with varying network speeds

## Technology Stack Considerations
Since this is a job seeking application, common technologies might include:
- Frontend: React, Angular, Vue.js, or similar modern framework
- Backend: Node.js, Python (Django/Flask), Java (Spring Boot), or similar
- Database: PostgreSQL, MongoDB, MySQL, or similar
- Mobile: React Native, Flutter, or native iOS/Android

When working with code:
- Follow the established patterns in the existing codebase
- Use the same libraries and frameworks already in use
- Maintain consistency with the project's architecture

## Specific Context for Bengaluru
- Consider Indian date/time formats (DD/MM/YYYY)
- Support Indian Rupee (₹) currency formatting
- Be aware of Indian employment laws and practices
- Consider local holidays and working hours
- Support multilingual capabilities if needed (English, Kannada, Hindi)

## Git Workflow
- Create feature branches from main/master
- Use descriptive branch names (e.g., feature/job-search, fix/login-bug)
- Keep commits atomic and focused
- Write clear PR descriptions with context and testing notes
- Reference issue numbers in commits and PRs

## Code Review Standards
- Ensure code is readable and maintainable
- Verify that changes don't break existing functionality
- Check for security vulnerabilities
- Validate test coverage
- Confirm documentation is updated

## Dependencies
- Prefer well-maintained, widely-used libraries
- Check for security vulnerabilities before adding new dependencies
- Keep dependencies up-to-date with regular updates
- Document why specific dependencies are chosen

## Accessibility
- Follow WCAG 2.1 guidelines for web accessibility
- Ensure keyboard navigation works properly
- Provide appropriate ARIA labels
- Test with screen readers when possible
- Maintain good color contrast ratios

## Error Handling
- Implement comprehensive error handling
- Provide user-friendly error messages
- Log errors appropriately for debugging
- Handle network failures gracefully
- Implement retry logic where appropriate

## When Working on Issues
- Read the full issue description and all comments
- Ask clarifying questions if requirements are unclear
- Break down large tasks into smaller, manageable pieces
- Test changes thoroughly before submitting
- Update issue status and add comments about progress
