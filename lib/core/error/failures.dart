import 'package:equatable/equatable.dart';

abstract class Failure extends Equatable {
  const Failure([this.properties = const <dynamic>[]]);
  
  final List<dynamic> properties;
  
  @override
  List<Object?> get props => [properties];
}

class ServerFailure extends Failure {
  const ServerFailure();
}

class CacheFailure extends Failure {
  const CacheFailure();
}

class NetworkFailure extends Failure {
  const NetworkFailure();
}

class ValidationFailure extends Failure {
  const ValidationFailure();
}
