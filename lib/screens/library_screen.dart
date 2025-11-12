import 'package:flutter/material.dart';

class LibraryScreen extends StatelessWidget {
  const LibraryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        _buildLibraryItem(
          context,
          icon: Icons.history,
          title: 'History',
          onTap: () {},
        ),
        _buildLibraryItem(
          context,
          icon: Icons.video_library,
          title: 'Your videos',
          onTap: () {},
        ),
        _buildLibraryItem(
          context,
          icon: Icons.watch_later_outlined,
          title: 'Watch Later',
          count: '12',
          onTap: () {},
        ),
        _buildLibraryItem(
          context,
          icon: Icons.thumb_up_outlined,
          title: 'Liked videos',
          count: '245',
          onTap: () {},
        ),
        const Divider(height: 1),
        const Padding(
          padding: EdgeInsets.all(16.0),
          child: Text(
            'Playlists',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        _buildLibraryItem(
          context,
          icon: Icons.playlist_play,
          title: 'Flutter Tutorials',
          count: '25 videos',
          onTap: () {},
        ),
        _buildLibraryItem(
          context,
          icon: Icons.playlist_play,
          title: 'Web Development',
          count: '18 videos',
          onTap: () {},
        ),
        _buildLibraryItem(
          context,
          icon: Icons.playlist_play,
          title: 'Machine Learning',
          count: '32 videos',
          onTap: () {},
        ),
        _buildLibraryItem(
          context,
          icon: Icons.add,
          title: 'New playlist',
          onTap: () {},
        ),
      ],
    );
  }

  Widget _buildLibraryItem(
    BuildContext context, {
    required IconData icon,
    required String title,
    String? count,
    required VoidCallback onTap,
  }) {
    return ListTile(
      leading: Icon(icon),
      title: Text(title),
      trailing: count != null
          ? Text(
              count,
              style: TextStyle(
                color: Colors.grey[600],
                fontSize: 12,
              ),
            )
          : null,
      onTap: onTap,
    );
  }
}
