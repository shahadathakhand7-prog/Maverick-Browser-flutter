class FormatHelper {
  static String formatNumber(int number) {
    if (number >= 1000000) {
      return '${(number / 1000000).toStringAsFixed(1)}M';
    } else if (number >= 1000) {
      return '${(number / 1000).toStringAsFixed(1)}K';
    }
    return number.toString();
  }

  static String formatViews(String views) {
    return views;
  }

  static String formatDuration(String duration) {
    return duration;
  }
}
