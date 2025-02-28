'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleStartChat = () => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/video-chat');
    } else {
      router.push('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <main className="text-center">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
              Connect Instantly
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Meet new people from around the world through instant video chat
            </p>
          </motion.div>

          {/* Feature Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative w-full max-w-4xl mx-auto mb-20"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 aspect-video">
              {/* Animated Interface Mockup */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.02, 1],
                    rotate: [0, 1, -1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-10"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Live Video Preview
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center"
          >
            <motion.button
              onClick={handleStartChat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Start Chatting Now
            </motion.button>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 Video Chat App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

const features = [
  {
    icon: "🌎",
    title: "Global Connections",
    description: "Connect with people from different cultures and backgrounds worldwide.",
  },
  {
    icon: "🔒",
    title: "Secure Chat",
    description: "End-to-end encryption ensures your conversations remain private and secure.",
  },
  {
    icon: "⚡",
    title: "Instant Matching",
    description: "Our smart algorithm connects you with like-minded people instantly.",
  },
];
