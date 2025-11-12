import 'package:flutter_test/flutter_test.dart';
import 'package:youtube_clone/models/video.dart';
import 'package:youtube_clone/models/comment.dart';
import 'package:youtube_clone/models/channel.dart';
import 'package:youtube_clone/services/mock_data_service.dart';
import 'package:youtube_clone/utils/format_helper.dart';

void main() {
  group('Model Tests', () {
    test('Video model creates correctly', () {
      final video = Video(
        id: '1',
        title: 'Test Video',
        channelName: 'Test Channel',
        channelAvatar: 'avatar.jpg',
        thumbnailUrl: 'thumb.jpg',
        videoUrl: 'video.mp4',
        views: '1000',
        uploadTime: '1 day ago',
        duration: '10:00',
        description: 'Test description',
      );

      expect(video.id, '1');
      expect(video.title, 'Test Video');
      expect(video.isLiked, false);
      expect(video.isSubscribed, false);
    });

    test('Comment model creates correctly', () {
      final comment = Comment(
        id: '1',
        userName: 'User',
        userAvatar: 'avatar.jpg',
        text: 'Great video!',
        timeAgo: '1 hour ago',
      );

      expect(comment.id, '1');
      expect(comment.userName, 'User');
      expect(comment.likes, 0);
    });

    test('Channel model creates correctly', () {
      final channel = Channel(
        id: '1',
        name: 'Test Channel',
        avatarUrl: 'avatar.jpg',
        bannerUrl: 'banner.jpg',
        subscribers: '1M',
        description: 'Test channel',
      );

      expect(channel.id, '1');
      expect(channel.isSubscribed, false);
    });
  });

  group('Mock Data Service Tests', () {
    test('Returns home videos', () {
      final videos = MockDataService.getHomeVideos();
      expect(videos.isNotEmpty, true);
      expect(videos.first.id, isNotNull);
    });

    test('Returns trending videos', () {
      final videos = MockDataService.getTrendingVideos();
      expect(videos.isNotEmpty, true);
    });

    test('Returns subscribed channels', () {
      final channels = MockDataService.getSubscribedChannels();
      expect(channels.isNotEmpty, true);
    });

    test('Returns comments for video', () {
      final comments = MockDataService.getCommentsForVideo('1');
      expect(comments.isNotEmpty, true);
    });

    test('Search returns matching videos', () {
      final results = MockDataService.searchVideos('Flutter');
      expect(results.isNotEmpty, true);
    });

    test('Empty search returns all videos', () {
      final results = MockDataService.searchVideos('');
      final allVideos = MockDataService.getHomeVideos();
      expect(results.length, allVideos.length);
    });
  });

  group('Format Helper Tests', () {
    test('Formats large numbers correctly', () {
      expect(FormatHelper.formatNumber(1500000), '1.5M');
      expect(FormatHelper.formatNumber(1500), '1.5K');
      expect(FormatHelper.formatNumber(500), '500');
    });
  });

  group('Video Copy With Tests', () {
    test('Video copyWith updates fields correctly', () {
      final video = Video(
        id: '1',
        title: 'Test',
        channelName: 'Channel',
        channelAvatar: 'avatar.jpg',
        thumbnailUrl: 'thumb.jpg',
        videoUrl: 'video.mp4',
        views: '1000',
        uploadTime: '1 day ago',
        duration: '10:00',
        description: 'Description',
      );

      final updatedVideo = video.copyWith(isLiked: true, likes: 100);
      
      expect(updatedVideo.isLiked, true);
      expect(updatedVideo.likes, 100);
      expect(updatedVideo.title, 'Test');
    });
  });
}
