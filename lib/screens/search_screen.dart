import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../providers/video_provider.dart';
import '../widgets/video_card.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final TextEditingController _searchController = TextEditingController();
  final FocusNode _searchFocus = FocusNode();

  @override
  void initState() {
    super.initState();
    _searchFocus.requestFocus();
  }

  @override
  void dispose() {
    _searchController.dispose();
    _searchFocus.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final videoProvider = Provider.of<VideoProvider>(context);

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            videoProvider.clearSearch();
            context.pop();
          },
        ),
        title: TextField(
          controller: _searchController,
          focusNode: _searchFocus,
          decoration: const InputDecoration(
            hintText: 'Search YouTube',
            border: InputBorder.none,
          ),
          onSubmitted: (query) {
            videoProvider.searchVideos(query);
          },
        ),
        actions: [
          if (_searchController.text.isNotEmpty)
            IconButton(
              icon: const Icon(Icons.clear),
              onPressed: () {
                _searchController.clear();
                videoProvider.clearSearch();
              },
            ),
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {
              videoProvider.searchVideos(_searchController.text);
            },
          ),
        ],
      ),
      body: videoProvider.searchQuery.isEmpty
          ? _buildSearchSuggestions()
          : _buildSearchResults(videoProvider),
    );
  }

  Widget _buildSearchSuggestions() {
    final suggestions = [
      'Flutter tutorial',
      'React Native',
      'Python programming',
      'Machine learning',
      'Web development',
      'Docker tutorial',
      'AWS cloud',
      'JavaScript ES6',
    ];

    return ListView.builder(
      itemCount: suggestions.length,
      itemBuilder: (context, index) {
        return ListTile(
          leading: const Icon(Icons.search),
          title: Text(suggestions[index]),
          trailing: const Icon(Icons.north_west),
          onTap: () {
            _searchController.text = suggestions[index];
            Provider.of<VideoProvider>(context, listen: false)
                .searchVideos(suggestions[index]);
          },
        );
      },
    );
  }

  Widget _buildSearchResults(VideoProvider videoProvider) {
    if (videoProvider.searchResults.isEmpty) {
      return const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.search_off, size: 64, color: Colors.grey),
            SizedBox(height: 16),
            Text(
              'No results found',
              style: TextStyle(fontSize: 18, color: Colors.grey),
            ),
          ],
        ),
      );
    }

    return ListView.builder(
      itemCount: videoProvider.searchResults.length,
      itemBuilder: (context, index) {
        final video = videoProvider.searchResults[index];
        return VideoCard(
          video: video,
          onTap: () {
            context.push('/video/${video.id}');
          },
        );
      },
    );
  }
}
