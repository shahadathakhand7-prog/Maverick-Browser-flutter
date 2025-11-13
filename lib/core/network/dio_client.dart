import 'package:dio/dio.dart';
import 'package:logger/logger.dart';

class DioClient {
  DioClient({Dio? dio, Logger? logger})
      : _dio = dio ?? Dio(),
        _logger = logger ?? Logger();

  final Dio _dio;
  final Logger _logger;

  Dio get client => _dio;

  Future<Response<T>> get<T>(
    String path, {
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
    ProgressCallback? onReceiveProgress,
  }) async {
    _logger.i('GET: $path');
    return _dio.get<T>(
      path,
      queryParameters: queryParameters,
      options: options,
      cancelToken: cancelToken,
      onReceiveProgress: onReceiveProgress,
    );
  }
}
