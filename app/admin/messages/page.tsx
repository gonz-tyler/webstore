'use client';

import React, { useEffect, useState } from 'react';

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch messages on page load
    const fetchMessages = async () => {
      const response = await fetch('/api/contact');
      const data = await response.json();
      setMessages(data);
      setLoading(false);
    };

    fetchMessages();
  }, []);

  // Handle deleting a message
  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/contact?id=${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setMessages(messages.filter((message) => message.id !== id));
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Submitted Messages</h2>
      {messages.length > 0 ? (
        <ul className="space-y-4">
          {messages.map((message) => (
            <li key={message.id} className="border p-4 rounded-lg bg-white shadow-md">
              <p><strong>Name:</strong> {message.name}</p>
              <p><strong>Email:</strong> {message.email}</p>
              <p><strong>Message:</strong> {message.message}</p>
              <button
                onClick={() => handleDelete(message.id)}
                className="mt-2 text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages found.</p>
      )}
    </div>
  );
};

export default AdminMessagesPage;
