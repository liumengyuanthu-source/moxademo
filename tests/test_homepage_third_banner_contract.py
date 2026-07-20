from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / "homepage.html").read_text(encoding="utf-8")


class HomepageThirdBannerContract(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        match = re.search(
            r'<article class="hero-slide hero-slide-eds".*?</article>',
            HTML,
            flags=re.S,
        )
        if not match:
            raise AssertionError("EDS-4008 third banner is missing")
        cls.banner = match.group(0)

    def test_uses_new_image_first_asset(self):
        self.assertIn(
            'src="banner/eds-4008-validation-banner.png"', self.banner
        )

    def test_has_approved_copy_and_ctas(self):
        self.assertIn("Validate the right", self.banner)
        self.assertIn("Compare LV/HV Models", self.banner)
        self.assertIn("Download Datasheet", self.banner)
        self.assertIn('href="compare-lv-hv.html"', self.banner)
        self.assertIn(
            'href="asset/moxa-eds-4008-series-datasheet-v1.8.pdf"',
            self.banner,
        )

    def test_removes_visible_session_note(self):
        self.assertNotIn("Homepage C", self.banner)


if __name__ == "__main__":
    unittest.main()
