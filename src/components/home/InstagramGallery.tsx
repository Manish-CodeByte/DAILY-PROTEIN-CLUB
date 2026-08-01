import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { InstagramIcon } from '../UI/SocialIcons';
import { INSTAGRAM_POSTS } from '../../data/instagramPosts';

export const InstagramGallery: React.FC = () => {
  return (
    <section className="py-20 bg-[#0B0B0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-pink-500 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
              <InstagramIcon className="w-4 h-4" /> @dailyproteinclub.manipal
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Follow Our Fitness Journey
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-pink-500/30 text-xs font-bold text-pink-400 hover:bg-pink-500 hover:text-white transition-all mt-4 md:mt-0"
          >
            Follow on Instagram <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <motion.a
              key={post.id}
              href={post.postUrl}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-900 border border-gray-800"
            >
              <img
                src={post.imageUrl}
                alt="Daily Protein Club Instagram Feed"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Hover overlay with likes and caption */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between z-10">
                <div className="flex items-center justify-between text-xs text-white">
                  <span className="flex items-center gap-1 font-bold">
                    <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1 font-bold">
                    <MessageCircle className="w-3.5 h-3.5 text-blue-400" /> {post.comments}
                  </span>
                </div>

                <p className="text-[10px] text-gray-300 line-clamp-3 leading-tight font-normal">
                  {post.caption}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};
