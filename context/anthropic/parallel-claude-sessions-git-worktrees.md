# Run Parallel Claude Code Sessions with Git Worktrees

## Overview

Git worktrees allow you to check out multiple branches from the same repository into separate directories. Each worktree has its own working directory with isolated files, while sharing the same Git history. This enables running multiple Claude Code sessions simultaneously with complete code isolation.

## Benefits

- Each worktree has its own independent file state
- Perfect for parallel Claude Code sessions
- Changes made in one worktree won't affect others
- Prevents Claude instances from interfering with each other
- All worktrees share the same Git history and remote connections
- Ideal for long-running tasks where Claude works in one worktree while you continue development in another

## Usage

### 1. Create a New Worktree

```bash
# Create a new worktree with a new branch
git worktree add ../project-feature-a -b feature-a

# Or create a worktree with an existing branch
git worktree add ../project-bugfix bugfix-123
```

This creates a new directory with a separate working copy of your repository.

### 2. Run Claude Code in Each Worktree

```bash
# Navigate to your worktree
cd ../project-feature-a

# Run Claude Code in this isolated environment
claude
```

### 3. Run Claude in Another Worktree

```bash
cd ../project-bugfix
claude
```

### 4. Manage Your Worktrees

```bash
# List all worktrees
git worktree list

# Remove a worktree when done
git worktree remove ../project-feature-a
```

## Best Practices

- Use descriptive directory names to easily identify which task each worktree is for
- Remember to initialize your development environment in each new worktree according to your project's setup:
  - **JavaScript projects**: Run `npm install` or `yarn`
  - **Python projects**: Set up virtual environments or install with package managers
  - **Other languages**: Follow your project's standard setup process

## Learn More

For detailed information, see the [official Git worktree documentation](https://git-scm.com/docs/git-worktree).

---

*Source: [Claude Code Documentation - Common Workflows](https://docs.claude.com/en/docs/claude-code/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees)*