import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class VideoPageFilterContract(unittest.TestCase):
    def setUp(self):
        self.html = (ROOT / "video.html").read_text(encoding="utf-8")
        self.css = (ROOT / "assets/css/video-page.css").read_text(encoding="utf-8")

    def test_video_filter_toolbar_uses_design_system_fields(self):
        self.assertIn('class="video-library-controls" aria-label="Video library filters"', self.html)
        self.assertIn('class="video-search-field"', self.html)
        self.assertIn('class="video-select-field"', self.html)
        self.assertIn('img/icon-search.svg', self.html)
        self.assertIn(".video-search-field:focus-within", self.css)
        self.assertIn(".video-select-field::after", self.css)

    def test_category_filters_are_pill_segmented_and_keep_data_hooks(self):
        self.assertEqual(5, self.html.count("data-video-filter="))
        self.assertIn(".video-filter-row", self.css)
        self.assertIn("border-radius: 999px", self.css)
        self.assertIn(".video-filter:hover", self.css)


if __name__ == "__main__":
    unittest.main()
