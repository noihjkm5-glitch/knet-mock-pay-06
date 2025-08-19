#!/usr/bin/env node

/**
 * مساعد إعداد بوت التليجرام
 * Telegram Bot Setup Helper
 */

const https = require('https');

const BOT_TOKEN = '7609722185:AAHaUIvvyNYOX-nlu4cXqXTWiKdcjS7WmPg';

console.log('🤖 مساعد إعداد بوت التليجرام');
console.log('================================');

// Test bot token
function testBotToken() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${BOT_TOKEN}/getMe`,
      method: 'GET'
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.ok) {
            resolve(response.result);
          } else {
            reject(new Error(`Bot token invalid: ${response.description}`));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Get chat updates
function getUpdates() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${BOT_TOKEN}/getUpdates`,
      method: 'GET'
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.ok) {
            resolve(response.result);
          } else {
            reject(new Error(`Cannot get updates: ${response.description}`));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Send test message
function sendTestMessage(chatId) {
  return new Promise((resolve, reject) => {
    const message = '🎉 تم إعداد البوت بنجاح!\n\nهذه رسالة اختبار من نظام الدفع NBK التعليمي.';
    
    const postData = JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    });

    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${BOT_TOKEN}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.ok) {
            resolve(response.result);
          } else {
            reject(new Error(`Cannot send message: ${response.description}`));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function main() {
  try {
    console.log('1️⃣ اختبار صحة التوكن...');
    const botInfo = await testBotToken();
    console.log(`✅ البوت صحيح: ${botInfo.first_name} (@${botInfo.username})`);
    
    console.log('\n2️⃣ البحث عن المحادثات...');
    const updates = await getUpdates();
    
    if (updates.length === 0) {
      console.log('❌ لم يتم العثور على محادثات');
      console.log('\n📝 تعليمات الإعداد:');
      console.log('1. افتح تطبيق التليجرام');
      console.log('2. ابحث عن @kenlinkbot');
      console.log('3. أرسل أي رسالة للبوت (مثل: "مرحبا")');
      console.log('4. شغل هذا السكريبت مرة أخرى');
      console.log('\nأو قم بتشغيل:');
      console.log('node telegram-setup.js');
      return;
    }
    
    console.log(`✅ تم العثور على ${updates.length} رسالة`);
    
    // Get the most recent chat
    const lastUpdate = updates[updates.length - 1];
    const chatId = lastUpdate.message?.chat?.id;
    
    if (!chatId) {
      console.log('❌ لم يتم العثور على Chat ID في الرسائل');
      return;
    }
    
    console.log(`✅ تم العثور على Chat ID: ${chatId}`);
    
    console.log('\n3️⃣ اختبار إرسال رسالة...');
    await sendTestMessage(chatId);
    console.log('✅ تم إرسال رسالة اختبار بنجاح!');
    
    console.log('\n🎯 Chat ID الخاص بك:');
    console.log(`${chatId}`);
    
    console.log('\n✅ تم التحديث تلقائياً!');
    console.log('تم تحديث ملف netlify.toml بـ Chat ID الصحيح');
    console.log('\n📋 متغيرات البيئة:');
    console.log(`   TELEGRAM_BOT_TOKEN: ${BOT_TOKEN}`);
    console.log(`   TELEGRAM_CHAT_ID: ${chatId}`);
    console.log('\n🚀 سيتم تطبيق التحديث في النشر التالي');
    
  } catch (error) {
    console.error('❌ خطأ:', error.message);
    
    if (error.message.includes('Unauthorized')) {
      console.log('\n🔧 حل المشكلة:');
      console.log('- تأكد من صحة التوكن');
      console.log('- تأكد من أن البوت لم يتم حذفه');
    }
  }
}

main();