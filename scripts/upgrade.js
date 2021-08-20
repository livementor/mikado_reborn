#!/usr/bin/env node
const commandExists = require('command-exists');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

commandExists('gh', function (_err, isGithubCLIInstalled) {
  if (isGithubCLIInstalled) {
    try {
      // Check if user is logged in with github CLI
      try {
        execSync('gh auth status', { stdio: 'ignore' });
      } catch (err) {
        console.error(`
          Seems like you are not authenticated.
          Run ${"\033[1m"}gh auth login${"\x1b[0m"} to authenticate with your GitHub account.
          gh will also respect tokens set using ${"\033[1m"}GITHUB_TOKEN${"\x1b[0m"}.
        `)
        throw err
      }
      const packageJsonPath = path.resolve(__dirname, '../packages/mikado_reborn/package.json');
      const packageJson = require(packageJsonPath);
      const lastTag = execSync('git describe --abbrev=0 --tags').toString('utf-8').trim();
      const log = execSync(`git log ${lastTag}..HEAD --format=%s`).toString('utf-8').trim();
      const commits = log.split('\n');
      const currentVersion = packageJson.version;
      let [major, minor, fix] = currentVersion.split('.').map(s => parseInt(s));

      /* Changes will be filled with
        {
          [key: feat|fix|chore] : {
            [subject: string]: string[]
          }
        }
      */
      const changes = {};
      let hasBreakingChanges = false;
      let hasNewFeature = false;
      let changelog = '';

      if (`v${currentVersion}` === lastTag) {
        commits.forEach((commit) => {
          const czCommit = commit.match(/^(feat|fix|style|refactor|perf|test|chore)\(([\w-]*)\)(!?):\s*(.*)/i);
          if (czCommit) {
            let [, changeType, subject, breaking, change] = czCommit;

            [changeType, subject] = [changeType, subject].map((s => s.toUpperCase()))

            if (changes[changeType] && changes[changeType][subject]) {
              changes[changeType][subject].push(change);
            } else {
              changes[changeType] = {
                ...changes[changeType],
                [subject]: [change]
              }
            }
            if (breaking) hasBreakingChanges = true;
            if (changeType === 'FEAT') hasNewFeature = true;
          }
        })

        let newVersion = [major, minor, fix];
        if (hasBreakingChanges) {
          // Check for breaking changes -> Major update
          newVersion = [major + 1, 0, 0];
        } else if (hasNewFeature) {
          // Check for new features -> Minor update
          newVersion = [major, minor + 1, 0];
        } else {
          // Apply a fix
          newVersion = [major, minor, fix + 1];
        }

        const newVersionString = newVersion.join('.');
        packageJson.version = newVersionString
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

        // commit package changes
        execSync('git add .');
        execSync(`git commit -m "chore(package.json): bump version to ${newVersionString}"`);
        // commit tag
        execSync(`git tag -a v${newVersionString} -m "v${newVersionString}"`);
        // push
        execSync('git push');
        execSync(`git push origin tag v${newVersionString}`);
        // Ensure prompt is disabled for github cli
        execSync('gh config set prompt disabled');

        // Build changelog
        Object.keys(changes).forEach((changeType) => {
          changelog += `\n### ${changeType}\n`;
          Object.keys(changes[changeType]).forEach((subject) => {
            if (changes[changeType][subject].length > 1) {
              changelog += `\n${subject}:`;
              changes[changeType][subject].forEach((change, index) => {
                if (index === 0) changelog += '\n';
                changelog += `- ${change}\n`;
              });
            } else {
              changelog += `\n${subject}: ${changes[changeType][subject][0]}\n`;
            }
          })
        })

        execSync(`gh release create v${newVersionString} -t v${newVersionString} --notes "${changelog}"`);
      } else {
        console.error(`
          Seems like changes have been made to your package.json version.
          Revert changes if you have done any on version.
          Also please ensure that you have fetched the repository, that you are up to date and not missing any new tag.
        `)
      }
    } catch (err) {
      console.error('Something went wrong: ', err)
    }
  } else {
    console.error(`
      Please install GitHub cli and authenticate.
      To install, just run ${"\033[1m"}brew install gh${"\x1b[0m"}
      Run ${"\033[1m"}gh auth login${"\x1b[0m"} to authenticate with your GitHub account.
      gh will also respect tokens set using ${"\033[1m"}GITHUB_TOKEN${"\x1b[0m"}.
    `)
  }
});
