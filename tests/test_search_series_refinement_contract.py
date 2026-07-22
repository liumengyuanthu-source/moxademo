import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class SearchSeriesRefinementContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.search = (ROOT / "search.html").read_text(encoding="utf-8")
        cls.series = (ROOT / "product-series-eds-4008.html").read_text(encoding="utf-8")

    def test_search_summary_is_compact_and_result_cards_keep_thumbnails(self):
        summary = re.search(
            r'<section class="search-results-summary".*?</section>',
            self.search,
            re.S,
        )
        self.assertIsNotNone(summary)
        self.assertNotIn("<img", summary.group(0))

        results = re.search(
            r'<div class="search-results-list">(.*?)</div></div></div></section>',
            self.search,
            re.S,
        )
        self.assertIsNotNone(results)
        self.assertEqual(results.group(1).count('class="product-row"'), 9)
        self.assertEqual(results.group(1).count('class="result-thumb'), 9)
        self.assertIn('assets/video/mgate-g2-web-gui.png', results.group(1))
        self.assertIn('assets/campaign-security/secure-network-selection-guide.jpg', results.group(1))

    def test_search_uses_image_supported_result_layout(self):
        self.assertIn('data-search-layout="image-results"', self.search)
        self.assertRegex(
            self.search,
            r'\.search-results-list \.product-row\s*\{\s*grid-template-columns:\s*132px\s+minmax\(0,1fr\)\s+var\(--result-action-width(?:,152px)?\)',
        )
        self.assertIn('.result-thumb{display:block;width:132px;height:96px', self.search)

    def test_series_refinement_contract(self):
        self.assertIn('assets/css/eds-4008-series-refine.css', self.series)
        self.assertIn('id="seriesCompareHelp"', self.series)
        self.assertIn('Compare selected models', self.series)
        self.assertIn('aria-describedby="seriesCompareHelp"', self.series)

        css = (ROOT / "assets/css/eds-4008-series-refine.css").read_text(encoding="utf-8")
        self.assertIn('#product360Title', css)
        self.assertIn('#resources .series-a-section-head h2', css)
        self.assertIn('white-space:nowrap', css)
        self.assertIn('.series-a-popular-media', css)
        self.assertIn('aspect-ratio:', css)


if __name__ == "__main__":
    unittest.main()
