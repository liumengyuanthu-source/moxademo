from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]


class NPort5100SeriesContractTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = (ROOT / "nport-5100-series.html").read_text(encoding="utf-8")

    def test_uses_global_shell_and_4008_series_structure(self):
        html = self.html
        self.assertIn('data-moxa-page="nport-5100-series"', html)
        self.assertIn("assets/css/moxa-ds.css", html)
        self.assertIn("assets/js/moxa-shell.js", html)
        self.assertIn("assets/js/moxa-cross-sell.js", html)
        self.assertIn('class="series-a-hero"', html)
        self.assertIn('class="series-a-anchor"', html)
        for section_id in ("overview", "highlights", "products", "resources", "applications", "series-contact"):
            self.assertRegex(html, rf'id="{section_id}"')

    def test_hero_is_clean_text_only_banner(self):
        hero = re.search(r'<section class="series-a-hero".*?</section>', self.html, re.S).group(0)
        self.assertIn("NPort 5100 Series", hero)
        self.assertIn("1-port RS-232, RS-422, and RS-485", hero)
        self.assertNotIn("<img", hero)
        self.assertNotIn("Compare all models", hero)
        self.assertNotIn("Download datasheet", hero)
        self.assertNotIn("series-a-stats", hero)
        self.assertNotIn("hero-carousel", hero)
        self.assertNotIn("family-edge", hero)

    def test_nport_content_and_models_are_complete(self):
        html = self.html
        for term in (
            "RS-232",
            "RS-422",
            "RS-485",
            "10/100BaseT(X)",
            "Real COM/TTY",
            "SNMP MIB-II",
            "NPort 5110",
            "NPort 5110-T",
            "NPort 5130",
            "NPort 5130-T",
            "NPort 5150",
            "NPort 5150-T",
            "-40 to 75°C",
            "12 to 48 VDC",
        ):
            self.assertIn(term, html)

    def test_interactions_are_available(self):
        html = self.html
        for hook in (
            "data-model-filter",
            "data-model-row",
            "data-compare-model",
            "data-jump-model",
            "series-model-search",
            "applyFilters",
            "syncCompare",
            "compare-quote.html?models=",
        ):
            self.assertIn(hook, html)

    def test_cross_sell_to_eds_4008_is_present(self):
        html = self.html
        self.assertIn('data-cross-sell-product="nport-5100"', html)
        self.assertIn("Complete the Connection with a Managed Industrial Network", html)
        self.assertIn("product-series-eds-4008.html?from=nport-5100", html)
        self.assertIn("Add Both to Solution", html)

    def test_removed_legacy_page_patterns(self):
        html = self.html
        for forbidden in (
            "hero-carousel",
            "img/family-edge.jpg",
            "Compare all models",
            "series-a-stats",
            "—",
        ):
            self.assertNotIn(forbidden, html)


if __name__ == "__main__":
    unittest.main()
