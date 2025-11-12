import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../providers/video_provider.dart';
import '../widgets/video_card.dart';

class TrendingScreen extends StatelessWidget {
  const TrendingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<VideoProvider>(
      builder: (context, videoProvider, child) {
        return ListView.builder(
          itemCount: videoProvider.trendingVideos.length,
          itemBuilder: (context, index) {
            final video = videoProvider.trendingVideos[index];
            return VideoCard(
              video: video,
              onTap: () {
                context.push('/video/${video.id}');
              },
            );
          },
        );
      },
    );
  }
}
