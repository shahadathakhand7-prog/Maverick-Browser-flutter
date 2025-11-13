import 'package:flutter/material.dart';

import 'package:maverick_browser/common/widgets/primary_button.dart';
import 'package:maverick_browser/core/constants/app_constants.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(AppConstants.appName),
      ),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Welcome to ${AppConstants.appName}',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 16),
            Text(
              'Start implementing features by navigating to the modular feature folders. '
              'Each module contains data, domain, and presentation layers ready for development.',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const Spacer(),
            PrimaryButton(
              label: 'Open Browser Module',
              onPressed: () {},
            ),
          ],
        ),
      ),
    );
  }
}
