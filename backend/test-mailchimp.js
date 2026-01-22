/**
 * Quick test script to debug Mailchimp API connection
 */

import dotenv from 'dotenv';
import mailchimp from '@mailchimp/mailchimp_marketing';

// Load environment variables FIRST
const result = dotenv.config();

if (result.error) {
  console.error('Error loading .env file:', result.error);
  process.exit(1);
}

const apiKey = process.env.MAILCHIMP_API_KEY;
const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
const listId = process.env.MAILCHIMP_LIST_ID;

console.log('\n=== Testing Mailchimp API ===\n');
console.log('API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET');
console.log('Server Prefix:', serverPrefix || 'NOT SET');
console.log('List ID:', listId || 'NOT SET');
console.log('\n');

if (!apiKey) {
  console.error('❌ MAILCHIMP_API_KEY is not set in .env file');
  process.exit(1);
}

if (!serverPrefix) {
  console.error('❌ MAILCHIMP_SERVER_PREFIX is not set in .env file');
  process.exit(1);
}

if (!listId) {
  console.error('❌ MAILCHIMP_LIST_ID is not set in .env file');
  process.exit(1);
}

// Configure Mailchimp client
mailchimp.setConfig({
  apiKey: apiKey,
  server: serverPrefix
});

async function testConnection() {
  try {
    console.log('Test 1: Ping Mailchimp API...');
    const pingResponse = await mailchimp.ping.get();
    console.log('✓ Ping successful:', pingResponse.health_status);
    console.log('');
  } catch (error) {
    console.log('✗ Ping failed:', error.message);
    if (error.response) {
      console.log('  Status:', error.response.status);
      console.log('  Body:', error.response.text);
    }
    console.log('');
  }

  try {
    console.log('Test 2: Get account info...');
    const accountResponse = await mailchimp.account.get();
    console.log('✓ Account info retrieved:');
    console.log('  Account Name:', accountResponse.account_name);
    console.log('  Account Email:', accountResponse.email);
    console.log('');
  } catch (error) {
    console.log('✗ Account info failed:', error.message);
    if (error.response) {
      console.log('  Status:', error.response.status);
      console.log('  Body:', error.response.text);
    }
    console.log('');
  }

  try {
    console.log('Test 3: Get list info...');
    const listResponse = await mailchimp.lists.getList(listId);
    console.log('✓ List info retrieved:');
    console.log('  List Name:', listResponse.name);
    console.log('  Total Subscribers:', listResponse.stats.member_count);
    console.log('  Subscribed:', listResponse.stats.member_count_since_send || 'N/A');
    console.log('');
  } catch (error) {
    console.log('✗ List info failed:', error.message);
    if (error.response) {
      console.log('  Status:', error.response.status);
      console.log('  Body:', error.response.text);
    }
    console.log('');
  }

  try {
    console.log('Test 4: Get first 10 subscribers...');
    const membersResponse = await mailchimp.lists.getListMembersInfo(listId, {
      count: 10,
      offset: 0,
      status: 'subscribed'
    });

    const members = membersResponse.members || [];
    console.log(`✓ Retrieved ${members.length} subscribers (showing first 10)`);

    if (members.length > 0) {
      console.log('\nFirst subscriber:');
      console.log('  Email:', members[0].email_address);
      console.log('  Name:', members[0].merge_fields?.FNAME || 'N/A', members[0].merge_fields?.LNAME || '');
      console.log('  Status:', members[0].status);
    } else {
      console.log('  No subscribed members found in this list');
    }
    console.log('');
  } catch (error) {
    console.log('✗ Get subscribers failed:', error.message);
    if (error.response) {
      console.log('  Status:', error.response.status);
      console.log('  Body:', error.response.text);
    }
    console.log('');
  }

  console.log('=== Test Complete ===\n');
}

testConnection().catch(console.error);
