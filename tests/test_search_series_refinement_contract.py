import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class SearchSeriesRefinementContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.search = (ROOT / "search.html").read_text(encoding="utf-8")
        cls.series = (ROOT / "product-series-eds-4008.html").read_text(encoding="utf-8")

    def test_search_summary_and_result_cards_are_image_free(self):
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
        self.assertNotIn("<img", results.group(1))
        self.assertEqual(results.group(1).count('class="product-row"'), 9)

    def test_search_uses_text_first_result_layout(self):
        self.assertIn('data-search-layout="text-only"', self.search)
        self.assertRegex(
            self.search,
            r'\.search-results-list \.product-row\s*\{\s*grid-template-columns:\s*minmax\(0,1fr\)\s+var\(--result-action-width(?:,152px)?\)',
        )

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
