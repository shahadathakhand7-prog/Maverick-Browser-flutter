import '../models/video.dart';
import '../models/comment.dart';
import '../models/channel.dart';

class MockDataService {
  static List<Video> getHomeVideos() {
    return [
      Video(
        id: '1',
        title: 'Flutter Tutorial for Beginners - Build iOS and Android Apps',
        channelName: 'Flutter Dev',
        channelAvatar: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=FD',
        thumbnailUrl: 'https://via.placeholder.com/640x360/FF0000/FFFFFF?text=Flutter+Tutorial',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        views: '1.2M views',
        uploadTime: '2 days ago',
        duration: '45:30',
        description: 'Learn Flutter from scratch in this comprehensive tutorial for beginners. We cover everything from setup to building your first app.',
        likes: 45000,
        dislikes: 200,
      ),
      Video(
        id: '2',
        title: 'Top 10 Programming Languages to Learn in 2024',
        channelName: 'Tech Insights',
        channelAvatar: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=TI',
        thumbnailUrl: 'https://via.placeholder.com/640x360/00FF00/FFFFFF?text=Programming+2024',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        views: '850K views',
        uploadTime: '1 week ago',
        duration: '15:42',
        description: 'Discover the most in-demand programming languages for 2024 and kickstart your coding career.',
        likes: 32000,
        dislikes: 150,
      ),
      Video(
        id: '3',
        title: 'Building a RESTful API with Node.js and Express',
        channelName: 'Code Masters',
        channelAvatar: 'https://via.placeholder.com/150/FFFF00/000000?text=CM',
        thumbnailUrl: 'https://via.placeholder.com/640x360/FFFF00/000000?text=Node.js+API',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        views: '520K views',
        uploadTime: '3 days ago',
        duration: '32:15',
        description: 'Learn how to build a production-ready RESTful API using Node.js, Express, and MongoDB.',
        likes: 28000,
        dislikes: 100,
      ),
      Video(
        id: '4',
        title: 'React Hooks Explained - useState, useEffect, and More',
        channelName: 'Web Dev Simplified',
        channelAvatar: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=WDS',
        thumbnailUrl: 'https://via.placeholder.com/640x360/FF00FF/FFFFFF?text=React+Hooks',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        views: '2.1M views',
        uploadTime: '1 month ago',
        duration: '28:45',
        description: 'A complete guide to React Hooks with practical examples and best practices.',
        likes: 85000,
        dislikes: 300,
      ),
      Video(
        id: '5',
        title: 'Machine Learning Crash Course 2024',
        channelName: 'AI Academy',
        channelAvatar: 'https://via.placeholder.com/150/00FFFF/000000?text=AI',
        thumbnailUrl: 'https://via.placeholder.com/640x360/00FFFF/000000?text=ML+Course',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        views: '3.5M views',
        uploadTime: '2 weeks ago',
        duration: '1:15:20',
        description: 'Everything you need to know to get started with Machine Learning in 2024.',
        likes: 120000,
        dislikes: 500,
      ),
      Video(
        id: '6',
        title: 'Docker Tutorial - From Zero to Hero',
        channelName: 'DevOps Pro',
        channelAvatar: 'https://via.placeholder.com/150/FF6600/FFFFFF?text=DO',
        thumbnailUrl: 'https://via.placeholder.com/640x360/FF6600/FFFFFF?text=Docker+Tutorial',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        views: '680K views',
        uploadTime: '5 days ago',
        duration: '38:50',
        description: 'Master Docker containerization with this comprehensive tutorial covering basics to advanced concepts.',
        likes: 35000,
        dislikes: 180,
      ),
      Video(
        id: '7',
        title: 'CSS Grid Layout - Complete Guide',
        channelName: 'Frontend Focus',
        channelAvatar: 'https://via.placeholder.com/150/9900FF/FFFFFF?text=FF',
        thumbnailUrl: 'https://via.placeholder.com/640x360/9900FF/FFFFFF?text=CSS+Grid',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        views: '420K views',
        uploadTime: '4 days ago',
        duration: '22:30',
        description: 'Learn CSS Grid Layout from scratch and build responsive layouts with ease.',
        likes: 18000,
        dislikes: 80,
      ),
      Video(
        id: '8',
        title: 'Python Data Science Full Course',
        channelName: 'Data Science Hub',
        channelAvatar: 'https://via.placeholder.com/150/336699/FFFFFF?text=DS',
        thumbnailUrl: 'https://via.placeholder.com/640x360/336699/FFFFFF?text=Python+DS',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        views: '1.8M views',
        uploadTime: '3 weeks ago',
        duration: '2:30:15',
        description: 'Complete Python Data Science course covering NumPy, Pandas, Matplotlib, and Scikit-learn.',
        likes: 95000,
        dislikes: 400,
      ),
    ];
  }

  static List<Video> getTrendingVideos() {
    final allVideos = getHomeVideos();
    return allVideos.sublist(0, 4);
  }

  static List<Video> getSubscriptionsVideos() {
    final allVideos = getHomeVideos();
    return allVideos.sublist(0, 3);
  }

  static List<Comment> getCommentsForVideo(String videoId) {
    return [
      Comment(
        id: '1',
        userName: 'John Doe',
        userAvatar: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=JD',
        text: 'This is an amazing tutorial! Really helped me understand the concepts.',
        timeAgo: '2 days ago',
        likes: 245,
        replies: [
          Comment(
            id: '1-1',
            userName: 'Jane Smith',
            userAvatar: 'https://via.placeholder.com/100/33FF57/FFFFFF?text=JS',
            text: 'I agree! The explanations are crystal clear.',
            timeAgo: '1 day ago',
            likes: 12,
          ),
        ],
      ),
      Comment(
        id: '2',
        userName: 'Mike Johnson',
        userAvatar: 'https://via.placeholder.com/100/3357FF/FFFFFF?text=MJ',
        text: 'Great content! Can you make a video about advanced topics too?',
        timeAgo: '1 day ago',
        likes: 189,
      ),
      Comment(
        id: '3',
        userName: 'Sarah Williams',
        userAvatar: 'https://via.placeholder.com/100/FF33F5/FFFFFF?text=SW',
        text: 'Thanks for this! Subscribed and looking forward to more videos.',
        timeAgo: '3 hours ago',
        likes: 56,
      ),
    ];
  }

  static List<Channel> getSubscribedChannels() {
    return [
      Channel(
        id: '1',
        name: 'Flutter Dev',
        avatarUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=FD',
        bannerUrl: 'https://via.placeholder.com/1200x300/0000FF/FFFFFF?text=Flutter+Dev',
        subscribers: '1.2M subscribers',
        description: 'Official Flutter channel for tutorials and updates.',
        isSubscribed: true,
      ),
      Channel(
        id: '2',
        name: 'Tech Insights',
        avatarUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=TI',
        bannerUrl: 'https://via.placeholder.com/1200x300/00FF00/FFFFFF?text=Tech+Insights',
        subscribers: '850K subscribers',
        description: 'Latest tech trends and programming insights.',
        isSubscribed: true,
      ),
      Channel(
        id: '3',
        name: 'Code Masters',
        avatarUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=CM',
        bannerUrl: 'https://via.placeholder.com/1200x300/FFFF00/000000?text=Code+Masters',
        subscribers: '520K subscribers',
        description: 'Master coding with our comprehensive tutorials.',
        isSubscribed: true,
      ),
    ];
  }

  static List<Video> searchVideos(String query) {
    final allVideos = getHomeVideos();
    if (query.isEmpty) return allVideos;
    
    return allVideos
        .where((video) =>
            video.title.toLowerCase().contains(query.toLowerCase()) ||
            video.channelName.toLowerCase().contains(query.toLowerCase()))
        .toList();
  }
}
