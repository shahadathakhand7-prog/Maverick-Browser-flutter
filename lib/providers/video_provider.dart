import 'package:flutter/foundation.dart';
import '../models/video.dart';
import '../models/comment.dart';
import '../services/mock_data_service.dart';

class VideoProvider extends ChangeNotifier {
  List<Video> _homeVideos = [];
  List<Video> _trendingVideos = [];
  List<Video> _subscriptionVideos = [];
  List<Video> _searchResults = [];
  final Map<String, List<Comment>> _commentsCache = {};
  
  bool _isLoading = false;
  String _searchQuery = '';

  List<Video> get homeVideos => _homeVideos;
  List<Video> get trendingVideos => _trendingVideos;
  List<Video> get subscriptionVideos => _subscriptionVideos;
  List<Video> get searchResults => _searchResults;
  bool get isLoading => _isLoading;
  String get searchQuery => _searchQuery;

  VideoProvider() {
    loadHomeVideos();
    loadTrendingVideos();
    loadSubscriptionVideos();
  }

  Future<void> loadHomeVideos() async {
    _isLoading = true;
    notifyListeners();
    
    await Future.delayed(const Duration(milliseconds: 500));
    _homeVideos = MockDataService.getHomeVideos();
    
    _isLoading = false;
    notifyListeners();
  }

  Future<void> loadTrendingVideos() async {
    _trendingVideos = MockDataService.getTrendingVideos();
    notifyListeners();
  }

  Future<void> loadSubscriptionVideos() async {
    _subscriptionVideos = MockDataService.getSubscriptionsVideos();
    notifyListeners();
  }

  void searchVideos(String query) {
    _searchQuery = query;
    _searchResults = MockDataService.searchVideos(query);
    notifyListeners();
  }

  void clearSearch() {
    _searchQuery = '';
    _searchResults = [];
    notifyListeners();
  }

  Video? getVideoById(String id) {
    try {
      return _homeVideos.firstWhere((video) => video.id == id);
    } catch (e) {
      return null;
    }
  }

  List<Comment> getCommentsForVideo(String videoId) {
    if (!_commentsCache.containsKey(videoId)) {
      _commentsCache[videoId] = MockDataService.getCommentsForVideo(videoId);
    }
    return _commentsCache[videoId]!;
  }

  void toggleLike(String videoId) {
    final index = _homeVideos.indexWhere((v) => v.id == videoId);
    if (index != -1) {
      final video = _homeVideos[index];
      if (video.isLiked) {
        _homeVideos[index] = video.copyWith(
          isLiked: false,
          likes: video.likes - 1,
        );
      } else {
        _homeVideos[index] = video.copyWith(
          isLiked: true,
          isDisliked: false,
          likes: video.likes + 1,
          dislikes: video.isDisliked ? video.dislikes - 1 : video.dislikes,
        );
      }
      notifyListeners();
    }
  }

  void toggleDislike(String videoId) {
    final index = _homeVideos.indexWhere((v) => v.id == videoId);
    if (index != -1) {
      final video = _homeVideos[index];
      if (video.isDisliked) {
        _homeVideos[index] = video.copyWith(
          isDisliked: false,
          dislikes: video.dislikes - 1,
        );
      } else {
        _homeVideos[index] = video.copyWith(
          isDisliked: true,
          isLiked: false,
          dislikes: video.dislikes + 1,
          likes: video.isLiked ? video.likes - 1 : video.likes,
        );
      }
      notifyListeners();
    }
  }

  void toggleSubscribe(String videoId) {
    final index = _homeVideos.indexWhere((v) => v.id == videoId);
    if (index != -1) {
      final video = _homeVideos[index];
      _homeVideos[index] = video.copyWith(
        isSubscribed: !video.isSubscribed,
      );
      notifyListeners();
    }
  }
}
