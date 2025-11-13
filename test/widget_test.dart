import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:maverick_browser/app.dart';

void main() {
  testWidgets('App launches smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const MaverickBrowserApp());
    
    expect(find.byType(MaterialApp), findsOneWidget);
  });
}
