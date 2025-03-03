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
    if (this.lastUpdatedDay === currentDay) return;

    try {
      let content = fs.readFileSync(this.filePath, 'utf8');
      const regex = new RegExp(`(${currentDay}     - )(.*)`, 'i');
      content = content.replace(regex, (match, p1, p2) => `${p1}${p2}✓`);
      fs.writeFileSync(this.filePath, content, 'utf8');
      this.lastUpdatedDay = currentDay;
      await this.commitAndPush();
    } catch (error) {
      console.error('Error updating README:', error);
    }
  }

  private async commitAndPush() {
    exec(
      'git add README.md && git commit -m "Updated daily check" && git push origin main',
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Git error: ${error.message}`);
          return;
        }
        if (stderr) console.error(`Git stderr: ${stderr}`);
        console.log(`Git stdout: ${stdout}`);
      },
    );
  }
}
