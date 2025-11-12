class Comment {
  final String id;
  final String userName;
  final String userAvatar;
  final String text;
  final String timeAgo;
  final int likes;
  final bool isLiked;
  final List<Comment> replies;

  Comment({
    required this.id,
    required this.userName,
    required this.userAvatar,
    required this.text,
    required this.timeAgo,
    this.likes = 0,
    this.isLiked = false,
    this.replies = const [],
  });

  Comment copyWith({
    String? id,
    String? userName,
    String? userAvatar,
    String? text,
    String? timeAgo,
    int? likes,
    bool? isLiked,
    List<Comment>? replies,
  }) {
    return Comment(
      id: id ?? this.id,
      userName: userName ?? this.userName,
      userAvatar: userAvatar ?? this.userAvatar,
      text: text ?? this.text,
      timeAgo: timeAgo ?? this.timeAgo,
      likes: likes ?? this.likes,
      isLiked: isLiked ?? this.isLiked,
      replies: replies ?? this.replies,
    );
  }
}
