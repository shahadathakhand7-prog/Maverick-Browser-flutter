class UrlHelper {
  static bool isValidUrl(String url) {
    final Uri? uri = Uri.tryParse(url);
    return uri != null && uri.hasScheme && (uri.scheme == 'http' || uri.scheme == 'https');
  }

  static String normalizeUrl(String input) {
    final String trimmed = input.trim();
    
    if (isValidUrl(trimmed)) {
      return trimmed;
    }
    
    if (trimmed.startsWith('www.')) {
      return 'https://$trimmed';
    }
    
    if (trimmed.contains('.') && !trimmed.contains(' ')) {
      return 'https://$trimmed';
    }
    
    return 'https://www.google.com/search?q=${Uri.encodeComponent(trimmed)}';
  }
}
