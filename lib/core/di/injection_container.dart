import 'package:get_it/get_it.dart';
import 'package:logger/logger.dart';

import '../network/dio_client.dart';
import '../storage/hive_storage.dart';
import '../utils/app_logger.dart';

final GetIt serviceLocator = GetIt.instance;

Future<void> init() async {
  serviceLocator
    ..registerLazySingleton<Logger>(() => AppLogger.logger)
    ..registerLazySingleton<DioClient>(
      () => DioClient(logger: serviceLocator()),
    )
    ..registerLazySingleton<HiveStorage>(HiveStorage.new);

  await serviceLocator<HiveStorage>().init();
}
