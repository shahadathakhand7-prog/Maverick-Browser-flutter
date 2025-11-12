import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../providers/video_provider.dart';
import '../widgets/video_card.dart';
import '../widgets/shimmer_loading.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<VideoProvider>(
      builder: (context, videoProvider, child) {
        if (videoProvider.isLoading) {
          return const ShimmerLoading();
        }

        return RefreshIndicator(
          onRefresh: () => videoProvider.loadHomeVideos(),
          child: ListView.builder(
            itemCount: videoProvider.homeVideos.length,
            itemBuilder: (context, index) {
              final video = videoProvider.homeVideos[index];
              return VideoCard(
                video: video,
                onTap: () {
                  context.push('/video/${video.id}');
                },
              );
            },
          ),
        );
      },
    );
  }
}
