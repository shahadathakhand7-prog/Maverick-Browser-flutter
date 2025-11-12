class Video {
  final String id;
  final String title;
  final String channelName;
  final String channelAvatar;
  final String thumbnailUrl;
  final String videoUrl;
  final String views;
  final String uploadTime;
  final String duration;
  final String description;
  final int likes;
  final int dislikes;
  final bool isLiked;
  final bool isDisliked;
  final bool isSubscribed;

  Video({
    required this.id,
    required this.title,
    required this.channelName,
    required this.channelAvatar,
    required this.thumbnailUrl,
    required this.videoUrl,
    required this.views,
    required this.uploadTime,
    required this.duration,
    required this.description,
    this.likes = 0,
    this.dislikes = 0,
    this.isLiked = false,
    this.isDisliked = false,
    this.isSubscribed = false,
  });

  Video copyWith({
    String? id,
    String? title,
    String? channelName,
    String? channelAvatar,
    String? thumbnailUrl,
    String? videoUrl,
    String? views,
    String? uploadTime,
    String? duration,
    String? description,
    int? likes,
    int? dislikes,
    bool? isLiked,
    bool? isDisliked,
    bool? isSubscribed,
  }) {
    return Video(
      id: id ?? this.id,
      title: title ?? this.title,
      channelName: channelName ?? this.channelName,
      channelAvatar: channelAvatar ?? this.channelAvatar,
      thumbnailUrl: thumbnailUrl ?? this.thumbnailUrl,
      videoUrl: videoUrl ?? this.videoUrl,
      views: views ?? this.views,
      uploadTime: uploadTime ?? this.uploadTime,
      duration: duration ?? this.duration,
      description: description ?? this.description,
      likes: likes ?? this.likes,
      dislikes: dislikes ?? this.dislikes,
      isLiked: isLiked ?? this.isLiked,
      isDisliked: isDisliked ?? this.isDisliked,
      isSubscribed: isSubscribed ?? this.isSubscribed,
    );
  }
}
