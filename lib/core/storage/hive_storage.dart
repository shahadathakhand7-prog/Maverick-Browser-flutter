import 'package:hive_flutter/hive_flutter.dart';

class HiveStorage {
  static const String _bookmarksBox = 'bookmarks';
  static const String _historyBox = 'history';
  static const String _settingsBox = 'settings';

  Future<void> init() async {
    await Hive.initFlutter();
    await Hive.openBox<dynamic>(_bookmarksBox);
    await Hive.openBox<dynamic>(_historyBox);
    await Hive.openBox<dynamic>(_settingsBox);
  }

  Box<T> getBox<T>(String boxName) => Hive.box<T>(boxName);

  Box<dynamic> get bookmarksBox => getBox<dynamic>(_bookmarksBox);
  Box<dynamic> get historyBox => getBox<dynamic>(_historyBox);
  Box<dynamic> get settingsBox => getBox<dynamic>(_settingsBox);
}
