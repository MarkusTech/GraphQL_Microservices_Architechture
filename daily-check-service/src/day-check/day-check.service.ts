import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';

@Injectable()
export class DayCheckService implements OnModuleInit {
  private lastUpdatedDay: string | null = null;
  private readonly filePath = path.join(__dirname, '../../README.md');

  async onModuleInit() {
    await this.checkAndUpdateDay();
    setInterval(() => this.checkAndUpdateDay(), 60 * 1000); // Check every minute
  }

  private async checkAndUpdateDay() {
    const currentDay = new Date()
      .toLocaleString('en-US', { weekday: 'short' })
      .toLowerCase();

    if (this.lastUpdatedDay === currentDay) {
      console.log(`Already updated for today: ${currentDay}`);
      return;
    }

    try {
      let content = fs.readFileSync(this.filePath, 'utf8');
      const regex = new RegExp(`(${currentDay}     - )(.*)`, 'i');

      if (!regex.test(content)) {
        console.log(`Day not found in README: ${currentDay}`);
        return;
      }

      content = content.replace(regex, (match, p1, p2) => `${p1}${p2}✓`);
      fs.writeFileSync(this.filePath, content, 'utf8');

      this.lastUpdatedDay = currentDay;
      console.log(`Updated README for ${currentDay}`);
      await this.commitAndPush();
    } catch (error) {
      console.error('Error updating README:', error);
    }
  }

  private async commitAndPush() {
    exec('git status --porcelain', (statusErr, statusStdout) => {
      if (statusErr) {
        console.error(`Git status error: ${statusErr.message}`);
        return;
      }

      if (!statusStdout.trim()) {
        console.log('No changes detected in README.md. Skipping commit.');
        return;
      }

      console.log(`Git status output:\n${statusStdout}`);

      exec('git add README.md', (addErr) => {
        if (addErr) {
          console.error(`Git add error: ${addErr.message}`);
          return;
        }

        exec(
          'git commit -m "Updated daily check"',
          (commitErr, commitStdout) => {
            if (commitErr) {
              console.error(`Git commit error: ${commitErr.message}`);
              return;
            }

            console.log(`Git commit success:\n${commitStdout}`);

            exec('git push origin main', (pushErr, pushStdout) => {
              if (pushErr) {
                console.error(`Git push error: ${pushErr.message}`);
                return;
              }
              console.log(`Git push success:\n${pushStdout}`);
            });
          },
        );
      });
    });
  }
}
