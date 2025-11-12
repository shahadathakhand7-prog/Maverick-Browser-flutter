import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../providers/video_provider.dart';
import '../services/mock_data_service.dart';
import '../widgets/video_card.dart';

class SubscriptionsScreen extends StatelessWidget {
  const SubscriptionsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final channels = MockDataService.getSubscribedChannels();

    return Consumer<VideoProvider>(
      builder: (context, videoProvider, child) {
        return SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(
                height: 120,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  itemCount: channels.length,
                  itemBuilder: (context, index) {
                    final channel = channels[index];
                    return Padding(
                      padding: const EdgeInsets.only(right: 16),
                      child: Column(
                        children: [
                          CircleAvatar(
                            radius: 35,
                            backgroundImage: CachedNetworkImageProvider(
                              channel.avatarUrl,
                            ),
                          ),
                          const SizedBox(height: 8),
                          SizedBox(
                            width: 70,
                            child: Text(
                              channel.name,
                              textAlign: TextAlign.center,
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(fontSize: 12),
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                ),
              ),
              const Divider(),
              ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: videoProvider.subscriptionVideos.length,
                itemBuilder: (context, index) {
                  final video = videoProvider.subscriptionVideos[index];
                  return VideoCard(
                    video: video,
                    onTap: () {
                      context.push('/video/${video.id}');
                    },
                  );
                },
              ),
            ],
          ),
        );
      },
    );
  }
}
