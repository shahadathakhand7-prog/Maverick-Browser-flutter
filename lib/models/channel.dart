class Channel {
  final String id;
  final String name;
  final String avatarUrl;
  final String bannerUrl;
  final String subscribers;
  final String description;
  final bool isSubscribed;
  final List<String> videoIds;

  Channel({
    required this.id,
    required this.name,
    required this.avatarUrl,
    required this.bannerUrl,
    required this.subscribers,
    required this.description,
    this.isSubscribed = false,
    this.videoIds = const [],
  });

  Channel copyWith({
    String? id,
    String? name,
    String? avatarUrl,
    String? bannerUrl,
    String? subscribers,
    String? description,
    bool? isSubscribed,
    List<String>? videoIds,
  }) {
    return Channel(
      id: id ?? this.id,
      name: name ?? this.name,
      avatarUrl: avatarUrl ?? this.avatarUrl,
      bannerUrl: bannerUrl ?? this.bannerUrl,
      subscribers: subscribers ?? this.subscribers,
      description: description ?? this.description,
      isSubscribed: isSubscribed ?? this.isSubscribed,
      videoIds: videoIds ?? this.videoIds,
    );
  }
}
