'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function VideoChat() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchOnlineUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('/api/users/online', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching online users:', error);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth');
      return;
    }

    // Get current user info from token
    const userInfo = JSON.parse(atob(token.split('.')[1]));
    setCurrentUser(userInfo);

    // Initialize local video stream
    initializeLocalStream();
    
    // Fetch online users initially and every 30 seconds
    fetchOnlineUsers();
    const interval = setInterval(fetchOnlineUsers, 30000);

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      clearInterval(interval);
    };
  }, [router, fetchOnlineUsers, localStream]);

  const initializeLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      setLocalStream(stream);
      
      const localVideo = document.getElementById('localVideo');
      if (localVideo) {
        localVideo.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const handleLogout = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    localStorage.removeItem('token');
    router.push('/');
  };

  const startCall = (user) => {
    setSelectedUser(user);
    // Implement your video call logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation Header */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Video Chat App
              </h2>
              {currentUser && (
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Welcome, {currentUser.username}
                </span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Users List */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4">
            <h2 className="text-xl font-semibold mb-4">Online Users</h2>
            {users.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No users online at the moment
              </p>
            ) : (
              <div className="space-y-2">
                {users.map(user => (
                  <motion.div
                    key={user.id}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer
                      ${selectedUser?.id === user.id ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                    onClick={() => startCall(user)}
                  >
                    <div className="relative">
                      <Image
                        src={user.avatar}
                        alt={user.username}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                        ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{user.username}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user.status}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Video Chat Area */}
          <div className="bg-gray-800 rounded-2xl shadow-xl p-4">
            <div className="grid grid-cols-2 gap-4 h-[600px]">
              {/* Local Video */}
              <div className="relative bg-gray-900 rounded-xl overflow-hidden">
                <video
                  id="localVideo"
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
                  You ({currentUser?.username})
                </div>
              </div>

              {/* Remote Video */}
              <div className="relative bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center">
                {selectedUser ? (
                  <>
                    <video
                      id="remoteVideo"
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
                      {selectedUser.username}
                    </div>
                  </>
                ) : (
                  <div className="text-gray-400 text-center">
                    <div className="text-6xl mb-4">👋</div>
                    <p>Select a user to start video chat</p>
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
                title="Toggle Microphone"
              >
                🎤
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
                title="Toggle Camera"
              >
                📹
              </motion.button>
              {selectedUser && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-full bg-red-500 hover:bg-red-600 text-white"
                  title="End Call"
                >
                  ❌
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 