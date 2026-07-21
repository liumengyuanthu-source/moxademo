from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]
HTML_PATH = ROOT / "product-series-eds-4008.html"


class Eds4008HeroContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = HTML_PATH.read_text(encoding="utf-8")
        match = re.search(
            r'<section class="series-a-hero"[\s\S]*?</section>',
            cls.html,
        )
        if not match:
            raise AssertionError("EDS-4008 hero section is missing")
        cls.hero = match.group(0)

    def test_hero_is_copy_first_without_visual_or_badge(self):
        self.assertIn("EDS-4008 Series", self.hero)
        self.assertIn("8-port managed Fast Ethernet switches", self.hero)
        self.assertNotIn("series-a-hero-media", self.hero)
        self.assertNotIn("<img", self.hero)
        self.assertNotIn("series-a-kicker", self.hero)
        self.assertNotIn("Industrial Ethernet", self.hero)
        self.assertNotIn("series-a-cert", self.hero)
        self.assertNotIn("IEC 62443-4-2 SL2", self.hero)

    def test_hero_removes_inline_compare_and_datasheet_ctas(self):
        self.assertNotIn("Compare all models", self.hero)
        self.assertNotIn("Download datasheet", self.hero)
        self.assertNotIn("series-a-actions", self.hero)
        self.assertNotIn("series-a-stats", self.hero)

    def test_sticky_actions_still_keep_workflow_ctas(self):
        self.assertIn("Compare LV/HV", self.html)
        self.assertIn("Get a quote", self.html)

    def test_series_embeds_accessible_36_frame_product_viewer(self):
        self.assertIn('id="product-360"', self.html)
        self.assertIn('data-sitecore-component="Product360Viewer"', self.html)
        self.assertIn('aria-label="360-degree EDS-4008 product viewer"', self.html)
        self.assertIn('assets/360/frame-36.png', self.html)
        self.assertIn('moxa:product360:framechange', self.html)


if __name__ == "__main__":
    unittest.main()
