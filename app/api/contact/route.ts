import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'messages.json');

// Helper function to read messages from the JSON file
const readMessages = () => {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const fileData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileData);
};

// Helper function to write messages to the JSON file
const writeMessages = (messages: any) => {
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
};

export async function GET() {
  const messages = readMessages();
  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  const { name, email, message, honeypot } = await req.json();

  // Check if honeypot field is filled
  if (honeypot) {
    return NextResponse.json({ message: 'Spam detected.' }, { status: 400 });
  }

  const newMessage = {
    id: Date.now(),
    name,
    email,
    message,
  };

  const messages = readMessages();
  messages.push(newMessage);
  writeMessages(messages);

  return NextResponse.json({ message: 'Message submitted successfully!' }, { status: 201 });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  let messages = readMessages();
  messages = messages.filter((message) => message.id !== parseInt(id || ''));
  writeMessages(messages);

  return NextResponse.json({ message: 'Message deleted successfully!' });
}
