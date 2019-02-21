'use strict';

const assert = require('assert');
const fs = require('fs-extra');
const Octokit = require('@octokit/rest');

(async function main() {
  console.log(process.env);

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  assert.strictEqual(
    typeof GITHUB_TOKEN,
    'string',
    'GITHUB_TOKEN should be string'
  );

  const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY;
  assert.strictEqual(
    typeof GITHUB_REPOSITORY,
    'string',
    'GITHUB_REPOSITORY should be string'
  );

  const GITHUB_EVENT_NAME = process.env.GITHUB_EVENT_NAME;
  assert.strictEqual(
    typeof GITHUB_EVENT_NAME,
    'string',
    'GITHUB_EVENT_NAME should be string'
  );
  if (GITHUB_EVENT_NAME !== 'issues') {
    throw new TypeError(`${GITHUB_EVENT_NAME} event is not supported`);
  }

  const GITHUB_EVENT_PATH = process.env.GITHUB_EVENT_PATH;
  assert.strictEqual(
    typeof GITHUB_EVENT_PATH,
    'string',
    'GITHUB_EVENT_PATH should be string'
  );

  const eventData = await fs.readJson(GITHUB_EVENT_PATH);
  console.log(eventData);

  if (eventData.action !== 'opened') {
    console.log(`only support '.action == opened' (was ${eventData.action})`);
    return;
  }

  const octokit = new Octokit({
    auth: `token ${GITHUB_TOKEN}`,
  });

  const result = await octokit.projects.createCard({
    column_id: '2998585',
    content_id: eventData.issue.url,
    content_type: 'Issue',
  });
  console.log(result);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
