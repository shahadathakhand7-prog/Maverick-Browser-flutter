import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:video_player/video_player.dart';
import 'package:chewie/chewie.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../providers/video_provider.dart';
import '../models/video.dart';
import '../utils/format_helper.dart';
import '../widgets/comment_card.dart';

class VideoPlayerScreen extends StatefulWidget {
  final String videoId;

  const VideoPlayerScreen({
    super.key,
    required this.videoId,
  });

  @override
  State<VideoPlayerScreen> createState() => _VideoPlayerScreenState();
}

class _VideoPlayerScreenState extends State<VideoPlayerScreen> {
  VideoPlayerController? _videoPlayerController;
  ChewieController? _chewieController;
  bool _isDescriptionExpanded = false;

  @override
  void initState() {
    super.initState();
    _initializePlayer();
  }

  Future<void> _initializePlayer() async {
    final videoProvider = Provider.of<VideoProvider>(context, listen: false);
    final video = videoProvider.getVideoById(widget.videoId);

    if (video != null) {
      _videoPlayerController = VideoPlayerController.networkUrl(
        Uri.parse(video.videoUrl),
      );

      await _videoPlayerController!.initialize();

      _chewieController = ChewieController(
        videoPlayerController: _videoPlayerController!,
        autoPlay: true,
        looping: false,
        aspectRatio: 16 / 9,
        autoInitialize: true,
        errorBuilder: (context, errorMessage) {
          return Center(
            child: Text(
              'Error: $errorMessage',
              style: const TextStyle(color: Colors.white),
            ),
          );
        },
      );

      setState(() {});
    }
  }

  @override
  void dispose() {
    _videoPlayerController?.dispose();
    _chewieController?.dispose();
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
    ]);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Consumer<VideoProvider>(
        builder: (context, videoProvider, child) {
          final video = videoProvider.getVideoById(widget.videoId);

          if (video == null) {
            return const Center(child: Text('Video not found'));
          }

          return SafeArea(
            child: Column(
              children: [
                _buildVideoPlayer(),
                Expanded(
                  child: SingleChildScrollView(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _buildVideoInfo(video),
                        _buildActionButtons(video, videoProvider),
                        const Divider(height: 1),
                        _buildChannelInfo(video, videoProvider),
                        const Divider(height: 1),
                        _buildCommentsSection(video, videoProvider),
                        const SizedBox(height: 16),
                        _buildRelatedVideos(videoProvider),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildVideoPlayer() {
    if (_chewieController == null ||
        !_chewieController!.videoPlayerController.value.isInitialized) {
      return AspectRatio(
        aspectRatio: 16 / 9,
        child: Container(
          color: Colors.black,
          child: const Center(
            child: CircularProgressIndicator(),
          ),
        ),
      );
    }

    return AspectRatio(
      aspectRatio: 16 / 9,
      child: Chewie(controller: _chewieController!),
    );
  }

  Widget _buildVideoInfo(Video video) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            video.title,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            '${video.views} • ${video.uploadTime}',
            style: TextStyle(
              fontSize: 14,
              color: Colors.grey[600],
            ),
          ),
          if (_isDescriptionExpanded) ...[
            const SizedBox(height: 8),
            Text(
              video.description,
              style: const TextStyle(fontSize: 14),
            ),
            TextButton(
              onPressed: () {
                setState(() {
                  _isDescriptionExpanded = false;
                });
              },
              child: const Text('Show less'),
            ),
          ] else ...[
            TextButton(
              onPressed: () {
                setState(() {
                  _isDescriptionExpanded = true;
                });
              },
              child: const Text('Show more'),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildActionButtons(Video video, VideoProvider videoProvider) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildActionButton(
            icon: video.isLiked
                ? Icons.thumb_up
                : Icons.thumb_up_outlined,
            label: FormatHelper.formatNumber(video.likes),
            onTap: () => videoProvider.toggleLike(video.id),
            isActive: video.isLiked,
          ),
          _buildActionButton(
            icon: video.isDisliked
                ? Icons.thumb_down
                : Icons.thumb_down_outlined,
            label: FormatHelper.formatNumber(video.dislikes),
            onTap: () => videoProvider.toggleDislike(video.id),
            isActive: video.isDisliked,
          ),
          _buildActionButton(
            icon: Icons.share_outlined,
            label: 'Share',
            onTap: () {},
          ),
          _buildActionButton(
            icon: Icons.download_outlined,
            label: 'Download',
            onTap: () {},
          ),
          _buildActionButton(
            icon: Icons.library_add_outlined,
            label: 'Save',
            onTap: () {},
          ),
        ],
      ),
    );
  }

  Widget _buildActionButton({
    required IconData icon,
    required String label,
    required VoidCallback onTap,
    bool isActive = false,
  }) {
    return InkWell(
      onTap: onTap,
      child: Column(
        children: [
          Icon(
            icon,
            size: 24,
            color: isActive ? Colors.white : Colors.grey[400],
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: TextStyle(
              fontSize: 12,
              color: Colors.grey[400],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildChannelInfo(Video video, VideoProvider videoProvider) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Row(
        children: [
          CircleAvatar(
            radius: 22,
            backgroundImage: CachedNetworkImageProvider(video.channelAvatar),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  video.channelName,
                  style: const TextStyle(
                    fontWeight: FontWeight.w500,
                    fontSize: 15,
                  ),
                ),
                Text(
                  '1.2M subscribers',
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.grey[600],
                  ),
                ),
              ],
            ),
          ),
          ElevatedButton(
            onPressed: () => videoProvider.toggleSubscribe(video.id),
            style: ElevatedButton.styleFrom(
              backgroundColor: video.isSubscribed ? Colors.grey[800] : Colors.red,
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
            ),
            child: Text(
              video.isSubscribed ? 'Subscribed' : 'Subscribe',
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCommentsSection(Video video, VideoProvider videoProvider) {
    final comments = videoProvider.getCommentsForVideo(video.id);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.all(16.0),
          child: Row(
            children: [
              const Text(
                'Comments',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(width: 8),
              Text(
                comments.length.toString(),
                style: TextStyle(
                  fontSize: 14,
                  color: Colors.grey[600],
                ),
              ),
            ],
          ),
        ),
        ...comments.map((comment) => CommentCard(comment: comment)),
      ],
    );
  }

  Widget _buildRelatedVideos(VideoProvider videoProvider) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Padding(
          padding: EdgeInsets.all(16.0),
          child: Text(
            'Related Videos',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        ...videoProvider.homeVideos.take(3).map(
          (relatedVideo) {
            return Padding(
              padding: const EdgeInsets.only(bottom: 8.0),
              child: InkWell(
                onTap: () {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) => VideoPlayerScreen(
                        videoId: relatedVideo.id,
                      ),
                    ),
                  );
                },
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(
                      width: 168,
                      height: 94,
                      child: CachedNetworkImage(
                        imageUrl: relatedVideo.thumbnailUrl,
                        fit: BoxFit.cover,
                      ),
                    ),
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              relatedVideo.title,
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(fontSize: 14),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              relatedVideo.channelName,
                              style: TextStyle(
                                fontSize: 12,
                                color: Colors.grey[600],
                              ),
                            ),
                            Text(
                              '${relatedVideo.views} • ${relatedVideo.uploadTime}',
                              style: TextStyle(
                                fontSize: 12,
                                color: Colors.grey[600],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ],
    );
  }
}
