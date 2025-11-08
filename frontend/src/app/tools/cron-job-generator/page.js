import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import CronJobGeneratorTool from '../../components/tools/CronJobGeneratorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Cron Job Generator — The Tool Guru',
  description: 'Create cron expressions with presets and human-readable summaries.',
  keywords: ['cron', 'cronjob', 'schedule', 'generator'],
  openGraph: {
    title: 'Cron Job Generator — The Tool Guru',
    description: 'Build cron expressions easily.',
  },
};

const CronJobGeneratorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <CronJobGeneratorTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Cron Job Generator"
          description="Create cron expressions with presets and human-readable summaries. Our cron job generator helps you build valid cron expressions for scheduling tasks on Unix-like systems. Choose from common presets or customize every field (minute, hour, day, month, weekday) to create precise schedules. Perfect for scheduling scripts, automated tasks, backups, or any recurring system tasks."
          features={[
            "Generate cron expressions with presets",
            "Customize all cron fields (minute, hour, day, month, weekday)",
            "Human-readable schedule summaries",
            "Common preset schedules (daily, weekly, monthly, etc.)",
            "Validate cron expression syntax",
            "Copy cron expressions for use",
            "Preview next execution times",
            "Works entirely in your browser for privacy"
          ]}
          howToUse={[
            "Select a preset schedule or choose 'Custom'",
            "Configure minute, hour, day, month, and weekday fields",
            "View human-readable schedule summary",
            "Check cron expression syntax",
            "Preview next execution times",
            "Copy the cron expression",
            "Use in crontab or scheduling systems",
            "Test cron jobs to ensure they run correctly"
          ]}
          useCases={[
            "Schedule automated scripts and tasks",
            "Set up regular backups",
            "Schedule system maintenance",
            "Create recurring data processing jobs",
            "Schedule email reports or notifications",
            "Automate cleanup and archiving tasks",
            "Set up monitoring and health checks",
            "Schedule content updates or synchronization"
          ]}
          tips={[
            "Use presets for common schedules (daily, weekly, etc.)",
            "Test cron expressions before deploying",
            "Consider time zones when scheduling",
            "Use specific times to avoid peak hours",
            "Document what each cron job does",
            "Monitor cron job execution logs",
            "Use absolute paths in cron job commands"
          ]}
          faq={[
            {
              question: "What is a cron job?",
              answer: "A cron job is a scheduled task that runs automatically on Unix-like systems at specified times. Cron expressions define when tasks should execute using a time-based schedule."
            },
            {
              question: "What is the cron expression format?",
              answer: "Cron expressions have five fields: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-7, where 0 and 7 are Sunday)."
            },
            {
              question: "How do I use a cron expression?",
              answer: "Add the cron expression to your crontab file using 'crontab -e', or use it in scheduling systems. The format is: cron_expression command_to_run"
            },
            {
              question: "Can I schedule tasks to run every X minutes?",
              answer: "Yes, use */X in the minute field. For example, */15 runs every 15 minutes, */30 runs every 30 minutes."
            }
          ]}
        />
      </div>
    </Body>
    <Footer />
  </div>
);

export default CronJobGeneratorPage;


