from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]
ARCHIVE_PATH = ROOT / "standalone" / "homepage-summer-sales-ab-embedded.html"


class HomepageEmbeddedArchiveContract(unittest.TestCase):
    def test_archive_is_self_contained_and_preserves_combined_experiment(self):
        self.assertTrue(ARCHIVE_PATH.exists())
        html = ARCHIVE_PATH.read_text(encoding="utf-8")
        self.assertIn('data-ab-variant="explore-rail-a"', html)
        self.assertIn('data-ab-variant="explore-power-b"', html)
        self.assertIn('data-experiment="experiment_top_cta"', html)
        self.assertIn('data-experiment="experiment_explore_content"', html)
        self.assertIn('experience_variant: variant', html)
        self.assertNotRegex(html, r'<link[^>]+rel=["\']stylesheet["\'][^>]+href=["\'](?!data:|https?:)')
        self.assertNotRegex(html, r'<script[^>]+src=["\'](?!data:|https?:)')
        self.assertNotRegex(html, r'<img[^>]+src=["\'](?!data:|https?:)')

    def test_archive_embeds_render_assets_as_data_urls(self):
        html = ARCHIVE_PATH.read_text(encoding="utf-8")
        self.assertIn("data:image/", html)
        self.assertIn("<style", html)
        self.assertIn("<script", html)


if __name__ == "__main__":
    unittest.main()
